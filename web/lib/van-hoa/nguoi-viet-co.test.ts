import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HERITAGE_FILES } from "../heritage-assets.generated";
import { BAI_VIET_IMPORTED } from "./data/bai-viet.generated";

const SLUGS = ["van-hoa-phung-nguyen", "van-hoa-dong-son", "van-hoa-sa-huynh", "van-hoa-oc-eo", "trong-dong-dong-son"] as const;
const NOTE = "Tên đơn vị hành chính cấp huyện/xã tại các di chỉ có thể đã thay đổi sau đợt sáp nhập hành chính 2025.";
const HUYEN = /Lâm Thao|Phù Ninh|Hoài Đức|Yên Lạc|Thuỷ Nguyên|Thủy Nguyên|Nghĩa Đàn|Đông Anh|Đức Phổ|Duy Xuyên|Nghi Xuân|Thoại Sơn|Tân Hiệp|Tháp Mười|Đức Hoà|Đức Hòa/;

describe("Người Việt cổ / Khảo cổ", () => {
  it("năm bài Khảo cổ, ảnh đúng slug, chú thích địa danh, không ghi huyện", () => {
    for (const slug of SLUGS) {
      const p = BAI_VIET_IMPORTED.find((x) => x.slug === slug)!;
      expect(p.category).toBe("Khảo cổ");
      expect(p.heroImage).toBe(`/heritage/van-hoa/khao-co/${slug}-hero.webp`);
      expect(existsSync(join(__dirname, "..", "..", "public", p.heroImage!)), p.heroImage).toBe(true);
      expect(HERITAGE_FILES).toContain(p.heroImage);
      expect(JSON.stringify(p)).toContain(NOTE);
      expect(JSON.stringify(p)).not.toMatch(HUYEN);
      expect(JSON.stringify(p)).not.toMatch(/Phú Thọ mới|nay thuộc Phú Thọ/);
      expect(JSON.stringify(p)).not.toMatch(/QĐ/);
    }
    const bong = JSON.stringify(BAI_VIET_IMPORTED.find((x) => x.slug === "van-hoa-phung-nguyen"));
    expect(bong).toMatch(/Gò Bông \(Vĩnh Phúc\)/);
  });
});
