/**
 * Danh mục sao dùng trong lá số Tử Vi Đẩu Số (Nam phái).
 *
 * `doiChieu`:
 *  - "iztro": vị trí đã đối chiếu tự động với thư viện độc lập iztro (MIT, theo sách Tử Vi Đẩu Số Toàn Thư/Toàn Tập)
 *    trên hàng nghìn lá số ngẫu nhiên (lib/tu-vi-dau-so/*.test.ts) và khớp hoàn toàn.
 *  - "iztro-mot-phan": quy tắc Nam phái khác sách Trung Hoa ở một số trường hợp; phần trùng quy tắc đã đối chiếu,
 *    phần khác được ghi trong `ghiChu` và kiểm bằng bảng tay trong test.
 *  - "nam-phai": iztro không có sao này (hoặc an theo cách khác hẳn); chỉ kiểm theo bảng tay dựng từ quy tắc Nam phái.
 */

export type StarGroup =
  /** 14 chính tinh. */
  | "chinh"
  /** Phụ tinh thường được xem là cát (tốt). */
  | "cat"
  /** Sát tinh, hung tinh, bại tinh. */
  | "sat"
  /** Phụ tinh trung tính hoặc tùy cách cục. */
  | "trung"
  /** Tuần, Triệt. */
  | "khong";

export type HanhSao = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export type DoiChieu = "iztro" | "iztro-mot-phan" | "nam-phai";

export interface StarMeta {
  id: string;
  name: string;
  group: StarGroup;
  hanh?: HanhSao;
  doiChieu: DoiChieu;
  ghiChu?: string;
}

function s(id: string, name: string, group: StarGroup, doiChieu: DoiChieu, hanh?: HanhSao, ghiChu?: string): StarMeta {
  return { id, name, group, doiChieu, hanh, ghiChu };
}

