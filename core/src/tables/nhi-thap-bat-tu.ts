/**
 * Nhị Thập Bát Tú — 28 sao, chu kỳ 28 ngày liên tục, không phụ thuộc tháng
 * hay năm.
 *
 * Liêm xác nhận tháng 9/2026. Mốc: 16/09/2026 là sao Chẩn, đối chiếu 2 nguồn
 * lịch Việt độc lập (một nguồn ghi trực tiếp Chẩn cho 16/09, một nguồn ghi
 * Dực cho 15/09 — Dực đứng liền trước Chẩn nên khớp).
 *
 * Chỉ lưu tên sao và cát/hung — không có ngũ hành, tướng tinh, việc nên làm.
 */
import { jdFromDate } from "../julian";

export interface NhiThapBatTuEntry {
  name: string;
  isGood: boolean;
}

/** Thứ tự chu kỳ 28 sao, bắt đầu từ Giác. */
export const NHI_THAP_BAT_TU_STARS: readonly NhiThapBatTuEntry[] = [
  { name: "Giác", isGood: true },
  { name: "Cang", isGood: false },
  { name: "Đê", isGood: false },
  { name: "Phòng", isGood: true },
  { name: "Tâm", isGood: false },
  { name: "Vĩ", isGood: true },
  { name: "Cơ", isGood: true },
  { name: "Đẩu", isGood: true },
  { name: "Ngưu", isGood: false },
  { name: "Nữ", isGood: false },
  { name: "Hư", isGood: false },
  { name: "Nguy", isGood: false },
  { name: "Thất", isGood: true },
  { name: "Bích", isGood: true },
  { name: "Khuê", isGood: false },
  { name: "Lâu", isGood: true },
  { name: "Vị", isGood: true },
  { name: "Mão", isGood: false },
  { name: "Tất", isGood: true },
  { name: "Chủy", isGood: false },
  { name: "Sâm", isGood: true },
  { name: "Tỉnh", isGood: true },
  { name: "Quỷ", isGood: false },
  { name: "Liễu", isGood: false },
  { name: "Tinh", isGood: false },
  { name: "Trương", isGood: true },
  { name: "Dực", isGood: false },
  { name: "Chẩn", isGood: true },
];

// Mốc đối chiếu: 16/09/2026 là sao Chẩn, tức chỉ số 27 (0-based) trong bảng trên.
const ANCHOR_JD = jdFromDate(16, 9, 2026);
const ANCHOR_INDEX = 27;

const mod = (n: number, m: number): number => ((n % m) + m) % m;

/** Vị trí trong chu kỳ 28 sao của ngày có Julian Day Number đã cho, Giác = 0. */
export function nhiThapBatTuIndexOfJd(jd: number): number {
  return mod(jd - ANCHOR_JD + ANCHOR_INDEX, 28);
}

/** Sao Nhị thập bát tú của ngày có Julian Day Number đã cho. */
export function nhiThapBatTuOfJd(jd: number): NhiThapBatTuEntry {
  return NHI_THAP_BAT_TU_STARS[nhiThapBatTuIndexOfJd(jd)]!;
}
