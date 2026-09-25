import Link from "next/link";
import { JsonLd } from "@/components/calendar/JsonLd";
import { Icon } from "@/components/heritage/Icon";
import { SITE_URL } from "@/lib/site";
import { getVietnamToday } from "@/lib/today";
import { articleJsonLd } from "@/lib/van-hoa/jsonld";
import { CITY_NAMES, type LunarCity } from "@/lib/van-hoa/eclipse-types";
import {
  ECLIPSES,
  ECLIPSE_FOLK,
  ECLIPSE_LIST_PATH,
  ECLIPSE_UPDATED,
  ECLIPSE_YEARS,
  HYBRID_NOTE,
  type Eclipse,
  bestSolarCity,
  daysUntil,
  dmy,
  eclipseNeighbours,
  eclipsePath,
  hhmm,
  hhmmOn,
  isLunar,
  isSolar,
  lunarText,
  safetyTips,
} from "@/lib/van-hoa/eclipses";
import s from "../van-hoa.module.css";
import { ListLd, Page } from "../tpl/Shared";
import { EclipseList, type EclipseCard } from "./EclipseList";
import { EclipseDisc, EclipseThumb, PhaseStrip } from "./EclipseViz";
import v from "./eclipse.module.css";

const LIST_CRUMBS = [
  { label: "Trang chủ", href: "/" },
  { label: "Văn hoá", href: "/van-hoa/" },
  { label: "Nhật thực & nguyệt thực", href: ECLIPSE_LIST_PATH },
];

export function EclipseHub() {
  const today = getVietnamToday();
  const cards: EclipseCard[] = ECLIPSES.map((e) => ({
    slug: e.slug,
    title: e.title,
    year: e.date.year,
    date: e.peak.slice(0, 10),
    dateText: dmy(e.peak),
    lunarText: lunarText(e),
    visibleVn: e.visibleVn,
    days: daysUntil(e, today),
    href: eclipsePath(e),
    thumb: <EclipseThumb e={e} />,
  }));
  const sun = ECLIPSES.find((e) => e.body === "solar" && e.kind === "toan-phan");
  const moon = ECLIPSES.find((e) => e.body === "lunar" && e.kind === "toan-phan");
  return (
    <Page crumbs={[...LIST_CRUMBS.slice(0, 2), { label: "Nhật thực & nguyệt thực" }]}>
      <ListLd
        crumbs={LIST_CRUMBS}
        name="Nhật thực & nguyệt thực"
        description="Lịch nhật thực, nguyệt thực tính bằng thiên văn, kèm khả năng quan sát ở Việt Nam."
        path={ECLIPSE_LIST_PATH}
        items={ECLIPSES.map((e) => ({ name: `${e.title} ${dmy(e.peak)}`, href: eclipsePath(e) }))}
      />
      <section className={v.hubHero}>
        <div className={v.hubDisc} aria-hidden="true">
          {sun && <EclipseDisc e={sun} uid="hub-sun" bare className={v.hubSvg} />}
        </div>
        <div className={v.hubText}>
          <h1 className={s.h1}>Nhật thực &amp; nguyệt thực</h1>
          <p className={s.lead}>
            Lịch nhật thực và nguyệt thực từ {ECLIPSE_YEARS[0]} đến {ECLIPSE_YEARS[ECLIPSE_YEARS.length - 1]}, tính bằng thiên văn, kèm khả năng quan sát ở Việt Nam.
          </p>
        </div>
        <div className={v.hubDisc} aria-hidden="true">
          {moon && <EclipseDisc e={moon} uid="hub-moon" bare className={v.hubSvg} />}
        </div>
      </section>
      <div className={s.wrap}>
        <EclipseList cards={cards} years={[...ECLIPSE_YEARS]} />
        <p className={s.note}>Thời gian theo giờ Việt Nam (UTC+7). Số liệu tính bằng thư viện thiên văn, đối chiếu với danh mục của NASA.</p>
      </div>
    </Page>
  );
}

function Yes({ on, children }: { on: boolean; children: string }) {
  return <span className={on ? v.yes : v.no}>{children}</span>;
}

function LunarPhases({ e }: { e: Eclipse & { body: "lunar" } }) {
  const p = e.phases;
  const rows: [string, string][] = [
    ["Bắt đầu nửa tối", p.nuaToiBatDau],
    ...(p.motPhanBatDau ? ([["Bắt đầu một phần", p.motPhanBatDau]] as [string, string][]) : []),
    ...(p.toanPhanBatDau ? ([["Bắt đầu toàn phần", p.toanPhanBatDau]] as [string, string][]) : []),
    ["Cực đại", e.peak],
    ...(p.toanPhanKetThuc ? ([["Kết thúc toàn phần", p.toanPhanKetThuc]] as [string, string][]) : []),
    ...(p.motPhanKetThuc ? ([["Kết thúc một phần", p.motPhanKetThuc]] as [string, string][]) : []),
    ["Kết thúc nửa tối", p.nuaToiKetThuc],
  ];
  return (
    <dl className={v.rows}>
      {rows.map(([k, t]) => (
        <div key={k} className={k === "Cực đại" ? v.rowKey : undefined}>
          <dt>{k}</dt>
          <dd>{hhmmOn(t, e.peak)}</dd>
        </div>
      ))}
    </dl>
  );
}

