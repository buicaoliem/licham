import { SOLAR_TERM_NAMES } from "@licham/core";
import { describe, expect, it } from "vitest";
import { tietKhiImage, tietKhiMua, tietKhiSlug } from "./heritage-assets";
import { TIET_KHI, tietKhiBySlug, tietKhiKeCan, tietKhiNgay } from "./tiet-khi";

describe("tranh 24 tiết khí", () => {
  it("maps every term name to a unique ASCII slug", () => {
    const slugs = SOLAR_TERM_NAMES.map(tietKhiSlug);
    expect(new Set(slugs).size).toBe(24);
    for (const s of slugs) expect(s).toMatch(/^[a-z]+(-[a-z]+)+$/);
    expect(tietKhiSlug("Kinh trập")).toBe("kinh-trap");
    expect(tietKhiSlug("Đông chí")).toBe("dong-chi");
  });

  it("has artwork for all 24 terms", () => {
    for (const n of SOLAR_TERM_NAMES) expect(tietKhiImage(n), n).toBe(`/heritage/tiet-khi/${tietKhiSlug(n)}.webp`);
  });

  it("builds 24 detail entries in agricultural order with meaning and correct longitude", () => {
    expect(TIET_KHI).toHaveLength(24);
    expect(TIET_KHI[0]).toMatchObject({ ten: "Lập xuân", kinhDo: 315, loai: "tiet", mua: "xuan" });
    expect(tietKhiBySlug("xuan-phan")).toMatchObject({ kinhDo: 0, loai: "trung-khi" });
    expect(tietKhiBySlug("dong-chi")).toMatchObject({ kinhDo: 270, mua: "dong" });
    for (const t of TIET_KHI) expect(t.nghia.length > 10 && t.dongA.length > 5 && t.han.length === 2 && t.tenAnh.length > 3, t.ten).toBe(true);
    expect(tietKhiKeCan("dai-han").next.slug).toBe("lap-xuan");
    expect(tietKhiKeCan("lap-xuan").prev.slug).toBe("dai-han");
  });

  it("keeps East Asian calendar meaning separate from Vietnam climate, with sources", () => {
    for (const t of TIET_KHI) {
      expect(t.nguon, t.ten).toEqual(expect.arrayContaining(["hko", "wiki-tiet", "wiki-tiet-khi"]));
      const all = `${t.nghia} ${t.dongA} ${t.vietNam ?? ""}`;
      // Nội dung đã loại vì không có nguồn: sấm Kinh trập, tục cúng Đông chí, lịch vụ lúa cụ thể.
      expect(all, t.ten).not.toMatch(/sấm|cúng Đông chí|chiêm xuân|lúa mùa|vụ đông|cấy/);
      // Câu về Việt Nam luôn nêu rõ vùng hoặc phạm vi, không khái quát cả nước.
      if (t.vietNam) expect(t.vietNam, t.ten).toMatch(/miền Bắc|miền Nam|Việt Nam|Biển Đông|núi cao/);
    }
    // Tiết mang tên tuyết/sương giá phải có lưu ý cho Việt Nam hoặc ghi rõ là khí hậu Trung Hoa cổ.
    for (const slug of ["tieu-tuyet", "dai-tuyet"]) expect(tietKhiBySlug(slug)?.vietNam).toMatch(/không có tuyết/);
    expect(tietKhiBySlug("suong-giang")?.dongA).toMatch(/Trung Hoa cổ đại/);
  });

  it("computes start dates from the calendar core", () => {
    expect(tietKhiNgay(tietKhiBySlug("xuan-phan")!, 2026)).toMatchObject({ day: 20, month: 3, year: 2026 });
    expect(tietKhiNgay(tietKhiBySlug("dong-chi")!, 2026)).toMatchObject({ month: 12, year: 2026 });
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
