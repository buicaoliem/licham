import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

export function TwentyEightMansion({ day }: { day: CalendarDay }) {
  const s = day.twentyEightMansion;
  if (!s) return null;
  return (
    <Box title="Nhị thập bát tú">
      <div className="row">
        <span>Sao</span>
        <span style={{ color: s.isGood ? "var(--luc)" : "var(--son)" }}>
          {s.name} — {s.isGood ? "tốt" : "xấu"}
        </span>
      </div>
      {day.khongMinh && (
        <div className="row">
          <span>Khổng Minh lục diệu</span>
          <span style={{ color: day.khongMinh.isGood ? "var(--luc)" : "var(--son)" }}>
            {day.khongMinh.name} — {day.khongMinh.isGood ? "tốt" : "xấu"}
          </span>
        </div>
      )}
    </Box>
  );
}
