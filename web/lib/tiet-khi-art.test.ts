import { SOLAR_TERM_NAMES } from "@licham/core";
import { describe, expect, it } from "vitest";
import { tietKhiImage, tietKhiMua, tietKhiSlug } from "./heritage-assets";

describe("tranh 24 tiết khí", () => {
  it("maps every term name to a unique ASCII slug", () => {
    const slugs = SOLAR_TERM_NAMES.map(tietKhiSlug);
    expect(new Set(slugs).size).toBe(24);
    for (const s of slugs) expect(s).toMatch(/^[a-z]+(-[a-z]+)+$/);
    expect(tietKhiSlug("Kinh trập")).toBe("kinh-trap");
    expect(tietKhiSlug("Đông chí")).toBe("dong-chi");
  });

  it("has batch-1 artwork for the first 10 terms from Lập xuân", () => {
    for (const n of ["Lập xuân", "Vũ thủy", "Kinh trập", "Xuân phân", "Thanh minh", "Cốc vũ", "Lập hạ", "Tiểu mãn", "Mang chủng", "Hạ chí"])
      expect(tietKhiImage(n), n).toBe(`/heritage/tiet-khi/${tietKhiSlug(n)}.webp`);
  });

  it("assigns seasons by solar longitude (Lập xuân 315° starts spring)", () => {
    expect(tietKhiMua(315)).toBe("xuan");
    expect(tietKhiMua(30)).toBe("xuan");
    expect(tietKhiMua(45)).toBe("ha");
    expect(tietKhiMua(135)).toBe("thu");
    expect(tietKhiMua(225)).toBe("dong");
    expect(tietKhiMua(300)).toBe("dong");
  });
});
