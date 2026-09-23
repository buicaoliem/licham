import Link from "next/link";
import type { SolarDate } from "@licham/core";
import { Icon } from "@/components/heritage/Icon";
import { DayFreshness } from "@/components/lich/DayFreshness";
import { DayTemplate } from "@/components/lich/DayTemplate";
import { getCalendarDay } from "@/lib/calendar/calendar-day";
import { dateKey } from "@/lib/calendar/lich-view";
import { dayHref, monthHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";

export type LandingKind = "hom-nay" | "ngay-mai";

/**
 * Trang đích có ý định riêng ("lịch âm hôm nay / ngày mai"): dùng chung template chi tiết ngày, giữ tiêu đề,
 * breadcrumb, câu hỏi thường gặp của riêng trang và dẫn sang trang ngày chuẩn.
 */
export function DayLanding({ kind, date }: { kind: LandingKind; date: SolarDate }) {
  const day = getCalendarDay(date);
  const l = day.lunarDate;
  const label = `${pad2(date.day)}/${pad2(date.month)}/${date.year}`;
  const word = kind === "hom-nay" ? "hôm nay" : "ngày mai";
  const cap = kind === "hom-nay" ? "Hôm nay" : "Ngày mai";
  const other = kind === "hom-nay" ? { href: "/ngay-mai/", label: "Xem lịch ngày mai" } : { href: "/hom-nay/", label: "Xem lịch hôm nay" };

  const faqs = [
    { q: `Lịch âm ${word} là ngày bao nhiêu?`, a: `${cap} là ${day.weekday.name}, ngày ${label} dương lịch, tức ngày ${l.day} tháng ${day.lunarMonthName} năm ${day.lunarYearName} âm lịch.` },
    { q: `${cap} là ngày hoàng đạo hay hắc đạo?`, a: `${cap} là ngày ${day.isHoangDaoDay ? "hoàng đạo" : "hắc đạo"}, trực ${day.truc.name}, theo quan niệm lịch truyền thống.` },
  ];

  return (
    <DayTemplate
      date={date}
      day={day}
      activeMenu="Hôm nay"
      crumbs={[{ label: "Trang chủ", href: "/" }, { label: `Lịch âm ${word}` }]}
      title={
        <>
          Lịch âm {word}: {day.weekday.name}, {label}
        </>
      }
      faqs={faqs}
      heroExtra={
        <>
          <DayFreshness kind={kind} renderedKey={dateKey(date)} />
          <ul className="ld-landing-links">
            <li>
              <Link className="hot" href={dayHref(date)}>
                <Icon name="calendar" size={15} />
                Trang ngày {label}
              </Link>
            </li>
            <li>
              <Link href={other.href}>{other.label}</Link>
            </li>
            <li>
              <Link href={monthHref(date.month, date.year)}>
                Lịch tháng {date.month}/{date.year}
              </Link>
            </li>
          </ul>
        </>
      }
    >
      <p className="ld-landing-cta">
        <Link className="btn pri" href={dayHref(date)}>
          Trang cố định của ngày {label} để lưu hoặc chia sẻ
          <Icon name="arrow" size={16} />
        </Link>
      </p>
    </DayTemplate>
  );
}
