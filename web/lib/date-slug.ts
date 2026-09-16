import { type SolarDate, isValidSolarDate } from "@licham/core";
import { pad2 } from "@/lib/format";

/** "16-09-2026" — the URL slug format for /ngay/[slug]. */
export function dateToSlug(d: SolarDate): string {
  return `${pad2(d.day)}-${pad2(d.month)}-${d.year}`;
}

export function slugToDate(slug: string): SolarDate | null {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(slug);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (!isValidSolarDate(day, month, year)) return null;
  return { day, month, year };
}
