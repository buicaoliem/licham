/**
 * Công tắc DUY NHẤT cho mảng /van-hoa/, đọc lúc build từ biến môi trường VAN_HOA_PUBLIC ("1" = bật).
 * Tắt (mặc định): trang noindex/nofollow, không vào sitemap, menu giữ "Đổi ngày".
 * Bật: trang được index và vào sitemap; menu chính bỏ "Đổi ngày", thêm "Văn hoá" ở cuối; chân trang có "Đổi ngày".
 */
export const VAN_HOA_PUBLIC = process.env.VAN_HOA_PUBLIC === "1";

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

import { ECLIPSES, ECLIPSE_LIST_PATH } from "./eclipses";
import { BAI_VIET } from "./data/bai-viet";
import { isTroChoi, TRO_CHOI_PATH } from "./tro-choi";
import { FIXTURE_SLUG } from "./types";

/** Bài viết thật (không gồm fixture), mới cập nhật trước. */
const POSTS = BAI_VIET.filter((p) => p.slug !== FIXTURE_SLUG);
const postLinks = (category: string): TopicLink[] => {
  const posts = POSTS.filter((p) => p.category === category);
  const articles = posts.filter((p) => !isTroChoi(p.slug)).map((p) => ({ label: p.title.split(":")[0]!, href: `/van-hoa/bai-viet/${p.slug}/` }));
  return category === "Dân gian" ? [{ label: "Trò chơi dân gian", href: TRO_CHOI_PATH }, ...articles] : articles;
};

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
    href: "/van-hoa/su-kien/",
    live: true,
    links: [],
  },
  {
    slug: "cac-doi-vua",
    imagePosition: "50% 50%",
    title: "Các đời vua",
    badge: "Triều đại",
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
    badge: "Khảo cổ",
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
    href: "/van-hoa/dan-gian/",
    live: true,
    links: postLinks("Dân gian"),
  },
  {
    slug: "thien-van-mua-mang",
    imagePosition: "50% 50%",
    title: "Thiên văn & mùa màng",
    badge: "Thiên văn",
    image: `${IMG}/thien-van-mua-mang-480.webp`,
    imageAlt: "Các pha của mặt trăng trên cánh đồng lúa lúc hoàng hôn",
    description: "Trăng, tiết khí và nhịp mùa màng: vì sao người xưa làm lịch theo trời.",
    href: ECLIPSE_LIST_PATH,
    live: ECLIPSES.length > 0,
    links: postLinks("Thiên văn"),
  },
  {
    slug: "le-hoi-dong-ho",
    imagePosition: "35% 50%",
    title: "Lễ hội & dòng họ",
    badge: "Lễ hội",
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
    badge: "Học tập",
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
export const GREEN_BADGES: readonly string[] = ["Khảo cổ", "Thiên văn", "Học tập"];

/** Bài mới: lấy từ bài viết thật; rỗng thì ẩn cả mục. */
export interface NewPost {
  image?: string;
  title: string;
  href: string;
  badge: string;
  date: string;
}
export const NEW_POSTS: readonly NewPost[] = POSTS.filter((p) => !isTroChoi(p.slug)).map((p) => ({
  image: p.heroImage?.replace(/.webp$/, "-480.webp"),
  title: p.title,
  href: `/van-hoa/bai-viet/${p.slug}/`,
  badge: p.category ?? "Dân gian",
  date: `Cập nhật ${p.updatedAt.split("-").reverse().join("/")}`,
}));

/** Ảnh ngang con giáp: phía có con vật; chữ đặt ở phía trống còn lại. */
export const CHI_HERO_ANIMAL_SIDE: Record<string, "left" | "right"> = {
  ty: "left", suu: "right", dan: "left", mao: "right", thin: "left", "ty-ran": "right",
  ngo: "left", mui: "right", than: "left", dau: "right", tuat: "left", hoi: "right",
};

export const NGU_HANH_ICON: Record<string, string> = { Kim: "kim", Mộc: "moc", Thủy: "thuy", Hỏa: "hoa", Thổ: "tho" };
