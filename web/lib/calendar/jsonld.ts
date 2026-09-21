import { SITE_URL } from "@/lib/site";

export interface Crumb {
  label: string;
  /** Bỏ trống ở mục cuối (trang hiện tại). */
  href?: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** Mọi mục trừ mục cuối phải có href, để BreadcrumbList hợp lệ. */
export function breadcrumbJsonLd(items: Crumb[]) {
  items.forEach((c, i) => {
    if (!c.href && i < items.length - 1) throw new Error(`Breadcrumb "${c.label}" thiếu href`);
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };
}

/** Chỉ gọi với đúng những câu hỏi đang hiển thị trên trang. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
