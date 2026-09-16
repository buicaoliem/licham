import { describe, expect, it } from "vitest";
import { NHI_THAP_BAT_TU_STARS, getDayInfo } from "../src";

describe("Nhị thập bát tú", () => {
  it("16/09/2026 ra Chẩn", () => {
    const info = getDayInfo({ day: 16, month: 9, year: 2026 });
    expect(info.nhiThapBatTu).toEqual({ name: "Chẩn", isGood: true });
  });

  it("15/09/2026 ra Dực", () => {
    const info = getDayInfo({ day: 15, month: 9, year: 2026 });
    expect(info.nhiThapBatTu).toEqual({ name: "Dực", isGood: false });
  });

  it("17/09/2026 ra Giác (quay vòng về đầu bảng)", () => {
    const info = getDayInfo({ day: 17, month: 9, year: 2026 });
    expect(info.nhiThapBatTu).toEqual({ name: "Giác", isGood: true });
  });

  it("chạy đúng chu kỳ 28 ngày liên tiếp, không nhảy không lặp, trong 100 ngày", () => {
    let prevIndex = NHI_THAP_BAT_TU_STARS.findIndex((s) => s.name === "Chẩn"); // 16/09/2026
    for (let i = 1; i <= 100; i++) {
      const d = new Date(Date.UTC(2026, 8, 16 + i));
      const info = getDayInfo({ day: d.getUTCDate(), month: d.getUTCMonth() + 1, year: d.getUTCFullYear() });
      const expectedIndex = (prevIndex + 1) % 28;
      const actualIndex = NHI_THAP_BAT_TU_STARS.findIndex((s) => s.name === info.nhiThapBatTu?.name);
      expect(actualIndex, `ngày thứ ${i} sau mốc`).toBe(expectedIndex);
      prevIndex = actualIndex;
    }
  });
});
