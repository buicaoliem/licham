import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DayTemplate } from "@/components/lich/DayTemplate";
import { getCalendarDay } from "@/lib/calendar/calendar-day";
import { generateCalendarDayMetadata } from "@/lib/calendar/metadata";
import { canPublishDay } from "@/lib/calendar/policy";
import { prebuildDaySlugs } from "@/lib/calendar/prebuild";
import { monthHref, parseDaySlug, yearHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import { joinVi } from "@/lib/day-detail";
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
  const { day: d, month: m, year: y } = date;
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
    <DayTemplate
      date={date}
      day={day}
      activeMenu="Lịch tháng"
      crumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Lịch âm", href: yearHref(y) },
        { label: `Tháng ${m} năm ${y}`, href: monthHref(m, y) },
        { label: `${pad2(d)}/${pad2(m)}/${y}` },
      ]}
      title={
        <>
          Lịch âm ngày {d} tháng {m} năm {y}
        </>
      }
      faqs={faqs}
    />
  );
}
