import { describe, expect, it } from "vitest";
import {
  bangNamCuoiToi,
  capNamSinhTrongPhamVi,
  kimLau,
  lyDoBoQuaNamCuoi,
  mucDoHopNhau,
  parseKetHonSlug,
  tinhKetHonPairInfo,
  tuoiMu,
  xepLoaiCanPair,
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
  it("Mộc(nam) sinh Hỏa(nữ) -> nam sinh nữ", () => {
    expect(xepLoaiNapAmPair("Mộc", "Hỏa")).toBe("nam-sinh-nu");
  });
  it("Hỏa(nam) được Mộc(nữ) sinh -> nữ sinh nam", () => {
    expect(xepLoaiNapAmPair("Hỏa", "Mộc")).toBe("nu-sinh-nam");
  });
  it("Thổ(nam) sinh Kim(nữ) -> nam sinh nữ (chồng Lộ Bàng Thổ, vợ Kiếm Phong Kim)", () => {
    expect(xepLoaiNapAmPair("Thổ", "Kim")).toBe("nam-sinh-nu");
  });
  it("Kim(nam) khắc Mộc(nữ) -> nam khắc nữ", () => {
    expect(xepLoaiNapAmPair("Kim", "Mộc")).toBe("nam-khac-nu");
  });
  it("Mộc(nam) bị Kim(nữ) khắc -> nữ khắc nam", () => {
    expect(xepLoaiNapAmPair("Mộc", "Kim")).toBe("nu-khac-nam");
  });
  it("cùng hành -> cùng hành", () => {
    expect(xepLoaiNapAmPair("Thổ", "Thổ")).toBe("cung-hanh");
  });
});

describe("xepLoaiCanPair", () => {
  it("Giáp(0)-Kỷ(5) là thiên can ngũ hợp", () => {
    expect(xepLoaiCanPair(0, 5)).toBe("can-hop");
    expect(xepLoaiCanPair(5, 0)).toBe("can-hop");
  });
  it("Đinh(3)-Nhâm(8) là thiên can ngũ hợp", () => {
    expect(xepLoaiCanPair(3, 8)).toBe("can-hop");
  });
  it("Canh(6) và Nhâm(8) không phải cặp ngũ hợp -> xét theo hành riêng (Kim sinh Thủy, nam sinh nữ)", () => {
    expect(xepLoaiCanPair(6, 8)).toBe("nam-sinh-nu");
  });
  it("Giáp(0) Mộc và Canh(6) Kim -> Kim khắc Mộc, nữ khắc nam", () => {
    expect(xepLoaiCanPair(0, 6)).toBe("nu-khac-nam");
  });
  it("cùng hành (Giáp và Ất đều Mộc) -> cùng hành", () => {
    expect(xepLoaiCanPair(0, 1)).toBe("cung-hanh");
  });
});

describe("mucDoHopNhau", () => {
  it("cả 3 tầng đều tốt -> rất hợp", () => {
    expect(mucDoHopNhau("tam-hop", "nam-sinh-nu", "can-hop")).toBe("rất hợp");
  });
  it("2 tầng tốt, 1 tầng bình hòa -> rất hợp", () => {
    expect(mucDoHopNhau("tam-hop", "nam-sinh-nu", "cung-hanh")).toBe("rất hợp");
  });
  it("1 tầng tốt, còn lại bình hòa -> hợp", () => {
    expect(mucDoHopNhau("tam-hop", "cung-hanh", "cung-hanh")).toBe("hợp");
  });
  it("cả 3 tầng bình hòa -> bình thường", () => {
    expect(mucDoHopNhau("binh-hoa", "cung-hanh", "cung-hanh")).toBe("bình thường");
  });
  it("đúng 1 tầng xấu, còn lại bình hòa hoặc tốt -> bình thường", () => {
    expect(mucDoHopNhau("xung", "cung-hanh", "cung-hanh")).toBe("bình thường");
    expect(mucDoHopNhau("xung", "nam-sinh-nu", "can-hop")).toBe("bình thường");
  });
  it("từ 2 tầng xấu trở lên -> cần cân nhắc", () => {
    expect(mucDoHopNhau("xung", "nam-khac-nu", "cung-hanh")).toBe("cần cân nhắc");
    expect(mucDoHopNhau("xung", "nam-khac-nu", "nu-khac-nam")).toBe("cần cân nhắc");
  });
});

