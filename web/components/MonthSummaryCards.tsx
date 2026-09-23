import Link from "next/link";
import { LcCard, LcDate } from "@/components/lich/LichParts";
import { Icon } from "@/components/heritage/Icon";
import { dayHref } from "@/lib/calendar/urls";
import type { MonthDayRef, MonthSummary } from "@/lib/month-summary";

function DayRow({ d, tone }: { d: MonthDayRef; tone: "jade" | "son" }) {
  return (
    <li>
      <Link href={dayHref(d)} className="lc-row">
        <LcDate day={d.day} sub={`${d.lunarDay}/${d.lunarMonth} ÂL`} tone={tone} />
        <span className="b">
          <b>
            Ngày {String(d.day).padStart(2, "0")}/{String(d.month).padStart(2, "0")}
          </b>
          {d.topStars.length > 0 && <small>{d.topStars.join(", ")}</small>}
        </span>
        <Icon name="chevron" size={16} className="arr" />
      </Link>
    </li>
  );
}

/** Tổng quan tháng, ngày tốt, ngày cần tránh — số liệu lấy nguyên từ getMonthSummary. */
export function MonthSummaryCards({ month, summary }: { month: number; year: number; summary: MonthSummary }) {
  const { totalDays, goodDaysCount, avoidDaysCount, goodDays, avoidDays, mungMotOrRamDays } = summary;

  return (
    <div className="lc-sum">
      <LcCard icon="calendar" title={`Tổng quan tháng ${month}`} id="lc-sum-h" className="lc-sum-total">
        <dl className="lc-stats">
          <div>
            <dt>Số ngày</dt>
            <dd>{totalDays}</dd>
          </div>
          <div className="g">
            <dt>Ngày hoàng đạo</dt>
            <dd>{goodDaysCount}</dd>
          </div>
          <div className="x">
            <dt>Ngày hắc đạo</dt>
            <dd>{avoidDaysCount}</dd>
          </div>
          <div className="k">
            <dt>Mùng một · rằm</dt>
            <dd>{mungMotOrRamDays.length}</dd>
          </div>
        </dl>
      </LcCard>

      <LcCard icon="clover" tone="jade" title="Ngày tốt trong tháng" sub="Ngày hoàng đạo có sao tốt trội hơn sao xấu nhiều nhất" id="lc-good-h">
        <ul className="lc-rows">
          {goodDays.map((d) => (
            <DayRow key={`${d.day}-${d.month}`} d={d} tone="jade" />
          ))}
        </ul>
      </LcCard>

      <LcCard icon="bolt" title="Ngày cần tránh trong tháng" sub="Ngày hắc đạo có sao xấu trội hơn sao tốt nhiều nhất" id="lc-bad-h">
        <ul className="lc-rows">
          {avoidDays.map((d) => (
            <DayRow key={`${d.day}-${d.month}`} d={d} tone="son" />
          ))}
        </ul>
      </LcCard>
    </div>
  );
}
