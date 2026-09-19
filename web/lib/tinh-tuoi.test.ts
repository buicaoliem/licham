import { canChiNamSinh, solarToLunar } from "@licham/core";
import { describe, expect, it } from "vitest";
import { calendarDiff, computeAge, nextBirthdayOn } from "./tinh-tuoi";

describe("computeAge", () => {
  it("sinh trước Tết 1990 thuộc năm âm 1989, tuổi mụ 2 vào 01/03/1990", () => {
    const r = computeAge({ day: 20, month: 1, year: 1990 }, { day: 1, month: 3, year: 1990 });
    expect(solarToLunar(27, 1, 1990).day).toBe(1);
    expect(r.lunarBirthYear).toBe(1989);
    expect(r.canChi.name).toBe(canChiNamSinh(20, 1, 1990).name);
    expect(r.canChi.name).toBe("Kỷ Tỵ");
    expect(r.tuoiMu).toBe(2);
    expect(r.years).toBe(0);
    expect(r.months).toBe(1);
    expect(r.days).toBe(9);
  });

  it("sinh sau Tết 1990 thuộc năm Canh Ngọ", () => {
    const r = computeAge({ day: 5, month: 2, year: 1990 }, { day: 5, month: 2, year: 1990 });
    expect(r.lunarBirthYear).toBe(1990);
    expect(r.canChi.name).toBe("Canh Ngọ");
    expect(r.tuoiMu).toBe(1);
    expect(r.years).toBe(0);
  });

  it("sinh nhật 29/2 năm không nhuận rơi 28/2", () => {
    const next = nextBirthdayOn({ day: 29, month: 2, year: 2000 }, { day: 1, month: 3, year: 2023 });
    expect(next).toEqual({ day: 29, month: 2, year: 2024 });
    const nextNonLeap = nextBirthdayOn({ day: 29, month: 2, year: 2000 }, { day: 1, month: 1, year: 2023 });
    expect(nextNonLeap).toEqual({ day: 28, month: 2, year: 2023 });
  });

  it("không nhận ngày sinh sau ngày tính", () => {
    expect(() => computeAge({ day: 2, month: 1, year: 2000 }, { day: 1, month: 1, year: 2000 })).toThrow(
      "Ngày sinh không thể sau ngày đang tính.",
    );
  });
});

describe("calendarDiff", () => {
  it("kẹp đúng cuối tháng", () => {
    expect(calendarDiff({ day: 31, month: 1, year: 2020 }, { day: 1, month: 3, year: 2020 })).toEqual({
      years: 0,
      months: 1,
      days: 1,
    });
  });
});
