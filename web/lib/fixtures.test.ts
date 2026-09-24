/**
 * Phát lại toàn bộ fixture oracle (web/fixtures/*.json) bằng engine hiện tại — phía Web của kiểm thử đối chiếu
 * Web–Flutter. Nếu engine đổi có chủ đích, sinh lại fixture bằng `pnpm --filter @licham/web run export:la-so-fixtures`
 * và gửi file mới cho app Flutter; nếu không, test này bắt mọi thay đổi ngoài ý muốn.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { PLACES } from "@/lib/birth/places";
import { computeChart, type HouseSystem } from "@/lib/chiem-tinh/engine";
import { chuanHoaNgaySinh } from "@/lib/tu-vi-dau-so/birth";
import { type GioiTinh, lapLaSo } from "@/lib/tu-vi-dau-so/engine";
import { vanHanNam } from "@/lib/tu-vi-dau-so/van-han";

const load = (name: string) => JSON.parse(readFileSync(fileURLToPath(new URL(`../fixtures/${name}`, import.meta.url)), "utf8"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
const tuVi: { cases: Any[] } = load("tu-vi-dau-so-oracle.json");
const ct: { cases: Any[] } = load("chiem-tinh-oracle.json");

describe("fixture oracle", () => {
  it("đủ 390 fixture: 310 lá số Tử Vi + 80 bản đồ sao, định dạng hợp lệ", () => {
    expect(tuVi.cases.length).toBe(310);
    expect(ct.cases.length).toBe(80);
    for (const c of tuVi.cases) {
      expect(Object.keys(c.viTri).length).toBe(65);
      expect(new Set(c.cung.map((k: Any) => k.chi)).size).toBe(12);
      expect(c.cung.map((k: Any) => k.daiHan[0]).sort((a: number, b: number) => a - b)[0]).toBe(c.cuc);
    }
    for (const c of ct.cases) {
      expect(c.cusps.length).toBe(12);
      expect(Object.keys(c.points).length).toBe(12);
    }
  });

  it("310 lá số Tử Vi tính lại khớp từng giá trị", () => {
    for (const c of tuVi.cases) {
      const place = PLACES.find((p) => p.id === c.input.place)!;
      const ns = chuanHoaNgaySinh({ lich: "duong", ...c.input, place, gioiTinh: c.input.gioiTinh as GioiTinh });
      const ls = lapLaSo(ns.lunar, c.input.gioiTinh as GioiTinh);
      const vh = vanHanNam(ls, c.vanHan.namXem);
      expect({ lunar: ns.lunar, solarTuVi: ns.solarTuVi, cuc: ls.cuc.so, menhChi: ls.menhChi, thanChi: ls.thanChi, viTri: ls.viTri }).toEqual({
        lunar: c.lunar,
        solarTuVi: c.solarTuVi,
        cuc: c.cuc,
        menhChi: c.menhChi,
        thanChi: c.thanChi,
        viTri: c.viTri,
      });
      expect(ls.cung.map((k) => [k.canName, k.trangSinh, k.bacSi, k.thaiTue, k.daiHan.tu])).toEqual(
        c.cung.map((k: Any) => [k.can, k.trangSinh, k.bacSi, k.thaiTue, k.daiHan[0]]),
      );
      expect([vh.tuoi, vh.daiHan?.chi ?? null, vh.tieuHan.chi]).toEqual([c.vanHan.tuoi, c.vanHan.daiHanChi, c.vanHan.tieuHanChi]);
    }
  });

  it("80 bản đồ sao tính lại khớp tới 1e-6°", () => {
    for (const c of ct.cases) {
      const chart = computeChart({ utcMs: Date.parse(c.input.utcIso), lat: c.input.lat, lon: c.input.lon, houseSystem: c.input.houseSystem as HouseSystem, timeKnown: true });
      for (const p of chart.points) expect(Math.abs(p.lon - c.points[p.id].lon)).toBeLessThan(1e-6);
      expect(Math.abs(chart.asc! - c.asc)).toBeLessThan(1e-6);
      chart.cusps!.forEach((x, i) => expect(Math.abs(x - c.cusps[i])).toBeLessThan(1e-6));
      expect(chart.aspects.map((a) => `${a.a}-${a.b}-${a.type}`)).toEqual(c.aspects.map((a: Any) => `${a[0]}-${a[1]}-${a[2]}`));
    }
  });
});
