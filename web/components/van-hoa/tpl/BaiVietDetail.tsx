import Link from "next/link";
import { JsonLd } from "@/components/calendar/JsonLd";
import { ShareButton } from "@/components/ShareButton";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { articleJsonLd } from "@/lib/van-hoa/jsonld";
import { lunarToSolarSafe } from "@/lib/van-hoa/logic";
import { relatedForBaiViet } from "@/lib/van-hoa/related";
import type { BaiViet, BaiVietBlock } from "@/lib/van-hoa/types";
import { buildShareUrl } from "@/lib/share";
import { getVietnamToday } from "@/lib/today";
import { heritageFile } from "@/lib/heritage-assets";
import { ItemBadge, Page, Pic, Sources, TopicBadge } from "./Shared";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import a from "./article.module.css";

/** "2026-09-25" → "25/09/2026". */
function viDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** Chữ đậm **…** và nghiêng *…* trong đoạn văn bài viết. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) =>
        part.startsWith("**") ? <b key={i}>{part.slice(2, -2)}</b> : part.startsWith("*") && part.length > 2 ? <i key={i}>{part.slice(1, -1)}</i> : part,
      )}
    </>
  );
}

function Block({ b }: { b: BaiVietBlock }) {
  if (b.type === "p")
    return (
      <p className={t.p}>
        <Inline text={b.text} />
      </p>
    );
  if (b.type === "ul")
    return (
      <ul className={`${t.bullets} ${a.list}`}>
        {b.items.map((x) => (
          <li key={x}>
            <Inline text={x} />
          </li>
        ))}
      </ul>
    );
  return (
    <div className={a.tblScroll}>
      <table className={t.tbl}>
        <thead>
          <tr>
            {b.head.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((r) => (
            <tr key={r.join("|")}>
              {r.map((c, i) => (
                <td key={i}>
                  <Inline text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BoxHead({ icon, children }: { icon: IconName; children: string }) {
  return (
    <h2 className={a.boxHead}>
      <span className={a.boxIco}>
        <Icon name={icon} size={22} stroke={1.7} />
      </span>
      {children}
    </h2>
  );
}

export function BaiVietDetail({ post }: { post: BaiViet }) {
  const year = getVietnamToday().year;
  const path = `/van-hoa/bai-viet/${post.slug}/`;
  const hasHero = Boolean(post.heroImage && heritageFile(post.heroImage));
  const related = relatedForBaiViet(post);
  // Điện thoại: hộp "Ngày âm liên quan" nằm sau mục 1, khung ca dao sau mục 2 (theo mock); màn rộng: cả hai ở cột phải.
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
            <div className={a.labelRow}>
              {post.category ? <TopicBadge text={post.category} /> : <ItemBadge label={post.label} />}
              <ShareButton url={buildShareUrl(path)} title={post.title} text={post.summary} align="end" />
            </div>
            <h1 className={a.h1}>{post.title}</h1>
            <p className={a.meta}>
              <time dateTime={post.updatedAt}>Cập nhật ngày {viDate(post.updatedAt)}</time>
            </p>
          </header>

          <figure className={a.hero}>
            {hasHero ? (
              <Pic src={post.heroImage} alt={post.heroAlt} className={a.heroImg} width={1200} height={900} eager />
            ) : (
              <div className={`${a.heroImg} ${t.pattern}`} role="presentation" />
            )}
            <figcaption className={t.caption}>Tranh minh họa, không phải chân dung hay tư liệu lịch sử</figcaption>
          </figure>

          <div className={a.side}>
            <nav className={`${a.box} ${a.toc}`} aria-label="Nội dung chính">
              <input type="checkbox" id="toc-toggle" className={a.tocToggle} />
              <label htmlFor="toc-toggle" className={a.tocHead}>
                <span className={a.boxIco}>
                  <Icon name="scroll" size={22} stroke={1.7} />
                </span>
                Nội dung chính
                <Icon name="chevron" size={20} className={a.tocChev} />
              </label>
              <ol className={a.tocList}>
                {post.sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`}>
                      {sec.heading}
                      <Icon name="chevron" size={16} className={a.tocGo} />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {post.lunarDates && post.lunarDates.length > 0 && (
              <section className={`${a.box} ${a.tint} ${a.oLunar}`} aria-labelledby="ngay-am-h">
                <BoxHead icon="calendar">Ngày âm liên quan</BoxHead>
                <ul className={a.dateRows}>
                  {post.lunarDates.map((d) => {
                    const solar = lunarToSolarSafe(d.day, d.month, year);
                    return (
                      <li key={d.label}>
                        <b>{d.label}</b>
                        <small>
                          {d.text ?? `${d.day} tháng ${d.month}`} âm lịch
                          {solar && ` · ${/–|-|rạng/.test(d.text ?? "") ? "Năm nay từ" : "Năm nay"}: ${solar.text}`}
                        </small>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {post.quote && (
              <blockquote className={`${a.box} ${a.tint} ${a.quote} ${a.oQuote}`}>
                <p className={a.quoteHead}>
                  <span className={a.mark} aria-hidden="true">
                    “
                  </span>
                  Ca dao, câu đối
                </p>
                {post.quote.lines.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
                {post.quote.source && <footer>— {post.quote.source}</footer>}
              </blockquote>
            )}

            <div className={a.oSources}>
              <Sources sources={post.sources} />
            </div>
          </div>

          <div className={a.body}>
            {post.intro && post.intro.length > 0 && (
              <div className={a.sec} style={{ order: 5 }}>
                {post.intro.map((p, j) => (
                  <p className={`${t.p} ${a.intro}`} key={j}>
                    <Inline text={p} />
                  </p>
                ))}
              </div>
            )}
            {post.sections.map((sec, i) => (
              <section key={sec.id} id={sec.id} className={a.sec} style={{ order: 10 + i * 10 }} aria-labelledby={`${sec.id}-h`}>
                <h2 className={`${a.h2} ${a.num}`} id={`${sec.id}-h`}>
                  {sec.heading}
                </h2>
                {sec.paras.map((p, j) => (
                  <p className={t.p} key={j}>
                    {p}
                  </p>
                ))}
                {sec.blocks?.map((b, j) => (
                  <Block b={b} key={j} />
                ))}
                {sec.sub?.map((sb) => (
                  <div key={sb.heading}>
                    <h3 className={a.h3}>{sb.heading}</h3>
                    {sb.paras.map((p, j) => (
                      <p className={t.p} key={j}>
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </div>

          {related.length > 0 && (
            <section className={a.related} aria-labelledby="bai-lien-quan">
              <h2 className={a.h2} id="bai-lien-quan">
                Bài liên quan
              </h2>
              <ul className={a.relGrid}>
                {related.map((r) => (
                  <li key={r.href + r.label}>
                    <Link href={r.href} className={a.relCard}>
                      <Pic src={r.image} alt="" className={a.relImg} width={480} height={360} />
                      {r.itemLabel ? <ItemBadge label={r.itemLabel} /> : r.badge ? <TopicBadge text={r.badge} /> : null}
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
          )}
        </div>
      </div>
    </Page>
  );
}
