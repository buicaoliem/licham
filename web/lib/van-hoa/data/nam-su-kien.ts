import { SHOW_FIXTURES, type NamSuKien } from "../types";
import { NAM_SU_KIEN_IMPORTED } from "./nam-su-kien.generated";

/** Mốc lịch sử; trang can chi gom theo can chi của năm âm lịch (`lunarYear`). Dữ liệu thật sinh bởi scripts/import-van-hoa.ts. */
const REAL: readonly NamSuKien[] = NAM_SU_KIEN_IMPORTED;

/** Fixture gắn vào các năm Giáp Thìn (1664, 1724, 1784) để xem bố cục — chỉ dev. */
const FIXTURE: readonly NamSuKien[] = [
  { year: 1664, dynasty: "le-trung-hung", title: "[Mẫu] Sự kiện chính sử", summary: "Dữ liệu mẫu để xem bố cục.", label: "chinh-su", updatedAt: "2026-09-25" },
  { year: 1724, dynasty: "le-trung-hung", title: "[Mẫu] Sự kiện truyền thuyết", summary: "Dữ liệu mẫu để xem bố cục.", label: "truyen-thuyet", updatedAt: "2026-09-25" },
  { year: 1784, dynasty: "khong-co-khoa", title: "[Mẫu] Sự kiện tín ngưỡng", summary: "Khoá triều đại không có trong cấu hình — kiểm tra khung thay thế.", label: "tin-nguong", updatedAt: "2026-09-25" },
];

export const NAM_SU_KIEN: readonly NamSuKien[] = SHOW_FIXTURES ? [...REAL, ...FIXTURE] : REAL;
