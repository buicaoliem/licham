import { existsSync, readFileSync, readdirSync } from "node:fs";
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
  /** Ngày (YYYY-MM-DD) mà nội dung này được sinh cho — có thể khác ngày build nếu phải dùng file cũ. */
  date: string;
  generatedAt: string;
  /** Tên model Gemini đã dùng, hoặc "fallback-cu" / "placeholder" khi không gọi được máy sinh. */
  model: string;
  tuoi: Record<string, TuViEntry>;
}

/** false khi chưa từng sinh được nội dung thật (thiếu khóa lần đầu) — trang không được hiện đoạn luận/điểm/giờ giữ chỗ. */
export function hasAiContent(data: TuViDayData): boolean {
  return data.model !== "placeholder";
}

export function dateStr(d: { day: number; month: number; year: number }): string {
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

export function parseDateStr(s: string): { day: number; month: number; year: number } {
  const [year, month, day] = s.split("-").map(Number);
  return { day: day!, month: month!, year: year! };
}

/**
 * Dùng khi chưa từng sinh được nội dung thật cho ngày nào — không có đoạn luận, điểm hay giờ tốt
 * thật để hiện, nên `luan`/`gioTot` để rỗng và `diem` để 0; trang phải kiểm `hasAiContent()` và ẩn
 * hẳn các phần này thay vì hiện giá trị giữ chỗ.
 */
export function placeholderTuViData(date: { day: number; month: number; year: number }): TuViDayData {
  const tuoi: Record<string, TuViEntry> = {};
  for (const cg of CON_GIAP_LIST) tuoi[cg.slug] = { luan: "", diem: 0, gioTot: "" };
  return { date: dateStr(date), generatedAt: new Date().toISOString(), model: "placeholder", tuoi };
}

function dataDir(): string {
  return join(process.cwd(), "data", "tu-vi");
}

export function listAvailableTuViDates(): string[] {
  const dir = dataDir();
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

export function readTuViFile(date: string): TuViDayData | null {
  const path = join(dataDir(), `${date}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8")) as TuViDayData;
}

/**
 * Dữ liệu tử vi để hiển thị: ưu tiên file của ngày hôm nay; nếu chưa có thì dùng file mới nhất
 * hiện có (ví dụ hôm qua sinh lỗi); nếu chưa từng có file nào thì dùng nội dung giữ chỗ cho đúng
 * ngày hôm nay, để trang luôn dựng được kể cả lần chạy đầu tiên chưa có khóa Gemini.
 */
export function getTuViData(today: { day: number; month: number; year: number }): TuViDayData {
  const wanted = dateStr(today);
  const direct = readTuViFile(wanted);
  if (direct) return direct;
  const latest = listAvailableTuViDates().at(-1);
  const fallback = latest ? readTuViFile(latest) : null;
  return fallback ?? placeholderTuViData(today);
}
