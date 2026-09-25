import { SITE_URL } from "@/lib/site";

const ORG = { "@type": "Organization", name: "Lịch Âm – licham.app", url: SITE_URL };
const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

export function collectionJsonLd(name: string, description: string, path: string, items: readonly { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: abs(path),
    inLanguage: "vi",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.href) })),
    },
  };
}

export function articleJsonLd(a: { headline: string; description: string; path: string; image?: string | null; about?: object | object[]; updatedAt?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    inLanguage: "vi",
    mainEntityOfPage: abs(a.path),
    ...(a.image ? { image: abs(a.image) } : {}),
    author: ORG,
    publisher: ORG,
    ...(a.updatedAt ? { dateModified: a.updatedAt } : {}),
    ...(a.about ? { about: a.about } : {}),
  };
}

/** Nơi thờ của nhân vật → Place (địa chỉ theo đơn vị hành chính mới); không có nơi thờ → undefined. */
export function placeJsonLd(nv: { places?: readonly { name: string; address: string }[] }) {
  if (!nv.places?.length) return undefined;
  return nv.places.map((p) => ({ "@type": "Place", name: p.name, address: p.address }));
}
