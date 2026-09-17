import type { Metadata } from "next";
import { CHI, getDayInfo } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBand } from "@/components/HeroBand";
import { LinkColumns } from "@/components/LinkColumns";
import { MonthGrid } from "@/components/MonthGrid";
import { OccasionChips } from "@/components/OccasionChips";
import { TodayCards } from "@/components/TodayCards";
import { getMonthCells } from "@/lib/month-grid";
import { getVietnamToday } from "@/lib/today";
import { getUpcomingOccasions } from "@/lib/upcoming-occasions";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Trang tĩnh: "hôm nay" được tính tại thời điểm build, theo giờ Việt Nam.
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
