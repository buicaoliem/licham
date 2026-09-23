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
 * Tranh con giáp Batch 3 là bản tách từ một bảng tranh gốc (ô gốc ~256×320, phóng lên 800×800), chưa phải bản vẽ riêng.
 * Sáu tranh sau còn sót mảnh tranh bên cạnh ở mép trái, đang được che tạm bằng clip-path trong heritage.css
 * (.cg-slot[data-cg=…]). Khi có bản sạch: thay file cùng tên rồi bỏ các dòng clip-path đó.
 */
export const CON_GIAP_CAN_THAY = ["suu", "dan", "mao", "thin", "ty-ran", "dau"] as const;

export function conGiapImagePath(chiSlug: string): string {
  return `/heritage/con-giap/${chiSlug}.webp`;
}
