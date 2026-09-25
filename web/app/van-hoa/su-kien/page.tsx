import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { TopicList } from "@/components/van-hoa/tpl/TopicList";
import { Hero, ListLd } from "@/components/van-hoa/tpl/Shared";
import s from "@/components/van-hoa/van-hoa.module.css";
import { HERO_IMAGE, VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { SU_KIEN } from "@/lib/van-hoa/data/su-kien";
import { NAM_SU_KIEN } from "@/lib/van-hoa/data/nam-su-kien";
import { DYNASTY_LIST, dynastyInfo } from "@/lib/van-hoa/dynasty";
import { yearPageHref } from "@/lib/van-hoa/import-logic";
import { canChiYearOfEvent, eventDateText } from "@/lib/van-hoa/logic";
import type { TopicItem } from "@/components/van-hoa/tpl/TopicList";

const groupOf = (dynasty?: string) => (DYNASTY_LIST.some((d) => d.key === dynasty) ? (dynasty as string) : "khac");

/** Trang chi tiết sự kiện trước, rồi các mốc theo năm (trỏ tới dòng thời gian của trang năm can chi). */
const ITEMS: TopicItem[] = [
  ...SU_KIEN.map((x) => ({ href: `/van-hoa/su-kien/${x.slug}/`, title: x.title, summary: x.summary, label: x.label, group: groupOf(x.dynasty), image: x.heroImage })),
  ...NAM_SU_KIEN.map((e): TopicItem => {
    const y = canChiYearOfEvent(e);
    const when = eventDateText(e);
    return {
      id: e.id ?? `${e.year}-${e.title}`,
      ...(y !== null ? { href: `${yearPageHref(y)}#${e.id ?? `nam-${e.year}`}` } : {}),
      title: e.title,
      meta: [`Năm ${e.yearText ?? e.year}`, when].filter(Boolean).join(" · "),
      summary: e.summary,
      label: e.label,
      group: groupOf(e.dynasty),
      image: dynastyInfo(e.dynasty).image ?? undefined,
      search: [e.yearText, ...(e.people ?? [])].filter(Boolean).join(" "),
    };
  }),
];

export const metadata: Metadata = {
  title: "Sự kiện lịch sử | Lịch Âm",
  description: "Các sự kiện lịch sử Việt Nam theo từng triều đại và thời kỳ, kèm ngày âm lịch và ngày dương quy đổi.",
  alternates: { canonical: "/van-hoa/su-kien/" },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function ListPage() {
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <div className={s.root}>
        <ListLd crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn hoá", href: "/van-hoa/" }, { label: 'Sự kiện lịch sử' }]} name='Sự kiện lịch sử' description={metadata.description!} path='/van-hoa/su-kien/' items={ITEMS.filter((x) => x.href).map((x) => ({ name: x.title, href: x.href! }))} />
        <Hero title="Sự kiện lịch sử" lead="Các sự kiện tiêu biểu của lịch sử dân tộc, xếp theo triều đại và thời kỳ, kèm ngày âm lịch và ngày dương lịch quy đổi." image={HERO_IMAGE} short center />
        <div className={s.wrap}>
          <TopicList
            groups={[...DYNASTY_LIST.map((d) => ({ key: d.key, title: d.name })), { key: "khac", title: "Khác" }]}
            placeholder="Tìm sự kiện, triều đại…"
            items={ITEMS}
          />
        </div>
      </div>
    </ChShell>
  );
}
