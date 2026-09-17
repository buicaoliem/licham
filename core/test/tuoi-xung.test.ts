import { describe, expect, it } from "vitest";
import { canChiFromIndex, namSinhCoXung, xungNgay } from "../src";

describe("tuổi xung", () => {
  it("ngày Quý Tỵ: thiên khắc địa xung là Đinh Hợi", () => {
    // Quý Tỵ = index 29 trong 60 hoa giáp.
    const ngay = canChiFromIndex(29);
    expect(ngay.name).toBe("Quý Tỵ");
    const xung = xungNgay(ngay);
    expect(xung).toHaveLength(5);
    expect(xung.every((x) => x.canChi.chiIndex === 11)).toBe(true); // đều là chi Hợi
    const nang = xung.filter((x) => x.isThienKhacDiaXung);
    expect(nang).toHaveLength(1);
    expect(nang[0]!.canChi.name).toBe("Đinh Hợi");
  });

  it("ngày Giáp Tý: thiên khắc địa xung là Canh Ngọ", () => {
    const ngay = canChiFromIndex(0);
    expect(ngay.name).toBe("Giáp Tý");
    const xung = xungNgay(ngay);
    expect(xung).toHaveLength(5);
    const nang = xung.filter((x) => x.isThienKhacDiaXung);
    expect(nang).toHaveLength(1);
    expect(nang[0]!.canChi.name).toBe("Canh Ngọ");
  });

  it("mỗi ngày trong 60 hoa giáp có đúng 5 can chi xung chi, 0 hoặc 1 thiên khắc địa xung", () => {
    for (let i = 0; i < 60; i++) {
      const ngay = canChiFromIndex(i);
      const xung = xungNgay(ngay);
      expect(xung).toHaveLength(5);
      const nangCount = xung.filter((x) => x.isThienKhacDiaXung).length;
      expect(nangCount === 0 || nangCount === 1).toBe(true);
      // Mậu và Kỷ không có can xung, nên không bao giờ có thiên khắc địa xung.
      if (ngay.canIndex === 4 || ngay.canIndex === 5) {
        expect(nangCount).toBe(0);
      }
    }
  });

  it("sinh 15/06/1995 (Ất Hợi) xung chi với ngày Quý Tỵ, nhưng không thiên khắc địa xung", () => {
    const ngay = canChiFromIndex(29); // Quý Tỵ
    expect(namSinhCoXung({ day: 15, month: 6, year: 1995 }, ngay)).toBe("xung-chi");
  });

  it("sinh 15/06/1990 (Canh Ngọ) thiên khắc địa xung với ngày Giáp Tý", () => {
    const ngay = canChiFromIndex(0); // Giáp Tý
    expect(namSinhCoXung({ day: 15, month: 6, year: 1990 }, ngay)).toBe("thien-khac-dia-xung");
  });

  it("sinh không cùng chi xung thì không xung", () => {
    const ngay = canChiFromIndex(0); // Giáp Tý, xung chi là Ngọ
    expect(namSinhCoXung({ day: 15, month: 6, year: 1985 }, ngay)).toBe("khong-xung"); // 1985 = Ất Sửu
  });

  it("sinh trước Tết tính đúng theo can chi năm âm, không lấy thẳng năm dương", () => {
    // 15/01/1995 thực ra là năm Giáp Tuất — xung chi với ngày Mậu Thìn (chi Thìn xung Tuất).
    const ngayMauThin = canChiFromIndex(4); // Mậu Thìn
    expect(namSinhCoXung({ day: 15, month: 1, year: 1995 }, ngayMauThin)).not.toBe("khong-xung");
  });
});
