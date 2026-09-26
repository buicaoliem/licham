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

/** Ngày cập nhật nội dung (ISO yyyy-mm-dd), dùng cho "Cập nhật ngày …" và dateModified trong JSON-LD. */
export type UpdatedAt = string;

export interface RelatedLink {
  label: string;
  href: string;
  summary?: string;
  /** Ảnh thu nhỏ (thẻ "Bài liên quan"); thiếu thì dùng khung hoa văn. */
  image?: string;
  /** Nhãn chuyên mục kiểu trang tổng (vd. "Dân gian", "Thiên văn"). */
  badge?: string;
  /** Nhãn mục (Chính sử / Truyền thuyết / Tín ngưỡng) khi liên kết tới nhân vật, sự kiện. */
  itemLabel?: ItemLabel;
}

/**
 * Liên kết nội bộ dùng chung cho mọi loại trang Lịch sử & Văn hoá (sự kiện, anh hùng, sau này dòng họ / đời vua / dân gian).
 * Slug trỏ tới mục lục nhân vật hoặc sự kiện; thiếu thì ẩn khối, không hiện danh sách rỗng.
 */
export interface RelatedRefs {
  relatedPeople?: string[];
  relatedEvents?: string[];
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
  { key: "thien-su-hoa-thanh", title: "Thiền sư hóa thánh" },
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
  /** Ảnh vuông 1:1 cho thẻ ở trang danh sách; thiếu thì dùng `image`. */
  cardImage?: string;
  imageAlt?: string;
  variants?: string[];
  /** Địa chỉ theo đơn vị hành chính mới, không ghi cấp huyện; `oldAddress`: địa chỉ trước sáp nhập. */
  places?: NhanVatPlace[];
  /** Nơi thờ dạng chữ, chỉ hiện khi không có `places` (vd. thần trong nhà). */
  worshipPlacesText?: string;
  festivals?: Festival[];
  /** Lễ hội ghi nguyên văn theo nguồn; có thì hiện thay danh sách `festivals` (bảng 10 năm vẫn dùng `festivals`). */
  festivalsText?: string[];
  /** Di tích, di sản được công nhận. */
  heritage?: string[];
  relatedVanKhan?: RelatedLink[];
  relatedNhanVat?: string[];
  /** Slug các trang /le/ mà lễ hội của nhân vật này gắn tới; dùng cho khối "Nhân vật & nơi thờ liên quan" ở trang ngày lễ. */
  relatedHolidays?: string[];
  updatedAt: UpdatedAt;
  sources: Source[];
}

export interface NhanVatPlace {
  name: string;
  address: string;
  oldAddress?: string;
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
  /** "sources": ngày dương lấy từ sách (điền `solar`); "computed": tự quy đổi từ ngày âm — có thể lệch 1–2 ngày so với lịch xưa. */
  solarDateSource: "sources" | "computed";
  solar?: { day: number; month: number; year: number };
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
  relatedPeople?: string[];
  relatedEvents?: string[];
  updatedAt: UpdatedAt;
  sources: Source[];
}

export interface NamSuKien {
  /** Mã ổn định do script nhập sinh ra. */
  id?: string;
  /** Năm dương lịch (âm = TCN). Năm không rõ: chỉ để xếp thứ tự — hiển thị `yearText`. */
  year: number;
  /** Năm âm lịch: gắn mốc vào trang năm can chi. Thiếu thì dùng `year`; null = không gắn năm nào. Không suy từ `year`. */
  lunarYear?: number | null;
  /** Năm hiển thị nguyên văn, vd. "2879 TCN", "Thời Hùng Vương". */
  yearText?: string;
  /** Ngày âm nguyên văn theo nguồn: "26/7", "tháng 8", "mùa xuân" hoặc rỗng. */
  lunarDate?: string;
  /** Chỉ có khi nguồn ghi ngày âm cụ thể — mới vào "Ngày này năm xưa". */
  lunarDay?: number;
  lunarMonth?: number;
  solar?: { day: number; month: number; year: number };
  solarDateSource?: "sources" | "computed";
  /** Có nội dung thì hiện ghi chú "Tư liệu còn khác nhau". */
  disputed?: string;
  people?: string[];
  sources?: Source[];
  dynasty: string;
  title: string;
  summary: string;
  label: ItemLabel;
  href?: string;
  relatedPeople?: string[];
  relatedEvents?: string[];
  updatedAt: UpdatedAt;
}

