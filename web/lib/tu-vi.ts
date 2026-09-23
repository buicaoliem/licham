import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { CHI, type ChiName, canChiNamDuong } from "@licham/core";

export interface ConGiap {
  /** 0..11, vị trí trong mảng CHI của @licham/core. */
  chiIndex: number;
  ten: ChiName;
  slug: string;
}

/** Tỵ dùng slug "ty-ran" vì trùng "ty" với Tý khi bỏ dấu. */
const SLUGS = ["ty", "suu", "dan", "mao", "thin", "ty-ran", "ngo", "mui", "than", "dau", "tuat", "hoi"] as const;

export const CON_GIAP_LIST: readonly ConGiap[] = CHI.map((ten, chiIndex) => ({
  chiIndex,
  ten,
  slug: SLUGS[chiIndex]!,
}));

export function conGiapBySlug(slug: string): ConGiap | undefined {
  return CON_GIAP_LIST.find((c) => c.slug === slug);
}

/**
 * Năm sinh dương lịch (ước lượng qua `canChiNamDuong`, xem giới hạn của nó ở core/canChi.ts)
 * gần đây nhất ứng với một chi, tính lùi từ năm hiện tại — kể cả năm của trẻ nhỏ.
 */
export function birthYearsForChi(chiIndex: number, currentYear: number, count = 4): number[] {
  const years: number[] = [];
  for (let y = currentYear; years.length < count; y--) {
    if (canChiNamDuong(y).chiIndex === chiIndex) years.push(y);
  }
  return years.reverse();
}

export type QuanHe = "trung" | "xung" | "hinh" | "hai" | "tam-hop" | "luc-hop" | "binh-hoa";

/** Lục hợp: Tý-Sửu, Dần-Hợi, Mão-Tuất, Thìn-Dậu, Tỵ-Thân, Ngọ-Mùi. */
const LUC_HOP: ReadonlyMap<number, number> = new Map([
  [0, 1],
  [1, 0],
  [2, 11],
  [11, 2],
  [3, 10],
  [10, 3],
  [4, 9],
  [9, 4],
  [5, 8],
  [8, 5],
  [6, 7],
  [7, 6],
]);

/** Tam hợp: Thân-Tý-Thìn (Thủy), Tỵ-Dậu-Sửu (Kim), Dần-Ngọ-Tuất (Hỏa), Hợi-Mão-Mùi (Mộc). */
const TAM_HOP_GROUPS: readonly number[][] = [
  [8, 0, 4],
  [5, 9, 1],
  [2, 6, 10],
  [11, 3, 7],
];

/** Lục hại: Tý-Mùi, Sửu-Ngọ, Dần-Tỵ, Mão-Thìn, Thân-Hợi, Dậu-Tuất. */
const HAI: ReadonlyMap<number, number> = new Map([
  [0, 7],
  [7, 0],
  [1, 6],
  [6, 1],
  [2, 5],
  [5, 2],
  [3, 4],
  [4, 3],
  [8, 11],
  [11, 8],
  [9, 10],
  [10, 9],
]);

/** Tam hình: Tý-Mão (vô lễ), Dần-Tỵ-Thân (thị thế), Sửu-Tuất-Mùi (vô ân). */
const HINH_GROUPS: readonly number[][] = [
  [0, 3],
  [2, 5, 8],
  [1, 10, 7],
];

function isXung(a: number, b: number): boolean {
  return (a + 6) % 12 === b;
}
function isHinh(a: number, b: number): boolean {
  return HINH_GROUPS.some((g) => g.includes(a) && g.includes(b));
}
function isTamHop(a: number, b: number): boolean {
  return TAM_HOP_GROUPS.some((g) => g.includes(a) && g.includes(b));
}

/**
 * Quan hệ giữa chi ngày và chi của một tuổi (con giáp) — tính bằng luật cứng cổ truyền,
 * ưu tiên theo mức ảnh hưởng khi một cặp chi vừa hình vừa hợp (ví dụ Tỵ-Thân): hình được tính trước.
 */
export function quanHeVoiNgay(dayChiIndex: number, chiIndex: number): QuanHe {
  if (chiIndex === dayChiIndex) return "trung";
  if (isXung(dayChiIndex, chiIndex)) return "xung";
  if (isHinh(dayChiIndex, chiIndex)) return "hinh";
  if (HAI.get(dayChiIndex) === chiIndex) return "hai";
  if (isTamHop(dayChiIndex, chiIndex)) return "tam-hop";
  if (LUC_HOP.get(dayChiIndex) === chiIndex) return "luc-hop";
  return "binh-hoa";
}

export const QUAN_HE_LABEL: Record<QuanHe, string> = {
  trung: "Trùng chi với ngày, coi như bổn mệnh của ngày",
  xung: "Xung chi với ngày",
  hinh: "Hình chi với ngày",
  hai: "Hại chi với ngày",
  "tam-hop": "Tam hợp với ngày",
  "luc-hop": "Lục hợp với ngày",
  "binh-hoa": "Bình hòa, không hợp không khắc với chi ngày",
};

export interface TuViEntry {
  /** Đoạn luận 2-3 câu do Gemini sinh riêng cho ngày này. */
  luan: string;
  /** Mức đánh giá 1-5. */
  diem: number;
  /** Khung giờ tốt nhất trong ngày cho tuổi này, dạng "7h–9h". */
  gioTot: string;
}

export interface TuViDayData {
  /** Ngày (YYYY-MM-DD) mà nội dung được sinh riêng cho — phải trùng tên file và trùng ngày trang hiển thị. */
  date: string;
  generatedAt: string;
  /** Tên model Gemini đã sinh nội dung. Chỉ để tra cứu, không phải bằng chứng file có nội dung. */
  model: string;
  tuoi: Record<string, TuViEntry>;
}

