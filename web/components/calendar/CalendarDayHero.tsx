import Link from "next/link";
import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { ShareButton } from "@/components/ShareButton";
import { dayHref, monthHref, yearHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import { buildShareUrl } from "@/lib/share";
import { Breadcrumb } from "./Breadcrumb";

export function CalendarDayHero({ day }: { day: CalendarDay }) {
  const { day: d, month: m, year: y } = day.solarDate;
  const l = day.lunarDate;
  return (
    <div className="dhead">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Lịch âm", href: yearHref(y) },
          { label: `Tháng ${m} năm ${y}`, href: monthHref(m, y) },
          { label: `${pad2(d)}/${pad2(m)}/${y}` },
        ]}
      />
      <h1 className="dh1">Lịch âm ngày {d} tháng {m} năm {y}</h1>
      <p className="dsub">
        {day.weekday.name}, ngày {d} tháng {m} năm {y} dương lịch
        <br />
        Ngày {l.day} tháng {day.lunarMonthName} năm {day.lunarYearName} âm lịch · ngày {day.canChiDay.name}
        <br />
        Tiết khí: {day.solarTerm.name}
        {day.solarTerm.startsToday ? " (bắt đầu từ hôm nay)" : ""}
      </p>
      <div className="pills">
        <span className={day.isHoangDaoDay ? "pill k" : "pill r"}>{day.isHoangDaoDay ? "Ngày hoàng đạo" : "Ngày hắc đạo"}</span>
        <span className="pill k">Trực {day.truc.name}</span>
        <span className="pill k">Mệnh {day.dayNapAm}</span>
      </div>
      <div className="share-row">
        <ShareButton
          url={buildShareUrl(dayHref(day.solarDate))}
          title={`Lịch âm ngày ${d}/${m}/${y}`}
          text={`Xem lịch âm ngày ${pad2(d)}/${pad2(m)}/${y} – ngày âm, giờ hoàng đạo và thông tin ngày.`}
        />
      </div>
      {day.holidayEvents.length > 0 && (
        <p className="dsub" style={{ marginTop: 10 }}>
          Ngày này là:{" "}
          {day.holidayEvents.map((h, i) => (
            <span key={h.slug}>
              {i > 0 && ", "}
              <Link href={`/le/${h.slug}/`}>{h.name}</Link>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
