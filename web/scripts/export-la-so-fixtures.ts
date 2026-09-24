/**
 * Xuất bộ dữ liệu đối chiếu (oracle) cho app Flutter Lịch Âm khi port Tử Vi Đẩu Số và chiêm tinh:
 * đầu vào + kết quả đầy đủ của engine web, để test Dart so khớp từng giá trị.
 * Chạy: pnpm --filter @licham/web run export:la-so-fixtures
 * Ghi: web/fixtures/tu-vi-dau-so-oracle.json, web/fixtures/chiem-tinh-oracle.json
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PLACES } from "../lib/birth/places.ts";
import { computeChart } from "../lib/chiem-tinh/engine.ts";
import { chuanHoaNgaySinh } from "../lib/tu-vi-dau-so/birth.ts";
import { type GioiTinh, lapLaSo } from "../lib/tu-vi-dau-so/engine.ts";
import { vanHanNam } from "../lib/tu-vi-dau-so/van-han.ts";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures");
mkdirSync(OUT, { recursive: true });

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

const r = rng(90909);
const vnPlaces = PLACES.filter((p) => p.country === "VN");
const round = (x: number, d = 6) => Math.round(x * 10 ** d) / 10 ** d;
/** Mỗi case một dòng: file gọn mà diff vẫn đọc được. */
const NL = String.fromCharCode(10);
const dump = (note: string, cases: unknown[]) => `{"note":${JSON.stringify(note)},"cases":[${NL}${cases.map((c) => JSON.stringify(c)).join("," + NL)}${NL}]}${NL}`;

// ---- Tử Vi: 300 lá số ngẫu nhiên + các trường hợp biên cố định ----
const edge = [
  { year: 2026, month: 2, day: 16, hour: 23, minute: 30, place: "ha-noi", gioiTinh: "nam", note: "giờ Tý muộn đêm giao thừa" },
  { year: 1970, month: 3, day: 10, hour: 9, minute: 30, place: "tp-hcm", gioiTinh: "nu", note: "miền Nam UTC+8" },
  { year: 1970, month: 3, day: 10, hour: 9, minute: 30, place: "ha-noi", gioiTinh: "nu", note: "miền Bắc UTC+7" },
  { year: 1965, month: 1, day: 1, hour: 0, minute: 30, place: "tp-hcm", gioiTinh: "nam", note: "quy giờ lùi sang ngày trước" },
  { year: 2020, month: 6, day: 1, hour: 8, minute: 0, place: "ha-noi", gioiTinh: "nu", note: "tháng 4 nhuận" },
  { year: 2021, month: 11, day: 7, hour: 1, minute: 30, place: "new-york", gioiTinh: "nam", note: "giờ lặp khi lùi DST" },
  { year: 1995, month: 1, day: 15, hour: 10, minute: 0, place: "ha-noi", gioiTinh: "nu", note: "trước Tết — năm âm cũ" },
];
const tuViCases = [
  ...edge,
  ...Array.from({ length: 300 }, () => {
    const place = vnPlaces[Math.floor(r() * vnPlaces.length)];
    return {
      year: 1920 + Math.floor(r() * 150),
      month: 1 + Math.floor(r() * 12),
      day: 1 + Math.floor(r() * 28),
      hour: Math.floor(r() * 24),
      minute: Math.floor(r() * 60),
      place: place.id,
      gioiTinh: r() < 0.5 ? "nam" : "nu",
      note: "",
    };
  }),
];
const tuVi = tuViCases.map((c) => {
  const place = PLACES.find((p) => p.id === c.place)!;
  const ns = chuanHoaNgaySinh({ lich: "duong", year: c.year, month: c.month, day: c.day, hour: c.hour, minute: c.minute, place, gioiTinh: c.gioiTinh as GioiTinh });
  const ls = lapLaSo(ns.lunar, c.gioiTinh as GioiTinh);
  const namXem = Math.min(2100, ls.birth.year + 30);
  const vh = vanHanNam(ls, namXem);
  return {
    input: c,
    lunar: ns.lunar,
    solarTuVi: ns.solarTuVi,
    canChiNam: ls.canChiNam.name,
    amDuong: ls.amDuong,
    cuc: ls.cuc.so,
    menhChi: ls.menhChi,
    thanChi: ls.thanChi,
    menhChu: ls.menhChu,
    thanChu: ls.thanChu,
    viTri: ls.viTri,
    tuHoa: ls.tuHoa.map((t) => [t.hoa, t.star]),
    tuan: ls.tuan,
    triet: ls.triet,
    cung: ls.cung.map((k) => ({ chi: k.chi, can: k.canName, ten: k.ten, trangSinh: k.trangSinh, bacSi: k.bacSi, thaiTue: k.thaiTue, daiHan: [k.daiHan.tu, k.daiHan.den] })),
    vanHan: { namXem, tuoi: vh.tuoi, daiHanChi: vh.daiHan?.chi ?? null, tieuHanChi: vh.tieuHan.chi, saoLuu: Object.fromEntries(vh.saoLuu.map((s) => [s.id, s.chi])) },
  };
});
writeFileSync(
  join(OUT, "tu-vi-dau-so-oracle.json"),
  dump("Sinh bởi web/scripts/export-la-so-fixtures.ts — engine Nam phái của licham.app. Chỉ số địa chi 0 = Tý.", tuVi),
);

// ---- Chiêm tinh: 80 bản đồ ----
const allPlaces = PLACES;
const ct = Array.from({ length: 80 }, (_, i) => {
  const place = allPlaces[Math.floor(r() * allPlaces.length)];
  const utcMs = Date.UTC(1930 + Math.floor(r() * 150), Math.floor(r() * 12), 1 + Math.floor(r() * 28), Math.floor(r() * 24), Math.floor(r() * 60));
  const houseSystem = (["placidus", "whole-sign", "equal", "porphyry"] as const)[i % 4];
  const c = computeChart({ utcMs, lat: place.lat, lon: place.lon, houseSystem, timeKnown: true });
  return {
    input: { utcIso: new Date(utcMs).toISOString(), lat: place.lat, lon: place.lon, houseSystem },
    points: Object.fromEntries(c.points.map((p) => [p.id, { lon: round(p.lon), lat: round(p.lat), speed: round(p.speed), retrograde: p.retrograde, house: p.house }])),
    asc: round(c.asc!),
    mc: round(c.mc!),
    cusps: c.cusps!.map((x) => round(x)),
    houseSystemUsed: c.houseSystemUsed,
    meanNode: round(c.meanNode),
    aspects: c.aspects.map((a) => [a.a, a.b, a.type, round(a.orb, 3)]),
  };
});
writeFileSync(
  join(OUT, "chiem-tinh-oracle.json"),
  dump("Sinh bởi web/scripts/export-la-so-fixtures.ts — astronomy-engine 2.1.19, hoàng đạo nhiệt đới, kinh độ biểu kiến của ngày (độ).", ct),
);
console.log(`Đã ghi ${tuVi.length} lá số Tử Vi và ${ct.length} bản đồ sao vào ${OUT}`);
