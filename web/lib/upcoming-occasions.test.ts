import { describe, expect, it } from "vitest";
import { getUpcomingOccasions } from "./upcoming-occasions";

describe("getUpcomingOccasions", () => {
  it("mùng một / rằm trỏ /ngay/, Tết trỏ countdown", () => {
    const list = getUpcomingOccasions({ day: 16, month: 2, year: 2026 });
    expect(list.length).toBe(4);
    const mungMot = list.find((o) => o.label === "Mùng một âm lịch");
    expect(mungMot?.href).toMatch(/^\/ngay\/\d{2}-\d{2}-\d{4}$/);
    const tet = list.find((o) => o.label === "Tết Nguyên đán");
    expect(tet?.href).toBe("/countdown/tet");
  });
});