function SolarPhases({ e }: { e: Eclipse & { body: "solar" } }) {
  const c = bestSolarCity(e);
  if (!c || !c.begin || !c.peak || !c.end) {
    return (
      <>
        <dl className={v.rows}>
          <div className={v.rowKey}>
            <dt>Cực đại (toàn cầu)</dt>
            <dd>{hhmm(e.peak)}</dd>
          </div>
        </dl>
        <p className={v.note}>Không quan sát được ở các thành phố lớn của Việt Nam.</p>
      </>
    );
  }
  return (
    <>
      <p className={v.note}>Tại {CITY_NAMES[c.id]}, nơi thấy rõ nhất trong 5 thành phố.</p>
      <dl className={v.rows}>
        <div>
          <dt>Bắt đầu</dt>
          <dd>{hhmmOn(c.begin, e.peak)}</dd>
        </div>
        <div className={v.rowKey}>
          <dt>Cực đại</dt>
          <dd>{hhmmOn(c.peak, e.peak)}</dd>
        </div>
        <div>
          <dt>Kết thúc</dt>
          <dd>{hhmmOn(c.end, e.peak)}</dd>
        </div>
      </dl>
    </>
  );
}

function coverage(e: Eclipse): { value: string; note: string } {
  if (isLunar(e)) {
    if (e.kind === "nua-toi") return { value: "0%", note: "Chỉ đi vào vùng nửa tối, bóng tối chưa che Mặt Trăng." };
    return { value: `${Math.round(e.obscuration * 100)}%`, note: "Phần đĩa Trăng nằm trong bóng tối của Trái Đất lúc cực đại." };
  }
  if (isSolar(e)) {
    const c = bestSolarCity(e);
    if (c?.obscuration !== undefined) return { value: `${Math.round(c.obscuration * 100)}%`, note: `Phần đĩa Mặt Trời bị che tại ${CITY_NAMES[c.id]} lúc cực đại.` };
    if (e.obscuration !== null) {
      const approx = e.kind === "mot-phan";
      return { value: `${approx ? "≈ " : ""}${Math.round(e.obscuration * 100)}%`, note: "Tại nơi che nhiều nhất trên Trái Đất; không quan sát được ở Việt Nam." };
    }
  }
  return { value: "—", note: "" };
}

