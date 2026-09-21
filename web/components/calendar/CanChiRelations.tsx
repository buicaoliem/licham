import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

export function CanChiRelations({ day }: { day: CalendarDay }) {
  const chi = day.canChiDay.chi;
  const hinh =
    day.hinh.length === 0
      ? `Chi ${chi} không nằm trong nhóm hình.`
      : day.hinh[0] === chi
        ? `Chi ${chi} tự hình.`
        : `Chi ${chi} hình với ${day.hinh.join(" và ")}.`;
  const rows: [string, string][] = [
    ["Lục hợp", `Ngày ${day.canChiDay.name} (chi ${chi}) lục hợp với chi ${day.lucHop}.`],
    ["Tam hợp", `Chi ${chi} tam hợp với ${day.tamHop.join(" và ")}.`],
    ["Xung", `Chi ${chi} xung với chi ${day.xung}; tuổi xung ngày: ${day.conflictAges.join(", ")}.`],
    ["Hình", hinh],
    ["Hại", `Chi ${chi} hại với chi ${day.hai}.`],
    ["Phá", `Chi ${chi} phá với chi ${day.pha}.`],
  ];
  return (
    <Box title="Quan hệ can chi">
      {rows.map(([k, v]) => (
        <div className="row" key={k}>
          <span>{k}</span>
          <span style={{ textAlign: "right" }}>{v}</span>
        </div>
      ))}
    </Box>
  );
}
