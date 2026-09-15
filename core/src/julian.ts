/** Gregorian civil date (proleptic Julian before 1582-10-15, never reached in 1900–2100). */
export interface SolarDate {
  day: number;
  month: number;
  year: number;
}

/** Julian Day Number of a civil date (integer, day starting at local noon). */
export function jdFromDate(day: number, month: number, year: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  let jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  if (jd < 2299161) {
    jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

/** Inverse of {@link jdFromDate}. */
export function jdToDate(jd: number): SolarDate {
  let b: number;
  let c: number;
  if (jd > 2299160) {
    const a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: b * 100 + d - 4800 + Math.floor(m / 10),
  };
}

export function isValidSolarDate(day: number, month: number, year: number): boolean {
  if (![day, month, year].every(Number.isInteger)) return false;
  if (month < 1 || month > 12 || day < 1) return false;
  const back = jdToDate(jdFromDate(day, month, year));
  return back.day === day && back.month === month && back.year === year;
}

/** Day of week, 0 = Sunday … 6 = Saturday. */
export function dayOfWeek(jd: number): number {
  return (jd + 1) % 7;
}
