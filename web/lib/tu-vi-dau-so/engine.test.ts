/**
 * Đối chiếu engine an sao với thư viện độc lập iztro 2.6.1 (MIT, https://github.com/SylarLong/iztro).
 * iztro theo sách Trung Hoa; các quy tắc Nam phái khác biệt được loại khỏi phép so sánh tự động
 * và kiểm riêng bằng bảng tay ở cuối file (xem ghi chú trong stars.ts).
 * Ngày âm lịch được đưa thẳng vào iztro.byLunar để tách riêng phần an sao khỏi phần đổi lịch
 * (lịch âm Việt Nam UTC+7 và lịch Trung Quốc UTC+8 lệch nhau ở một số tháng).
 */
import { describe, expect, it } from "vitest";
import { astro } from "iztro";
import { lunarToSolar } from "@licham/core";
import { type GioiTinh, type LaSo, lapLaSo, viTriTuVi } from "./engine";
import { vanHanNam } from "./van-han";
import type { StarId } from "./stars";

const CUNG_NAME: Record<string, string> = { "Tử Nữ": "Tử Tức" };
const CUC_SO: Record<string, number> = { "Thủy Nhị Cục": 2, "Mộc Tam Cục": 3, "Kim Tứ Cục": 4, "Thổ Ngũ Cục": 5, "Hỏa Lục Cục": 6 };
const TRANG_SINH: Record<string, string> = { "Trường Sinh": "Tràng Sinh", "Mục Dục": "Mộc Dục" };
const BAC_SI: Record<string, string> = { "Bác Sỹ": "Bác Sĩ", "Lực Sỹ": "Lực Sĩ" };
const ADJ: Record<string, StarId> = {
  "Ân Quang": "anQuang",
  "Thiên Diêu": "thienRieu",
  "Hàm Trì": "daoHoa",
  "Thiên Không": "thienKhong",
  "Thiên Thương": "thienThuong",
  "Thiên Khốc": "thienKhoc",
  "Tam Thai": "tamThai",
  "Cô Thần": "coThan",
  "Thiên Sứ": "thienSu",
  "Long Trì": "longTri",
  "Thiên Phúc": "thienPhuc",
  "Thiên Hỷ": "thienHy",
  "Nguyệt Đức": "nguyetDuc",
  "Phụng Các": "phuongCac",
  "Phong Cáo": "phongCao",
  "Thiên Hư": "thienHu",
  "Niên Giải": "giaiThan",
  "Bát Tọa": "batToa",
  "Phá Toái": "phaToai",
  "Hoa Cái": "hoaCai",
  "Thiên Quan": "thienQuan",
  "Thiên Đức": "thienDuc",
  "Thiên Hình": "thienHinh",
  "Thiên Tài": "thienTai",
  "Thiên Thọ": "thienTho",
  "Đài Phụ": "thaiPhu",
  "Hồng Loan": "hongLoan",
  "Quả Tú": "quaTu",
};
const MAJOR: Record<string, StarId> = {
  "Tử Vi": "tuVi",
  "Thiên Cơ": "thienCo",
  "Thái Dương": "thaiDuong",
  "Vũ Khúc": "vuKhuc",
  "Thiên Đồng": "thienDong",
  "Liêm Trinh": "liemTrinh",
  "Thiên Phủ": "thienPhu",
  "Thái Âm": "thaiAm",
  "Tham Lang": "thamLang",
  "Cự Môn": "cuMon",
  "Thiên Tướng": "thienTuong",
  "Thiên Lương": "thienLuong",
  "Thất Sát": "thatSat",
  "Phá Quân": "phaQuan",
};
const MINOR: Record<string, StarId> = {
  "Tả Phù": "taPhu",
  "Hữu Bật": "huuBat",
  "Văn Xương": "vanXuong",
  "Văn Khúc": "vanKhuc",
  "Thiên Khôi": "thienKhoi",
  "Thiên Việt": "thienViet",
  "Lộc Tồn": "locTon",
  "Thiên Mã": "thienMa",
  "Kình Dương": "kinhDuong",
  "Đà La": "daLa",
  "Hỏa Tinh": "hoaTinh",
  "Linh Tinh": "linhTinh",
  "Địa Không": "diaKhong",
  "Địa Kiếp": "diaKiep",
};
const HOA_MAP: Record<string, string> = { Lộc: "Lộc", Quyền: "Quyền", Khoa: "Khoa", Kỵ: "Kỵ" };

