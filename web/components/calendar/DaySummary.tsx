import Link from "next/link";
import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { LcCard, LcKv } from "@/components/lich/LichParts";
import { termStartLabel } from "./SolarTerm";

/**
 * "Tổng quan ngày": một đoạn mô tả ghép từ dữ liệu ngày (không thêm nhận định), dải sáu ô
 * (can chi ngày/tháng/năm, tiết khí, trực, sao ngày) và bảng tóm tắt đầy đủ như bản trước.
 */
export function GoodBadSummary({ day }: { day: CalendarDay }) {
  const { day: d, month: m, year: y } = day.solarDate;
  const l = day.lunarDate;
  const t = day.solarTerm;
  const rows: [string, string][] = [
    ["Loại ngày", `${day.isHoangDaoDay ? "Hoàng đạo" : "Hắc đạo"} (${day.dayStarName}) theo quan niệm truyền thống`],
    ["Trực", day.truc.name],
    ["Ngũ hành", day.dayElement],
    ["Nạp âm", day.dayNapAm],
    ["Tuổi xung", day.conflictAges.join(", ")],
  ];
  if (day.joyDirection) rows.push(["Hướng Hỷ thần", `Hướng ${day.joyDirection}`]);
  if (day.wealthDirection) rows.push(["Hướng Tài thần", `Hướng ${day.wealthDirection}`]);

  const strip: { k: string; v: string; s: string; tone?: string }[] = [
    { k: "Ngày", v: day.canChiDay.name, s: `hành ${day.canChiDay.napAm.element}` },
    { k: "Tháng", v: day.canChiMonth.name, s: `hành ${day.canChiMonth.napAm.element}` },
    { k: "Năm", v: day.canChiYear.name, s: `hành ${day.canChiYear.napAm.element}` },
    { k: "Tiết khí", v: t.name, s: termStartLabel(t.start, t.startsToday), tone: "ink" },
    { k: "Trực", v: day.truc.name, s: "Thập nhị trực", tone: "ink" },
    { k: "Sao ngày", v: day.dayStarName, s: day.isHoangDaoDay ? "Hoàng đạo" : "Hắc đạo", tone: day.isHoangDaoDay ? "good" : "bad" },
  ];

  return (
    <LcCard icon="scroll" title="Tổng quan ngày" id="ld-tq-h" className="ld-overview">
      <p className="ld-overview-p">
        {day.weekday.name}, ngày {d}/{m}/{y} dương lịch, tức ngày {l.day} tháng {day.lunarMonthName} năm {day.lunarYearName} âm
        lịch. Đây là ngày {day.isHoangDaoDay ? "hoàng đạo" : "hắc đạo"} (sao {day.dayStarName}), trực {day.truc.name}, thuộc tiết{" "}
        {t.name}
        {t.startsToday ? ` (tiết bắt đầu ${termStartLabel(t.start, true)})` : ""}. Ngày {day.canChiDay.name} có nạp âm{" "}
        {day.dayNapAm}, hành {day.dayElement}.
        {day.holidayEvents.length > 0 && (
          <>
            {" "}
            Ngày này trùng với{" "}
            {day.holidayEvents.map((h, i) => (
              <span key={h.slug}>
                {i > 0 && ", "}
                <Link href={`/le/${h.slug}/`}>{h.name}</Link>
              </span>
            ))}
            .
          </>
        )}
      </p>
      <ul className="ld-strip">
        {strip.map((s) => (
          <li key={s.k} className={s.tone}>
            <span className="k">{s.k}</span>
            <b>{s.v}</b>
            <span className="s">({s.s})</span>
          </li>
        ))}
      </ul>
      <h3 className="ld-sub-h">Tóm tắt ngày</h3>
      <LcKv rows={rows} />
    </LcCard>
  );
}
