import Link from "next/link";
import { LcFaq } from "@/components/lich/LichParts";
import { dayHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import type { MonthDayRef, MonthSummary } from "@/lib/month-summary";

function dayLabel(d: MonthDayRef): string {
  return `${pad2(d.day)}/${pad2(d.month)}`;
}

function DayLink({ d }: { d: MonthDayRef }) {
  return <Link href={dayHref(d)}>{dayLabel(d)}</Link>;
}

export function MonthFaq({ month, year, summary }: { month: number; year: number; summary: MonthSummary }) {
  const { totalDays, goodDaysCount, avoidDaysCount, mungMotOrRamDays, goodDays, avoidDays } = summary;
  const firstGood = goodDays[0];
  const firstAvoid = avoidDays[0];

  return (
    <LcFaq
      items={[
        {
          q: `Tháng ${month} năm ${year} có bao nhiêu ngày hoàng đạo?`,
          a: `Tháng ${month} có ${totalDays} ngày, trong đó ${goodDaysCount} ngày là hoàng đạo và ${avoidDaysCount} ngày là hắc đạo.`,
        },
        {
          q: `Ngày tốt nổi bật đầu tiên trong tháng ${month} là ngày nào?`,
          a: firstGood ? (
            <>
              Ngày <DayLink d={firstGood} /> là ngày tốt nổi bật đầu tiên trong danh sách ngày tốt của tháng.
            </>
          ) : (
            "Tháng này không có ngày hoàng đạo."
          ),
        },
        {
          q: `Ngày cần tránh nổi bật đầu tiên trong tháng ${month} là ngày nào?`,
          a: firstAvoid ? (
            <>
              Ngày <DayLink d={firstAvoid} /> là ngày cần tránh nổi bật đầu tiên trong danh sách của tháng, nên tránh khởi sự
              việc lớn.
            </>
          ) : (
            "Tháng này không có ngày hắc đạo."
          ),
        },
        {
          q: `Tháng ${month} năm ${year} có những ngày mùng một, rằm nào?`,
          a:
            mungMotOrRamDays.length > 0
              ? mungMotOrRamDays.map((d, i) => (
                  <span key={dayLabel(d)}>
                    {i > 0 && ", "}
                    <DayLink d={d} />
                  </span>
                ))
              : "Không có ngày mùng một hoặc rằm nào rơi vào tháng dương lịch này.",
        },
      ]}
    />
  );
}