function LunarWhere({ e }: { e: Eclipse & { body: "lunar" } }) {
  return (
    <table className={v.tbl}>
      <thead>
        <tr>
          <th>Thành phố</th>
          <th>Mọc trăng</th>
          <th>Lặn trăng</th>
          <th>Khả năng quan sát</th>
        </tr>
      </thead>
      <tbody>
        {e.cities.map((c: LunarCity) => (
          <tr key={c.id}>
            <th scope="row">{CITY_NAMES[c.id]}</th>
            <td data-k="Mọc trăng">{c.moonrise ? hhmmOn(c.moonrise, e.peak) : "—"}</td>
            <td data-k="Lặn trăng">{c.moonset ? hhmmOn(c.moonset, e.peak) : "—"}</td>
            <td data-k="Quan sát">
              <Yes on={c.visible}>{c.visible ? `Thấy được (cao ${Math.round(c.peakAlt)}°)` : "Không thấy"}</Yes>
              <small>{c.sharePct}% thời gian nguyệt thực Trăng trên đường chân trời</small>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SolarWhere({ e }: { e: Eclipse & { body: "solar" } }) {
  return (
    <table className={v.tbl}>
      <thead>
        <tr>
          <th>Thành phố</th>
          <th>Bắt đầu</th>
          <th>Cực đại</th>
          <th>Kết thúc</th>
          <th>Khả năng quan sát</th>
        </tr>
      </thead>
      <tbody>
        {e.cities.map((c) => (
          <tr key={c.id}>
            <th scope="row">{CITY_NAMES[c.id]}</th>
            <td data-k="Bắt đầu">{c.visible && c.begin ? hhmmOn(c.begin, e.peak) : "—"}</td>
            <td data-k="Cực đại">{c.visible && c.peak ? hhmmOn(c.peak, e.peak) : "—"}</td>
            <td data-k="Kết thúc">{c.visible && c.end ? hhmmOn(c.end, e.peak) : "—"}</td>
            <td data-k="Quan sát">
              <Yes on={c.visible}>{c.visible ? `Thấy được, che ${Math.round((c.obscuration ?? 0) * 100)}%` : "Không thấy"}</Yes>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function eventJsonLd(e: Eclipse) {
  let start = e.peak;
  let end = e.peak;
  if (isLunar(e)) {
    start = e.phases.nuaToiBatDau;
    end = e.phases.nuaToiKetThuc;
  } else if (isSolar(e)) {
    const c = bestSolarCity(e);
    if (c?.begin && c.end) {
      start = c.begin;
      end = c.end;
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${e.title} ${dmy(e.peak)}`,
    startDate: start,
    endDate: end,
    eventStatus: "https://schema.org/EventScheduled",
    url: `${SITE_URL}${eclipsePath(e)}`,
    ...(e.visibleVn ? { location: { "@type": "Place", name: "Việt Nam", address: { "@type": "PostalAddress", addressCountry: "VN" } } } : {}),
  };
}

export function EclipseDetail({ e }: { e: Eclipse }) {
  const { prev, next } = eclipseNeighbours(e);
  const cov = coverage(e);
  const folk = ECLIPSE_FOLK[e.body];
  const solar = e.body === "solar";
  return (
    <Page crumbs={[...LIST_CRUMBS.slice(0, 2), { label: "Nhật thực & nguyệt thực", href: ECLIPSE_LIST_PATH }, { label: e.title }]}>
      <JsonLd data={eventJsonLd(e)} />
      <JsonLd data={articleJsonLd({ headline: `${e.title} ${dmy(e.peak)}`, description: `${e.title} ngày ${dmy(e.peak)}: giờ các pha, độ che và khả năng quan sát ở Việt Nam.`, path: eclipsePath(e), updatedAt: ECLIPSE_UPDATED })} />
      <section className={v.dHero}>
        <h1 className={s.h1}>{e.title}</h1>
        <p className={v.dSub}>{e.visibleVn ? "Thấy được ở Việt Nam" : "Không thấy ở Việt Nam"}</p>
        {e.kind === "lai" && <p className={v.dNote}>{HYBRID_NOTE}</p>}
        <p className={v.dDates}>
          <span>
            <Icon name="calendar" size={18} /> Dương lịch: {dmy(e.peak)}
          </span>
          <span>
            <Icon name="history" size={18} /> Âm lịch: {lunarText(e)}
          </span>
        </p>
        <div className={v.sky}>
          <PhaseStrip e={e} />
        </div>
      </section>
      <div className={s.wrap}>
        <div className={v.grid}>
          <section className={v.card} aria-labelledby="gio-pha">
            <h2 className={v.cardTitle} id="gio-pha">
              <Icon name="clock" size={22} /> Giờ các pha <small>(giờ Việt Nam)</small>
            </h2>
            {isLunar(e) ? <LunarPhases e={e} /> : isSolar(e) ? <SolarPhases e={e} /> : null}
          </section>
          <section className={v.card} aria-labelledby="do-che">
            <h2 className={v.cardTitle} id="do-che">
              <Icon name="yinyang" size={22} /> Độ che
            </h2>
            <div className={v.cover}>
              <EclipseDisc e={e} uid={`${e.slug}-cv`} className={v.coverDisc} />
              <div>
                <b>{cov.value}</b>
                <p>{cov.note}</p>
              </div>
            </div>
          </section>
          <section className={`${v.card} ${v.where}`} aria-labelledby="xem-dau">
            <h2 className={v.cardTitle} id="xem-dau">
              <Icon name="home" size={22} /> Xem ở đâu
            </h2>
            {isLunar(e) ? <LunarWhere e={e} /> : isSolar(e) ? <SolarWhere e={e} /> : null}
          </section>
        </div>

        <div className={v.grid2}>
          <section className={v.card} aria-labelledby="an-toan">
            <h2 className={v.cardTitle} id="an-toan">
              <Icon name="sun" size={22} /> Hướng dẫn quan sát an toàn
            </h2>
            <ul className={v.tips}>
              {safetyTips(e).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {solar && (
              <p className={v.warn}>
                <Icon name="note" size={20} /> Với nhật thực: không nhìn trực tiếp bằng mắt thường.
              </p>
            )}
          </section>
          {folk && (
            <section className={v.card} aria-labelledby="dan-gian">
              <h2 className={v.cardTitle} id="dan-gian">
                <Icon name="book" size={22} /> Dân gian nói gì
              </h2>
              <p className={v.folkTitle}>{folk.title}</p>
              {folk.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          )}
        </div>

        <nav className={v.nav} aria-label="Sự kiện kế bên">
          {prev ? (
            <Link href={eclipsePath(prev)} className={v.navItem} rel="prev">
              <Icon name="chevron" size={18} className={v.navBack} />
              <span>
                <small>Lần trước</small>
                <b>{prev.title}</b>
                <small>{dmy(prev.peak)}</small>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={eclipsePath(next)} className={`${v.navItem} ${v.navNext}`} rel="next">
              <span>
                <small>Lần kế tiếp</small>
                <b>{next.title}</b>
                <small>{dmy(next.peak)}</small>
              </span>
              <Icon name="chevron" size={18} />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </Page>
  );
}
