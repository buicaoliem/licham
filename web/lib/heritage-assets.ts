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
  heroLichThang: { path: "/heritage/hero/lich-thang.webp", spec: "Hero lịch tháng (trăng khuyết, hoa, ink-wash), dùng chung mọi tháng, ~1200×460, mờ dần sang trái" },
  heroLichNam: { path: "/heritage/hero/lich-nam.webp", spec: "Hero lịch năm (vòng thời gian, mặt trời đỏ, ink-wash), ~1200×460, mờ dần sang trái" },
  heroLichNgay: { path: "/heritage/hero/lich-ngay.webp", spec: "Hero chi tiết ngày (tờ lịch bóc, mặt trời – trăng, ink-wash), dùng quanh năm, ~1200×460, nội dung dồn phải" },
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

/**
 * Tranh con giáp cần thay. Batch B (2026-09-24) đã thay sáu tranh riêng (Sửu, Dần, Mão, Thìn, Tỵ, Dậu, 1024×1024)
 * và bỏ clip-path che bleed; Review-31 thay nốt sáu tranh còn lại (Tý, Ngọ, Mùi, Thân, Tuất, Hợi) cùng bộ 1024×1024.
 */
export const CON_GIAP_CAN_THAY: readonly string[] = [];

export function conGiapImagePath(chiSlug: string): string {
  return `/heritage/con-giap/${chiSlug}.webp`;
}

/**
 * Tranh cho trang lễ: ưu tiên tranh riêng /heritage/le/<slug>.webp (Batch A: 9 lễ, Batch D: 8 lễ, Review-33: 13 lễ, Independent-12: 6 lễ, Review-31: 14 lễ; Giỗ Tổ Hùng Vương đang giữ lại
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

/** Lễ có tranh riêng tái hiện sự kiện/địa danh lịch sử (hoặc cách điệu) — trang lễ ghi chú thích "Tranh minh họa". */
export const LE_TRANH_LICH_SU: ReadonlySet<string> = new Set([
  "chien-thang-dien-bien-phu",
  "cach-mang-thang-tam",
  "ngay-giai-phong-mien-nam",
  // Phase 8B cuối: tranh cách điệu kiến trúc/cảnh quan (Đền Hùng, Ô Quan Chưởng, Hoa Lư, hồ Hoàn Kiếm, cờ Đoàn).
  "gio-to-hung-vuong",
  "thanh-lap-doan",
  "giai-phong-thu-do",
  "le-hoi-hoa-lu",
  "gio-le-loi",
]);

/** Slug tiết khí từ tên ("Kinh trập" → "kinh-trap", "Đông chí" → "dong-chi"). */
export function tietKhiSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

/** Tranh tiết khí (1448×1086, 4:3) nếu đã có trong public/heritage/tiet-khi/. */
export function tietKhiImage(name: string): string | null {
  return heritageFile(`/heritage/tiet-khi/${tietKhiSlug(name)}.webp`);
}

/** Mùa của tiết theo kinh độ Mặt Trời: Lập xuân 315° mở mùa xuân, mỗi mùa 6 tiết (90°). */
export function tietKhiMua(longitude: number): "xuan" | "ha" | "thu" | "dong" {
  const k = (((longitude - 315) % 360) + 360) % 360;
  return (["xuan", "ha", "thu", "dong"] as const)[Math.floor(k / 90)]!;
}

export function leImagePath(slug: string): string {
  return `/heritage/le/${slug}.webp`;
}

export function leImage(slug: string): string | null {
  const chung = LE_TRANH_CHUNG[slug];
  return heritageFile(leImagePath(slug)) ?? (chung ? heritageFile(chung) : null);
}