/** Bộ sinh số ngẫu nhiên có hạt giống (mulberry32) để test lặp lại được. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Iz = ReturnType<typeof astro.byLunar>;

function iztroChart(year: number, month: number, day: number, hourChi: number, g: GioiTinh): Iz {
  return astro.byLunar(`${year}-${month}-${day}`, hourChi, g === "nam" ? "male" : "female", false, false, "vi-VN");
}

const chiOf = (izIndex: number) => (izIndex + 2) % 12;

function compare(ls: LaSo, iz: Iz): string[] {
  const errs: string[] = [];
  const Y = ls.canChiNam.canIndex;
  const tag = `${ls.birth.day}/${ls.birth.month}/${ls.birth.year} h${ls.birth.hourChi} ${ls.gioiTinh}`;
  const eq = (what: string, a: unknown, b: unknown) => {
    if (a !== b) errs.push(`${tag} ${what}: ours=${String(a)} iztro=${String(b)}`);
  };
  eq("cục", ls.cuc.so, CUC_SO[iz.fiveElementsClass]);
  eq("mệnh chủ", ls.menhChu, iz.soul);
  eq("thân chủ", ls.thanChu, iz.body);
  for (const p of iz.palaces) {
    const chi = chiOf(p.index);
    const c = ls.cung[chi];
    const where = `cung ${c.chiName}`;
    eq(`${where} tên`, c.ten, CUNG_NAME[p.name] ?? p.name);
    eq(`${where} can`, c.canName, p.heavenlyStem);
    eq(`${where} thân`, c.laThan, p.isBodyPalace);
    eq(`${where} tràng sinh`, c.trangSinh, TRANG_SINH[p.changsheng12] ?? p.changsheng12);
    eq(`${where} bác sĩ`, c.bacSi, BAC_SI[p.boshi12] ?? p.boshi12);
    eq(`${where} đại hạn`, `${c.daiHan.tu}-${c.daiHan.den}`, `${p.decadal.range[0]}-${p.decadal.range[1]}`);
    for (const age of p.ages) if (!c.tieuHan.includes(age)) errs.push(`${tag} ${where} tiểu hạn thiếu tuổi ${age}`);
    for (const st of p.majorStars) {
      const id = MAJOR[st.name];
      eq(`${st.name}`, ls.viTri[id], chi);
      if (st.mutagen && !(Y === 8 && st.mutagen === "Khoa")) {
        const hoa = c.chinhTinh.find((x) => x.id === id)?.hoa;
        eq(`${st.name} hóa`, hoa, HOA_MAP[st.mutagen]);
      }
    }
    for (const st of p.minorStars) {
      const id = MINOR[st.name];
      if (!id) continue;
      if ((id === "thienKhoi" || id === "thienViet") && Y === 6) continue; // Canh: Nam phái khác (Ngọ/Dần)
      if (id === "hoaTinh" && !ls.thuan) continue; // Nam phái: Âm Nam/Dương Nữ an Hỏa nghịch
      if (id === "linhTinh" && ls.thuan) continue; // Nam phái: Dương Nam/Âm Nữ an Linh nghịch
      eq(`${st.name}`, ls.viTri[id], chi);
      if (st.mutagen && !(Y === 8 && st.mutagen === "Khoa")) {
        const hoa = [...c.phuTinhCat, ...c.phuTinhSat].find((x) => x.id === id)?.hoa;
        eq(`${st.name} hóa`, hoa, HOA_MAP[st.mutagen]);
      }
    }
    for (const st of p.adjectiveStars) {
      const id = ADJ[st.name];
      if (id) eq(st.name, ls.viTri[id], chi);
      if (st.name === "Triệt Lộ" || st.name === "Không Vong") eq(`triệt ${st.name}`, c.triet, true);
      if (st.name === "Tuần Không") eq("tuần", c.tuan, true);
    }
    if (p.jiangqian12 === "Kiếp Sát") eq("Kiếp Sát", ls.viTri.kiepSat, chi);
    // Vòng Thái Tuế: iztro dùng vòng "tuế tiền" của sách Trung Hoa; các sao trùng tên và trùng vị trí được so.
    for (const name of ["Tang Môn", "Quan Phù", "Long Đức", "Bạch Hổ", "Điếu Khách"]) {
      if (p.suiqian12 === name) eq(`vòng Thái Tuế ${name}`, c.thaiTue, name);
    }
  }
  return errs;
}

/** TUVI_FULL=1: quét đầy đủ (≈ 30 phút). Mặc định chạy mẫu nhỏ để bộ test thường vẫn nhanh. */
const FULL = process.env.TUVI_FULL === "1";
const N_RANDOM = FULL ? 5000 : 300;
const T = { timeout: FULL ? 3_600_000 : 120_000 };

