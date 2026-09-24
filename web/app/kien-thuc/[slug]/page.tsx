import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/calendar/JsonLd";
import { SourceTag } from "@/components/calendar/SourceTag";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { LcRelated } from "@/components/lich/LichParts";
import { faqJsonLd } from "@/lib/calendar/jsonld";
import { KNOWLEDGE, knowledgeBySlug, knowledgeLinks, knowledgeHref } from "@/lib/knowledge";
import { SITE_URL } from "@/lib/site";
import { MUA_LABEL, TIET_KHI, tietKhiArt, tietKhiHref } from "@/lib/tiet-khi";

export const dynamicParams = false;

export function generateStaticParams() {
  return KNOWLEDGE.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = knowledgeBySlug(slug);
  if (!k) return {};
  return { title: `${k.title} | Lịch Âm`, description: k.description, alternates: { canonical: knowledgeHref(slug) } };
}

export default async function KienThucPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = knowledgeBySlug(slug);
  if (!k) notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: k.h1,
    description: k.description,
    inLanguage: "vi",
    mainEntityOfPage: `${SITE_URL}${knowledgeHref(slug)}`,
    author: { "@type": "Organization", name: "licham.app", url: SITE_URL },
    publisher: { "@type": "Organization", name: "licham.app", url: SITE_URL },
  };
  const related = [...knowledgeLinks(k.related), ...k.links];

  return (
    <ChShell activeMenu={null} className="ch-page">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Kiến thức", href: "/kien-thuc/" }, { label: k.h1 }]}
        title={k.h1}
        lead={k.description}
      />
      <JsonLd data={article} />
      <JsonLd data={faqJsonLd(k.faq)} />
      <div className="ch-wrap ch-main ch-stack ch-page-body">
        <article className="ch-card ch-prose">
          {k.sections.map((s) => (
            <section key={s.h2}>
              <h2>
                {s.h2}
                {s.sourceType && <SourceTag type={s.sourceType} />}
              </h2>
              {s.p.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
              {s.list && (
                <ul className="dotlist">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <h2>Câu hỏi thường gặp</h2>
          {k.faq.map((f) => (
            <div className="faq" key={f.q}>
              <b>{f.q}</b>
              <p>{f.a}</p>
            </div>
          ))}
        </article>
        {k.slug === "tiet-khi" && (
          <section className="tk-gallery" aria-labelledby="tk-gal-h">
            <h2 className="ch-h2" id="tk-gal-h">
              Tranh và ý nghĩa 24 tiết khí
            </h2>
            <ol className="tk-gal-grid">
              {TIET_KHI.map((t) => {
                const img = tietKhiArt(t);
                return (
                  <li key={t.slug}>
                    <Link className={`tk-gal-card m-${t.mua}`} href={tietKhiHref(t.slug)}>
                      <span className="tk-gal-pic" aria-hidden="true">
                        {img && <img src={img} alt="" loading="lazy" decoding="async" width={1448} height={1086} />}
                      </span>
                      <span className="tk-gal-t">
                        <b>{t.ten}</b>
                        <small>
                          {t.kinhDo}° · {MUA_LABEL[t.mua]}
                        </small>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
        <LcRelated links={related} />
        <p className="ch-note">
          Bài viết do licham.app biên soạn; phần tính toán và cách phân loại nguồn xem tại{" "}
          <Link href="/phuong-phap-tinh-lich/">phương pháp tính lịch</Link>.
        </p>
      </div>
    </ChShell>
  );
}
