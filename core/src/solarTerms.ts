/**
 * 24 tiết khí, each starting when the apparent solar longitude reaches a
 * multiple of 15°. Index 0 = Xuân phân (0°), increasing with longitude.
 */
import {
  apparentSolarLongitude,
  jdFromUnixMs,
  jdeOfSolarLongitude,
  ttToUt,
  unixMsFromJd,
  utToTt,
} from "./astronomy";
import { jdFromDate } from "./julian";
import { VN_TIME_ZONE } from "./lunar";

export const SOLAR_TERM_NAMES = [
  "Xuân phân",
  "Thanh minh",
  "Cốc vũ",
  "Lập hạ",
  "Tiểu mãn",
  "Mang chủng",
  "Hạ chí",
  "Tiểu thử",
  "Đại thử",
  "Lập thu",
  "Xử thử",
  "Bạch lộ",
  "Thu phân",
  "Hàn lộ",
  "Sương giáng",
  "Lập đông",
  "Tiểu tuyết",
  "Đại tuyết",
  "Đông chí",
  "Tiểu hàn",
  "Đại hàn",
  "Lập xuân",
  "Vũ thủy",
  "Kinh trập",
] as const;

export type SolarTermName = (typeof SOLAR_TERM_NAMES)[number];

export interface SolarTermInfo {
  /** 0..23, equal to longitude / 15 (0 = Xuân phân). */
  index: number;
  name: SolarTermName;
  /** Solar longitude in degrees at which the term starts. */
  longitude: number;
  /** Instant the term starts. */
  start: Date;
  /** Instant the term ends (= start of the next term). */
  end: Date;
}

const DAYS_PER_DEGREE = 365.242189 / 360;

function termName(index: number): SolarTermName {
  return SOLAR_TERM_NAMES[((index % 24) + 24) % 24] as SolarTermName;
}

function instantOfLongitude(longitude: number, jdeGuess: number): Date {
  return new Date(unixMsFromJd(ttToUt(jdeOfSolarLongitude(longitude, jdeGuess))));
}

/** Apparent solar longitude (degrees) at an instant. */
export function solarLongitudeAt(date: Date): number {
  return apparentSolarLongitude(utToTt(jdFromUnixMs(date.getTime())));
}

/** The solar term in effect at the given instant. */
export function getSolarTerm(date: Date): SolarTermInfo {
  const ms = date.getTime();
  if (Number.isNaN(ms)) throw new RangeError("Invalid Date");
  const jde = utToTt(jdFromUnixMs(ms));
  const lambda = apparentSolarLongitude(jde);
  const index = Math.floor(lambda / 15) % 24;
  const startLon = index * 15;
  const endLon = (index + 1) * 15;
  let start = instantOfLongitude(startLon, jde - (lambda - startLon) * DAYS_PER_DEGREE);
  let end = instantOfLongitude(endLon % 360, jde + (endLon - lambda) * DAYS_PER_DEGREE);
  // Guard against floating-point disagreement right at a boundary.
  if (start.getTime() > ms) start = new Date(ms);
  if (end.getTime() <= ms) end = new Date(ms + 1);
  return { index, name: termName(index), longitude: startLon, start, end };
}

/**
 * All 24 terms whose start falls in the given Gregorian year (Vietnam time),
 * in chronological order: Tiểu hàn … Đông chí.
 */
export function getSolarTermsOfYear(year: number): SolarTermInfo[] {
  // 00:00 on 6 January, Vietnam time, as JD (UT); Tiểu hàn (285°) falls on 5–7 Jan.
  const jan6 = jdFromDate(6, 1, year) - 0.5 - VN_TIME_ZONE / 24;
  const result: SolarTermInfo[] = [];
  for (let k = 0; k < 24; k++) {
    const longitude = (285 + 15 * k) % 360;
    const index = longitude / 15;
    const guess = utToTt(jan6) + k * 15 * DAYS_PER_DEGREE;
    const start = instantOfLongitude(longitude, guess);
    const end = instantOfLongitude((longitude + 15) % 360, guess + 15 * DAYS_PER_DEGREE);
    result.push({ index, name: termName(index), longitude, start, end });
  }
  return result;
}
