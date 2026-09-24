import { describe, expect, it } from "vitest";
import { placeById } from "@/lib/birth/places";
import { formatOffset, resolveBirthTime } from "@/lib/birth/time";
import { chuanHoaNgaySinh, hourToChi, type TuViBirthInput } from "./birth";
import { LaSoInputError, lapLaSo } from "./engine";

const HN = placeById("ha-noi")!;
const SG = placeById("tp-hcm")!;
const NY = placeById("new-york")!;
const SYD = placeById("sydney")!;

const input = (o: Partial<TuViBirthInput>): TuViBirthInput => ({
  lich: "duong",
  year: 1990,
  month: 5,
  day: 17,
  hour: 12,
  minute: 0,
  place: HN,
  gioiTinh: "nam",
  ...o,
});

describe("múi giờ nơi sinh", () => {
  it("lịch sử múi giờ Việt Nam theo tzdata", () => {
    const off = (y: number, m: number, d: number, place = SG) => resolveBirthTime({ year: y, month: m, day: d, hour: 12, minute: 0 }, place).offsetMinutes;
    expect(off(1930, 6, 1)).toBe(420);
    expect(off(1944, 6, 1)).toBe(480);
    expect(off(1950, 6, 1)).toBe(480);
    expect(off(1957, 6, 1)).toBe(420);
    expect(off(1970, 6, 1)).toBe(480);
    expect(off(1975, 6, 12)).toBe(480);
    expect(off(1975, 6, 14)).toBe(420);
    expect(off(1990, 6, 1)).toBe(420);
    // Miền Bắc 1960–1975: +07.
    expect(off(1970, 6, 1, HN)).toBe(420);
    expect(resolveBirthTime({ year: 1970, month: 6, day: 1, hour: 12, minute: 0 }, HN).northVietnamAdjusted).toBe(true);
  });

  it("giờ mùa hè: độ lệch, giờ chuẩn, khoảng trống và giờ lặp", () => {
    const summer = resolveBirthTime({ year: 2020, month: 7, day: 1, hour: 12, minute: 0 }, NY);
    expect([summer.offsetMinutes, summer.standardOffsetMinutes, summer.dstMinutes, summer.status]).toEqual([-240, -300, 60, "ok"]);
    const winter = resolveBirthTime({ year: 2020, month: 1, day: 10, hour: 12, minute: 0 }, NY);
    expect([winter.offsetMinutes, winter.dstMinutes]).toEqual([-300, 0]);
    const gap = resolveBirthTime({ year: 2021, month: 3, day: 14, hour: 2, minute: 30 }, NY);
    expect(gap.status).toBe("gap");
    const amb = resolveBirthTime({ year: 2021, month: 11, day: 7, hour: 1, minute: 30 }, NY);
    expect(amb.status).toBe("ambiguous");
    expect(amb.utcMs).toBe(Date.UTC(2021, 10, 7, 5, 30));
    // Nam bán cầu: Sydney giờ mùa hè vào tháng 1.
    const syd = resolveBirthTime({ year: 2020, month: 1, day: 15, hour: 12, minute: 0 }, SYD);
    expect([syd.offsetMinutes, syd.standardOffsetMinutes, syd.dstMinutes]).toEqual([660, 600, 60]);
  });

  it("đổi hẳn múi giờ (Việt Nam 13/6/1975) không bị coi là giờ mùa hè", () => {
    const r = resolveBirthTime({ year: 1975, month: 3, day: 1, hour: 12, minute: 0 }, SG);
    expect([r.offsetMinutes, r.dstMinutes]).toEqual([480, 0]);
  });

  it("định dạng độ lệch", () => {
    expect(formatOffset(420)).toBe("+07:00");
    expect(formatOffset(-210)).toBe("−03:30");
    expect(formatOffset(426.5)).toBe("+07:06:30");
  });
});