export const STARS = {
  // ---- 14 chính tinh ----
  tuVi: s("tuVi", "Tử Vi", "chinh", "iztro", "Thổ"),
  thienCo: s("thienCo", "Thiên Cơ", "chinh", "iztro", "Mộc"),
  thaiDuong: s("thaiDuong", "Thái Dương", "chinh", "iztro", "Hỏa"),
  vuKhuc: s("vuKhuc", "Vũ Khúc", "chinh", "iztro", "Kim"),
  thienDong: s("thienDong", "Thiên Đồng", "chinh", "iztro", "Thủy"),
  liemTrinh: s("liemTrinh", "Liêm Trinh", "chinh", "iztro", "Hỏa"),
  thienPhu: s("thienPhu", "Thiên Phủ", "chinh", "iztro", "Thổ"),
  thaiAm: s("thaiAm", "Thái Âm", "chinh", "iztro", "Thủy"),
  thamLang: s("thamLang", "Tham Lang", "chinh", "iztro", "Thủy"),
  cuMon: s("cuMon", "Cự Môn", "chinh", "iztro", "Thủy"),
  thienTuong: s("thienTuong", "Thiên Tướng", "chinh", "iztro", "Thủy"),
  thienLuong: s("thienLuong", "Thiên Lương", "chinh", "iztro", "Mộc"),
  thatSat: s("thatSat", "Thất Sát", "chinh", "iztro", "Kim"),
  phaQuan: s("phaQuan", "Phá Quân", "chinh", "iztro", "Thủy"),

  // ---- lục cát, Lộc Mã ----
  taPhu: s("taPhu", "Tả Phù", "cat", "iztro", "Thổ"),
  huuBat: s("huuBat", "Hữu Bật", "cat", "iztro", "Thủy"),
  vanXuong: s("vanXuong", "Văn Xương", "cat", "iztro", "Kim"),
  vanKhuc: s("vanKhuc", "Văn Khúc", "cat", "iztro", "Thủy"),
  thienKhoi: s(
    "thienKhoi",
    "Thiên Khôi",
    "cat",
    "iztro-mot-phan",
    "Hỏa",
    "Nam phái: can Canh, Tân đều an Khôi ở Ngọ, Việt ở Dần. Sách Trung Hoa (iztro) an can Canh như Giáp, Mậu (Sửu, Mùi).",
  ),
  thienViet: s("thienViet", "Thiên Việt", "cat", "iztro-mot-phan", "Hỏa", "Xem ghi chú Thiên Khôi."),
  locTon: s("locTon", "Lộc Tồn", "cat", "iztro", "Thổ"),
  thienMa: s("thienMa", "Thiên Mã", "cat", "iztro", "Hỏa"),

  // ---- lục sát ----
  kinhDuong: s("kinhDuong", "Kình Dương", "sat", "iztro", "Kim"),
  daLa: s("daLa", "Đà La", "sat", "iztro", "Kim"),
  hoaTinh: s(
    "hoaTinh",
    "Hỏa Tinh",
    "sat",
    "iztro-mot-phan",
    "Hỏa",
    "Nam phái: Dương Nam, Âm Nữ an Hỏa Tinh thuận, Linh Tinh nghịch; Âm Nam, Dương Nữ ngược lại. Sách Trung Hoa (iztro) an cả hai thuận.",
  ),
  linhTinh: s("linhTinh", "Linh Tinh", "sat", "iztro-mot-phan", "Hỏa", "Xem ghi chú Hỏa Tinh."),
  diaKhong: s("diaKhong", "Địa Không", "sat", "iztro", "Hỏa"),
  diaKiep: s("diaKiep", "Địa Kiếp", "sat", "iztro", "Hỏa"),

  // ---- phụ tinh khác ----
  longTri: s("longTri", "Long Trì", "cat", "iztro", "Thủy"),
  phuongCac: s("phuongCac", "Phượng Các", "cat", "iztro", "Mộc"),
  giaiThan: s("giaiThan", "Giải Thần", "cat", "iztro", "Mộc", "Nam phái an Giải Thần cùng cung Phượng Các, theo chi năm; iztro gọi sao này là Niên Giải (年解)."),
  hongLoan: s("hongLoan", "Hồng Loan", "cat", "iztro", "Thủy"),
  thienHy: s("thienHy", "Thiên Hỷ", "cat", "iztro", "Thủy"),
  daoHoa: s("daoHoa", "Đào Hoa", "trung", "iztro", "Mộc", "iztro gọi là Hàm Trì (咸池)."),
  hoaCai: s("hoaCai", "Hoa Cái", "trung", "iztro", "Kim"),
  kiepSat: s("kiepSat", "Kiếp Sát", "sat", "iztro", "Hỏa", "iztro xếp trong vòng Tướng Tiền (将前)."),
  coThan: s("coThan", "Cô Thần", "sat", "iztro", "Thổ"),
  quaTu: s("quaTu", "Quả Tú", "sat", "iztro", "Thổ"),
  thienKhoc: s("thienKhoc", "Thiên Khốc", "sat", "iztro", "Kim"),
  thienHu: s("thienHu", "Thiên Hư", "sat", "iztro", "Thủy"),
  phaToai: s("phaToai", "Phá Toái", "sat", "iztro", "Hỏa"),
  thienDuc: s("thienDuc", "Thiên Đức", "cat", "iztro", "Hỏa"),
  nguyetDuc: s("nguyetDuc", "Nguyệt Đức", "cat", "iztro", "Hỏa"),
  thienHinh: s("thienHinh", "Thiên Hình", "sat", "iztro", "Hỏa"),
  thienRieu: s("thienRieu", "Thiên Riêu", "trung", "iztro", "Thủy", "iztro gọi là Thiên Diêu."),
  thienY: s("thienY", "Thiên Y", "cat", "nam-phai", "Thủy", "Nam phái an Thiên Y cùng cung Thiên Riêu."),
  thienGiai: s("thienGiai", "Thiên Giải", "cat", "nam-phai", "Hỏa"),
  diaGiai: s("diaGiai", "Địa Giải", "cat", "nam-phai", "Thổ"),
  tamThai: s("tamThai", "Tam Thai", "cat", "iztro", "Thổ"),
  batToa: s("batToa", "Bát Tọa", "cat", "iztro", "Thổ"),
  anQuang: s("anQuang", "Ân Quang", "cat", "iztro", "Mộc"),
  thienQuy: s(
    "thienQuy",
    "Thiên Quý",
    "cat",
    "nam-phai",
    "Thổ",
    "Nam phái: từ Văn Khúc đếm nghịch tới ngày sinh rồi lùi một cung (đối xứng với Ân Quang). Sách Trung Hoa (iztro) đếm thuận.",
  ),
  thaiPhu: s("thaiPhu", "Thai Phụ", "cat", "iztro", "Kim", "iztro gọi là Đài Phụ."),
  phongCao: s("phongCao", "Phong Cáo", "cat", "iztro", "Thổ"),
  thienTai: s("thienTai", "Thiên Tài", "trung", "iztro", "Thổ"),
  thienTho: s("thienTho", "Thiên Thọ", "cat", "iztro", "Thổ"),
  thienQuan: s("thienQuan", "Thiên Quan", "cat", "iztro", "Hỏa"),
  thienPhuc: s("thienPhuc", "Thiên Phúc", "cat", "iztro", "Thổ"),
  thienThuong: s("thienThuong", "Thiên Thương", "sat", "iztro", "Thổ"),
  thienSu: s("thienSu", "Thiên Sứ", "sat", "iztro", "Thủy"),
  thienLa: s("thienLa", "Thiên La", "sat", "nam-phai", "Thổ", "Cố định ở Thìn."),
  diaVong: s("diaVong", "Địa Võng", "sat", "nam-phai", "Thổ", "Cố định ở Tuất."),
  thienKhong: s("thienKhong", "Thiên Không", "sat", "iztro", "Hỏa", "Nam phái: đứng trước Thái Tuế một cung (cùng Thiếu Dương)."),

  // ---- Tuần, Triệt ----
  tuan: s("tuan", "Tuần", "khong", "iztro", undefined, "Tuần Trung Không Vong: hai chi còn thiếu trong tuần giáp của năm sinh."),
  triet: s("triet", "Triệt", "khong", "iztro", undefined, "Triệt Lộ Không Vong: theo can năm sinh."),
} as const satisfies Record<string, StarMeta>;

