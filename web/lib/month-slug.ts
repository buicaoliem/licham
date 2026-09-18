/** "lich-thang-1-2026" — the URL slug for the month calendar page (canonical, no leading zero). */
export function monthToSlug(month: number, year: number): string {
  return `lich-thang-${month}-${year}`;
}

/** "lich-thang-09-2026" — the zero-padded alias some users/bots guess; redirects to the canonical slug. */
export function paddedMonthSlug(month: number, year: number): string {
  return `lich-thang-${String(month).padStart(2, "0")}-${year}`;
}

export function slugToMonth(slug: string): { month: number; year: number } | null {
  const m = /^lich-thang-(\d{1,2})-(\d{4})$/.exec(slug);
  if (!m) return null;
  const month = Number(m[1]);
  const year = Number(m[2]);
  if (month < 1 || month > 12) return null;
  return { month, year };
}
