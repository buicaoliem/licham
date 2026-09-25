/** Đường dẫn các trang con /van-hoa/ để đưa vào sitemap khi VAN_HOA_PUBLIC = true. Chỉ dùng import tương đối (script sitemap chạy ngoài Next). */
import { ALL_CAN_CHI, canChiSlug } from "../tuoi";
import { BAI_VIET } from "./data/bai-viet";
import { DAN_GIAN } from "./data/dan-gian";
import { NHAN_VAT } from "./data/nhan-vat";
import { SU_KIEN } from "./data/su-kien";

export function vanHoaSubPaths(): string[] {
  return [
    "/van-hoa/nhan-vat/",
    "/van-hoa/su-kien/",
    "/van-hoa/dan-gian/",
    ...NHAN_VAT.map((x) => `/van-hoa/nhan-vat/${x.slug}/`),
    ...SU_KIEN.map((x) => `/van-hoa/su-kien/${x.slug}/`),
    ...DAN_GIAN.map((x) => `/van-hoa/dan-gian/${x.slug}/`),
    ...BAI_VIET.map((x) => `/van-hoa/bai-viet/${x.slug}/`),
    ...ALL_CAN_CHI.map((c) => `/van-hoa/nam/${canChiSlug(c)}/`),
  ];
}
