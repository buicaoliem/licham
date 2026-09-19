import { type CanChi, canChiNamDuong } from "@licham/core";
import { NAP_AM_MO_TA, canChiSlug, chiByIndex } from "@/lib/tuoi";
import { tuoiMu } from "@/lib/xem-tuoi-ket-hon";

export const SINH_NAM_MIN = 1950;
export const SINH_NAM_MAX = 2010;

export function sinhNamTrongPhamVi(year: number): boolean {
  return Number.isInteger(year) && year >= SINH_NAM_MIN && year <= SINH_NAM_MAX;
}

export interface SinhNamInfo {
  year: number;
  canChi: CanChi;
  conGiap: string;
  chiSlug: string;
  canChiPath: string;
  chiPath: string;
  napAmMoTa: string;
  tuoiMuHienTai: number;
  uniqueIntro: string;
}

/**
 * Năm dương là ước lượng năm âm — người sinh từ 1/1 đến trước Tết thuộc năm âm trước.
 * Đoạn unique dựa trên can chi + nạp âm của NĂM, không gán một mệnh cho cả con giáp.
 */
export function sinhNamInfo(year: number, currentYear: number): SinhNamInfo {
  const canChi = canChiNamDuong(year);
  const chi = chiByIndex(canChi.chiIndex);
  const napAmMoTa = NAP_AM_MO_TA[canChi.napAm.name] ?? "";
  const mu = tuoiMu(currentYear, year);
  const uniqueIntro = `Người khai sinh năm dương lịch ${year} (sau Tết Nguyên đán ${year}) thuộc tuổi ${canChi.name} — con giáp ${chi.ten} (${chi.conVat}), mệnh nạp âm ${canChi.napAm.name} (hành ${canChi.napAm.element}). ${napAmMoTa} Sang năm ${currentYear}, tuổi mụ ước lượng là ${mu} nếu lấy đúng năm âm ${year}; ai sinh trước Tết ${year} thì can chi thật là năm ${year - 1}, cần nhập ngày sinh ở trang tính tuổi.`;

  return {
    year,
    canChi,
    conGiap: chi.conVat,
    chiSlug: chi.slug,
    canChiPath: `/tuoi/${canChiSlug(canChi)}`,
    chiPath: `/tuoi/${chi.slug}`,
    napAmMoTa,
    tuoiMuHienTai: mu,
    uniqueIntro,
  };
}

export function sinhNamYears(): number[] {
  const years: number[] = [];
  for (let y = SINH_NAM_MIN; y <= SINH_NAM_MAX; y++) years.push(y);
  return years;
}
