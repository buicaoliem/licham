import { describe, expect, it } from "vitest";
import { canChiNamDuong, canChiNamSinh, solarToLunar } from "../src";

describe("can chi năm sinh", () => {
  it("15/01/1995 là Giáp Tuất, không phải Ất Hợi (sinh trước Tết)", () => {
    expect(canChiNamSinh(15, 1, 1995).name).toBe("Giáp Tuất");
  });

  it("15/06/1995 là Ất Hợi", () => {
    expect(canChiNamSinh(15, 6, 1995).name).toBe("Ất Hợi");
  });

  it("31/01/1995 (đúng mùng 1 Tết Ất Hợi) là Ất Hợi", () => {
    const lunar = solarToLunar(31, 1, 1995);
    expect(lunar).toMatchObject({ day: 1, month: 1 });
    expect(canChiNamSinh(31, 1, 1995).name).toBe("Ất Hợi");
  });

  it("30/01/1995 (hôm trước Tết) là Giáp Tuất", () => {
    expect(canChiNamSinh(30, 1, 1995).name).toBe("Giáp Tuất");
  });

  it("ngày đầu năm âm là mốc đổi can chi, thử với 5 năm bất kỳ", () => {
    const years = [1990, 2000, 2010, 2020, 2026];
    for (const year of years) {
      // Tìm ngày dương lịch của mùng 1 Tết năm đó bằng cách dò quanh cuối tháng 1 - giữa tháng 2.
      let tetSolarDay: { day: number; month: number; year: number } | null = null;
      for (let month = 1; month <= 2; month++) {
        for (let day = 1; day <= 28; day++) {
          const lunar = solarToLunar(day, month, year);
          if (lunar.day === 1 && lunar.month === 1 && !lunar.isLeapMonth) {
            tetSolarDay = { day, month, year };
          }
        }
      }
      expect(tetSolarDay).not.toBeNull();
      const { day, month, year: y } = tetSolarDay!;

      const canChiTet = canChiNamSinh(day, month, y);
      const canChiHomTruoc = day > 1 ? canChiNamSinh(day - 1, month, y) : canChiNamSinh(31, month - 1, y);

      expect(canChiTet.name).not.toBe(canChiHomTruoc.name);
    }
  });

  it("canChiNamDuong ước lượng theo năm dương, khác với can chi năm sinh chính xác khi sinh trước Tết", () => {
    expect(canChiNamDuong(1995).name).toBe("Ất Hợi");
    expect(canChiNamSinh(15, 1, 1995).name).toBe("Giáp Tuất");
  });
});
