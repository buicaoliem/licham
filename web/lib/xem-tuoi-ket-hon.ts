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
// Quan hệ ngũ hành có chiều (dùng chung cho mệnh nạp âm và thiên can)
// ---------------------------------------------------------------------------

/**
 * Tương sinh/tương khắc trong ngũ hành CHỈ CÓ MỘT CHIỀU (ví dụ Thổ sinh Kim chứ không phải
 * "hai hành sinh cho nhau"), nên quan hệ giữa hai hành luôn phải nêu rõ ai là chủ thể sinh/khắc
 * ai. "nam" ở đây luôn là hành truyền vào đầu tiên, "nu" là hành truyền vào thứ hai.
 */
export type QuanHeNguHanhCoChieu = "nam-sinh-nu" | "nu-sinh-nam" | "nam-khac-nu" | "nu-khac-nam" | "cung-hanh";

/** Xếp loại quan hệ có chiều giữa hai hành ngũ hành, dựa trên bảng sinh/khắc ở lib/tuoi.ts. */
function xepLoaiHuongNguHanh(hanhNam: NguHanh, hanhNu: NguHanh): QuanHeNguHanhCoChieu {
  if (hanhNam === hanhNu) return "cung-hanh";
  if (hopMenh(hanhNam).sinhBoi === hanhNu) return "nam-sinh-nu";
  if (hopMenh(hanhNu).sinhBoi === hanhNam) return "nu-sinh-nam";
  if (hopMenh(hanhNu).khacBoi === hanhNam) return "nam-khac-nu";
  if (hopMenh(hanhNam).khacBoi === hanhNu) return "nu-khac-nam";
  throw new RangeError(`Không xác định được quan hệ ngũ hành giữa ${hanhNam} và ${hanhNu}`);
}

// ---------------------------------------------------------------------------
// Quan hệ theo nạp âm (ngũ hành mệnh)
// ---------------------------------------------------------------------------

export type NapAmPairQuanHe = QuanHeNguHanhCoChieu;

/** Xếp loại quan hệ có chiều giữa hai mệnh (ngũ hành) nạp âm — hanhNam là hành của nam, hanhNu của nữ. */
export function xepLoaiNapAmPair(hanhNam: NguHanh, hanhNu: NguHanh): NapAmPairQuanHe {
  return xepLoaiHuongNguHanh(hanhNam, hanhNu);
}

// ---------------------------------------------------------------------------
// Quan hệ theo thiên can
// ---------------------------------------------------------------------------

export type CanPairQuanHe = "can-hop" | "can-xung" | "binh-thuong";

/**
 * Dân gian KHÔNG xét quan hệ giữa hai thiên can theo sinh/khắc ngũ hành (can Giáp thuộc Mộc,
 * can Kỷ thuộc Thổ... không có nghĩa hai can này sinh/khắc nhau). Thiên can chỉ được xét theo
 * hai bảng cố định dưới đây — không suy ra được từ ngũ hành riêng của can.
 *
 * Bảng NGŨ HỢP (can hóa hợp với nhau, mỗi can chỉ có đúng một can hợp — cách nhau 5 vị trí
 * trong 10 thiên can, canIndex 0..9 = Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý):
 *   Giáp hợp Kỷ, Ất hợp Canh, Bính hợp Tân, Đinh hợp Nhâm, Mậu hợp Quý.
 */
function laCanNguHop(canIndexNam: number, canIndexNu: number): boolean {
  return Math.abs(canIndexNam - canIndexNu) === 5;
}

/**
 * Bảng XUNG (can đối nhau — cách nhau 6 vị trí trong 10 thiên can): Giáp xung Canh, Ất xung
 * Tân, Bính xung Nhâm, Đinh xung Quý. Mậu và Kỷ (canIndex 4, 5) không xung với can nào — vì ở
 * hai đầu dải index nên không có can nào cách chúng đúng 6 vị trí trong khoảng 0..9.
 */
function laCanXung(canIndexNam: number, canIndexNu: number): boolean {
  return Math.abs(canIndexNam - canIndexNu) === 6;
}

