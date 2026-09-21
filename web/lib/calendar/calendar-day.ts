import {
  type CanChi,
  type DescribedEntry,
  type HourInfo,
  type RatedEntry,
  type SolarDate,
  type Truc,
  CHI,
  getDayInfo,
  getSolarTerm,
  jdFromDate,
  jdToDate,
  vietnamDateOf,
} from "@licham/core";
import { vanKhanChoNgay } from "@/lib/day-links";
import { viecFaqs } from "@/lib/day-detail";
import { holidaysOnDate } from "@/lib/le-date-engine";
import { MONTH_WORD, WEEKDAY_LONG } from "@/lib/format";
import { VIEC_LIST } from "@/lib/xem-ngay-tot";
import { memoize } from "./cache";
import { type PengZuEntry, pengZuTaboo } from "./peng-zu";
import { chiRelations } from "./relations";
import { isSupportedYear } from "./config";

export type SourceType = "astronomical" | "traditional" | "editorial";

export interface ZodiacHour {
  chiIndex: number;
  chiName: string;
  start: string;
  end: string;
}

export interface CalendarActivity {
  label: string;
  /** Slug trang /xem-ngay-tot/[slug], null nếu chưa có công cụ tương ứng. */
  toolSlug: string | null;
  reason: string;
}

export interface CalendarHoliday {
  slug: string;
  name: string;
}

export interface CalendarSolarTerm {
  name: string;
  start: Date;
  /** Tiết khí bắt đầu ngay trong ngày này (giờ Việt Nam). */
  startsToday: boolean;
  next: { name: string; start: Date; daysUntil: number };
}

/** Nguồn duy nhất cho mọi trang lịch ngày; UI không tự tính lại. */
export interface CalendarDay {
  solarDate: SolarDate;
  lunarDate: { day: number; month: number; year: number; isLeapMonth: boolean };
  weekday: { index: number; name: string };

  canChiDay: CanChi;
  canChiMonth: CanChi;
  canChiYear: CanChi;

  lunarMonthName: string;
  lunarYearName: string;
  isLeapMonth: boolean;

  solarTerm: CalendarSolarTerm;

  zodiacHourGood: ZodiacHour[];
  zodiacHourBad: ZodiacHour[];
  isHoangDaoDay: boolean;
  dayStarName: string;

  goodStars: DescribedEntry[];
  badStars: DescribedEntry[];

  dayElement: string;
  dayNapAm: string;

  conflictAges: string[];
  compatibleAges: string[];

  lucHop: string;
  tamHop: string[];
  xung: string;
  hinh: string[];
  hai: string;
  pha: string;

  joyDirection: string | null;
  wealthDirection: string | null;

  truc: Truc;
  twentyEightMansion: RatedEntry | null;
  khongMinh: RatedEntry | null;

  pengZuTaboo: PengZuEntry[];

  goodActivities: CalendarActivity[];
  badActivities: CalendarActivity[];

  /** Chưa có nguồn dữ liệu sự kiện lịch sử đáng tin — để rỗng thay vì bịa. */
  historicalEvents: string[];

  holidayEvents: CalendarHoliday[];

  /** Bài văn khấn hợp ngày (mùng một, rằm, lễ âm cố định). */
  prayers: { slug: string; ten: string }[];

  sourceMetadata: {
    timeZone: "UTC+7";
    astronomical: string[];
    traditional: string[];
    editorial: string[];
  };
}


function daysBetween(from: SolarDate, to: SolarDate): number {
  return jdFromDate(to.day, to.month, to.year) - jdFromDate(from.day, from.month, from.year);
}

function toZodiacHour(h: HourInfo): ZodiacHour {
  return { chiIndex: h.chiIndex, chiName: CHI[h.chiIndex]!, start: h.start, end: h.end };
}

function directionText(d: { direction: string } | null): string | null {
  return d ? d.direction.toLowerCase() : null;
}

/** Lỗi khi dữ liệu chính không tính được hoặc ngày ngoài khoảng hỗ trợ; trang phải trả 404/500 chứ không render khung rỗng. */
export class CalendarRangeError extends Error {}

