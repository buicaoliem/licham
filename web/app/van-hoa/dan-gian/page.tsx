import type { Metadata } from "next";
import Link from "next/link";
import { ChShell } from "@/components/heritage/ChShell";
import { TopicList } from "@/components/van-hoa/tpl/TopicList";
import { Hero, ListLd } from "@/components/van-hoa/tpl/Shared";
import { RelatedGrid } from "@/components/van-hoa/tpl/RelatedGrid";
import s from "@/components/van-hoa/van-hoa.module.css";
import t from "@/components/van-hoa/tpl/tpl.module.css";
import { HERO_IMAGE, VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { relatedPeopleLinks } from "@/lib/van-hoa/cross-links";
import { DAN_GIAN_GENRE_LINKS, DAN_GIAN_INTRO, DAN_GIAN_PATH, danGianHubItems, danGianIntroPeople, linkFirstPhrases } from "@/lib/van-hoa/dan-gian-hub";
import { DAN_GIAN_GROUPS } from "@/lib/van-hoa/types";

export const metadata: Metadata = {
  title: "Văn hoá dân gian | Lịch Âm",
  description: "Trò chơi, tranh, đồ chơi, truyện cổ tích, tín ngưỡng và món ăn theo lễ của người Việt.",
  alternates: { canonical: DAN_GIAN_PATH },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function ListPage() {
  const items = danGianHubItems();
  const used = new Set<string>();
  const people = relatedPeopleLinks(danGianIntroPeople());
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <div className={s.root}>
        <ListLd crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn hoá", href: "/van-hoa/" }, { label: "Văn hoá dân gian" }]} name="Văn hoá dân gian" description={metadata.description!} path={DAN_GIAN_PATH} items={items.map((x) => ({ name: x.title, href: x.href }))} />
        <Hero title="Văn hoá dân gian" lead="Trò chơi, tranh dân gian, đồ chơi, truyện cổ tích, tín ngưỡng và món ăn theo lễ — nếp sống gắn với các dịp trong năm." image={HERO_IMAGE} short center />
        <div className={s.wrap}>
          {DAN_GIAN_INTRO.map((para) => (
            <p className={t.p} key={para.slice(0, 24)}>
              {linkFirstPhrases(para, DAN_GIAN_GENRE_LINKS, used).map((seg, i) =>
                seg.href ? (
                  <Link key={i} href={seg.href} className={t.inlineLink}>
                    {seg.text}
                  </Link>
                ) : (
                  <span key={i}>{seg.text}</span>
                ),
              )}
            </p>
          ))}
          <RelatedGrid title="Nhân vật liên quan" links={people} />
          <TopicList groups={DAN_GIAN_GROUPS} placeholder="Tìm trò chơi, món ăn, truyện…" items={items} />
        </div>
      </div>
    </ChShell>
  );
}
