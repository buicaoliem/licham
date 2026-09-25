import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { TopicList } from "@/components/van-hoa/tpl/TopicList";
import { Hero, ListLd } from "@/components/van-hoa/tpl/Shared";
import s from "@/components/van-hoa/van-hoa.module.css";
import { HERO_IMAGE, VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { SU_KIEN } from "@/lib/van-hoa/data/su-kien";
import { DYNASTY_LIST } from "@/lib/van-hoa/dynasty";

export const metadata: Metadata = {
  title: "Sự kiện lịch sử | Lịch Âm",
  description: "Các sự kiện lịch sử Việt Nam theo từng triều đại và thời kỳ, kèm ngày âm lịch và ngày dương quy đổi.",
  alternates: { canonical: "/van-hoa/su-kien/" },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function ListPage() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <div className={s.root}>
        <ListLd crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn hoá", href: "/van-hoa/" }, { label: 'Sự kiện lịch sử' }]} name='Sự kiện lịch sử' description={metadata.description!} path='/van-hoa/su-kien/' items={SU_KIEN.map((x) => ({ name: x.title, href: `/van-hoa/su-kien/${x.slug}/` }))} />
        <Hero title="Sự kiện lịch sử" lead="Các sự kiện tiêu biểu của lịch sử dân tộc, xếp theo triều đại và thời kỳ, kèm ngày âm lịch và ngày dương lịch quy đổi." image={HERO_IMAGE} short center />
        <div className={s.wrap}>
          <TopicList
            groups={[...DYNASTY_LIST.map((d) => ({ key: d.key, title: d.name })), { key: "khac", title: "Khác" }]}
            placeholder="Tìm sự kiện, triều đại…"
            items={SU_KIEN.map((x) => (({ href: `/van-hoa/su-kien/${x.slug}/`, title: x.title, summary: x.summary, label: x.label, group: DYNASTY_LIST.some((d) => d.key === x.dynasty) ? (x.dynasty as string) : "khac", image: x.heroImage })))}
          />
        </div>
      </div>
    </ChShell>
  );
}
