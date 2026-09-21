import { type SolarDate, MAX_YEAR, MIN_YEAR, dayOfWeek, isValidSolarDate, jdFromDate, jdToDate } from "@licham/core";
import { calendarDiff } from "@/lib/tinh-tuoi";

export { MAX_YEAR as TOOL_MAX_YEAR, MIN_YEAR as TOOL_MIN_YEAR };

/** "2026-09-21" → ngày hợp lệ trong khoảng lõi lịch hỗ trợ (1900–2100), ngược lại null. */
export function parseIsoDate(raw: string | undefined): SolarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw ?? "");
  if (!m) return null;
  const d = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
  if (d.year < MIN_YEAR || d.year > MAX_YEAR) return null;
  return isValidSolarDate(d.day, d.month, d.year) ? d : null;
}

/** Số nguyên trong [min, max], chỉ chấp nhận chuỗi thuần chữ số. */
export function parseIntParam(raw: string | undefined, min: number, max: number): number | null {
  if (!raw || !/^\d{1,7}$/.test(raw)) return null;
  const n = Number(raw);
  return n >= min && n <= max ? n : null;
}

export function toIso(d: SolarDate): string {
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

export function formatDmy(d: SolarDate): string {
  return `${String(d.day).padStart(2, "0")}/${String(d.month).padStart(2, "0")}/${d.year}`;
}

const serial = (d: SolarDate) => jdFromDate(d.day, d.month, d.year);

/** Số ngày từ a đến b (b − a), âm nếu b trước a. Không tính ngày bắt đầu. */
export function daysBetween(a: SolarDate, b: SolarDate): number {
  return serial(b) - serial(a);
}

/** a + n ngày (n có thể âm); null nếu kết quả ngoài 1900–2100. */
export function addDays(a: SolarDate, n: number): SolarDate | null {
  const d = jdToDate(serial(a) + n);
  return d.year < MIN_YEAR || d.year > MAX_YEAR ? null : d;
}

/** Số ngày thứ Hai–thứ Sáu trong khoảng (a, b], tức không tính ngày đầu, có tính ngày cuối. Không trừ ngày lễ. */
export function weekdaysBetween(a: SolarDate, b: SolarDate): number {
  const [from, to] = serial(a) <= serial(b) ? [serial(a), serial(b)] : [serial(b), serial(a)];
  const n = to - from;
  let count = Math.floor(n / 7) * 5;
  for (let i = 1; i <= n % 7; i++) {
    const dow = dayOfWeek(from + i);
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
}

export function splitWeeks(days: number): { weeks: number; days: number } {
  const abs = Math.abs(days);
  return { weeks: Math.floor(abs / 7), days: abs % 7 };
}

/** Khoảng cách theo lịch (năm, tháng, ngày) giữa hai ngày, không phân biệt thứ tự. */
export function calendarSpan(a: SolarDate, b: SolarDate): { years: number; months: number; days: number } {
  return serial(a) <= serial(b) ? calendarDiff(a, b) : calendarDiff(b, a);
}

/** "N năm M tháng D ngày", bỏ phần bằng 0; "0 ngày" nếu cả ba bằng 0. */
export function spanLabel(s: { years: number; months: number; days: number }): string {
  const parts = [s.years && `${s.years} năm`, s.months && `${s.months} tháng`, s.days && `${s.days} ngày`].filter(Boolean);
  return parts.length ? parts.join(" ") : "0 ngày";
}
