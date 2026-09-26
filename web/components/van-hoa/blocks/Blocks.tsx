import Link from "next/link";
import type { CanChi, SolarDate } from "@licham/core";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { getVietnamToday } from "@/lib/today";
import { namEventsOfCanChi, namEventsOfLunarDay, nhanVatOfHoliday, suKienOfLunarDay, vanHoaBlocksOn } from "@/lib/van-hoa/blocks";
import { placeLine, yearPageHref } from "@/lib/van-hoa/import-logic";
import { canChiYearHeader, canChiYearOfEvent } from "@/lib/van-hoa/logic";
import { ECLIPSE_LIST_PATH } from "@/lib/van-hoa/eclipses";
import { moonInfo } from "@/lib/van-hoa/moon";
import { LE_HOI_PATH, leHoiOfLunarDay, leHoiPath, lunarSpanShort } from "@/lib/van-hoa/le-hoi";
import { ITEM_LABELS, type ItemLabel } from "@/lib/van-hoa/types";
import { MoonDisc } from "../MoonDisc";
import s from "../van-hoa.module.css";
import { ItemBadge, Pic, TopicBadge } from "../tpl/Shared";
import b from "./blocks.module.css";

function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

/** Khung chung: mang biến --vh-* của mảng Văn hoá vào trang có sẵn; tiêu đề có biểu tượng, liên kết hành động canh phải. */
function Frame({ title, icon, more, children }: { title: string; icon: IconName | "moon"; more?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <section className={`${s.root} ${b.block}`} aria-label={title}>
      <div className={b.head}>
        <h2 className={b.title}>
          <span className={b.ico}>{icon === "moon" ? <MoonIcon /> : <Icon name={icon} size={22} stroke={1.7} />}</span>
          {title}
        </h2>
        {more && (
          <Link href={more.href} className={b.moreLink}>
            {more.label}
            <Icon name="arrow" size={16} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** Dòng thời gian: chấm màu theo nhãn, năm, tiêu đề, nhãn canh phải. */
function Timeline({ rows }: { rows: { key: string; year: number | string; title: string; label: ItemLabel; href?: string; /** Nhãn chữ (vd. "Lễ hội") thay cho nhãn mục. */ badge?: string }[] }) {
  return (
    <ol className={b.tl}>
      {rows.map((r) => (
        <li key={r.key} className={b.tlRow}>
          <span className={b.tlDot} style={{ background: ITEM_LABELS[r.label].node }} aria-hidden="true" />
          <span className={b.tlYear}>{r.year}</span>
          {r.href ? (
            <Link href={r.href} className={b.tlTitle}>
              {r.title}
            </Link>
          ) : (
            <span className={b.tlTitle}>{r.title}</span>
          )}
          {r.badge ? <TopicBadge text={r.badge} /> : <ItemBadge label={r.label} />}
        </li>
      ))}
    </ol>
  );
}

/** Trang ngày âm: "Ngày này năm xưa" (nếu có sự kiện trùng ngày-tháng âm) và "Trăng hôm nay" (pha vẽ, không dùng ảnh). */
export function LunarDayBlocks({ date, lunarDay, lunarMonth, leap = false }: { date: SolarDate; lunarDay: number; lunarMonth: number; leap?: boolean }) {
  if (!vanHoaBlocksOn()) return null;
  const events = leap ? [] : suKienOfLunarDay(lunarDay, lunarMonth);
  const namEvents = leap ? [] : namEventsOfLunarDay(lunarDay, lunarMonth, Math.max(0, 3 - events.length));
  const rows = [
    ...events.map((e) => ({ key: e.slug, year: e.lunar.year, title: e.title, label: e.label, href: `/van-hoa/su-kien/${e.slug}/` })),
    ...namEvents.map((e) => ({ key: e.id ?? `${e.year}-${e.title}`, year: e.yearText ?? e.year, title: e.title, label: e.label, href: `${yearPageHref(canChiYearOfEvent(e)!)}#${e.id ?? `nam-${e.year}`}` })),
  ];
  const festivals = leHoiOfLunarDay(lunarDay, lunarMonth, leap).map((f) => ({ key: f.slug, year: lunarSpanShort(f), title: f.name, label: "tin-nguong" as const, badge: "Lễ hội", href: leHoiPath(f.slug) }));
  const moon = moonInfo(date);
  const today = getVietnamToday();
  const isToday = today.day === date.day && today.month === date.month && today.year === date.year;
  const when = isToday ? "hôm nay" : "ngày này";
  const t = (x: typeof moon.moonrise) => (x ? `${x.hhmm}${x.nextDay ? " (ngày sau)" : ""}` : "—");
  return (
    <>
      {festivals.length > 0 && (
        <div className={b.duo}>
          <Frame title={`Lễ hội ${when}`} icon="flame" more={{ href: LE_HOI_PATH, label: "Xem thêm" }}>
            <Timeline rows={festivals} />
          </Frame>
        </div>
      )}
      <div className={b.duo}>
      {rows.length > 0 && (
        <Frame title="Ngày này năm xưa" icon="calendar" more={{ href: "/van-hoa/su-kien/", label: "Xem thêm" }}>
          <Timeline rows={rows} />
        </Frame>
      )}
      <Frame title={`Trăng ${when}`} icon="moon">
        <div className={b.moonBig}>
          <MoonDisc elongation={moon.elongation} percent={moon.illuminatedPercent} label={`Hình dạng mặt trăng ${when}`} />
        </div>
        <p className={b.moonPhase}>{moon.phase}</p>
        <p className={b.moonSub}>Độ sáng {moon.illuminatedPercent}%</p>
        <dl className={b.moonTimes}>
          <div>
            <dt>Trăng mọc</dt>
            <dd>{t(moon.moonrise)}</dd>
          </div>
          <div>
            <dt>Trăng lặn</dt>
            <dd>{t(moon.moonset)}</dd>
          </div>
        </dl>
        <p className={s.note}>Tính cho Hà Nội, giờ Việt Nam.</p>
        <p className={b.foot}>
          <Link href={ECLIPSE_LIST_PATH}>Lịch nhật thực, nguyệt thực</Link>
        </p>
      </Frame>
      </div>
    </>
  );
}

/** Trang tuổi can chi: tối đa 3 mốc lịch sử của các năm mang can chi đó. */
export function NamTrongLichSu({ canChi }: { canChi: CanChi }) {
  if (!vanHoaBlocksOn()) return null;
  const events = namEventsOfCanChi(canChi);
  if (events.length === 0) return null;
  const { slug } = canChiYearHeader(canChi);
  return (
    <Frame title={`Năm ${canChi.name} trong lịch sử`} icon="hourglass" more={{ href: `/van-hoa/nam/${slug}/`, label: "Xem đủ dòng thời gian" }}>
      <Timeline rows={events.map((e) => ({ key: e.id ?? `${e.year}-${e.title}`, year: e.yearText ?? e.year, title: e.title, label: e.label, href: `/van-hoa/nam/${slug}/#${e.id ?? `nam-${e.year}`}` }))} />
    </Frame>
  );
}

/** Trang ngày lễ: 2–3 nhân vật có lễ hội gắn với ngày lễ này (thẻ chỉ lấy từ trang có thật). */
export function NhanVatLienQuan({ leSlug }: { leSlug: string }) {
  if (!vanHoaBlocksOn()) return null;
  const people = nhanVatOfHoliday(leSlug);
  if (people.length === 0) return null;
  return (
    <Frame title="Nhân vật & nơi thờ liên quan" icon="user">
      <ul className={b.people}>
        {people.map((n) => (
          <li key={n.slug}>
            <Link href={`/van-hoa/nhan-vat/${n.slug}/`} className={b.person}>
              <Pic src={n.cardImage ?? n.image} alt={n.imageAlt} className={b.personImg} width={200} height={200} />
              <span className={b.personText}>
                <b>{n.name}</b>
                <span>{n.places?.[0] ? `Nơi thờ: ${placeLine(n.places[0])}` : n.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
