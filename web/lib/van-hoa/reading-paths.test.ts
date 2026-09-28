import { describe, expect, it } from "vitest";
import { personRabbitHoleLinks, storyLinks } from "./cross-links";
import { READING_PATHS, resolveReadingPath, resolvedReadingPaths } from "./reading-paths";

describe("reading paths — chuỗi đọc biên tập tay trên /anh-hung-dan-toc/", () => {
  it("mỗi path có slug duy nhất", () => {
    const slugs = READING_PATHS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("mỗi path có tối thiểu 3 bước", () => {
    for (const p of READING_PATHS) expect(p.items.length).toBeGreaterThanOrEqual(3);
  });

  it("không có bước trùng lặp (cùng type+slug) trong một path", () => {
    for (const p of READING_PATHS) {
      const keys = p.items.map((i) => `${i.type}:${i.slug}`);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it("mọi bước của mọi path trong nguồn đều resolve được (target tồn tại thật, đã publish)", () => {
    for (const p of READING_PATHS) {
      const resolved = resolveReadingPath(p);
      expect(resolved, `path "${p.slug}" thiếu ít nhất một bước không tồn tại`).toBeDefined();
      expect(resolved!.items.length).toBe(p.items.length);
      for (const it of resolved!.items) {
        expect(it.href).toMatch(/^\//);
        expect(it.title.length).toBeGreaterThan(0);
      }
    }
  });

  it("resolvedReadingPaths() không rỗng và không chứa path cụt", () => {
    const paths = resolvedReadingPaths();
    expect(paths.length).toBe(READING_PATHS.length);
    for (const p of paths) {
      for (const it of p.items) expect(it.href).not.toBe("");
    }
  });

  it("không có path nào rẽ nhánh vòng lại chính bước trước đó (không có 2 bước liên tiếp trùng slug)", () => {
    for (const p of READING_PATHS) {
      for (let i = 1; i < p.items.length; i++) {
        const a = p.items[i - 1]!;
        const b = p.items[i]!;
        expect(a.type === b.type && a.slug === b.slug).toBe(false);
      }
    }
  });

  it("batch 8: path 'Từ Hoa Lư đến Thăng Long' đã xuất bản, đủ 4 bước, mọi bước resolve qua slug canonical (không qua alias)", () => {
    const p = READING_PATHS.find((x) => x.slug === "hoa-lu-den-thang-long");
    expect(p, "chưa có path Hoa Lư -> Thăng Long").toBeTruthy();
    expect(p!.items.length).toBeGreaterThanOrEqual(4);
    const resolved = resolveReadingPath(p!);
    expect(resolved, "path Hoa Lư -> Thăng Long có bước chưa publish").toBeDefined();
    expect(resolved!.items.map((i) => i.slug)).toEqual(["dinh-tien-hoang", "le-dai-hanh", "vi-sao-ly-cong-uan-doi-do", "ly-thai-to"]);
    // Hai bước "person" (nhân vật) phải dùng đúng slug canonical trong ANH_HUNG, không phải một biến thể alias.
    const personSteps = p!.items.filter((i) => i.type === "person").map((i) => i.slug);
    expect(personSteps).toEqual(["dinh-tien-hoang", "le-dai-hanh", "ly-thai-to"]);
  });
});

describe("discovery UI trên /anh-hung-dan-toc/ — chỉ hiện nội dung đã publish, có href thật", () => {
  const storySlugs = ["kieu-cong-tien-cau-cuu-nam-han", "le-lai-cuu-chua-su-lieu-ghi-gi", "vi-sao-khoi-nghia-hai-ba-trung-bung-no", "vi-sao-quan-tran-bo-thang-long-1285", "loan-12-su-quan-dinh-bo-linh-thong-nhat-the-nao", "vi-sao-hanh-quan-ra-bac-dip-tet"];
  const personSlugs = ["ngo-quyen", "tran-hung-dao", "nguyen-trai", "le-loi", "quang-trung", "hai-ba-trung"];

  it("khối 'Bắt đầu từ một câu chuyện' có 4-6 item, không trùng lặp, href thật", () => {
    const links = storyLinks(storySlugs);
    expect(links.length).toBeGreaterThanOrEqual(4);
    expect(links.length).toBeLessThanOrEqual(6);
    const hrefs = links.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const l of links) {
      expect(l.href).toMatch(/^\/van-hoa\/cau-chuyen\//);
      expect(l.summary && l.summary.length).toBeGreaterThan(0);
    }
  });

  it("khối 'Đi tiếp từ một nhân vật' có 4-6 item, mỗi item có teaser gợi mở (không chỉ tên)", () => {
    const links = personRabbitHoleLinks(personSlugs);
    expect(links.length).toBeGreaterThanOrEqual(4);
    expect(links.length).toBeLessThanOrEqual(6);
    for (const l of links) {
      expect(l.href).toMatch(/^\/anh-hung-dan-toc\//);
      expect(l.summary && l.summary!.length).toBeGreaterThan(0);
      expect(l.summary).not.toBe(l.label);
    }
  });

  it("personRabbitHoleLinks bỏ qua slug không tồn tại hoặc không có nguoiLienQuan (không hiện section rỗng cho input rác)", () => {
    const links = personRabbitHoleLinks(["__khong-ton-tai__"]);
    expect(links.length).toBe(0);
  });

  it("storyLinks bỏ qua slug không tồn tại", () => {
    const links = storyLinks(["__khong-ton-tai__"]);
    expect(links.length).toBe(0);
  });
});
