import { describe, expect, it } from "vitest";
import { getCalendarDay, adjacentDays, CalendarRangeError } from "./calendar-day";
import { getCalendarYear } from "./calendar-year";
import { generateCalendarDayMetadata, generateCalendarMonthMetadata } from "./metadata";
import { canIndexPage, canPublishDay } from "./policy";
import { chiRelations } from "./relations";
import { dayHref, monthHref, parseDaySlug, parseMonthSlug, parseYearSlug, yearHref } from "./urls";

describe("urls", () => {
  it("builds canonical URLs", () => {
    expect(dayHref({ day: 21, month: 9, year: 2026 })).toBe("/ngay/2026-09-21/");
    expect(monthHref(9, 2026)).toBe("/thang/2026-09/");
    expect(yearHref(2026)).toBe("/nam/2026/");
  });
  it("rejects invalid dates", () => {
    expect(parseDaySlug("2026-02-31")).toBeNull();
    expect(parseDaySlug("21-09-2026")).toBeNull();
    expect(parseDaySlug("2026-09-21")).toEqual({ day: 21, month: 9, year: 2026 });
    expect(parseMonthSlug("2026-13")).toBeNull();
    expect(parseMonthSlug("2026-9")).toBeNull();
    expect(parseYearSlug("26")).toBeNull();
  });
});

describe("publication policy", () => {
  it("publishes only supported valid days", () => {
    expect(canPublishDay({ day: 21, month: 9, year: 2026 })).toBe(true);
    expect(canPublishDay({ day: 31, month: 2, year: 2026 })).toBe(false);
    expect(canPublishDay({ day: 1, month: 1, year: 1969 })).toBe(false);
    expect(canPublishDay({ day: 1, month: 1, year: 2051 })).toBe(false);
  });
  it("indexes only inside the indexable window", () => {
    expect(canIndexPage({ kind: "day", date: { day: 21, month: 9, year: 2026 } })).toBe(true);
    expect(canIndexPage({ kind: "day", date: { day: 21, month: 9, year: 1990 } })).toBe(false);
    expect(canIndexPage({ kind: "year", year: 2050 })).toBe(false);
  });
});

describe("chiRelations", () => {
  it("Tý", () => {
    expect(chiRelations(0)).toEqual({ lucHop: "Sửu", tamHop: ["Thân", "Thìn"], xung: "Ngọ", hinh: ["Mão"], hai: "Mùi", pha: "Dậu" });
  });
  it("tự hình and tam hình", () => {
    expect(chiRelations(4).hinh).toEqual(["Thìn"]);
    expect(chiRelations(2).hinh).toEqual(["Tỵ", "Thân"]);
  });
  it("relations are symmetric for hợp, xung, hại, phá", () => {
    for (let i = 0; i < 12; i++) {
      const r = chiRelations(i);
      const idx = (name: string) => ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"].indexOf(name);
      for (const key of ["lucHop", "xung", "hai", "pha"] as const) {
        const back = chiRelations(idx(r[key]));
        expect(back[key]).toBe(["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"][i]);
      }
    }
  });
});

describe("getCalendarDay fixtures", () => {
  it("21/09/2026 is 11/8 âm, năm Bính Ngọ", () => {
    const d = getCalendarDay({ day: 21, month: 9, year: 2026 });
    expect(d.weekday.name).toBe("Thứ hai");
    expect(d.lunarDate).toMatchObject({ day: 11, month: 8, isLeapMonth: false });
    expect(d.lunarYearName).toBe("Bính Ngọ");
    expect(d.zodiacHourGood).toHaveLength(6);
    expect(d.zodiacHourBad).toHaveLength(6);
    expect(d.conflictAges).toHaveLength(5);
    expect(d.pengZuTaboo).toHaveLength(2);
  });
  it("Trung Thu 2026 is 25/09 (15/8 âm) with a holiday event", () => {
    const d = getCalendarDay({ day: 25, month: 9, year: 2026 });
    expect(d.lunarDate).toMatchObject({ day: 15, month: 8 });
    expect(d.holidayEvents.length).toBeGreaterThan(0);
  });
  it("Tết 2026 is 17/02", () => {
    const y = getCalendarYear(2026);
    expect(y.tet).toEqual({ day: 17, month: 2, year: 2026 });
    expect(y.leapMonth).toBeNull();
    const d = getCalendarDay(y.tet);
    expect(d.lunarDate).toMatchObject({ day: 1, month: 1 });
  });
  it("leap month year 2023 (nhuận tháng 2)", () => {
    expect(getCalendarYear(2023).leapMonth).toBe(2);
    expect(getCalendarDay({ day: 1, month: 4, year: 2023 }).isLeapMonth).toBe(true);
  });
  it("solar term boundary: next term is later and days remaining is non-negative", () => {
    const d = getCalendarDay({ day: 23, month: 9, year: 2026 });
    expect(d.solarTerm.next.start.getTime()).toBeGreaterThan(d.solarTerm.start.getTime());
    expect(d.solarTerm.next.daysUntil).toBeGreaterThanOrEqual(0);
  });
  it("year boundaries 31/12 and 01/01 navigate across years", () => {
    expect(adjacentDays({ day: 31, month: 12, year: 2026 }).next).toEqual({ day: 1, month: 1, year: 2027 });
    expect(adjacentDays({ day: 1, month: 1, year: 2027 }).prev).toEqual({ day: 31, month: 12, year: 2026 });
    expect(adjacentDays({ day: 1, month: 1, year: 1970 }).prev).toBeNull();
    expect(adjacentDays({ day: 31, month: 12, year: 2050 }).next).toBeNull();
  });
  it("throws outside the supported range", () => {
    expect(() => getCalendarDay({ day: 1, month: 1, year: 1900 })).toThrow(CalendarRangeError);
  });
  it("computes every day of the supported range boundaries without throwing", () => {
    for (const y of [1970, 2050]) {
      expect(() => getCalendarDay({ day: 1, month: 1, year: y })).not.toThrow();
      expect(() => getCalendarDay({ day: 31, month: 12, year: y })).not.toThrow();
    }
  });
});

describe("metadata engine", () => {
  it("day metadata is unique, canonical and indexable in window", () => {
    const a = generateCalendarDayMetadata(getCalendarDay({ day: 21, month: 9, year: 2026 }));
    const b = generateCalendarDayMetadata(getCalendarDay({ day: 22, month: 9, year: 2026 }));
    expect(a.alternates?.canonical).toBe("/ngay/2026-09-21/");
    expect(a.title).not.toBe(b.title);
    expect(a.description).not.toBe(b.description);
    expect(a.robots).toBeUndefined();
  });
  it("noindex outside the indexable window", () => {
    const m = generateCalendarDayMetadata(getCalendarDay({ day: 21, month: 9, year: 1990 }));
    expect(m.robots).toEqual({ index: false, follow: true });
    expect(generateCalendarMonthMetadata(9, 2026).title).toBe("Lịch âm tháng 9 năm 2026 - Lịch vạn niên");
  });
});
