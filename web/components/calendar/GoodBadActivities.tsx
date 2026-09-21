import Link from "next/link";
import type { CalendarActivity, CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

function List({ items, tone }: { items: CalendarActivity[]; tone: "g" | "x" }) {
  return (
    <>
      {items.map((a) => (
        <div key={a.label} className={`star ${tone}`}>
          <b>{a.toolSlug ? <Link href={`/xem-ngay-tot/${a.toolSlug}/`}>{a.label}</Link> : a.label}</b>
          <p>{a.reason}</p>
        </div>
      ))}
    </>
  );
}

export function GoodBadActivities({ day }: { day: CalendarDay }) {
  if (day.goodActivities.length === 0 && day.badActivities.length === 0) return null;
  return (
    <Box title="Việc nên làm, không nên làm">
      {day.goodActivities.length > 0 && (
        <>
          <h3 className="sub-h">Việc nên làm</h3>
          <List items={day.goodActivities} tone="g" />
        </>
      )}
      {day.badActivities.length > 0 && (
        <>
          <h3 className="sub-h">Việc nên tránh</h3>
          <List items={day.badActivities} tone="x" />
        </>
      )}
      <p className="src-note">Tổng hợp từ mô tả các sao trong ngày, mang tính tham khảo.</p>
    </Box>
  );
}
