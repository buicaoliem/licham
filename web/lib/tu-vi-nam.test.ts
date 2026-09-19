import { describe, expect, it } from "vitest";
import { CON_GIAP_LIST } from "./tu-vi";
import { tuViNamInfo, tuViNamParams } from "./tu-vi-nam";

describe("tử vi tuổi-năm", () => {
  it("không nhân 12 đoạn giống nhau — tuổi Tý và tuổi Ngọ năm 2026 khác luận", () => {
    const ty = CON_GIAP_LIST.find((c) => c.slug === "ty")!;
    const ngo = CON_GIAP_LIST.find((c) => c.slug === "ngo")!;
    const a = tuViNamInfo(ty, 2026);
    const b = tuViNamInfo(ngo, 2026);
    expect(a.canChiNam.name).toBe("Bính Ngọ");
    expect(a.quanHe).toBe("xung");
    expect(b.quanHe).toBe("trung");
    expect(a.luan).not.toBe(b.luan);
    expect(a.namTuoi).toBe(false);
    expect(b.namTuoi).toBe(true);
  });

  it("sinh đủ 12 giáp × khoảng năm site", () => {
    expect(tuViNamParams().length).toBe(12 * 10);
  });
});
