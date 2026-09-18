import { canChiFromIndex, canChiNamDuong } from "@licham/core";
import { describe, expect, it } from "vitest";
import {
  ALL_CAN_CHI,
  CHI_LIST,
  assertNoSlugCollision,
  birthYearsForCanChi,
  birthYearsForChi,
  canChiBySlug,
  canChiSlug,
  chiBySlug,
  hopMenh,
  hopTuoiChi,
  kyTuoiChi,
  namDangLuuY,
  nextYearForChi,
  soTuoi,
  validateNapAmCoverage,
  xungTrongNam,
} from "./tuoi";

describe("dữ liệu 12 con giáp và 60 can chi", () => {
  it("có đúng 12 chi với slug không trùng nhau", () => {
    expect(CHI_LIST).toHaveLength(12);
    expect(new Set(CHI_LIST.map((c) => c.slug)).size).toBe(12);
    expect(chiBySlug("ty")?.ten).toBe("Tý");
    expect(chiBySlug("ty-ran")?.ten).toBe("Tỵ");
  });

  it("có đúng 60 can chi với slug không trùng nhau, và không trùng slug con giáp", () => {
    expect(ALL_CAN_CHI).toHaveLength(60);
    expect(() => assertNoSlugCollision()).not.toThrow();
    expect(canChiSlug(canChiFromIndex(0))).toBe("giap-ty");
    expect(canChiBySlug("giap-ty")?.name).toBe("Giáp Tý");
  });

  it("mọi mệnh nạp âm mà lõi lịch sinh ra đều có dòng mô tả", () => {
    expect(() => validateNapAmCoverage()).not.toThrow();
  });
});

describe("các mốc yêu cầu trong đặc tả", () => {
  it("1984 là năm Giáp Tý, mệnh Hải Trung Kim, hành Kim", () => {
    const cc = canChiNamDuong(1984);
    expect(cc.name).toBe("Giáp Tý");
    expect(cc.napAm.name).toBe("Hải Trung Kim");
    expect(cc.napAm.element).toBe("Kim");
  });

  it("2020 là năm Canh Tý, mệnh Bích Thượng Thổ", () => {
    const cc = canChiNamDuong(2020);
    expect(cc.name).toBe("Canh Tý");
    expect(cc.napAm.name).toBe("Bích Thượng Thổ");
  });

  it("chi của năm 2026 là Ngọ, và 2026 là năm xung với tuổi Tý", () => {
    const cc2026 = canChiNamDuong(2026);
    expect(cc2026.chi).toBe("Ngọ");
    const tyGiap = canChiFromIndex(0); // Giáp Tý
    expect(xungTrongNam(tyGiap, 2026)).not.toBe("khong-xung");
  });
});

describe("hợp kỵ và mệnh", () => {
  it("hợp/kỵ tuổi Tý khớp với mock: hợp Thân, Thìn, Sửu — kỵ Ngọ, Mùi", () => {
    expect(hopTuoiChi(0).sort((a, b) => a - b)).toEqual([1, 8, 4].sort((a, b) => a - b));
    expect(kyTuoiChi(0).sort((a, b) => a - b)).toEqual([6, 7].sort((a, b) => a - b));
  });

  it("mệnh Kim: hợp màu vàng/nâu đất và trắng/xám, tránh đỏ/hồng/tím", () => {
    const h = hopMenh("Kim");
    expect(h.sinhRa).toBe("Thổ");
    expect(h.sinhBoi).toBe("Thủy");
    expect(h.khacBoi).toBe("Hỏa");
    expect(h.mauHop).toEqual(expect.arrayContaining(["vàng", "nâu đất", "trắng", "xám", "bạc"]));
    expect(h.mauTranh).toEqual(["đỏ", "hồng", "tím"]);
  });
});

describe("năm sinh và số tuổi", () => {
  it("birthYearsForChi trả về các năm giảm dần theo thời gian, cách nhau 12 năm", () => {
    const years = birthYearsForChi(0, 2026, 6);
    expect(years).toHaveLength(6);
    for (let i = 1; i < years.length; i++) {
      expect(years[i]! - years[i - 1]!).toBe(12);
    }
    expect(years.at(-1)).toBeLessThanOrEqual(2026);
  });

  it("birthYearsForCanChi trả về đúng 3 năm cách nhau 60 năm cho Giáp Tý", () => {
    const [prev, recent, next] = birthYearsForCanChi(0, 2026);
    expect(recent).toBe(1984);
    expect(prev).toBe(1924);
    expect(next).toBe(2044);
  });

  it("soTuoi tính đúng bằng năm hiện tại trừ năm sinh", () => {
    expect(soTuoi(1984, 2026)).toBe(42);
  });
});

describe("năm đáng lưu ý", () => {
  it("trả về 4 năm tương lai gần nhất, tăng dần, phủ đủ 3 nhãn", () => {
    const years = namDangLuuY(0, 2026); // tuổi Tý
    expect(years).toHaveLength(4);
    for (let i = 1; i < years.length; i++) expect(years[i]!.year).toBeGreaterThan(years[i - 1]!.year);
    expect(years.every((y) => y.year > 2026)).toBe(true);
    expect(new Set(years.map((y) => y.nhan))).toEqual(new Set(["xung", "tam-hop", "nam-tuoi"]));
  });

  it("nextYearForChi tìm đúng năm Ngọ đầu tiên sau 2026", () => {
    expect(nextYearForChi(6, 2020)).toBe(2026);
  });
});
