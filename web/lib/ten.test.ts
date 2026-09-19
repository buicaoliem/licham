import { describe, expect, it } from "vitest";
import { TEN_LIST, assertTenSlugsUnique, goiYTenTheoNam, hanhGoiYTheoNam, tenBySlug } from "./ten";

describe("từ điển tên", () => {
  it("mỗi tên có chữ, nghĩa, nguồn, không trùng slug", () => {
    expect(TEN_LIST.length).toBeGreaterThanOrEqual(48);
    expect(() => assertTenSlugsUnique()).not.toThrow();
    for (const t of TEN_LIST) {
      expect(t.chuHan.length).toBeGreaterThan(0);
      expect(t.nghia.length).toBeGreaterThan(2);
      expect(t.nguon.length).toBeGreaterThan(8);
      expect(t.luan.length).toBeGreaterThan(20);
    }
  });

  it("Hải là Thủy, Lâm là Mộc, Kim là Kim", () => {
    expect(tenBySlug("hai")?.hanh).toBe("Thủy");
    expect(tenBySlug("lam")?.hanh).toBe("Mộc");
    expect(tenBySlug("kim")?.hanh).toBe("Kim");
  });

  it("gợi ý năm lấy hành sinh hoặc cùng mệnh năm, không gán mệnh theo con giáp", () => {
    const { namMenh, hanhSinh } = hanhGoiYTheoNam(2026);
    expect(namMenh).toBe("Thủy");
    const list = goiYTenTheoNam(2026);
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((t) => t.hanh === namMenh || t.hanh === hanhSinh)).toBe(true);
  });
});
