import { describe, expect, it } from "vitest";
import { getDayInfo, jdFromDate, jdToDate, lunarToSolar, solarToLunar } from "../src";

/** Deterministic PRNG (mulberry32) so failures are reproducible. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MIN_JD = jdFromDate(1, 1, 1900);
const MAX_JD = jdFromDate(31, 12, 2100);

describe("round trip", () => {
  it("lunarToSolar(solarToLunar(x)) === x for 2,000 random days in 1900–2100", () => {
    const rand = mulberry32(20260916);
    for (let i = 0; i < 2000; i++) {
      const jd = MIN_JD + Math.floor(rand() * (MAX_JD - MIN_JD + 1));
      const s = jdToDate(jd);
      const l = solarToLunar(s.day, s.month, s.year);
      expect(lunarToSolar(l.day, l.month, l.year, l.isLeapMonth), `${s.day}/${s.month}/${s.year}`).toEqual(s);
    }
  }, 30000);
});

describe("lunar month structure over the whole range", () => {
  it(
    "days advance by one, months are 29 or 30 days, and at most one leap month per lunar year",
    () => {
      let prev = solarToLunar(1, 1, 1900);
      const leapByYear = new Map<number, number>();
      for (let jd = MIN_JD + 1; jd <= MAX_JD; jd++) {
        const s = jdToDate(jd);
        const cur = solarToLunar(s.day, s.month, s.year);
        expect([29, 30]).toContain(cur.monthLength);
        if (cur.day === 1) {
          expect(prev.day, `${s.day}/${s.month}/${s.year}`).toBe(prev.monthLength);
          if (cur.isLeapMonth) {
            expect(cur.month).toBe(prev.month);
            expect(leapByYear.has(cur.year)).toBe(false);
            leapByYear.set(cur.year, cur.month);
          } else {
            expect(cur.month).toBe((prev.month % 12) + 1);
            expect(cur.year).toBe(prev.month === 12 ? prev.year + 1 : prev.year);
          }
        } else {
          expect(cur.day).toBe(prev.day + 1);
          expect(cur.monthLength).toBe(prev.monthLength);
        }
        prev = cur;
      }
      // 201 years hold roughly 74 leap months (7 per 19 years).
      expect(leapByYear.size).toBeGreaterThan(70);
      expect(leapByYear.size).toBeLessThan(78);
    },
    // Iterates every day in 1900–2100 to verify calendar structure; ~6s alone and several times slower under parallel load.
    30000,
  );
});

describe("boundaries", () => {
  it("01/01/1900 is 1/12/1899 (month 12 opens on the new moon 30 days before Tết 31/01/1900)", () => {
    const l = solarToLunar(1, 1, 1900);
    expect(l).toMatchObject({ day: 1, month: 12, year: 1899, isLeapMonth: false, monthLength: 30 });
    expect(lunarToSolar(1, 12, 1899, false)).toEqual({ day: 1, month: 1, year: 1900 });
  });

  it("31/12/2100 converts and round-trips", () => {
    const l = solarToLunar(31, 12, 2100);
    expect(l.year).toBe(2100);
    expect(lunarToSolar(l.day, l.month, l.year, l.isLeapMonth)).toEqual({ day: 31, month: 12, year: 2100 });
  });

  it("rejects dates outside 1900–2100", () => {
    expect(() => solarToLunar(31, 12, 1899)).toThrow(RangeError);
    expect(() => solarToLunar(1, 1, 2101)).toThrow(RangeError);
    expect(() => lunarToSolar(30, 11, 1899, false)).toThrow(RangeError);
  });

  it("rejects invalid dates", () => {
    expect(() => solarToLunar(29, 2, 2023)).toThrow(RangeError);
    expect(() => solarToLunar(0, 1, 2000)).toThrow(RangeError);
  });

  // Leap month 2 of Quý Mão 2023: 22/03/2023 – 19/04/2023 (29 days); 1/3 is 20/04/2023.
  it("first and last day of leap month 2/2023", () => {
    expect(solarToLunar(21, 3, 2023)).toMatchObject({ day: 30, month: 2, year: 2023, isLeapMonth: false });
    expect(solarToLunar(22, 3, 2023)).toMatchObject({ day: 1, month: 2, isLeapMonth: true, monthLength: 29 });
    expect(solarToLunar(19, 4, 2023)).toMatchObject({ day: 29, month: 2, isLeapMonth: true, monthLength: 29 });
    expect(solarToLunar(20, 4, 2023)).toMatchObject({ day: 1, month: 3, isLeapMonth: false });
    expect(lunarToSolar(29, 2, 2023, true)).toEqual({ day: 19, month: 4, year: 2023 });
    expect(() => lunarToSolar(30, 2, 2023, true)).toThrow(RangeError);
  });

  // Leap month 4 of Canh Tý 2020: 23/05/2020 – 20/06/2020; 1/5 is 21/06/2020 (annular solar eclipse day).
  it("first and last day of leap month 4/2020", () => {
    expect(solarToLunar(23, 5, 2020)).toMatchObject({ day: 1, month: 4, isLeapMonth: true });
    expect(solarToLunar(20, 6, 2020)).toMatchObject({ day: 29, month: 4, isLeapMonth: true, monthLength: 29 });
    expect(solarToLunar(21, 6, 2020)).toMatchObject({ day: 1, month: 5, isLeapMonth: false });
  });

  it("rejects a leap flag on a month that is not leap", () => {
    expect(() => lunarToSolar(1, 3, 2023, true)).toThrow(RangeError);
    expect(() => lunarToSolar(1, 1, 2024, true)).toThrow(RangeError);
  });
});

describe("day can chi monotonicity", () => {
  it("advances by exactly one step of the 60-cycle for 10,000 consecutive days", () => {
    const start = jdFromDate(1, 1, 1990);
    let prev = getDayInfo(jdToDate(start)).canChi.day.index;
    for (let jd = start + 1; jd < start + 10000; jd++) {
      const cur = getDayInfo(jdToDate(jd)).canChi.day.index;
      expect(cur).toBe((prev + 1) % 60);
      prev = cur;
    }
    // ~4.6s alone; the 5s default is too tight under parallel workspace load.
  }, 30000);
});
