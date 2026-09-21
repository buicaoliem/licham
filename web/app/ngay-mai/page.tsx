import type { Metadata } from "next";
import { DayLanding } from "@/components/calendar/DayLanding";
import { getCalendarDay } from "@/lib/calendar/calendar-day";
import { getVietnamTomorrow } from "@/lib/today";

// Ngày tính theo giờ Việt Nam; dựng lại mỗi phút để sang ngày mới là đổi nội dung.
export const revalidate = 60;

export function generateMetadata(): Metadata {
  const t = getVietnamTomorrow();
  const day = getCalendarDay(t);
  const l = day.lunarDate;
  return {
    title: `Lịch âm ngày mai ${t.day}/${t.month}/${t.year} - Ngày ${l.day}/${l.month} âm lịch`,
    description: `Lịch âm ngày mai, ${day.weekday.name} ngày ${t.day}/${t.month}/${t.year} dương lịch, tức ${l.day}/${l.month} âm lịch, ngày ${day.canChiDay.name}, giờ hoàng đạo và tiết khí.`,
    alternates: { canonical: "/ngay-mai/" },
  };
}

export default function NgayMaiPage() {
  return <DayLanding kind="ngay-mai" date={getVietnamTomorrow()} />;
}
