/**
 * Sinh nội dung tử vi hằng ngày bằng Gemini — MỘT request cho cả 12 con giáp, trả JSON theo schema.
 * Chạy ngoài build (workflow .github/workflows/tu-vi-hang-ngay.yml gọi scripts/generate-tu-vi.ts), không bao giờ
 * chạy trong lúc Vercel dựng trang. Fetch, đồng hồ, kho lưu đều truyền vào được để kiểm thử bằng mock.
 *
 * Nguyên tắc:
 * - Chỉ lưu khi ĐỦ 12/12 tuổi hợp lệ cho đúng ngày Việt Nam đó. JSON thiếu, trùng tuổi, sai schema, bị cắt → không lưu gì.
 * - Không chép lời luận của ngày khác, không sinh hay sửa dữ liệu lịch: can chi, sao, giờ hoàng đạo đều lấy từ
 *   @licham/core; Gemini chỉ viết lời luận, chấm điểm trong khoảng cho phép, chọn một giờ trong danh sách có sẵn.
 * - Đã có file hợp lệ của ngày đó thì không gọi Gemini. Không ghi đè file hợp lệ; ghi qua tệp tạm rồi đổi tên.
 * - Khóa theo ngày để hai lượt chạy cùng lúc không cùng gọi Gemini.
 * - Giới hạn cứng số request, thời gian mỗi request và tổng thời gian một lượt. Không bao giờ in khóa API.
 */
