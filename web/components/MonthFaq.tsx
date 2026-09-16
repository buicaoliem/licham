import Link from "next/link";
import { dateToSlug } from "@/lib/date-slug";
import { pad2 } from "@/lib/format";
import type { MonthDayRef, MonthSummary } from "@/lib/month-summary";

function dayLabel(d: MonthDayRef): string {
  return `${pad2(d.day)}/${pad2(d.month)}`;
}

function DayLink({ d }: { d: MonthDayRef }) {
  return <Link href={`/ngay/${dateToSlug(d)}`}>{dayLabel(d)}</Link>;
}

export function MonthFaq({ month, year, summary }: { month: number; year: number; summary: MonthSummary }) {
  const { totalDays, goodDaysCount, avoidDaysCount, mungMotOrRamDays, firstGoodDay, firstAvoidDay } = summary;
  const firstGood = firstGoodDay;
  const firstAvoid = firstAvoidDay;

  return (
    <div style={{ marginTop: 16 }}>
      <h2 className="hh">Câu hỏi thường gặp</h2>
      <div className="box faqs">
        <div className="faq">
          <b>Tháng {month} năm {year} có bao nhiêu ngày hoàng đạo?</b>
          <p>
            Tháng {month} có {totalDays} ngày, trong đó {goodDaysCount} ngày là hoàng đạo và {avoidDaysCount} ngày là
            hắc đạo.
          </p>
        </div>
        <div className="faq">
          <b>Ngày tốt đầu tiên trong tháng {month} là ngày nào?</b>
          <p>
            {firstGood ? (
              <>
                Ngày <DayLink d={firstGood} /> là ngày hoàng đạo đầu tiên trong tháng.
              </>
            ) : (
              "Tháng này không có ngày hoàng đạo."
            )}
          </p>
        </div>
        <div className="faq">
          <b>Ngày cần tránh đầu tiên trong tháng {month} là ngày nào?</b>
          <p>
            {firstAvoid ? (
              <>
                Ngày <DayLink d={firstAvoid} /> là ngày hắc đạo đầu tiên trong tháng, nên tránh khởi sự việc lớn.
              </>
            ) : (
              "Tháng này không có ngày hắc đạo."
            )}
          </p>
        </div>
        <div className="faq">
          <b>Tháng {month} năm {year} có những ngày mùng một, rằm nào?</b>
          <p>
            {mungMotOrRamDays.length > 0 ? (
              mungMotOrRamDays.map((d, i) => (
                <span key={dayLabel(d)}>
                  {i > 0 && ", "}
                  <DayLink d={d} />
                </span>
              ))
            ) : (
              "Không có ngày mùng một hoặc rằm nào rơi vào tháng dương lịch này."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
