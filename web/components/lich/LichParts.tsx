import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/heritage/Icon";
import type { RelatedLink } from "@/lib/calendar/related";

/** Thẻ nội dung của nhóm Lịch: tiêu đề có icon tròn + nội dung. */
export function LcCard({
  icon,
  tone = "son",
  title,
  sub,
  more,
  id,
  className,
  children,
}: {
  icon: IconName;
  tone?: "son" | "jade" | "gold";
  title: ReactNode;
  sub?: ReactNode;
  more?: ReactNode;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={className ? `lc-card ${className}` : "lc-card"} aria-labelledby={id}>
      <div className="lc-card-h">
        <span className={`lc-ic ${tone}`} aria-hidden="true">
          <Icon name={icon} size={20} />
        </span>
        <div className="t">
          <h2 id={id}>{title}</h2>
          {sub && <p>{sub}</p>}
        </div>
        {more}
      </div>
      {children}
    </section>
  );
}

/** Ô ngày nhỏ (ngày / tháng) dùng trong danh sách. */
export function LcDate({ day, sub, tone = "son" }: { day: number; sub: string; tone?: "son" | "jade" | "gold" }) {
  return (
    <span className={`lc-date ${tone}`}>
      <b>{String(day).padStart(2, "0")}</b>
      <span>{sub}</span>
    </span>
  );
}

/** "Có thể bạn quan tâm": liên kết liên quan dạng chip, giữ nguyên danh sách và thứ tự của nguồn. */
export function LcRelated({ links, title = "Có thể bạn quan tâm" }: { links: RelatedLink[]; title?: string }) {
  return (
    <section className="lc-related" aria-labelledby="lc-related-h">
      <h2 className="ch-h2" id="lc-related-h">
        {title}
      </h2>
      <div className="chips">
        {links.map((l) => (
          <Link className="chip" href={l.href} key={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Hỏi đáp dạng thẻ; câu hỏi là h3 như bản cũ. */
export function LcFaq({ items, title = "Câu hỏi thường gặp" }: { items: { q: string; a: ReactNode }[]; title?: string }) {
  return (
    <LcCard icon="question" tone="gold" title={title} id="lc-faq-h" className="lc-faq">
      <div className="lc-faq-list">
        {items.map((f) => (
          <div className="lc-faq-i" key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </LcCard>
  );
}

/** Thanh điều hướng trước/sau + liên kết giữa (tháng, năm). */
export function LcPager({
  label,
  prev,
  mid,
  next,
}: {
  label: string;
  prev: { href: string; text: string; sub: string } | null;
  mid: { href: string; text: string };
  next: { href: string; text: string; sub: string } | null;
}) {
  return (
    <nav className="lc-pager" aria-label={label}>
      {prev ? (
        <Link className="p" href={prev.href}>
          <Icon name="chevron" size={18} className="flip" />
          <span>
            <small>{prev.sub}</small>
            {prev.text}
          </span>
        </Link>
      ) : (
        <span />
      )}
      <Link className="m" href={mid.href}>
        <Icon name="calendar" size={17} />
        {mid.text}
      </Link>
      {next ? (
        <Link className="n" href={next.href}>
          <span>
            <small>{next.sub}</small>
            {next.text}
          </span>
          <Icon name="chevron" size={18} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

/** Bảng khóa – giá trị (dl > div > dt + dd). */
export function LcKv({ rows, className }: { rows: [ReactNode, ReactNode][]; className?: string }) {
  return (
    <dl className={className ? `lc-kv ${className}` : "lc-kv"}>
      {rows.map(([k, v], i) => (
        <div className="kv" key={i}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
