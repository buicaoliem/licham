/**
 * Reference instants: equinoxes and solstices as published by the US Naval
 * Observatory (UTC, rounded to the minute), and Meeus, Astronomical Algorithms
 * 2nd ed., Example 27.a (June solstice 1962, JDE 2437837.39245 TT).
 */
import { describe, expect, it } from "vitest";
import { getDayInfo, getSolarTerm, getSolarTermsOfYear } from "../src";
import { jdeOfSolarLongitude } from "../src/astronomy";

const MINUTE = 60_000;

const EQUINOX_SOLSTICE: [string, string][] = [
  ["Xuân phân", "2000-03-20T07:35Z"],
  ["Hạ chí", "2000-06-21T01:48Z"],
  ["Thu phân", "2000-09-22T17:27Z"],
  ["Đông chí", "2000-12-21T13:37Z"],
  ["Xuân phân", "2024-03-20T03:06Z"],
  ["Hạ chí", "2024-06-20T20:51Z"],
  ["Thu phân", "2024-09-22T12:44Z"],
  ["Đông chí", "2024-12-21T09:20Z"],
  ["Xuân phân", "2026-03-20T14:46Z"],
  ["Hạ chí", "2026-06-21T08:24Z"],
  ["Thu phân", "2026-09-23T00:05Z"],
  ["Đông chí", "2026-12-21T20:50Z"],
];

describe("solar terms", () => {
  it("Meeus example 27.a: June solstice 1962 at JDE 2437837.39245", () => {
    const jde = jdeOfSolarLongitude(90, 2437837);
    expect(Math.abs(jde - 2437837.39245) * 1440).toBeLessThan(1);
  });

  it.each(EQUINOX_SOLSTICE)("%s starts at %s (±1.5 min)", (name, iso) => {
    const expected = new Date(iso).getTime();
    const term = getSolarTerm(new Date(expected + 3 * 3600_000));
    expect(term.name).toBe(name);
    expect(Math.abs(term.start.getTime() - expected)).toBeLessThan(1.5 * MINUTE);
  });

  it("the 24 terms of 2026 are complete, ordered and non-overlapping", () => {
    const terms = getSolarTermsOfYear(2026);
    expect(terms).toHaveLength(24);
    expect(terms[0]!.name).toBe("Tiểu hàn");
    expect(terms[23]!.name).toBe("Đông chí");
    expect(new Set(terms.map((t) => t.name)).size).toBe(24);
    for (let i = 0; i < terms.length; i++) {
      const t = terms[i]!;
      expect(t.longitude).toBe((285 + 15 * i) % 360);
      expect(t.end.getTime()).toBeGreaterThan(t.start.getTime());
      const days = (t.end.getTime() - t.start.getTime()) / 86400_000;
      expect(days).toBeGreaterThan(14);
      expect(days).toBeLessThan(16.1);
      // Vietnam-time year of every start is 2026.
      expect(new Date(t.start.getTime() + 7 * 3600_000).getUTCFullYear()).toBe(2026);
      if (i > 0) {
        const prevEnd = terms[i - 1]!.end.getTime();
        expect(Math.abs(prevEnd - t.start.getTime())).toBeLessThan(1000);
      }
    }
  });

  it("getSolarTerm brackets the instant and agrees with the yearly list", () => {
    const terms = getSolarTermsOfYear(2026);
    for (const t of terms) {
      const mid = new Date((t.start.getTime() + t.end.getTime()) / 2);
      const found = getSolarTerm(mid);
      expect(found.name).toBe(t.name);
      expect(Math.abs(found.start.getTime() - t.start.getTime())).toBeLessThan(1000);
      expect(Math.abs(found.end.getTime() - t.end.getTime())).toBeLessThan(1000);
      expect(found.start.getTime()).toBeLessThanOrEqual(mid.getTime());
      expect(found.end.getTime()).toBeGreaterThan(mid.getTime());
    }
  });

  it("switches exactly at the start instant", () => {
    const thuPhan = getSolarTermsOfYear(2026).find((t) => t.name === "Thu phân")!;
    expect(getSolarTerm(new Date(thuPhan.start.getTime() - 1000)).name).toBe("Bạch lộ");
    expect(getSolarTerm(new Date(thuPhan.start.getTime() + 1000)).name).toBe("Thu phân");
  });

  it("transition day: a term starting during the day is that day's term", () => {
    // Thu phân 2026 starts 23/09/2026 ~07:05 Vietnam time.
    expect(getDayInfo({ day: 22, month: 9, year: 2026 }).solarTerm.name).toBe("Bạch lộ");
    expect(getDayInfo({ day: 23, month: 9, year: 2026 }).solarTerm.name).toBe("Thu phân");
  });

  it("works at the ends of the supported range", () => {
    expect(getSolarTerm(new Date("1900-01-01T00:00Z")).name).toBe("Đông chí");
    expect(getSolarTerm(new Date("2100-12-31T12:00Z")).name).toBe("Đông chí");
  });
});
