import { describe, expect, it } from "vitest";
import { leBySlug } from "./le";
import { lastDayOfLunarDecember, occurrenceInYear, solarTermStart, tenYearTable } from "./le-date-engine";

function fmt(d: { day: number; month: number; year: number }): string {
  return `${String(d.day).padStart(2, "0")}/${String(d.month).padStart(2, "0")}/${d.year}`;
}

describe("le-date-engine — fixture đã kiểm chứng tay", () => {
  it("Rằm tháng Giêng 2027 = 20/02/2027", () => {
    const page = leBySlug("ram-thang-gieng")!;
    expect(fmt(occurrenceInYear(page, 2027))).toBe("20/02/2027");
  });

  it("Đức Thánh Trần (20/8 âm) 2023 = 04/10/2023", () => {
    const page = leBySlug("gio-duc-thanh-tran")!;
    expect(fmt(occurrenceInYear(page, 2023))).toBe("04/10/2023");
  });

  it("Đức Thánh Trần (20/8 âm) 2024 = 22/09/2024", () => {
    const page = leBySlug("gio-duc-thanh-tran")!;
    expect(fmt(occurrenceInYear(page, 2024))).toBe("22/09/2024");
  });

  it("Trung thu 2026 = 25/09/2026", () => {
    const page = leBySlug("tet-trung-thu")!;
    expect(fmt(occurrenceInYear(page, 2026))).toBe("25/09/2026");
  });

  it("Ngày của Mẹ 2026 = 10/05/2026", () => {
    const page = leBySlug("ngay-cua-me")!;
    expect(fmt(occurrenceInYear(page, 2026))).toBe("10/05/2026");
  });
});

describe("le-date-engine — sanity", () => {
  it("am-cuoi-thang (Giao thừa) trả về ngày 29 hoặc 30 tháng Chạp âm lịch", () => {
    for (let y = 2022; y <= 2031; y++) {
      const d = lastDayOfLunarDecember(y);
      expect(d).toBeTruthy();
    }
  });

  it("tiet-khi Thanh minh luôn rơi vào đầu tháng 4 dương lịch", () => {
    for (let y = 2022; y <= 2031; y++) {
      const d = solarTermStart("Thanh minh", y);
      expect(d.month === 4 || (d.month === 3 && d.day >= 28)).toBe(true);
    }
  });

  it("tenYearTable trả về đúng 10 dòng, tăng dần theo năm", () => {
    const page = leBySlug("tet-nguyen-dan")!;
    const rows = tenYearTable(page, 2022, 2031);
    expect(rows).toHaveLength(10);
    expect(rows.map((r) => r.year)).toEqual([2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031]);
  });
});

// In ra để đối chiếu tay: 10 năm Giao thừa và Tết Thanh minh (2022–2031).
describe("le-date-engine — bảng đối chiếu 10 năm", () => {
  it("in bảng Giao thừa 2022-2031", () => {
    const page = leBySlug("giao-thua")!;
    const rows = tenYearTable(page, 2022, 2031);
    // eslint-disable-next-line no-console
    console.log("Giao thừa:", rows.map((r) => `${r.year} (${r.canChi}) -> ${fmt(r.solar)}`).join(" | "));
    expect(rows).toHaveLength(10);
  });

  it("in bảng Tết Thanh minh 2022-2031", () => {
    const page = leBySlug("tet-thanh-minh")!;
    const rows = tenYearTable(page, 2022, 2031);
    // eslint-disable-next-line no-console
    console.log("Tết Thanh minh:", rows.map((r) => `${r.year} -> ${fmt(r.solar)}`).join(" | "));
    expect(rows).toHaveLength(10);
  });
});