describe("lyDoBoQuaNamCuoi", () => {
  it("năm đầu bảng đã được chọn -> không cần giải thích", () => {
    // Tuổi mụ cô dâu sinh 2000, năm 2019: tuổi mụ 20 (dư 2) -> không phạm ngay từ năm đầu.
    const rows = bangNamCuoiToi(2000, 2019, 3);
    const chon = rows.find((r) => r.nenHayTranh === "nên") ?? null;
    expect(chon?.nam).toBe(2019);
    expect(lyDoBoQuaNamCuoi(rows, chon)).toBeNull();
  });
  it("liệt kê đúng các năm bị bỏ qua trước năm được chọn", () => {
    // Tuổi mụ cô dâu sinh 2000: năm 2018 tuổi mụ 19 (dư 1, phạm Kim Lâu Thân), năm 2019 tuổi mụ 20 (dư 2, không phạm).
    const rows = bangNamCuoiToi(2000, 2018, 2); // 2018, 2019
    const chon = rows.find((r) => r.nenHayTranh === "nên") ?? null;
    expect(chon?.nam).toBe(2019);
    expect(lyDoBoQuaNamCuoi(rows, chon)).toBe("2018 phạm Kim Lâu Thân");
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
  it("chênh lệch tuổi lớn vẫn trong phạm vi, miễn năm sinh nằm trong 1980-2010 (không còn giới hạn chênh lệch tuổi)", () => {
    expect(capNamSinhTrongPhamVi(1990, 2005)).toBe(true);
    expect(capNamSinhTrongPhamVi(2005, 1990)).toBe(true);
    expect(capNamSinhTrongPhamVi(1980, 2010)).toBe(true);
    expect(capNamSinhTrongPhamVi(2010, 1980)).toBe(true);
  });
  it("năm ngoài 1980-2010 thì ngoài phạm vi", () => {
    expect(capNamSinhTrongPhamVi(1975, 1980)).toBe(false);
    expect(capNamSinhTrongPhamVi(2010, 2015)).toBe(false);
  });
});

describe("tinhKetHonPairInfo", () => {
  it("hai người cùng năm sinh thì cùng can chi, cùng hành và cùng thiên can", () => {
    const info = tinhKetHonPairInfo(1995, 1995, 2026);
    expect(info.canChiNam.name).toBe(info.canChiNu.name);
    expect(info.napAmPair).toBe("cung-hanh");
    expect(info.canPair).toBe("cung-hanh");
  });
  it("cặp năm sinh cách nhau 15 năm vẫn tính được đầy đủ, kể cả tầng thiên can", () => {
    const info = tinhKetHonPairInfo(1990, 2005, 2026);
    expect(info.bangNamCuoi).toHaveLength(5);
    expect(["rất hợp", "hợp", "bình thường", "cần cân nhắc"]).toContain(info.mucDo);
    expect(info.canPair).toBeDefined();
  });
  it("nam 1990 (Canh Ngọ, mệnh Lộ Bàng Thổ) và nữ 1992 (Nhâm Thân, mệnh Kiếm Phong Kim): Thổ sinh Kim -> nam sinh nữ", () => {
    const info = tinhKetHonPairInfo(1990, 1992, 2026);
    expect(info.canChiNam.name).toBe("Canh Ngọ");
    expect(info.canChiNu.name).toBe("Nhâm Thân");
    expect(info.napAmPair).toBe("nam-sinh-nu");
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
