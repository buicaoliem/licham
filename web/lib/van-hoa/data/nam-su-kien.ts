import { SHOW_FIXTURES, type NamSuKien } from "../types";

/** Mốc theo năm dương lịch của sự kiện; trang can chi tự gom theo can chi của năm. Dữ liệu thật: chưa có. */
const REAL: readonly NamSuKien[] = [];

/** Fixture gắn vào các năm Giáp Thìn (1664, 1724, 1784) để xem bố cục — chỉ dev. */
const FIXTURE: readonly NamSuKien[] = [
  { year: 1664, dynasty: "le-trung-hung", title: "[Mẫu] Sự kiện chính sử", summary: "Dữ liệu mẫu để xem bố cục.", label: "chinh-su", updatedAt: "2026-09-25" },
  { year: 1724, dynasty: "le-trung-hung", title: "[Mẫu] Sự kiện truyền thuyết", summary: "Dữ liệu mẫu để xem bố cục.", label: "truyen-thuyet", updatedAt: "2026-09-25" },
  { year: 1784, dynasty: "khong-co-khoa", title: "[Mẫu] Sự kiện tín ngưỡng", summary: "Khoá triều đại không có trong cấu hình — kiểm tra khung thay thế.", label: "tin-nguong", updatedAt: "2026-09-25" },
];

export const NAM_SU_KIEN: readonly NamSuKien[] = SHOW_FIXTURES ? [...REAL, ...FIXTURE] : REAL;