export type StarId = keyof typeof STARS;

/** Vòng Bác Sĩ (12 sao) khởi từ Lộc Tồn. */
export const VONG_BAC_SI = [
  "Bác Sĩ",
  "Lực Sĩ",
  "Thanh Long",
  "Tiểu Hao",
  "Tướng Quân",
  "Tấu Thư",
  "Phi Liêm",
  "Hỷ Thần",
  "Bệnh Phù",
  "Đại Hao",
  "Phục Binh",
  "Quan Phủ",
] as const;

/** Vòng Thái Tuế (12 sao, Nam phái) khởi từ chi năm sinh, luôn đi thuận. */
export const VONG_THAI_TUE = [
  "Thái Tuế",
  "Thiếu Dương",
  "Tang Môn",
  "Thiếu Âm",
  "Quan Phù",
  "Tử Phù",
  "Tuế Phá",
  "Long Đức",
  "Bạch Hổ",
  "Phúc Đức",
  "Điếu Khách",
  "Trực Phù",
] as const;

/** Vòng Tràng Sinh (12 sao) khởi theo cục. */
export const VONG_TRANG_SINH = [
  "Tràng Sinh",
  "Mộc Dục",
  "Quan Đới",
  "Lâm Quan",
  "Đế Vượng",
  "Suy",
  "Bệnh",
  "Tử",
  "Mộ",
  "Tuyệt",
  "Thai",
  "Dưỡng",
] as const;

/** Tên 12 cung, bắt đầu từ Mệnh, đi thuận chiều địa chi. */
export const TEN_CUNG = [
  "Mệnh",
  "Phụ Mẫu",
  "Phúc Đức",
  "Điền Trạch",
  "Quan Lộc",
  "Nô Bộc",
  "Thiên Di",
  "Tật Ách",
  "Tài Bạch",
  "Tử Tức",
  "Phu Thê",
  "Huynh Đệ",
] as const;

export type TenCung = (typeof TEN_CUNG)[number];

export type HoaName = "Lộc" | "Quyền" | "Khoa" | "Kỵ";
export const HOA: readonly HoaName[] = ["Lộc", "Quyền", "Khoa", "Kỵ"];

/**
 * Tứ Hóa theo can năm (thứ tự Lộc, Quyền, Khoa, Kỵ) — Nam phái (Thái Thứ Lang).
 * Chỉ can Nhâm khác iztro: Nam phái cho Thiên Phủ hóa Khoa, iztro cho Tả Phù hóa Khoa.
 */
export const TU_HOA: readonly (readonly [StarId, StarId, StarId, StarId])[] = [
  ["liemTrinh", "phaQuan", "vuKhuc", "thaiDuong"], // Giáp
  ["thienCo", "thienLuong", "tuVi", "thaiAm"], // Ất
  ["thienDong", "thienCo", "vanXuong", "liemTrinh"], // Bính
  ["thaiAm", "thienDong", "thienCo", "cuMon"], // Đinh
  ["thamLang", "thaiAm", "huuBat", "thienCo"], // Mậu
  ["vuKhuc", "thamLang", "thienLuong", "vanKhuc"], // Kỷ
  ["thaiDuong", "vuKhuc", "thaiAm", "thienDong"], // Canh
  ["cuMon", "thaiDuong", "vanKhuc", "vanXuong"], // Tân
  ["thienLuong", "tuVi", "thienPhu", "vuKhuc"], // Nhâm
  ["phaQuan", "cuMon", "thaiAm", "thamLang"], // Quý
];
