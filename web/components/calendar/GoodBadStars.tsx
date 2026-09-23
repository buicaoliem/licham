import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { LcCard } from "@/components/lich/LichParts";

/** Sao tốt, sao xấu kèm mô tả đầy đủ. */
export function GoodBadStars({ day }: { day: CalendarDay }) {
  if (day.goodStars.length === 0 && day.badStars.length === 0) return null;
  return (
    <LcCard
      icon="sun"
      tone="gold"
      title="Sao tốt, sao xấu"
      sub={`${day.goodStars.length} sao tốt · ${day.badStars.length} sao xấu`}
      id="ld-sao-h"
      className="ld-o-sao"
    >
      <div className="ld-stars">
        {day.goodStars.length > 0 && (
          <div className="col good">
            <h3>Sao tốt</h3>
            <ul>
              {day.goodStars.map((s) => (
                <li key={s.name}>
                  <b>{s.name}</b>
                  <p>{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {day.badStars.length > 0 && (
          <div className="col bad">
            <h3>Sao xấu</h3>
            <ul>
              {day.badStars.map((s) => (
                <li key={s.name}>
                  <b>{s.name}</b>
                  <p>{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </LcCard>
  );
}
