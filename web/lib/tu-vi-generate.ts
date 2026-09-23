/**
 * Sinh nội dung tử vi hằng ngày bằng Gemini — phần lõi của scripts/generate-tu-vi.ts, tách ra để kiểm thử được
 * (fetch, đồng hồ, thư mục dữ liệu đều truyền vào).
 *
 * Nguyên tắc:
 * - Chỉ ghi file khi ĐỦ 12 tuổi có nội dung hợp lệ do Gemini sinh cho đúng ngày đó. Không ghi file giữ chỗ, không chép
 *   lời luận của ngày khác sang ngày mới.
 * - Gemini lỗi thì ghi lỗi rõ ràng và không ghi gì: trang tự rơi về trạng thái dự phòng (chỉ phần tính bằng luật).
 * - Không bao giờ ghi đè file hợp lệ đã có; ghi file mới qua tệp tạm rồi đổi tên, nên không để lại file ghi dở.
 * - Không bao giờ in khóa API.
 */
import { closeSync, fsyncSync, mkdirSync, openSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { CHI, getDayInfo, vietnamDateOf } from "@licham/core";
import {
  CON_GIAP_LIST,
  QUAN_HE_LABEL,
  dateStr,
  loadTuViDay,
  normalizeGioTot,
  quanHeVoiNgay,
  tuViFilePath,
  validateTuViDayData,
  validateTuViEntry,
  type ConGiap,
  type TuViDayData,
  type TuViEntry,
} from "./tu-vi";

/**
 * "gemini-3-flash" (tên cũ) không tồn tại — ListModels ngày 23/9/2026 chỉ có các bản 3.x có số phụ hoặc "-preview".
 * Dùng model ổn định đã xác minh chạy được; muốn đổi thì đặt biến GEMINI_MODEL, không cần sửa mã.
 */
export const PRIMARY_MODEL = "gemini-2.5-flash";
/** Alias luôn trỏ tới bản flash ổn định mới nhất, chỉ dùng khi model chính bị gỡ (404). */
export const FALLBACK_MODEL = "gemini-flash-latest";
/** 1 lần gọi đầu + tối đa 2 lần thử lại cho mỗi tuổi, trên mỗi model. */
const MAX_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 30_000;
/** Chờ 5s rồi 10s: lỗi 503 "high demand" của Gemini thường kéo dài hơn vài giây. */
const DEFAULT_RETRY_DELAY_MS = 5_000;
/** Khi bị 429 mà Google không nói phải chờ bao lâu. */
const DEFAULT_RATE_LIMIT_DELAY_MS = 30_000;
/** Chờ 429 lâu nhất một lần; hạn mức theo phút nên hơn 1 phút là bất thường. */
const MAX_RATE_LIMIT_DELAY_MS = 65_000;
/** Cả lượt sinh không được kéo dài build quá mức này. */
const DEFAULT_MAX_RUN_MS = 8 * 60_000;

interface DayContext {
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

export class GeminiError extends Error {
  kind: GeminiErrorKind;
  /** Thời gian Google yêu cầu chờ trước khi gọi lại (429). */
  retryAfterMs: number | undefined;
  constructor(message: string, kind: GeminiErrorKind, retryAfterMs?: number) {
    super(message);
    this.name = "GeminiError";
    this.kind = kind;
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

function buildDayContext(day: { day: number; month: number; year: number }): DayContext {
  const info = getDayInfo(day);
  const dayChiIndex = info.canChi.day.chiIndex;
  const hoangDao = info.hours.filter((h) => h.isHoangDao);
  return {
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

function buildPrompt(ctx: DayContext, conGiap: ConGiap): string {
  const quanHe = quanHeVoiNgay(ctx.dayChiIndex, conGiap.chiIndex);
  return `Bạn viết nội dung tử vi ngày cho một trang lịch âm Việt Nam. Viết tiếng Việt tự nhiên, giọng điềm đạm.

Dữ kiện của ngày (không phải dữ liệu người dùng, chỉ dùng để luận):
- Ngày dương lịch: ${ctx.solarLabel}
- Can chi ngày: ${ctx.ngayCanChi}
- Sao tốt trong ngày: ${ctx.saoTot}
- Sao xấu trong ngày: ${ctx.saoXau}
- Giờ hoàng đạo trong ngày: ${ctx.gioHoangDao}

Tuổi cần luận: chi "${conGiap.ten}".
Quan hệ giữa chi ngày (${ctx.ngayChiTen}) và chi tuổi này: ${QUAN_HE_LABEL[quanHe]}.

Yêu cầu:
- Viết một đoạn 2 đến 3 câu luận cho tuổi ${conGiap.ten} trong ngày này, dựa trên quan hệ đã nêu ở trên.
- Không dọa nạt, không hứa hẹn tiền bạc, không nói về sức khỏe, bệnh tật hay sinh tử.
- Câu văn phải khác với văn phong liệt kê dữ kiện, đọc như một lời khuyên nhẹ nhàng.
- Chọn một mức đánh giá là số nguyên từ 1 đến 5 (5 là tốt nhất) phù hợp với quan hệ đã nêu.
- Chọn một khung giờ tốt nhất trong ngày cho tuổi này, lấy từ đúng danh sách giờ hoàng đạo đã cho, viết dạng "7h–9h".

Trả về DUY NHẤT một object JSON, không kèm chữ nào khác, không dùng markdown, đúng dạng:
{"luan": "...", "diem": 4, "gioTot": "7h–9h"}`;
}

/** Thông báo lỗi có thể chứa phần thân phản hồi — cắt ngắn và che khóa phòng khi máy chủ lặp lại nó. */
function safeSnippet(text: string, apiKey: string): string {
  const oneLine = text.replace(/\s+/g, " ").trim().slice(0, 200);
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
  if (status === 404) return new GeminiError(message, "model-unusable");
  if (status === 400 && /model/i.test(body) && /not found|not supported/i.test(body)) {
    return new GeminiError(message, "model-unusable");
  }
  // Khóa sai, hết quyền, yêu cầu sai: gọi lại cũng vô ích, dừng cả lượt.
  if (status === 400 || status === 401 || status === 403) return new GeminiError(message, "fatal");
  if (status === 429) {
    const details = errorDetails(body);
    const quotaIds = details.flatMap((d) => (d.violations ?? []).map((v) => v.quotaId ?? ""));
    // Hết hạn mức theo ngày: chờ không giải quyết được. Hạn mức tính riêng từng model nên còn thử được model dự phòng.
    if (quotaIds.some((q) => /PerDay/i.test(q))) {
      return new GeminiError(`hết hạn mức theo ngày (${quotaIds.join(", ")})`, "model-unusable");
    }
    const delay = details.find((d) => typeof d.retryDelay === "string")?.retryDelay;
    const seconds = delay ? Number.parseFloat(delay) : Number.NaN;
    const retryAfterMs = Number.isFinite(seconds) ? Math.ceil(seconds * 1000) + 1000 : DEFAULT_RATE_LIMIT_DELAY_MS;
    return new GeminiError(
      `HTTP 429 vượt hạn mức theo phút${quotaIds.length ? ` (${quotaIds.join(", ")})` : ""}`,
      "retryable",
      Math.min(retryAfterMs, MAX_RATE_LIMIT_DELAY_MS),
    );
  }
  return new GeminiError(message, "retryable");
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

async function callGemini(model: string, prompt: string, opts: CallOptions): Promise<unknown> {
  // Khóa đi qua header, không nằm trong URL, để không lọt vào log/thông báo lỗi.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  let status: number;
  let ok: boolean;
  let bodyText: string;
  try {
    const res = await opts.fetchImpl(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": opts.apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.9 },
      }),
      signal: AbortSignal.timeout(opts.timeoutMs),
    });
    status = res.status;
    ok = res.ok;
    bodyText = await res.text();
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    if (name === "TimeoutError" || name === "AbortError") {
      throw new GeminiError(`hết thời gian chờ ${opts.timeoutMs}ms`, "retryable");
    }
    const msg = err instanceof Error ? err.message : String(err);
    throw new GeminiError(`lỗi mạng: ${safeSnippet(msg, opts.apiKey)}`, "retryable");
  }

  if (!ok) {
    throw httpError(status, bodyText, opts.apiKey);
  }

  let json: {
    candidates?: { finishReason?: string; content?: { parts?: { text?: string; thought?: boolean }[] } }[];
    promptFeedback?: { blockReason?: string };
  };
  try {
    json = JSON.parse(bodyText);
  } catch {
    throw new GeminiError("phản hồi API không phải JSON", "retryable");
  }
  const candidate = json.candidates?.[0];
  const text = (candidate?.content?.parts ?? [])
    .filter((p) => !p.thought && typeof p.text === "string")
    .map((p) => p.text)
    .join("");
  if (!text.trim()) {
    const why = json.promptFeedback?.blockReason ?? candidate?.finishReason ?? "không có candidate";
    throw new GeminiError(`Gemini không trả về nội dung (${why})`, "retryable");
  }
  try {
    return JSON.parse(stripCodeFence(text));
  } catch {
    throw new GeminiError(`nội dung Gemini không phải JSON: ${safeSnippet(text, opts.apiKey)}`, "retryable");
  }
}

/** Chuẩn hóa những sai lệch vô hại (điểm 4.0, gạch nối khác) rồi kiểm nghiêm ngặt như lúc đọc file. */
export function parseGeneratedEntry(raw: unknown, allowedGio: readonly string[]): { entry: TuViEntry } | { error: string } {
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
  return v;
}

interface ModelState {
  current: string;
  fallback: string;
}

interface GenerateContext extends CallOptions {
  retryDelayMs: number;
  logger: TuViLogger;
  sleep: (ms: number) => Promise<void>;
  /** Mốc Date.now() mà sau đó không được chờ thêm nữa. */
  deadline: number;
}

async function generateOne(
  ctx: DayContext,
  conGiap: ConGiap,
  state: ModelState,
  gen: GenerateContext,
): Promise<{ entry: TuViEntry; model: string }> {
  let lastErr: GeminiError | undefined;
  let attempt = 0;
  for (;;) {
    if (attempt >= MAX_ATTEMPTS) {
      // Model chính lỗi liên tục (quá tải, trả sai dạng…): thử model dự phòng một lượt, rồi mới bỏ cuộc.
      if (state.current === state.fallback) break;
      gen.logger.warn(`tu-vi: model ${state.current} lỗi ${MAX_ATTEMPTS} lần liền, chuyển sang ${state.fallback}.`);
      state.current = state.fallback;
      attempt = 0;
    }
    const model = state.current;
    try {
      const raw = await callGemini(model, buildPrompt(ctx, conGiap), gen);
      const parsed = parseGeneratedEntry(raw, ctx.gioHoangDaoRanges);
      if ("error" in parsed) throw new GeminiError(`sai schema: ${parsed.error}`, "retryable");
      return { entry: parsed.entry, model };
    } catch (err) {
      const e = err instanceof GeminiError ? err : new GeminiError(String(err), "retryable");
      lastErr = e;
      if (e.kind === "fatal") throw e;
      if (e.kind === "model-unusable") {
        if (model === state.fallback) throw new GeminiError(`model ${model} không dùng được (${e.message})`, "fatal");
        gen.logger.warn(`tu-vi: model ${model} không dùng được (${e.message}), chuyển sang ${state.fallback}.`);
        state.current = state.fallback;
        continue; // đổi model không tính là một lần thử
      }
      attempt++;
      gen.logger.warn(`tu-vi: tuổi ${conGiap.ten} lần ${attempt}/${MAX_ATTEMPTS} lỗi — ${e.message}`);
      if (attempt < MAX_ATTEMPTS) {
        const wait = e.retryAfterMs ?? gen.retryDelayMs * attempt;
        if (Date.now() + wait > gen.deadline) {
          throw new GeminiError(`quá thời gian cho phép của lượt sinh (${e.message})`, "fatal");
        }
        if (e.retryAfterMs) gen.logger.warn(`tu-vi: chờ ${Math.round(wait / 1000)} giây theo yêu cầu của Gemini rồi gọi lại.`);
        if (wait > 0) await gen.sleep(wait);
      }
    }
  }
  throw lastErr ?? new GeminiError("không rõ lỗi", "retryable");
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

export type TuViLogger = Pick<Console, "log" | "warn" | "error">;

export interface TuViGenerateOptions {
  dataDir: string;
  apiKey: string | undefined;
  now?: Date;
  fetch?: typeof fetch;
  timeoutMs?: number;
  retryDelayMs?: number;
  /** Tổng thời gian tối đa của một lượt sinh, kể cả thời gian chờ 429. */
  maxRunMs?: number;
  sleep?: (ms: number) => Promise<void>;
  primaryModel?: string;
  fallbackModel?: string;
  logger?: TuViLogger;
}

export type TuViGenerateResult =
  | { status: "exists"; date: string }
  | { status: "written"; date: string; model: string; path: string }
  | { status: "no-key"; date: string }
  | { status: "failed"; date: string; reason: string };

export async function runTuViGeneration(opts: TuViGenerateOptions): Promise<TuViGenerateResult> {
  const logger = opts.logger ?? console;
  const day = vietnamDateOf(opts.now ?? new Date());
  const date = dateStr(day);
  const outPath = tuViFilePath(opts.dataDir, date);
  const fallbackNote = "Trang tử vi sẽ ở trạng thái dự phòng: chỉ hiện can chi và quan hệ tuổi, không có lời luận/điểm/giờ tốt.";

  const existing = loadTuViDay(date, opts.dataDir);
  if (existing.status === "ok") {
    logger.log(`tu-vi: đã có ${date}.json hợp lệ (model ${existing.data.model}), không gọi lại Gemini.`);
    return { status: "exists", date };
  }
  if (existing.status === "invalid") {
    logger.warn(`tu-vi: ${date}.json hiện có không hợp lệ, trang sẽ bỏ qua nó — ${existing.errors.slice(0, 3).join("; ")}`);
  }

  if (!opts.apiKey) {
    logger.error(`tu-vi: LỖI — thiếu biến môi trường GEMINI_API_KEY, không sinh nội dung cho ${date}. ${fallbackNote}`);
    return { status: "no-key", date };
  }

  const ctx = buildDayContext(day);
  const fallback = opts.fallbackModel ?? FALLBACK_MODEL;
  const state: ModelState = { current: opts.primaryModel ?? PRIMARY_MODEL, fallback };
  const gen: GenerateContext = {
    fetchImpl: opts.fetch ?? fetch,
    apiKey: opts.apiKey,
    timeoutMs: opts.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    retryDelayMs: opts.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS,
    logger,
    sleep: opts.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms))),
    deadline: Date.now() + (opts.maxRunMs ?? DEFAULT_MAX_RUN_MS),
  };

  const tuoi: Record<string, TuViEntry> = {};
  const models = new Set<string>();
  try {
    for (const conGiap of CON_GIAP_LIST) {
      const { entry, model } = await generateOne(ctx, conGiap, state, gen);
      tuoi[conGiap.slug] = entry;
      models.add(model);
      logger.log(`tu-vi: đã sinh tuổi ${conGiap.ten} (model ${model}).`);
    }
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    logger.error(`tu-vi: LỖI — gọi Gemini thất bại cho ${date}: ${reason}. Không ghi file. ${fallbackNote}`);
    return { status: "failed", date, reason };
  }

  const data: TuViDayData = { date, generatedAt: new Date().toISOString(), model: [...models].join("+"), tuoi };
  // Kiểm lần cuối bằng đúng hàm trang dùng để đọc, rồi mới ghi.
  const check = validateTuViDayData(data, date);
  if (!check.ok) {
    const reason = `dữ liệu sinh ra không hợp lệ: ${check.errors.join("; ")}`;
    logger.error(`tu-vi: LỖI — ${reason}. Không ghi file. ${fallbackNote}`);
    return { status: "failed", date, reason };
  }
  try {
    writeJsonAtomic(outPath, check.data);
  } catch (err) {
    const reason = `không ghi được file: ${err instanceof Error ? err.message : String(err)}`;
    logger.error(`tu-vi: LỖI — ${reason}. ${fallbackNote}`);
    return { status: "failed", date, reason };
  }
  logger.log(`tu-vi: đã ghi ${date}.json (model ${check.data.model}).`);
  return { status: "written", date, model: check.data.model, path: outPath };
}
