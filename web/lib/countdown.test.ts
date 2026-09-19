import { describe, expect, it } from "vitest";
import { COUNTDOWN_LIST, countdownBySlug, countdownState } from "./countdown";

describe("countdown", () => {
  it("có Tết, Vu Lan, Trung thu", () => {
    expect(COUNTDOWN_LIST.map((c) => c.slug)).toEqual(["tet", "vu-lan", "trung-thu"]);
  });

  it("Tết 2026 rơi 17/02, còn đúng số ngày từ 01/01/2026", () => {
    const def = countdownBySlug("tet")!;
    const state = countdownState(def, { day: 1, month: 1, year: 2026 });
    expect(state.target).toEqual({ day: 17, month: 2, year: 2026 });
    expect(state.daysLeft).toBe(47);
    expect(state.lunarDay).toBe(1);
    expect(state.lunarMonth).toBe(1);
  });
});
