import Link from "next/link";
import type { SolarDate } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { getCalendarDay } from "@/lib/calendar/calendar-day";
import { faqJsonLd } from "@/lib/calendar/jsonld";
import { getRelatedLinksForDay } from "@/lib/calendar/related";
import { dayHref, monthHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import { Breadcrumb } from "./Breadcrumb";
import { JsonLd } from "./JsonLd";
import { RelatedLinks } from "./RelatedLinks";
import { SourceNote } from "./SourceNote";

export type LandingKind = "hom-nay" | "ngay-mai";

/** Trang đích có ý định riêng ("lịch âm hôm nay / ngày mai"): tóm tắt ngày rồi dẫn sang trang ngày chuẩn. */
export function DayLanding({ kind, date }: { kind: LandingKind; date: SolarDate }) {
  const day = getCalendarDay(date);
  const l = day.lunarDate;
  const label = `${pad2(date.day)}/${pad2(date.month)}/${date.year}`;
  const word = kind === "hom-nay" ? "hôm nay" : "ngày mai";
  const cap = kind === "hom-nay" ? "Hôm nay" : "Ngày mai";
  const other = kind === "hom-nay" ? { href: "/ngay-mai/", label: "Xem lịch ngày mai" } : { href: "/hom-nay/", label: "Xem lịch hôm nay" };
  const hours = day.zodiacHourGood.map((h) => `giờ ${h.chiName} (${h.start}–${h.end})`);

  const faqs = [
    { q: `Lịch âm ${word} là ngày bao nhiêu?`, a: `${cap} là ${day.weekday.name}, ngày ${label} dương lịch, tức ngày ${l.day} tháng ${day.lunarMonthName} năm ${day.lunarYearName} âm lịch.` },
    { q: `${cap} là ngày hoàng đạo hay hắc đạo?`, a: `${cap} là ngày ${day.isHoangDaoDay ? "hoàng đạo" : "hắc đạo"}, trực ${day.truc.name}, theo quan niệm lịch truyền thống.` },
  ];

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu={kind === "hom-nay" ? "Hôm nay" : undefined} />
        <div className="dhead">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: `Lịch âm ${word}` }]} />
          <h1 className="dh1">Lịch âm {word}: {day.weekday.name}, {label}</h1>
          <p className="dsub">
            Ngày {l.day} tháng {day.lunarMonthName} năm {day.lunarYearName} âm lịch · ngày {day.canChiDay.name}
            <br />
            Tiết khí: {day.solarTerm.name} · trực {day.truc.name}
          </p>
          <div className="pills">
            <span className={day.isHoangDaoDay ? "pill k" : "pill r"}>{day.isHoangDaoDay ? "Ngày hoàng đạo" : "Ngày hắc đạo"}</span>
          </div>
        </div>
        <div className="body">
          <div className="box" style={{ marginTop: 0 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Giờ hoàng đạo</span>
              <span className="rule" />
            </div>
            <p>{hours.length > 0 ? `${hours.join(", ")}.` : "Không có dữ liệu giờ hoàng đạo."}</p>
          </div>

          <p style={{ textAlign: "center", marginTop: 22 }}>
            <Link className="chip hot" href={dayHref(date)}>
              Xem chi tiết ngày {label}: sao tốt xấu, việc nên làm, nhị thập bát tú
            </Link>
          </p>
          <div className="chips" style={{ justifyContent: "center" }}>
            <Link className="chip" href={other.href}>
              {other.label}
            </Link>
            <Link className="chip" href={monthHref(date.month, date.year)}>
              Lịch tháng {date.month}/{date.year}
            </Link>
          </div>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Câu hỏi thường gặp
          </h2>
          <div className="box faqs">
            {faqs.map((f) => (
              <div className="faq" key={f.q}>
                <h3 style={{ fontSize: "inherit", margin: 0 }}>
                  <b>{f.q}</b>
                </h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <JsonLd data={faqJsonLd(faqs)} />

          <RelatedLinks links={getRelatedLinksForDay(date, day)} />
          <SourceNote day={day} />
          <TraditionalDisclaimer compact />
        </div>
        <Footer />
      </div>
    </div>
  );
}
