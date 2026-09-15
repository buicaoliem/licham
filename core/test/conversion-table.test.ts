/**
 * Hard-coded reference table for solar ⇄ lunar conversion.
 *
 * How the expected values were obtained (independently of this code):
 *  - TET: Tết Nguyên đán dates as published in Vietnamese / Chinese calendars.
 *    Tết is the day (UTC+7) of the new moon that starts lunar month 1. Where the
 *    UTC+7 and UTC+8 calendars differ, the Vietnamese date is used (1968, 1985, 2007
 *    are the well-known cases).
 *  - LEAP: first day of a leap month from published calendars.
 *  - ECLIPSE: a central solar eclipse can only happen at new moon, so its date
 *    (Vietnam time) is lunar day 1. Only eclipses whose maximum falls far from
 *    midnight in UTC+7 are used, so the day cannot be ambiguous.
 *  - MID_AUTUMN: Tết Trung thu (15/8) as published.
 */
import { describe, expect, it } from "vitest";
import { lunarToSolar, solarToLunar } from "../src";

type Row = [solar: string, lunarDay: number, lunarMonth: number, lunarYear: number, leap: boolean];

function parse(s: string): [number, number, number] {
  const [y, m, d] = s.split("-").map(Number);
  return [d!, m!, y!];
}

const TET: Row[] = [
  ["1900-01-31", 1, 1, 1900, false],
  ["1901-02-19", 1, 1, 1901, false],
  ["1910-02-10", 1, 1, 1910, false],
  ["1920-02-20", 1, 1, 1920, false],
  ["1930-01-30", 1, 1, 1930, false],
  ["1940-02-08", 1, 1, 1940, false],
  ["1950-02-17", 1, 1, 1950, false],
  ["1960-01-28", 1, 1, 1960, false],
  ["1968-01-29", 1, 1, 1968, false], // Mậu Thân: Vietnam UTC+7 (China: 30 Jan)
  ["1970-02-06", 1, 1, 1970, false],
  ["1976-01-31", 1, 1, 1976, false],
  ["1980-02-16", 1, 1, 1980, false],
  ["1985-01-21", 1, 1, 1985, false], // Ất Sửu: Vietnam (China: 20 Feb)
  ["1990-01-27", 1, 1, 1990, false],
  ["2000-02-05", 1, 1, 2000, false],
  ["2007-02-17", 1, 1, 2007, false], // Đinh Hợi: Vietnam (China: 18 Feb)
  ["2010-02-14", 1, 1, 2010, false],
  ["2015-02-19", 1, 1, 2015, false],
  ["2020-01-25", 1, 1, 2020, false],
  ["2024-02-10", 1, 1, 2024, false],
  ["2026-02-17", 1, 1, 2026, false],
  // Đối chiếu 4 nguồn lịch Việt, tháng 9/2026. Code đúng, đáp án cũ 03/02 là sai.
  ["2030-02-02", 1, 1, 2030, false],
  ["2040-02-12", 1, 1, 2040, false],
  ["2050-01-23", 1, 1, 2050, false],
  ["2060-02-02", 1, 1, 2060, false],
  ["2070-02-11", 1, 1, 2070, false],
  ["2080-01-22", 1, 1, 2080, false],
  ["2090-01-30", 1, 1, 2090, false],
  ["2100-02-09", 1, 1, 2100, false],
];

const LEAP: Row[] = [
  ["2004-03-21", 1, 2, 2004, true],
  ["2006-08-24", 1, 7, 2006, true],
  ["2012-05-21", 1, 4, 2012, true],
  ["2014-10-24", 1, 9, 2014, true],
  ["2017-07-23", 1, 6, 2017, true],
  ["2020-05-23", 1, 4, 2020, true],
  ["2023-03-22", 1, 2, 2023, true],
  ["2025-07-25", 1, 6, 2025, true],
];

