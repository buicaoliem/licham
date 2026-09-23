import { HERITAGE_FILES } from "./heritage-assets.generated";

/**
 * Danh mục asset minh họa Contemporary Heritage. Đường dẫn tính từ /public.
 * Asset chưa có file thì heritageAsset() trả null và khối minh họa được ẩn — không dùng hình thay thế.
 * Bật NEXT_PUBLIC_CH_PLACEHOLDER=1 để hiện khung đánh dấu vị trí asset khi duyệt bố cục.
 */
export const HERITAGE_SLOTS = {
  logoSeal: { path: "/heritage/brand/logo-seal.svg", spec: "Logo dấu triện đỏ son, SVG vuông" },
  sideLeft: { path: "/heritage/decor/side-left.webp", spec: "Tranh lề trái (đình, tùng), ~480×1600, nền trong suốt" },
  sideRight: { path: "/heritage/decor/side-right.webp", spec: "Tranh lề phải (núi, sen, hạc), ~480×1600, nền trong suốt" },
  heroVanKhan: { path: "/heritage/hero/van-khan.webp", spec: "Hero danh mục văn khấn (sen, núi), ~1200×460, mờ dần sang trái" },
  heroTuoi: { path: "/heritage/hero/tuoi.webp", spec: "Hero danh mục Xem tuổi (núi, chùa), ~1200×460, mờ dần sang trái" },
  heroHome: { path: "/heritage/hero/home.webp", spec: "Hero trang chủ (núi, chùa, mặt trời đỏ, sen), ~1200×460, nửa trái để trống cho chữ" },
  heroLe: { path: "/heritage/hero/le.webp", spec: "Hero danh mục Ngày lễ & tiết khí (đèn lồng, sen, núi), ~1200×460, mờ dần sang trái" },
  scriptureCorner: { path: "/heritage/decor/scripture-corner.svg", spec: "Họa tiết góc khung bài khấn, SVG" },
} as const;

export type HeritageSlot = keyof typeof HERITAGE_SLOTS;

const AVAILABLE = new Set(HERITAGE_FILES);

export const PLACEHOLDER_MODE = process.env.NEXT_PUBLIC_CH_PLACEHOLDER === "1";

export function heritageFile(path: string): string | null {
  return AVAILABLE.has(path) ? path : null;
}

export function heritageSlot(slot: HeritageSlot): string | null {
  return heritageFile(HERITAGE_SLOTS[slot].path);
}

const NHOM_SLUG: Record<string, string> = {
  "Trong nhà": "trong-nha",
  "Lễ tết": "le-tet",
  "Việc lớn": "viec-lon",
  "Cầu an": "cau-an",
  "Đi lễ": "di-le",
};

/** Ảnh riêng của bài (4:3) — nếu chưa có thì dùng ảnh chung của nhóm. */
export function vanKhanImagePaths(slug: string, nhom: string): { own: string; nhom: string } {
  return { own: `/heritage/van-khan/${slug}.webp`, nhom: `/heritage/van-khan/nhom/${NHOM_SLUG[nhom] ?? "khac"}.webp` };
}

export function vanKhanImage(slug: string, nhom: string): string | null {
  const p = vanKhanImagePaths(slug, nhom);
  return heritageFile(p.own) ?? heritageFile(p.nhom);
}

/**
 * Tranh con giáp cần thay. Batch B (2026-09-24) đã thay sáu tranh riêng (Sửu, Dần, Mão, Thìn, Tỵ, Dậu, 1024×1024)
 * và bỏ clip-path che bleed; sáu tranh còn lại (Tý, Ngọ, Mùi, Thân, Tuất, Hợi) vẫn là bản tách 800×800, sạch mép, chưa cần thay gấp.
 */
export const CON_GIAP_CAN_THAY: readonly string[] = [];

export function conGiapImagePath(chiSlug: string): string {
  return `/heritage/con-giap/${chiSlug}.webp`;
}

/**
 * Tranh cho trang lễ: ưu tiên tranh riêng /heritage/le/<slug>.webp (Batch A: 9 lễ, Batch D: 8 lễ; Giỗ Tổ Hùng Vương đang giữ lại
 * chờ đối chiếu kiến trúc Đền Hùng nên vẫn dùng tranh chung); nếu chưa có thì
 * dùng lại tranh heritage sẵn có khi cảnh trong tranh đúng với lễ (bàn thờ ngày Tết, sen, mâm cúng rằm,
 * đình chùa, bàn thờ trong nhà). Lễ không có tranh phù hợp thì trả null — không dùng tranh thay thế.
 */
const LE_TRANH_CHUNG: Record<string, string> = {
  "tet-nguyen-dan": "/heritage/van-khan/nhom/le-tet.webp",
  "giao-thua": "/heritage/van-khan/nhom/le-tet.webp",
  "phat-dan": "/heritage/van-khan/nhom/cau-an.webp",
  "via-quan-am": "/heritage/van-khan/nhom/cau-an.webp",
  "vu-lan": "/heritage/van-khan/nhom/cau-an.webp",
  "ram-thang-gieng": "/heritage/van-khan/mung-mot-ngay-ram.webp",
  "tet-trung-thu": "/heritage/van-khan/mung-mot-ngay-ram.webp",
  "tet-ha-nguyen": "/heritage/van-khan/mung-mot-ngay-ram.webp",
  "ram-thang-chap": "/heritage/van-khan/mung-mot-ngay-ram.webp",
  "gio-to-hung-vuong": "/heritage/van-khan/nhom/di-le.webp",
  "via-than-tai": "/heritage/van-khan/nhom/trong-nha.webp",
  "ong-cong-ong-tao": "/heritage/van-khan/nhom/trong-nha.webp",
};

export function leImagePath(slug: string): string {
  return `/heritage/le/${slug}.webp`;
}

export function leImage(slug: string): string | null {
  const chung = LE_TRANH_CHUNG[slug];
  return heritageFile(leImagePath(slug)) ?? (chung ? heritageFile(chung) : null);
}
