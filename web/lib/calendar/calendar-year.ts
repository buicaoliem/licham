import {
  type CanChi,
  type SolarDate,
  canChiOfYear,
  getSolarTermsOfYear,
  jdFromDate,
  lunarToSolar,
  vietnamDateOf,
} from "@licham/core";
import { LE_LIST } from "@/lib/le";
import { occurrenceInYear } from "@/lib/le-date-engine";
import { memoize } from "./cache";
import { isSupportedYear } from "./config";

export interface CalendarYear {
  year: number;
  /** Năm âm trùng với năm dương này (Tết Nguyên đán nằm trong năm dương này). */
  canChiYear: CanChi;
  tet: SolarDate;
  /** Tháng âm nhuận của năm âm này, null nếu không nhuận. */
  leapMonth: number | null;
  solarTerms: { name: string; date: SolarDate }[];
  holidays: { slug: string; name: string; date: SolarDate }[];
}

function byDate(a: { date: SolarDate }, b: { date: SolarDate }): number {
  return jdFromDate(a.date.day, a.date.month, a.date.year) - jdFromDate(b.date.day, b.date.month, b.date.year);
}

function findLeapMonth(lunarYear: number): number | null {
  for (let month = 1; month <= 12; month++) {
    try {
      lunarToSolar(1, month, lunarYear, true);
      return month;
    } catch {
      // không nhuận tháng này
    }
  }
  return null;
}

function computeCalendarYear(year: number): CalendarYear {
  if (!isSupportedYear(year)) throw new RangeError(`Năm ngoài khoảng hỗ trợ: ${year}`);
  return {
    year,
    canChiYear: canChiOfYear(year),
    tet: lunarToSolar(1, 1, year, false),
    leapMonth: findLeapMonth(year),
    solarTerms: getSolarTermsOfYear(year)
      .map((t) => ({ name: t.name as string, date: vietnamDateOf(t.start) }))
      .sort(byDate),
    holidays: LE_LIST.filter((p) => p.nghiLe)
      .map((p) => ({ slug: p.slug, name: p.ten, date: occurrenceInYear(p, year) }))
      .sort(byDate),
  };
}

/** Cache theo năm; lỗi ngoài khoảng hỗ trợ không được cache. */
export const getCalendarYear = memoize(computeCalendarYear, (y) => String(y), 128);
