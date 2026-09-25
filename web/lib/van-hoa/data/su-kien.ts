import { FIXTURE_SLUG, SHOW_FIXTURES, type SuKien } from "../types";

/** Dữ liệu thật: chưa có — sẽ được cung cấp sau. */
const REAL: readonly SuKien[] = [];

const FIXTURE: SuKien = {
  slug: FIXTURE_SLUG,
  title: "Sự kiện mẫu (chỉ dev)",
  label: "chinh-su",
  summary: "[Dữ liệu mẫu để xem bố cục] Một câu mô tả ngắn về sự kiện.",
  lunar: { day: 12, month: 8, year: 1428 },
  boiCanh: ["[Mẫu] Đoạn bối cảnh thứ nhất.", "[Mẫu] Đoạn bối cảnh thứ hai."],
  dienBien: ["[Mẫu] Đoạn diễn biến."],
  yNghia: ["[Mẫu] Đoạn ý nghĩa."],
  disputed: "[Mẫu] Nguồn A ghi ngày khác với nguồn B; trang này theo nguồn A.",
  relatedNhanVat: [FIXTURE_SLUG],
  sources: [{ text: "[Nguồn mẫu — thay bằng nguồn thật]" }],
};

export const SU_KIEN: readonly SuKien[] = SHOW_FIXTURES ? [...REAL, FIXTURE] : REAL;
export const suKienBySlug = (slug: string) => SU_KIEN.find((n) => n.slug === slug);
