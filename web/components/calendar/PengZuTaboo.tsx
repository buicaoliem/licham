import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { LcCard, LcKv } from "@/components/lich/LichParts";

export function PengZuTaboo({ day }: { day: CalendarDay }) {
  return (
    <LcCard icon="scroll" tone="gold" title="Bành Tổ Bách Kỵ" id="ld-bt-h">
      <LcKv rows={day.pengZuTaboo.map((e) => [e.label, e.text])} className="wide" />
      <p className="lc-note">Đây là quan niệm dân gian truyền lại, không phải kết luận khoa học.</p>
    </LcCard>
  );
}
