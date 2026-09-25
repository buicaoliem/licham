import { describe, expect, it, vi } from "vitest";
import { memoize } from "./cache";
import { clearDayCache, getCalendarDay, CalendarRangeError } from "./calendar-day";
import { clearMonthCache, getMonthCells } from "./calendar-month";
import { getCalendarYear } from "./calendar-year";
import { INDEX_RANGE, SUPPORTED_RANGE, isIndexableYear, isSupportedYear } from "./config";
import { breadcrumbJsonLd, faqJsonLd } from "./jsonld";
import { resolveLegacyUrl } from "./legacy-urls";
import { prebuildDaySlugs, prebuildMonthSlugs } from "./prebuild";

describe("memoize", () => {
  it("returns the cached value for the same key", () => {
    const fn = vi.fn((n: number) => ({ n }));
    const m = memoize(fn, (n) => String(n), 10);
    expect(m(1)).toBe(m(1));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(m(2)).not.toBe(m(1));
  });
  it("does not cache thrown errors", () => {
    let fail = true;
    const fn = vi.fn((n: number) => {
      if (fail) throw new RangeError("boom");
      return n;
    });
    const m = memoize(fn, (n) => String(n), 10);
    expect(() => m(1)).toThrow(RangeError);
    expect(m.size).toBe(0);
    fail = false;
    expect(m(1)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  it("evicts least recently used entries beyond max", () => {
    const fn = vi.fn((n: number) => n);
    const m = memoize(fn, (n) => String(n), 2);
    m(1);
    m(2);
    m(1); // 1 becomes most recent
    m(3); // evicts 2
    expect(m.size).toBe(2);
    fn.mockClear();
    m(1);
    expect(fn).not.toHaveBeenCalled();
    m(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("clear() invalidates", () => {
    const fn = vi.fn((n: number) => n);
    const m = memoize(fn, (n) => String(n), 5);
    m(1);
    m.clear();
    m(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe("calendar caches", () => {
  it("day cache is shared, invalidates, and never stores range errors", () => {
    clearDayCache();
    const d = { day: 21, month: 9, year: 2026 };
    expect(getCalendarDay(d)).toBe(getCalendarDay({ ...d }));
    expect(() => getCalendarDay({ day: 1, month: 1, year: 1900 })).toThrow(CalendarRangeError);
    expect(getCalendarDay.size).toBe(1);
    clearDayCache();
    expect(getCalendarDay.size).toBe(0);
  });
  it("year cache rejects unsupported years without caching", () => {
    expect(() => getCalendarYear(1800)).toThrow(RangeError);
    expect(getCalendarYear(2026)).toBe(getCalendarYear(2026));
  });
  it("month cache never leaks 'today' between calls", () => {
    clearMonthCache();
    const a = getMonthCells(9, 2026, { day: 21, month: 9, year: 2026 });
    const b = getMonthCells(9, 2026, { day: 22, month: 9, year: 2026 });
    expect(a.filter((c) => c.isToday).map((c) => c.solarDay)).toEqual([21]);
    expect(b.filter((c) => c.isToday).map((c) => c.solarDay)).toEqual([22]);
    expect(() => getMonthCells(13, 2026, { day: 1, month: 1, year: 2026 })).toThrow(RangeError);
    expect(() => getMonthCells(1, 1969, { day: 1, month: 1, year: 2026 })).toThrow(RangeError);
  });
});

describe("range config", () => {
  it("index range sits inside supported range", () => {
    expect(SUPPORTED_RANGE).toEqual({ start: 1970, end: 2050 });
    expect(INDEX_RANGE).toEqual({ start: 2020, end: 2035 });
    expect(INDEX_RANGE.start).toBeGreaterThanOrEqual(SUPPORTED_RANGE.start);
    expect(INDEX_RANGE.end).toBeLessThanOrEqual(SUPPORTED_RANGE.end);
    expect(isSupportedYear(1970) && isSupportedYear(2050)).toBe(true);
    expect(isSupportedYear(1969) || isSupportedYear(2051)).toBe(false);
    expect(isIndexableYear(2019) || isIndexableYear(2036)).toBe(false);
    expect(isIndexableYear(2020) && isIndexableYear(2035)).toBe(true);
  });
});

describe("prebuild", () => {
  it("only prebuilds current year ±1", () => {
    const days = prebuildDaySlugs(2026);
    expect(days).toHaveLength(365 + 365 + 365);
    expect(days[0]).toBe("2025-01-01");
    expect(days.at(-1)).toBe("2027-12-31");
    expect(prebuildMonthSlugs(2026)).toHaveLength(36);
  });
  it("clamps to the supported range", () => {
    expect(prebuildMonthSlugs(1970)).toHaveLength(24);
  });
});

describe("legacy URL compatibility", () => {
  it("redirects valid old day URLs straight to the canonical URL", () => {
    expect(resolveLegacyUrl("/ngay/21-09-2026/")).toEqual({ kind: "redirect", to: "/ngay/2026-09-21/" });
    expect(resolveLegacyUrl("/ngay/21-09-2026")).toEqual({ kind: "redirect", to: "/ngay/2026-09-21/" });
  });
  it("redirects old month URLs, with or without zero padding", () => {
    expect(resolveLegacyUrl("/lich-thang-9-2026/")).toEqual({ kind: "redirect", to: "/thang/2026-09/" });
    expect(resolveLegacyUrl("/lich-thang-12-2026")).toEqual({ kind: "redirect", to: "/thang/2026-12/" });
    expect(resolveLegacyUrl("/lich-thang-09-2026/")).toEqual({ kind: "redirect", to: "/thang/2026-09/" });
  });
  it("never redirects invalid dates to another URL", () => {
    expect(resolveLegacyUrl("/ngay/31-02-2026/")).toEqual({ kind: "gone" });
    expect(resolveLegacyUrl("/ngay/99-99-2026/")).toEqual({ kind: "gone" });
    expect(resolveLegacyUrl("/ngay/01-01-1969/")).toEqual({ kind: "gone" });
    expect(resolveLegacyUrl("/lich-thang-13-2026/")).toEqual({ kind: "gone" });
    expect(resolveLegacyUrl("/lich-thang-0-2026/")).toEqual({ kind: "gone" });
    expect(resolveLegacyUrl("/lich-thang-1-2051/")).toEqual({ kind: "gone" });
  });
  it("ignores canonical URLs, so there is no redirect loop", () => {
    expect(resolveLegacyUrl("/ngay/2026-09-21/")).toBeNull();
    expect(resolveLegacyUrl("/thang/2026-09/")).toBeNull();
    expect(resolveLegacyUrl("/nam/2026/")).toBeNull();
  });
  it("canonical targets are never matched again as legacy", () => {
    for (const p of ["/ngay/21-09-2026/", "/lich-thang-9-2026/"]) {
      const r = resolveLegacyUrl(p);
      if (r?.kind === "redirect") expect(resolveLegacyUrl(r.to)).toBeNull();
    }
  });
});

describe("json-ld", () => {
  it("builds a valid BreadcrumbList", () => {
    const j = breadcrumbJsonLd([{ label: "Trang chủ", href: "/" }, { label: "Lịch âm", href: "/nam/2026/" }, { label: "Ngày" }]);
    expect(j["@type"]).toBe("BreadcrumbList");
    expect(j.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(j.itemListElement[0]!.item).toBe("https://licham.app/");
    expect("item" in j.itemListElement[2]!).toBe(false);
  });
  it("rejects a middle crumb without href", () => {
    expect(() => breadcrumbJsonLd([{ label: "a" }, { label: "b" }])).toThrow();
  });
  it("builds FAQPage from the displayed questions only", () => {
    const j = faqJsonLd([{ q: "q1", a: "a1" }]);
    expect(j.mainEntity).toHaveLength(1);
    expect(j.mainEntity[0]!.acceptedAnswer.text).toBe("a1");
  });
});
