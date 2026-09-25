import { FIXTURE_SLUG, SHOW_FIXTURES, type BaiViet } from "../types";
import { BAI_VIET_IMPORTED } from "./bai-viet.generated";

/** Dữ liệu thật: sinh bởi scripts/import-van-hoa.ts. */
const REAL: readonly BaiViet[] = BAI_VIET_IMPORTED;

/** Fixture dùng tranh Tết cây nêu (chỉ dev); toàn bộ chữ là chỗ giữ chỗ. */
const FIXTURE: BaiViet = {
  slug: FIXTURE_SLUG,
  title: "[…] Tiêu đề bài viết mẫu (chỉ dev)",
  label: "tin-nguong",
  summary: "[…]",
  updatedAt: "2026-09-25",
  heroImage: "/heritage/tet/cay-neu.webp",
  heroAlt: "Cây nêu ngày Tết",
  sections: [
    { id: "muc-1", heading: "[…] Mục thứ nhất", paras: ["[…]", "[…]"], sub: [{ heading: "[…] Tiểu mục", paras: ["[…]"] }] },
    { id: "muc-2", heading: "[…] Mục thứ hai", paras: ["[…]"] },
    { id: "muc-3", heading: "[…] Mục thứ ba", paras: ["[…]"] },
  ],
  lunarDates: [
    { label: "[…] Ngày thứ nhất", day: 23, month: 12 },
    { label: "[…] Ngày thứ hai", day: 1, month: 1 },
  ],
  quote: { lines: ["[…]", "[…]"], source: "[…]" },
  related: [
    { label: "[…] Bài liên quan 1", href: "/van-hoa/", summary: "[…]" },
    { label: "[…] Bài liên quan 2", href: "/van-hoa/", summary: "[…]" },
    { label: "[…] Bài liên quan 3", href: "/van-hoa/", summary: "[…]" },
  ],
  sources: [{ text: "[…]" }],
};

export const BAI_VIET: readonly BaiViet[] = SHOW_FIXTURES ? [...REAL, FIXTURE] : REAL;
export const baiVietBySlug = (slug: string) => BAI_VIET.find((n) => n.slug === slug);
