import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { TopicList } from "@/components/van-hoa/tpl/TopicList";
import { Hero } from "@/components/van-hoa/tpl/Shared";
import s from "@/components/van-hoa/van-hoa.module.css";
import { HERO_IMAGE, VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { DAN_GIAN } from "@/lib/van-hoa/data/dan-gian";
import { DAN_GIAN_GROUPS } from "@/lib/van-hoa/types";

export const metadata: Metadata = {
  title: "Văn hoá dân gian | Lịch Âm",
  description: "Trò chơi, tranh, đồ chơi, truyện cổ tích, tín ngưỡng và món ăn theo lễ của người Việt.",
  alternates: { canonical: "/van-hoa/dan-gian/" },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function ListPage() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <div className={s.root}>
        <Hero title="Văn hoá dân gian" lead="Trò chơi, tranh dân gian, đồ chơi, truyện cổ tích, tín ngưỡng và món ăn theo lễ — nếp sống gắn với các dịp trong năm." image={HERO_IMAGE} short center />
        <div className={s.wrap}>
          <TopicList
            groups={DAN_GIAN_GROUPS}
            placeholder="Tìm trò chơi, món ăn, truyện…"
            items={DAN_GIAN.map((x) => (({ href: `/van-hoa/dan-gian/${x.slug}/`, title: x.title, summary: x.summary, group: x.group, image: x.heroImage })))}
          />
        </div>
      </div>
    </ChShell>
  );
}
