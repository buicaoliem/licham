import { WEEKDAY_FULL_MON_FIRST } from "@/lib/format";
import type { MonthCell } from "@/lib/month-grid";

export function MonthGrid({ month, year, cells }: { month: number; year: number; cells: MonthCell[] }) {
  return (
    <>
      <h2 className="hh" style={{ marginTop: 30 }}>
        Lịch tháng {month} năm {year}
      </h2>
      <div className="mgwrap">
        <div className="mg">
          {WEEKDAY_FULL_MON_FIRST.map((w) => (
            <div key={w} className="dw">
              {w}
            </div>
          ))}
          {cells.map((cell, i) => (
            <div
              key={i}
              className={[
                "cl",
                !cell.isCurrentMonth ? "dim" : "",
                cell.isToday ? "today" : "",
                cell.isMungMotOrRam ? "mark" : "",
                cell.isHoangDao ? "good" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="d">{cell.solarDay}</div>
              <div className="l">
                {cell.lunarDay}/{cell.lunarMonth}
              </div>
            </div>
          ))}
        </div>
        <div className="lg">
          <span>
            <span className="dot" style={{ background: "var(--son)" }} />
            Hôm nay
          </span>
          <span>
            <span className="dot" style={{ background: "var(--luc)" }} />
            Ngày hoàng đạo
          </span>
          <span>
            <span className="dot" style={{ background: "var(--kim)" }} />
            Mùng một · rằm
          </span>
        </div>
      </div>
    </>
  );
}
