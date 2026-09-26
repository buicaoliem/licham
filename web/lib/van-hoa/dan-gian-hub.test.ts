import { describe, expect, it } from "vitest";
import { peopleInText } from "./cross-links";
import { DAN_GIAN_GENRE_LINKS, DAN_GIAN_INTRO, danGianHubItems, danGianIntroPeople, linkFirstPhrases } from "./dan-gian-hub";
import { TRO_CHOI_PATH } from "./tro-choi";

describe("trang mục Văn hoá dân gian", () => {
  it("giữ nguyên ba đoạn; gắn đúng 3 cụm thể loại lần đầu", () => {
    expect(DAN_GIAN_INTRO).toHaveLength(3);
    expect(DAN_GIAN_INTRO.join("\n")).toContain("Không có sách vở nào dạy những điều này");
    expect(DAN_GIAN_INTRO[2]).toContain("Trạng Quỳnh");
    const used = new Set<string>();
    const segs = DAN_GIAN_INTRO.flatMap((p) => linkFirstPhrases(p, DAN_GIAN_GENRE_LINKS, used));
    const linked = segs.filter((s) => s.href);
    expect(linked.map((s) => s.text)).toEqual(["Trò chơi dân gian", "Tranh dân gian Đông Hồ", "Đồ chơi Tết và Trung thu xưa"]);
    expect(linked.map((s) => s.href)).toEqual([TRO_CHOI_PATH, "/van-hoa/bai-viet/tranh-dong-ho/", "/van-hoa/bai-viet/do-choi-tet-xua/"]);
    expect(used.size).toBe(3);
  });

  it("không gắn nhân vật lịch sử khi đoạn chỉ nêu thể loại; không còn trạng thái biên soạn khi đã có bài", () => {
    expect(peopleInText(DAN_GIAN_INTRO)).toEqual([]);
    expect(danGianIntroPeople()).toEqual([]);
    const hrefs = danGianHubItems().map((i) => i.href);
    expect(hrefs).toContain(TRO_CHOI_PATH);
    expect(hrefs).toContain("/van-hoa/bai-viet/tranh-dong-ho/");
    expect(hrefs).toContain("/van-hoa/bai-viet/do-choi-tet-xua/");
    expect(hrefs.length).toBeGreaterThanOrEqual(3);
  });
});
