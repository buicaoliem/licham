import { describe, expect, it } from "vitest";
import {
  canChiFromIndex,
  canChiOfDay,
  canChiOfHours,
  canChiOfMonth,
  canChiOfYear,
  getDayInfo,
  jdFromDate,
} from "../src";

describe("can chi", () => {
  // 01/01/2000 (JD 2451545) is widely published as ngày Mậu Ngọ.
  it("day: 01/01/2000 is Mậu Ngọ", () => {
    expect(canChiOfDay(jdFromDate(1, 1, 2000)).name).toBe("Mậu Ngọ");
  });

  // Year can = (year + 6) mod 10, chi = (year + 8) mod 12; 1984 is the start of a hoa giáp.
  it("year", () => {
    expect(canChiOfYear(1984).name).toBe("Giáp Tý");
    expect(canChiOfYear(1900).name).toBe("Canh Tý");
    expect(canChiOfYear(2026).name).toBe("Bính Ngọ");
    expect(canChiOfYear(2100).name).toBe("Canh Thân");
  });

  // "Ngũ hổ độn": Giáp/Kỷ → tháng Giêng Bính Dần, Ất/Canh → Mậu Dần, Bính/Tân → Canh Dần,
  // Đinh/Nhâm → Nhâm Dần, Mậu/Quý → Giáp Dần.
  it("month follows ngũ hổ độn", () => {
    expect(canChiOfMonth(1, 1984).name).toBe("Bính Dần");
    expect(canChiOfMonth(1, 1985).name).toBe("Mậu Dần");
    expect(canChiOfMonth(1, 2026).name).toBe("Canh Dần");
    expect(canChiOfMonth(1, 2027).name).toBe("Nhâm Dần");
    expect(canChiOfMonth(1, 2028).name).toBe("Giáp Dần");
    expect(canChiOfMonth(12, 2026).name).toBe("Tân Sửu");
  });

  it("a leap month keeps the can chi of the month it repeats", () => {
    const leap = getDayInfo({ day: 1, month: 4, year: 2023 }); // 11/2 nhuận Quý Mão
    expect(leap.lunar.isLeapMonth).toBe(true);
    expect(leap.canChi.month.name).toBe(canChiOfMonth(2, 2023).name);
  });

  // "Ngũ thử độn": Giáp/Kỷ day → giờ Tý is Giáp Tý, Ất/Canh → Bính Tý, Bính/Tân → Mậu Tý,
  // Đinh/Nhâm → Canh Tý, Mậu/Quý → Nhâm Tý.
  it("hours follow ngũ thử độn", () => {
    const expected = ["Giáp Tý", "Bính Tý", "Mậu Tý", "Canh Tý", "Nhâm Tý"];
    for (let can = 0; can < 10; can++) {
      const hours = canChiOfHours(can);
      expect(hours).toHaveLength(12);
      expect(hours[0]!.canChi.name).toBe(expected[can % 5]);
      expect(hours[0]).toMatchObject({ start: "23:00", end: "01:00" });
      expect(hours[11]).toMatchObject({ start: "21:00", end: "23:00" });
      hours.forEach((h, i) => expect(h.canChi.chiIndex).toBe(i));
    }
  });

  it("nạp âm", () => {
    expect(canChiFromIndex(0).napAm).toEqual({ name: "Hải Trung Kim", element: "Kim" }); // Giáp Tý
    expect(canChiFromIndex(1).napAm.name).toBe("Hải Trung Kim"); // Ất Sửu
    expect(canChiOfYear(1990).napAm.name).toBe("Lộ Bàng Thổ"); // Canh Ngọ
    expect(canChiOfYear(2026).napAm.name).toBe("Thiên Hà Thủy"); // Bính Ngọ
    expect(canChiFromIndex(59).napAm.name).toBe("Đại Hải Thủy"); // Quý Hợi
  });

  it("the 60-cycle names are all distinct", () => {
    const names = new Set(Array.from({ length: 60 }, (_, i) => canChiFromIndex(i).name));
    expect(names.size).toBe(60);
  });
});
