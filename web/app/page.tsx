import type { Metadata } from "next";
import { CHI, getDayInfo } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBand } from "@/components/HeroBand";
import { LinkColumns } from "@/components/LinkColumns";
import { MonthGrid } from "@/components/MonthGrid";
import { OccasionChips } from "@/components/OccasionChips";
import { TodayCards } from "@/components/TodayCards";
import { getMonthCells } from "@/lib/calendar/calendar-month";
import Link from "next/link";
import { monthHref } from "@/lib/calendar/urls";
import { getVietnamToday } from "@/lib/today";
import { getUpcomingOccasions } from "@/lib/upcoming-occasions";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Lịch âm hôm nay — Lịch vạn niên ${year} | licham.app`,
    description:
      "Lịch âm dương hôm nay, giờ hoàng đạo, ngày tốt xấu, tính tuổi, đếm ngược Tết. Miễn phí, không quảng cáo.",
    alternates: { canonical: "/" },
  };
}

// "Hôm nay" tính theo giờ Việt Nam; trang dựng lại mỗi 5 phút (ISR) để không bị cũ sau ngày build.
export const revalidate = 300;
export default function HomePage() {
  const today = getVietnamToday();
  const info = getDayInfo(today);

  const hoangDaoHours = info.hours
    .filter((h) => h.isHoangDao)
    .map((h) => ({ chiName: CHI[h.chiIndex]!, start: h.start, end: h.end }));
  const worstHourInfo = info.hours.find((h) => !h.isHoangDao);
  const worstHour = worstHourInfo
    ? { chiName: CHI[worstHourInfo.chiIndex]!, start: worstHourInfo.start, end: worstHourInfo.end }
    : null;

  const cells = getMonthCells(today.month, today.year, today);

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Hôm nay" />

        <HeroBand
          dayOfWeek={info.solar.dayOfWeek}
          solarDay={info.solar.day}
          solarMonth={info.solar.month}
          solarYear={info.solar.year}
          lunarDay={info.lunar.day}
          lunarMonth={info.lunar.month}
          lunarYear={info.lunar.year}
          lunarIsLeap={info.lunar.isLeapMonth}
          yearCanChi={info.canChi.year.name}
          isHoangDao={info.thanSatNgay.isHoangDao}
          trucName={info.truc.name}
          solarTermName={info.solarTerm.name}
        />

        <div className="body">
          <h1 style={{ fontFamily: "var(--font-lora), serif", fontSize: 24, fontWeight: 600 }}>
            Lịch âm hôm nay — Lịch vạn niên {info.solar.year}
          </h1>
          <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 13.5, margin: "9px auto 24px", maxWidth: 600 }}>
            Xem lịch âm dương, giờ hoàng đạo, ngày tốt xấu. Không quảng cáo, không theo dõi, mở là thấy ngay.
          </p>

          <nav aria-label="Lối tắt" className="chips" style={{ justifyContent: "center", marginBottom: 22 }}>
            <Link className="chip hot" href="/hom-nay/">Lịch hôm nay</Link>
            <Link className="chip" href="/ngay-mai/">Lịch ngày mai</Link>
            <Link className="chip" href={monthHref(today.month, today.year)}>Lịch tháng này</Link>
            <Link className="chip" href="/doi-ngay-am-duong/">Đổi âm dương</Link>
            <Link className="chip" href="/xem-ngay-tot/">Xem ngày tốt</Link>
            <Link className="chip" href="/le/">Ngày lễ sắp tới</Link>
            <Link className="chip" href="/cong-cu/">Công cụ ngày tháng</Link>
            <Link className="chip" href="/kien-thuc/">Kiến thức lịch</Link>
          </nav>

          <TodayCards hoangDaoHours={hoangDaoHours} worstHour={worstHour} info={info} />

          <MonthGrid month={today.month} year={today.year} cells={cells} />

          <OccasionChips />

          <LinkColumns upcomingOccasions={getUpcomingOccasions(today)} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
