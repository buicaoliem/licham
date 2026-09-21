import { type SolarDate, canChiOfDay, canChiOfYear, dayOfWeek, jdFromDate, solarToLunar } from "@licham/core";
import { WEEKDAY_LONG } from "@/lib/format";
import { memoize } from "./cache";
import { canPublishDay } from "./policy";
import { dayHref } from "./urls";

export interface DateSummary {
  date: SolarDate;
  weekday: string;
  lunar: { day: number; month: number; year: number; isLeapMonth: boolean };
  /** "11/8 âm lịch, năm Bính Ngọ" */
  lunarLabel: string;
  canChiDay: string;
  /** Trang lịch ngày tương ứng, null nếu ngày ngoài khoảng trang lịch hỗ trợ. */
  href: string | null;
}

function compute(date: SolarDate): DateSummary {
  const jd = jdFromDate(date.day, date.month, date.year);
  const lunar = solarToLunar(date.day, date.month, date.year);
  return {
    date: { day: date.day, month: date.month, year: date.year },
    weekday: WEEKDAY_LONG[dayOfWeek(jd)]!,
    lunar: { ...lunar },
    lunarLabel: `${lunar.day}/${lunar.month}${lunar.isLeapMonth ? " nhuận" : ""} âm lịch, năm ${canChiOfYear(lunar.year).name}`,
    canChiDay: canChiOfDay(jd).name,
    href: canPublishDay(date) ? dayHref(date) : null,
  };
}

/** Tóm tắt một ngày (thứ, âm lịch, link trang lịch) cho các công cụ; nhẹ hơn getCalendarDay. */
export const describeDate = memoize(compute, (d) => `${d.year}-${d.month}-${d.day}`, 512);