describe("chuẩn hóa ngày giờ sinh cho Tử Vi", () => {
  it("canh giờ: Tý 23:00–00:59 … Hợi 21:00–22:59", () => {
    expect([0, 1, 2, 3, 12, 13, 21, 22, 23].map(hourToChi)).toEqual([0, 1, 1, 2, 6, 7, 11, 11, 0]);
  });

  it("sinh 23:30 đêm giao thừa (16/02/2026) thuộc giờ Tý mùng 1 Tết Bính Ngọ", () => {
    const r = chuanHoaNgaySinh(input({ year: 2026, month: 2, day: 16, hour: 23, minute: 30 }));
    expect(r.lunar).toEqual({ year: 2026, month: 1, day: 1, isLeapMonth: false, hourChi: 0 });
    expect(r.solarTuVi).toEqual({ year: 2026, month: 2, day: 17 });
    expect(lapLaSo(r.lunar, "nam").canChiNam.name).toBe("Bính Ngọ");
    expect(r.ghiChu.join(" ")).toMatch(/ngày hôm sau/);
  });

  it("sinh 22:59 cùng ngày vẫn là giờ Hợi năm Ất Tỵ", () => {
    const r = chuanHoaNgaySinh(input({ year: 2026, month: 2, day: 16, hour: 22, minute: 59 }));
    expect(r.lunar).toMatchObject({ year: 2025, month: 12, day: 29, hourChi: 11 });
  });

  it("sinh ở Sài Gòn 1970 (UTC+8): lùi 1 giờ về UTC+7; Hà Nội cùng thời điểm giữ nguyên", () => {
    const sg = chuanHoaNgaySinh(input({ year: 1970, month: 3, day: 10, hour: 9, minute: 30, place: SG }));
    expect(sg.gioTuVi).toMatchObject({ hour: 8, minute: 30, offsetMinutes: 420 });
    expect(sg.lunar.hourChi).toBe(4); // Thìn, không phải Tỵ
    const hn = chuanHoaNgaySinh(input({ year: 1970, month: 3, day: 10, hour: 9, minute: 30, place: HN }));
    expect(hn.lunar.hourChi).toBe(5);
  });

  it("00:30 ngày 1/1/1965 ở Sài Gòn → 23:30 ngày 31/12/1964 giờ +7 → vẫn là giờ Tý ngày 1/1/1965", () => {
    const r = chuanHoaNgaySinh(input({ year: 1965, month: 1, day: 1, hour: 0, minute: 30, place: SG }));
    expect(r.gioTuVi).toMatchObject({ year: 1964, month: 12, day: 31, hour: 23 });
    expect(r.solarTuVi).toEqual({ year: 1965, month: 1, day: 1 });
    expect(r.lunar.hourChi).toBe(0);
  });

  it("nước ngoài: bỏ giờ mùa hè, dùng giờ chuẩn địa phương", () => {
    // New York 07/11/2021 01:30 (lần đầu, EDT) = 00:30 EST → giờ Tý cùng ngày.
    const r = chuanHoaNgaySinh(input({ year: 2021, month: 11, day: 7, hour: 1, minute: 30, place: NY }));
    expect(r.resolved.status).toBe("ambiguous");
    expect(r.gioTuVi).toMatchObject({ day: 7, hour: 0, minute: 30, offsetMinutes: -300 });
    expect(r.lunar.hourChi).toBe(0);
  });

  it("tháng nhuận: nhập âm lịch tháng 4 nhuận 2020 hợp lệ, an như tháng 4", () => {
    const r = chuanHoaNgaySinh(input({ lich: "am", year: 2020, month: 4, day: 10, isLeapMonth: true, hour: 8 }));
    expect(r.lunar).toMatchObject({ year: 2020, month: 4, day: 10, isLeapMonth: true });
    expect(r.solarCivil).toEqual({ year: 2020, month: 6, day: 1 });
    expect(r.ghiChu.join(" ")).toMatch(/nhuận/);
    const plain = lapLaSo({ ...r.lunar, isLeapMonth: false }, "nu");
    const leap = lapLaSo(r.lunar, "nu");
    expect(leap.viTri).toEqual(plain.viTri);
  });

  it("báo lỗi rõ ràng khi nhập sai", () => {
    expect(() => chuanHoaNgaySinh(input({ lich: "am", year: 2021, month: 4, day: 1, isLeapMonth: true }))).toThrow(/không có tháng 4 nhuận/);
    expect(() => chuanHoaNgaySinh(input({ year: 2023, month: 2, day: 29 }))).toThrow(LaSoInputError);
    expect(() => chuanHoaNgaySinh(input({ year: 1899 }))).toThrow(/1900–2100/);
    expect(() => chuanHoaNgaySinh(input({ hour: 24 }))).toThrow(/Giờ sinh/);
    // Tháng 1 âm 2024 chỉ có 29 ngày.
    expect(() => chuanHoaNgaySinh(input({ lich: "am", year: 2024, month: 1, day: 30 }))).toThrow(/29 ngày/);
  });

  it("sinh trước Tết thuộc năm âm cũ (15/01/1995 → Giáp Tuất)", () => {
    const r = chuanHoaNgaySinh(input({ year: 1995, month: 1, day: 15, hour: 10 }));
    expect(lapLaSo(r.lunar, "nu").canChiNam.name).toBe("Giáp Tuất");
  });
});

