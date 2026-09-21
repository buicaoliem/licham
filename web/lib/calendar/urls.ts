import { type SolarDate, isValidSolarDate } from "@licham/core";

/** URL chuẩn của lịch ngày, tháng, năm — nguồn duy nhất, trang nào cũng phải dùng các hàm này. */
function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function dayHref(d: SolarDate): string {
  return `/ngay/${d.year}-${pad2(d.month)}-${pad2(d.day)}/`;
}

export function monthHref(month: number, year: number): string {
  return `/thang/${year}-${pad2(month)}/`;
}

export function yearHref(year: number): string {
  return `/nam/${year}/`;
}

/** "2026-09-21" → ngày hợp lệ, hoặc null (kể cả 2026-02-31). */
export function parseDaySlug(slug: string): SolarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(slug);
  if (!m) return null;
  const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
  return isValidSolarDate(day, month, year) ? { day, month, year } : null;
}

export function parseMonthSlug(slug: string): { month: number; year: number } | null {
  const m = /^(\d{4})-(\d{2})$/.exec(slug);
  if (!m) return null;
  const [year, month] = [Number(m[1]), Number(m[2])];
  return month >= 1 && month <= 12 ? { month, year } : null;
}

export function parseYearSlug(slug: string): number | null {
  return /^\d{4}$/.test(slug) ? Number(slug) : null;
}
