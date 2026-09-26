import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HERITAGE_FILES } from "../heritage-assets.generated";
import { peopleInText } from "./cross-links";
import { BAI_VIET_IMPORTED } from "./data/bai-viet.generated";

const bodyOf = (slug: string) => {
  const p = BAI_VIET_IMPORTED.find((x) => x.slug === slug)!;
  return [
    p.title,
    p.summary,
    ...(p.intro ?? []),
    ...p.sections.flatMap((sec) => [...sec.paras, ...(sec.sub ?? []).flatMap((s) => s.paras), ...(sec.blocks ?? []).flatMap((b) => (b.type === "p" ? [b.text] : b.type === "ul" ? b.items : []))]),
  ];
};

describe("tranh Đông Hồ và đồ chơi Tết xưa", () => {
  it("hai bài Dân gian, có ảnh, không ghi số quyết định", () => {
    const dongHo = BAI_VIET_IMPORTED.find((p) => p.slug === "tranh-dong-ho")!;
    const doChoi = BAI_VIET_IMPORTED.find((p) => p.slug === "do-choi-tet-xua")!;
    expect(dongHo.category).toBe("Dân gian");
    expect(doChoi.category).toBe("Dân gian");
    expect(dongHo.sections.find((s) => s.id === "muoi-hai-buc-tranh-tieu-bieu")?.sub).toHaveLength(12);
    expect(dongHo.heroImage).toBe("/heritage/van-hoa/dan-gian/tranh-dong-ho-hero.webp");
    expect(doChoi.heroImage).toBe("/heritage/van-hoa/dan-gian/do-choi-tet-xua-hero.webp");
    for (const p of [dongHo, doChoi]) {
      expect(existsSync(join(__dirname, "..", "..", "public", p.heroImage!)), p.heroImage).toBe(true);
      expect(HERITAGE_FILES).toContain(p.heroImage);
      expect(JSON.stringify(p)).not.toMatch(/QĐ/i);
      expect(JSON.stringify(p)).not.toMatch(/needsCheck/);
    }
    expect(JSON.stringify(dongHo)).toMatch(/2012/);
    expect(JSON.stringify(dongHo)).toMatch(/9\/12\/2025/);
    expect(JSON.stringify(dongHo)).toMatch(/phường Thuận Thành, tỉnh Bắc Ninh/);
    expect(JSON.stringify(doChoi)).toMatch(/xã Phượng Dực, TP\. Hà Nội/);
    expect(JSON.stringify(doChoi)).not.toMatch(/huyện Phú Xuyên/);
    expect(JSON.stringify(doChoi)).toMatch(/chưa xác minh thư tịch cổ/);
    expect(JSON.stringify(doChoi)).toMatch(/chưa xác minh niên đại/);
  });

  it("không tự gắn nhân vật lịch sử khi bài không nêu tên riêng có trang", () => {
    expect(peopleInText(bodyOf("tranh-dong-ho"))).toEqual([]);
    expect(peopleInText(bodyOf("do-choi-tet-xua"))).toEqual([]);
  });

  it("needsCheck địa danh chỉ nằm file nội bộ", () => {
    const notes = JSON.parse(readFileSync(join(__dirname, "..", "..", "content", "van-hoa", "needs-check.json"), "utf8")) as { articles: Record<string, string> };
    expect(notes.articles["do-choi-tet-xua"]).toMatch(/Hồng Quang/);
    expect(notes.articles["do-choi-tet-xua"]).toMatch(/Liêu Xá/);
    expect(notes.articles["tranh-dong-ho"]).toBeUndefined();
  });
});
