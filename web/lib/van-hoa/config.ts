/**
 * Công tắc DUY NHẤT cho trang /van-hoa/: false = ẩn (noindex, nofollow, không vào sitemap).
 * Khi công bố: đổi thành true cùng lúc với việc thêm mục vào menu.
 */
export const VAN_HOA_PUBLIC = false;

export interface TopicLink {
  label: string;
  href: string;
}

export interface Topic {
  slug: string;
  title: string;
  badge: string;
  image: string;
  imageAlt: string;
  description: string;
  href: string;
  /** Điểm lấy nét khi cắt ảnh dọc trong thẻ (CSS object-position). */
  imagePosition?: string;
  /** false: trang đích chưa có → thẻ chỉ hiện mô tả, ẩn "Xem tất cả". */
  live: boolean;
  links: TopicLink[];
}

const IMG = "/heritage/van-hoa";

export const TOPICS: readonly Topic[] = [
  {
    slug: "lich-su-theo-nam",
    imagePosition: "25% 50%",
    title: "Lịch sử theo năm",
    badge: "Chính sử",
    image: `${IMG}/lich-su-theo-nam-480.webp`,
    imageAlt: "Cổng thành cổ, bánh xe mười hai con giáp và cuộn sách sử bên bờ sông",
    description: "Các mốc lịch sử Việt Nam theo dòng thời gian, đối chiếu với năm âm lịch và can chi.",
    href: "/van-hoa/lich-su-theo-nam/",
    live: false,
    links: [],
  },
  {
    slug: "cac-doi-vua",
    imagePosition: "50% 50%",
    title: "Các đời vua",
    badge: "Chính sử",
    image: `${IMG}/cac-doi-vua-480.webp`,
    imageAlt: "Vua ngự trên ngai vàng trong cung điện, quan lại đứng hầu hai bên",
    description: "Các triều đại và những vị vua qua từng thời kỳ của lịch sử dân tộc.",
    href: "/van-hoa/cac-doi-vua/",
    live: false,
    links: [],
  },
  {
    slug: "nguoi-viet-co",
    imagePosition: "85% 75%",
    title: "Người Việt cổ",
    badge: "Truyền thuyết",
    image: `${IMG}/nguoi-viet-co-480.webp`,
    imageAlt: "Trống đồng bên nhà sàn và thuyền trên sông thời dựng nước",
    description: "Thời dựng nước: trống đồng, nhà sàn và những câu chuyện truyền thuyết về cội nguồn.",
    href: "/van-hoa/nguoi-viet-co/",
    live: false,
    links: [],
  },
  {
    slug: "van-hoa-dan-gian",
    imagePosition: "30% 50%",
    title: "Văn hoá dân gian",
    badge: "Dân gian",
    image: `${IMG}/van-hoa-dan-gian-480.webp`,
    imageAlt: "Múa lân và trẻ em vui chơi ngày hội",
    description: "Phong tục, trò chơi và nếp sống dân gian gắn với các dịp trong năm.",
    href: "/van-hoa/van-hoa-dan-gian/",
    live: false,
    links: [],
  },
  {
    slug: "thien-van-mua-mang",
    imagePosition: "50% 50%",
    title: "Thiên văn & mùa màng",
    badge: "Thiên văn",
    image: `${IMG}/thien-van-mua-mang-480.webp`,
    imageAlt: "Các pha của mặt trăng trên cánh đồng lúa lúc hoàng hôn",
    description: "Trăng, tiết khí và nhịp mùa màng: vì sao người xưa làm lịch theo trời.",
    href: "/van-hoa/thien-van-mua-mang/",
    live: false,
    links: [],
  },
  {
    slug: "le-hoi-dong-ho",
    imagePosition: "35% 50%",
    title: "Lễ hội & dòng họ",
    badge: "Phong tục",
    image: `${IMG}/le-hoi-dong-ho-480.webp`,
    imageAlt: "Đoàn rước lễ hội qua cổng đình và cây gia phả",
    description: "Lễ hội làng, ngày giỗ và cách các dòng họ giữ nếp nhà.",
    href: "/van-hoa/le-hoi-dong-ho/",
    live: false,
    links: [],
  },
  {
    slug: "hoc-duong",
    imagePosition: "35% 70%",
    title: "Học đường",
    badge: "Giáo dục",
    image: `${IMG}/hoc-duong-480.webp`,
    imageAlt: "Cuốn sách mở, bản đồ nước Việt và cuộn giấy bút mực",
    description: "Chuyện học hành, khoa cử và trường lớp qua các thời kỳ.",
    href: "/van-hoa/hoc-duong/",
    live: false,
    links: [],
  },
];

export const HERO_IMAGE = `${IMG}/lich-su-theo-nam-hero.webp`;

/** Nhãn màu xanh ngọc; các nhãn còn lại màu hồng đỏ. */
export const GREEN_BADGES: readonly string[] = ["Thiên văn", "Giáo dục", "Truyền thuyết"];

/** Bài mới: rỗng thì ẩn cả mục. */
export interface NewPost {
  image?: string;
  title: string;
  href: string;
  badge: string;
  date: string;
}
export const NEW_POSTS: readonly NewPost[] = [];
