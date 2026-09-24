import Link from "next/link";
import { LeHeroIllustration, hasHeroIllustration } from "@/components/LeIllustration";
import { type AnhHung, THOI_KY, anhHungHref, thoiKyLabel } from "@/lib/anh-hung";
import { leArt } from "@/lib/le-hub";
import { leBySlug } from "@/lib/le";
import { HeritageImage } from "./HeritageImage";

export type AhArt = { kind: "img"; src: string } | { kind: "photo"; src: string; credit: string } | { kind: "icon"; key: string } | null;

/** Tranh của nhân vật: tranh riêng của trang ngày giỗ, ảnh thật (Hồ Chí Minh), hoặc minh họa biểu tượng SVG. */
export function anhHungArt(a: AnhHung): AhArt {
  const le = a.leSlug ? leBySlug(a.leSlug) : undefined;
  const art = le ? leArt(le) : null;
  if (art?.kind === "img") return { kind: "img", src: art.src };
  if (art?.kind === "photo")
    return {
      kind: "photo",
      src: "/le/ho-chi-minh-1946.jpg",
      credit: "Ảnh: Wikimedia Commons, phạm vi công cộng",
    };
  if (art?.kind === "icon") return { kind: "icon", key: art.slug };
  if (hasHeroIllustration(a.slug)) return { kind: "icon", key: a.slug };
  return null;
}

/** Khung hình nhân vật; biểu tượng SVG đặt trên nền hoa văn trống đồng theo tông thời kỳ. */
export function AhArtView({ a, art, className, eager = false }: { a: AnhHung; art: AhArt; className?: string; eager?: boolean }) {
  const cls = ["ah-art", `tk-${a.thoiKy}`, art ? art.kind : "none", className ?? ""].filter(Boolean).join(" ");
  if (art?.kind === "img") {
    return (
      <span className={cls}>
        <HeritageImage src={art.src} alt="" eager={eager} />
      </span>
    );
  }
  if (art?.kind === "photo") {
    return (
      <span className={cls}>
        <img src={art.src} alt={`${a.ten}`} loading={eager ? "eager" : "lazy"} decoding="async" />
      </span>
    );
  }
  return (
    <span className={cls}>
      <DrumPattern className="ah-art-bg" />
      {art?.kind === "icon" && <LeHeroIllustration slug={art.key} />}
    </span>
  );
}

/** Thẻ nhân vật trong danh mục. */
export function AhCard({ a, art }: { a: AnhHung; art: AhArt }) {
  return (
    <Link className={`ah-card tk-${a.thoiKy}`} href={anhHungHref(a.slug)}>
      <AhArtView a={a} art={art} className="ah-card-art" />
      <span className="ah-card-b">
        <span className="ah-card-era">{thoiKyLabel(a.thoiKy)}</span>
        <b className="ah-card-t">{a.ten}</b>
        <span className="ah-card-y">{a.nienDai}</span>
        <span className="ah-card-d">{a.tomTat}</span>
        <span className="ah-card-m">
          <span>{a.trieuDai}</span>
          {a.tieuBieu2013 && <span className="ah-badge">14 anh hùng tiêu biểu</span>}
        </span>
      </span>
    </Link>
  );
}

/**
 * Hoa văn mặt trống đồng Đông Sơn vẽ bằng SVG: ngôi sao giữa, các vành tròn đồng tâm với vạch và
 * vòng chấm. Là hình học thuần, không mô phỏng một hiện vật cụ thể.
 */
export function DrumPattern({ className, rays = 14 }: { className?: string; rays?: number }) {
  const cx = 100;
  const cy = 100;
  const star = Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2 - Math.PI / 2;
    const b = a + Math.PI / rays;
    const x1 = cx + Math.cos(a) * 30;
    const y1 = cy + Math.sin(a) * 30;
    const x2 = cx + Math.cos(b) * 9;
    const y2 = cy + Math.sin(b) * 9;
    return `${i === 0 ? "M" : "L"}${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }).join(" ");
  const ticks = (r1: number, r2: number, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return `M${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)}L${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}`;
    }).join("");
  const dots = (r: number, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return <circle key={i} cx={(cx + Math.cos(a) * r).toFixed(1)} cy={(cy + Math.sin(a) * r).toFixed(1)} r="1.6" />;
    });
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d={`${star} Z`} fill="currentColor" fillOpacity="0.18" />
        <circle cx={cx} cy={cy} r="36" />
        <circle cx={cx} cy={cy} r="44" />
        <path d={ticks(44, 52, 48)} />
        <circle cx={cx} cy={cy} r="52" />
        <circle cx={cx} cy={cy} r="64" />
        <path d={ticks(64, 72, 64)} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r="72" />
        <circle cx={cx} cy={cy} r="86" />
        <circle cx={cx} cy={cy} r="96" />
      </g>
      <g fill="currentColor">{dots(58, 36)}</g>
      <g fill="currentColor">{dots(79, 48)}</g>
      <g fill="currentColor">{dots(91, 60)}</g>
    </svg>
  );
}

/** Dòng thời gian: các thời kỳ theo thứ tự, mỗi mốc là một nhân vật (liên kết tới trang chi tiết). */
export function AhTimeline({ list }: { list: AnhHung[] }) {
  return (
    <ol className="ah-tl">
      {THOI_KY.filter((t) => list.some((a) => a.thoiKy === t.key)).map((t) => (
        <li className={`ah-tl-era tk-${t.key}`} key={t.key}>
          <div className="ah-tl-h">
            <b>{t.label}</b>
            <span>{t.khoang}</span>
          </div>
          <ol className="ah-tl-items">
            {list
              .filter((a) => a.thoiKy === t.key)
              .map((a) => (
                <li key={a.slug}>
                  <span className="ah-tl-y">{a.nienDai}</span>
                  <Link href={anhHungHref(a.slug)}>{a.ten}</Link>
                  <span className="ah-tl-d">{a.congTrang[0] ?? a.tomTat}</span>
                </li>
              ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
