/**
 * Tuổi xung — tính bằng luật cứng lục xung (chi) và tứ xung (can), không cần bảng tra:
 *
 * Xung chi (6 cặp đối nhau trong 12 địa chi):
 *   Tý ↔ Ngọ · Sửu ↔ Mùi · Dần ↔ Thân · Mão ↔ Dậu · Thìn ↔ Tuất · Tỵ ↔ Hợi
 *   (chi đối diện = chiIndex + 6, theo thứ tự CHI trong canChi.ts)
 *
 * Xung can (4 cặp trong 10 thiên can, Mậu và Kỷ không có can xung):
 *   Giáp ↔ Canh · Ất ↔ Tân · Bính ↔ Nhâm · Đinh ↔ Quý
 *
 * Xung cả can lẫn chi cùng lúc gọi là "thiên khắc địa xung" — mức nặng nhất.
 */

import { type CanChi, canChiFromIndex, canChiNamSinh } from "../canChi";
import type { SolarDate } from "../julian";

const CHI_XUNG_OFFSET = 6;

/** canIndex → canIndex xung với nó; Mậu (4) và Kỷ (5) không có mặt, tức không xung can. */
const CAN_XUNG: ReadonlyMap<number, number> = new Map([
  [0, 6],
  [6, 0], // Giáp ↔ Canh
  [1, 7],
  [7, 1], // Ất ↔ Tân
  [2, 8],
  [8, 2], // Bính ↔ Nhâm
  [3, 9],
  [9, 3], // Đinh ↔ Quý
]);

export interface XungEntry {
  canChi: CanChi;
  /** Vừa xung chi vừa xung can — mức nặng nhất. */
  isThienKhacDiaXung: boolean;
}

function xungOfIndices(chiIndex: number, canIndex: number): XungEntry[] {
  const xungChiIndex = (chiIndex + CHI_XUNG_OFFSET) % 12;
  const xungCanIndex = CAN_XUNG.get(canIndex);
  const entries: XungEntry[] = [];
  for (let i = 0; i < 60; i++) {
    const cc = canChiFromIndex(i);
    if (cc.chiIndex !== xungChiIndex) continue;
    entries.push({ canChi: cc, isThienKhacDiaXung: xungCanIndex !== undefined && cc.canIndex === xungCanIndex });
  }
  return entries;
}

/** Các can chi (trong 60 hoa giáp) xung với can chi ngày đã cho — luôn có đúng 5 phần tử. */
export function xungNgay(ngayCanChi: CanChi): XungEntry[] {
  return xungOfIndices(ngayCanChi.chiIndex, ngayCanChi.canIndex);
}

/** Các can chi (trong 60 hoa giáp) xung với can chi tháng đã cho — luôn có đúng 5 phần tử. */
export function xungThang(thangCanChi: CanChi): XungEntry[] {
  return xungOfIndices(thangCanChi.chiIndex, thangCanChi.canIndex);
}

export type TuoiXungLevel = "khong-xung" | "xung-chi" | "thien-khac-dia-xung";

/** Can chi A có xung với can chi B không (A là "tuổi", B là ngày/tháng đang xét). */
export function canChiCoXung(a: CanChi, b: CanChi): TuoiXungLevel {
  const xungChiIndex = (b.chiIndex + CHI_XUNG_OFFSET) % 12;
  if (a.chiIndex !== xungChiIndex) return "khong-xung";
  const xungCanIndex = CAN_XUNG.get(b.canIndex);
  return xungCanIndex !== undefined && a.canIndex === xungCanIndex ? "thien-khac-dia-xung" : "xung-chi";
}

/** Ngày sinh dương lịch đầy đủ (qua `canChiNamSinh`, chính xác kể cả sinh trước Tết) có xung với can chi ngày đã cho không. */
export function namSinhCoXung(ngaySinh: SolarDate, ngayCanChi: CanChi): TuoiXungLevel {
  return canChiCoXung(canChiNamSinh(ngaySinh.day, ngaySinh.month, ngaySinh.year), ngayCanChi);
}
