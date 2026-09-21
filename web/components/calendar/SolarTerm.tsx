import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

const fmt = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function SolarTerm({ day }: { day: CalendarDay }) {
  const t = day.solarTerm;
  return (
    <Box title="Tiết khí">
      <div className="row">
        <span>Tiết khí hiện tại</span>
        <span>{t.name}</span>
      </div>
      <div className="row">
        <span>Bắt đầu</span>
        <span>{fmt.format(t.start)}</span>
      </div>
      <div className="row">
        <span>Tiết khí kế tiếp</span>
        <span>
          {t.next.name} ({fmt.format(t.next.start)})
        </span>
      </div>
      <div className="row">
        <span>Còn lại</span>
        <span>{t.next.daysUntil} ngày</span>
      </div>
    </Box>
  );
}
