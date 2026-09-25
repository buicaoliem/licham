import Link from "next/link";
import { JsonLd } from "@/components/calendar/JsonLd";
import { ShareButton } from "@/components/ShareButton";
import { Icon } from "@/components/heritage/Icon";
import { articleJsonLd } from "@/lib/van-hoa/jsonld";
import { lunarToSolarSafe } from "@/lib/van-hoa/logic";
import type { BaiViet } from "@/lib/van-hoa/types";
import { buildShareUrl } from "@/lib/share";
import { getVietnamToday } from "@/lib/today";
import { heritageFile } from "@/lib/heritage-assets";
import { Card, ItemBadge, Page, Pic, Sources } from "./Shared";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import a from "./article.module.css";

/** "2026-09-25" → "25/09/2026". */
function viDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function BaiVietDetail({ post }: { post: BaiViet }) {
  const year = getVietnamToday().year;
  const path = `/van-hoa/bai-viet/${post.slug}/`;
  const hasHero = Boolean(post.heroImage && heritageFile(post.heroImage));
  return (
    <Page
      crumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Văn hoá", href: "/van-hoa/" },
        { label: post.title },
      ]}
    >
      <JsonLd data={articleJsonLd({ headline: post.title, description: post.summary, path, image: post.heroImage, updatedAt: post.updatedAt })} />
      <div className={a.banner} aria-hidden="true" />
      <div className={s.wrap}>
        <div className={a.layout}>
          <header className={a.head}>
            <ItemBadge label={post.label} />
            <h1 className={a.h1}>{post.title}</h1>
            <p className={a.meta}>
              <time dateTime={post.updatedAt}>Cập nhật ngày {viDate(post.updatedAt)}</time>
              <ShareButton url={buildShareUrl(path)} title={post.title} text={post.summary} align="end" />
            </p>
          </header>

          <figure className={a.hero}>
            {hasHero ? (
              <Pic src={post.heroImage} alt={post.heroAlt} className={a.heroImg} width={1200} height={900} eager />
            ) : (
              <div className={`${a.heroImg} ${t.pattern}`} role="presentation" />
            )}
            <figcaption className={t.caption}>Tranh minh họa, không phải ảnh tư liệu lịch sử</figcaption>
          </figure>

          <nav className={a.toc} aria-label="Mục lục">
            <input type="checkbox" id="toc-toggle" className={a.tocToggle} />
            <label htmlFor="toc-toggle" className={a.tocHead}>
              <Icon name="list" size={20} />
              Mục lục
              <Icon name="chevron" size={20} className={a.tocChev} />
            </label>
            <ol className={a.tocList}>
              {post.sections.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`}>{sec.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={a.body}>
            {post.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className={a.sec} aria-labelledby={`${sec.id}-h`}>
                <h2 className={a.h2} id={`${sec.id}-h`}>
                  {sec.heading}
                </h2>
                {sec.paras.map((p, i) => (
                  <p className={t.p} key={i}>
                    {p}
                  </p>
                ))}
                {sec.sub?.map((sb) => (
                  <div key={sb.heading}>
                    <h3 className={a.h3}>{sb.heading}</h3>
                    {sb.paras.map((p, i) => (
                      <p className={t.p} key={i}>
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </section>
            ))}

            {post.lunarDates && post.lunarDates.length > 0 && (
              <Card id="ngay-am" icon="calendar" title="Ngày âm liên quan">
                <ul className={a.dateRows}>
                  {post.lunarDates.map((d) => {
                    const solar = lunarToSolarSafe(d.day, d.month, year);
                    return (
                      <li key={d.label}>
                        <b>{d.label}</b>
                        <span>
                          Ngày {d.day} tháng {d.month} âm lịch
                        </span>
                        {solar && <small>Năm nay: {solar.text}</small>}
                      </li>
                    );
                  })}
                </ul>
              </Card>
            )}

            {post.quote && (
              <blockquote className={a.quote}>
                {post.quote.lines.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
                {post.quote.source && <footer>{post.quote.source}</footer>}
              </blockquote>
            )}

            <Sources sources={post.sources} />

            {post.related && post.related.length > 0 && (
              <section aria-labelledby="bai-lien-quan">
                <h2 className={a.h2} id="bai-lien-quan">
                  Bài liên quan
                </h2>
                <ul className={a.relGrid}>
                  {post.related.slice(0, 3).map((r) => (
                    <li key={r.href + r.label}>
                      <Link href={r.href} className={a.relCard}>
                        <b>{r.label}</b>
                        {r.summary && <span>{r.summary}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
