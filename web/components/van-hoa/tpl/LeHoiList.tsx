import Link from "next/link";
import { Hero, ListLd } from "./Shared";
import { TopicList } from "./TopicList";
import { HERO_IMAGE } from "@/lib/van-hoa/config";
import { LE_HOI_PATH, MONTHS, leHoiFloating, leHoiMonthPath, leHoiOfMonth, leHoiPath, monthLabel } from "@/lib/van-hoa/le-hoi";
import type { LeHoi } from "@/lib/van-hoa/types";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";

const FLOATING = "khong-co-dinh";
const cap = (x: string) => x[0]!.toUpperCase() + x.slice(1);

const toItem = (f: LeHoi, group: string) => ({
  href: leHoiPath(f.slug),
  title: f.name,
  meta: f.dateText,
  summary: f.summary,
  group,
  badge: "Lễ hội",
  image: f.cardImage ?? f.image,
  imageAlt: f.imageAlt,
  search: `${f.site} ${f.newAddress} ${f.worship}`,
});

/** Trang tổng (month = undefined) hoặc trang một tháng âm: thẻ xếp theo tháng, cuối cùng là nhóm "Không cố định ngày". */
export function LeHoiList({ month }: { month?: number }) {
  const months = month ? [month] : MONTHS.filter((m) => leHoiOfMonth(m).length > 0);
  const groups = [...months.map((m) => ({ key: `thang-${m}`, title: cap(`lễ hội ${monthLabel(m)}`) })), ...(month ? [] : [{ key: FLOATING, title: "Không cố định ngày" }])];
  const items = [...months.flatMap((m) => leHoiOfMonth(m).map((f) => toItem(f, `thang-${m}`))), ...(month ? [] : leHoiFloating().map((f) => toItem(f, FLOATING)))];
  const title = month ? cap(`lễ hội ${monthLabel(month)}`) : "Lễ hội theo ngày âm";
  const path = month ? leHoiMonthPath(month) : LE_HOI_PATH;
  const lead = month
    ? `Các lễ hội truyền thống diễn ra trong ${monthLabel(month)} âm lịch: thời gian, địa điểm và đối tượng thờ.`
    : "Lễ hội truyền thống các vùng miền xếp theo tháng âm lịch; cuối cùng là các lễ hội và tục lệ không cố định ngày.";
  const crumbs = [{ label: "Trang chủ", href: "/" }, { label: "Văn hoá", href: "/van-hoa/" }, ...(month ? [{ label: "Lễ hội", href: LE_HOI_PATH }, { label: title }] : [{ label: "Lễ hội" }])];
  return (
    <div className={s.root}>
      <ListLd crumbs={crumbs} name={title} description={lead} path={path} items={items.map((i) => ({ name: i.title, href: i.href }))} />
      <Hero title={title} lead={lead} image={HERO_IMAGE} short center />
      <div className={s.wrap}>
        <nav aria-label="Lễ hội theo tháng âm lịch">
          <ul className={t.chips}>
            {MONTHS.filter((m) => leHoiOfMonth(m).length > 0).map((m) => (
              <li key={m}>
                <Link href={leHoiMonthPath(m)} className={`${t.chip} ${m === month ? t.chipOn : ""}`} aria-current={m === month ? "page" : undefined}>
                  {cap(monthLabel(m))}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <TopicList groups={groups} items={items} placeholder="Tìm lễ hội, địa điểm, nhân vật được thờ…" />
      </div>
    </div>
  );
}
