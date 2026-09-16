import Link from "next/link";
import { WEEKDAY_FULL_MON_FIRST } from "@/lib/format";
import type { MonthCell } from "@/lib/month-grid";

interface MonthGridProps {
  month: number;
  year: number;
  cells: MonthCell[];
  /** When given, current-month cells link to their day page (used on /lich-thang-* pages). */
  hrefForCell?: (cell: MonthCell) => string;
  /** Set false when the page already has its own "Lịch tháng …" heading (e.g. the dedicated month page). */
  showHeading?: boolean;
}

export function MonthGrid({ month, year, cells, hrefForCell, showHeading = true }: MonthGridProps) {
  return (
    <>
      {showHeading && (
        <h2 className="hh" style={{ marginTop: 30 }}>
          Lịch tháng {month} năm {year}
        </h2>
      )}
      <div className="mgwrap">
        <div className="mg">
          {WEEKDAY_FULL_MON_FIRST.map((w) => (
            <div key={w} className="dw">
              {w}
            </div>
          ))}
          {cells.map((cell, i) => {
            const className = [
              "cl",
              !cell.isCurrentMonth ? "dim" : "",
              cell.isToday ? "today" : "",
              cell.isMungMotOrRam ? "mark" : "",
              cell.isHoangDao ? "good" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const content = (
              <>
                <div className="d">{cell.solarDay}</div>
                <div className="l">
                  {cell.lunarDay}/{cell.lunarMonth}
                </div>
              </>
            );
            if (hrefForCell && cell.isCurrentMonth) {
              return (
                <Link key={i} href={hrefForCell(cell)} className={className}>
                  {content}
                </Link>
              );
            }
            return (
              <div key={i} className={className}>
                {content}
              </div>
            );
          })}
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
