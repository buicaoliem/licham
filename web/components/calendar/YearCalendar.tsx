import Link from "next/link";
import type { YearMonth } from "@/lib/calendar/lich-view";
import { monthHref } from "@/lib/calendar/urls";
import { MONTH_WORD } from "@/lib/format";

const WD = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/**
 * 12 tháng của năm dạng lịch nhỏ: tiêu đề tháng dẫn tới trang tháng, mỗi ô ngày dẫn tới trang ngày.
 * Ô "hôm nay" được đặt lại phía trình duyệt bởi <LichTodayMarker /> (trang năm dựng sẵn).
 */
export function YearCalendar({ year, canChi, months }: { year: number; canChi: string; months: YearMonth[] }) {
  return (
    <div className="ly-grid">
      {months.map((m) => (
        <section className="ly-month" key={m.month} id={`thang-${m.month}`} aria-labelledby={`ly-h-${m.month}`}>
          <header className="ly-month-h">
            <h3 id={`ly-h-${m.month}`}>
              <Link href={monthHref(m.month, year)}>Tháng {MONTH_WORD[m.month - 1]}</Link>
            </h3>
            <span>
              {m.month}/{year} · năm {canChi}
            </span>
          </header>
          <div className="ly-days">
            {WD.map((w, i) => (
              <span key={w} className={i === 6 ? "ly-dw sun" : "ly-dw"} aria-hidden="true">
                {w}
              </span>
            ))}
            {m.cells.map((c, i) =>
              c ? (
                <Link
                  key={c.key}
                  href={c.href}
                  data-day={c.key}
                  className={[
                    "ly-cell",
                    c.weekday === 0 ? "sun" : "",
                    c.isToday ? "today" : "",
                    c.isHoangDao ? "hd" : "",
                    c.isMungMot ? "m1" : "",
                    c.isRam ? "ram" : "",
                    c.holidays.length > 0 ? "le" : "",
                    c.term ? "tk" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  title={[`${c.day}/${c.month}/${c.year}`, `âm ${c.lunarLabel.replace("N", " nhuận")}`, ...c.holidays.map((h) => h.name), ...(c.term ? [`Tiết ${c.term}`] : [])].join(" · ")}
                  aria-label={`Ngày ${c.day}/${c.month}/${c.year}, âm lịch ${c.lunarLabel.replace("N", " nhuận")}${c.holidays.length ? `, ${c.holidays.map((h) => h.name).join(", ")}` : ""}${c.term ? `, tiết ${c.term}` : ""}`}
                >
                  <b>{c.day}</b>
                  <small>{c.isMungMot ? c.lunarLabel : c.lunarDay}</small>
                </Link>
              ) : (
                <span key={`e${i}`} className="ly-cell empty" aria-hidden="true" />
              ),
            )}
          </div>
          <footer className="ly-month-f">
            <span>{m.hoangDao} ngày hoàng đạo</span>
            {m.notable > 0 && <span>{m.notable} ngày lễ</span>}
            <Link href={monthHref(m.month, year)}>Xem tháng →</Link>
          </footer>
        </section>
      ))}
    </div>
  );
}
