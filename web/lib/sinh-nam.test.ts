import { describe, expect, it } from "vitest";
import { sinhNamInfo } from "./sinh-nam";

describe("sinhNamInfo", () => {
  it("1990 là Canh Ngọ, mệnh theo năm chứ không gán chung tuổi Ngọ", () => {
    const info = sinhNamInfo(1990, 2026);
    expect(info.canChi.name).toBe("Canh Ngọ");
    expect(info.canChi.napAm.name).toBe("Lộ Bàng Thổ");
    expect(info.uniqueIntro).toContain("1990");
    expect(info.uniqueIntro).toContain("Canh Ngọ");
    expect(info.uniqueIntro).toContain("Lộ Bàng Thổ");
    expect(info.tuoiMuHienTai).toBe(37);
  });
});
