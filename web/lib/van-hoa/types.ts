/** Kiểu dữ liệu cho các khuôn trang con của mảng Văn hoá. Dữ liệu thật đặt ở ./data/*; fixture chỉ chạy khi dev. */

export type ItemLabel = "chinh-su" | "truyen-thuyet" | "tin-nguong";

/** Nhãn từng bài/sự kiện/nhân vật (khác nhãn chủ đề của trang tổng). */
export const ITEM_LABELS: Record<ItemLabel, { text: string; ink: string; bg: string; node: string }> = {
  "chinh-su": { text: "Chính sử", ink: "#B91C1C", bg: "#FEE2E2", node: "#B91C1C" },
  "truyen-thuyet": { text: "Truyền thuyết", ink: "#065F46", bg: "#DCF0E1", node: "#10B981" },
  "tin-nguong": { text: "Tín ngưỡng", ink: "#7A5A14", bg: "#F6EBD0", node: "#C9A34F" },
};

export interface Source {
  text: string;
  url?: string;
}

export interface RelatedLink {
  label: string;
  href: string;
  summary?: string;
}

/** Fixture chỉ có ở dev/test; build production không sinh trang fixture. */
export const SHOW_FIXTURES = process.env.NODE_ENV !== "production";
export const FIXTURE_SLUG = "__fixture__";

export const NHAN_VAT_GROUPS = [
  { key: "tu-bat-tu", title: "Tứ bất tử" },
  { key: "thoi-dung-nuoc", title: "Thời dựng nước" },
  { key: "dao-mau", title: "Đạo Mẫu" },
  { key: "than-nha-lang", title: "Thần trong nhà và làng" },
  { key: "nu-than-cac-mien", title: "Nữ thần các miền" },
  { key: "truyen-co-tich", title: "Truyện cổ tích" },
] as const;
export type NhanVatGroupKey = (typeof NHAN_VAT_GROUPS)[number]["key"];

export interface Festival {
  name: string;
  /** Ngày/tháng âm lịch (tháng thường, không nhuận). */
  lunarDay: number;
  lunarMonth: number;
  note?: string;
}

export interface NhanVat {
  slug: string;
  name: string;
  otherNames?: string[];
  label: ItemLabel;
  group: NhanVatGroupKey;
  summary: string;
  /** Ảnh hero; thiếu thì dùng khung hoa văn trung tính. */
  image?: string;
  imageAlt?: string;
  variants?: string[];
  /** Địa chỉ theo đơn vị hành chính mới, không ghi cấp huyện. */
  places?: { name: string; address: string }[];
  festivals?: Festival[];
  relatedVanKhan?: RelatedLink[];
  relatedNhanVat?: string[];
  sources: Source[];
}

export interface SuKien {
  slug: string;
  title: string;
  label: ItemLabel;
  summary: string;
  /** Ngày âm lịch đúng như sử sách ghi; `year` là năm âm lịch (số năm Công nguyên). */
  lunar: { day: number; month: number; year: number; leap?: boolean };
  /** Chữ hiển thị nguyên văn theo sách, vd. "Ngày 12 tháng 8 năm Mậu Thân". Thiếu thì tự dựng từ `lunar`. */
  lunarText?: string;
  dynasty?: string;
  heroImage?: string;
  boiCanh: string[];
  dienBien: string[];
  yNghia: string[];
  mapImage?: string;
  mapAlt?: string;
  /** Có nội dung thì hiện khung "Các nguồn chưa thống nhất". */
  disputed?: string;
  relatedNhanVat?: string[];
  sources: Source[];
}

export interface NamSuKien {
  year: number;
  dynasty: string;
  title: string;
  summary: string;
  label: ItemLabel;
  href?: string;
}

export interface DanGianStep {
  title: string;
  text: string;
  image?: string;
  imagePosition?: string;
}

export interface DanGian {
  slug: string;
  title: string;
  summary: string;
  heroImage?: string;
  facts: { players: string; tools: string; region: string; occasion: string };
  steps: DanGianStep[];
  dongDao?: { lines: string[] };
  winRules: string[];
  related?: RelatedLink[];
  sources?: Source[];
}
