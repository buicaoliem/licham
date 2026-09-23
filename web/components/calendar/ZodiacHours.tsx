import type { CalendarDay, ZodiacHour } from "@/lib/calendar/calendar-day";
import { LcCard } from "@/components/lich/LichParts";

function Hours({ list, tone }: { list: ZodiacHour[]; tone: "good" | "bad" }) {
  return (
    <ul className={`ld-hours ${tone}`}>
      {list.map((h) => (
        <li key={h.chiIndex}>
          <b>{h.chiName}</b>
          <span>
            {h.start} – {h.end}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Giờ hoàng đạo và giờ hắc đạo — hai thẻ riêng, đủ 12 giờ như bản trước. */
export function ZodiacHours({ day }: { day: CalendarDay }) {
  return (
    <>
      <LcCard
        icon="clock"
        tone="jade"
        title="Giờ hoàng đạo"
        sub="Khung giờ tốt trong ngày theo lịch truyền thống"
        id="ld-ghd-h"
        className="ld-hours-card ld-o-ghd"
      >
        <Hours list={day.zodiacHourGood} tone="good" />
      </LcCard>
      <LcCard
        icon="clock"
        title="Giờ hắc đạo"
        sub="Khung giờ xấu, nên tránh khởi sự việc quan trọng"
        id="ld-ghk-h"
        className="ld-hours-card ld-o-ghk"
      >
        <Hours list={day.zodiacHourBad} tone="bad" />
      </LcCard>
    </>
  );
}
