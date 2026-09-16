/** "lich-thang-1-2026" — the URL slug for the month calendar page. */
export function monthToSlug(month: number, year: number): string {
  return `lich-thang-${month}-${year}`;
}

export function slugToMonth(slug: string): { month: number; year: number } | null {
  const m = /^lich-thang-(\d{1,2})-(\d{4})$/.exec(slug);
  if (!m) return null;
  const month = Number(m[1]);
  const year = Number(m[2]);
  if (month < 1 || month > 12) return null;
  return { month, year };
}
