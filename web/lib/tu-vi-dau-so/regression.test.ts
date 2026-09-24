/**
 * Lá số mẫu cố định (golden) — chặn thay đổi ngoài ý muốn. Mẫu 1 trùng kết quả iztro.bySolar
 * (lịch Trung Quốc cho cùng ngày âm 23/4 Canh Ngọ), trừ các sao Nam phái ghi riêng.
 */
import { describe, expect, it } from "vitest";
import { placeById } from "@/lib/birth/places";
import { chuanHoaNgaySinh } from "./birth";
import { lapLaSo } from "./engine";
import { giaiNghiaCung, Y_NGHIA_CHINH_TINH, Y_NGHIA_PHU_TINH } from "./giai-nghia";
import { STARS, type StarId } from "./stars";
import { vanHanNam } from "./van-han";

const HN = placeById("ha-noi")!;

const saoCung = (ls: ReturnType<typeof lapLaSo>, chi: number) => ls.cung[chi].chinhTinh.map((s) => s.name + (s.hoa ? `(${s.hoa})` : ""));

describe("lá số mẫu", () => {
  it("nam, 17/05/1990 11:30 Hà Nội → 23/4 Canh Ngọ, giờ Ngọ", () => {
    const ns = chuanHoaNgaySinh({ lich: "duong", year: 1990, month: 5, day: 17, hour: 11, minute: 30, place: HN, gioiTinh: "nam" });
    expect(ns.lunar).toEqual({ year: 1990, month: 4, day: 23, isLeapMonth: false, hourChi: 6 });
    const ls = lapLaSo(ns.lunar, "nam");
    expect(ls.canChiNam.name).toBe("Canh Ngọ");
    expect(ls.amDuong).toBe("Dương Nam");
    expect(ls.banMenh.name).toBe("Lộ Bàng Thổ");
    expect(ls.cuc.ten).toBe("Thổ ngũ cục");
    expect([ls.menhChi, ls.thanChi, ls.thanCu]).toEqual([11, 11, "Mệnh"]);
    expect([ls.menhChu, ls.thanChu]).toEqual(["Cự Môn", "Hỏa Tinh"]);
    expect(saoCung(ls, 11)).toEqual(["Cự Môn"]);
    expect(saoCung(ls, 8)).toEqual(["Tử Vi", "Thiên Phủ"]);
    expect(saoCung(ls, 5)).toEqual(["Thái Dương(Lộc)"]);
    expect(saoCung(ls, 4)).toEqual(["Vũ Khúc(Quyền)"]);
    expect(saoCung(ls, 9)).toEqual(["Thái Âm(Khoa)"]);
    expect(saoCung(ls, 3)).toEqual(["Thiên Đồng(Kỵ)"]);
    expect(saoCung(ls, 0)).toEqual(["Liêm Trinh", "Thiên Tướng"]);
    // Nam phái: năm Canh — Khôi Ngọ, Việt Dần (iztro: Sửu, Mùi); Linh Tinh nghịch Mão − 6 = Dậu (trùng iztro do đúng nửa vòng).
    expect([ls.viTri.thienKhoi, ls.viTri.thienViet, ls.viTri.hoaTinh, ls.viTri.linhTinh]).toEqual([6, 2, 7, 9]);
    expect(ls.cung[11].daiHan).toEqual({ tu: 5, den: 14 });
    expect(ls.cung[0].daiHan).toEqual({ tu: 15, den: 24 });
    expect(ls.tuan).toEqual([10, 11]);
    expect(ls.triet).toEqual([6, 7]);
  });

  it("vận hạn mẫu: năm 2026 Bính Ngọ, 37 tuổi", () => {
    const ls = lapLaSo({ year: 1990, month: 4, day: 23, isLeapMonth: false, hourChi: 6 }, "nam");
    const vh = vanHanNam(ls, 2026);
    expect(vh.tuoi).toBe(37);
    expect(vh.canChiNamXem.name).toBe("Bính Ngọ");
    expect(vh.daiHan?.ten).toBe("Điền Trạch"); // 35–44 tại Dần
    expect(vh.daiHan?.chi).toBe(2);
    expect(vh.tieuHan.chi).toBe(4); // Thìn
    expect(vh.tuHoaLuu.map((t) => t.name)).toEqual(["Thiên Đồng", "Thiên Cơ", "Văn Xương", "Liêm Trinh"]);
    expect(() => vanHanNam(ls, 1989)).toThrow();
    expect(() => vanHanNam(ls, 2110)).toThrow();
  });

  it("nữ, âm lịch 30/12/2023 (Quý Mão) giờ Hợi — ngày 30 cuối năm", () => {
    const ns = chuanHoaNgaySinh({ lich: "am", year: 2023, month: 12, day: 30, hour: 22, minute: 10, place: HN, gioiTinh: "nu" });
    expect(ns.solarCivil).toEqual({ year: 2024, month: 2, day: 9 });
    const ls = lapLaSo(ns.lunar, "nu");
    expect(ls.canChiNam.name).toBe("Quý Mão");
    expect(ls.amDuong).toBe("Âm Nữ");
    expect(ls.thuan).toBe(true);
  });
});

describe("giải nghĩa", () => {
  it("có nội dung cho đủ 14 chính tinh và mọi phụ tinh hiển thị", () => {
    for (const [id, meta] of Object.entries(STARS) as [StarId, (typeof STARS)[StarId]][]) {
      if (meta.group === "khong") continue;
      if (meta.group === "chinh") expect(Y_NGHIA_CHINH_TINH[id]?.moTa.length).toBeGreaterThan(40);
      else expect(Y_NGHIA_PHU_TINH[id], id).toBeTruthy();
    }
  });

  it("cung vô chính diệu mượn sao cung xung chiếu", () => {
    // Tử Vi ở Dần (Thủy nhị cục ngày 2…) thì có cung trống; lấy lá số đầu tiên có cung vô chính diệu.
    let ls = lapLaSo({ year: 1990, month: 1, day: 1, isLeapMonth: false, hourChi: 0 }, "nam");
    for (let d = 1; d <= 30 && ls.cung.every((c) => c.chinhTinh.length); d++) ls = lapLaSo({ year: 1990, month: 1, day: d, isLeapMonth: false, hourChi: 0 }, "nam");
    const vcd = ls.cung.find((c) => c.chinhTinh.length === 0)!;
    expect(vcd).toBeDefined();
    const doan = giaiNghiaCung(ls, vcd.chi);
    const doi = ls.cung[(vcd.chi + 6) % 12];
    const text = doan.find((d) => d.tieuDe === "Vô chính diệu")!.noiDung;
    for (const s of doi.chinhTinh) expect(text).toContain(s.name);
  });
});
