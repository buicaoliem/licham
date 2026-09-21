import Link from "next/link";
import type { SolarDate } from "@licham/core";
import { dayHref, monthHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";

const label = (d: SolarDate) => `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;

export function DayNavigation({ date, prev, next }: { date: SolarDate; prev: SolarDate | null; next: SolarDate | null }) {
  return (
    <nav className="pn" aria-label="Điều hướng ngày">
      {prev ? <Link href={dayHref(prev)}>← Ngày hôm trước ({label(prev)})</Link> : <span />}
      <Link href={monthHref(date.month, date.year)}>
        Xem tháng {date.month}/{date.year}
      </Link>
      {next ? <Link href={dayHref(next)}>Ngày hôm sau ({label(next)}) →</Link> : <span />}
    </nav>
  );
}
