/**
 * Chuyên mục "Các anh hùng dân tộc" (/anh-hung-dan-toc/). Dữ liệu tiểu sử ở anh-hung-data.ts được trích
 * từ các bài Wikipedia tiếng Việt ghi trong trường wikiTitle (xem nguồn ở từng trang), không tự soạn niên
 * đại hay công trạng. Ngày giỗ/tưởng niệm lấy từ trang lễ tương ứng (lib/le.ts) qua leSlug.
 */
import { ANH_HUNG_DATA } from "./anh-hung-data";

export type ThoiKy = "hong-bang" | "bac-thuoc" | "the-ky-x" | "ly-tran" | "le-so" | "tay-son" | "chong-phap" | "hien-dai";

export interface AnhHung {
  slug: string;
  ten: string;
  tenThat: string | null;
  tenKhac: string[];
  namSinh: string | null;
  namMat: string | null;
  nienDai: string;
  queQuan: string;
  thoiKy: ThoiKy;
  trieuDai: string;
  /** Năm đại diện để xếp dòng thời gian (năm âm = trước Công nguyên). */
  namMoc: number;
  tomTat: string;
  tieuSu: string[];
  boiCanh: string[];
  congTrang: string[];
  suKien: { nam: string; text: string }[];
  diTich: { ten: string; diaDiem: string }[];
  tuongNiem: string[];
  ghiChuSuLieu: string | null;
  wikiTitle: string;
  /** Nguồn của hồ sơ khảo cứu (nhân vật thêm từ lượt 1); khi có, bài Wikipedia chỉ là bài đối chiếu. */
  nguon?: string[];
  /** Trang ngày giỗ / tưởng niệm tương ứng trong mục Ngày lễ. */
  leSlug?: string;
  /** Có trong danh sách 14 anh hùng dân tộc tiêu biểu (Bộ VHTTDL, văn bản 2296/BVHTTDL-MTNATL, 2013). */
  tieuBieu2013?: boolean;
}

export const THOI_KY: { key: ThoiKy; label: string; khoang: string }[] = [
  {
    key: "hong-bang",
    label: "Thời dựng nước (Văn Lang – Âu Lạc)",
    khoang: "Truyền thuyết dựng nước",
  },
  { key: "bac-thuoc", label: "Chống Bắc thuộc", khoang: "Thế kỷ I – IX" },
  { key: "the-ky-x", label: "Buổi đầu độc lập", khoang: "Thế kỷ X" },
  { key: "ly-tran", label: "Lý – Trần", khoang: "Thế kỷ XI – XIV" },
  { key: "le-so", label: "Khởi nghĩa Lam Sơn – Lê sơ", khoang: "Thế kỷ XV" },
  { key: "tay-son", label: "Tây Sơn", khoang: "Thế kỷ XVIII" },
  {
    key: "chong-phap",
    label: "Chống thực dân Pháp",
    khoang: "Thế kỷ XIX – đầu XX",
  },
  { key: "hien-dai", label: "Thời hiện đại", khoang: "Thế kỷ XX" },
];

/** Khóa xếp dòng thời gian: năm sinh nếu chắc chắn, không thì năm của sự kiện tiêu biểu (namMoc). */
function namXep(a: AnhHung): number {
  return a.namSinh && /^\d{1,4}$/.test(a.namSinh) ? Number(a.namSinh) : a.namMoc;
}

export const ANH_HUNG: AnhHung[] = [...ANH_HUNG_DATA].sort((a, b) => namXep(a) - namXep(b) || a.ten.localeCompare(b.ten, "vi"));

/** Tranh riêng của nhân vật trong chuyên mục (khi trang ngày giỗ không có tranh). */
export function anhHungImagePath(slug: string): string {
  return `/heritage/anh-hung/${slug}.webp`;
}

export function anhHungHref(slug: string): string {
  return `/anh-hung-dan-toc/${slug}/`;
}

export function anhHungBySlug(slug: string): AnhHung | undefined {
  return ANH_HUNG.find((a) => a.slug === slug);
}

/** Nhân vật có trang ngày giỗ/tưởng niệm là leSlug (liên kết ngược từ trang lễ). */
export function anhHungByLeSlug(leSlug: string): AnhHung | undefined {
  return ANH_HUNG.find((a) => a.leSlug === leSlug);
}

export function thoiKyLabel(k: ThoiKy): string {
  return THOI_KY.find((t) => t.key === k)?.label ?? k;
}

/** Danh sách triều đại theo thứ tự xuất hiện trên dòng thời gian. */
export function trieuDaiList(): string[] {
  return [...new Set(ANH_HUNG.map((a) => a.trieuDai))];
}

export function wikiUrl(title: string): string {
  return `https://vi.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
}

/** Nhân vật liền trước / liền sau trên dòng thời gian. */
export function anhHungKeCan(slug: string): { prev?: AnhHung; next?: AnhHung } {
  const i = ANH_HUNG.findIndex((a) => a.slug === slug);
  return {
    prev: i > 0 ? ANH_HUNG[i - 1] : undefined,
    next: i >= 0 && i < ANH_HUNG.length - 1 ? ANH_HUNG[i + 1] : undefined,
  };
}

/** Nhân vật cùng thời kỳ (trừ chính mình), tối đa n. */
export function anhHungCungThoi(a: AnhHung, n = 4): AnhHung[] {
  return ANH_HUNG.filter((x) => x.thoiKy === a.thoiKy && x.slug !== a.slug).slice(0, n);
}
