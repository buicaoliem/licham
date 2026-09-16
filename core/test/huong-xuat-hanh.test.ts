import { describe, expect, it } from "vitest";
import { getDayInfo } from "../src";

describe("Hỷ thần và Tài thần", () => {
  it("ngày Canh Thân (mùng 1 Tết Bính Thân, 08/02/2016) ra Hỷ thần Tây Bắc, Tài thần Tây Nam", () => {
    const info = getDayInfo({ day: 8, month: 2, year: 2016 });
    expect(info.canChi.day.name).toBe("Canh Thân");
    expect(info.hyThan).toEqual({ direction: "Tây Bắc" });
    expect(info.taiThan).toEqual({ direction: "Tây Nam" });
  });
});
