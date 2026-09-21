import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

export function GoodBadStars({ day }: { day: CalendarDay }) {
  if (day.goodStars.length === 0 && day.badStars.length === 0) return null;
  return (
    <Box title="Sao tốt, sao xấu">
      {day.goodStars.length > 0 && <h3 className="sub-h">Sao tốt</h3>}
      {day.goodStars.map((s) => (
        <div key={s.name} className="star g">
          <b>{s.name}</b>
          <p>{s.description}</p>
        </div>
      ))}
      {day.badStars.length > 0 && <h3 className="sub-h">Sao xấu</h3>}
      {day.badStars.map((s) => (
        <div key={s.name} className="star x">
          <b>{s.name}</b>
          <p>{s.description}</p>
        </div>
      ))}
    </Box>
  );
}
