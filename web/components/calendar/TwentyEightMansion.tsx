import type { ReactNode } from "react";
import type { RatedEntry } from "@licham/core";
import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { LcCard, LcKv } from "@/components/lich/LichParts";

function Rated({ e }: { e: RatedEntry }) {
  return (
    <span className={e.isGood ? "lc-good" : "lc-bad"}>
      {e.name} — {e.isGood ? "tốt" : "xấu"}
    </span>
  );
}

export function TwentyEightMansion({ day }: { day: CalendarDay }) {
  const s = day.twentyEightMansion;
  if (!s) return null;
  const rows: [ReactNode, ReactNode][] = [["Sao", <Rated key="s" e={s} />]];
  if (day.khongMinh) rows.push(["Khổng Minh lục diệu", <Rated key="k" e={day.khongMinh} />]);
  return (
    <LcCard icon="book" tone="gold" title="Nhị thập bát tú" id="ld-ntbt-h">
      <LcKv rows={rows} />
    </LcCard>
  );
}
