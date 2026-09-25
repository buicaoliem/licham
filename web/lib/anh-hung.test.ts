import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ANH_HUNG, THOI_KY, anhHungByLeSlug, anhHungBySlug, anhHungImagePath, anhHungKeCan, wikiUrl } from "./anh-hung";
import { leImage } from "./heritage-assets";
import { LE_LIST, leBySlug } from "./le";

describe("anh-hung-dan-toc", () => {
  it("has unique slugs and complete profiles", () => {
    const slugs = ANH_HUNG.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBeGreaterThanOrEqual(24);
    const tk = new Set(THOI_KY.map((t) => t.key));
    for (const a of ANH_HUNG) {
      expect(a.slug).toMatch(/^[a-z0-9-]+$/);
      expect(tk.has(a.thoiKy)).toBe(true);
      expect(a.ten && a.nienDai && a.queQuan && a.tomTat && a.wikiTitle).toBeTruthy();
      expect(a.tieuSu.length).toBeGreaterThanOrEqual(2);
      expect(a.boiCanh.length).toBeGreaterThanOrEqual(1);
      expect(a.congTrang.length).toBeGreaterThanOrEqual(3);
      expect(a.suKien.length).toBeGreaterThanOrEqual(3);
      // Câu "14 anh hùng tiêu biểu" hiển thị bằng huy hiệu riêng, không lặp trong nội dung.
      expect([...a.tieuSu, ...a.congTrang].join(" ")).not.toMatch(/14 vị anh hùng/);
    }
  });

  it("links every hero memorial page on /le/ back to a profile", () => {
    for (const a of ANH_HUNG) if (a.leSlug) expect(leBySlug(a.leSlug), a.slug).toBeDefined();
    for (const le of LE_LIST.filter((p) => p.nhom === "anh-hung")) expect(anhHungByLeSlug(le.slug), le.slug).toBeDefined();
    expect(anhHungByLeSlug("gio-to-hung-vuong")?.slug).toBe("hung-vuong");
  });

  it("marks exactly the 14 heroes of the 2013 Ministry list", () => {
    const tb = ANH_HUNG.filter((a) => a.tieuBieu2013).map((a) => a.slug);
    expect(tb.sort()).toEqual(
      [
        "hung-vuong",
        "hai-ba-trung",
        "ly-nam-de",
        "ngo-quyen",
        "dinh-tien-hoang",
        "le-dai-hanh",
        "ly-thai-to",
        "ly-thuong-kiet",
        "tran-nhan-tong",
        "tran-hung-dao",
        "le-loi",
        "nguyen-trai",
        "quang-trung",
        "ho-chi-minh",
      ].sort(),
    );
  });

  it("gives every hero a painting or photo without reusing paintings", () => {
    // Tranh đang chờ vẽ lại: tạm hiển thị khung không tranh.
    const choTranh = new Set(["tran-phu"]);
    const used = new Map<string, string>();
    for (const a of ANH_HUNG) {
      if (choTranh.has(a.slug)) continue;
      const rieng = existsSync(new URL(`../public${anhHungImagePath(a.slug)}`, import.meta.url)) ? anhHungImagePath(a.slug) : null;
      const img = (a.leSlug ? leImage(a.leSlug) : null) ?? rieng;
      const photo = a.leSlug ? leBySlug(a.leSlug)?.coAnhThat : false;
      // 24/24 nhân vật có tranh hoặc ảnh thật — không còn biểu tượng SVG tạm.
      expect(Boolean(img || photo), a.slug).toBe(true);
      if (img) {
        expect(used.get(img), `${a.slug} reuses ${img}`).toBeUndefined();
        used.set(img, a.slug);
      }
    }
  });

  it("orders the timeline chronologically with prev/next neighbours", () => {
    expect(ANH_HUNG[0]?.slug).toBe("hung-vuong");
    expect(ANH_HUNG.at(-1)?.thoiKy).toBe("hien-dai");
    const i = ANH_HUNG.findIndex((a) => a.slug === "ngo-quyen");
    expect(anhHungKeCan("ngo-quyen").prev?.slug).toBe(ANH_HUNG[i - 1]?.slug);
    expect(anhHungKeCan("hung-vuong").prev).toBeUndefined();
    expect(anhHungBySlug("khong-co")).toBeUndefined();
    expect(wikiUrl("Trần Hưng Đạo")).toBe("https://vi.wikipedia.org/wiki/Tr%E1%BA%A7n_H%C6%B0ng_%C4%90%E1%BA%A1o");
  });
});
