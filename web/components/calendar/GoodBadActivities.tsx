import Link from "next/link";
import type { CalendarActivity, CalendarDay } from "@/lib/calendar/calendar-day";

function List({ items }: { items: CalendarActivity[] }) {
  return (
    <ul className="ld-viec-list">
      {items.map((a) => (
        <li key={a.label}>
          <span className="ic" aria-hidden="true" />
          <span>
            <b>{a.toolSlug ? <Link href={`/xem-ngay-tot/${a.toolSlug}/`}>{a.label}</Link> : a.label}</b>
            <small>{a.reason}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Việc nên làm / việc nên tránh — tổng hợp từ mô tả sao (viecFaqs), giữ nguyên nhãn và lý do. */
export function GoodBadActivities({ day }: { day: CalendarDay }) {
  if (day.goodActivities.length === 0 && day.badActivities.length === 0) return null;
  return (
    <section className="ld-viec ld-o-viec" aria-labelledby="ld-viec-h">
      <h2 className="le-sr" id="ld-viec-h">
        Việc nên làm, không nên làm
      </h2>
      <div className="ld-viec-grid">
        {day.goodActivities.length > 0 && (
          <div className="ld-viec-card good">
            <h3>
              <span className="badge" aria-hidden="true">
                ✓
              </span>
              Việc nên làm
            </h3>
            <List items={day.goodActivities} />
          </div>
        )}
        {day.badActivities.length > 0 && (
          <div className="ld-viec-card bad">
            <h3>
              <span className="badge" aria-hidden="true">
                ✕
              </span>
              Việc nên tránh
            </h3>
            <List items={day.badActivities} />
          </div>
        )}
      </div>
      <p className="lc-note">Tổng hợp từ mô tả các sao trong ngày, mang tính tham khảo.</p>
    </section>
  );
}
