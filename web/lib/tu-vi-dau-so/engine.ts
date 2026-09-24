/**
 * An sao lá số Tử Vi Đẩu Số — Nam phái (theo hệ thống của Thái Thứ Lang, "Tử Vi Đẩu Số Tân Biên", 1956),
 * là cách an sao phổ biến ở Việt Nam. Không trộn quy tắc của trường phái khác.
 *
 * Quy ước chỉ số: địa chi 0 = Tý … 11 = Hợi; thiên can 0 = Giáp … 9 = Quý.
 * Đầu vào là ngày âm lịch đã chuẩn hóa (xem birth.ts): năm âm lịch tính từ Tết Nguyên đán,
 * tháng nhuận an như tháng chính, giờ sinh là một trong 12 canh giờ.
 */
import { CAN, CHI, type CanChi, type NguHanh, canChiFromParts, canChiOfYear } from "@licham/core";
import { HOA, type HoaName, STARS, type StarId, type StarMeta, TEN_CUNG, type TenCung, TU_HOA, VONG_BAC_SI, VONG_THAI_TUE, VONG_TRANG_SINH } from "./stars";

export type GioiTinh = "nam" | "nu";

export interface LunarBirth {
  /** Năm âm lịch (tính từ Tết). */
  year: number;
  /** Tháng âm 1..12; tháng nhuận an như tháng chính. */
  month: number;
  /** Ngày âm 1..30. */
  day: number;
  isLeapMonth: boolean;
  /** Canh giờ 0 = Tý … 11 = Hợi. */
  hourChi: number;
}

export interface SaoTrongCung {
  id: StarId;
  name: string;
  group: StarMeta["group"];
  hanh?: StarMeta["hanh"];
  /** Hóa của sao do can năm sinh. */
  hoa?: HoaName;
}

export interface Cung {
  chi: number;
  chiName: string;
  can: number;
  canName: string;
  ten: TenCung;
  /** Cung an Thân. */
  laThan: boolean;
  chinhTinh: SaoTrongCung[];
  /** Phụ tinh cát và trung tính. */
  phuTinhCat: SaoTrongCung[];
  /** Sát tinh, hung tinh. */
  phuTinhSat: SaoTrongCung[];
  tuan: boolean;
  triet: boolean;
  trangSinh: string;
  bacSi: string;
  thaiTue: string;
  /** Khoảng tuổi (tuổi mụ) của đại hạn ở cung này. */
  daiHan: { tu: number; den: number };
  /** Các tuổi (mụ) tiểu hạn rơi vào cung này, 1..120. */
  tieuHan: number[];
}

export type AmDuongNamNu = "Dương Nam" | "Âm Nam" | "Dương Nữ" | "Âm Nữ";

export interface Cuc {
  so: 2 | 3 | 4 | 5 | 6;
  hanh: NguHanh;
  ten: string;
}

export interface LaSo {
  birth: LunarBirth;
  gioiTinh: GioiTinh;
  canChiNam: CanChi;
  amDuong: AmDuongNamNu;
  /** Dương Nam, Âm Nữ: các vòng đi thuận. */
  thuan: boolean;
  /** Bản mệnh = nạp âm năm sinh. */
  banMenh: CanChi["napAm"];
  cuc: Cuc;
  menhChi: number;
  thanChi: number;
  /** Tên cung mà Thân cư (Mệnh, Phúc Đức, Quan Lộc, Thiên Di, Tài Bạch hoặc Phu Thê). */
  thanCu: TenCung;
  menhChu: string;
  thanChu: string;
  /** 12 cung, chỉ số theo địa chi (0 = Tý). */
  cung: Cung[];
  /** Vị trí (địa chi) của mọi sao, để tra nhanh. */
  viTri: Record<StarId, number>;
  /** Tứ Hóa năm sinh. */
  tuHoa: { hoa: HoaName; star: StarId; chi: number }[];
  tuan: [number, number];
  triet: [number, number];
  /** Cung khởi tiểu hạn (tuổi 1). */
  tieuHanKhoi: number;
}

export const mod12 = (n: number): number => ((n % 12) + 12) % 12;
const mod10 = (n: number): number => ((n % 10) + 10) % 10;

const CUC_BY_HANH: Record<NguHanh, Cuc> = {
  Thủy: { so: 2, hanh: "Thủy", ten: "Thủy nhị cục" },
  Mộc: { so: 3, hanh: "Mộc", ten: "Mộc tam cục" },
  Kim: { so: 4, hanh: "Kim", ten: "Kim tứ cục" },
  Thổ: { so: 5, hanh: "Thổ", ten: "Thổ ngũ cục" },
  Hỏa: { so: 6, hanh: "Hỏa", ten: "Hỏa lục cục" },
};

