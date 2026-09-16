import Link from "next/link";
import { dateToSlug } from "@/lib/date-slug";
import { pad2 } from "@/lib/format";
import type { MonthDayRef, MonthSummary } from "@/lib/month-summary";

function DayRow({ d }: { d: MonthDayRef }) {
  return (
    <Link href={`/ngay/${dateToSlug(d)}`} className="row">
      <span>
        {pad2(d.day)}/{pad2(d.month)}
      </span>
      <span>
        Âm {d.lunarDay}/{d.lunarMonth}
      </span>
    </Link>
  );
}

export function MonthSummaryCards({ month, year, summary }: { month: number; year: number; summary: MonthSummary }) {
  const { totalDays, goodDays, avoidDays, mungMotOrRamDays } = summary;

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
          <span>{goodDays.length} ngày</span>
        </div>
        <div className="row">
          <span>Ngày hắc đạo</span>
          <span>{avoidDays.length} ngày</span>
        </div>
        <div className="row">
          <span>Mùng một · rằm</span>
          <span>{mungMotOrRamDays.length} ngày</span>
        </div>
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Ngày tốt</span>
          <span className="rule" />
        </div>
        <div style={{ maxHeight: 220, overflowY: "auto" }}>
          {goodDays.map((d) => (
            <DayRow key={`${d.day}-${d.month}`} d={d} />
          ))}
        </div>
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Ngày cần tránh</span>
          <span className="rule" />
        </div>
        <div style={{ maxHeight: 220, overflowY: "auto" }}>
          {avoidDays.map((d) => (
            <DayRow key={`${d.day}-${d.month}`} d={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
