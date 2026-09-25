import { FIXTURE_SLUG, SHOW_FIXTURES, type NhanVat } from "../types";
import { NHAN_VAT_IMPORTED } from "./nhan-vat.generated";

/** Dữ liệu thật: sinh bởi scripts/import-van-hoa.ts. */
const REAL: readonly NhanVat[] = NHAN_VAT_IMPORTED;

const FIXTURE: NhanVat = {
  slug: FIXTURE_SLUG,
  name: "Thánh Gióng (bản mẫu, chỉ dev)",
  otherNames: ["Phù Đổng Thiên Vương"],
  image: "/heritage/van-hoa/nhan-vat/thanh-giong-hero.webp",
  cardImage: "/heritage/van-hoa/nhan-vat/thanh-giong-the.webp",
  imageAlt: "Thánh Gióng cưỡi ngựa sắt cầm giáo giữa mây và núi",
  label: "truyen-thuyet",
  group: "tu-bat-tu",
  summary: "[Dữ liệu mẫu để xem bố cục] Đoạn tóm tắt ngắn về nhân vật, hiển thị trên trang chi tiết và trong thẻ ở trang danh sách.",
  variants: ["[Mẫu] Dị bản thứ nhất kể theo vùng A.", "[Mẫu] Dị bản thứ hai kể theo vùng B."],
  places: [
    { name: "Nơi thờ mẫu 1", address: "Địa chỉ mẫu, tỉnh/thành mẫu" },
    { name: "Nơi thờ mẫu 2", address: "Địa chỉ mẫu, tỉnh/thành mẫu" },
  ],
  festivals: [
    { name: "Lễ hội mẫu A", lunarDay: 9, lunarMonth: 4, note: "Ghi chú mẫu" },
    { name: "Lễ hội mẫu B", lunarDay: 6, lunarMonth: 1 },
  ],
  relatedVanKhan: [{ label: "Văn khấn ngày mùng một", href: "/van-khan/" }],
  relatedHolidays: ["tet-nguyen-dan"],
  updatedAt: "2026-09-25",
  sources: [{ text: "[Nguồn mẫu — thay bằng nguồn thật]" }],
};

export const NHAN_VAT: readonly NhanVat[] = SHOW_FIXTURES ? [...REAL, FIXTURE] : REAL;
export const nhanVatBySlug = (slug: string) => NHAN_VAT.find((n) => n.slug === slug);
