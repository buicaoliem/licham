import Link from "next/link";
import type { MouseEvent } from "react";
import type { LichCell } from "@/lib/calendar/lich-view";
import { WEEKDAY_FULL_MON_FIRST } from "@/lib/format";

const WD_SHORT = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function cellLabel(c: LichCell, isToday: boolean): string {
  const parts = [`Ngày ${c.day}/${c.month}/${c.year}`, `âm lịch ${c.lunarLabel.replace("N", " nhuận")}`, c.canChi];
  if (isToday) parts.unshift("Hôm nay");
  parts.push(c.isHoangDao ? "hoàng đạo" : "hắc đạo");
  if (c.term) parts.push(`tiết ${c.term}`);
  for (const h of c.holidays) parts.push(h.name);
  return parts.join(", ");
}

/**
 * Lưới tháng 7 cột (thứ Hai đầu tuần) dùng chung cho trang lịch tháng và trang chủ. Không có hook nên dùng được
 * ở cả server component lẫn client component; ô trong tháng là liên kết thật tới trang ngày.
 */
export function LichGrid({
  cells,
  todayKey,
  selectedKey,
  onCellClick,
}: {
  cells: LichCell[];
  todayKey: string;
  selectedKey?: string;
  onCellClick?: (e: MouseEvent<HTMLAnchorElement>, key: string) => void;
}) {
  return (
    <div className="lc-grid" role="presentation">
      {WEEKDAY_FULL_MON_FIRST.map((w, i) => (
        <div key={w} className={i === 6 ? "lc-dw sun" : "lc-dw"}>
          <span className="full">{w}</span>
          <span className="short" aria-hidden="true">
            {WD_SHORT[i]}
          </span>
        </div>
      ))}
      {cells.map((c) => {
        const isToday = c.key === todayKey;
        const cls = [
          "lc-cell",
          c.inMonth ? "" : "out",
          c.weekday === 0 ? "sun" : "",
          isToday ? "today" : "",
          c.inMonth && c.key === selectedKey ? "sel" : "",
          c.isHoangDao ? "hd" : "",
          c.holidays.length > 0 ? "le" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const body = (
          <>
            <span className="sd">{c.day}</span>
            <span className="ld">{c.lunarLabel}</span>
            <span className="cc">{c.canChi}</span>
            <span className="mk" aria-hidden="true">
              {c.isHoangDao && <i className="m-hd" />}
              {c.isMungMot && <i className="m-m1" />}
              {c.isRam && <i className="m-ram" />}
              {c.term && <i className="m-tk" />}
              {c.holidays.length > 0 && <i className="m-le" />}
            </span>
            {c.inMonth && (c.holidays[0] || c.term) && (
              <span className="ev" aria-hidden="true">
                {c.holidays[0]?.name ?? `Tiết ${c.term}`}
              </span>
            )}
            {isToday && <span className="tag">Hôm nay</span>}
          </>
        );
        return c.inMonth ? (
          <Link
            key={c.key}
            href={c.href}
            className={cls}
            data-day={c.key}
            aria-label={cellLabel(c, isToday)}
            aria-current={isToday ? "date" : undefined}
            onClick={onCellClick ? (e) => onCellClick(e, c.key) : undefined}
          >
            {body}
          </Link>
        ) : (
          <div key={c.key} className={cls} aria-hidden="true">
            {body}
          </div>
        );
      })}
    </div>
  );
}

/** Chú thích dấu trên lưới; `selected` chỉ hiện ở lưới có chọn ngày. */
export function LichLegend({ selected = false }: { selected?: boolean }) {
  return (
    <ul className="lc-legend" aria-label="Chú thích">
      <li>
        <i className="k-today" />
        Hôm nay
      </li>
      {selected && (
        <li>
          <i className="k-sel" />
          Đang chọn
        </li>
      )}
      <li>
        <i className="m-hd" />
        Hoàng đạo
      </li>
      <li>
        <i className="m-m1" />
        Mùng một
      </li>
      <li>
        <i className="m-ram" />
        Rằm
      </li>
      <li>
        <i className="m-le" />
        Ngày lễ
      </li>
      <li>
        <i className="m-tk" />
        Tiết khí
      </li>
    </ul>
  );
}
