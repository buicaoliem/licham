/** Vietnamese calendar-facing formatting helpers, Monday-first week. */

/** Index 0 = Chủ nhật, matching `dayOfWeek()` from @licham/core. Title case; CSS uppercases where needed. */
export const WEEKDAY_LONG = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
] as const;

/** Monday-first full labels for the month grid header. */
export const WEEKDAY_FULL_MON_FIRST = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
] as const;

/** Vietnamese month names in words, index 0 = tháng Một. */
export const MONTH_WORD = [
  "Một",
  "Hai",
  "Ba",
  "Tư",
  "Năm",
  "Sáu",
  "Bảy",
  "Tám",
  "Chín",
  "Mười",
  "Mười Một",
  "Mười Hai",
] as const;

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