/**
 * Xếp loại quan hệ giữa thiên can của nam và của nữ theo đúng hai bảng ngũ hợp / xung ở trên.
 * Hai can cùng tên (cùng canIndex), hoặc không rơi vào cặp hợp/xung nào, đều xếp "bình thường".
 */
export function xepLoaiCanPair(canIndexNam: number, canIndexNu: number): CanPairQuanHe {
  if (laCanNguHop(canIndexNam, canIndexNu)) return "can-hop";
  if (laCanXung(canIndexNam, canIndexNu)) return "can-xung";
  return "binh-thuong";
}

// ---------------------------------------------------------------------------
// Mức độ hợp nhau (dựa trên 3 tầng độc lập: con giáp, mệnh nạp âm, thiên can —
// KHÔNG dùng Kim Lâu, và KHÔNG dùng thang điểm)
// ---------------------------------------------------------------------------

export type MucDoHopNhau = "rất hợp" | "hợp" | "bình thường" | "cần cân nhắc";

/** Xếp mỗi tầng vào đúng 3 mức để so sánh được với nhau: tốt / bình hòa / xấu. */
export type MucTang = "tot" | "binh-hoa" | "xau";

function mucTangChiPair(chiPair: ChiPairQuanHe): MucTang {
  switch (chiPair) {
    case "tam-hop":
    case "nhi-hop":
      return "tot";
    case "binh-hoa":
      return "binh-hoa";
    case "xung":
    case "hai":
      return "xau";
  }
}

function mucTangNguHanhCoChieu(quanHe: QuanHeNguHanhCoChieu): MucTang {
  switch (quanHe) {
    case "nam-sinh-nu":
    case "nu-sinh-nam":
      return "tot";
    case "cung-hanh":
      return "binh-hoa";
    case "nam-khac-nu":
    case "nu-khac-nam":
      return "xau";
  }
}

function mucTangCanPair(canPair: CanPairQuanHe): MucTang {
  switch (canPair) {
    case "can-hop":
      return "tot";
    case "can-xung":
      return "xau";
    case "binh-thuong":
      return "binh-hoa";
  }
}

/**
 * Mức độ hợp nhau của hai người, xếp theo quy tắc tường minh trên 3 tầng độc lập — con giáp
 * (chiPair), mệnh nạp âm (napAmPair) và thiên can (canPair) — mỗi tầng chỉ có 3 mức: tốt /
 * bình hòa / xấu. Kim Lâu KHÔNG phải một yếu tố ở đây vì Kim Lâu dùng để chọn NĂM CƯỚI (năm
 * nào nên/không nên tổ chức), chứ không nói lên hai người có hợp nhau hay không.
 *
 * Quy tắc (không dùng thang điểm cộng dồn):
 *  - Từ 2 tầng "tốt" trở lên, không tầng nào "xấu"  -> "rất hợp"
 *  - Có 1 tầng "tốt", các tầng còn lại "bình hòa"    -> "hợp"
 *  - Có đúng 1 tầng "xấu"                             -> "bình thường"
 *  - Từ 2 tầng "xấu" trở lên                          -> "cần cân nhắc"
 *  - Còn lại (cả 3 tầng đều "bình hòa")               -> "bình thường"
 */
