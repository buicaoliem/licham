import { describe, expect, it } from "vitest";
import { articleJsonLd, leHoiEventJsonLd } from "./jsonld";

describe("leHoiEventJsonLd — không tự gán licham.app làm organizer", () => {
  const occ = { start: { solar: { day: 1, month: 3, year: 2026 } }, end: { solar: { day: 3, month: 3, year: 2026 } } };
  const festival = { name: "Lễ hội thử", summary: "Tóm tắt", site: "Đền Thử", newAddress: "Xã Thử, Tỉnh Thử" };

  it("Event JSON-LD không có trường organizer (chưa có dữ liệu ban tổ chức thật)", () => {
    const data = leHoiEventJsonLd(festival, "/van-hoa/le-hoi/le-hoi-thu/", occ);
    expect(data).not.toHaveProperty("organizer");
    expect(data["@type"]).toBe("Event");
    expect(data.location).toEqual({ "@type": "Place", name: festival.site, address: festival.newAddress });
  });
});

describe("articleJsonLd — Article vẫn ghi licham.app là author/publisher (đúng vai trò)", () => {
  it("có author và publisher, không phải Event nên không cần organizer", () => {
    const data = articleJsonLd({ headline: "Tiêu đề", description: "Mô tả", path: "/van-hoa/bai-viet/x/" });
    expect(data["@type"]).toBe("Article");
    expect(data.author).toMatchObject({ name: "Lịch Âm – licham.app" });
    expect(data.publisher).toMatchObject({ name: "Lịch Âm – licham.app" });
  });
});
