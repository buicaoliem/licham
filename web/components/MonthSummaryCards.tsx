import Link from "next/link";
import { dayHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import type { MonthDayRef, MonthSummary } from "@/lib/month-summary";

function DayRow({ d }: { d: MonthDayRef }) {
  return (
    <Link href={dayHref(d)} className="row daylink">
      <span>
        {pad2(d.day)}/{pad2(d.month)} · Âm {d.lunarDay}/{d.lunarMonth}
      </span>
      {d.topStars.length > 0 && <span>{d.topStars.join(", ")}</span>}
    </Link>
  );
}

export function MonthSummaryCards({ month, summary }: { month: number; year: number; summary: MonthSummary }) {
  const { totalDays, goodDaysCount, avoidDaysCount, goodDays, avoidDays, mungMotOrRamDays } = summary;

  return (
    <div className="cols3">
      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Tổng quan tháng {month}</span>
          <span className="rule" />
        </div>
        <div className="row">
          <span>Số ngày</span>
          <span>{totalDays} ngày</span>
        </div>
        <div className="row">
          <span>Ngày hoàng đạo</span>
          <span>{goodDaysCount} ngày</span>
        </div>
        <div className="row">
          <span>Ngày hắc đạo</span>
          <span>{avoidDaysCount} ngày</span>
        </div>
        <div className="row">
          <span>Mùng một · rằm</span>
          <span>{mungMotOrRamDays.length} ngày</span>
        </div>
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Ngày tốt trong tháng</span>
          <span className="rule" />
        </div>
        {goodDays.map((d) => (
          <DayRow key={`${d.day}-${d.month}`} d={d} />
        ))}
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Ngày cần tránh trong tháng</span>
          <span className="rule" />
        </div>
        {avoidDays.map((d) => (
          <DayRow key={`${d.day}-${d.month}`} d={d} />
        ))}
      </div>
    </div>
  );
}
