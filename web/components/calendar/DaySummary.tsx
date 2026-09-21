import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

export function GoodBadSummary({ day }: { day: CalendarDay }) {
  const rows: [string, string][] = [
    ["Loại ngày", `${day.isHoangDaoDay ? "Hoàng đạo" : "Hắc đạo"} (${day.dayStarName}) theo quan niệm truyền thống`],
    ["Trực", day.truc.name],
    ["Ngũ hành", day.dayElement],
    ["Nạp âm", day.dayNapAm],
    ["Tuổi xung", day.conflictAges.join(", ")],
  ];
  if (day.joyDirection) rows.push(["Hướng Hỷ thần", `Hướng ${day.joyDirection}`]);
  if (day.wealthDirection) rows.push(["Hướng Tài thần", `Hướng ${day.wealthDirection}`]);
  return (
    <Box title="Tóm tắt ngày">
      {rows.map(([k, v]) => (
        <div className="row" key={k}>
          <span>{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </Box>
  );
}
