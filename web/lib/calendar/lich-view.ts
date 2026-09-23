/**
 * Dữ liệu dựng giao diện Lịch tháng, Lịch năm (Contemporary Heritage). Chỉ đọc lại lõi lịch, getCalendarDay,
 * getMonthCells và bộ máy ngày lễ — không thêm quy tắc tính lịch mới.
 */
import { type SolarDate, getDayInfo, getSolarTermsOfYear, jdFromDate, vietnamDateOf } from "@licham/core";
import { LE_LIST } from "@/lib/le";
import { occurrenceInYear } from "@/lib/le-date-engine";
import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";
import { getCalendarDay } from "./calendar-day";
import { type MonthCell, getMonthCells } from "./calendar-month";
import { memoize } from "./cache";
import { dayHref } from "./urls";

export const dateKey = (d: { day: number; month: number; year: number }) => `${d.year}-${pad2(d.month)}-${pad2(d.day)}`;

export interface HolidayRef {
  slug: string;
  name: string;
}

/**
 * Ngày lễ theo ngày dương của cả năm `year`. Xét cả năm trước/sau vì lễ theo âm lịch (vd. Giao thừa)
 * có thể rơi sang năm dương kế bên — cùng cách holidaysOnDate() đang làm, nhưng tính một lần cho cả năm.
 */
function computeHolidayIndex(year: number): Record<string, HolidayRef[]> {
  const index: Record<string, HolidayRef[]> = {};
  for (const page of LE_LIST) {
    for (const y of [year - 1, year, year + 1]) {
      const occ = occurrenceInYear(page, y);
      if (occ.year !== year) continue;
      const k = dateKey(occ);
      const list = (index[k] ??= []);
      if (!list.some((h) => h.slug === page.slug)) list.push({ slug: page.slug, name: page.ten });
    }
  }
  return index;
}
const holidayIndex = memoize(computeHolidayIndex, (y) => String(y), 16);

export function holidaysOn(d: SolarDate): HolidayRef[] {
  return holidayIndex(d.year)[dateKey(d)] ?? [];
}

export interface TermRef {
  name: string;
  date: SolarDate;
  /** Giờ bắt đầu theo giờ Việt Nam, "HH:MM". */
  time: string;
  longitude: number;
}

const timeFmt = new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit", hour12: false });

function computeTerms(year: number): TermRef[] {
  return getSolarTermsOfYear(year)
    .map((t) => ({ name: t.name as string, date: vietnamDateOf(t.start), time: timeFmt.format(t.start), longitude: t.longitude }))
    .sort((a, b) => jdFromDate(a.date.day, a.date.month, a.date.year) - jdFromDate(b.date.day, b.date.month, b.date.year));
}
/** 24 tiết khí có ngày bắt đầu (giờ Việt Nam) trong năm dương `year`. */
export const termsOfYear = memoize(computeTerms, (y) => String(y), 16);

export function termsOfMonth(month: number, year: number): TermRef[] {
  return termsOfYear(year).filter((t) => t.date.month === month && t.date.year === year);
}

/** Ô lịch tháng: dữ liệu getMonthCells + can chi ngày, ngày lễ, tiết khí bắt đầu trong ngày. */
export interface LichCell {
  key: string;
  day: number;
  month: number;
  year: number;
  lunarDay: number;
  lunarMonth: number;
  /** Nhãn âm ngắn "ngày/tháng" (vd. "13/8"); tháng nhuận thêm "N" ("13/4N"). */
  lunarLabel: string;
  isLeapMonth: boolean;
  canChi: string;
  weekday: number;
  inMonth: boolean;
  isToday: boolean;
  isMungMot: boolean;
  isRam: boolean;
  isHoangDao: boolean;
  holidays: HolidayRef[];
  term: string | null;
  href: string;
}

function toLichCell(c: MonthCell, terms: Map<string, string>): LichCell {
  const solar = { day: c.solarDay, month: c.solarMonth, year: c.solarYear };
  const info = getDayInfo(solar);
  const leap = info.lunar.isLeapMonth;
  const key = dateKey(solar);
  return {
    key,
    ...solar,
    lunarDay: c.lunarDay,
    lunarMonth: c.lunarMonth,
    lunarLabel: `${c.lunarDay}/${c.lunarMonth}${leap ? "N" : ""}`,
    isLeapMonth: leap,
    canChi: info.canChi.day.name,
    weekday: info.solar.dayOfWeek,
    inMonth: c.isCurrentMonth,
    isToday: c.isToday,
    isMungMot: c.lunarDay === 1,
    isRam: c.lunarDay === 15,
    isHoangDao: c.isHoangDao,
    holidays: holidaysOn(solar),
    term: terms.get(key) ?? null,
    href: dayHref(solar),
  };
}

