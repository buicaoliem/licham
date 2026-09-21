import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

function range(h: { start: string; end: string }): string {
  return `${h.start}–${h.end}`;
}

export function ZodiacHours({ day }: { day: CalendarDay }) {
  return (
    <Box title="Giờ hoàng đạo, giờ hắc đạo">
      <h3 className="sub-h">Giờ hoàng đạo</h3>
      <div className="hours">
        {day.zodiacHourGood.map((h) => (
          <div key={h.chiIndex} className="hc">
            <b>{h.chiName}</b>
            <i>{range(h)}</i>
          </div>
        ))}
      </div>
      <h3 className="sub-h">Giờ hắc đạo</h3>
      <div className="hours">
        {day.zodiacHourBad.map((h) => (
          <div key={h.chiIndex} className="hc bad">
            <b>{h.chiName}</b>
            <i>{range(h)}</i>
          </div>
        ))}
      </div>
    </Box>
  );
}
