import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { JsonLd } from "@/components/calendar/JsonLd";
import { RelatedLinks } from "@/components/calendar/RelatedLinks";
import { SourceTag } from "@/components/calendar/SourceTag";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { faqJsonLd } from "@/lib/calendar/jsonld";
import { KNOWLEDGE, knowledgeBySlug, knowledgeLinks, knowledgeHref } from "@/lib/knowledge";
import { SITE_URL } from "@/lib/site";

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
    <div className="outer">
      <div className="site">
        <Header />
        <div className="band">
          <div className="bg bg-kim" />
          <div className="band-in">
            <h1>{k.h1}</h1>
            <p>{k.description}</p>
          </div>
        </div>
        <div className="body">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Kiến thức", href: "/kien-thuc/" }, { label: k.h1 }]} />
          <JsonLd data={article} />
          <JsonLd data={faqJsonLd(k.faq)} />
          <div className="prose">
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
          </div>
          <RelatedLinks links={related} />
          <p className="srcnote">
            Bài viết do licham.app biên soạn; phần tính toán và cách phân loại nguồn xem tại <Link href="/phuong-phap-tinh-lich/">phương pháp tính lịch</Link>.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