describe("an sao — đối chiếu iztro (lá số ngẫu nhiên)", () => {
  it(`${N_RANDOM} lá số, năm âm 1901–2099, khớp mọi sao theo cùng quy tắc`, T, () => {
    const r = rng(20260924);
    const errs: string[] = [];
    for (let i = 0; i < N_RANDOM; i++) {
      const year = 1901 + Math.floor(r() * 199);
      const month = 1 + Math.floor(r() * 12);
      const day = 1 + Math.floor(r() * 29);
      const hourChi = Math.floor(r() * 12);
      const g: GioiTinh = r() < 0.5 ? "nam" : "nu";
      const ls = lapLaSo({ year, month, day, isLeapMonth: false, hourChi }, g);
      errs.push(...compare(ls, iztroChart(year, month, day, hourChi, g)));
      if (errs.length > 20) break;
    }
    expect(errs).toEqual([]);
  });

  it("đủ 60 hoa giáp × 12 tháng × 12 giờ (mặc định: mỗi tháng một giờ luân phiên; TUVI_FULL: đủ 12 giờ × ngày 1, 15, 29)", T, () => {
    const errs: string[] = [];
    for (let y = 1984; y < 2044 && errs.length < 20; y++) {
      const g: GioiTinh = y % 2 ? "nam" : "nu";
      for (let m = 1; m <= 12; m++)
        for (let h = 0; h < 12; h++)
          for (const d of FULL ? [1, 15, 29] : [1 + ((y * 7 + m * 5 + h) % 29)]) {
            if (!FULL && h !== (y + m) % 12) continue;
            const ls = lapLaSo({ year: y, month: m, day: d, isLeapMonth: false, hourChi: h }, g);
            errs.push(...compare(ls, iztroChart(y, m, d, h, g)));
          }
    }
    expect(errs).toEqual([]);
  });

  it("vận hạn năm xem: tiểu hạn, Lưu Lộc Tồn/Kình/Đà/Mã và Tứ Hóa lưu khớp iztro", T, () => {
    const r = rng(7);
    const errs: string[] = [];
    for (let i = 0; i < (FULL ? 2000 : 200); i++) {
      const year = 1930 + Math.floor(r() * 80);
      const month = 1 + Math.floor(r() * 12);
      const day = 1 + Math.floor(r() * 29);
      const hourChi = Math.floor(r() * 12);
      const g: GioiTinh = r() < 0.5 ? "nam" : "nu";
      const namXem = year + 1 + Math.floor(r() * 70);
      if (namXem > 2098) continue;
      const ls = lapLaSo({ year, month, day, isLeapMonth: false, hourChi }, g);
      const vh = vanHanNam(ls, namXem);
      const iz = iztroChart(year, month, day, hourChi, g);
      const hs = iz.horoscope(new Date(namXem, 6, 1, 12));
      const tag = `${day}/${month}/${year} ${g} xem ${namXem}`;
      if (hs.age.nominalAge !== vh.tuoi) errs.push(`${tag} tuổi ${vh.tuoi} vs ${hs.age.nominalAge}`);
      if (chiOf(hs.age.index) !== vh.tieuHan.chi) errs.push(`${tag} tiểu hạn ${vh.tieuHan.chi} vs ${chiOf(hs.age.index)}`);
      const find = (n: string) => hs.yearly.stars?.findIndex((list) => list.some((s) => s.name === n)) ?? -1;
      const pairs: [string, string][] = [
        ["Lưu Lộc", "luuLocTon"],
        ["Lưu Dương", "luuKinhDuong"],
        ["Lưu Đà", "luuDaLa"],
        ["Lưu Mã", "luuThienMa"],
      ];
      for (const [izName, id] of pairs) {
        const ours = vh.saoLuu.find((s) => s.id === id)?.chi;
        const theirs = chiOf(find(izName));
        if (ours !== theirs) errs.push(`${tag} ${izName} ${ours} vs ${theirs}`);
      }
      const can = vh.canChiNamXem.canIndex;
      const names = vh.tuHoaLuu.map((t) => t.name);
      const izNames = [...hs.yearly.mutagen];
      if (can === 8) {
        names.splice(2, 1);
        izNames.splice(2, 1);
      }
      if (names.join() !== izNames.join()) errs.push(`${tag} tứ hóa lưu ${names} vs ${izNames}`);
      if (errs.length > 20) break;
    }
    expect(errs).toEqual([]);
  });
});

