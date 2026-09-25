import { FIXTURE_SLUG, SHOW_FIXTURES, type DanGian } from "../types";

/** Dữ liệu thật: chưa có — sẽ được cung cấp sau. */
const REAL: readonly DanGian[] = [];

const IMG = "/heritage/van-hoa/fixture/o-an-quan.webp";

/** Fixture dùng tranh Ô ăn quan (chỉ dev); nội dung là chữ mẫu, không phải luật chơi chính thức. */
const FIXTURE: DanGian = {
  slug: FIXTURE_SLUG,
  group: "tro-choi",
  title: "Trò chơi mẫu (chỉ dev)",
  summary: "[Dữ liệu mẫu để xem bố cục] Đoạn giới thiệu ngắn về trò chơi dân gian.",
  heroImage: IMG,
  facts: { players: "[Mẫu] 2 – 4 người", tools: "[Mẫu] Dụng cụ", region: "[Mẫu] Vùng miền", occasion: "[Mẫu] Dịp chơi" },
  steps: [
    { title: "Bước một (mẫu)", text: "[Mẫu] Mô tả bước một.", image: IMG, imagePosition: "20% 85%" },
    { title: "Bước hai (mẫu)", text: "[Mẫu] Mô tả bước hai.", image: IMG, imagePosition: "20% 65%" },
    { title: "Bước ba (mẫu)", text: "[Mẫu] Mô tả bước ba.", image: IMG, imagePosition: "45% 65%" },
    { title: "Bước bốn (mẫu)", text: "[Mẫu] Mô tả bước bốn.", image: IMG, imagePosition: "80% 65%" },
  ],
  dongDao: { lines: ["[Mẫu] Câu đồng dao thứ nhất", "[Mẫu] Câu đồng dao thứ hai"] },
  winRules: ["[Mẫu] Cách tính thắng thua thứ nhất.", "[Mẫu] Cách tính thắng thua thứ hai."],
  related: [{ label: "Bài liên quan mẫu", href: "/van-hoa/", summary: "Mô tả mẫu" }],
  updatedAt: "2026-09-25",
  sources: [{ text: "[Nguồn mẫu — thay bằng nguồn thật]" }],
};

export const DAN_GIAN: readonly DanGian[] = SHOW_FIXTURES ? [...REAL, FIXTURE] : REAL;
export const danGianBySlug = (slug: string) => DAN_GIAN.find((n) => n.slug === slug);
