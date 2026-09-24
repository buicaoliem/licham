"use client";

import type { AspectType, Chart, PointId } from "@/lib/chiem-tinh/engine";
import { POINTS, SIGNS } from "@/lib/chiem-tinh/giai-nghia";

const C = 300;
const R_OUT = 292;
const R_SIGN = 252;
const R_HOUSE = 226;
const R_PLANET = 198;
const R_INNER = 150;

const TONE: Record<AspectType, string> = { conjunction: "trung", sextile: "hop", square: "cang", trine: "hop", opposition: "cang" };

const ELEMENT_CLASS: Record<string, string> = { Lửa: "el-fire", Đất: "el-earth", Khí: "el-air", Nước: "el-water" };

function polar(r: number, screenDeg: number): [number, number] {
  const a = (screenDeg * Math.PI) / 180;
  return [C + r * Math.cos(a), C - r * Math.sin(a)];
}

/** Dãn các điểm quá sát nhau để ký hiệu không chồng lên nhau (giữ thứ tự, tối thiểu `gap` độ). */
function spread(items: { id: PointId; angle: number }[], gap: number): Map<PointId, number> {
  const sorted = [...items].sort((a, b) => a.angle - b.angle).map((x) => ({ ...x, pos: x.angle }));
  for (let iter = 0; iter < 60; iter++) {
    let moved = false;
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i];
      const b = sorted[(i + 1) % sorted.length];
      if (sorted.length < 2) break;
      let d = b.pos - a.pos;
      if (i === sorted.length - 1) d += 360;
      if (d < gap) {
        const push = (gap - d) / 2;
        a.pos -= push;
        b.pos += push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return new Map(sorted.map((x) => [x.id, x.pos]));
}

export function Wheel({ chart, selected, onSelect }: { chart: Chart; selected: PointId | null; onSelect: (id: PointId) => void }) {
  const ref = chart.asc ?? 0;
  const screen = (lon: number) => 180 + (lon - ref);
  const shown = chart.points.filter((p) => p.id !== "southNode");
  const pos = spread(
    shown.map((p) => ({ id: p.id, angle: screen(p.lon) })),
    8,
  );
  const lonOf = (id: PointId) => (id === "asc" ? chart.asc! : id === "mc" ? chart.mc! : chart.points.find((p) => p.id === id)!.lon);
  const tone = (t: AspectType) => TONE[t];

  return (
    <svg className="ct-wheel" viewBox="-22 -22 644 644" role="group" aria-label="Bản đồ sao dạng vòng tròn">
      <circle cx={C} cy={C} r={R_OUT} className="ct-ring-out" />
      {SIGNS.map((s, i) => {
        const a0 = screen(i * 30);
        const a1 = screen(i * 30 + 30);
        const [x0, y0] = polar(R_OUT, a0);
        const [x1, y1] = polar(R_OUT, a1);
        const [x2, y2] = polar(R_SIGN, a1);
        const [x3, y3] = polar(R_SIGN, a0);
        const [tx, ty] = polar((R_OUT + R_SIGN) / 2, (a0 + a1) / 2);
        return (
          <g key={s.latin} className={ELEMENT_CLASS[s.element]}>
            <path d={`M${x0},${y0} A${R_OUT},${R_OUT} 0 0 0 ${x1},${y1} L${x2},${y2} A${R_SIGN},${R_SIGN} 0 0 1 ${x3},${y3} Z`} className="ct-sign" />
            <text x={tx} y={ty} className="ct-sign-g" dominantBaseline="central" textAnchor="middle">
              <title>{s.name}</title>
              {s.symbol}
            </text>
          </g>
        );
      })}
      {Array.from({ length: 72 }, (_, i) => {
        const a = screen(i * 5);
        const [x0, y0] = polar(R_SIGN, a);
        const [x1, y1] = polar(R_SIGN - (i % 2 ? 4 : 8), a);
        return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} className="ct-tick" />;
      })}
      <circle cx={C} cy={C} r={R_SIGN} className="ct-ring" />
      <circle cx={C} cy={C} r={R_INNER} className="ct-ring-in" />

      {chart.cusps?.map((cusp, i) => {
        const a = screen(cusp);
        const angular = i === 0 || i === 3 || i === 6 || i === 9;
        const [x0, y0] = polar(R_INNER, a);
        const [x1, y1] = polar(angular ? R_OUT : R_SIGN, a);
        const next = chart.cusps![(i + 1) % 12];
        const span = (((next - cusp) % 360) + 360) % 360;
        const [nx, ny] = polar(R_HOUSE + 12, screen(cusp + span / 2));
        return (
          <g key={i}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} className={angular ? "ct-cusp ang" : "ct-cusp"} />
            <text x={nx} y={ny} className="ct-house-n" dominantBaseline="central" textAnchor="middle">
              {i + 1}
            </text>
          </g>
        );
      })}
      {chart.asc !== undefined && (
        <>
          {(
            [
              ["AC", chart.asc],
              ["MC", chart.mc!],
            ] as const
          ).map(([label, lon]) => {
            const [x, y] = polar(R_OUT + 13, screen(lon));
            return (
              <text key={label} x={x} y={y} className="ct-angle-l" dominantBaseline="central" textAnchor="middle">
                {label}
              </text>
            );
          })}
        </>
      )}

      <g className="ct-aspects">
        {chart.aspects.map((a, i) => {
          const on = selected && (a.a === selected || a.b === selected);
          if (a.type === "conjunction") return null;
          const [x0, y0] = polar(R_INNER - 2, screen(lonOf(a.a)));
          const [x1, y1] = polar(R_INNER - 2, screen(lonOf(a.b)));
          return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} className={`ct-asp t-${tone(a.type)}${selected ? (on ? " on" : " dim") : ""}`} />;
        })}
      </g>

      {shown.map((p) => {
        const real = screen(p.lon);
        const disp = pos.get(p.id) ?? real;
        const [gx, gy] = polar(R_PLANET, disp);
        const [lx, ly] = polar(R_PLANET - 26, disp);
        const [m0x, m0y] = polar(R_INNER, real);
        const [m1x, m1y] = polar(R_INNER + 7, real);
        const [k0x, k0y] = polar(R_SIGN - 9, real);
        const info = POINTS[p.id];
        const deg = Math.floor(p.lon % 30);
        const isOn = selected === p.id;
        return (
          <g
            key={p.id}
            className={`ct-pt${isOn ? " on" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={isOn}
            aria-label={`${info.name} ${deg} độ ${SIGNS[Math.floor(p.lon / 30)].name}${p.retrograde && p.id !== "node" ? ", nghịch hành" : ""}`}
            onClick={() => onSelect(p.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(p.id);
              }
            }}
          >
            <line x1={m0x} y1={m0y} x2={m1x} y2={m1y} className="ct-mark" />
            <line x1={k0x} y1={k0y} x2={polar(R_SIGN, real)[0]} y2={polar(R_SIGN, real)[1]} className="ct-mark" />
            <circle cx={gx} cy={gy} r={17} className="ct-pt-bg" />
            <text x={gx} y={gy} className="ct-pt-g" dominantBaseline="central" textAnchor="middle">
              {info.symbol}
            </text>
            <text x={lx} y={ly} className="ct-pt-d" dominantBaseline="central" textAnchor="middle">
              {deg}°{p.retrograde && p.id !== "node" ? "℞" : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
