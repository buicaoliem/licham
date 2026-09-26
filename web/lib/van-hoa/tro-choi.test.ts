import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HERITAGE_FILES } from "../heritage-assets.generated";
import { BAI_VIET_IMPORTED } from "./data/bai-viet.generated";
import { vanHoaSubPaths } from "./paths";
import { TRO_CHOI, TRO_CHOI_PATH, TRO_CHOI_SLUGS, isTroChoi, troChoiCardImage, troChoiGroup, troChoiPath } from "./tro-choi";

const BAT_CHACH =
  "Một chum sành lớn chứa nước và cá chạch được đặt giữa sân đình. Từng đôi nam nữ bước vào, cùng phối hợp mò bắt con chạch trơn trượt dưới đáy chum trong tiếng reo hò cổ vũ của dân làng. Đôi nào bắt được chạch đưa lên khỏi miệng chum trước, hoặc bắt được nhiều nhất trong thời gian một tuần hương, sẽ thắng cuộc và nhận thưởng lụa của làng.";

describe("trò chơi dân gian", () => {
  it("đủ 20 bài, slug ổn định, nhãn Dân gian", () => {
    expect(TRO_CHOI_SLUGS).toHaveLength(20);
    expect(new Set(TRO_CHOI.map((p) => p.slug))).toEqual(new Set(TRO_CHOI_SLUGS));
    expect(TRO_CHOI).toHaveLength(20);
    for (const p of TRO_CHOI) {
      expect(p.category).toBe("Dân gian");
      expect(p.label).toBe("tin-nguong");
      expect(p.heroImage).toBe(`/heritage/van-hoa/tro-choi-dan-gian/${p.slug}-hero.webp`);
      expect(troChoiPath(p.slug)).toBe(`/van-hoa/bai-viet/${p.slug}/`);
    }
  });

  it("không ghi số quyết định; bắt chạch dùng đoạn kín đáo", () => {
    const text = TRO_CHOI.map((p) => JSON.stringify(p)).join("\n");
    expect(text).not.toMatch(/QĐ-BVHTTDL/i);
    expect(text).not.toMatch(/\d+\/QĐ/i);
    const cachChoi = TRO_CHOI.find((p) => p.slug === "bat-chach-trong-chum")!.sections.find((s) => s.id === "cach-choi")!;
    expect(JSON.stringify(cachChoi)).toContain(BAT_CHACH);
    expect(JSON.stringify(cachChoi)).not.toMatch(/ôm nhau|thò tay/i);
  });

  it("needsCheck chỉ nằm trong file nội bộ, không có trên bài", () => {
    const generated = readFileSync(join(__dirname, "data", "bai-viet.generated.ts"), "utf8");
    expect(generated).not.toMatch(/needsCheck/);
    const notes = JSON.parse(readFileSync(join(__dirname, "..", "..", "content", "van-hoa", "needs-check.json"), "utf8")) as {
      articles: Record<string, string>;
    };
    expect(notes.articles["keo-co"]).toMatch(/Long Biên/);
    expect(notes.articles["tha-dieu"]).toBeUndefined();
    expect(notes.articles["dau-vat-dan-toc"]).toBeUndefined();
    expect(Object.keys(notes.articles).sort()).toEqual(
      ["bat-chach-trong-chum", "co-nguoi", "danh-du", "danh-phet", "di-ca-kheo", "keo-co", "thoi-com-thi"].sort(),
    );
  });

  it("mỗi trò có ảnh hero và ảnh thẻ", () => {
    for (const p of TRO_CHOI) {
      const hero = p.heroImage!;
      const card = troChoiCardImage(p)!;
      for (const rel of [hero, card]) {
        expect(existsSync(join(__dirname, "..", "..", "public", rel)), rel).toBe(true);
        expect(HERITAGE_FILES, rel).toContain(rel);
      }
    }
  });

  it("trang mục và 20 bài vào sitemap Văn hoá", () => {
    const paths = vanHoaSubPaths();
    expect(paths).toContain(TRO_CHOI_PATH);
    for (const slug of TRO_CHOI_SLUGS) expect(paths).toContain(troChoiPath(slug));
    expect(BAI_VIET_IMPORTED.filter((p) => isTroChoi(p.slug))).toHaveLength(20);
    expect(troChoiGroup("keo-co")).toBe("hoi-le");
    expect(troChoiGroup("o-an-quan")).toBe("ngay-thuong");
  });
});