export function mucDoHopNhau(chiPair: ChiPairQuanHe, napAmPair: NapAmPairQuanHe, canPair: CanPairQuanHe): MucDoHopNhau {
  const tang: MucTang[] = [mucTangChiPair(chiPair), mucTangNguHanhCoChieu(napAmPair), mucTangCanPair(canPair)];
  const soTot = tang.filter((t) => t === "tot").length;
  const soXau = tang.filter((t) => t === "xau").length;
  if (soXau >= 2) return "cần cân nhắc";
  if (soXau === 1) return "bình thường";
  if (soTot >= 2) return "rất hợp";
  if (soTot === 1) return "hợp";
  return "bình thường";
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

/**
 * Năm bắt đầu mặc định cho bảng "5 năm cưới sắp tới": nếu năm hiện tại đã đi qua hơn nửa
 * (từ tháng 7 trở đi theo giờ Việt Nam) thì bắt đầu từ năm sau, vì phần lớn năm nay đã trôi
 * qua nên xem năm cưới của năm nay không còn nhiều ý nghĩa thực tế.
 */
function namBatDauMacDinh(): number {
  const today = getVietnamToday();
  return today.month >= 7 ? today.year + 1 : today.year;
}

/** Bảng các năm cưới sắp tới (mặc định 5 năm, tính từ `namBatDauMacDinh()` theo giờ Việt Nam). */
export function bangNamCuoiToi(namSinhNu: number, tuNam?: number, soNam = 5): NamCuoiRow[] {
  const startYear = tuNam ?? namBatDauMacDinh();
  const rows: NamCuoiRow[] = [];
  for (let i = 0; i < soNam; i++) {
    const nam = startYear + i;
    const tuoiMuCoDau = tuoiMu(nam, namSinhNu);
    const kl = kimLau(tuoiMuCoDau);
    rows.push({ nam, tuoiMuCoDau, kimLau: kl, nenHayTranh: kl.phamKimLau ? "nên cân nhắc" : "nên" });
  }
  return rows;
}

/**
 * Giải thích vì sao năm cưới gần nhất được chọn không phải là năm đầu bảng: liệt kê các năm
 * đứng trước nó trong bảng mà phạm Kim Lâu, kèm loại Kim Lâu tương ứng. Trả về null nếu năm
 * đầu bảng đã là năm được chọn (không cần giải thích gì thêm).
 */
export function lyDoBoQuaNamCuoi(bangNamCuoi: NamCuoiRow[], namCuoiGanNhat: NamCuoiRow | null): string | null {
  if (!namCuoiGanNhat) return null;
  const boQua = bangNamCuoi.filter((r) => r.nam < namCuoiGanNhat.nam && r.kimLau.phamKimLau);
  if (boQua.length === 0) return null;
  return boQua.map((r) => `${r.nam} phạm ${r.kimLau.loai}`).join(", ");
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
  canPair: CanPairQuanHe;
  mucDo: MucDoHopNhau;
  bangNamCuoi: NamCuoiRow[];
  namCuoiGanNhat: NamCuoiRow | null;
  lyDoBoQuaNamCuoi: string | null;
}

export const NAM_SINH_MIN = 1980;
export const NAM_SINH_MAX = 2010;

/**
 * Trang tĩnh /xem-tuoi-ket-hon/nam-{năm}-nu-{năm}/ được sinh sẵn cho MỌI cặp năm sinh trong
 * khoảng 1980–2010 (961 trang), không giới hạn chênh lệch tuổi giữa hai người — tránh việc
 * một cặp năm sinh hợp lệ nhưng chênh tuổi lớn lại rơi vào 404 trắng vì site xuất tĩnh (output: export).
 */
export function capNamSinhTrongPhamVi(namNam: number, namNu: number): boolean {
  return namNam >= NAM_SINH_MIN && namNam <= NAM_SINH_MAX && namNu >= NAM_SINH_MIN && namNu <= NAM_SINH_MAX;
}

export function tinhKetHonPairInfo(namNam: number, namNu: number, tuNam?: number): KetHonPairInfo {
  const canChiNam = canChiNamDuong(namNam);
  const canChiNu = canChiNamDuong(namNu);
  const chiPair = xepLoaiChiPair(canChiNam.chiIndex, canChiNu.chiIndex);
  const napAmPair = xepLoaiNapAmPair(canChiNam.napAm.element, canChiNu.napAm.element);
  const canPair = xepLoaiCanPair(canChiNam.canIndex, canChiNu.canIndex);
  const mucDo = mucDoHopNhau(chiPair, napAmPair, canPair);
  const bangNamCuoi = bangNamCuoiToi(namNu, tuNam, 5);
  const namCuoiGanNhat = bangNamCuoi.find((r) => r.nenHayTranh === "nên") ?? null;
  const lyDoBoQua = lyDoBoQuaNamCuoi(bangNamCuoi, namCuoiGanNhat);
  return { namNam, namNu, canChiNam, canChiNu, chiPair, napAmPair, canPair, mucDo, bangNamCuoi, namCuoiGanNhat, lyDoBoQuaNamCuoi: lyDoBoQua };
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
