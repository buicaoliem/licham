/** Trò chơi dân gian: 20 bài trong BAI_VIET, trang mục /van-hoa/tro-choi-dan-gian/. Chỉ dùng import tương đối. */
import { BAI_VIET } from "./data/bai-viet";
import { FIXTURE_SLUG, type BaiViet } from "./types";

export const TRO_CHOI_PATH = "/van-hoa/tro-choi-dan-gian/";
export const troChoiPath = (slug: string) => `/van-hoa/bai-viet/${slug}/`;

export const TRO_CHOI_SLUGS = [
  "keo-co",
  "danh-phet",
  "dau-vat-dan-toc",
  "danh-du",
  "co-nguoi",
  "nem-con",
  "thoi-com-thi",
  "di-ca-kheo",
  "tha-dieu",
  "phao-dat",
  "o-an-quan",
  "choi-chuyen",
  "choi-khang",
  "danh-dao",
  "danh-cu",
  "rong-ran-len-may",
  "bit-mat-bat-de",
  "nhay-lo-co",
  "nhay-bao-bo",
  "bat-chach-trong-chum",
] as const;

const SLUG_SET = new Set<string>(TRO_CHOI_SLUGS);

/** Tết / hội làng — khác nhóm ngày thường trên trang mục. */
const HOI_LE = new Set([
  "keo-co",
  "danh-phet",
  "dau-vat-dan-toc",
  "danh-du",
  "co-nguoi",
  "nem-con",
  "thoi-com-thi",
  "di-ca-kheo",
  "tha-dieu",
  "phao-dat",
  "danh-cu",
  "bat-chach-trong-chum",
]);

export const TRO_CHOI_GROUPS = [
  { key: "hoi-le", title: "Tết và hội làng" },
  { key: "ngay-thuong", title: "Ngày thường" },
] as const;

export function isTroChoi(slug: string): boolean {
  return SLUG_SET.has(slug);
}

export function troChoiGroup(slug: string): "hoi-le" | "ngay-thuong" {
  return HOI_LE.has(slug) ? "hoi-le" : "ngay-thuong";
}

export function troChoiCardImage(post: BaiViet): string | undefined {
  return post.heroImage?.replace("-hero.webp", "-the.webp") ?? post.heroImage;
}

export const TRO_CHOI: readonly BaiViet[] = BAI_VIET.filter((p) => p.slug !== FIXTURE_SLUG && isTroChoi(p.slug));
