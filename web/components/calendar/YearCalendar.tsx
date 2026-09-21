import Link from "next/link";
import { monthHref } from "@/lib/calendar/urls";
import { MONTH_WORD } from "@/lib/format";

export function YearCalendar({ year, canChi }: { year: number; canChi: string }) {
  return (
    <div className="cols2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
      {Array.from({ length: 12 }, (_, i) => (
        <Link key={i} className="box" href={monthHref(i + 1, year)} style={{ textAlign: "center" }}>
          <b>Tháng {MONTH_WORD[i]}</b>
          <div style={{ color: "var(--ink-3)", fontSize: 13 }}>
            {i + 1}/{year} · năm {canChi}
          </div>
        </Link>
      ))}
    </div>
  );
}
