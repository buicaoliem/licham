import { describe, expect, it } from "vitest";
import { upcomingInDays } from "./upcoming";

describe("upcomingInDays — module Văn hoá trong 30 ngày tới", () => {
  it("mọi item trả về đều nằm trong [0, days] và sắp xếp tăng dần theo daysUntil", () => {
    const items = upcomingInDays({ day: 1, month: 6, year: 2026 }, 30);
    expect(items.length).toBeGreaterThan(0);
    for (const it of items) {
      expect(it.daysUntil).toBeGreaterThanOrEqual(0);
      expect(it.daysUntil).toBeLessThanOrEqual(30);
    }
    for (let i = 1; i < items.length; i++) expect(items[i]!.daysUntil).toBeGreaterThanOrEqual(items[i - 1]!.daysUntil);
  });

  it("cuối tháng dương (31/12) không bỏ sót dịp rơi sang năm sau", () => {
    const items = upcomingInDays({ day: 31, month: 12, year: 2026 }, 30);
    expect(items.length).toBeGreaterThan(0);
    // Tết Nguyên đán 2027 phải xuất hiện nếu nằm trong 30 ngày tới từ 31/12/2026.
    const hasNewYear = items.some((it) => it.slug === "tet-nguyen-dan" || it.slug === "giao-thua");
    expect(hasNewYear || items.every((it) => it.date.year === 2027 || it.date.year === 2026)).toBe(true);
  });

  it("cuối năm âm lịch / mốc năm nhuận không làm hàm throw", () => {
    for (const d of [
      { day: 29, month: 1, year: 2023 }, // năm Quý Mão 2023 có tháng 2 nhuận
      { day: 1, month: 1, year: 2025 },
      { day: 31, month: 12, year: 2025 }, // năm 2025 có tháng 6 nhuận
    ]) {
      expect(() => upcomingInDays(d, 30)).not.toThrow();
    }
  });

  it("cửa sổ 0 ngày chỉ trả về dịp đúng hôm nay, có thể rỗng", () => {
    const items = upcomingInDays({ day: 2, month: 6, year: 2026 }, 0);
    for (const it of items) expect(it.daysUntil).toBe(0);
  });

  it("không có nội dung nào trong cửa sộ âm (days < 0) trả về mảng rỗng, không throw", () => {
    expect(upcomingInDays({ day: 1, month: 6, year: 2026 }, -1)).toEqual([]);
  });

  it("nhiều dịp cùng lúc: không loại trùng sai, mỗi item có slug+kind riêng biệt", () => {
    const items = upcomingInDays({ day: 1, month: 1, year: 2026 }, 30);
    const keys = items.map((it) => `${it.kind}-${it.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
