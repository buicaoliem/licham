import type { Metadata } from "next";
import type { CalendarDay } from "./calendar-day";
import { type PageRef, canIndexPage } from "./policy";
import { dayHref, monthHref, yearHref } from "./urls";

function base(page: PageRef, canonical: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    ...(canIndexPage(page) ? {} : { robots: { index: false, follow: true } }),
  };
}

export function generateCalendarDayMetadata(day: CalendarDay): Metadata {
  const { day: d, month: m, year: y } = day.solarDate;
  const l = day.lunarDate;
  return base(
    { kind: "day", date: day.solarDate },
    dayHref(day.solarDate),
    `Lịch âm ngày ${d}/${m}/${y} - Ngày tốt xấu, giờ hoàng đạo`,
    `Xem lịch âm ngày ${d} tháng ${m} năm ${y}, tức ngày ${l.day}/${l.month} âm lịch, ngày ${day.canChiDay.name}, tiết ${day.solarTerm.name}, ${day.isHoangDaoDay ? "ngày hoàng đạo" : "ngày hắc đạo"}, trực ${day.truc.name}, giờ hoàng đạo và sao tốt xấu.`,
  );
}

export function generateCalendarMonthMetadata(month: number, year: number): Metadata {
  return base(
    { kind: "month", month, year },
    monthHref(month, year),
    `Lịch âm tháng ${month} năm ${year} - Lịch vạn niên`,
    `Xem lịch âm tháng ${month} năm ${year}, ngày âm dương, ngày tốt xấu, giờ hoàng đạo, tiết khí và các ngày lễ trong tháng.`,
  );
}

export function generateCalendarYearMetadata(year: number, canChiYear: string): Metadata {
  return base(
    { kind: "year", year },
    yearHref(year),
    `Lịch âm năm ${year} (${canChiYear}) - 12 tháng, Tết, tiết khí`,
    `Lịch âm dương năm ${year}, năm ${canChiYear}: 12 tháng dương lịch, ngày Tết Nguyên đán, ngày lễ chính và các mốc tiết khí trong năm.`,
  );
}
