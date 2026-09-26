import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HERITAGE_FILES } from "../heritage-assets.generated";
import { peopleInText } from "./cross-links";
import { BAI_VIET_IMPORTED } from "./data/bai-viet.generated";

describe("24 tiết khí và nông lịch", () => {
  it("bài Thiên văn, bảng 24 dòng, giữ câu chưa có ca dao", () => {
    const p = BAI_VIET_IMPORTED.find((x) => x.slug === "24-tiet-khi-nong-lich")!;
    expect(p.category).toBe("Thiên văn");
    expect(p.heroImage).toBe("/heritage/van-hoa/thien-van/24-tiet-khi-nong-lich-hero.webp");
    expect(existsSync(join(__dirname, "..", "..", "public", p.heroImage!))).toBe(true);
    expect(HERITAGE_FILES).toContain(p.heroImage);
    const table = p.sections.find((s) => s.id === "bang-24-tiet-khi")!.blocks!.find((b) => b.type === "table")!;
    expect(table.type === "table" && table.head).toEqual(["Tên tiết khí", "Chữ Hán", "Thời điểm dương lịch", "Khí hậu miền Bắc VN", "Việc nông nghiệp"]);
    expect(table.type === "table" && table.rows).toHaveLength(24);
    expect(table.type === "table" && table.rows[0]![0]).toBe("Lập xuân");
    expect(table.type === "table" && table.rows[23]![0]).toBe("Đại hàn");
    const text = JSON.stringify(p);
    expect(text).not.toMatch(/QĐ/);
    expect(text.match(/Chưa tìm được ca dao riêng\./g)).toHaveLength(7);
    expect(p.sections.find((s) => s.id === "van-hoa-va-tin-nguong-bon-tiet-khi-trong-diem")?.sub?.map((x) => x.heading)).toEqual(["Lập xuân", "Thanh minh", "Hạ chí", "Đông chí"]);
  });

  it("không gắn nhân vật khi bài không nêu tên riêng có trang tiểu sử", () => {
    const p = BAI_VIET_IMPORTED.find((x) => x.slug === "24-tiet-khi-nong-lich")!;
    const body = [p.summary, ...(p.intro ?? []), ...p.sections.flatMap((s) => [...s.paras, ...(s.sub ?? []).flatMap((x) => x.paras)])];
    expect(peopleInText(body)).toEqual([]);
  });
});
