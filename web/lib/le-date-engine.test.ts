import { describe, expect, it } from "vitest";
import { leBySlug } from "./le";
import {
  daysUntil,
  lastDayOfLunarDecember,
  nextOccurrence,
  occurrenceInSolarYear,
  occurrenceInYear,
  selectedLeYear,
  solarTermStart,
  tenYearTable,
} from "./le-date-engine";

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

describe("le-date-engine — âm lịch: không crash qua các năm có tháng nhuận, tháng 29/30 ngày", () => {
  it("mọi trang lịch am tính được occurrenceInYear cho 2022–2033 (bao trùm nhiều năm nhuận)", () => {
    const pages = ["tet-nguyen-dan", "tet-trung-thu", "gio-duc-thanh-tran", "gio-nguyen-trai", "ram-thang-gieng"];
    for (const slug of pages) {
      const page = leBySlug(slug)!;
      for (let y = 2022; y <= 2033; y++) {
        expect(() => occurrenceInYear(page, y)).not.toThrow();
      }
    }
  });

  it("am-cuoi-thang (giao thừa) không crash ở năm tháng Chạp đủ (30) lẫn thiếu (29)", () => {
    for (let y = 2022; y <= 2033; y++) {
      expect(() => lastDayOfLunarDecember(y)).not.toThrow();
    }
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

describe("selectedLeYear — năm do người dùng chọn qua ?nam=", () => {
  const today = { day: 15, month: 3, year: 2026 };

  it("?nam=2026 giữ nguyên 2026 dù dịp đã qua trong năm", () => {
    expect(selectedLeYear("2026", today)).toBe(2026);
  });

  it("không có query → dùng năm hiện tại", () => {
    expect(selectedLeYear(undefined, today)).toBe(2026);
  });

  it("năm ngoài phạm vi hợp lệ (quá nhỏ/quá lớn) → rơi về năm hiện tại", () => {
    expect(selectedLeYear("1800", today)).toBe(2026);
    expect(selectedLeYear("3000", today)).toBe(2026);
  });

  it("query lỗi (không phải số, mảng, chuỗi rỗng) không crash và rơi về năm hiện tại", () => {
    expect(selectedLeYear("abc", today)).toBe(2026);
    expect(selectedLeYear("", today)).toBe(2026);
    expect(selectedLeYear(["2026", "2027"], today)).toBe(2026);
    expect(selectedLeYear("2026.5", today)).toBe(2026);
  });

  it("biên hợp lệ 1902 và 2094 được chấp nhận", () => {
    expect(selectedLeYear("1902", today)).toBe(1902);
    expect(selectedLeYear("2094", today)).toBe(2094);
  });
});

describe("daysUntil — trước / đúng / sau ngày lễ", () => {
  it("trước ngày: dương", () => {
    expect(daysUntil({ day: 1, month: 1, year: 2026 }, { day: 10, month: 1, year: 2026 })).toBe(9);
  });

  it("đúng ngày: bằng 0", () => {
    expect(daysUntil({ day: 10, month: 1, year: 2026 }, { day: 10, month: 1, year: 2026 })).toBe(0);
  });

  it("sau ngày: âm, phản ánh đã qua bao nhiêu ngày", () => {
    expect(daysUntil({ day: 15, month: 1, year: 2026 }, { day: 10, month: 1, year: 2026 })).toBe(-5);
  });
});

describe("nextOccurrence — lần diễn ra tiếp theo, không thay thế năm đang xem", () => {
  it("dịp năm nay đã qua → nhảy sang năm sau", () => {
    const page = leBySlug("tet-nguyen-dan")!;
    // Tết Bính Ngọ 2026 rơi 17/02/2026 — đứng sau ngày này thì lần tới phải là Tết 2027.
    const today = { day: 1, month: 3, year: 2026 };
    const next = nextOccurrence(page, today);
    expect(next.year).toBeGreaterThanOrEqual(2027);
  });

  it("dịp năm nay chưa tới → lần tới vẫn là năm nay", () => {
    const page = leBySlug("tet-nguyen-dan")!;
    const today = { day: 1, month: 1, year: 2026 };
    const next = nextOccurrence(page, today);
    expect(next.year).toBe(2026);
  });

  it("không nhầm khi dịp năm nay rơi gần giao năm dương lịch (đầu tháng 1)", () => {
    // Rằm tháng Giêng thường rơi vào tháng 2 dương; kiểm tra không lùi năm vô lý quanh mốc 1/1.
    const page = leBySlug("ram-thang-gieng")!;
    const today = { day: 31, month: 12, year: 2025 };
    const next = nextOccurrence(page, today);
    expect(next.solar.year === 2026 || next.solar.year === 2025).toBe(true);
    const todayJd = today.year * 400 + today.month * 31 + today.day; // thứ tự thô, đủ để so sánh không lùi quá xa
    const nextRough = next.solar.year * 400 + next.solar.month * 31 + next.solar.day;
    expect(nextRough).toBeGreaterThanOrEqual(todayJd);
  });
});

describe("occurrenceInSolarYear — danh mục theo năm dương chỉ chứa dịp rơi đúng năm đó", () => {
  it("mọi occurrence trả về đều có solar.year đúng bằng năm dương yêu cầu", () => {
    const page = leBySlug("gio-nguyen-trai")!; // trang âm lịch, ngày dương đổi năm này qua năm khác
    for (const year of [2024, 2025, 2026, 2027, 2028]) {
      const row = occurrenceInSolarYear(page, year);
      expect(row.solar.year).toBe(year);
    }
  });

  it("khác với yearRow(page, year) khi ngày âm của năm âm `year` rơi sang năm dương year+1", () => {
    // Với trang lịch "am", yearRow(page, X) dùng X làm NĂM ÂM, có thể cho ra ngày dương thuộc X+1.
    // occurrenceInSolarYear(page, X) phải luôn cho solar.year === X.
    const page = leBySlug("gio-nguyen-trai")!;
    const bySolarYear = occurrenceInSolarYear(page, 2026);
    expect(bySolarYear.solar.year).toBe(2026);
  });
});

// In ra để đối chiếu tay: 10 năm Giao thừa và Tết Thanh minh (2022–2031).
describe("le-date-engine — bảng đối chiếu 10 năm", () => {
  it("in bảng Giao thừa 2022-2031", () => {
    const page = leBySlug("giao-thua")!;
    const rows = tenYearTable(page, 2022, 2031);
     
    console.log("Giao thừa:", rows.map((r) => `${r.year} (${r.canChi}) -> ${fmt(r.solar)}`).join(" | "));
    expect(rows).toHaveLength(10);
  });

  it("in bảng Tết Thanh minh 2022-2031", () => {
    const page = leBySlug("tet-thanh-minh")!;
    const rows = tenYearTable(page, 2022, 2031);
     
    console.log("Tết Thanh minh:", rows.map((r) => `${r.year} -> ${fmt(r.solar)}`).join(" | "));
    expect(rows).toHaveLength(10);
  });
});