/** Can của cung ở địa chi `chi` (Ngũ Hổ Độn: Giáp Kỷ khởi Bính Dần …). */
export function canCung(yearCan: number, chi: number): number {
  const canDan = mod10((yearCan % 5) * 2 + 2);
  return mod10(canDan + mod12(chi - 2));
}

/** Cung Mệnh: từ Dần đếm thuận tới tháng sinh, rồi đếm nghịch tới giờ sinh. */
export function cungMenh(month: number, hourChi: number): number {
  return mod12(2 + month - 1 - hourChi);
}

/** Cung Thân: từ Dần đếm thuận tới tháng sinh, rồi đếm thuận tới giờ sinh. */
export function cungThan(month: number, hourChi: number): number {
  return mod12(2 + month - 1 + hourChi);
}

/** Cục theo nạp âm can chi cung Mệnh. */
export function tinhCuc(yearCan: number, menhChi: number): Cuc {
  const cc = canChiFromParts(canCung(yearCan, menhChi), menhChi);
  return CUC_BY_HANH[cc.napAm.element];
}

/**
 * Vị trí sao Tử Vi theo số cục và ngày sinh âm lịch.
 * Tìm số bù x nhỏ nhất để (ngày + x) chia hết cho cục; thương q → từ Dần đếm thuận q cung;
 * x lẻ thì lùi x cung, x chẵn thì tiến x cung.
 */
export function viTriTuVi(cucSo: number, day: number): number {
  let x = 0;
  while ((day + x) % cucSo !== 0) x++;
  const q = (day + x) / cucSo;
  const base = 2 + q - 1;
  return mod12(x % 2 === 1 ? base - x : base + x);
}

const LOC_TON = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0] as const;
/** Thiên Mã theo tam hợp chi năm: Thân Tý Thìn → Dần; Tỵ Dậu Sửu → Hợi; Dần Ngọ Tuất → Thân; Hợi Mão Mùi → Tỵ. */
const THIEN_MA = [2, 11, 8, 5] as const;
/** Thiên Khôi / Thiên Việt theo can năm (Nam phái). */
const KHOI = [1, 0, 11, 11, 1, 0, 6, 6, 3, 3] as const;
const VIET = [7, 8, 9, 9, 7, 8, 2, 2, 5, 5] as const;
/** Hỏa Tinh / Linh Tinh: cung khởi (giờ Tý) theo tam hợp chi năm. */
const HOA_KHOI = [2, 3, 1, 9] as const; // Thân Tý Thìn: Dần; Tỵ Dậu Sửu: Mão; Dần Ngọ Tuất: Sửu; Hợi Mão Mùi: Dậu
const LINH_KHOI = [10, 10, 3, 10] as const; // Dần Ngọ Tuất: Mão; còn lại: Tuất
const DAO_HOA = [9, 6, 3, 0] as const;
const HOA_CAI = [4, 1, 10, 7] as const;
const KIEP_SAT = [5, 2, 11, 8] as const;
const CO_THAN = [2, 5, 8, 11] as const;
const QUA_TU = [10, 1, 4, 7] as const;
const PHA_TOAI = [5, 1, 9] as const;
const THIEN_QUAN = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6] as const;
const THIEN_PHUC = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5] as const;
const TRIET = [8, 6, 4, 2, 0] as const;
/** Tràng Sinh khởi theo cục: Thủy 2 & Thổ 5 → Thân, Mộc 3 → Hợi, Kim 4 → Tỵ, Hỏa 6 → Dần. */
const TRANG_SINH_KHOI: Record<Cuc["so"], number> = { 2: 8, 3: 11, 4: 5, 5: 8, 6: 2 };
/** Tiểu hạn khởi (tuổi 1) theo tam hợp chi năm: Thân Tý Thìn → Tuất; Tỵ Dậu Sửu → Mùi; Dần Ngọ Tuất → Thìn; Hợi Mão Mùi → Sửu. */
const TIEU_HAN_KHOI = [10, 7, 4, 1] as const;
const MENH_CHU = ["Tham Lang", "Cự Môn", "Lộc Tồn", "Văn Khúc", "Liêm Trinh", "Vũ Khúc", "Phá Quân", "Vũ Khúc", "Liêm Trinh", "Văn Khúc", "Lộc Tồn", "Cự Môn"];
const THAN_CHU = ["Hỏa Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ"];

/** Lộc Tồn theo can (dùng cả cho lưu niên). */
export const locTonOfCan = (can: number): number => LOC_TON[mod10(can)];
/** Thiên Mã theo chi (dùng cả cho lưu niên). */
export const thienMaOfChi = (chi: number): number => THIEN_MA[mod12(chi) % 4];

