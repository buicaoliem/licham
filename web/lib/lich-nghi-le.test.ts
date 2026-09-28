import { describe, expect, it } from "vitest";
import { NGHI_LE_YEAR_END, NGHI_LE_YEAR_START, nghiLeCuaNam } from "./lich-nghi-le";

describe("nghiLeCuaNam — danh mục theo năm dương không lẫn ngày thuộc năm khác", () => {
  it.each([2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031])("mọi dòng của năm %i đều có solar.year đúng bằng %i", (year) => {
    const rows = nghiLeCuaNam(year);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) expect(r.solar.year).toBe(year);
  });

  it("không có dịp nào bị trùng lặp hoặc bỏ sót khi đi hết toàn bộ phạm vi năm được hỗ trợ", () => {
    for (let y = NGHI_LE_YEAR_START; y <= NGHI_LE_YEAR_END; y++) {
      const rows = nghiLeCuaNam(y);
      const slugs = rows.map((r) => r.page.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});
