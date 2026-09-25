import { describe, expect, it } from "vitest";
import { moonInfo, phaseName } from "./moon";

describe("moon", () => {
  it("đặt tên pha theo góc", () => {
    expect(phaseName(2)).toBe("Trăng non");
    expect(phaseName(358)).toBe("Trăng non");
    expect(phaseName(90)).toBe("Thượng huyền");
    expect(phaseName(180)).toBe("Trăng tròn");
    expect(phaseName(270)).toBe("Hạ huyền");
    expect(phaseName(230)).toBe("Trăng khuyết dần");
  });

  it("rằm tháng Tám 2025 (06/10/2025): gần tròn, mọc chiều tối", () => {
    const m = moonInfo({ day: 6, month: 10, year: 2025 }, new Date("2025-10-06T14:00:00Z"));
    expect(m.illuminatedPercent).toBeGreaterThanOrEqual(98);
    expect(m.moonrise?.hhmm).toMatch(/^1[6-8]:/);
  });

  it("mùng một (21/09/2025, trăng non): rất ít sáng", () => {
    const m = moonInfo({ day: 21, month: 9, year: 2025 });
    expect(m.illuminatedPercent).toBeLessThan(5);
  });
});