/** Tuần Trung Không: hai chi thiếu trong tuần giáp chứa can chi năm. */
export function tuanOf(yearCanChi: CanChi): [number, number] {
  const start = yearCanChi.index - (yearCanChi.index % 10);
  const chi0 = start % 12;
  return [mod12(chi0 + 10), mod12(chi0 + 11)];
}

export function trietOf(yearCan: number): [number, number] {
  const a = TRIET[yearCan % 5];
  return [a, a + 1];
}

/** Toàn bộ vị trí sao (địa chi) của một lá số. */
export function viTriSao(b: LunarBirth, gioiTinh: GioiTinh): { viTri: Record<StarId, number>; menh: number; than: number; cuc: Cuc; thuan: boolean } {
  const ycc = canChiOfYear(b.year);
  const Y = ycc.canIndex;
  const Z = ycc.chiIndex;
  const m = b.month;
  const d = b.day;
  const h = b.hourChi;
  const duong = Y % 2 === 0;
  const thuan = duong === (gioiTinh === "nam");
  const menh = cungMenh(m, h);
  const than = cungThan(m, h);
  const cuc = tinhCuc(Y, menh);

  const tv = viTriTuVi(cuc.so, d);
  const phu = mod12(4 - tv);
  const lt = LOC_TON[Y];
  const ta = mod12(4 + m - 1);
  const huu = mod12(10 - (m - 1));
  const xuong = mod12(10 - h);
  const khuc = mod12(4 + h);
  const g4 = Z % 4;
  const hoa = thuan ? mod12(HOA_KHOI[g4] + h) : mod12(HOA_KHOI[g4] - h);
  const linh = thuan ? mod12(LINH_KHOI[g4] - h) : mod12(LINH_KHOI[g4] + h);
  const hongLoan = mod12(3 - Z);
  const phuongCac = mod12(10 - Z);
  const rieu = mod12(1 + m - 1);
  const season = Math.floor(mod12(Z + 1) / 3);

  const viTri: Record<StarId, number> = {
    tuVi: tv,
    thienCo: mod12(tv - 1),
    thaiDuong: mod12(tv - 3),
    vuKhuc: mod12(tv - 4),
    thienDong: mod12(tv - 5),
    liemTrinh: mod12(tv - 8),
    thienPhu: phu,
    thaiAm: mod12(phu + 1),
    thamLang: mod12(phu + 2),
    cuMon: mod12(phu + 3),
    thienTuong: mod12(phu + 4),
    thienLuong: mod12(phu + 5),
    thatSat: mod12(phu + 6),
    phaQuan: mod12(phu + 10),

    taPhu: ta,
    huuBat: huu,
    vanXuong: xuong,
    vanKhuc: khuc,
    thienKhoi: KHOI[Y],
    thienViet: VIET[Y],
    locTon: lt,
    thienMa: THIEN_MA[g4],

    kinhDuong: mod12(lt + 1),
    daLa: mod12(lt - 1),
    hoaTinh: hoa,
    linhTinh: linh,
    diaKhong: mod12(11 - h),
    diaKiep: mod12(11 + h),

    longTri: mod12(4 + Z),
    phuongCac,
    giaiThan: phuongCac,
    hongLoan,
    thienHy: mod12(hongLoan + 6),
    daoHoa: DAO_HOA[g4],
    hoaCai: HOA_CAI[g4],
    kiepSat: KIEP_SAT[g4],
    coThan: CO_THAN[season],
    quaTu: QUA_TU[season],
    thienKhoc: mod12(6 - Z),
    thienHu: mod12(6 + Z),
    phaToai: PHA_TOAI[Z % 3],
    thienDuc: mod12(9 + Z),
    nguyetDuc: mod12(5 + Z),
    thienHinh: mod12(9 + m - 1),
    thienRieu: rieu,
    thienY: rieu,
    thienGiai: mod12(8 + m - 1),
    diaGiai: mod12(7 + m - 1),
    tamThai: mod12(ta + d - 1),
    batToa: mod12(huu - (d - 1)),
    anQuang: mod12(xuong + d - 2),
    thienQuy: mod12(khuc - d + 2),
    thaiPhu: mod12(6 + h),
    phongCao: mod12(2 + h),
    thienTai: mod12(menh + Z),
    thienTho: mod12(than + Z),
    thienQuan: THIEN_QUAN[Y],
    thienPhuc: THIEN_PHUC[Y],
    thienThuong: mod12(menh + 5),
    thienSu: mod12(menh + 7),
    thienLa: 4,
    diaVong: 10,
    thienKhong: mod12(Z + 1),

    tuan: tuanOf(ycc)[0],
    triet: trietOf(Y)[0],
  };
  return { viTri, menh, than, cuc, thuan };
}

