/** Vietnamese calendar-facing formatting helpers, Monday-first week. */

/** Index 0 = Chủ nhật, matching `dayOfWeek()` from @licham/core. */
export const WEEKDAY_LONG = [
  "CHỦ NHẬT",
  "THỨ HAI",
  "THỨ BA",
  "THỨ TƯ",
  "THỨ NĂM",
  "THỨ SÁU",
  "THỨ BẢY",
] as const;

/** Monday-first short labels for the month grid header. */
export const WEEKDAY_SHORT_MON_FIRST = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"] as const;

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Number of blank cells before day 1 in a Monday-first grid, given `dayOfWeek()` (0 = Sunday) of day 1. */
export function leadingBlanks(dowOfFirst: number): number {
  return (dowOfFirst + 6) % 7;
}

export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}
