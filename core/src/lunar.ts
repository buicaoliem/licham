/**
 * Vietnamese lunisolar calendar conversion.
 *
 * Direct TypeScript port of Hồ Ngọc Đức's algorithm ("Âm lịch Việt Nam",
 * 2004, public domain). Kept deliberately faithful to the original — including
 * its low-precision sun longitude and new-moon series — so that results match
 * the published Vietnamese calendar tables that were produced with it.
 * Time zone defaults to UTC+7 (105° E); pass `tz` for calendars computed for another meridian.
 */
import { type SolarDate, isValidSolarDate, jdFromDate, jdToDate } from "./julian";

export const VN_TIME_ZONE = 7;

/** Time zone of the Vietnamese lunar calendar for a given year: UTC+8 before 1968, UTC+7 from 1968. */
export function vnTimeZoneOfYear(year: number): number {
  return year < 1968 ? 8 : VN_TIME_ZONE;
}

export const MIN_YEAR = 1900;
export const MAX_YEAR = 2100;
const MIN_JD = jdFromDate(1, 1, MIN_YEAR);
const MAX_JD = jdFromDate(31, 12, MAX_YEAR);

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeapMonth: boolean;
  /** 29 (tháng thiếu) or 30 (tháng đủ). */
  monthLength: number;
}

const SYNODIC_MONTH = 29.530588853;
const EPOCH_NEW_MOON = 2415021.076998695;

/** Julian date (with fraction) of the k-th new moon after 1900-01-01. */
function newMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let c1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  c1 = c1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  c1 = c1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  c1 = c1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  c1 = c1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  c1 = c1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  c1 = c1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltaT =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return jd1 + c1 - deltaT;
}

/** Sun longitude in radians [0, 2π) at the given Julian date (low precision). */
function sunLongitude(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return L;
}

function getNewMoonDay(k: number, tz: number): number {
  return Math.floor(newMoon(k) + 0.5 + tz / 24);
}

/** Sun longitude sector (0..11, 30° each) at local midnight starting `dayNumber`. */
function getSunLongitudeSector(dayNumber: number, tz: number): number {
  return Math.floor((sunLongitude(dayNumber - 0.5 - tz / 24) / Math.PI) * 6);
}

/** Day number of the start of lunar month 11 (the month containing the winter solstice) of year `yy`. */
function getLunarMonth11(yy: number, tz: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / SYNODIC_MONTH);
  let nm = getNewMoonDay(k, tz);
  if (getSunLongitudeSector(nm, tz) >= 9) {
    nm = getNewMoonDay(k - 1, tz);
  }
  return nm;
}

/** Offset (in months, counted from month 11 starting at `a11`) of the leap month. */
function getLeapMonthOffset(a11: number, tz: number): number {
  const k = Math.floor((a11 - EPOCH_NEW_MOON) / SYNODIC_MONTH + 0.5);
  let last: number;
  let i = 1;
  let arc = getSunLongitudeSector(getNewMoonDay(k + i, tz), tz);
  do {
    last = arc;
    i++;
    arc = getSunLongitudeSector(getNewMoonDay(k + i, tz), tz);
  } while (arc !== last && i < 14);
  return i - 1;
}

function assertSolarInRange(jd: number): void {
  if (jd < MIN_JD || jd > MAX_JD) {
    throw new RangeError(`Date out of supported range ${MIN_YEAR}–${MAX_YEAR}`);
  }
}

/**
 * Convert a Gregorian date (Vietnam local) to the Vietnamese lunar date.
 * `tz`: time zone the calendar is computed for (default UTC+7); see {@link vnTimeZoneOfYear} for historical dates.
 */
export function solarToLunar(day: number, month: number, year: number, tz: number = VN_TIME_ZONE): LunarDate {
  if (!isValidSolarDate(day, month, year)) {
    throw new RangeError(`Invalid solar date ${day}/${month}/${year}`);
  }
  const dayNumber = jdFromDate(day, month, year);
  assertSolarInRange(dayNumber);

  // The mean-lunation estimate can be off by one (e.g. 07/05/2054, 09/04/2062, where the
  // original code yields lunar day 0), so step k until monthStart <= dayNumber < nextMonthStart.
  let k = Math.floor((dayNumber - EPOCH_NEW_MOON) / SYNODIC_MONTH) + 1;
  while (getNewMoonDay(k, tz) > dayNumber) k--;
  while (getNewMoonDay(k + 1, tz) <= dayNumber) k++;
  const monthStart = getNewMoonDay(k, tz);
  const nextMonthStart = getNewMoonDay(k + 1, tz);

  let a11 = getLunarMonth11(year, tz);
  let b11: number;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = year;
    b11 = a11;
    a11 = getLunarMonth11(year - 1, tz);
  } else {
    lunarYear = year + 1;
    b11 = getLunarMonth11(year + 1, tz);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let isLeapMonth = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, tz);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) isLeapMonth = true;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeapMonth,
    monthLength: nextMonthStart - monthStart,
  };
}

/**
 * Convert a Vietnamese lunar date to the Gregorian date.
 * Throws RangeError if the month is not leap in that year while `isLeapMonth` is set,
 * if the day exceeds the month length, or if the result falls outside 1900–2100.
 */
export function lunarToSolar(
  day: number,
  month: number,
  year: number,
  isLeapMonth: boolean,
  tz: number = VN_TIME_ZONE,
): SolarDate {
  if (![day, month, year].every(Number.isInteger) || month < 1 || month > 12 || day < 1 || day > 30) {
    throw new RangeError(`Invalid lunar date ${day}/${month}/${year}`);
  }
  let a11: number;
  let b11: number;
  if (month < 11) {
    a11 = getLunarMonth11(year - 1, tz);
    b11 = getLunarMonth11(year, tz);
  } else {
    a11 = getLunarMonth11(year, tz);
    b11 = getLunarMonth11(year + 1, tz);
  }
  const k = Math.floor(0.5 + (a11 - EPOCH_NEW_MOON) / SYNODIC_MONTH);
  let off = month - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, tz);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (isLeapMonth && month !== leapMonth) {
      throw new RangeError(`Lunar year ${year} has no leap month ${month}`);
    }
    if (isLeapMonth || off >= leapOff) off += 1;
  } else if (isLeapMonth) {
    throw new RangeError(`Lunar year ${year} has no leap month`);
  }
  const monthStart = getNewMoonDay(k + off, tz);
  const monthLength = getNewMoonDay(k + off + 1, tz) - monthStart;
  if (day > monthLength) {
    throw new RangeError(`Lunar month ${month}/${year} has only ${monthLength} days`);
  }
  const jd = monthStart + day - 1;
  assertSolarInRange(jd);
  return jdToDate(jd);
}
