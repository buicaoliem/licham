import Link from "next/link";
import type { ReactNode } from "react";
import type { SolarDate } from "@licham/core";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { Breadcrumb, type Crumb } from "@/components/calendar/Breadcrumb";
import { CalendarDayHero } from "@/components/calendar/CalendarDayHero";
import { CanChiRelations } from "@/components/calendar/CanChiRelations";
import { DayNavigation } from "@/components/calendar/DayNavigation";
import { GoodBadActivities } from "@/components/calendar/GoodBadActivities";
import { GoodBadStars } from "@/components/calendar/GoodBadStars";
import { GoodBadSummary } from "@/components/calendar/DaySummary";
import { JsonLd } from "@/components/calendar/JsonLd";
import { PengZuTaboo } from "@/components/calendar/PengZuTaboo";
import { SolarTerm } from "@/components/calendar/SolarTerm";
import { SourceNote } from "@/components/calendar/SourceNote";
import { TwentyEightMansion } from "@/components/calendar/TwentyEightMansion";
import { ZodiacHours } from "@/components/calendar/ZodiacHours";
import { ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import type { MenuItem } from "@/lib/site-nav";
import { type CalendarDay, adjacentDays } from "@/lib/calendar/calendar-day";
import { faqJsonLd } from "@/lib/calendar/jsonld";
import { getRelatedLinksForDay } from "@/lib/calendar/related";
import { dayHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import { LcCard, LcFaq, LcKv, LcRelated } from "./LichParts";

const short = (d: SolarDate) => `${pad2(d.day)}/${pad2(d.month)}`;

/**
 * Template chi tiết ngày (Contemporary Heritage) dùng chung cho /ngay/[date]/, /hom-nay/, /ngay-mai/.
 * Trang truyền tiêu đề h1, breadcrumb và câu hỏi thường gặp của riêng mình (giữ nguyên nội dung SEO từng route).
 */
export function DayTemplate({
  date,
  day,
  activeMenu,
  crumbs,
  title,
  faqs,
  heroExtra,
  children,
}: {
  date: SolarDate;
  day: CalendarDay;
  activeMenu: MenuItem | null;
  crumbs: Crumb[];
  title: ReactNode;
  faqs: { q: string; a: string }[];
  /** Nội dung thêm trong thẻ "Ngày này" (vd. liên kết trang ngày chuẩn trên /hom-nay/). */
  heroExtra?: ReactNode;
  /** Nội dung thêm ngay trên phần điều hướng cuối trang. */
  children?: ReactNode;
}) {
  const { prev, next } = adjacentDays(date);
  const khan = day.prayers;

  return (
    <ChShell activeMenu={activeMenu} className="ch-lich ch-lich-day">
      <div className="ch-wrap ch-main ld-main">
        <div className="ld-crumb">
          <Breadcrumb items={crumbs} />
        </div>

        <CalendarDayHero
          day={day}
          title={title}
          prev={prev ? { href: dayHref(prev), label: short(prev) } : null}
          next={next ? { href: dayHref(next), label: short(next) } : null}
          extra={heroExtra}
        />

        <div className="ld-cols">
          <div className="ld-col-main">
            <div className="ld-o-tq">
              <GoodBadSummary day={day} />
            </div>
            <GoodBadActivities day={day} />
          </div>

          <div className="ld-col-side">
            <ZodiacHours day={day} />
            {(day.joyDirection || day.wealthDirection) && (
              <LcCard icon="arrow" title="Hướng xuất hành" sub="Theo hướng Hỷ thần, Tài thần của ngày" id="ld-huong-h" className="ld-o-huong">
                <LcKv
                  className="cap"
                  rows={[
                    ...(day.joyDirection ? ([["Hỷ thần", `Hướng ${day.joyDirection}`]] as [string, string][]) : []),
                    ...(day.wealthDirection ? ([["Tài thần", `Hướng ${day.wealthDirection}`]] as [string, string][]) : []),
                  ]}
                />
              </LcCard>
            )}
            <LcCard icon="user" tone="gold" title="Tuổi xung" sub={`Xung với ngày ${day.canChiDay.name}`} id="ld-xung-h" className="ld-o-xung">
              <ul className="ld-ages">
                {day.conflictAges.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </LcCard>
            <LcCard icon="yinyang" title="Can chi – Ngũ hành" id="ld-cc-h" className="ld-o-cc">
              <LcKv
                rows={[
                  ["Ngày", `${day.canChiDay.name} · ${day.canChiDay.napAm.name}`],
                  ["Tháng", `${day.canChiMonth.name} · ${day.canChiMonth.napAm.name}`],
                  ["Năm", `${day.canChiYear.name} · ${day.canChiYear.napAm.name}`],
                ]}
              />
            </LcCard>
          </div>
        </div>

        <GoodBadStars day={day} />
        <div className="ld-quad ld-o-quad">
          <TwentyEightMansion day={day} />
          <CanChiRelations day={day} />
          <SolarTerm day={day} />
          <PengZuTaboo day={day} />
        </div>
        {khan.length > 0 && (
          <LcCard icon="flame" title="Văn khấn ngày này" id="ld-vk-h" className="ld-o-vk">
            <ul className="lc-rows">
              {khan.map((k) => (
                <li key={k.slug}>
                  <Link className="lc-row" href={`/van-khan/${k.slug}/`}>
                    <span className="b">
                      <b>{k.ten}</b>
                    </span>
                    <Icon name="chevron" size={16} className="arr" />
                  </Link>
                </li>
              ))}
            </ul>
          </LcCard>
        )}
        <div className="ld-o-faq">
          <LcFaq items={faqs} />
          <JsonLd data={faqJsonLd(faqs)} />
        </div>

        {children}
        <DayNavigation date={date} prev={prev} next={next} />
        <LcRelated links={getRelatedLinksForDay(date, day)} />
        <SourceNote day={day} />
        <TraditionalDisclaimer compact />
      </div>
    </ChShell>
  );
}