import { closeSync, fsyncSync, mkdirSync, openSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { CHI, getDayInfo, vietnamDateOf } from "@licham/core";
import {
  CON_GIAP_LIST,
  DIEM_RANGE,
  QUAN_HE_LABEL,
  dateStr,
  loadTuViDay,
  normalizeGioTot,
  quanHeVoiNgay,
  tuViFilePath,
  validateTuViDayData,
  validateTuViEntry,
  type TuViDayData,
  type TuViEntry,
  type TuViLoad,
} from "./tu-vi";

/**
 * "gemini-3-flash" (tên cũ) không tồn tại — ListModels ngày 23/9/2026 chỉ có các bản 3.x có số phụ hoặc "-preview".
 * Dùng model ổn định đã xác minh chạy được; muốn đổi thì đặt biến GEMINI_MODEL, không cần sửa mã.
 */
export const PRIMARY_MODEL = "gemini-2.5-flash";
/** Alias luôn trỏ tới bản flash ổn định mới nhất, chỉ dùng khi model chính bị gỡ, hết hạn mức hoặc lỗi liên tục. */
export const FALLBACK_MODEL = "gemini-flash-latest";
/** Trần số request tới Gemini của MỘT lượt chạy, tính cả thử lại và model dự phòng. Free tier ~20 request/ngày/model. */
export const DEFAULT_MAX_REQUESTS = 3;
/** Số lần gọi model chính trước khi chuyển sang model dự phòng. */
const MAX_ATTEMPTS_PER_MODEL = 2;
/** Một request sinh ~12 đoạn văn nên lâu hơn request cho một tuổi. */
const DEFAULT_TIMEOUT_MS = 120_000;
const DEFAULT_RETRY_DELAY_MS = 10_000;
/** Khi bị 429 mà Google không nói phải chờ bao lâu. */
const DEFAULT_RATE_LIMIT_DELAY_MS = 30_000;
/** Chờ 429 lâu nhất một lần; hạn mức theo phút nên hơn 1 phút là bất thường. */
const MAX_RATE_LIMIT_DELAY_MS = 65_000;
/** Tổng thời gian tối đa của một lượt, kể cả thời gian chờ. */
const DEFAULT_MAX_RUN_MS = 6 * 60_000;
/**
 * 12 đoạn × ≤400 ký tự tiếng Việt ≈ 2.500 token. Để dư cho khung JSON; với model có "thinking" thì token suy nghĩ
 * cũng tính vào trần này, nên model 2.5-flash được tắt thinking (xem generationConfig).
 */
export const MAX_OUTPUT_TOKENS = 8192;
/** Giới hạn độ dài phản hồi thô trước khi parse — phòng phản hồi bất thường làm tràn bộ nhớ/log. */
const MAX_RESPONSE_CHARS = 200_000;
/** Khóa cũ hơn mức này coi như của lượt đã chết (máy tắt giữa chừng) và được giành lại. */
export const LOCK_STALE_MS = DEFAULT_MAX_RUN_MS + 2 * 60_000;

export interface DayContext {
  date: string;
  dayChiIndex: number;
  ngayChiTen: string;
  solarLabel: string;
  ngayCanChi: string;
  saoTot: string;
  saoXau: string;
  gioHoangDao: string;
  /** Các khung giờ hoàng đạo dạng "7h–9h" — `gioTot` Gemini trả về phải nằm trong danh sách này. */
  gioHoangDaoRanges: string[];
}

/** "model-unusable": model này không gọi được nữa trong lượt (không tồn tại, hết hạn mức ngày) — đổi model thì có thể được. */
type GeminiErrorKind = "retryable" | "fatal" | "model-unusable";
/** Nhóm lỗi để báo cáo trạng thái (log/GitHub output), không ảnh hưởng cách xử lý. */
export type FailureCategory = "quota" | "api" | "timeout" | "invalid" | "storage" | "budget";

export class GeminiError extends Error {
  kind: GeminiErrorKind;
  category: FailureCategory;
  /** Thời gian Google yêu cầu chờ trước khi gọi lại (429). */
  retryAfterMs: number | undefined;
  constructor(message: string, kind: GeminiErrorKind, category: FailureCategory, retryAfterMs?: number) {
    super(message);
    this.name = "GeminiError";
    this.kind = kind;
    this.category = category;
    this.retryAfterMs = retryAfterMs;
  }
}

function hourRangeLabel(start: string, end: string): string {
  return `${Number.parseInt(start, 10)}h–${Number.parseInt(end, 10)}h`;
}

/** Các khung giờ hoàng đạo của ngày, dạng "7h–9h" như `gioTot` phải có. */
export function gioHoangDaoRanges(day: { day: number; month: number; year: number }): string[] {
  return getDayInfo(day)
    .hours.filter((h) => h.isHoangDao)
    .map((h) => hourRangeLabel(h.start, h.end));
}

export function buildDayContext(day: { day: number; month: number; year: number }): DayContext {
  const info = getDayInfo(day);
  const dayChiIndex = info.canChi.day.chiIndex;
  const hoangDao = info.hours.filter((h) => h.isHoangDao);
  return {
    date: dateStr(day),
    dayChiIndex,
    ngayChiTen: CHI[dayChiIndex]!,
    solarLabel: `${day.day}/${String(day.month).padStart(2, "0")}/${day.year}`,
    ngayCanChi: info.canChi.day.name,
    saoTot: (info.saoTot ?? []).map((s) => s.name).join(", ") || "không có",
    saoXau: (info.saoXau ?? []).map((s) => s.name).join(", ") || "không có",
    gioHoangDao:
      hoangDao.map((h) => `${CHI[h.chiIndex]} (${hourRangeLabel(h.start, h.end)})`).join(", ") ||
      "không có giờ hoàng đạo",
    gioHoangDaoRanges: gioHoangDaoRanges(day),
  };
}

export function buildBatchPrompt(ctx: DayContext): string {
  const rows = CON_GIAP_LIST.map((cg) => {
    const qh = quanHeVoiNgay(ctx.dayChiIndex, cg.chiIndex);
    const [lo, hi] = DIEM_RANGE[qh];
    return `- ${cg.ten} | ${cg.slug} | ${QUAN_HE_LABEL[qh]} | ${lo}–${hi}`;
  }).join("\n");
  return `Bạn viết tử vi ngày cho cả 12 con giáp trên một trang lịch âm Việt Nam. Viết tiếng Việt tự nhiên, giọng điềm đạm.

Dữ kiện của ngày (đã tính sẵn bằng lịch; KHÔNG sửa, KHÔNG tự suy thêm dữ kiện lịch nào khác):
- Ngày dương lịch: ${ctx.solarLabel} (mã ngày "${ctx.date}")
- Can chi ngày: ${ctx.ngayCanChi}
- Sao tốt trong ngày: ${ctx.saoTot}
- Sao xấu trong ngày: ${ctx.saoXau}
- Giờ hoàng đạo trong ngày: ${ctx.gioHoangDao}

Quan hệ của từng tuổi với chi ngày (${ctx.ngayChiTen}), theo dạng: Tuổi | mã | quan hệ | khoảng điểm được phép
${rows}

Yêu cầu cho MỖI tuổi:
- "luan": 2 đến 3 câu (khoảng 150–400 ký tự), viết riêng cho tuổi đó dựa trên quan hệ của chính tuổi đó. Mỗi tuổi một lời khuyên khác nhau, không dùng chung khuôn câu hay lặp ý giữa các tuổi.
- Không dọa nạt, không hứa hẹn tiền bạc, không nói về sức khỏe, bệnh tật hay sinh tử.
- Không nêu ngày, tháng, năm hay can chi nào khác ngoài dữ kiện đã cho.
- "diem": số nguyên nằm trong khoảng điểm được phép của tuổi đó (5 là tốt nhất).
- "gioTot": đúng một khung trong danh sách: ${ctx.gioHoangDaoRanges.join(", ")}.

Trả về DUY NHẤT một object JSON, không kèm chữ nào khác, không dùng markdown:
{"date": "${ctx.date}", "tuoi": [{"slug": "ty", "luan": "...", "diem": 4, "gioTot": "${ctx.gioHoangDaoRanges[0] ?? "7h–9h"}"}, ...]}
Mảng "tuoi" có đúng 12 phần tử theo đúng thứ tự bảng trên, mỗi mã xuất hiện đúng một lần.`;
}

/** Schema JSON (tập con OpenAPI mà Gemini hỗ trợ) để Gemini tự ràng buộc output; phía mình vẫn kiểm lại nghiêm ngặt. */
export function buildResponseSchema(ctx: DayContext): Record<string, unknown> {
  return {
    type: "OBJECT",
    properties: {
      date: { type: "STRING", enum: [ctx.date] },
      tuoi: {
        type: "ARRAY",
        minItems: CON_GIAP_LIST.length,
        maxItems: CON_GIAP_LIST.length,
        items: {
          type: "OBJECT",
          properties: {
            slug: { type: "STRING", enum: CON_GIAP_LIST.map((c) => c.slug) },
            luan: { type: "STRING" },
            diem: { type: "INTEGER", minimum: 1, maximum: 5 },
            gioTot: ctx.gioHoangDaoRanges.length > 0 ? { type: "STRING", enum: ctx.gioHoangDaoRanges } : { type: "STRING" },
          },
          required: ["slug", "luan", "diem", "gioTot"],
          propertyOrdering: ["slug", "luan", "diem", "gioTot"],
        },
      },
    },
    required: ["date", "tuoi"],
    propertyOrdering: ["date", "tuoi"],
  };
}

/** Thông báo lỗi có thể chứa phần thân phản hồi — cắt ngắn và che khóa phòng khi máy chủ lặp lại nó. */
function safeSnippet(text: string, apiKey: string): string {
  const oneLine = text.slice(0, 2_000).replace(/\s+/g, " ").trim().slice(0, 200);
  return apiKey ? oneLine.split(apiKey).join("***") : oneLine;
}

interface GoogleErrorDetail {
  "@type"?: string;
  retryDelay?: string;
  violations?: { quotaId?: string }[];
}

function errorDetails(body: string): GoogleErrorDetail[] {
  try {
    const d = (JSON.parse(body) as { error?: { details?: unknown } }).error?.details;
    return Array.isArray(d) ? (d as GoogleErrorDetail[]) : [];
  } catch {
    return [];
  }
}

function httpError(status: number, body: string, apiKey: string): GeminiError {
  const message = `HTTP ${status}: ${safeSnippet(body, apiKey)}`;
  if (status === 404) return new GeminiError(message, "model-unusable", "api");
  if (status === 400 && /model/i.test(body) && /not found|not supported/i.test(body)) {
    return new GeminiError(message, "model-unusable", "api");
  }
  // Khóa sai, hết quyền, yêu cầu sai: gọi lại cũng vô ích, dừng cả lượt.
  if (status === 400 || status === 401 || status === 403) return new GeminiError(message, "fatal", "api");
  if (status === 429) {
    const details = errorDetails(body);
    const quotaIds = details.flatMap((d) => (d.violations ?? []).map((v) => v.quotaId ?? ""));
    // Hết hạn mức theo ngày: chờ không giải quyết được. Hạn mức tính riêng từng model nên còn thử được model dự phòng.
    if (quotaIds.some((q) => /PerDay/i.test(q))) {
      return new GeminiError(`hết hạn mức theo ngày (${quotaIds.join(", ")})`, "model-unusable", "quota");
    }
    const delay = details.find((d) => typeof d.retryDelay === "string")?.retryDelay;
    const seconds = delay ? Number.parseFloat(delay) : Number.NaN;
    const retryAfterMs = Number.isFinite(seconds) ? Math.ceil(seconds * 1000) + 1000 : DEFAULT_RATE_LIMIT_DELAY_MS;
    return new GeminiError(
      `HTTP 429 vượt hạn mức theo phút${quotaIds.length ? ` (${quotaIds.join(", ")})` : ""}`,
      "retryable",
      "quota",
      Math.min(retryAfterMs, MAX_RATE_LIMIT_DELAY_MS),
    );
  }
  return new GeminiError(message, "retryable", "api");
}

function stripCodeFence(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
}

interface CallOptions {
  fetchImpl: typeof fetch;
  apiKey: string;
  timeoutMs: number;
}

/** Tắt "thinking" ở dòng 2.5-flash để token suy nghĩ không ăn vào trần output; model khác giữ mặc định. */
function thinkingConfigFor(model: string): Record<string, unknown> | undefined {
  return /^gemini-2\.5-flash/.test(model) ? { thinkingBudget: 0 } : undefined;
}

async function callGemini(model: string, ctx: DayContext, opts: CallOptions): Promise<unknown> {
  // Khóa đi qua header, không nằm trong URL, để không lọt vào log/thông báo lỗi.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const thinkingConfig = thinkingConfigFor(model);
  let status: number;
  let ok: boolean;
  let bodyText: string;
  try {
    const res = await opts.fetchImpl(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": opts.apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: buildBatchPrompt(ctx) }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: buildResponseSchema(ctx),
          temperature: 0.9,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          ...(thinkingConfig ? { thinkingConfig } : {}),
        },
      }),
      signal: AbortSignal.timeout(opts.timeoutMs),
    });
    status = res.status;
    ok = res.ok;
    bodyText = await res.text();
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    if (name === "TimeoutError" || name === "AbortError") {
      throw new GeminiError(`hết thời gian chờ ${opts.timeoutMs}ms`, "retryable", "timeout");
    }
    const msg = err instanceof Error ? err.message : String(err);
    throw new GeminiError(`lỗi mạng: ${safeSnippet(msg, opts.apiKey)}`, "retryable", "api");
  }

  if (!ok) throw httpError(status, bodyText, opts.apiKey);
  if (bodyText.length > MAX_RESPONSE_CHARS) {
    throw new GeminiError(`phản hồi quá lớn (${bodyText.length} ký tự)`, "retryable", "invalid");
  }

  let json: {
    candidates?: { finishReason?: string; content?: { parts?: { text?: string; thought?: boolean }[] } }[];
    promptFeedback?: { blockReason?: string };
  };
  try {
    json = JSON.parse(bodyText);
  } catch {
    throw new GeminiError("phản hồi API không phải JSON", "retryable", "invalid");
  }
  const candidate = json.candidates?.[0];
  const text = (candidate?.content?.parts ?? [])
    .filter((p) => !p.thought && typeof p.text === "string")
    .map((p) => p.text)
    .join("");
  // Bị cắt vì chạm trần token: dù phần đầu parse được cũng không dùng.
  if (candidate?.finishReason === "MAX_TOKENS") {
    throw new GeminiError(`output bị cắt (MAX_TOKENS, ${text.length} ký tự)`, "retryable", "invalid");
  }
  if (!text.trim()) {
    const why = json.promptFeedback?.blockReason ?? candidate?.finishReason ?? "không có candidate";
    throw new GeminiError(`Gemini không trả về nội dung (${why})`, "retryable", "invalid");
  }
  try {
    return JSON.parse(stripCodeFence(text));
  } catch {
    const why = candidate?.finishReason && candidate.finishReason !== "STOP" ? ` (finishReason ${candidate.finishReason})` : "";
    throw new GeminiError(`JSON lỗi hoặc bị cắt${why}: ${safeSnippet(text, opts.apiKey)}`, "retryable", "invalid");
  }
}

