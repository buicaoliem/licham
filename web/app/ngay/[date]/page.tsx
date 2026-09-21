import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { CalendarDayHero } from "@/components/calendar/CalendarDayHero";
import { CanChiRelations } from "@/components/calendar/CanChiRelations";
import { DayNavigation } from "@/components/calendar/DayNavigation";
import { GoodBadActivities } from "@/components/calendar/GoodBadActivities";
import { GoodBadStars } from "@/components/calendar/GoodBadStars";
import { GoodBadSummary } from "@/components/calendar/DaySummary";
import { JsonLd } from "@/components/calendar/JsonLd";
import { PengZuTaboo } from "@/components/calendar/PengZuTaboo";
import { RelatedLinks } from "@/components/calendar/RelatedLinks";
import { SolarTerm } from "@/components/calendar/SolarTerm";
import { SourceNote } from "@/components/calendar/SourceNote";
import { TwentyEightMansion } from "@/components/calendar/TwentyEightMansion";
import { ZodiacHours } from "@/components/calendar/ZodiacHours";
import { adjacentDays, getCalendarDay } from "@/lib/calendar/calendar-day";
import { generateCalendarDayMetadata } from "@/lib/calendar/metadata";
import { canPublishDay } from "@/lib/calendar/policy";
import { getRelatedLinksForDay } from "@/lib/calendar/related";
import { prebuildDaySlugs } from "@/lib/calendar/prebuild";
import { parseDaySlug } from "@/lib/calendar/urls";
import { faqJsonLd } from "@/lib/calendar/jsonld";
import { joinVi } from "@/lib/day-detail";
import Link from "next/link";
import { getVietnamToday } from "@/lib/today";

/** Chỉ dựng sẵn năm nay ±1; mọi ngày khác trong khoảng hỗ trợ được dựng khi có người truy cập đầu tiên rồi cache. */
export function generateStaticParams() {
  return prebuildDaySlugs(getVietnamToday().year).map((date) => ({ date }));
}

export const dynamicParams = true;

function load(slug: string) {
  const date = parseDaySlug(slug);
  if (!date || !canPublishDay(date)) return null;
  return { date, day: getCalendarDay(date) };
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }): Promise<Metadata> {
  const { date } = await params;
  const loaded = load(date);
  return loaded ? generateCalendarDayMetadata(loaded.day) : {};
}

export default async function DayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date: slug } = await params;
  const loaded = load(slug);
  if (!loaded) notFound();
  const { date, day } = loaded;
  const { prev, next } = adjacentDays(date);
  const { day: d, month: m, year: y } = date;
  const khan = day.prayers;
  const label = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  const bestHours = day.zodiacHourGood.map((h) => `giờ ${h.chiName} (${h.start}–${h.end})`);

  const faqs = [
    {
      q: `Ngày ${label} là ngày bao nhiêu âm lịch?`,
      a: `Là ngày ${day.lunarDate.day} tháng ${day.lunarMonthName} năm ${day.lunarYearName}, tức ngày ${day.canChiDay.name} tháng ${day.canChiMonth.name}.`,
    },
    {
      q: `Ngày ${label} là hoàng đạo hay hắc đạo?`,
      a: `${day.isHoangDaoDay ? "Hoàng đạo" : "Hắc đạo"}, gặp ${day.dayStarName}, trực ${day.truc.name}, theo quan niệm lịch truyền thống.`,
    },
    {
      q: `Ngày ${label} có những giờ hoàng đạo nào?`,
      a: `${joinVi(bestHours)}.`,
    },
  ];

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Lịch tháng" />
        <CalendarDayHero day={day} />

        <div className="body">
          <div className="stack two" style={{ marginTop: 0 }}>
            <GoodBadSummary day={day} />
            <ZodiacHours day={day} />
          </div>
          <div className="stack two">
            <GoodBadActivities day={day} />
            <GoodBadStars day={day} />
          </div>
          <div className="stack two">
            <TwentyEightMansion day={day} />
            <CanChiRelations day={day} />
            <SolarTerm day={day} />
            <PengZuTaboo day={day} />
          </div>

          {khan.length > 0 && (
            <div className="box" style={{ marginTop: 16 }}>
              <h2 className="box-h">
                <span className="rule" />
                <span className="t">Văn khấn ngày này</span>
                <span className="rule" />
              </h2>
              <ul className="lst">
                {khan.map((k) => (
                  <li key={k.slug}>
                    <Link href={`/van-khan/${k.slug}/`}>{k.ten}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="hh" style={{ marginTop: 32 }}>
            Câu hỏi thường gặp
          </h2>
          <div className="box faqs">
            {faqs.map((f) => (
              <div className="faq" key={f.q}>
                <h3 style={{ fontSize: "inherit", margin: 0 }}>
                  <b>{f.q}</b>
                </h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <JsonLd data={faqJsonLd(faqs)} />

          <DayNavigation date={date} prev={prev} next={next} />
          <RelatedLinks links={getRelatedLinksForDay(date, day)} />
          <SourceNote day={day} />
          <TraditionalDisclaimer compact />
        </div>
        <Footer />
      </div>
    </div>
  );
}
