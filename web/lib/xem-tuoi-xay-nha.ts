import { type CanChi, canChiNamDuong } from "@licham/core";
import { chiByIndex } from "@/lib/tuoi";
import { kimLau, tuoiMu, type KimLauResult } from "@/lib/xem-tuoi-ket-hon";

/** Tam tai: bốn nhóm tam hợp, mỗi nhóm kỵ ba năm chi kế tiếp theo tục truyền. */
const TAM_TAI_YEARS_BY_BIRTH_GROUP: readonly { birth: readonly number[]; years: readonly number[] }[] = [
  { birth: [8, 0, 4], years: [2, 3, 4] }, // Thân Tý Thìn → Dần Mão Thìn
  { birth: [2, 6, 10], years: [8, 9, 10] }, // Dần Ngọ Tuất → Thân Dậu Tuất
  { birth: [5, 9, 1], years: [11, 0, 1] }, // Tỵ Dậu Sửu → Hợi Tý Sửu
  { birth: [11, 3, 7], years: [5, 6, 7] }, // Hợi Mão Mùi → Tỵ Ngọ Mùi
];

export const HOANG_OC_NAMES = ["Nhất Cát", "Nhì Nghi", "Tam Địa Sát", "Tứ Tấn Tài", "Ngũ Thọ Tử", "Lục Hoang Ốc"] as const;
export type HoangOcName = (typeof HOANG_OC_NAMES)[number];

const HOANG_OC_TOT: ReadonlySet<HoangOcName> = new Set(["Nhất Cát", "Nhì Nghi", "Tứ Tấn Tài"]);

/**
 * Hoang Ốc theo tuổi mụ: (tuổi mụ − 1) mod 6.
 * Đây là một trong các cách đếm dân gian phổ biến; có bản đếm khác cho nam/nữ.
 */
export function hoangOc(tuoiMuValue: number): { name: HoangOcName; tot: boolean; remainder: number } {
  const remainder = ((tuoiMuValue - 1) % 6 + 6) % 6;
  const name = HOANG_OC_NAMES[remainder]!;
  return { name, tot: HOANG_OC_TOT.has(name), remainder };
}

export function tamTaiChiIndexes(birthChiIndex: number): readonly number[] {
  const group = TAM_TAI_YEARS_BY_BIRTH_GROUP.find((g) => g.birth.includes(birthChiIndex));
  if (!group) throw new RangeError(`chiIndex không hợp lệ: ${birthChiIndex}`);
  return group.years;
}

export function namPhamTamTai(birthChiIndex: number, yearChiIndex: number): boolean {
  return tamTaiChiIndexes(birthChiIndex).includes(yearChiIndex);
}

export interface XayNhaResult {
  namSinh: number;
  namXay: number;
  canChiSinh: CanChi;
  canChiXay: CanChi;
  tuoiMuValue: number;
  kimLau: KimLauResult;
  hoangOc: ReturnType<typeof hoangOc>;
  tamTai: boolean;
  namTuoi: boolean;
  xungChi: boolean;
}

/**
 * Xem tuổi làm nhà theo năm dương ước lượng (canChiNamDuong).
 * Người sinh trước Tết cần trang /tinh-tuoi với ngày sinh đầy đủ.
 */
export function xemTuoiXayNha(namSinh: number, namXay: number): XayNhaResult {
  const canChiSinh = canChiNamDuong(namSinh);
  const canChiXay = canChiNamDuong(namXay);
  const tuoiMuValue = tuoiMu(namXay, namSinh);
  return {
    namSinh,
    namXay,
    canChiSinh,
    canChiXay,
    tuoiMuValue,
    kimLau: kimLau(tuoiMuValue),
    hoangOc: hoangOc(tuoiMuValue),
    tamTai: namPhamTamTai(canChiSinh.chiIndex, canChiXay.chiIndex),
    namTuoi: canChiSinh.chiIndex === canChiXay.chiIndex,
    xungChi: (canChiSinh.chiIndex + 6) % 12 === canChiXay.chiIndex,
  };
}

export function tamTaiLabel(birthChiIndex: number): string {
  return tamTaiChiIndexes(birthChiIndex)
    .map((i) => chiByIndex(i).ten)
    .join(", ");
}
