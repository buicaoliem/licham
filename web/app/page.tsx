import type { Metadata } from "next";
import Link from "next/link";
import { CHI, getDayInfo } from "@licham/core";
import { ChShell } from "@/components/heritage/ChShell";
import { HeritageImage, heritageVisible } from "@/components/heritage/HeritageImage";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { LcCard, LcDate } from "@/components/lich/LichParts";
import { LichGrid, LichLegend } from "@/components/lich/LichGrid";
import { LichTodayMarker } from "@/components/lich/LichTodayMarker";
import { VIEC_ICON } from "@/components/heritage/viecIcon";
import { HERITAGE_SLOTS } from "@/lib/heritage-assets";
import { dateKey, lichCells } from "@/lib/calendar/lich-view";
import { monthHref } from "@/lib/calendar/urls";
import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";
import { getVietnamToday } from "@/lib/today";
import { formatSolarShort, getUpcomingOccasions } from "@/lib/upcoming-occasions";
import { vanKhanBySlug } from "@/lib/van-khan";
import { VIEC_LIST } from "@/lib/xem-ngay-tot";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Lịch âm hôm nay — Lịch vạn niên ${year} | licham.app`,
    description:
      "Lịch âm dương hôm nay, giờ hoàng đạo, ngày tốt xấu, tính tuổi, đếm ngược Tết. Miễn phí, không quảng cáo.",
    alternates: { canonical: "/" },
  };
}

// "Hôm nay" tính theo giờ Việt Nam; trang dựng lại mỗi 5 phút (ISR) để không bị cũ sau ngày build.
export const revalidate = 300;

const VAN_KHAN_SLUGS = ["mung-mot-ngay-ram", "gia-tien-ngay-gio", "than-tai-tho-dia", "ram-thang-tam"] as const;

const TU_VI = [
  { href: "/tu-vi/", label: "Tử vi hôm nay 12 con giáp" },
  { href: "/tinh-tuoi/", label: "Tính tuổi dương và tuổi mụ" },
  { href: "/ten/", label: "Đặt tên con theo chữ Hán" },
  { href: "/phong-thuy/xem-tuoi-xay-nha/", label: "Xem tuổi làm nhà" },
] as const;

const hourLabel = (h: { start: string; end: string }) => `${Number.parseInt(h.start, 10)}h – ${Number.parseInt(h.end, 10)}h`;

export default function HomePage() {
  const today = getVietnamToday();
  const info = getDayInfo(today);
  const l = info.lunar;

  const hoangDaoHours = info.hours.filter((h) => h.isHoangDao).map((h) => ({ chiName: CHI[h.chiIndex]!, start: h.start, end: h.end }));
  const worstHourInfo = info.hours.find((h) => !h.isHoangDao);
  const bestHour = hoangDaoHours[0] ?? null;
  const worstHour = worstHourInfo ? { chiName: CHI[worstHourInfo.chiIndex]!, start: worstHourInfo.start, end: worstHourInfo.end } : null;
  const nguHanh = info.canChi.day.napAm.name
    .split(" ")
    .map((word, i) => (i === 0 ? word : word.toLowerCase()))
    .join(" ");
  const heroArt = heritageVisible(HERITAGE_SLOTS.heroHome.path);
  const cells = lichCells(today.month, today.year, today);

  const shortcuts: { href: string; label: string; icon: IconName; hot?: boolean }[] = [
    { href: "/hom-nay/", label: "Lịch hôm nay", icon: "sun", hot: true },
    { href: "/ngay-mai/", label: "Lịch ngày mai", icon: "calPlus" },
    { href: monthHref(today.month, today.year), label: "Lịch tháng này", icon: "calendar" },
    { href: "/doi-ngay-am-duong/", label: "Đổi âm dương", icon: "swap" },
    { href: "/xem-ngay-tot/", label: "Xem ngày tốt", icon: "clover" },
    { href: "/le/", label: "Ngày lễ sắp tới", icon: "flame" },
    { href: "/cong-cu/", label: "Công cụ ngày tháng", icon: "hourglass" },
    { href: "/kien-thuc/", label: "Kiến thức lịch", icon: "book" },
  ];

  return (
    <ChShell activeMenu="Hôm nay" className="ch-lich ch-home">
      <section className={heroArt ? "hm-hero has-art" : "hm-hero"}>
        {heroArt && (
          <div className="hm-hero-art" aria-hidden="true">
            <HeritageImage src={HERITAGE_SLOTS.heroHome.path} label={HERITAGE_SLOTS.heroHome.spec} eager />
          </div>
        )}
        <div className="ch-wrap hm-hero-in">
          <div className="hm-hero-text">
            <p className="ch-eyebrow">Lịch âm dương · giờ Việt Nam</p>
            <h1 className="ch-h1">Lịch âm hôm nay — Lịch vạn niên {info.solar.year}</h1>
            <p className="ch-lead">
              Xem lịch âm dương, giờ hoàng đạo, ngày tốt xấu. Không quảng cáo, không theo dõi, mở là thấy ngay.
            </p>
          </div>

          <div className="hm-today" aria-label="Hôm nay">
            <div className="ld-leaf hm-leaf">
              <span className="wd">{WEEKDAY_LONG[info.solar.dayOfWeek]}</span>
              <b>{info.solar.day}</b>
              <span className="my">
                Tháng {MONTH_WORD[info.solar.month - 1]} năm {info.solar.year}
              </span>
            </div>
            <div className="hm-today-b">
              <p className="ld-eyebrow">Âm lịch</p>
              <p className="hm-lunar">
                <b>{l.day}</b> tháng {MONTH_WORD[l.month - 1]}
                {l.isLeapMonth ? " nhuận" : ""}
              </p>
              <p className="hm-canchi">
                <span>Ngày {info.canChi.day.name}</span> · <span>Năm {info.canChi.year.name}</span>
              </p>
            </div>
            <div className="hm-today-act">
              <Link className="ch-btn pri hm-today-go" href="/hom-nay/">
                Xem chi tiết hôm nay
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <ul className="hm-marks">
              <li className={info.thanSatNgay.isHoangDao ? "good" : "bad"}>{info.thanSatNgay.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}</li>
              <li>Trực {info.truc.name}</li>
              <li>Tiết {info.solarTerm.name}</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="ch-wrap ch-main lc-main hm-main">
        <nav aria-label="Lối tắt" className="hm-short">
          {shortcuts.map((s) => (
            <Link className={s.hot ? "hm-short-i hot" : "hm-short-i"} href={s.href} key={s.href}>
              <span className="ic" aria-hidden="true">
                <Icon name={s.icon} size={20} />
              </span>
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="hm-duo">
          <LcCard icon="clock" tone="jade" title="Giờ hoàng đạo hôm nay" id="hm-gio-h">
            <ul className="ld-hours good">
              {hoangDaoHours.map((h) => (
                <li key={h.chiName}>
                  <b>{h.chiName}</b>
                  <span>{hourLabel(h)}</span>
                </li>
              ))}
            </ul>
            <dl className="lc-kv hm-kv">
              {bestHour && (
                <div className="kv">
                  <dt>Giờ tốt nhất</dt>
                  <dd>
                    {bestHour.chiName} ({hourLabel(bestHour)})
                  </dd>
                </div>
              )}
              {worstHour && (
                <div className="kv">
                  <dt>Giờ xấu nhất</dt>
                  <dd>
                    {worstHour.chiName} ({hourLabel(worstHour)})
                  </dd>
                </div>
              )}
              {info.khongMinh && (
                <div className="kv">
                  <dt>Khổng Minh lục diệu</dt>
                  <dd>{info.khongMinh.name}</dd>
                </div>
              )}
            </dl>
          </LcCard>

          <LcCard icon="sun" title="Hôm nay" id="hm-nay-h">
            <dl className="lc-kv cap">
              <div className="kv">
                <dt>Can chi ngày</dt>
                <dd>{info.canChi.day.name}</dd>
              </div>
              <div className="kv">
                <dt>Ngũ hành</dt>
                <dd>{nguHanh}</dd>
              </div>
              {info.hyThan && (
                <div className="kv">
                  <dt>Hỷ thần</dt>
                  <dd>Hướng {info.hyThan.direction.toLowerCase()}</dd>
                </div>
              )}
              {info.taiThan && (
                <div className="kv">
                  <dt>Tài thần</dt>
                  <dd>Hướng {info.taiThan.direction.toLowerCase()}</dd>
                </div>
              )}
              <div className="kv">
                <dt>Tuổi xung</dt>
                <dd>
                  {info.tuoiXung.ngay.map((x, i) => (
                    <span key={x.canChi.name} className={x.isThienKhacDiaXung ? "lc-bad" : undefined}>
                      {x.canChi.name}
                      {i < info.tuoiXung.ngay.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </LcCard>
        </div>

        <section className="lc-cal hm-month" aria-labelledby="hm-thang-h">
          <div className="lc-bar">
            <h2 className="lc-bar-t" id="hm-thang-h">
              Lịch tháng {today.month} <span>năm {today.year}</span>
            </h2>
            <Link className="ch-btn" href={monthHref(today.month, today.year)}>
              Xem lịch tháng
              <Icon name="arrow" size={16} />
            </Link>
          </div>
          <LichGrid cells={cells} todayKey={dateKey(today)} />
          <LichLegend />
          <LichTodayMarker scope=".hm-month .lc-grid" />
        </section>

        <section className="hm-viec" aria-labelledby="hm-viec-h">
          <h2 className="ch-h2" id="hm-viec-h">
            Chọn ngày cho việc lớn
          </h2>
          <ul className="hm-viec-list">
            {VIEC_LIST.map((v) => (
              <li key={v.slug}>
                <Link className={v.slug === "cuoi-hoi" || v.slug === "khai-truong" ? "hm-viec-i hot" : "hm-viec-i"} href={`/xem-ngay-tot/${v.slug}/`}>
                  <Icon name={VIEC_ICON[v.slug] ?? "calendar"} size={18} />
                  Xem ngày {v.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="hm-trio">
          <LcCard icon="calendar" title="Ngày quan trọng sắp tới" id="hm-sap-h">
            <ul className="lc-rows">
              {getUpcomingOccasions(today).map((o) => (
                <li key={o.label}>
                  <Link className="lc-row" href={o.href}>
                    <LcDate day={o.solar.day} sub={`${pad2(o.solar.month)}/${o.solar.year}`} />
                    <span className="b">
                      <b>{o.label}</b>
                      <small>{formatSolarShort(o.solar)}</small>
                    </span>
                    <Icon name="chevron" size={16} className="arr" />
                  </Link>
                </li>
              ))}
            </ul>
          </LcCard>

          <LcCard icon="flame" tone="gold" title="Văn khấn hay tra" id="hm-vk-h">
            <ul className="lc-rows">
              {VAN_KHAN_SLUGS.map((slug) => {
                const bai = vanKhanBySlug(slug);
                if (!bai) return null;
                return (
                  <li key={slug}>
                    <Link className="lc-row" href={`/van-khan/${slug}/`}>
                      <span className="b">
                        <b>{bai.ten}</b>
                      </span>
                      <Icon name="chevron" size={16} className="arr" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </LcCard>

          <LcCard icon="yinyang" tone="jade" title="Tử vi" id="hm-tv-h">
            <ul className="lc-rows">
              {TU_VI.map((item) => (
                <li key={item.href}>
                  <Link className="lc-row" href={item.href}>
                    <span className="b">
                      <b>{item.label}</b>
                    </span>
                    <Icon name="chevron" size={16} className="arr" />
                  </Link>
                </li>
              ))}
            </ul>
          </LcCard>
        </div>

        <section className="ch-card hm-doi" aria-labelledby="hm-doi-h">
          <div>
            <h2 className="ch-h2" id="hm-doi-h">
              Đổi ngày âm dương
            </h2>
            <p className="ch-sub">
              Hôm nay: dương lịch {pad2(info.solar.day)}/{pad2(info.solar.month)}/{info.solar.year} — âm lịch {pad2(l.day)}/
              {pad2(l.month)}/{l.year}
              {l.isLeapMonth ? " (tháng nhuận)" : ""}.
            </p>
          </div>
          <Link className="ch-btn pri" href="/doi-ngay-am-duong/">
            <Icon name="swap" size={18} />
            Đổi ngày khác
          </Link>
        </section>
      </div>
    </ChShell>
  );
}
