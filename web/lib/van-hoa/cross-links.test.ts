import { describe, expect, it } from "vitest";
import { ANH_HUNG } from "../anh-hung";
import { NAM_SU_KIEN_IMPORTED } from "./data/nam-su-kien.generated";
import {
  aliasesOfPerson,
  crossLinkStats,
  firstMentions,
  linkSegments,
  personCatalog,
  relatedEventsOf,
  relatedPeopleOf,
} from "./cross-links";

const hung = ANH_HUNG.find((a) => a.slug === "hung-vuong")!;
const tran = ANH_HUNG.find((a) => a.slug === "tran-hung-dao")!;
const catalog = personCatalog();

describe("tên riêng để khớp", () => {
  it("lấy tên đầy đủ, bỏ danh xưng chung", () => {
    const hungNames = aliasesOfPerson(hung).map((a) => a.alias);
    expect(hungNames).toContain("Hùng Vương");
    expect(hungNames).not.toContain("Vua Hùng");
    expect(hungNames).not.toContain("Quốc tổ Hùng Vương");

    const qt = aliasesOfPerson(ANH_HUNG.find((a) => a.slug === "quang-trung")!);
    expect(qt.map((a) => a.alias)).toEqual(expect.arrayContaining(["Quang Trung", "Nguyễn Huệ"]));

    const hcm = aliasesOfPerson(ANH_HUNG.find((a) => a.slug === "ho-chi-minh")!);
    expect(hcm.map((a) => a.alias)).toEqual(expect.arrayContaining(["Hồ Chí Minh", "Nguyễn Ái Quốc"]));
  });

  it("không khớp tên chung; khớp tên riêng; chỉ lần đầu", () => {
    expect(firstMentions("Quân nhà Trần và vua Trần kéo ra Bắc", catalog).map((h) => h.slug)).toEqual([]);
    expect(firstMentions("Trần Hưng Đạo chỉ huy quân dân", catalog).map((h) => h.slug)).toEqual(["tran-hung-dao"]);
    expect(firstMentions("thành lập tại khu rừng Trần Hưng Đạo (Cao Bằng)", catalog).map((h) => h.slug)).toEqual([]);
    const two = firstMentions("Trần Hưng Đạo gặp Trần Hưng Đạo lần nữa", catalog);
    expect(two).toHaveLength(1);
    const segs = linkSegments("Trần Hưng Đạo rồi lại Trần Hưng Đạo", catalog, new Set(), (s) => `/p/${s}/`);
    expect(segs.filter((s) => s.href).map((s) => s.text)).toEqual(["Trần Hưng Đạo"]);
  });

  it("tên dài thắng tên ngắn chồng lên nhau", () => {
    const hits = firstMentions("Hưng Đạo đại vương Trần Quốc Tuấn", catalog);
    expect(hits.map((h) => h.slug)).toEqual(["tran-hung-dao"]);
  });
});

describe("quét chéo 235 mốc × anh hùng", () => {
  it("mỗi mốc có id; liên kết hai chiều", () => {
    expect(NAM_SU_KIEN_IMPORTED).toHaveLength(235);
    expect(NAM_SU_KIEN_IMPORTED.every((e) => e.id)).toBe(true);
    const auLac = NAM_SU_KIEN_IMPORTED.find((e) => e.id === "-256-thuc-phan-lap-nuoc-au-lac")!;
    expect(relatedPeopleOf(auLac)).toEqual(expect.arrayContaining(["hung-vuong", "an-duong-vuong"]));
    expect(relatedEventsOf(hung)).toContain("-256-thuc-phan-lap-nuoc-au-lac");
    const stats = crossLinkStats();
    expect(stats.eventsTotal).toBe(235);
    expect(stats.peopleTotal).toBe(ANH_HUNG.length);
    expect(stats.eventsLinked).toBeGreaterThan(20);
    expect(stats.peopleLinked).toBeGreaterThan(10);
  });

  it("không bịa Trần Hưng Đạo từ chữ vua Trần", () => {
    const falsePos = NAM_SU_KIEN_IMPORTED.filter((e) => {
      const body = `${e.title}\n${e.summary}\n${e.disputed ?? ""}`;
      return /\bvua Trần\b/.test(body) && !/Trần Hưng Đạo|Trần Quốc Tuấn|Hưng Đạo/i.test(body) && relatedPeopleOf(e).includes("tran-hung-dao");
    });
    expect(falsePos.map((e) => e.id)).toEqual([]);
    expect(aliasesOfPerson(tran).some((a) => a.alias === "Trần")).toBe(false);
    const gp = NAM_SU_KIEN_IMPORTED.find((e) => e.id === "1944-thanh-lap-doi-vn-tuyen-truyen-giai-phong-quan")!;
    expect(relatedPeopleOf(gp)).toEqual(expect.arrayContaining(["ho-chi-minh", "vo-nguyen-giap"]));
    expect(relatedPeopleOf(gp)).not.toContain("tran-hung-dao");
  });
});
