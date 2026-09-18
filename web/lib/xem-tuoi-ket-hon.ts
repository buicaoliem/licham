import { type CanChi, type NguHanh, canChiNamDuong } from "@licham/core";
import { getVietnamToday } from "@/lib/today";
import { chiByIndex, hopMenh, kyTuoiChi, nhiHopChi, tamHopGroup } from "@/lib/tuoi";

// Module này thuần logic (không dùng API riêng của server) để dùng được cả ở
// trang tĩnh (server) lẫn khối công cụ chọn năm sinh (client component).

// ---------------------------------------------------------------------------
// Tuổi mụ
// ---------------------------------------------------------------------------

/** Tuổi mụ = năm xem - năm sinh + 1 (cách tính dân gian, không phải tuổi thực). */
export function tuoiMu(namXem: number, namSinh: number): number {
  return namXem - namSinh + 1;
}

// ---------------------------------------------------------------------------
// Kim Lâu
// ---------------------------------------------------------------------------

export type KimLauLoai = "Kim Lâu Thân" | "Kim Lâu Thê" | "Kim Lâu Tử" | "Kim Lâu Súc";

export interface KimLauResult {
  phamKimLau: boolean;
  loai: KimLauLoai | null;
}

/**
 * Kim Lâu: tuổi mụ chia 9 dư 1, 3, 6, 8 thì phạm; dư 0, 2, 4, 5, 7 thì không phạm.
 * Theo tục "lấy vợ xem tuổi đàn bà" — Kim Lâu chỉ xét trên tuổi mụ của CÔ DÂU (nữ),
 * không xét tuổi chú rể. Đây là quan niệm dân gian có thật, không phải thiếu sót khi
 * module này không nhận tham số cho phía nam.
 */
export function kimLau(tuoiMuValue: number): KimLauResult {
  const du = ((tuoiMuValue % 9) + 9) % 9;
  switch (du) {
    case 1:
      return { phamKimLau: true, loai: "Kim Lâu Thân" };
    case 3:
      return { phamKimLau: true, loai: "Kim Lâu Thê" };
    case 6:
      return { phamKimLau: true, loai: "Kim Lâu Tử" };
    case 8:
      return { phamKimLau: true, loai: "Kim Lâu Súc" };
    default:
      return { phamKimLau: false, loai: null };
  }
}

// ---------------------------------------------------------------------------
// Quan hệ theo con giáp (chi)
// ---------------------------------------------------------------------------

export type ChiPairQuanHe = "tam-hop" | "nhi-hop" | "xung" | "hai" | "binh-hoa";

/** Xếp loại quan hệ giữa chi của nam và chi của nữ, dựa trên các bảng đã có ở lib/tuoi.ts. */
export function xepLoaiChiPair(chiNam: number, chiNu: number): ChiPairQuanHe {
  const tamHop = tamHopGroup(chiNam);
  if (chiNam !== chiNu && tamHop.includes(chiNu)) return "tam-hop";
  if (nhiHopChi(chiNam) === chiNu) return "nhi-hop";
  const [xungChi, haiChi] = kyTuoiChi(chiNam);
  if (xungChi === chiNu) return "xung";
  if (haiChi === chiNu) return "hai";
  return "binh-hoa";
}

// ---------------------------------------------------------------------------
// Quan hệ theo nạp âm (ngũ hành mệnh)
// ---------------------------------------------------------------------------

export type NapAmPairQuanHe = "tuong-sinh" | "tuong-khac" | "cung-hanh";

/** Xếp loại quan hệ giữa hai mệnh (ngũ hành) nạp âm, dựa trên bảng sinh/khắc ở lib/tuoi.ts. */
export function xepLoaiNapAmPair(hanhNam: NguHanh, hanhNu: NguHanh): NapAmPairQuanHe {
  if (hanhNam === hanhNu) return "cung-hanh";
  const hNam = hopMenh(hanhNam);
  const hNu = hopMenh(hanhNu);
  const coSinh = hNam.sinhRa === hanhNu || hNu.sinhRa === hanhNam;
  if (coSinh) return "tuong-sinh";
  const coKhac = hNam.khacBoi === hanhNu || hNu.khacBoi === hanhNam;
  if (coKhac) return "tuong-khac";
  return "cung-hanh";
}

// ---------------------------------------------------------------------------
// Mức độ hợp nhau (chỉ dựa trên chi + nạp âm — KHÔNG dùng Kim Lâu)
// ---------------------------------------------------------------------------

export type MucDoHopNhau = "rất hợp" | "hợp" | "bình thường" | "cần cân nhắc";

const CHI_SCORE: Record<ChiPairQuanHe, number> = {
  "tam-hop": 2,
  "nhi-hop": 1,
  "binh-hoa": 0,
  hai: -1,
  xung: -2,
};

const NAP_AM_SCORE: Record<NapAmPairQuanHe, number> = {
  "tuong-sinh": 1,
  "cung-hanh": 0,
  "tuong-khac": -2,
};

