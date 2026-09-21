import type { Metadata } from "next";
import { DayLanding } from "@/components/calendar/DayLanding";
import { getCalendarDay } from "@/lib/calendar/calendar-day";
import { getVietnamToday } from "@/lib/today";

// Ngày tính theo giờ Việt Nam; dựng lại mỗi phút để sang ngày mới là đổi nội dung.
export const revalidate = 60;

export function generateMetadata(): Metadata {
  const t = getVietnamToday();
  const day = getCalendarDay(t);
  const l = day.lunarDate;
  return {
    title: `Lịch âm hôm nay ${t.day}/${t.month}/${t.year} - Ngày ${l.day}/${l.month} âm lịch`,
    description: `Lịch âm hôm nay, ${day.weekday.name} ngày ${t.day}/${t.month}/${t.year} dương lịch, tức ${l.day}/${l.month} âm lịch, ngày ${day.canChiDay.name}, giờ hoàng đạo và tiết khí.`,
    alternates: { canonical: "/hom-nay/" },
  };
}

export default function HomNayPage() {
  return <DayLanding kind="hom-nay" date={getVietnamToday()} />;
}
