import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/calendar/Breadcrumb";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { heritageFile } from "@/lib/heritage-assets";
import { ITEM_LABELS, type ItemLabel, type RelatedLink, type Source } from "@/lib/van-hoa/types";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";

export function ItemBadge({ label }: { label: ItemLabel }) {
  const l = ITEM_LABELS[label];
  return (
    <span className={t.label} style={{ color: l.ink, background: l.bg }}>
      {l.text}
    </span>
  );
}

export function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 className={s.h2} id={id}>
      <span className={s.orn} aria-hidden="true" />
      {children}
      <span className={`${s.orn} ${s.ornR}`} aria-hidden="true" />
    </h2>
  );
}

/** Thẻ có tiêu đề kèm biểu tượng, chữ trái (theo mock). */
export function Card({ id, icon, title, children, className }: { id?: string; icon?: IconName; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`${t.card} ${className ?? ""}`} id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <h2 className={t.cardTitle} id={id ? `${id}-h` : undefined}>
        {icon && <Icon name={icon} size={22} stroke={1.6} />}
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Ảnh nếu file có thật, không thì khung hoa văn trung tính (không bao giờ ảnh vỡ). */
export function Pic({ src, alt = "", className, style, width, height, eager }: { src?: string | null; alt?: string; className: string; style?: React.CSSProperties; width: number; height: number; eager?: boolean }) {
  const file = src ? heritageFile(src) : null;
  if (!file) return <div className={`${className} ${t.pattern}`} style={style} role="presentation" />;
  return <img src={file} alt={alt} width={width} height={height} className={className} style={style} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

export function Page({ crumbs, children }: { crumbs?: Crumb[]; children: ReactNode }) {
  return (
    <div className={s.root}>
      {crumbs && (
        <div className={t.crumbs}>
          <Breadcrumb items={crumbs} />
        </div>
      )}
      {children}
    </div>
  );
}

export function Sources({ sources }: { sources: readonly Source[] }) {
  if (sources.length === 0) return null;
  return (
    <Card id="nguon" icon="book" title="Nguồn tham khảo">
      <ol className={t.sources}>
        {sources.map((x) => (
          <li key={x.text}>{x.url ? <a href={x.url} rel="noopener noreferrer" target="_blank">{x.text}</a> : x.text}</li>
        ))}
      </ol>
    </Card>
  );
}

export function LinkRow({ link, icon = "scroll" }: { link: RelatedLink; icon?: IconName }) {
  return (
    <Link href={link.href} className={t.linkRow}>
      <Icon name={icon} size={20} />
      <span>
        {link.label}
        {link.summary && <small>{link.summary}</small>}
      </span>
      <Icon name="chevron" size={20} className={t.go} />
    </Link>
  );
}

export function Related({ links }: { links: readonly RelatedLink[] }) {
  if (links.length === 0) return null;
  return (
    <Card id="lien-quan" icon="clover" title="Liên kết liên quan">
      <div className={t.stack} style={{ marginTop: 0 }}>
        {links.map((l) => (
          <LinkRow key={l.href + l.label} link={l} />
        ))}
      </div>
    </Card>
  );
}

export function Hero({ label, title, sub, lead, image, alt, center = false }: { label?: ItemLabel; title: string; sub?: string; lead?: string; image?: string | null; alt?: string; center?: boolean }) {
  return (
    <header className={`${t.dHero} ${center ? t.dHeroCenter : ""}`}>
      {image && heritageFile(image) && <Pic src={image} alt={alt} className={t.dHeroArt} width={1200} height={600} eager />}
      <div className={`${t.dHeroText} ${image && heritageFile(image) ? t.dHeroOver : ""}`}>
        <div className={t.dHeroTextIn}>
          {label && <ItemBadge label={label} />}
          <h1 className={s.h1} style={{ textAlign: "inherit" }}>
            {title}
          </h1>
          {sub && <p className={t.dHeroSub}>{sub}</p>}
          {lead && <p className={s.lead} style={{ marginLeft: 0 }}>{lead}</p>}
        </div>
      </div>
    </header>
  );
}

/** Trạng thái chưa có nội dung. */
export function Drafting() {
  return <p className={t.empty}>Nội dung đang được biên soạn.</p>;
}
