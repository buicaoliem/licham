import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HERITAGE_FILES } from "../heritage-assets.generated";
import { TOPICS } from "./config";
import { peopleInText } from "./cross-links";
import { BAI_VIET_IMPORTED } from "./data/bai-viet.generated";

const SLUGS = ["van-mieu-quoc-tu-giam", "danh-sach-trang-nguyen"] as const;
const NOTE = "Tên đơn vị hành chính cấp huyện/xã ghi trong bài là tên tại thời điểm lịch sử; nhiều nơi đã đổi tên sau các đợt sáp nhập, đặc biệt đợt 2025.";
const HEAD = ["Tên", "Triều đại / Năm đỗ", "Năm sinh–mất", "Quê quán", "Ghi chú"];

const bodyOf = (slug: string) => {
  const p = BAI_VIET_IMPORTED.find((x) => x.slug === slug)!;
  return [
    p.title,
    p.summary,
    ...(p.intro ?? []),
    ...p.sections.flatMap((sec) => [
      ...sec.paras,
      ...(sec.sub ?? []).flatMap((s) => s.paras),
      ...(sec.blocks ?? []).flatMap((b) => (b.type === "p" ? [b.text] : b.type === "ul" ? b.items : b.head.concat(b.rows.flat()))),
    ]),
  ];
};

const tablesOf = (slug: string) =>
  BAI_VIET_IMPORTED.find((x) => x.slug === slug)!
    .sections.flatMap((s) => s.blocks ?? [])
    .filter((b) => b.type === "table");

describe("Khoa cử / Văn Miếu và Trạng nguyên", () => {
  it("hai bài Khoa cử, ảnh đúng thư mục, không ghi số quyết định", () => {
    for (const slug of SLUGS) {
      const p = BAI_VIET_IMPORTED.find((x) => x.slug === slug)!;
      expect(p.category).toBe("Khoa cử");
      expect(p.heroImage).toBe(`/heritage/van-hoa/khoa-cu/${slug}-hero.webp`);
      expect(existsSync(join(__dirname, "..", "..", "public", p.heroImage!)), p.heroImage).toBe(true);
      expect(HERITAGE_FILES).toContain(p.heroImage);
      expect(JSON.stringify(p)).not.toMatch(/QĐ/);
      expect(JSON.stringify(p)).not.toMatch(/needsCheck/);
      expect(JSON.stringify(p)).not.toMatch(/cập nhật/i);
    }
    const vanMieu = BAI_VIET_IMPORTED.find((x) => x.slug === "van-mieu-quoc-tu-giam")!;
    expect(JSON.stringify(vanMieu)).toMatch(/phường Văn Miếu/);
    expect(JSON.stringify(vanMieu)).toMatch(/2010/);
    expect(JSON.stringify(vanMieu)).toMatch(/2011/);
    expect(JSON.stringify(vanMieu)).toMatch(/2012/);
  });

  it("bảng Trạng nguyên 46 dòng, quê cũ, chú thích địa danh, không cột cập nhật", () => {
    const p = BAI_VIET_IMPORTED.find((x) => x.slug === "danh-sach-trang-nguyen")!;
    const tables = tablesOf("danh-sach-trang-nguyen");
    expect(tables).toHaveLength(4);
    const rows = tables.flatMap((t) => t.rows);
    expect(rows).toHaveLength(46);
    for (const t of tables) expect(t.head).toEqual(HEAD);
    expect(rows.map((r) => r[0])).toContain("Nguyễn Hiền");
    expect(rows.map((r) => r[0])).toContain("Trịnh Tuệ");
    expect(rows.map((r) => r[0]).join(" ")).not.toMatch(/Đặng Thì Thố/);
    expect(JSON.stringify(p)).toMatch(/Đặng Thì Thố/);
    expect(JSON.stringify(p)).toContain(NOTE);
    const text = JSON.stringify(p);
    if (/Nam Định/.test(text)) expect(text).toMatch(/Nam Định \(nay thuộc tỉnh Ninh Bình\)/);
    expect(text).not.toMatch(/Nam Định(?! \(nay thuộc tỉnh Ninh Bình\))/);
  });

  it("ba quan điểm Trạng nguyên đầu tiên, không chọn một đáp án", () => {
    const text = JSON.stringify(BAI_VIET_IMPORTED.find((x) => x.slug === "danh-sach-trang-nguyen"));
    expect(text).toMatch(/Lê Văn Thịnh/);
    expect(text).toMatch(/Nguyễn Quan Quang/);
    expect(text).toMatch(/Nguyễn Hiền/);
    expect(text).toMatch(/không chọn một đáp án duy nhất/);
    expect(text).toMatch(/xâu chỉ qua ốc/);
    expect(text).toMatch(/không có trong sử sách triều Trần/);
    expect(text).toMatch(/Nguyễn Thị Duệ/);
    expect(text).toMatch(/nhân vật lịch sử có thật/);
  });

  it("mục Học đường trỏ hai bài Khoa cử; nhân vật gắn trang tiểu sử có sẵn", () => {
    const hoc = TOPICS.find((t) => t.slug === "hoc-duong")!;
    expect(hoc.links.map((l) => l.href)).toEqual(["/van-hoa/bai-viet/van-mieu-quoc-tu-giam/", "/van-hoa/bai-viet/danh-sach-trang-nguyen/"]);
    expect(peopleInText(bodyOf("van-mieu-quoc-tu-giam"))).toEqual(expect.arrayContaining(["ly-thanh-tong", "ly-nhan-tong", "le-thanh-tong", "chu-van-an"]));
    expect(peopleInText(bodyOf("danh-sach-trang-nguyen"))).not.toContain("luong-the-vinh");
  });
});
