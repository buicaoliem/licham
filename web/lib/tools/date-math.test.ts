import { describe, expect, it } from "vitest";
import { describeDate } from "@/lib/calendar/date-info";
import { addDays, calendarSpan, daysBetween, parseIntParam, parseIsoDate, spanLabel, splitWeeks, toIso, weekdaysBetween } from "./date-math";
import { first, hasAnyParam } from "./params";
import { TOOLS, generateToolMetadata, toolBySlug } from "./tools";

const d = (year: number, month: number, day: number) => ({ year, month, day });

describe("parseIsoDate", () => {
  it("accepts valid dates in 1900–2100", () => {
    expect(parseIsoDate("2026-09-21")).toEqual(d(2026, 9, 21));
    expect(parseIsoDate("1900-01-01")).toEqual(d(1900, 1, 1));
    expect(parseIsoDate("2100-12-31")).toEqual(d(2100, 12, 31));
    expect(parseIsoDate("2024-02-29")).toEqual(d(2024, 2, 29));
  });
  it("rejects invalid, malformed and out-of-range input", () => {
    for (const bad of ["2026-02-31", "2023-02-29", "2026-13-01", "26-09-2026", "2026-9-21", "", undefined, "1899-12-31", "2101-01-01", "abc"]) {
      expect(parseIsoDate(bad)).toBeNull();
    }
  });
});

describe("parseIntParam", () => {
  it("accepts digits within bounds only", () => {
    expect(parseIntParam("100", 0, 1000)).toBe(100);
    expect(parseIntParam("0", 0, 1000)).toBe(0);
    for (const bad of ["-1", "1.5", "1e3", "1001", "", undefined, "abc", "12345678"]) expect(parseIntParam(bad, 0, 1000)).toBeNull();
  });
});

describe("date arithmetic", () => {
  it("daysBetween is signed and skips the start day", () => {
    expect(daysBetween(d(2026, 1, 1), d(2026, 1, 2))).toBe(1);
    expect(daysBetween(d(2026, 1, 1), d(2027, 1, 1))).toBe(365);
    expect(daysBetween(d(2024, 1, 1), d(2025, 1, 1))).toBe(366);
    expect(daysBetween(d(2026, 9, 21), d(2026, 9, 1))).toBe(-20);
    expect(daysBetween(d(2026, 5, 5), d(2026, 5, 5))).toBe(0);
  });
  it("addDays crosses month, year and leap boundaries and round-trips", () => {
    expect(addDays(d(2026, 9, 21), 100)).toEqual(d(2026, 12, 30));
    expect(addDays(d(2026, 12, 31), 1)).toEqual(d(2027, 1, 1));
    expect(addDays(d(2028, 2, 28), 1)).toEqual(d(2028, 2, 29));
    expect(addDays(d(2027, 2, 28), 1)).toEqual(d(2027, 3, 1));
    expect(addDays(d(2026, 9, 21), -21)).toEqual(d(2026, 8, 31));
    const a = d(2026, 9, 21);
    expect(addDays(addDays(a, 12345)!, -12345)).toEqual(a);
  });
  it("addDays returns null outside 1900–2100", () => {
    expect(addDays(d(2100, 12, 31), 1)).toBeNull();
    expect(addDays(d(1900, 1, 1), -1)).toBeNull();
  });
  it("weekdaysBetween counts Mon–Fri in (a, b]", () => {
    // Thứ Hai 21/09/2026 → Thứ Hai 28/09/2026: Tue..Fri + Mon = 5
    expect(weekdaysBetween(d(2026, 9, 21), d(2026, 9, 28))).toBe(5);
    expect(weekdaysBetween(d(2026, 9, 21), d(2026, 9, 21))).toBe(0);
    // Thứ Sáu 25/09 → Chủ nhật 27/09: chỉ cuối tuần
    expect(weekdaysBetween(d(2026, 9, 25), d(2026, 9, 27))).toBe(0);
    // order-insensitive
    expect(weekdaysBetween(d(2026, 9, 28), d(2026, 9, 21))).toBe(5);
    // 364 ngày = 52 tuần = 260 ngày làm việc
    expect(weekdaysBetween(d(2026, 1, 1), d(2026, 12, 31))).toBe(260);
  });
  it("splitWeeks and spanLabel", () => {
    expect(splitWeeks(100)).toEqual({ weeks: 14, days: 2 });
    expect(splitWeeks(-8)).toEqual({ weeks: 1, days: 1 });
    expect(spanLabel({ years: 0, months: 0, days: 0 })).toBe("0 ngày");
    expect(spanLabel({ years: 36, months: 0, days: 5 })).toBe("36 năm 5 ngày");
  });
  it("calendarSpan is order-insensitive and handles month ends", () => {
    expect(calendarSpan(d(2000, 1, 31), d(2000, 3, 1))).toEqual(calendarSpan(d(2000, 3, 1), d(2000, 1, 31)));
    expect(calendarSpan(d(1990, 1, 20), d(2026, 9, 21))).toEqual({ years: 36, months: 8, days: 1 });
    expect(toIso(d(2026, 3, 5))).toBe("2026-03-05");
  });
});

describe("describeDate", () => {
  it("returns weekday, lunar label and a day-page link", () => {
    const s = describeDate(d(2026, 9, 21));
    expect(s.weekday).toBe("Thứ hai");
    expect(s.lunarLabel).toBe("11/8 âm lịch, năm Bính Ngọ");
    expect(s.href).toBe("/ngay/2026-09-21/");
  });
  it("has no link outside the calendar page range but still works", () => {
    const s = describeDate(d(1950, 5, 5));
    expect(s.href).toBeNull();
    expect(s.weekday).toBe("Thứ sáu");
  });
});

describe("tool metadata", () => {
  it("canonical is the clean URL and input state is noindex", () => {
    const t = toolBySlug("dem-ngay");
    const clean = generateToolMetadata(t, {});
    const withInput = generateToolMetadata(t, { tu: "2026-01-01", den: "2026-09-21" });
    expect(clean.robots).toBeUndefined();
    expect(withInput.robots).toEqual({ index: false, follow: true });
    expect(clean.alternates?.canonical).toBe("/cong-cu/dem-ngay/");
    expect(withInput.alternates?.canonical).toBe("/cong-cu/dem-ngay/");
    // Param không liên quan không làm trang bị noindex.
    expect(generateToolMetadata(t, { utm_source: "x" }).robots).toBeUndefined();
  });
  it("every tool has unique title and description", () => {
    expect(new Set(TOOLS.map((t) => t.title)).size).toBe(TOOLS.length);
    expect(new Set(TOOLS.map((t) => t.description)).size).toBe(TOOLS.length);
    expect(new Set(TOOLS.map((t) => t.href)).size).toBe(TOOLS.length);
  });
  it("param helpers", () => {
    expect(first({ a: " x " }, "a")).toBe("x");
    expect(first({ a: ["1", "2"] }, "a")).toBe("1");
    expect(first({ a: "  " }, "a")).toBeUndefined();
    expect(hasAnyParam({ a: "" }, ["a"])).toBe(true);
  });
});