describe("an sao — quy tắc Nam phái khác sách Trung Hoa (bảng tay)", () => {
  const base = { month: 1, day: 1, isLeapMonth: false };

  it("Thiên Khôi, Thiên Việt theo can năm (Canh, Tân: Khôi Ngọ, Việt Dần)", () => {
    // Năm 1984 Giáp Tý, 1985 Ất Sửu … 1993 Quý Dậu.
    const expected = [
      [1, 7],
      [0, 8],
      [11, 9],
      [11, 9],
      [1, 7],
      [0, 8],
      [6, 2],
      [6, 2],
      [3, 5],
      [3, 5],
    ];
    expected.forEach(([khoi, viet], i) => {
      const ls = lapLaSo({ ...base, year: 1984 + i, hourChi: 0 }, "nam");
      expect([ls.viTri.thienKhoi, ls.viTri.thienViet]).toEqual([khoi, viet]);
    });
  });

  it("Hỏa Tinh, Linh Tinh: Dương Nam thuận/nghịch, Âm Nam nghịch/thuận", () => {
    // 1990 Canh Ngọ (Dần Ngọ Tuất: Hỏa khởi Sửu, Linh khởi Mão), giờ Dần (2).
    const duongNam = lapLaSo({ ...base, year: 1990, hourChi: 2 }, "nam");
    expect(duongNam.amDuong).toBe("Dương Nam");
    expect([duongNam.viTri.hoaTinh, duongNam.viTri.linhTinh]).toEqual([3, 1]); // Mão, Sửu
    const duongNu = lapLaSo({ ...base, year: 1990, hourChi: 2 }, "nu");
    expect([duongNu.viTri.hoaTinh, duongNu.viTri.linhTinh]).toEqual([11, 5]); // Hợi, Tỵ
    // 1991 Tân Mùi (Hợi Mão Mùi: Hỏa khởi Dậu, Linh khởi Tuất), giờ Thìn (4).
    const amNam = lapLaSo({ ...base, year: 1991, hourChi: 4 }, "nam");
    expect(amNam.amDuong).toBe("Âm Nam");
    expect([amNam.viTri.hoaTinh, amNam.viTri.linhTinh]).toEqual([5, 2]); // Tỵ, Dần
  });

  it("Tứ Hóa can Nhâm: Thiên Phủ hóa Khoa", () => {
    const ls = lapLaSo({ ...base, year: 1992, hourChi: 0 }, "nam"); // Nhâm Thân
    expect(ls.tuHoa.map((t) => t.star)).toEqual(["thienLuong", "tuVi", "thienPhu", "vuKhuc"]);
    expect(ls.cung[ls.viTri.thienPhu].chinhTinh.find((s) => s.id === "thienPhu")?.hoa).toBe("Khoa");
  });

  it("Ân Quang, Thiên Quý đối xứng qua trục Sửu–Mùi; Tam Thai, Bát Tọa cũng vậy", () => {
    for (let d = 1; d <= 30; d++)
      for (let m = 1; m <= 12; m++) {
        const ls = lapLaSo({ year: 2000, month: m, day: d, isLeapMonth: false, hourChi: (d + m) % 12 }, "nu");
        expect((ls.viTri.anQuang + ls.viTri.thienQuy) % 12).toBe(2);
        expect((ls.viTri.tamThai + ls.viTri.batToa) % 12).toBe(2);
      }
    // Mẫu: tháng 4, ngày 23, giờ Ngọ → Văn Khúc Tuất; Tuất − 22 + 1 = Sửu.
    const ls = lapLaSo({ year: 1990, month: 4, day: 23, isLeapMonth: false, hourChi: 6 }, "nam");
    expect(ls.viTri.thienQuy).toBe(1);
    expect(ls.viTri.anQuang).toBe(1);
  });

  it("Thiên Y cùng Thiên Riêu; Thiên Giải từ Thân, Địa Giải từ Mùi theo tháng; Thiên La Thìn, Địa Võng Tuất", () => {
    for (let m = 1; m <= 12; m++) {
      const ls = lapLaSo({ year: 2001, month: m, day: 10, isLeapMonth: false, hourChi: 3 }, "nam");
      expect(ls.viTri.thienY).toBe(ls.viTri.thienRieu);
      expect(ls.viTri.thienGiai).toBe((8 + m - 1) % 12);
      expect(ls.viTri.diaGiai).toBe((7 + m - 1) % 12);
      expect([ls.viTri.thienLa, ls.viTri.diaVong]).toEqual([4, 10]);
    }
  });

  it("vòng Thái Tuế Nam phái đủ 12 sao, Thiên Không cùng Thiếu Dương", () => {
    const ls = lapLaSo({ year: 1990, month: 4, day: 23, isLeapMonth: false, hourChi: 6 }, "nam"); // Ngọ
    expect(ls.cung[6].thaiTue).toBe("Thái Tuế");
    expect(ls.cung[7].thaiTue).toBe("Thiếu Dương");
    expect(ls.viTri.thienKhong).toBe(7);
    expect(ls.cung[5].thaiTue).toBe("Trực Phù");
  });
});

