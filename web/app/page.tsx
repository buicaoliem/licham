import { CHI, getDayInfo } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBand } from "@/components/HeroBand";
import { LinkColumns } from "@/components/LinkColumns";
import { MonthGrid } from "@/components/MonthGrid";
import { OccasionChips } from "@/components/OccasionChips";
import { TodayCards } from "@/components/TodayCards";
import { isTrucHoangDao } from "@/lib/hoang-dao-ngay";
import { getMonthCells } from "@/lib/month-grid";
import { getUpcomingOccasions } from "@/lib/upcoming-occasions";

// Trang tĩnh: "hôm nay" được tính tại thời điểm build.
export default function HomePage() {
  const now = new Date();
  const today = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
  const info = getDayInfo(today);

  const hoangDaoHours = info.hours
    .filter((h) => h.isHoangDao)
    .map((h) => ({ chiName: CHI[h.chiIndex]!, start: h.start, end: h.end }));

  const cells = getMonthCells(today.month, today.year, today);

  return (
    <div className="outer">
      <div className="site">
        <Header lunarDay={info.lunar.day} activeMenu="Hôm nay" />

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
          isHoangDao={isTrucHoangDao(info.truc.name)}
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

          <TodayCards hoangDaoHours={hoangDaoHours} info={info} />

          <MonthGrid month={today.month} year={today.year} cells={cells} />

          <OccasionChips />

          <LinkColumns upcomingOccasions={getUpcomingOccasions(today)} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
