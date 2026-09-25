import { moonLitPath } from "@/lib/van-hoa/moon";
import s from "./van-hoa.module.css";

const STARS: readonly (readonly [number, number, number])[] = [
  [14, 16, 0.9], [38, 40, 0.6], [26, 92, 0.7], [58, 14, 0.5], [128, 20, 0.9], [146, 52, 0.6],
  [118, 100, 0.7], [140, 88, 0.5], [22, 60, 0.5], [100, 12, 0.6], [70, 108, 0.5], [150, 22, 0.5],
];

/** Khung trời đêm với mặt trăng vẽ theo pha (không dùng ảnh chụp). */
export function MoonDisc({ elongation, percent, label = "Hình dạng mặt trăng tối nay" }: { elongation: number; percent: number; label?: string }) {
  const { d, flip } = moonLitPath(elongation, 80, 60, 30);
  return (
    <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" className={s.moonSvg} role="img" aria-label={label}>
      <defs>
        <radialGradient id="vh-glow">
          <stop offset="0.35" stopColor="#f7ecc8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f7ecc8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="160" height="120" fill="#0f1b3a" />
      {STARS.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#fff" opacity={o} />
      ))}
      <circle cx="80" cy="60" r="52" fill="url(#vh-glow)" opacity={0.15 + (percent / 100) * 0.85} />
      <circle cx="80" cy="60" r="30" fill="#2a3352" />
      <path d={d} fill="#f7ecc8" transform={flip ? "translate(160 0) scale(-1 1)" : undefined} />
      <circle cx="80" cy="60" r="30" fill="none" stroke="#8d93ad" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}
