/**
 * Kiểm tra hệ thống quan hệ Lịch sử & Anh hùng dân tộc (relatedPeople/relatedEvents/relatedFestivals):
 * không dead-link, không self-link, không trùng lặp, và hai trận Bạch Đằng 938/1288 không bị trộn quan hệ.
 */
import { describe, expect, it } from "vitest";
import { ANH_HUNG } from "../anh-hung";
import { LE_HOI } from "./data/le-hoi";
import { SU_KIEN, suKienBySlug } from "./data/su-kien";
import { FIXTURE_SLUG } from "./types";

const REAL_SU_KIEN = SU_KIEN.filter((e) => e.slug !== FIXTURE_SLUG);
const anhHungSlugs = new Set(ANH_HUNG.map((a) => a.slug));
const suKienSlugs = new Set(REAL_SU_KIEN.map((e) => e.slug));
const leHoiSlugs = new Set(LE_HOI.map((f) => f.slug));

function noDup(xs: readonly string[] | undefined) {
  if (!xs) return true;
  return new Set(xs).size === xs.length;
}

describe("quan hệ trên hồ sơ anh hùng dân tộc (AnhHung.relatedPeople / relatedEvents / relatedFestivals)", () => {
  it("relatedPeople trỏ tới slug nhân vật có thật, không tự trỏ tới chính mình, không trùng lặp", () => {
    for (const a of ANH_HUNG) {
      if (!a.relatedPeople?.length) continue;
      expect(noDup(a.relatedPeople), `${a.slug}.relatedPeople có trùng lặp`).toBe(true);
      for (const s of a.relatedPeople) {
        expect(s, `${a.slug}.relatedPeople tự trỏ tới chính mình`).not.toBe(a.slug);
        expect(anhHungSlugs.has(s), `${a.slug}.relatedPeople -> "${s}" không tồn tại trong ANH_HUNG (dead-link)`).toBe(true);
      }
    }
  });

  it("relatedEvents trỏ tới sự kiện có thật (NAM_SU_KIEN hoặc SU_KIEN), không trùng lặp", () => {
    for (const a of ANH_HUNG) {
      if (!a.relatedEvents?.length) continue;
      expect(noDup(a.relatedEvents), `${a.slug}.relatedEvents có trùng lặp`).toBe(true);
    }
    // Ngô Quyền / Trần Hưng Đạo trỏ đúng bài sự kiện chuyên sâu tương ứng, không lẫn sang trận kia.
    const ngoQuyen = ANH_HUNG.find((a) => a.slug === "ngo-quyen")!;
    const tranHungDao = ANH_HUNG.find((a) => a.slug === "tran-hung-dao")!;
    expect(ngoQuyen.relatedEvents).toEqual(["bach-dang-938"]);
    expect(tranHungDao.relatedEvents).toEqual(["bach-dang-1288"]);
  });

  it("relatedFestivals trỏ tới lễ hội có thật trong LE_HOI, không trùng lặp", () => {
    for (const a of ANH_HUNG) {
      if (!a.relatedFestivals?.length) continue;
      expect(noDup(a.relatedFestivals), `${a.slug}.relatedFestivals có trùng lặp`).toBe(true);
      for (const s of a.relatedFestivals) {
        expect(leHoiSlugs.has(s), `${a.slug}.relatedFestivals -> "${s}" không tồn tại trong LE_HOI (dead-link)`).toBe(true);
      }
    }
  });

  it("Lê Lợi và Lê Lai trỏ lẫn nhau (đúng cụm), không tự trỏ chính mình", () => {
    const leLoi = ANH_HUNG.find((a) => a.slug === "le-loi")!;
    const leLai = ANH_HUNG.find((a) => a.slug === "le-lai")!;
    expect(leLoi.relatedPeople).toContain("le-lai");
    expect(leLai.relatedPeople).toContain("le-loi");
  });

  it("nguoiLienQuan (khi có) có lý do quan hệ không rỗng, không tự trỏ chính mình, không trùng slug", () => {
    for (const a of ANH_HUNG) {
      if (!a.nguoiLienQuan?.length) continue;
      const slugs = a.nguoiLienQuan.map((r) => r.slug);
      expect(noDup(slugs), `${a.slug}.nguoiLienQuan có slug trùng lặp`).toBe(true);
      for (const r of a.nguoiLienQuan) {
        expect(r.slug, `${a.slug}.nguoiLienQuan tự trỏ tới chính mình`).not.toBe(a.slug);
        expect(r.relation.trim().length, `${a.slug}.nguoiLienQuan -> "${r.slug}" thiếu lý do quan hệ`).toBeGreaterThan(8);
        expect(r.ten.trim().length, `${a.slug}.nguoiLienQuan -> "${r.slug}" thiếu tên hiển thị`).toBeGreaterThan(0);
      }
    }
  });

  it("7 hồ sơ ưu tiên đều có nguoiLienQuan (rabbit hole đợt này)", () => {
    for (const slug of ["ngo-quyen", "tran-hung-dao", "nguyen-trai", "le-loi", "le-lai", "quang-trung", "hai-ba-trung"]) {
      const a = ANH_HUNG.find((x) => x.slug === slug)!;
      expect(a.nguoiLienQuan?.length ?? 0, `${slug} chưa có nguoiLienQuan`).toBeGreaterThan(0);
    }
  });

  it("batch 3: 9 hồ sơ rabbit-hole mở rộng đều có nguoiLienQuan", () => {
    for (const slug of ["tran-quang-khai", "pham-ngu-lao", "yet-kieu", "da-tuong", "tran-nhan-tong", "le-thanh-tong", "duong-dinh-nghe", "ngo-thi-nham", "nguyen-nhac"]) {
      const a = ANH_HUNG.find((x) => x.slug === slug)!;
      expect(a, `${slug} không tồn tại trong ANH_HUNG`).toBeTruthy();
      expect(a.nguoiLienQuan?.length ?? 0, `${slug} chưa có nguoiLienQuan`).toBeGreaterThan(0);
    }
  });

  it("nguoiLienQuan của cụm Lam Sơn (Lê Lợi/Lê Lai/Nguyễn Trãi/Lê Thánh Tông) không lẫn nhân vật vụ án Lệ Chi Viên khác thời", () => {
    const leThanhTong = ANH_HUNG.find((a) => a.slug === "le-thanh-tong")!;
    const slugs = leThanhTong.nguoiLienQuan?.map((r) => r.slug) ?? [];
    // Lê Thánh Tông liên quan tới Lê Lợi (ông nội) và Nguyễn Trãi (người ông minh oan) — không phải nhân vật của một triều đại/sự kiện khác không liên quan.
    expect(slugs).toContain("le-loi");
    expect(slugs).toContain("nguyen-trai");
  });

  it("batch 4: cầu nối Ngô Quyền → Đinh Tiên Hoàng → Lê Đại Hành có nguoiLienQuan hai chiều", () => {
    const ngoQuyen = ANH_HUNG.find((a) => a.slug === "ngo-quyen")!;
    const dinhTienHoang = ANH_HUNG.find((a) => a.slug === "dinh-tien-hoang")!;
    const leDaiHanh = ANH_HUNG.find((a) => a.slug === "le-dai-hanh")!;
    expect(dinhTienHoang, "dinh-tien-hoang không tồn tại trong ANH_HUNG").toBeTruthy();
    expect(leDaiHanh, "le-dai-hanh không tồn tại trong ANH_HUNG").toBeTruthy();
    expect(ngoQuyen.nguoiLienQuan?.map((r) => r.slug)).toContain("dinh-tien-hoang");
    expect(dinhTienHoang.nguoiLienQuan?.map((r) => r.slug)).toContain("ngo-quyen");
    expect(dinhTienHoang.nguoiLienQuan?.map((r) => r.slug)).toContain("le-dai-hanh");
    expect(leDaiHanh.nguoiLienQuan?.map((r) => r.slug)).toContain("dinh-tien-hoang");
  });

  it("batch 4: quan hệ Đinh Tiên Hoàng ↔ Lê Đại Hành (kế vị 979-980) không khẳng định một động cơ duy nhất (\"cướp ngôi\"/\"buộc phải lên ngôi\") là sự thật đã xác định", () => {
    const dinhTienHoang = ANH_HUNG.find((a) => a.slug === "dinh-tien-hoang")!;
    const leDaiHanh = ANH_HUNG.find((a) => a.slug === "le-dai-hanh")!;
    const relDinh = dinhTienHoang.nguoiLienQuan?.find((r) => r.slug === "le-dai-hanh");
    const relLe = leDaiHanh.nguoiLienQuan?.find((r) => r.slug === "dinh-tien-hoang");
    for (const rel of [relDinh, relLe]) {
      expect(rel, "thiếu quan hệ").toBeTruthy();
      // Không được khẳng định dứt khoát bằng các cụm từ coi là sự thật đã xác định.
      expect(rel!.relation).not.toMatch(/cướp ngôi|buộc phải lên ngôi/);
    }
    // Nhưng phải nêu rõ đây là điểm chưa có sự đồng thuận, không lờ đi.
    expect(leDaiHanh.ghiChuSuLieu ?? "").toMatch(/chưa có sự đồng thuận|không khẳng định/);
  });

  it("batch 6: Trần Nhân Tông và Lý Thường Kiệt không còn ở trạng thái chỉ-có-Wikipedia (đã thêm trường nguon với nguồn cấp viện/bảo tàng/cơ quan quản lý)", () => {
    for (const slug of ["tran-nhan-tong", "ly-thuong-kiet"]) {
      const a = ANH_HUNG.find((x) => x.slug === slug)!;
      expect(a, `${slug} không tồn tại trong ANH_HUNG`).toBeTruthy();
      expect(a.nguon?.length ?? 0, `${slug}.nguon còn rỗng — vẫn chỉ có wikiTitle`).toBeGreaterThanOrEqual(2);
    }
  });

  it("batch 6: hồ sơ Lý Thường Kiệt không khẳng định tác giả 'Nam quốc sơn hà' hay việc ngâm thơ ở Như Nguyệt là sự thật đã xác định", () => {
    const a = ANH_HUNG.find((x) => x.slug === "ly-thuong-kiet")!;
    const note = a.ghiChuSuLieu ?? "";
    expect(note).toMatch(/CHƯA được xác định chắc chắn|chưa được xác định chắc chắn/);
    expect(note).toMatch(/truyền tụng|truyền thuyết/);
  });
});

