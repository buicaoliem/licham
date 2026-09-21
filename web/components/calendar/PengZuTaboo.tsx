import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { Box } from "./Box";

export function PengZuTaboo({ day }: { day: CalendarDay }) {
  return (
    <Box title="Bành Tổ Bách Kỵ">
      {day.pengZuTaboo.map((e) => (
        <div className="row" key={e.kind}>
          <span>{e.label}</span>
          <span style={{ textAlign: "right" }}>{e.text}</span>
        </div>
      ))}
      <p className="src-note">Đây là quan niệm dân gian truyền lại, không phải kết luận khoa học.</p>
    </Box>
  );
}