/**
 * Giá trị `model` mà bản cũ của script ghi vào file không do Gemini sinh cho đúng ngày đó: "placeholder" là file giữ chỗ
 * rỗng, "fallback-cu" là bản chép nguyên lời luận của file ngày khác. Cả hai đều bị loại dù trường nội dung trông ra sao.
 */
const NON_GENERATED_MODELS: ReadonlySet<string> = new Set(["placeholder", "fallback-cu"]);

export const LUAN_MIN_LENGTH = 20;
export const LUAN_MAX_LENGTH = 1200;
const GIO_TOT_RE = /^\d{1,2}h–\d{1,2}h$/;

/** Đưa các biến thể gạch nối Gemini hay trả ("7h - 9h", "7h-9h", "7h—9h") về dạng chuẩn "7h–9h". */
export function normalizeGioTot(s: string): string {
  return s.trim().replace(/\s*[-‐‑‒–—]\s*/g, "–");
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Kiểm nội dung thật của một tuổi: lời luận có chữ, điểm nguyên 1-5, giờ tốt đúng dạng. Trả về lỗi hoặc bản đã chuẩn hóa. */
export function validateTuViEntry(raw: unknown): { entry: TuViEntry } | { error: string } {
  if (!isRecord(raw)) return { error: "không phải object" };
  const { luan, diem, gioTot } = raw;
  if (typeof luan !== "string") return { error: "thiếu luan" };
  const luanTrim = luan.trim();
  if (luanTrim.length < LUAN_MIN_LENGTH) return { error: `luan quá ngắn (${luanTrim.length} ký tự)` };
  if (luanTrim.length > LUAN_MAX_LENGTH) return { error: `luan quá dài (${luanTrim.length} ký tự)` };
  if (typeof diem !== "number" || !Number.isInteger(diem) || diem < 1 || diem > 5) {
    return { error: `diem không phải số nguyên 1-5 (${String(diem)})` };
  }
  if (typeof gioTot !== "string" || !GIO_TOT_RE.test(gioTot)) return { error: `gioTot sai dạng (${String(gioTot)})` };
  return { entry: { luan: luanTrim, diem, gioTot } };
}

export type TuViValidation = { ok: true; data: TuViDayData } | { ok: false; errors: string[] };

/**
 * Kiểm cả file của một ngày: đúng ngày mong đợi, không phải bản giữ chỗ/chép lại, và ĐỦ 12 tuổi đều có nội dung hợp lệ.
 * Thiếu một tuổi là loại cả file — trang không được hiện lời luận cho tuổi này mà bỏ trống tuổi kia.
 */
export function validateTuViDayData(raw: unknown, expectedDate: string): TuViValidation {
  if (!isRecord(raw)) return { ok: false, errors: ["không phải object JSON"] };
  const errors: string[] = [];
  if (raw.date !== expectedDate) errors.push(`date là ${String(raw.date)}, cần ${expectedDate}`);
  if (typeof raw.generatedAt !== "string" || Number.isNaN(Date.parse(raw.generatedAt))) errors.push("generatedAt sai");
  if (typeof raw.model !== "string" || raw.model.trim() === "") errors.push("thiếu model");
  else if (NON_GENERATED_MODELS.has(raw.model)) errors.push(`model "${raw.model}" không phải nội dung sinh cho ngày này`);
  const tuoi: Record<string, TuViEntry> = {};
  if (!isRecord(raw.tuoi)) {
    errors.push("thiếu tuoi");
  } else {
    for (const cg of CON_GIAP_LIST) {
      const r = validateTuViEntry(raw.tuoi[cg.slug]);
      if ("error" in r) errors.push(`tuổi ${cg.ten}: ${r.error}`);
      else tuoi[cg.slug] = r.entry;
    }
  }
  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: { date: expectedDate, generatedAt: raw.generatedAt as string, model: raw.model as string, tuoi },
  };
}

export function dateStr(d: { day: number; month: number; year: number }): string {
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

export function parseDateStr(s: string): { day: number; month: number; year: number } {
  const [year, month, day] = s.split("-").map(Number);
  return { day: day!, month: month!, year: year! };
}

/** Thư mục dữ liệu khi dựng trang (cwd là web/). */
export function tuViDataDir(): string {
  return join(process.cwd(), "data", "tu-vi");
}

export function tuViFilePath(dir: string, date: string): string {
  return join(dir, `${date}.json`);
}

export type TuViLoad = { status: "missing" } | { status: "invalid"; errors: string[] } | { status: "ok"; data: TuViDayData };

/** Đọc và kiểm file của đúng một ngày. File hỏng/ghi dở (JSON lỗi) được coi là không hợp lệ chứ không làm vỡ build. */
export function loadTuViDay(date: string, dir: string = tuViDataDir()): TuViLoad {
  const path = tuViFilePath(dir, date);
  if (!existsSync(path)) return { status: "missing" };
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    return { status: "invalid", errors: [`không đọc được JSON: ${err instanceof Error ? err.message : String(err)}`] };
  }
  const v = validateTuViDayData(raw, date);
  return v.ok ? { status: "ok", data: v.data } : { status: "invalid", errors: v.errors };
}

/**
 * Lời luận tử vi để hiển thị cho `today`, hoặc null khi chưa có nội dung hợp lệ sinh riêng cho đúng ngày này.
 * Không bao giờ lấy file của ngày khác: khi null, trang chỉ hiện phần tính được bằng luật (can chi, quan hệ tuổi với ngày)
 * và ẩn lời luận, điểm, giờ tốt.
 */
export function getTuViData(today: { day: number; month: number; year: number }, dir?: string): TuViDayData | null {
  const r = loadTuViDay(dateStr(today), dir);
  return r.status === "ok" ? r.data : null;
}