/**
 * Mức độ hợp nhau của hai người, chỉ dựa trên quan hệ con giáp (chiPair) và quan hệ
 * mệnh nạp âm (napAmPair). Kim Lâu KHÔNG phải một yếu tố ở đây vì Kim Lâu dùng để chọn
 * NĂM CƯỚI (năm nào nên/không nên tổ chức), chứ không nói lên hai người có hợp nhau hay
 * không — hai khái niệm khác nhau về bản chất.
 */
export function mucDoHopNhau(chiPair: ChiPairQuanHe, napAmPair: NapAmPairQuanHe): MucDoHopNhau {
  const total = CHI_SCORE[chiPair] + NAP_AM_SCORE[napAmPair];
  if (total <= -1) return "cần cân nhắc";
  if (total === 0) return "bình thường";
  if (total <= 2) return "hợp";
  return "rất hợp";
}

// ---------------------------------------------------------------------------
// Bảng năm cưới tới
// ---------------------------------------------------------------------------

export interface NamCuoiRow {
  nam: number;
  tuoiMuCoDau: number;
  kimLau: KimLauResult;
  nenHayTranh: "nên" | "nên cân nhắc";
}

/** Bảng các năm cưới sắp tới (mặc định 5 năm, tính từ năm hiện tại theo giờ Việt Nam). */
export function bangNamCuoiToi(namSinhNu: number, tuNam?: number, soNam = 5): NamCuoiRow[] {
  const startYear = tuNam ?? getVietnamToday().year;
  const rows: NamCuoiRow[] = [];
  for (let i = 0; i < soNam; i++) {
    const nam = startYear + i;
    const tuoiMuCoDau = tuoiMu(nam, namSinhNu);
    const kl = kimLau(tuoiMuCoDau);
    rows.push({ nam, tuoiMuCoDau, kimLau: kl, nenHayTranh: kl.phamKimLau ? "nên cân nhắc" : "nên" });
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Tổng hợp một cặp năm sinh (dùng chung cho trang tĩnh và công cụ client)
// ---------------------------------------------------------------------------

export interface KetHonPairInfo {
  namNam: number;
  namNu: number;
  canChiNam: CanChi;
  canChiNu: CanChi;
  chiPair: ChiPairQuanHe;
  napAmPair: NapAmPairQuanHe;
  mucDo: MucDoHopNhau;
  bangNamCuoi: NamCuoiRow[];
  namCuoiGanNhat: NamCuoiRow | null;
}

/** Khoảng cách tuổi tối đa giữa hai năm sinh mà trang cặp đôi được sinh tĩnh sẵn. */
export const KHOANG_CACH_TUOI_TOI_DA = 15;
export const NAM_SINH_MIN = 1980;
export const NAM_SINH_MAX = 2010;

export function capNamSinhTrongPhamVi(namNam: number, namNu: number): boolean {
  return (
    namNam >= NAM_SINH_MIN &&
    namNam <= NAM_SINH_MAX &&
    namNu >= NAM_SINH_MIN &&
    namNu <= NAM_SINH_MAX &&
    Math.abs(namNam - namNu) <= KHOANG_CACH_TUOI_TOI_DA
  );
}

export function tinhKetHonPairInfo(namNam: number, namNu: number, tuNam?: number): KetHonPairInfo {
  const canChiNam = canChiNamDuong(namNam);
  const canChiNu = canChiNamDuong(namNu);
  const chiPair = xepLoaiChiPair(canChiNam.chiIndex, canChiNu.chiIndex);
  const napAmPair = xepLoaiNapAmPair(canChiNam.napAm.element, canChiNu.napAm.element);
  const mucDo = mucDoHopNhau(chiPair, napAmPair);
  const bangNamCuoi = bangNamCuoiToi(namNu, tuNam, 5);
  const namCuoiGanNhat = bangNamCuoi.find((r) => r.nenHayTranh === "nên") ?? null;
  return { namNam, namNu, canChiNam, canChiNu, chiPair, napAmPair, mucDo, bangNamCuoi, namCuoiGanNhat };
}

export function tenChiNam(canChi: CanChi): string {
  return chiByIndex(canChi.chiIndex).ten;
}

/** Tên lớp CSS (không dấu) tương ứng mức độ hợp nhau, dùng cho khối .kh-answer. */
export function mucDoClassName(mucDo: MucDoHopNhau): string {
  switch (mucDo) {
    case "rất hợp":
      return "rat-hop";
    case "hợp":
      return "hop";
    case "bình thường":
      return "binh-thuong";
    case "cần cân nhắc":
      return "can-can-nhac";
  }
}

export function ketHonSlug(namNam: number, namNu: number): string {
  return `nam-${namNam}-nu-${namNu}`;
}

export function parseKetHonSlug(slug: string): { namNam: number; namNu: number } | null {
  const m = /^nam-(\d{4})-nu-(\d{4})$/.exec(slug);
  if (!m) return null;
  return { namNam: Number(m[1]), namNu: Number(m[2]) };
}
