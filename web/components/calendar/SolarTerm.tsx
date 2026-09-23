import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { LcCard, LcKv } from "@/components/lich/LichParts";

const fmt = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const hm = new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit", hour12: false });
const dm = new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit" });

/** "lúc 15:50" khi tiết bắt đầu trong ngày, ngược lại "từ 07/09". */
export function termStartLabel(start: Date, today: boolean): string {
  return today ? `lúc ${hm.format(start)}` : `từ ${dm.format(start)}`;
}

export function SolarTerm({ day }: { day: CalendarDay }) {
  const t = day.solarTerm;
  return (
    <LcCard icon="sun" tone="jade" title="Tiết khí" id="ld-tk-h">
      <LcKv
        rows={[
          ["Tiết khí hiện tại", t.name],
          ["Bắt đầu", fmt.format(t.start)],
          ["Tiết khí kế tiếp", `${t.next.name} (${fmt.format(t.next.start)})`],
          ["Còn lại", `${t.next.daysUntil} ngày`],
        ]}
      />
    </LcCard>
  );
}