/** Chuẩn hóa những sai lệch vô hại (điểm 4.0, gạch nối khác) rồi kiểm nghiêm ngặt như lúc đọc file. */
export function parseGeneratedEntry(
  raw: unknown,
  allowedGio: readonly string[],
  diemRange?: readonly [number, number],
): { entry: TuViEntry } | { error: string } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { error: "không phải object" };
  const r = raw as Record<string, unknown>;
  const candidate = {
    luan: r.luan,
    diem: typeof r.diem === "number" && Number.isFinite(r.diem) ? Math.round(r.diem) : r.diem,
    gioTot: typeof r.gioTot === "string" ? normalizeGioTot(r.gioTot) : r.gioTot,
  };
  const v = validateTuViEntry(candidate);
  if ("error" in v) return v;
  if (allowedGio.length > 0 && !allowedGio.includes(v.entry.gioTot)) {
    return { error: `gioTot ${v.entry.gioTot} không thuộc giờ hoàng đạo của ngày (${allowedGio.join(", ")})` };
  }
  if (diemRange && (v.entry.diem < diemRange[0] || v.entry.diem > diemRange[1])) {
    return { error: `diem ${v.entry.diem} ngoài khoảng ${diemRange[0]}–${diemRange[1]} theo quan hệ với ngày` };
  }
  return v;
}