export interface DanGianStep {
  title: string;
  text: string;
  image?: string;
  imagePosition?: string;
}

export const DAN_GIAN_GROUPS = [
  { key: "tro-choi", title: "Trò chơi" },
  { key: "tranh-dan-gian", title: "Tranh dân gian" },
  { key: "do-choi", title: "Đồ chơi" },
  { key: "truyen-co-tich", title: "Truyện cổ tích" },
  { key: "tin-nguong", title: "Tín ngưỡng" },
  { key: "mon-an-theo-le", title: "Món ăn theo lễ" },
] as const;
export type DanGianGroupKey = (typeof DAN_GIAN_GROUPS)[number]["key"];

export interface DanGian {
  slug: string;
  group: DanGianGroupKey;
  title: string;
  summary: string;
  heroImage?: string;
  facts: { players: string; tools: string; region: string; occasion: string };
  steps: DanGianStep[];
  dongDao?: { lines: string[] };
  winRules: string[];
  related?: RelatedLink[];
  updatedAt: UpdatedAt;
  sources?: Source[];
}

/** Một mục của bài viết thường: tiêu đề mục (vào mục lục), đoạn văn và các tiểu mục. */
export interface BaiVietSection {
  id: string;
  heading: string;
  paras: string[];
  sub?: { heading: string; paras: string[] }[];
  /** Đoạn, danh sách, bảng (chữ đậm **…**, nghiêng *…*); hiện sau `paras`. */
  blocks?: BaiVietBlock[];
}

export type BaiVietBlock = { type: "p"; text: string } | { type: "ul"; items: string[] } | { type: "table"; head: string[]; rows: string[][] };

export interface BaiViet {
  slug: string;
  title: string;
  /** Nhãn chuyên mục hiện trên đầu bài. */
  label: ItemLabel;
  /** Chuyên mục kiểu trang tổng ("Dân gian", "Thiên văn"); có thì hiện thay `label`. */
  category?: string;
  summary: string;
  /** Đoạn mở bài, trước mục thứ nhất. */
  intro?: string[];
  /** Slug nhân vật liên quan — vào "Bài liên quan". */
  relatedFigures?: string[];
  updatedAt: UpdatedAt;
  /** Tranh minh hoạ tỷ lệ 4:3; thiếu thì dùng khung hoa văn. */
  heroImage?: string;
  heroAlt?: string;
  sections: BaiVietSection[];
  /** Hộp "Ngày âm liên quan": ngày âm, năm nay tự quy đổi bằng lõi lịch. */
  lunarDates?: { label: string; day: number; month: number; /** Chữ hiển thị nguyên văn, vd. "26–29 tháng Chạp"; thiếu thì dựng từ day/month. */ text?: string }[];
  /** Hộp ca dao / câu đối. */
  quote?: { lines: string[]; source?: string };
  related?: RelatedLink[];
  sources: Source[];
}

/** Lễ hội (sinh bởi scripts/import-van-hoa.ts từ le-hoi.csv). Không có cột ghi chú nội bộ needsCheck. */
export interface LeHoi {
  slug: string;
  name: string;
  /** "am": theo âm lịch; "cham": theo lịch Chăm (chỉ hiện `dateText`, không quy ra ngày âm). */
  calendar: "am" | "cham";
  /** Thiếu = không cố định ngày (tục lệ theo mùa vụ, theo dòng họ). Tháng thường, không nhuận. */
  lunarMonth?: number;
  startDay?: number;
  /** Thiếu khi lễ hội chỉ có một ngày hoặc kéo sang tháng sau (xem `mainDay`). */
  /** Tháng âm của endDay; thiếu = cùng lunarMonth. Khác lunarMonth khi lễ hội kéo sang tháng sau. */
  endMonth?: number;
  endDay?: number;
  mainDay?: number;
  /** Ngày ghi bằng chữ — nguồn đáng tin nhất để hiển thị. */
  dateText: string;
  site: string;
  newAddress: string;
  oldAddress?: string;
  worship: string;
  summary: string;
  rituals: string;
  heritage?: string;
  imageKey?: string;
  image?: string;
  cardImage?: string;
  imageAlt?: string;
  /** Slug cũ (đã đổi tên): trang cũ chuyển hướng vĩnh viễn sang slug mới. */
  oldSlug?: string;
  updatedAt: UpdatedAt;
  sources: Source[];
}