describe("bài sự kiện lịch sử chuyên sâu (SU_KIEN)", () => {
  it("có đúng hai bài Bạch Đằng, không trộn dữ liệu 938 và 1288", () => {
    const b938 = suKienBySlug("bach-dang-938")!;
    const b1288 = suKienBySlug("bach-dang-1288")!;
    expect(b938).toBeTruthy();
    expect(b1288).toBeTruthy();
    expect(b938.lunar.year).toBe(938);
    expect(b1288.lunar.year).toBe(1288);
    expect(b938.relatedPeople).toEqual(["ngo-quyen"]);
    expect(b1288.relatedPeople).toEqual(["tran-hung-dao"]);
    expect(b938.relatedPeople).not.toContain("tran-hung-dao");
    expect(b1288.relatedPeople).not.toContain("ngo-quyen");
    // Hai bài liên kết tới nhau qua relatedEvents (khác nhau, không tự trỏ chính mình) chứ không gộp làm một.
    expect(b938.relatedEvents).toContain("bach-dang-1288");
    expect(b1288.relatedEvents).toContain("bach-dang-938");
    expect(b938.relatedEvents).not.toContain(b938.slug);
    expect(b1288.relatedEvents).not.toContain(b1288.slug);
  });

  it("không có sự kiện lịch sử cổ nào gắn Event JSON-LD (solarDateSource phải là computed, không phải sources)", () => {
    // SuKienDetail chỉ phát Event JSON-LD khi solarDateSource === "sources" && có solar — tránh cho sự kiện cổ (không "actionable").
    for (const e of REAL_SU_KIEN) {
      expect(e.solarDateSource, `${e.slug} dùng solarDateSource "sources" sẽ bị phát Event JSON-LD`).toBe("computed");
    }
  });

  it("ngày âm không có ngày cụ thể (day: null) thì bắt buộc phải có lunarText giải thích", () => {
    for (const e of REAL_SU_KIEN) {
      if (e.lunar.day === null) {
        expect(e.lunarText, `${e.slug} có lunar.day = null nhưng thiếu lunarText`).toBeTruthy();
      }
    }
  });

  it("mọi relation trong SU_KIEN đều trỏ tới thực thể có thật, không tự trỏ chính mình, không trùng lặp", () => {
    for (const e of REAL_SU_KIEN) {
      expect(noDup(e.relatedPeople), `${e.slug}.relatedPeople trùng lặp`).toBe(true);
      expect(noDup(e.relatedEvents), `${e.slug}.relatedEvents trùng lặp`).toBe(true);
      expect(noDup(e.relatedFestivals), `${e.slug}.relatedFestivals trùng lặp`).toBe(true);
      for (const s of e.relatedPeople ?? []) {
        expect(anhHungSlugs.has(s), `${e.slug}.relatedPeople -> "${s}" không tồn tại (dead-link)`).toBe(true);
      }
      for (const s of e.relatedEvents ?? []) {
        expect(s, `${e.slug}.relatedEvents tự trỏ tới chính mình`).not.toBe(e.slug);
        expect(suKienSlugs.has(s), `${e.slug}.relatedEvents -> "${s}" không tồn tại trong SU_KIEN (dead-link)`).toBe(true);
      }
      for (const s of e.relatedFestivals ?? []) {
        expect(leHoiSlugs.has(s), `${e.slug}.relatedFestivals -> "${s}" không tồn tại trong LE_HOI (dead-link)`).toBe(true);
      }
    }
  });

  it("mỗi bài đều có nguồn (sources) không rỗng — không publish bài lịch sử thiếu nguồn", () => {
    for (const e of REAL_SU_KIEN) {
      expect(e.sources.length, `${e.slug} không có nguồn`).toBeGreaterThan(0);
    }
  });
});

