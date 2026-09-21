import { jdFromDate, jdToDate } from "@licham/core";
import { PREBUILD_YEARS_AROUND_NOW, isSupportedYear } from "./config";
import { dayHref, monthHref } from "./urls";

const slugOf = (href: string, prefix: string) => href.slice(prefix.length, -1);

function prebuildYears(currentYear: number): number[] {
  const years: number[] = [];
  for (let y = currentYear - PREBUILD_YEARS_AROUND_NOW; y <= currentYear + PREBUILD_YEARS_AROUND_NOW; y++) {
    if (isSupportedYear(y)) years.push(y);
  }
  return years;
}

/** Slug các ngày dựng sẵn lúc build: năm hiện tại ±1. Mọi ngày khác dựng on-demand. */
export function prebuildDaySlugs(currentYear: number): string[] {
  return prebuildYears(currentYear).flatMap((y) => {
    const slugs: string[] = [];
    for (let jd = jdFromDate(1, 1, y); jd <= jdFromDate(31, 12, y); jd++) slugs.push(slugOf(dayHref(jdToDate(jd)), "/ngay/"));
    return slugs;
  });
}

export function prebuildMonthSlugs(currentYear: number): string[] {
  return prebuildYears(currentYear).flatMap((y) => Array.from({ length: 12 }, (_, i) => slugOf(monthHref(i + 1, y), "/thang/")));
}
