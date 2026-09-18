import { describe, expect, it } from "vitest";
import {
  bangNamCuoiToi,
  capNamSinhTrongPhamVi,
  kimLau,
  mucDoHopNhau,
  parseKetHonSlug,
  tinhKetHonPairInfo,
  tuoiMu,
  xepLoaiChiPair,
  xepLoaiNapAmPair,
} from "./xem-tuoi-ket-hon";

describe("tuoiMu", () => {
  it("tính tuổi mụ = năm xem - năm sinh + 1", () => {
    expect(tuoiMu(2026, 2000)).toBe(27);
    expect(tuoiMu(2000, 2000)).toBe(1);
  });

  it("hai người cùng năm sinh có cùng tuổi mụ", () => {
    expect(tuoiMu(2026, 1995)).toBe(tuoiMu(2026, 1995));
  });
});

describe("kimLau", () => {
  it("dư 1 -> Kim Lâu Thân", () => {
    expect(kimLau(1)).toEqual({ phamKimLau: true, loai: "Kim Lâu Thân" });
  });
  it("dư 3 -> Kim Lâu Thê", () => {
    expect(kimLau(3)).toEqual({ phamKimLau: true, loai: "Kim Lâu Thê" });
  });
  it("dư 6 -> Kim Lâu Tử", () => {
    expect(kimLau(6)).toEqual({ phamKimLau: true, loai: "Kim Lâu Tử" });
  });
  it("dư 8 -> Kim Lâu Súc", () => {
    expect(kimLau(8)).toEqual({ phamKimLau: true, loai: "Kim Lâu Súc" });
  });
  it("dư 0, 2, 4, 5, 7 -> không phạm", () => {
    for (const du of [0, 2, 4, 5, 7]) {
      expect(kimLau(du)).toEqual({ phamKimLau: false, loai: null });
    }
  });
  it("tuổi mụ chia hết cho 9 (dư 0) -> không phạm — biên tuổi 18, 27, 36", () => {
    expect(kimLau(18).phamKimLau).toBe(false);
    expect(kimLau(27).phamKimLau).toBe(false);
    expect(kimLau(36).phamKimLau).toBe(false);
  });
  it("tuổi mụ 19 (dư 1) -> phạm Kim Lâu Thân", () => {
    expect(kimLau(19)).toEqual({ phamKimLau: true, loai: "Kim Lâu Thân" });
  });
});

describe("xepLoaiChiPair", () => {
  it("Thân(8)-Tý(0)-Thìn(4) là nhóm tam hợp", () => {
    expect(xepLoaiChiPair(8, 0)).toBe("tam-hop");
    expect(xepLoaiChiPair(0, 4)).toBe("tam-hop");
    expect(xepLoaiChiPair(4, 8)).toBe("tam-hop");
  });
  it("Tý(0)-Sửu(1) là nhị hợp", () => {
    expect(xepLoaiChiPair(0, 1)).toBe("nhi-hop");
    expect(xepLoaiChiPair(1, 0)).toBe("nhi-hop");
  });
  it("Tý(0)-Ngọ(6) là tứ hành xung", () => {
    expect(xepLoaiChiPair(0, 6)).toBe("xung");
  });
  it("Tý(0)-Mùi(7) là lục hại", () => {
    expect(xepLoaiChiPair(0, 7)).toBe("hai");
  });
  it("Tý(0)-Mão(3) không hợp không xung -> bình hòa", () => {
    expect(xepLoaiChiPair(0, 3)).toBe("binh-hoa");
  });
});

describe("xepLoaiNapAmPair", () => {
  it("Mộc sinh Hỏa -> tương sinh", () => {
    expect(xepLoaiNapAmPair("Mộc", "Hỏa")).toBe("tuong-sinh");
    expect(xepLoaiNapAmPair("Hỏa", "Mộc")).toBe("tuong-sinh");
  });
  it("Kim khắc Mộc -> tương khắc", () => {
    expect(xepLoaiNapAmPair("Kim", "Mộc")).toBe("tuong-khac");
    expect(xepLoaiNapAmPair("Mộc", "Kim")).toBe("tuong-khac");
  });
  it("cùng hành -> cùng hành", () => {
    expect(xepLoaiNapAmPair("Thổ", "Thổ")).toBe("cung-hanh");
  });
});

describe("mucDoHopNhau", () => {
  it("tam hợp + tương sinh -> rất hợp", () => {
    expect(mucDoHopNhau("tam-hop", "tuong-sinh")).toBe("rất hợp");
  });
  it("xung + tương khắc -> cần cân nhắc", () => {
    expect(mucDoHopNhau("xung", "tuong-khac")).toBe("cần cân nhắc");
  });
  it("bình hòa + cùng hành -> bình thường", () => {
    expect(mucDoHopNhau("binh-hoa", "cung-hanh")).toBe("bình thường");
  });
  it("nhị hợp + cùng hành -> hợp", () => {
    expect(mucDoHopNhau("nhi-hop", "cung-hanh")).toBe("hợp");
  });
});

describe("bangNamCuoiToi", () => {
  it("trả về đúng số năm yêu cầu, liên tiếp", () => {
    const rows = bangNamCuoiToi(2000, 2026, 5);
    expect(rows).toHaveLength(5);
    expect(rows.map((r) => r.nam)).toEqual([2026, 2027, 2028, 2029, 2030]);
  });
  it("năm phạm Kim Lâu thì kết luận là nên cân nhắc", () => {
    const rows = bangNamCuoiToi(2000, 2026, 5);
    for (const r of rows) {
      expect(r.nenHayTranh).toBe(r.kimLau.phamKimLau ? "nên cân nhắc" : "nên");
    }
  });
});

describe("capNamSinhTrongPhamVi", () => {
  it("chênh lệch 15 năm (biên tối đa) vẫn trong phạm vi", () => {
    expect(capNamSinhTrongPhamVi(1990, 2005)).toBe(true);
    expect(capNamSinhTrongPhamVi(2005, 1990)).toBe(true);
  });
  it("chênh lệch 16 năm thì ngoài phạm vi", () => {
    expect(capNamSinhTrongPhamVi(1990, 2006)).toBe(false);
  });
  it("năm ngoài 1980-2010 thì ngoài phạm vi", () => {
    expect(capNamSinhTrongPhamVi(1975, 1980)).toBe(false);
    expect(capNamSinhTrongPhamVi(2010, 2015)).toBe(false);
  });
});

describe("tinhKetHonPairInfo", () => {
  it("hai người cùng năm sinh thì cùng can chi và bình hòa/cùng hành theo chi giống nhau", () => {
    const info = tinhKetHonPairInfo(1995, 1995, 2026);
    expect(info.canChiNam.name).toBe(info.canChiNu.name);
    expect(info.napAmPair).toBe("cung-hanh");
  });
  it("cặp năm sinh cách nhau 15 năm (biên tối đa) vẫn tính được đầy đủ", () => {
    const info = tinhKetHonPairInfo(1990, 2005, 2026);
    expect(info.bangNamCuoi).toHaveLength(5);
    expect(["rất hợp", "hợp", "bình thường", "cần cân nhắc"]).toContain(info.mucDo);
  });
});

describe("parseKetHonSlug", () => {
  it("phân tích đúng slug hợp lệ", () => {
    expect(parseKetHonSlug("nam-1990-nu-1992")).toEqual({ namNam: 1990, namNu: 1992 });
  });
  it("trả về null với slug không hợp lệ", () => {
    expect(parseKetHonSlug("abc")).toBeNull();
  });
});