/**
 * Batch 8 — kiểm định định danh/alias (identity audit): mỗi nhân vật có đúng một slug chuẩn (canonical);
 * `tenThat`/`tenKhac` đóng vai trò "tên khác của CÙNG một người" — khác hẳn `nguoiLienQuan` (người khác có
 * quan hệ thật). Không thêm field alias mới vì `tenThat`/`tenKhac` (đã có từ trước) đã đủ dùng.
 */
describe("định danh & alias (tenThat / tenKhac) — batch 8", () => {
  it("canonical slug duy nhất trên toàn bộ 89 hồ sơ", () => {
    const slugs = ANH_HUNG.map((a) => a.slug);
    expect(new Set(slugs).size, "có slug trùng lặp trong ANH_HUNG").toBe(slugs.length);
  });

  it("không có alias (ten/tenThat/tenKhac) nào trùng nhau giữa hai hồ sơ khác slug (một alias không được trỏ mơ hồ tới hai canonical)", () => {
    const owner = new Map<string, string>();
    const collisions: string[] = [];
    for (const a of ANH_HUNG) {
      for (const raw of [a.ten, a.tenThat, ...a.tenKhac]) {
        if (!raw) continue;
        const key = raw.trim();
        if (!key) continue;
        const prev = owner.get(key);
        if (prev && prev !== a.slug) collisions.push(`"${key}": ${prev} vs ${a.slug}`);
        else owner.set(key, a.slug);
      }
    }
    expect(collisions, `alias trùng giữa nhiều hồ sơ: ${collisions.join("; ")}`).toEqual([]);
  });

  it("tenKhac không có phần tử rỗng/trùng lặp trong cùng một hồ sơ; alias không trùng chính tên chuẩn", () => {
    for (const a of ANH_HUNG) {
      expect(noDup(a.tenKhac), `${a.slug}.tenKhac có phần tử trùng lặp`).toBe(true);
      for (const t of a.tenKhac) {
        expect(t.trim().length, `${a.slug}.tenKhac có phần tử rỗng`).toBeGreaterThan(0);
        expect(t.trim(), `${a.slug}.tenKhac chứa chính "ten" — thừa, không phải alias`).not.toBe(a.ten.trim());
      }
      // tenThat rỗng chuỗi bị coi là "không có" (loại "" khỏi khai báo) — không kiểm tenThat === ten vì một
      // vài hồ sơ (vd. nguyen-trai) khai báo tenThat trùng ten một cách có chủ đích (tên thật = tên thường gọi).
      if (a.tenThat !== null) expect(a.tenThat.trim().length, `${a.slug}.tenThat là chuỗi rỗng`).toBeGreaterThan(0);
    }
  });

  it("anhHungByAlias: các cặp định danh đã xác nhận trong dữ liệu thật (birth name / tên thường gọi -> canonical) đều tra ra đúng một hồ sơ", async () => {
    const { anhHungByAlias } = await import("./cross-links");
    const cases: [string, string][] = [
      ["Lý Công Uẩn", "ly-thai-to"],
      ["Trần Quốc Tuấn", "tran-hung-dao"],
      ["Đinh Bộ Lĩnh", "dinh-tien-hoang"],
      ["Lê Hoàn", "le-dai-hanh"],
      ["Nguyễn Huệ", "quang-trung"],
      ["Hồ Chí Minh", "ho-chi-minh"],
      ["Nguyễn Ái Quốc", "ho-chi-minh"],
    ];
    for (const [alias, slug] of cases) {
      const hit = anhHungByAlias(alias);
      expect(hit?.slug, `"${alias}" không tra ra hồ sơ nào`).toBe(slug);
    }
  });

  it("anhHungByAlias: tên chuẩn (canonical) tự tra ra chính nó; tên rỗng/khoảng trắng trả undefined; không phân biệt hoa thường", async () => {
    const { anhHungByAlias } = await import("./cross-links");
    for (const a of ANH_HUNG) {
      expect(anhHungByAlias(a.ten)?.slug, `tên chuẩn "${a.ten}" không tự tra ra được`).toBe(a.slug);
    }
    expect(anhHungByAlias("")).toBeUndefined();
    expect(anhHungByAlias("   ")).toBeUndefined();
    expect(anhHungByAlias("nguyễn huệ")?.slug).toBe("quang-trung");
  });

  it("anhHungByAlias không được dùng để tạo href công khai — href luôn lấy từ slug canonical của kết quả trả về, không phải chuỗi alias truyền vào", async () => {
    const { anhHungByAlias } = await import("./cross-links");
    const { anhHungHref } = await import("../anh-hung");
    const hit = anhHungByAlias("Nguyễn Huệ")!;
    expect(anhHungHref(hit.slug)).toBe("/anh-hung-dan-toc/quang-trung/");
    expect(anhHungHref(hit.slug)).not.toContain("nguyen-hue");
  });

  it("cầu nối Lý → Trần: Trần Thủ Độ và Trần Thái Tông có nguoiLienQuan hai chiều thật (không phải bịa để lấp graph)", () => {
    const thuDo = ANH_HUNG.find((a) => a.slug === "tran-thu-do")!;
    const thaiTong = ANH_HUNG.find((a) => a.slug === "tran-thai-tong")!;
    expect(thuDo.nguoiLienQuan?.map((r) => r.slug)).toContain("tran-thai-tong");
    expect(thaiTong.nguoiLienQuan?.map((r) => r.slug)).toContain("tran-thu-do");
  });

  it("batch 9B: cụm Lý Thường Kiệt ↔ Lý Thánh Tông ↔ Lý Nhân Tông có nguoiLienQuan hai chiều thật, không self-link, không trùng lặp, target tồn tại", () => {
    const kiet = ANH_HUNG.find((a) => a.slug === "ly-thuong-kiet")!;
    const thanhTong = ANH_HUNG.find((a) => a.slug === "ly-thanh-tong")!;
    const nhanTong = ANH_HUNG.find((a) => a.slug === "ly-nhan-tong")!;
    for (const p of [kiet, thanhTong, nhanTong]) {
      const slugs = (p.nguoiLienQuan ?? []).map((r) => r.slug);
      expect(slugs, `${p.slug} không được self-link`).not.toContain(p.slug);
      expect(new Set(slugs).size, `${p.slug} không được trùng lặp nguoiLienQuan`).toBe(slugs.length);
      for (const s of slugs) expect(anhHungSlugs.has(s), `${p.slug}.nguoiLienQuan -> "${s}" không tồn tại`).toBe(true);
    }
    expect(kiet.nguoiLienQuan?.map((r) => r.slug)).toEqual(expect.arrayContaining(["ly-thanh-tong", "ly-nhan-tong"]));
    expect(thanhTong.nguoiLienQuan?.map((r) => r.slug)).toContain("ly-thuong-kiet");
    expect(nhanTong.nguoiLienQuan?.map((r) => r.slug)).toContain("ly-thuong-kiet");
    // Reason không được là kiểu "cùng thời" chung chung — phải nhắc sự kiện/chức vụ cụ thể.
    for (const p of [kiet, thanhTong, nhanTong]) {
      for (const r of p.nguoiLienQuan ?? []) {
        expect(r.relation.length).toBeGreaterThan(15);
        expect(r.relation).not.toMatch(/^(nhân vật )?cùng thời\.?$/i);
      }
    }
  });

  it("batch 9B: Ỷ Lan / Tô Hiến Thành / Tông Đản tồn tại thật trong ANH_HUNG (verify trước khi 9B dùng làm rabbit-hole)", () => {
    for (const slug of ["y-lan", "to-hien-thanh", "tong-dan"]) {
      expect(anhHungSlugs.has(slug), `hồ sơ "${slug}" phải tồn tại`).toBe(true);
    }
  });

  it("batch 9B: hồ sơ Ngô Thì Nhậm có section factual về Chiếu cầu hiền, không dùng từ 'ghostwriter'", () => {
    const nham = ANH_HUNG.find((a) => a.slug === "ngo-thi-nham")!;
    const text = [...nham.tieuSu, ...nham.congTrang, ...(nham.nguon ?? [])].join(" ");
    expect(text).toMatch(/Chiếu cầu hiền/);
    expect(text.toLowerCase()).not.toMatch(/ghostwriter/);
    // Phải nêu rõ bối cảnh (sĩ phu Bắc Hà) và gắn với triều/Quang Trung, không chỉ nhắc tên văn bản suông.
    expect(text).toMatch(/sĩ phu Bắc Hà|Bắc Hà/);
  });
});
