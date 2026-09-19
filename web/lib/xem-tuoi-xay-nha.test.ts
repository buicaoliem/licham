import { canChiNamDuong } from "@licham/core";
import { describe, expect, it } from "vitest";
import { hoangOc, namPhamTamTai, tamTaiChiIndexes, xemTuoiXayNha } from "./xem-tuoi-xay-nha";

describe("Hoang Ốc", () => {
  it("tuổi mụ 1 là Nhất Cát, 6 là Lục Hoang Ốc, 7 lại Nhất Cát", () => {
    expect(hoangOc(1).name).toBe("Nhất Cát");
    expect(hoangOc(1).tot).toBe(true);
    expect(hoangOc(6).name).toBe("Lục Hoang Ốc");
    expect(hoangOc(6).tot).toBe(false);
    expect(hoangOc(7).name).toBe("Nhất Cát");
  });
});

describe("Tam tai", () => {
  it("tuổi Tý kỵ năm Dần Mão Thìn", () => {
    expect(tamTaiChiIndexes(0).slice()).toEqual([2, 3, 4]);
    expect(namPhamTamTai(0, canChiNamDuong(2026).chiIndex)).toBe(false);
    expect(namPhamTamTai(0, canChiNamDuong(2022).chiIndex)).toBe(true); // Nhâm Dần
  });
});

describe("xemTuoiXayNha", () => {
  it("năm tuổi trùng chi sinh", () => {
    const r = xemTuoiXayNha(1990, 2002);
    expect(r.namTuoi).toBe(true);
    expect(r.canChiSinh.chi).toBe(r.canChiXay.chi);
  });
});
