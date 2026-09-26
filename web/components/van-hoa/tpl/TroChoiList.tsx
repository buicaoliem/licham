import { Hero, ListLd } from "./Shared";
import { TopicList } from "./TopicList";
import { HERO_IMAGE } from "@/lib/van-hoa/config";
import { TRO_CHOI, TRO_CHOI_GROUPS, TRO_CHOI_PATH, troChoiCardImage, troChoiGroup, troChoiPath } from "@/lib/van-hoa/tro-choi";
import s from "../van-hoa.module.css";

export function TroChoiList() {
  const items = TRO_CHOI.map((p) => {
    const group = troChoiGroup(p.slug);
    return {
      href: troChoiPath(p.slug),
      title: p.title,
      summary: p.summary,
      group,
      badge: p.category ?? "Dân gian",
      image: troChoiCardImage(p),
      imageAlt: p.heroAlt,
    };
  });
  const title = "Trò chơi dân gian";
  const lead = "Hai mươi trò chơi dân gian Việt Nam: Tết, hội làng và giờ ra chơi — cách chơi, vùng miền và nguồn gốc.";
  return (
    <div className={s.root}>
      <ListLd
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn hoá", href: "/van-hoa/" }, { label: title }]}
        name={title}
        description={lead}
        path={TRO_CHOI_PATH}
        items={items.map((i) => ({ name: i.title, href: i.href }))}
      />
      <Hero title={title} lead={lead} image={HERO_IMAGE} short center />
      <div className={s.wrap}>
        <TopicList groups={TRO_CHOI_GROUPS} items={items} placeholder="Tìm trò chơi, vùng miền, dịp chơi…" />
      </div>
    </div>
  );
}