describe("an Tử Vi — bảng tra truyền thống", () => {
  it("khớp bảng Tử Vi theo cục và ngày (một số ô mẫu)", () => {
    // Thủy nhị cục: ngày 1 Sửu, 2 Dần; Mộc tam cục: ngày 1 Thìn; Kim tứ cục: ngày 1 Hợi; Thổ ngũ cục: ngày 1 Ngọ; Hỏa lục cục: ngày 1 Dậu.
    expect(viTriTuVi(2, 1)).toBe(1);
    expect(viTriTuVi(2, 2)).toBe(2);
    expect(viTriTuVi(3, 1)).toBe(4);
    expect(viTriTuVi(4, 1)).toBe(11);
    expect(viTriTuVi(5, 1)).toBe(6);
    expect(viTriTuVi(6, 1)).toBe(9);
    // Ngày 30: Thủy nhị cục 30/2 = 15 → Dần + 14 = Thìn; Hỏa lục cục 30/6 = 5 → Dần + 4 = Ngọ.
    expect(viTriTuVi(2, 30)).toBe(4);
    expect(viTriTuVi(6, 30)).toBe(6);
  });

  it("đại hạn khởi tại Mệnh bằng số cục; 12 đại hạn liên tiếp không trùng", () => {
    const ls = lapLaSo({ year: 1975, month: 8, day: 14, isLeapMonth: false, hourChi: 9 }, "nu");
    const starts = ls.cung.map((c) => c.daiHan.tu).sort((a, b) => a - b);
    expect(starts[0]).toBe(ls.cuc.so);
    expect(ls.cung[ls.menhChi].daiHan.tu).toBe(ls.cuc.so);
    starts.forEach((s, i) => expect(s).toBe(ls.cuc.so + 10 * i));
  });

  it("ngày 30 của tháng đủ an được (đối chiếu iztro khi lịch Trung Quốc cũng có ngày 30)", () => {
    // Tháng 12 âm năm 2023 (Quý Mão) có 30 ngày ở cả hai lịch.
    expect(() => lunarToSolar(30, 12, 2023, false)).not.toThrow();
    const ls = lapLaSo({ year: 2023, month: 12, day: 30, isLeapMonth: false, hourChi: 5 }, "nam");
    expect(compare(ls, iztroChart(2023, 12, 30, 5, "nam"))).toEqual([]);
  });
});