export function lichCells(month: number, year: number, today: SolarDate): LichCell[] {
  const cells = getMonthCells(month, year, today);
  const terms = new Map<string, string>();
  const years = new Set(cells.map((c) => c.solarYear));
  for (const y of years) for (const t of termsOfYear(y)) terms.set(dateKey(t.date), t.name);
  return cells.map((c) => toLichCell(c, terms));
}

/** Thông tin rút gọn của một ngày cho khối "Chi tiết ngày" bên lịch tháng — lấy nguyên từ getCalendarDay. */
export interface DayBrief {
  key: string;
  href: string;
  weekday: string;
  day: number;
  month: number;
  year: number;
  lunar: string;
  canChiDay: string;
  canChiMonth: string;
  canChiYear: string;
  napAm: string;
  element: string;
  isHoangDao: boolean;
  dayStar: string;
  truc: string;
  term: string;
  joy: string | null;
  wealth: string | null;
  conflictAges: string[];
  /** Việc "thuận" (chỉ sao tốt nhắc tới). */
  good: string[];
  /** Việc "nửa thuận" (có cả sao tốt và sao xấu nhắc tới) — cùng nằm trong cả hai danh sách của getCalendarDay. */
  mixed: string[];
  /** Việc "không thuận" (chỉ sao xấu nhắc tới). */
  bad: string[];
  holidays: HolidayRef[];
}

export function dayBrief(d: SolarDate): DayBrief {
  const day = getCalendarDay(d);
  const l = day.lunarDate;
  const goodL = day.goodActivities.map((a) => a.label);
  const badL = day.badActivities.map((a) => a.label);
  return {
    key: dateKey(d),
    href: dayHref(d),
    weekday: WEEKDAY_LONG[day.weekday.index]!,
    day: d.day,
    month: d.month,
    year: d.year,
    lunar: `Ngày ${l.day} tháng ${day.lunarMonthName} năm ${day.lunarYearName}`,
    canChiDay: day.canChiDay.name,
    canChiMonth: day.canChiMonth.name,
    canChiYear: day.canChiYear.name,
    napAm: day.dayNapAm,
    element: day.dayElement,
    isHoangDao: day.isHoangDaoDay,
    dayStar: day.dayStarName,
    truc: day.truc.name,
    term: day.solarTerm.name,
    joy: day.joyDirection,
    wealth: day.wealthDirection,
    conflictAges: day.conflictAges,
    good: goodL.filter((v) => !badL.includes(v)),
    mixed: goodL.filter((v) => badL.includes(v)),
    bad: badL.filter((v) => !goodL.includes(v)),
    holidays: day.holidayEvents,
  };
}

/** Ngày đáng chú ý trong tháng: mùng một, rằm và ngày lễ, theo thứ tự ngày. */
export interface NotableDay {
  key: string;
  day: number;
  month: number;
  lunarLabel: string;
  title: string;
  kind: "mung-mot" | "ram" | "le";
  href: string;
  leHref?: string;
}

export function notableDays(cells: LichCell[]): NotableDay[] {
  const out: NotableDay[] = [];
  for (const c of cells) {
    if (!c.inMonth) continue;
    const thang = `tháng ${MONTH_WORD[c.lunarMonth - 1]!.toLowerCase()}${c.isLeapMonth ? " nhuận" : ""}`;
    if (c.isMungMot) out.push({ key: `${c.key}-m1`, day: c.day, month: c.month, lunarLabel: c.lunarLabel, title: `Mùng một ${thang} âm lịch`, kind: "mung-mot", href: c.href });
    if (c.isRam) out.push({ key: `${c.key}-r`, day: c.day, month: c.month, lunarLabel: c.lunarLabel, title: `Rằm ${thang} âm lịch`, kind: "ram", href: c.href });
    for (const h of c.holidays)
      out.push({ key: `${c.key}-${h.slug}`, day: c.day, month: c.month, lunarLabel: c.lunarLabel, title: h.name, kind: "le", href: c.href, leHref: `/le/${h.slug}/` });
  }
  return out;
}

/** Lịch năm: 12 tháng, mỗi tháng là các ô của lưới thứ Hai đầu tuần (ô ngoài tháng để trống). */
export interface YearMonth {
  month: number;
  cells: (LichCell | null)[];
  hoangDao: number;
  notable: number;
}

export function yearMonths(year: number, today: SolarDate): YearMonth[] {
  return Array.from({ length: 12 }, (_, i) => {
    const cells = lichCells(i + 1, year, today);
    const inMonth = cells.filter((c) => c.inMonth);
    return {
      month: i + 1,
      cells: cells.map((c) => (c.inMonth ? c : null)),
      hoangDao: inMonth.filter((c) => c.isHoangDao).length,
      notable: inMonth.filter((c) => c.holidays.length > 0).length,
    };
  });
}
