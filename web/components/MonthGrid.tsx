import { WEEKDAY_SHORT_MON_FIRST } from "@/lib/format";

export interface MonthDayCell {
  solarDay: number;
  lunarDay: number;
  isToday: boolean;
  isMungMotOrRam: boolean;
  isHoangDao: boolean;
}

export function MonthGrid({ month, year, cells }: { month: number; year: number; cells: MonthDayCell[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h3 className="text-center text-base font-semibold text-ink">
        Tháng {month} năm {year}
      </h3>

      <div className="mx-auto mt-4 max-w-[720px] rounded-[14px] border border-line p-4 sm:p-5">
        <div className="grid grid-cols-7 border-b border-line pb-2 text-center text-xs font-semibold text-ink-3">
          {WEEKDAY_SHORT_MON_FIRST.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 pt-1">
          {cells.map((cell, i) =>
            cell.solarDay === 0 ? (
              <div key={i} className="min-h-[50px]" />
            ) : (
              <div
                key={i}
                className={[
                  "flex min-h-[50px] flex-col items-center justify-center rounded-lg",
                  cell.isToday ? "bg-son text-white" : cell.isHoangDao ? "bg-luc-soft text-ink" : "text-ink",
                ].join(" ")}
              >
                <span className="text-[15px] leading-tight font-medium">{cell.solarDay}</span>
                <span
                  className="text-[10.5px] leading-tight"
                  style={{
                    color: cell.isToday ? "#ffffff" : cell.isMungMotOrRam ? "var(--son)" : "var(--ink-2)",
                    fontWeight: cell.isMungMotOrRam ? 600 : 400,
                    opacity: cell.isToday ? 0.85 : 0.72,
                  }}
                >
                  {cell.lunarDay}
                </span>
              </div>
            ),
          )}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink-3">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-son" /> Hôm nay
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "var(--son)" }} /> Mùng
            một / Rằm (số ngày âm)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-luc-soft ring-1 ring-luc" /> Ngày hoàng đạo
          </span>
        </div>
      </div>
    </section>
  );
}
