import { R_PENUMBRA, R_UMBRA, type LunarGeo, type SolarGeo } from "@/lib/van-hoa/eclipse-types";
import { type Eclipse, hhmm, isLunar, isSolar } from "@/lib/van-hoa/eclipses";
import v from "./eclipse.module.css";

/**
 * Hình vẽ nhật/nguyệt thực từ hình học tính được của CHÍNH sự kiện đó (không dùng ảnh chụp):
 * lệch tâm gần nhất `d`, tốc độ `v` (theo bán kính đĩa mỗi phút), thời điểm `t` (phút, 0 = cực đại).
 * Bán kính bóng/Mặt Trăng chỉ là giá trị điển hình để vẽ.
 */
const STARS: readonly (readonly [number, number, number])[] = [
  [10, 14, 0.9], [30, 96, 0.6], [104, 20, 0.8], [110, 92, 0.6], [18, 56, 0.5], [100, 60, 0.5], [70, 8, 0.6], [56, 110, 0.5],
];

function Sky({ uid }: { uid: string }) {
  return (
    <>
      <rect width="120" height="120" fill={`url(#${uid}-sky)`} />
      {STARS.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#fff" opacity={o} />
      ))}
    </>
  );
}

function SolarScene({ e, t, uid }: { e: Eclipse & { body: "solar"; geo: SolarGeo }; t: number; uid: string }) {
  const g = e.geo;
  const R = 26;
  const mx = 60 - g.v * t * R;
  const my = 60 - g.d * R;
  const dist = Math.hypot(mx - 60, my - 60) / R;
  const cover = Math.max(0, Math.min(1, (g.rho + 1 - dist) / (2 * Math.min(1, g.rho)))); // gần đúng 0..1 để chỉnh quầng sáng
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-sun`}>
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset="0.75" stopColor="#ffd77a" />
          <stop offset="1" stopColor="#ff9e3d" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0.4" stopColor="#ffe7a8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffe7a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill={`url(#${uid}-glow)`} opacity={0.3 + 0.7 * cover * cover} />
      <circle cx="60" cy="60" r={R} fill={`url(#${uid}-sun)`} />
      <circle cx={mx} cy={my} r={R * g.rho} fill="#04060d" stroke="#1d2748" strokeWidth="0.8" />
    </>
  );
}

function LunarScene({ e, t, uid }: { e: Eclipse & { body: "lunar"; geo: LunarGeo }; t: number; uid: string }) {
  const g = e.geo;
  const R = 30;
  const sx = 60 + g.v * t * R;
  const sy = 60 - g.d * R;
  const total = e.kind === "toan-phan";
  const pen = e.kind === "nua-toi";
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-moon`} cx="0.4" cy="0.38">
          <stop offset="0" stopColor="#f6f0da" />
          <stop offset="1" stopColor="#cbc19f" />
        </radialGradient>
        <radialGradient id={`${uid}-um`}>
          <stop offset="0" stopColor={total ? "#8a2b1a" : "#150d1c"} stopOpacity={total ? 0.93 : 0.88} />
          <stop offset="0.9" stopColor={total ? "#7a2417" : "#150d1c"} stopOpacity={total ? 0.93 : 0.88} />
          <stop offset="1" stopColor={total ? "#7a2417" : "#150d1c"} stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id={`${uid}-halo`}>
          <stop offset="0.5" stopColor="#f7ecc8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f7ecc8" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}-clip`}>
          <circle cx="60" cy="60" r={R} />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="52" fill={`url(#${uid}-halo)`} opacity={total ? 0.35 : 0.8} />
      <circle cx="60" cy="60" r={R} fill={`url(#${uid}-moon)`} />
      <g clipPath={`url(#${uid}-clip)`}>
        <ellipse cx="50" cy="52" rx="7" ry="5" fill="#8f8568" opacity="0.28" />
        <ellipse cx="70" cy="64" rx="9" ry="6" fill="#8f8568" opacity="0.25" />
        <ellipse cx="58" cy="74" rx="5" ry="3.5" fill="#8f8568" opacity="0.22" />
        <circle cx={sx} cy={sy} r={R_PENUMBRA * R} fill="#2a2440" opacity={pen ? 0.42 : 0.2} />
        {!pen && <circle cx={sx} cy={sy} r={R_UMBRA * R} fill={`url(#${uid}-um)`} />}
      </g>
      <circle cx="60" cy="60" r={R} fill="none" stroke="#8d93ad" strokeWidth="0.7" opacity="0.6" />
    </>
  );
}

/** Một đĩa nhật/nguyệt thực tại thời điểm `t` phút so với cực đại. `bare`: nền trong suốt. */
export function EclipseDisc({ e, t = 0, uid, bare = false, className }: { e: Eclipse; t?: number; uid: string; bare?: boolean; className?: string }) {
  const label = `${e.title}, hình vẽ theo số liệu tính được`;
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className ?? v.disc}>
      {!bare && (
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1230" />
            <stop offset="1" stopColor="#162246" />
          </linearGradient>
        </defs>
      )}
      {!bare && <Sky uid={uid} />}
      {isSolar(e) && e.geo && <SolarScene e={e as Eclipse & { body: "solar"; geo: SolarGeo }} t={t} uid={uid} />}
      {isLunar(e) && <LunarScene e={e as Eclipse & { body: "lunar"; geo: LunarGeo }} t={t} uid={uid} />}
    </svg>
  );
}

/** Nửa thời gian (phút) của chuỗi pha để vẽ: nửa tối cho nguyệt thực, cả lần che một phần cho nhật thực. */
function halfSpan(e: Eclipse): number {
  return isLunar(e) ? e.geo.sdPenum : isSolar(e) && e.geo ? e.geo.halfMin : 60;
}

const FRACS_LUNAR = [-0.9, -0.68, -0.45, -0.22, 0, 0.22, 0.45, 0.68, 0.9] as const;
/** Nhật thực: dừng sớm hơn để Mặt Trăng không tràn khỏi khung đĩa. */
const FRACS_SOLAR = [-0.72, -0.54, -0.36, -0.18, 0, 0.18, 0.36, 0.54, 0.72] as const;

/** Chuỗi các pha từ đầu đến cuối, đĩa giữa (cực đại) lớn nhất; điện thoại chỉ hiện 5 đĩa. */
export function PhaseStrip({ e }: { e: Eclipse }) {
  const half = halfSpan(e);
  const peakMs = new Date(e.peak).getTime();
  return (
    <ol className={v.strip} aria-label="Các pha theo thời gian">
      {(isSolar(e) ? FRACS_SOLAR : FRACS_LUNAR).map((f, i) => {
        const t = f * half;
        const iso = new Date(peakMs + t * 60000 + 7 * 3600_000).toISOString().slice(0, 16) + ":00+07:00";
        const far = Math.abs(f) > (isSolar(e) ? 0.4 : 0.5);
        return (
          <li key={f} className={`${v.stripItem} ${f === 0 ? v.stripMain : ""} ${far ? v.stripFar : ""}`}>
            <EclipseDisc e={e} t={t} uid={`${e.slug}-s${i}`} bare className={v.stripDisc} />
            <span>{hhmm(iso)}</span>
          </li>
        );
      })}
    </ol>
  );
}

/** Ảnh thu nhỏ trên thẻ danh sách: đĩa tại cực đại trong khung trời đêm. */
export function EclipseThumb({ e }: { e: Eclipse }) {
  return <EclipseDisc e={e} uid={`${e.slug}-th`} className={v.thumb} />;
}