/**
 * Kiểm phản hồi lô 12 tuổi: đúng ngày, đủ 12 phần tử, mỗi tuổi đúng một lần, từng tuổi hợp lệ. Có lỗi nào là bỏ cả lô —
 * không bao giờ trả về một phần.
 */
export function parseBatchResponse(raw: unknown, ctx: DayContext): { tuoi: Record<string, TuViEntry> } | { errors: string[] } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { errors: ["không phải object JSON"] };
  const r = raw as Record<string, unknown>;
  const errors: string[] = [];
  if (r.date !== ctx.date) errors.push(`date là ${String(r.date)}, cần ${ctx.date}`);
  if (!Array.isArray(r.tuoi)) return { errors: [...errors, "thiếu mảng tuoi"] };
  if (r.tuoi.length !== CON_GIAP_LIST.length) errors.push(`có ${r.tuoi.length} tuổi, cần đúng ${CON_GIAP_LIST.length}`);

  const tuoi: Record<string, TuViEntry> = {};
  const seen = new Set<string>();
  r.tuoi.forEach((item, i) => {
    const slug = typeof item === "object" && item !== null ? (item as Record<string, unknown>).slug : undefined;
    const cg = CON_GIAP_LIST.find((c) => c.slug === slug);
    if (!cg) {
      errors.push(`phần tử ${i}: slug lạ (${String(slug)})`);
      return;
    }
    if (seen.has(cg.slug)) {
      errors.push(`trùng tuổi ${cg.ten}`);
      return;
    }
    seen.add(cg.slug);
    const range = DIEM_RANGE[quanHeVoiNgay(ctx.dayChiIndex, cg.chiIndex)];
    const p = parseGeneratedEntry(item, ctx.gioHoangDaoRanges, range);
    if ("error" in p) errors.push(`tuổi ${cg.ten}: ${p.error}`);
    else tuoi[cg.slug] = p.entry;
  });
  for (const cg of CON_GIAP_LIST) if (!seen.has(cg.slug)) errors.push(`thiếu tuổi ${cg.ten}`);
  return errors.length > 0 ? { errors } : { tuoi };
}

