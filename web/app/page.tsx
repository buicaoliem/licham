import { CHI, getDayInfo } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBand } from "@/components/HeroBand";
import { LinkColumns } from "@/components/LinkColumns";
import { type MonthDayCell, MonthGrid } from "@/components/MonthGrid";
import { OccasionChips } from "@/components/OccasionChips";
import { TodayCards } from "@/components/TodayCards";
import { daysInMonth, leadingBlanks as countLeadingBlanks } from "@/lib/format";
import { isTrucHoangDao } from "@/lib/hoang-dao-ngay";
import { getUpcomingOccasions } from "@/lib/upcoming-occasions";

// Trang tĩnh: "hôm nay" được tính tại thời điểm build.
export default function HomePage() {
  const now = new Date();
  const today = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
  const info = getDayInfo(today);

  const hoangDaoHours = info.hours
    .filter((h) => h.isHoangDao)
    .map((h) => ({ chiName: CHI[h.chiIndex]!, start: h.start, end: h.end }));

  const total = daysInMonth(today.month, today.year);
  const firstOfMonthInfo = getDayInfo({ day: 1, month: today.month, year: today.year });
  const leading = countLeadingBlanks(firstOfMonthInfo.solar.dayOfWeek);

  const cells: MonthDayCell[] = [
    ...Array.from({ length: leading }, () => ({
      solarDay: 0,
      lunarDay: 0,
      isToday: false,
      isMungMotOrRam: false,
      isHoangDao: false,
    })),
    ...Array.from({ length: total }, (_, i) => {
      const d = i + 1;
      const cellInfo = getDayInfo({ day: d, month: today.month, year: today.year });
      return {
        solarDay: d,
        lunarDay: cellInfo.lunar.day,
        isToday: d === today.day,
        isMungMotOrRam: cellInfo.lunar.day === 1 || cellInfo.lunar.day === 15,
        isHoangDao: isTrucHoangDao(cellInfo.truc.name),
      };
    }),
  ];

  return (
    <>
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
      />

      <div className="mx-auto max-w-6xl px-4 pt-10">
        <h1 className="text-center text-2xl font-semibold text-ink sm:text-3xl">
          Lịch âm hôm nay — Lịch vạn niên {info.solar.year}
        </h1>
        <p className="mt-2 text-center text-sm text-ink-3">
          Xem ngày âm dương, giờ hoàng đạo và ngày tốt xấu hôm nay, cập nhật theo lịch vạn niên Việt Nam.
        </p>
      </div>

      <TodayCards hoangDaoHours={hoangDaoHours} info={info} />

      <MonthGrid month={today.month} year={today.year} cells={cells} />

      <OccasionChips />

      <LinkColumns upcomingOccasions={getUpcomingOccasions(today)} />

      <Footer />
    </>
  );
}