function computeCalendarDay(date: SolarDate): CalendarDay {
  if (!isSupportedYear(date.year)) throw new CalendarRangeError(`Ngày ngoài khoảng hỗ trợ: ${date.year}`);
  const info = getDayInfo(date);

  const term = getSolarTerm(new Date(Date.UTC(date.year, date.month - 1, date.day + 1) - 7 * 3600000 - 1));
  const nextTerm = getSolarTerm(new Date(term.end.getTime() + 1));
  const nextStartDate = vietnamDateOf(nextTerm.start);
  const startDate = vietnamDateOf(term.start);

  const rel = chiRelations(info.canChi.day.chiIndex);
  const compatible = [...new Set([rel.lucHop, ...rel.tamHop])];

  const viec = viecFaqs(info);
  const toActivity = (f: { viec: string; verdictLabel: string }): CalendarActivity => ({
    label: f.viec,
    toolSlug: VIEC_LIST.find((v) => v.viec === f.viec)?.slug ?? null,
    reason: f.verdictLabel,
  });

  return {
    solarDate: { day: date.day, month: date.month, year: date.year },
    lunarDate: { ...info.lunar },
    weekday: { index: info.solar.dayOfWeek, name: WEEKDAY_LONG[info.solar.dayOfWeek]! },
    canChiDay: info.canChi.day,
    canChiMonth: info.canChi.month,
    canChiYear: info.canChi.year,
    lunarMonthName: `${MONTH_WORD[info.lunar.month - 1]}${info.lunar.isLeapMonth ? " nhuận" : ""}`,
    lunarYearName: info.canChi.year.name,
    isLeapMonth: info.lunar.isLeapMonth,
    solarTerm: {
      name: info.solarTerm.name,
      start: term.start,
      startsToday: daysBetween(startDate, date) === 0,
      next: { name: nextTerm.name, start: nextTerm.start, daysUntil: Math.max(0, daysBetween(date, nextStartDate)) },
    },
    zodiacHourGood: info.hours.filter((h) => h.isHoangDao).map(toZodiacHour),
    zodiacHourBad: info.hours.filter((h) => !h.isHoangDao).map(toZodiacHour),
    isHoangDaoDay: info.thanSatNgay.isHoangDao,
    dayStarName: info.thanSatNgay.star,
    goodStars: info.saoTot ?? [],
    badStars: info.saoXau ?? [],
    dayElement: info.canChi.day.napAm.element,
    dayNapAm: info.canChi.day.napAm.name,
    conflictAges: info.tuoiXung.ngay.map((x) => x.canChi.name),
    compatibleAges: compatible,
    ...rel,
    joyDirection: directionText(info.hyThan),
    wealthDirection: directionText(info.taiThan),
    truc: info.truc,
    twentyEightMansion: info.nhiThapBatTu,
    khongMinh: info.khongMinh,
    pengZuTaboo: pengZuTaboo(info.canChi.day.canIndex, info.canChi.day.chiIndex),
    goodActivities: viec.filter((f) => f.verdict !== "khong-thuan").map(toActivity),
    badActivities: viec.filter((f) => f.verdict !== "thuan").map(toActivity),
    historicalEvents: [],
    holidayEvents: holidaysOnDate(date).map((h) => ({ slug: h.slug, name: h.ten })),
    prayers: vanKhanChoNgay(info),
    sourceMetadata: {
      timeZone: "UTC+7",
      astronomical: ["Ngày âm lịch", "Tiết khí", "Can chi ngày, tháng, năm"],
      traditional: ["Giờ hoàng đạo", "Sao tốt xấu", "Trực", "Nhị thập bát tú", "Quan hệ can chi", "Bành Tổ Bách Kỵ", "Hướng Hỷ thần, Tài thần"],
      editorial: ["Việc nên làm, không nên làm (tổng hợp từ mô tả sao)"],
    },
  };
}

/** Kết quả được cache và dùng chung, không sửa. Lỗi ngoài khoảng hỗ trợ không bao giờ được cache. */
export const getCalendarDay = memoize(computeCalendarDay, (d) => `${d.year}-${d.month}-${d.day}`, 512);

export const clearDayCache = () => getCalendarDay.clear();

/** Ngày liền trước và liền sau, null khi ra ngoài khoảng hỗ trợ. */
export function adjacentDays(date: SolarDate): { prev: SolarDate | null; next: SolarDate | null } {
  const jd = jdFromDate(date.day, date.month, date.year);
  const shift = (n: number): SolarDate | null => {
    const d = jdToDate(jd + n);
    return isSupportedYear(d.year) ? d : null;
  };
  return { prev: shift(-1), next: shift(1) };
}

export const SOURCE_LABEL: Record<SourceType, string> = {
  astronomical: "Dữ liệu thiên văn",
  traditional: "Theo quan niệm lịch truyền thống",
  editorial: "Nội dung biên tập",
};

