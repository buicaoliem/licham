import type { SolarDate } from "@licham/core";
import { LcPager } from "@/components/lich/LichParts";
import { dayHref, monthHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";

const label = (d: SolarDate) => `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;

export function DayNavigation({ date, prev, next }: { date: SolarDate; prev: SolarDate | null; next: SolarDate | null }) {
  return (
    <LcPager
      label="Điều hướng ngày"
      prev={prev ? { href: dayHref(prev), text: label(prev), sub: "Ngày hôm trước" } : null}
      mid={{ href: monthHref(date.month, date.year), text: `Xem tháng ${date.month}/${date.year}` }}
      next={next ? { href: dayHref(next), text: label(next), sub: "Ngày hôm sau" } : null}
    />
  );
}