/** Ghi qua tệp tạm cùng thư mục rồi đổi tên: người đọc chỉ thấy file cũ hoặc file mới đầy đủ, không bao giờ file ghi dở. */
export function writeJsonAtomic(path: string, data: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.${process.pid}.${Date.now()}.tmp`;
  try {
    const fd = openSync(tmp, "wx");
    try {
      writeFileSync(fd, `${JSON.stringify(data, null, 2)}\n`);
      fsyncSync(fd);
    } finally {
      closeSync(fd);
    }
    renameSync(tmp, path);
  } catch (err) {
    rmSync(tmp, { force: true });
    throw err;
  }
}

/** Nơi lưu dữ liệu tử vi. Mặc định là thư mục trong repo (web/content/tu-vi) — workflow commit nó lên git. */
export interface TuViStore {
  /** Mô tả ngắn để ghi log (không chứa bí mật). */
  describe(date: string): string;
  load(date: string): TuViLoad;
  /** Ghi nguyên tử. Ném lỗi nếu không ghi được. */
  save(data: TuViDayData): void;
  /** Giành khóa của một ngày; trả về hàm nhả khóa, hoặc null nếu lượt khác đang giữ. */
  tryLock(date: string, staleMs: number): (() => void) | null;
}

export function fsTuViStore(dir: string): TuViStore {
  return {
    describe: (date) => tuViFilePath(dir, date),
    load: (date) => loadTuViDay(date, dir),
    save: (data) => writeJsonAtomic(tuViFilePath(dir, data.date), data),
    tryLock(date, staleMs) {
      mkdirSync(dir, { recursive: true });
      const lockPath = join(dir, `.${date}.lock`);
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const fd = openSync(lockPath, "wx"); // O_EXCL: chỉ một lượt tạo được
          writeFileSync(fd, JSON.stringify({ pid: process.pid, at: new Date().toISOString() }));
          closeSync(fd);
          return () => rmSync(lockPath, { force: true });
        } catch (err) {
          if ((err as NodeJS.ErrnoException).code !== "EEXIST") throw err;
          let age = 0;
          try {
            age = Date.now() - statSync(lockPath).mtimeMs;
          } catch {
            continue; // lượt kia vừa nhả khóa
          }
          if (age < staleMs) return null;
          rmSync(lockPath, { force: true }); // khóa của lượt đã chết
        }
      }
      return null;
    },
  };
}

export type TuViLogger = Pick<Console, "log" | "warn" | "error">;

export interface TuViGenerateOptions {
  /** Thư mục dữ liệu; bỏ qua nếu truyền `store`. */
  dataDir?: string;
  store?: TuViStore;
  apiKey: string | undefined;
  /** Thời điểm quyết định NGÀY cần sinh (theo giờ Việt Nam). Chỉ đọc một lần lúc bắt đầu. */
  now?: Date;
  /** Đồng hồ cho generatedAt. */
  clock?: () => Date;
  fetch?: typeof fetch;
  timeoutMs?: number;
  retryDelayMs?: number;
  /** Tổng thời gian tối đa của một lượt sinh, kể cả thời gian chờ 429. */
  maxRunMs?: number;
  /** Trần số request tới Gemini trong lượt này. */
  maxRequests?: number;
  sleep?: (ms: number) => Promise<void>;
  primaryModel?: string;
  fallbackModel?: string;
  logger?: TuViLogger;
}

export type TuViGenerateResult =
  | { status: "exists"; date: string }
  | { status: "written"; date: string; model: string; location: string; requests: number }
  | { status: "no-key"; date: string }
  | { status: "locked"; date: string }
  | { status: "failed"; date: string; reason: string; category: FailureCategory; requests: number };

interface BatchContext extends CallOptions {
  retryDelayMs: number;
  logger: TuViLogger;
  sleep: (ms: number) => Promise<void>;
  deadline: number;
  maxRequests: number;
  primary: string;
  fallback: string;
  requests: number;
}

async function generateBatch(ctx: DayContext, gen: BatchContext): Promise<{ tuoi: Record<string, TuViEntry>; model: string }> {
  let model = gen.primary;
  let attemptsOnModel = 0;
  let lastErr: GeminiError | undefined;
  const switchToFallback = (why: string) => {
    gen.logger.warn(`tu-vi: model ${model} ${why}, chuyển sang ${gen.fallback}.`);
    model = gen.fallback;
    attemptsOnModel = 0;
  };

  while (gen.requests < gen.maxRequests) {
    if (attemptsOnModel >= MAX_ATTEMPTS_PER_MODEL && model !== gen.fallback) {
      switchToFallback(`lỗi ${attemptsOnModel} lần liền`);
    }
    gen.requests++;
    attemptsOnModel++;
    gen.logger.log(`tu-vi: request ${gen.requests}/${gen.maxRequests} tới ${model}.`);
    try {
      const raw = await callGemini(model, ctx, gen);
      const parsed = parseBatchResponse(raw, ctx);
      if ("errors" in parsed) {
        throw new GeminiError(`sai schema: ${parsed.errors.slice(0, 5).join("; ")}`, "retryable", "invalid");
      }
      // Kiểm cả ngày bằng đúng hàm trang dùng khi đọc (luận trùng nhau, can chi nhắc sai…) — sai thì thử lại như sai schema.
      const check = validateTuViDayData({ date: ctx.date, generatedAt: new Date(0).toISOString(), model, tuoi: parsed.tuoi }, ctx.date);
      if (!check.ok) throw new GeminiError(`nội dung không đạt: ${check.errors.slice(0, 5).join("; ")}`, "retryable", "invalid");
      return { tuoi: parsed.tuoi, model };
    } catch (err) {
      const e = err instanceof GeminiError ? err : new GeminiError(String(err), "retryable", "api");
      lastErr = e;
      if (e.kind === "fatal") throw e;
      if (e.kind === "model-unusable") {
        if (model === gen.fallback) throw new GeminiError(`model ${model} không dùng được (${e.message})`, "fatal", e.category);
        switchToFallback(`không dùng được (${e.message})`);
        continue;
      }
      gen.logger.warn(`tu-vi: request ${gen.requests}/${gen.maxRequests} lỗi — ${e.message}`);
      if (gen.requests >= gen.maxRequests) break;
      const wait = e.retryAfterMs ?? gen.retryDelayMs * attemptsOnModel;
      if (Date.now() + wait > gen.deadline) {
        throw new GeminiError(`quá thời gian cho phép của lượt sinh (${e.message})`, "fatal", e.category);
      }
      if (e.retryAfterMs) gen.logger.warn(`tu-vi: chờ ${Math.round(wait / 1000)} giây theo yêu cầu của Gemini rồi gọi lại.`);
      if (wait > 0) await gen.sleep(wait);
    }
  }
  const last = lastErr ?? new GeminiError("không rõ lỗi", "retryable", "api");
  throw new GeminiError(`đã dùng hết ${gen.maxRequests} request (${last.message})`, "fatal", last.category);
}

/** Build/deploy không được gọi Gemini: trả về lý do từ chối nếu đang chạy trong môi trường dựng trang. */
export function refuseInBuildEnv(env: Record<string, string | undefined>): string | null {
  if (env.VERCEL) return "đang chạy trong Vercel (build/deploy) — sinh tử vi chỉ chạy ở workflow riêng";
  if (env.NEXT_PHASE === "phase-production-build") return "đang trong next build";
  return null;
}

export async function runTuViGeneration(opts: TuViGenerateOptions): Promise<TuViGenerateResult> {
  const logger = opts.logger ?? console;
  const clock = opts.clock ?? (() => new Date());
  // Ngày được chốt MỘT lần: lượt chạy vắt qua 00:00 vẫn ghi cho ngày nó bắt đầu, không nhảy sang ngày mới giữa chừng.
  const day = vietnamDateOf(opts.now ?? clock());
  const date = dateStr(day);
  if (!opts.store && !opts.dataDir) throw new Error("cần dataDir hoặc store");
  const store = opts.store ?? fsTuViStore(opts.dataDir!);
  const fallbackNote = "Trang tử vi sẽ ở trạng thái dự phòng: chỉ hiện can chi và quan hệ tuổi, không có lời luận/điểm/giờ tốt.";
  const failed = (reason: string, category: FailureCategory, requests: number): TuViGenerateResult => {
    logger.error(`tu-vi: LỖI [${category}] ${date}: ${reason}. Không lưu gì. ${fallbackNote}`);
    return { status: "failed", date, reason, category, requests };
  };

  let existing: TuViLoad;
  try {
    existing = store.load(date);
  } catch (err) {
    return failed(`không đọc được kho lưu: ${err instanceof Error ? err.message : String(err)}`, "storage", 0);
  }
  if (existing.status === "ok") {
    logger.log(`tu-vi: đã có dữ liệu hợp lệ cho ${date} (model ${existing.data.model}), không gọi Gemini.`);
    return { status: "exists", date };
  }
  if (existing.status === "invalid") {
    logger.warn(`tu-vi: dữ liệu ${date} hiện có không hợp lệ, trang sẽ bỏ qua nó — ${existing.errors.slice(0, 3).join("; ")}`);
  }

  if (!opts.apiKey) {
    logger.error(`tu-vi: LỖI — thiếu biến môi trường GEMINI_API_KEY, không sinh nội dung cho ${date}. ${fallbackNote}`);
    return { status: "no-key", date };
  }

  const maxRunMs = opts.maxRunMs ?? DEFAULT_MAX_RUN_MS;
  let release: (() => void) | null;
  try {
    release = store.tryLock(date, Math.max(LOCK_STALE_MS, maxRunMs + 60_000));
  } catch (err) {
    return failed(`không tạo được khóa: ${err instanceof Error ? err.message : String(err)}`, "storage", 0);
  }
  if (!release) {
    logger.warn(`tu-vi: một lượt khác đang sinh ${date}, bỏ qua lượt này.`);
    return { status: "locked", date };
  }

  const gen: BatchContext = {
    fetchImpl: opts.fetch ?? fetch,
    apiKey: opts.apiKey,
    timeoutMs: opts.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    retryDelayMs: opts.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS,
    logger,
    sleep: opts.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms))),
    deadline: Date.now() + maxRunMs,
    maxRequests: Math.max(1, opts.maxRequests ?? DEFAULT_MAX_REQUESTS),
    primary: opts.primaryModel ?? PRIMARY_MODEL,
    fallback: opts.fallbackModel ?? FALLBACK_MODEL,
    requests: 0,
  };

  try {
    // Kiểm lại sau khi giữ khóa: lượt vừa nhả khóa có thể đã lưu xong.
    const again = store.load(date);
    if (again.status === "ok") {
      logger.log(`tu-vi: lượt khác vừa lưu xong ${date}, không gọi Gemini.`);
      return { status: "exists", date };
    }

    const ctx = buildDayContext(day);
    let result: { tuoi: Record<string, TuViEntry>; model: string };
    try {
      result = await generateBatch(ctx, gen);
    } catch (err) {
      const e = err instanceof GeminiError ? err : undefined;
      return failed(err instanceof Error ? err.message : String(err), e?.category ?? "api", gen.requests);
    }

    const data: TuViDayData = {
      date,
      generatedAt: clock().toISOString(),
      model: result.model,
      canChiNgay: ctx.ngayCanChi,
      tuoi: result.tuoi,
    };
    const check = validateTuViDayData(data, date);
    if (!check.ok) return failed(`dữ liệu sinh ra không hợp lệ: ${check.errors.join("; ")}`, "invalid", gen.requests);
    try {
      store.save(check.data);
      // Đọc lại đúng như trang sẽ đọc: chỉ công nhận thành công khi kho trả về bản hợp lệ.
      if (store.load(date).status !== "ok") throw new Error("đọc lại sau khi ghi không hợp lệ");
    } catch (err) {
      return failed(`không lưu được: ${err instanceof Error ? err.message : String(err)}`, "storage", gen.requests);
    }
    logger.log(`tu-vi: đã lưu ${date} (model ${check.data.model}, ${gen.requests} request) vào ${store.describe(date)}.`);
    return { status: "written", date, model: check.data.model, location: store.describe(date), requests: gen.requests };
  } finally {
    release();
  }
}