/** [solar date, eclipse maximum in UTC, for the record] — lunar day must be 1. */
const ECLIPSE: [string, string][] = [
  ["1901-05-18", "05:33"],
  ["1919-05-29", "13:08"],
  ["1955-06-20", "04:10"],
  ["1973-06-30", "11:38"],
  ["1999-08-11", "11:03"],
  ["2009-07-22", "02:35"],
  ["2027-08-02", "10:07"],
  ["2030-11-25", "06:51"],
  ["2034-03-20", "10:18"],
  ["2035-09-02", "01:56"],
  ["2037-07-13", "02:40"],
  ["2041-04-30", "11:52"],
  ["2042-04-20", "02:17"],
  ["2046-08-02", "10:21"],
  ["2060-04-30", "10:10"],
  ["2063-08-24", "01:22"],
  ["2070-04-11", "02:36"],
];

const MID_AUTUMN: Row[] = [
  ["2024-09-17", 15, 8, 2024, false],
  ["2025-10-06", 15, 8, 2025, false],
  ["2026-09-25", 15, 8, 2026, false],
];

describe("solarToLunar / lunarToSolar against reference dates", () => {
  const rows = [...TET, ...LEAP, ...MID_AUTUMN];

  it("has at least 40 reference dates including 5 leap months", () => {
    expect(rows.length + ECLIPSE.length).toBeGreaterThanOrEqual(40);
    expect(LEAP.length).toBeGreaterThanOrEqual(5);
  });

  it.each(rows)("%s → %i/%i/%i leap=%s", (solar, ld, lm, ly, leap) => {
    const [d, m, y] = parse(solar);
    const lunar = solarToLunar(d, m, y);
    expect({ day: lunar.day, month: lunar.month, year: lunar.year, isLeapMonth: lunar.isLeapMonth }).toEqual({
      day: ld,
      month: lm,
      year: ly,
      isLeapMonth: leap,
    });
    expect(lunarToSolar(ld, lm, ly, leap)).toEqual({ day: d, month: m, year: y });
  });

  it.each(ECLIPSE)("solar eclipse %s (max %s UTC) is lunar day 1", (solar) => {
    const [d, m, y] = parse(solar);
    expect(solarToLunar(d, m, y).day).toBe(1);
  });
});

describe("tháng nhuận 1995", () => {
  // Đối chiếu 2 nguồn lịch Việt độc lập (tháng 9/2026): ngày 24/09/1995 là mùng 1
  // tháng 8 nhuận, ngày Mậu Ngọ; và 01/10/1995 là mùng 8 tháng 8 nhuận.
  // Code đúng, đáp án cũ 25/09 sai.
  it("1995-09-24 → 1/8/1995 leap=true", () => {
    const lunar = solarToLunar(24, 9, 1995);
    expect({ day: lunar.day, month: lunar.month, year: lunar.year, isLeapMonth: lunar.isLeapMonth }).toEqual({
      day: 1,
      month: 8,
      year: 1995,
      isLeapMonth: true,
    });
    expect(lunarToSolar(1, 8, 1995, true)).toEqual({ day: 24, month: 9, year: 1995 });
  });

  it("1995-10-01 → 8/8/1995 leap=true", () => {
    const lunar = solarToLunar(1, 10, 1995);
    expect({ day: lunar.day, month: lunar.month, year: lunar.year, isLeapMonth: lunar.isLeapMonth }).toEqual({
      day: 8,
      month: 8,
      year: 1995,
      isLeapMonth: true,
    });
  });

  it("prints all leap months found 1990-2000 for manual cross-check", () => {
    const rows: string[] = [];
    // Scan every solar day in range and record lunar day-1 occurrences of a leap month.
    const start = new Date(Date.UTC(1990, 0, 1));
    const end = new Date(Date.UTC(2000, 11, 31));
    for (let t = start.getTime(); t <= end.getTime(); t += 86_400_000) {
      const d = new Date(t);
      const day = d.getUTCDate();
      const month = d.getUTCMonth() + 1;
      const year = d.getUTCFullYear();
      const lunar = solarToLunar(day, month, year);
      if (lunar.isLeapMonth && lunar.day === 1) {
        rows.push(
          `| ${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year} | Tháng ${lunar.month} nhuận năm ${lunar.year} |`,
        );
      }
    }
    console.log("\nBảng tháng nhuận 1990-2000 (theo code hiện tại):");
    console.log("| Ngày dương lịch bắt đầu | Tháng âm lịch nhuận |");
    console.log("|---|---|");
    for (const row of rows) console.log(row);
    expect(rows.length).toBeGreaterThan(0);
  });
});
