/** Đường dẫn các trang con /van-hoa/ để đưa vào sitemap khi VAN_HOA_PUBLIC = true. Chỉ dùng import tương đối (script sitemap chạy ngoài Next). */
import { ALL_CAN_CHI, canChiSlug } from "../tuoi";
import { BAI_VIET } from "./data/bai-viet";
import { ECLIPSES, ECLIPSE_LIST_PATH, eclipsePath } from "./eclipses";
import { DAN_GIAN } from "./data/dan-gian";
import { NAM_SU_KIEN } from "./data/nam-su-kien";
import { NHAN_VAT } from "./data/nhan-vat";
import { SU_KIEN } from "./data/su-kien";
import { eventsOfCanChi } from "./logic";
import { FIXTURE_SLUG } from "./types";

export interface VanHoaPath {
  path: string;
  /** Ngày cập nhật nội dung (ISO yyyy-mm-dd) → <lastmod> của sitemap; thiếu thì dùng thời điểm build. */
  lastmod?: string;
}

const latest = (dates: readonly string[]) => [...dates].sort().pop();

/** Script sitemap chạy ngoài Next (NODE_ENV không phải "production") nên danh sách còn fixture — luôn loại trang fixture. */
export function vanHoaSubPathEntries(): VanHoaPath[] {
  const entries: VanHoaPath[] = [
    { path: "/van-hoa/nhan-vat/", lastmod: latest(NHAN_VAT.map((x) => x.updatedAt)) },
    { path: "/van-hoa/su-kien/", lastmod: latest([...SU_KIEN, ...NAM_SU_KIEN].map((x) => x.updatedAt)) },
    { path: "/van-hoa/dan-gian/" },
    { path: ECLIPSE_LIST_PATH },
    ...ECLIPSES.map((e) => ({ path: eclipsePath(e) })),
    ...NHAN_VAT.map((x) => ({ path: `/van-hoa/nhan-vat/${x.slug}/`, lastmod: x.updatedAt })),
    ...SU_KIEN.map((x) => ({ path: `/van-hoa/su-kien/${x.slug}/`, lastmod: x.updatedAt })),
    ...DAN_GIAN.map((x) => ({ path: `/van-hoa/dan-gian/${x.slug}/`, lastmod: x.updatedAt })),
    ...BAI_VIET.map((x) => ({ path: `/van-hoa/bai-viet/${x.slug}/`, lastmod: x.updatedAt })),
    ...ALL_CAN_CHI.map((c) => ({ path: `/van-hoa/nam/${canChiSlug(c)}/`, lastmod: latest(eventsOfCanChi(c, NAM_SU_KIEN).map((e) => e.updatedAt)) })),
  ];
  return entries.filter((x) => !x.path.includes(`/${FIXTURE_SLUG}/`));
}

export function vanHoaSubPaths(): string[] {
  return vanHoaSubPathEntries().map((x) => x.path);
}
