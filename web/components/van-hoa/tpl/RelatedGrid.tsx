import Link from "next/link";
import type { RelatedLink } from "@/lib/van-hoa/types";
import { linkSegments, personCatalog, personHref, type TextSeg } from "@/lib/van-hoa/cross-links";
import { Icon } from "@/components/heritage/Icon";
import { Pic, TopicBadge } from "./Shared";
import a from "./article.module.css";
import t from "./tpl.module.css";

const CATALOG = personCatalog();

/** Thẻ ảnh + tiêu đề, cùng khuôn "Bài liên quan" của trang bài viết. Ẩn khi không có liên kết. */
export function RelatedGrid({ title, links }: { title: string; links: readonly RelatedLink[] }) {
  if (links.length === 0) return null;
  const id = title === "Nhân vật liên quan" ? "nhan-vat-lien-quan" : title === "Sự kiện liên quan" ? "su-kien-lien-quan" : "lien-quan";
  return (
    <section className={a.related} aria-labelledby={id}>
      <h2 className={a.h2} id={id}>
        {title}
      </h2>
      <ul className={a.relGrid}>
        {links.map((r) => (
          <li key={r.href + r.label}>
            <Link href={r.href} className={a.relCard}>
              <Pic src={r.image} alt="" className={a.relImg} width={480} height={360} />
              {r.badge ? <TopicBadge text={r.badge} /> : null}
              <b>{r.label}</b>
              {r.summary && <span>{r.summary}</span>}
              <em>
                Xem thêm
                <Icon name="arrow" size={16} />
              </em>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LinkedText({ text, used }: { text: string; used: Set<string> }) {
  const segs: TextSeg[] = linkSegments(text, CATALOG, used, personHref);
  return (
    <>
      {segs.map((s, i) =>
        s.href ? (
          <Link key={i} href={s.href} className={t.inlineLink}>
            {s.text}
          </Link>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}