/** Lập lá số đầy đủ từ ngày âm lịch đã chuẩn hóa và giới tính. */
export function lapLaSo(b: LunarBirth, gioiTinh: GioiTinh): LaSo {
  validateLunarBirth(b);
  const ycc = canChiOfYear(b.year);
  const Y = ycc.canIndex;
  const Z = ycc.chiIndex;
  const { viTri, menh, than, cuc, thuan } = viTriSao(b, gioiTinh);
  const duong = Y % 2 === 0;
  const amDuong = `${duong ? "Dương" : "Âm"} ${gioiTinh === "nam" ? "Nam" : "Nữ"}` as AmDuongNamNu;
  const dir = thuan ? 1 : -1;

  const hoaOf = new Map<StarId, HoaName>();
  const tuHoa = TU_HOA[Y].map((star, i) => {
    hoaOf.set(star, HOA[i]);
    return { hoa: HOA[i], star, chi: viTri[star] };
  });

  const tuan = tuanOf(ycc);
  const triet = trietOf(Y);
  const tsKhoi = TRANG_SINH_KHOI[cuc.so];
  const lt = viTri.locTon;
  const thKhoi = TIEU_HAN_KHOI[Z % 4];
  const thDir = gioiTinh === "nam" ? 1 : -1;

  const cung: Cung[] = CHI.map((chiName, chi) => {
    const can = canCung(Y, chi);
    const k = mod12((chi - menh) * dir);
    const tieuHan: number[] = [];
    for (let age = 1; age <= 120; age++) if (mod12(thKhoi + thDir * (age - 1)) === chi) tieuHan.push(age);
    return {
      chi,
      chiName,
      can,
      canName: CAN[can],
      ten: TEN_CUNG[mod12(chi - menh)],
      laThan: chi === than,
      chinhTinh: [],
      phuTinhCat: [],
      phuTinhSat: [],
      tuan: tuan.includes(chi),
      triet: triet.includes(chi),
      trangSinh: VONG_TRANG_SINH[mod12((chi - tsKhoi) * dir)],
      bacSi: VONG_BAC_SI[mod12((chi - lt) * dir)],
      thaiTue: VONG_THAI_TUE[mod12(chi - Z)],
      daiHan: { tu: cuc.so + 10 * k, den: cuc.so + 10 * k + 9 },
      tieuHan,
    };
  });

  for (const id of Object.keys(viTri) as StarId[]) {
    const meta: StarMeta = STARS[id];
    if (meta.group === "khong") continue;
    const entry: SaoTrongCung = { id, name: meta.name, group: meta.group, hanh: meta.hanh, hoa: hoaOf.get(id) };
    const c = cung[viTri[id]];
    if (meta.group === "chinh") c.chinhTinh.push(entry);
    else if (meta.group === "sat") c.phuTinhSat.push(entry);
    else c.phuTinhCat.push(entry);
  }

  return {
    birth: b,
    gioiTinh,
    canChiNam: ycc,
    amDuong,
    thuan,
    banMenh: ycc.napAm,
    cuc,
    menhChi: menh,
    thanChi: than,
    thanCu: TEN_CUNG[mod12(than - menh)],
    menhChu: MENH_CHU[menh],
    thanChu: THAN_CHU[Z % 6],
    cung,
    viTri,
    tuHoa,
    tuan,
    triet,
    tieuHanKhoi: thKhoi,
  };
}

export class LaSoInputError extends Error {
  name = "LaSoInputError";
}

function validateLunarBirth(b: LunarBirth): void {
  const ok =
    Number.isInteger(b.year) &&
    Number.isInteger(b.month) &&
    b.month >= 1 &&
    b.month <= 12 &&
    Number.isInteger(b.day) &&
    b.day >= 1 &&
    b.day <= 30 &&
    Number.isInteger(b.hourChi) &&
    b.hourChi >= 0 &&
    b.hourChi <= 11;
  if (!ok) throw new LaSoInputError("Ngày giờ âm lịch không hợp lệ.");
}

/** Tam phương tứ chính của một cung: bản cung, xung chiếu (đối cung) và hai cung tam hợp. */
export function tamPhuongTuChinh(chi: number): { banCung: number; xungChieu: number; tamHop: [number, number] } {
  return { banCung: mod12(chi), xungChieu: mod12(chi + 6), tamHop: [mod12(chi + 4), mod12(chi + 8)] };
}

/** Tên canh giờ và khoảng giờ đồng hồ. */
export function tenGio(hourChi: number): string {
  const start = mod12(hourChi) * 2 - 1;
  const f = (h: number) => String(((h % 24) + 24) % 24).padStart(2, "0");
  return `giờ ${CHI[mod12(hourChi)]} (${f(start)}:00–${f(start + 2)}:00)`;
}
