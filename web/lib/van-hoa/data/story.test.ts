import { describe, expect, it } from "vitest";
import { ANH_HUNG } from "../../anh-hung";
import { NAM_SU_KIEN } from "./nam-su-kien";
import { SU_KIEN } from "./su-kien";
import { STORY } from "./story";
import { FIXTURE_SLUG } from "../types";

const REAL = STORY.filter((s) => s.slug !== FIXTURE_SLUG);
const heroSlugs = new Set(ANH_HUNG.map((a) => a.slug));
const eventIds = new Set([...NAM_SU_KIEN.map((e) => e.id).filter(Boolean), ...SU_KIEN.map((e) => e.slug)]);

describe("dữ liệu câu chuyện (STORY)", () => {
  it("mỗi câu chuyện có ít nhất 6 bài trong batch đầu, phủ đủ 6 cụm nhân vật", () => {
    expect(REAL.length).toBeGreaterThanOrEqual(6);
    const heroes = new Set(REAL.flatMap((s) => s.relatedPeople ?? []));
    for (const h of ["tran-hung-dao", "nguyen-trai", "ngo-quyen", "quang-trung", "hai-ba-trung"]) {
      expect(heroes.has(h)).toBe(true);
    }
    expect(heroes.has("le-lai") || heroes.has("le-loi")).toBe(true);
  });

  it("slug duy nhất", () => {
    const slugs = REAL.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("có câu hỏi chính, tối thiểu 3 mục nội dung, và ít nhất một nguồn", () => {
    for (const s of REAL) {
      expect(s.mainQuestion.length).toBeGreaterThan(10);
      expect(s.sections.length).toBeGreaterThanOrEqual(3);
      expect(s.sources.length).toBeGreaterThan(0);
    }
  });

  it("relatedPeople trỏ tới nhân vật có thật trong ANH_HUNG", () => {
    for (const s of REAL) {
      expect(s.relatedPeople?.length ?? 0).toBeGreaterThan(0);
      for (const slug of s.relatedPeople ?? []) expect(heroSlugs.has(slug)).toBe(true);
    }
  });

  it("relatedEvents (khi có) trỏ tới mốc/sự kiện có thật", () => {
    for (const s of REAL) {
      for (const id of s.relatedEvents ?? []) expect(eventIds.has(id)).toBe(true);
    }
  });

  it("readNext (khi có) có href hợp lệ, không trỏ về chính nó", () => {
    for (const s of REAL) {
      if (!s.readNext) continue;
      expect(s.readNext.href.startsWith("/")).toBe(true);
      expect(s.readNext.href).not.toBe(`/van-hoa/cau-chuyen/${s.slug}/`);
    }
  });

  it("readNext không trỏ tới trang /le/ (ngày giỗ) — luôn có một liên kết biên tập rõ ràng khác", () => {
    for (const s of REAL) {
      if (!s.readNext) continue;
      expect(s.readNext.href.startsWith("/le/")).toBe(false);
    }
  });

  it("readNext trỏ tới câu chuyện khác thì slug đó phải tồn tại và đã xuất bản (không trỏ tới bài chưa viết)", () => {
    const storySlugs = new Set(REAL.map((s) => s.slug));
    for (const s of REAL) {
      const href = s.readNext?.href;
      if (!href?.startsWith("/van-hoa/cau-chuyen/")) continue;
      const target = href.replace("/van-hoa/cau-chuyen/", "").replace(/\/$/, "");
      expect(storySlugs.has(target), `${s.slug}.readNext -> "${target}" chưa xuất bản`).toBe(true);
    }
  });

  it("series: order/total hợp lệ, đúng số bài, thứ tự liên tục không trùng lặp", () => {
    const bySeries = new Map<string, typeof REAL>();
    for (const s of REAL) {
      if (!s.series) continue;
      bySeries.set(s.series.slug, [...(bySeries.get(s.series.slug) ?? []), s]);
    }
    for (const [slug, stories] of bySeries) {
      const total = stories[0]!.series!.total;
      expect(stories.length, `series "${slug}" thiếu bài: total=${total} nhưng chỉ có ${stories.length}`).toBe(total);
      const orders = stories.map((s) => s.series!.order).sort((a, b) => a - b);
      expect(orders, `series "${slug}" thứ tự order không liên tục 1..${total}`).toEqual(Array.from({ length: total }, (_, i) => i + 1));
      for (const s of stories) expect(s.series!.total, `${s.slug}.series.total không khớp giữa các bài cùng series`).toBe(total);
    }
  });

  it("series 'bach-dang-938' là series thật gồm đúng 4 bài theo đúng thứ tự", () => {
    const series = REAL.filter((s) => s.series?.slug === "bach-dang-938").sort((a, b) => a.series!.order - b.series!.order);
    expect(series.map((s) => s.slug)).toEqual([
      "kieu-cong-tien-cau-cuu-nam-han",
      "ngo-quyen-chuan-bi-chong-nam-han",
      "vi-sao-ngo-quyen-chon-song-bach-dang",
      "sau-bach-dang-938-ngo-quyen-lam-gi",
    ]);
  });

  it("series 'nguyen-trai-lam-son' là series thật gồm đúng 4 bài theo đúng thứ tự", () => {
    const series = REAL.filter((s) => s.series?.slug === "nguyen-trai-lam-son").sort((a, b) => a.series!.order - b.series!.order);
    expect(series.map((s) => s.slug)).toEqual([
      "nguyen-trai-den-voi-le-loi-nhu-the-nao",
      "quan-trung-tu-menh-tap-duoc-dung-the-nao",
      "hoi-the-dong-quan-dien-ra-nhu-the-nao",
      "binh-ngo-dai-cao-ra-doi-trong-hoan-canh-nao",
    ]);
  });

  it("Hội thề Lũng Nhai và Hội thề Đông Quan là hai bài khác nhau, không trùng lặp nội dung/route", () => {
    const lungNhai = REAL.find((s) => s.slug === "hoi-the-lung-nhai-con-so-18-anh-hung");
    const dongQuan = REAL.find((s) => s.slug === "hoi-the-dong-quan-dien-ra-nhu-the-nao");
    expect(lungNhai).toBeTruthy();
    expect(dongQuan).toBeTruthy();
    expect(lungNhai!.slug).not.toBe(dongQuan!.slug);
    // Đông Quan thuộc series nguyen-trai-lam-son (cuối cuộc chiến); Lũng Nhai đứng riêng (đầu cuộc chiến), không gắn series đó.
    expect(dongQuan!.series?.slug).toBe("nguyen-trai-lam-son");
    expect(lungNhai!.series).toBeUndefined();
  });

  it("các bài mới về Hai Bà Trưng không gộp thần tích/truyền tụng địa phương thành một mốc sử liệu duy nhất", () => {
    const s = REAL.find((x) => x.slug === "vi-sao-nhieu-noi-cung-tho-hai-ba-trung")!;
    expect(s).toBeTruthy();
    expect(s.sourceStatus).toBe("truyen-tung");
    // Không thêm các "nữ tướng" chưa có hồ sơ vào relatedPeople (tránh tạo cảm giác đã xác minh như nhân vật có hồ sơ thật).
    expect(s.relatedPeople).toEqual(["hai-ba-trung"]);
  });

  it("batch 4: bài cầu nối Ngô Quyền → Đinh Bộ Lĩnh đã xuất bản, liên kết đúng hai hồ sơ", () => {
    const s = REAL.find((x) => x.slug === "loan-12-su-quan-dinh-bo-linh-thong-nhat-the-nao")!;
    expect(s, "chưa xuất bản bài cầu nối Ngô Quyền → Đinh Bộ Lĩnh").toBeTruthy();
    expect(s.relatedPeople).toEqual(["ngo-quyen", "dinh-tien-hoang"]);
    expect(s.readNext?.href).toBe("/anh-hung-dan-toc/dinh-tien-hoang/");
  });

  it("batch 4: bài 'Nguyễn Trãi được minh oan như thế nào?' đã xuất bản, và không khẳng định câu thơ 'Ức Trai tâm thượng quang Khuê tảo' là đã được xác minh", () => {
    const s = REAL.find((x) => x.slug === "nguyen-trai-duoc-minh-oan-nhu-the-nao")!;
    expect(s, "chưa xuất bản bài minh oan Nguyễn Trãi").toBeTruthy();
    expect(s.relatedPeople).toEqual(["nguyen-trai", "le-thanh-tong"]);
    expect(s.readNext?.href).toBe("/anh-hung-dan-toc/le-thanh-tong/");
    const full = s.sections.flatMap((sec) => sec.paras).join(" ");
    expect(full).toMatch(/Ức Trai tâm thượng quang Khuê tảo/);
    // Phải gắn nhãn "cách kể phổ biến" cho câu thơ này, không trình bày như đã xác minh xuất xứ.
    expect(full).toMatch(/cách kể phổ biến/);
  });

  it("batch 4: readNext cuối series 'bach-dang-938' và bài 'vu-an-le-chi-vien' trỏ sang đúng bài câu chuyện mới (không còn trỏ thẳng sự kiện/hồ sơ)", () => {
    const suBachDang = REAL.find((x) => x.slug === "sau-bach-dang-938-ngo-quyen-lam-gi")!;
    expect(suBachDang.readNext?.href).toBe("/van-hoa/cau-chuyen/loan-12-su-quan-dinh-bo-linh-thong-nhat-the-nao/");
    const vuAn = REAL.find((x) => x.slug === "vu-an-le-chi-vien")!;
    expect(vuAn.readNext?.href).toBe("/van-hoa/cau-chuyen/nguyen-trai-duoc-minh-oan-nhu-the-nao/");
  });

  it("batch 6: bài Lý Thường Kiệt/Ung Châu đã xuất bản, đủ nguồn, và KHÔNG trình bày việc ngâm 'Nam quốc sơn hà' như một sự kiện đã xác thực", () => {
    const s = REAL.find((x) => x.slug === "vi-sao-ly-thuong-kiet-chu-dong-danh-ung-chau")!;
    expect(s, "chưa xuất bản bài Lý Thường Kiệt đánh Ung Châu").toBeTruthy();
    expect(s.relatedPeople).toEqual(["ly-thuong-kiet"]);
    expect(s.sources.length).toBeGreaterThanOrEqual(3);
    // Batch 9B: readNext đổi sang Story "Nam quốc sơn hà" (nối flow tự nhiên — cùng bài đã nhắc bài thơ này ở mục con-tranh-luan).
    expect(s.readNext?.href).toBe("/van-hoa/cau-chuyen/nam-quoc-son-ha-xuat-hien-trong-su-lieu-the-nao/");
    const full = s.sections.flatMap((sec) => sec.paras).join(" ");
    // Bài thơ phải được gắn nhãn truyền tụng/chưa xác định, không phải khẳng định chắc chắn.
    expect(full).toMatch(/truyền tụng/);
    expect(full).toMatch(/KHÔNG được xử lý như một chi tiết đã xác thực|chưa có cơ sở khẳng định/);
  });

  it("batch 8: bài chuyển giao Lý -> Trần đã xuất bản, đủ nguồn, không viết lại tiểu sử Trần Thủ Độ/Trần Thái Tông, không kết luận một phía", () => {
    const s = REAL.find((x) => x.slug === "cuoi-thoi-ly-dau-thoi-tran-chuyen-giao-dien-ra-nhu-the-nao")!;
    expect(s, "chưa xuất bản bài chuyển giao Lý -> Trần").toBeTruthy();
    expect(s.relatedPeople).toEqual(["tran-thu-do", "tran-thai-tong"]);
    expect(s.sources.length).toBeGreaterThanOrEqual(3);
    expect(s.readNext?.href).toBe("/anh-hung-dan-toc/tran-thai-tong/");
    const full = s.sections.flatMap((sec) => sec.paras).join(" ");
    // Phải nêu rõ đây là điểm sử gia đánh giá khác nhau, không chọn một phía — và phải trình bày CẢ hai luồng
    // (Nho giáo phê phán / nghiên cứu hiện đại thực dụng hơn), không chỉ khẳng định một kết luận duy nhất.
    expect(full).toMatch(/không chọn một phía/);
    expect(full).toMatch(/lên án|phê phán/);
    expect(full).toMatch(/thực dụng|bối cảnh chính trị rộng hơn/);
    // Bài không nhắc lại toàn bộ tiểu sử (không có mục công trạng dạng danh sách như hồ sơ AnhHung).
    expect((s.intro ?? []).join(" ")).toMatch(/không nhắc lại toàn bộ tiểu sử/);
  });

  it("batch 9B: bài Trúc Lâm đã xuất bản, đủ nguồn học thuật/di sản (không chỉ blog du lịch), không viết 'sau chiến thắng thì giác ngộ'", () => {
    const s = REAL.find((x) => x.slug === "tran-nhan-tong-tu-hoang-de-den-truc-lam")!;
    expect(s, "chưa xuất bản bài Trúc Lâm").toBeTruthy();
    expect(s.relatedPeople).toEqual(["tran-nhan-tong"]);
    expect(s.sources.length).toBeGreaterThanOrEqual(3);
    // Nguồn ưu tiên: phải có Viện Trần Nhân Tông, không được đứng một mình như nguồn duy nhất là blog du lịch.
    expect(s.sources.some((src) => /Viện Trần Nhân Tông/.test(src.text))).toBe(true);
    expect(s.sources.every((src) => !/dulich|traveloka|klook/i.test(src.text))).toBe(true);
    expect(s.readNext?.href).toBe("/van-hoa/le-hoi/le-hoi-yen-tu/");
    const full = s.sections.flatMap((sec) => sec.paras).join(" ");
    // Không viết chuỗi nhân-quả tức thời "thắng trận -> giác ngộ".
    expect(full).not.toMatch(/sau khi (thắng|chiến thắng).{0,20}(giác ngộ|xuất gia)/);
    expect(full).toMatch(/không phải một chuỗi nhân/);
    // Phải phân biệt sử liệu và truyền thống Phật giáo bồi đắp về sau.
    expect(full).toMatch(/truyền thống.{0,20}bồi đắp|bồi đắp qua nhiều thế kỷ/);
    // related phải trỏ tới hồ sơ + trang giỗ (rabbit-hole đề bài yêu cầu).
    expect((s.related ?? []).some((r) => r.href === "/anh-hung-dan-toc/tran-nhan-tong/")).toBe(true);
    expect((s.related ?? []).some((r) => r.href === "/le/gio-tran-nhan-tong/")).toBe(true);
  });

  it("batch 9B: bài Nam quốc sơn hà đã xuất bản, KHÔNG khẳng định tác giả là fact chắc chắn, gắn nhãn 'tuyên ngôn độc lập' là cách gọi phổ biến, không đưa số dị bản chưa xác minh phương pháp đếm", () => {
    const s = REAL.find((x) => x.slug === "nam-quoc-son-ha-xuat-hien-trong-su-lieu-the-nao")!;
    expect(s, "chưa xuất bản bài Nam quốc sơn hà").toBeTruthy();
    expect(s.relatedPeople).toEqual(["ly-thuong-kiet"]);
    expect(s.relatedEvents ?? []).toEqual([]); // không gán Event cho văn bản/truyền thuyết lịch sử cổ
    expect(s.sources.length).toBeGreaterThanOrEqual(3);
    expect(s.readNext?.href).toBe("/anh-hung-dan-toc/ly-thuong-kiet/");
    const full = s.sections.flatMap((sec) => sec.paras).join(" ");
    // Không khẳng định tác giả như fact — chỉ "gắn với"/"tương truyền".
    expect(full).not.toMatch(/Lý Thường Kiệt (sáng tác|viết|là tác giả)\b(?!.{0,10}(thường|tương truyền))/);
    expect(full).toMatch(/thường được gắn với|tương truyền là của/);
    // "Tuyên ngôn độc lập" phải gắn nhãn là cách gọi phổ biến, không phải kết luận học thuật đơn nhất.
    expect(full).toMatch(/cách gọi phổ biến|cách đánh giá phổ biến/);
    expect(full).toMatch(/không phải một kết luận sử học đã được xác lập|không phải một phân loại học thuật/);
    // Không đưa con số dị bản cụ thể (35 sách / 8 thần tích) chưa xác minh được phương pháp đếm trong 9B.
    expect(full).not.toMatch(/35 dị bản|8 dị bản/);
    // Bài Ung Châu phải nối readNext sang đây.
    const ungChau = REAL.find((x) => x.slug === "vi-sao-ly-thuong-kiet-chu-dong-danh-ung-chau")!;
    expect(ungChau.readNext?.href).toBe(`/van-hoa/cau-chuyen/${s.slug}/`);
  });
});