describe("regression Phase 9 rà soát", () => {
  it("sinh 1950 ở Hà Nội: mặc định UTC+8 có cảnh báo; chọn UTC+7 đổi canh giờ", () => {
    const auto = chuanHoaNgaySinh(input({ year: 1950, month: 6, day: 1, hour: 9, minute: 30, place: HN }));
    expect(auto.gioTuVi).toMatchObject({ hour: 8, minute: 30 });
    expect(auto.lunar.hourChi).toBe(4); // Thìn
    expect(auto.ghiChu.join(" ")).toMatch(/kháng chiến/);
    const kc = chuanHoaNgaySinh(input({ year: 1950, month: 6, day: 1, hour: 9, minute: 30, place: HN, overrideOffsetMinutes: 420 }));
    expect(kc.gioTuVi).toMatchObject({ hour: 9, minute: 30 });
    expect(kc.lunar.hourChi).toBe(5); // Tỵ
    expect(kc.quyUoc.find((q) => q.ten === "Múi giờ lúc sinh")?.giaTri).toMatch(/Tự chọn UTC\+07:00/);
  });

  it("nước ngoài trong giờ mùa hè: trừ DST có ghi chú; giữ DST là lựa chọn rõ ràng, đổi được cả ngày", () => {
    // New York 01/07/2020 23:30 EDT: trừ DST → 22:30 EST (giờ Hợi cùng ngày); giữ → 23:30 (giờ Tý ngày hôm sau).
    const bo = chuanHoaNgaySinh(input({ year: 2020, month: 7, day: 1, hour: 23, minute: 30, place: NY }));
    expect(bo.gioTuVi).toMatchObject({ hour: 22, offsetMinutes: -300 });
    expect(bo.lunar.hourChi).toBe(11);
    expect(bo.solarTuVi).toEqual({ year: 2020, month: 7, day: 1 });
    expect(bo.ghiChu.join(" ")).toMatch(/đã trừ 60 phút/);
    const giu = chuanHoaNgaySinh(input({ year: 2020, month: 7, day: 1, hour: 23, minute: 30, place: NY, gioMuaHe: "giu" }));
    expect(giu.gioTuVi).toMatchObject({ hour: 23, offsetMinutes: -240 });
    expect(giu.lunar.hourChi).toBe(0);
    expect(giu.solarTuVi).toEqual({ year: 2020, month: 7, day: 2 });
    expect(giu.quyUoc.find((q) => q.ten === "Giờ dùng để an sao")?.giaTri).toMatch(/Giờ đồng hồ/);
  });

  it("giờ Tý muộn ngày cuối tháng nhuận chuyển sang mùng 1 tháng sau (không nhuận)", () => {
    // Tháng 4 nhuận năm 2020: tìm ngày cuối.
    let last = 30;
    try {
      chuanHoaNgaySinh(input({ lich: "am", year: 2020, month: 4, day: 30, isLeapMonth: true }));
    } catch {
      last = 29;
    }
    const r = chuanHoaNgaySinh(input({ lich: "am", year: 2020, month: 4, day: last, isLeapMonth: true, hour: 23, minute: 15 }));
    expect(r.lunar).toMatchObject({ year: 2020, month: 5, day: 1, isLeapMonth: false, hourChi: 0 });
  });

  it("quy ước luôn được trả về đầy đủ để hiển thị", () => {
    const r = chuanHoaNgaySinh(input({}));
    expect(r.quyUoc.map((q) => q.ten)).toEqual(["Trường phái", "Giờ dùng để an sao", "Múi giờ lúc sinh", "Giờ Tý", "Tháng nhuận", "Năm", "Lịch âm"]);
  });
});
