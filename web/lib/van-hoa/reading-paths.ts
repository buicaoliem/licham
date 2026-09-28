/**
 * "Chuỗi đọc" (reading path) — dãy nội dung đã publish, nối nhân vật/câu chuyện/sự kiện theo một mạch kể
 * biên tập tay. KHÔNG tự suy ra bằng graph quan hệ — mỗi bước và ghi chú do người biên tập chọn, xem
 * docs/story-map.md để biết bối cảnh các bài đã có. Chỉ hiển thị path khi MỌI bước đều tồn tại và đã publish
 * (resolveReadingPath trả về undefined nếu thiếu một bước — không hiện path cụt).
 */
import { ANH_HUNG, anhHungHref } from "../anh-hung";
import { STORY } from "./data/story";
import { SU_KIEN } from "./data/su-kien";
import { FIXTURE_SLUG } from "./types";

export type ReadingPathItemType = "person" | "story" | "event";

export interface ReadingPathItem {
  type: ReadingPathItemType;
  slug: string;
  /** Ghi chú ngắn biên tập tay: vì sao bước này đáng đọc tiếp. */
  note: string;
}

export interface ReadingPath {
  slug: string;
  title: string;
  description: string;
  items: ReadingPathItem[];
}

export const READING_PATHS: ReadingPath[] = [
  {
    slug: "bach-dang-den-hoa-lu",
    title: "Từ Bạch Đằng đến Hoa Lư",
    description: "Từ chiến thắng Bạch Đằng năm 938 của Ngô Quyền đến ngày Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước.",
    items: [
      { type: "person", slug: "ngo-quyen", note: "Người mở đầu chuỗi sự kiện — trấn giữ Ái Châu rồi đem quân ra Bắc năm 937." },
      { type: "story", slug: "kieu-cong-tien-cau-cuu-nam-han", note: "Vì sao một viên tướng lại cầu cứu chính quân Nam Hán." },
      { type: "event", slug: "bach-dang-938", note: "Trận địa cọc quyết định trên sông Bạch Đằng." },
      { type: "story", slug: "sau-bach-dang-938-ngo-quyen-lam-gi", note: "Ngô Quyền xưng vương, chọn Cổ Loa — rồi triều đại ông lập ra suy yếu nhanh chóng." },
      { type: "story", slug: "loan-12-su-quan-dinh-bo-linh-thong-nhat-the-nao", note: "Hơn hai mươi năm cát cứ, kết thúc bằng cuộc thống nhất của Đinh Bộ Lĩnh." },
      { type: "person", slug: "dinh-tien-hoang", note: "Người kết thúc loạn 12 sứ quân, mở đầu nhà Đinh." },
    ],
  },
  {
    slug: "lam-son-den-le-chi-vien",
    title: "Từ Lam Sơn đến Lệ Chi Viên",
    description: "Nguyễn Trãi theo Lê Lợi dựng nghiệp Lam Sơn, cùng viết nên Bình Ngô đại cáo — rồi 14 năm sau chịu án oan ở Lệ Chi Viên.",
    items: [
      { type: "person", slug: "le-loi", note: "Chủ tướng khởi nghĩa Lam Sơn, người Nguyễn Trãi tìm đến phò tá." },
      { type: "story", slug: "nguyen-trai-den-voi-le-loi-nhu-the-nao", note: "Một khoảng trống sử liệu: Nguyễn Trãi gia nhập nghĩa quân từ lúc nào." },
      { type: "story", slug: "quan-trung-tu-menh-tap-duoc-dung-the-nao", note: "Ông dùng ngòi bút để làm suy yếu quân Minh trước khi giao chiến." },
      { type: "story", slug: "hoi-the-dong-quan-dien-ra-nhu-the-nao", note: "Vì sao Lê Lợi chọn tha cho quân Minh rút về nước." },
      { type: "story", slug: "binh-ngo-dai-cao-ra-doi-trong-hoan-canh-nao", note: "Áng văn tuyên bố chiến thắng và nền độc lập." },
      { type: "story", slug: "vu-an-le-chi-vien", note: "14 năm sau, một cái chết đột ngột của vua kéo cả gia tộc Nguyễn Trãi vào án tru di." },
      { type: "story", slug: "nguyen-trai-duoc-minh-oan-nhu-the-nao", note: "22 năm sau vụ án, triều đình kế tiếp xuống chiếu minh oan cho ông." },
    ],
  },
  {
    slug: "nha-tran-chong-nguyen",
    title: "Nhà Trần chống Nguyên",
    description: "Từ bài hịch tập hợp lòng quân đến quyết định rút khỏi Thăng Long, rồi chiến thắng Bạch Đằng lần thứ hai.",
    items: [
      { type: "person", slug: "tran-hung-dao", note: "Quốc công tiết chế thống lĩnh kháng chiến chống Nguyên Mông lần hai và lần ba." },
      { type: "story", slug: "hich-tuong-si-ra-doi-the-nao", note: "Bài hịch tập hợp quân sĩ trước khi quân Nguyên tràn sang lần hai." },
      { type: "story", slug: "vi-sao-quan-tran-bo-thang-long-1285", note: "Một quyết định trông như thất bại, thực ra là bước lùi có tính toán." },
      { type: "event", slug: "bach-dang-1288", note: "Trận Bạch Đằng lần thứ hai, kết thúc cuộc kháng chiến lần ba." },
      { type: "person", slug: "tran-quang-khai", note: "Thượng tướng thái sư cùng Trần Hưng Đạo gác lại hiềm khích để phối hợp chỉ huy." },
    ],
  },
  {
    slug: "hoa-lu-den-thang-long",
    title: "Từ Hoa Lư đến Thăng Long",
    description: "Từ kinh đô hiểm trở của hai triều Đinh, Tiền Lê đến quyết định dời đô về Đại La — mở ra Thăng Long — của Lý Thái Tổ.",
    items: [
      { type: "person", slug: "dinh-tien-hoang", note: "Người dẹp loạn 12 sứ quân, đóng đô ở Hoa Lư — nơi hiểm trở, dễ phòng thủ trong buổi đầu độc lập." },
      { type: "person", slug: "le-dai-hanh", note: "Kế tục Hoa Lư làm kinh đô, đánh Tống 981 rồi bình Chiêm — vẫn dựa vào thế đất hiểm trở như nhà Đinh." },
      { type: "story", slug: "vi-sao-ly-cong-uan-doi-do", note: "Vì sao vị vua đầu triều Lý chọn rời bỏ Hoa Lư để dời đô về Đại La, đổi tên thành Thăng Long." },
      { type: "person", slug: "ly-thai-to", note: "Người dời đô năm 1010, mở đầu hơn 200 năm nhà Lý đóng đô ở Thăng Long." },
    ],
  },
];

