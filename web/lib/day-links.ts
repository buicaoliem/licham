import type { DayInfo } from "@licham/core";
import { vanKhanBySlug } from "@/lib/van-khan";

export const NGAY_VIEC_LINKS = [
  { slug: "cuoi-hoi", label: "cưới hỏi" },
  { slug: "khai-truong", label: "khai trương" },
  { slug: "dong-tho", label: "động thổ" },
] as const;

/** Bài khấn khi đúng rằm / mùng một hoặc lễ âm cố định. */
export function vanKhanChoNgay(info: DayInfo): { slug: string; ten: string }[] {
  const out: { slug: string; ten: string }[] = [];
  const { day, month, isLeapMonth } = info.lunar;
  const push = (slug: string) => {
    const bai = vanKhanBySlug(slug);
    if (bai && !out.some((x) => x.slug === slug)) out.push({ slug, ten: bai.ten });
  };

  if (!isLeapMonth && day === 1 && month === 1) push("mung-mot-tet");
  if (!isLeapMonth && day === 15 && month === 1) push("ram-thang-gieng");
  if (!isLeapMonth && day === 15 && month === 7) push("ram-thang-bay");
  if (!isLeapMonth && day === 15 && month === 8) push("ram-thang-tam");
  if (!isLeapMonth && day === 15 && month === 10) push("ram-thang-muoi");
  if (!isLeapMonth && day === 15 && month === 12) push("cung-ram-thang-chap");
  if (!isLeapMonth && day === 23 && month === 12) push("ong-cong-ong-tao");
  if (!isLeapMonth && day === 5 && month === 5) push("tet-doan-ngo");
  if (!isLeapMonth && day === 10 && month === 3) push("gio-to-hung-vuong");
  if (!isLeapMonth && day === 10 && month === 1) push("via-than-tai");

  if (day === 1 || day === 15) push("mung-mot-ngay-ram");

  return out;
}
