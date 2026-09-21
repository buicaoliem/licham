import { MAX_YEAR, MIN_YEAR } from "@licham/core";

export interface YearRange {
  readonly start: number;
  readonly end: number;
}

/** Khoảng năm trang lịch ngày/tháng/năm phục vụ được (thu hẹp hơn 1900–2100 của lõi cho tới khi dữ liệu ổn định). */
export const SUPPORTED_RANGE: YearRange = { start: Math.max(1970, MIN_YEAR), end: Math.min(2050, MAX_YEAR) };

/** Khoảng năm được cho index và đưa vào sitemap. Ngoài khoảng này trang vẫn render nhưng noindex. Phải nằm trong SUPPORTED_RANGE. */
export const INDEX_RANGE: YearRange = { start: 2020, end: 2035 };

/** Số năm dựng sẵn quanh năm hiện tại khi build; phần còn lại dựng on-demand rồi cache (ISR). */
export const PREBUILD_YEARS_AROUND_NOW = 1;

function inRange(year: number, r: YearRange): boolean {
  return Number.isInteger(year) && year >= r.start && year <= r.end;
}

export function isSupportedYear(year: number): boolean {
  return inRange(year, SUPPORTED_RANGE);
}

export function isIndexableYear(year: number): boolean {
  return inRange(year, INDEX_RANGE) && isSupportedYear(year);
}