export interface ResolvedReadingPathItem extends ReadingPathItem {
  title: string;
  href: string;
  badge: string;
}

export interface ResolvedReadingPath extends Omit<ReadingPath, "items"> {
  items: ResolvedReadingPathItem[];
}

function resolveItem(item: ReadingPathItem): ResolvedReadingPathItem | undefined {
  if (item.type === "person") {
    const p = ANH_HUNG.find((a) => a.slug === item.slug);
    if (!p) return undefined;
    return { ...item, title: p.ten, href: anhHungHref(p.slug), badge: "Nhân vật" };
  }
  if (item.type === "story") {
    const s = STORY.find((x) => x.slug === item.slug && x.slug !== FIXTURE_SLUG);
    if (!s) return undefined;
    return { ...item, title: s.title, href: `/van-hoa/cau-chuyen/${s.slug}/`, badge: "Câu chuyện" };
  }
  const e = SU_KIEN.find((x) => x.slug === item.slug && x.slug !== FIXTURE_SLUG);
  if (!e) return undefined;
  return { ...item, title: e.title, href: `/van-hoa/su-kien/${e.slug}/`, badge: "Sự kiện" };
}

/** Chỉ trả về path khi MỌI bước đều tồn tại thật — không hiện path thiếu bước. */
export function resolveReadingPath(path: ReadingPath): ResolvedReadingPath | undefined {
  const items = path.items.map(resolveItem);
  if (items.some((i) => !i)) return undefined;
  return { ...path, items: items as ResolvedReadingPathItem[] };
}

export function resolvedReadingPaths(): ResolvedReadingPath[] {
  return READING_PATHS.map(resolveReadingPath).filter((p): p is ResolvedReadingPath => Boolean(p));
}
