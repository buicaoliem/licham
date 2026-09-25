import Link from "next/link";
import type { CanChi, SolarDate } from "@licham/core";
import { getVietnamToday } from "@/lib/today";
import { namEventsOfCanChi, nhanVatOfHoliday, suKienOfLunarDay, vanHoaBlocksOn } from "@/lib/van-hoa/blocks";
import { canChiYearHeader } from "@/lib/van-hoa/logic";
import { moonInfo } from "@/lib/van-hoa/moon";
import { ITEM_LABELS } from "@/lib/van-hoa/types";
import { MoonDisc } from "../MoonDisc";
import s from "../van-hoa.module.css";
import { ItemBadge, Pic } from "../tpl/Shared";
import t from "../tpl/tpl.module.css";
import b from "./blocks.module.css";

/** Khung chung: mang biến --vh-* của mảng Văn hoá vào trang có sẵn. */
function Frame({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className={`${s.root} ${b.block}`} aria-label={label}>
      <h2 className={b.title}>{title}</h2>
      {children}
    </section>
  );
}

/** Trang ngày âm: "Ngày này năm xưa" (nếu có sự kiện trùng ngày-tháng âm) và "Trăng hôm nay" (pha vẽ, không dùng ảnh). */
export function LunarDayBlocks({ date, lunarDay, lunarMonth, leap = false }: { date: SolarDate; lunarDay: number; lunarMonth: number; leap?: boolean }) {
  if (!vanHoaBlocksOn()) return null;
  const events = leap ? [] : suKienOfLunarDay(lunarDay, lunarMonth);
  const moon = moonInfo(date);
  const today = getVietnamToday();
  const isToday = today.day === date.day && today.month === date.month && today.year === date.year;
  const when = isToday ? "hôm nay" : "ngày này";
  return (
    <div className={b.duo}>
      {events.length > 0 && (
        <Frame label="Ngày này năm xưa" title="Ngày này năm xưa">
          <ul className={b.evList}>
            {events.map((e) => (
              <li key={e.slug} className={b.evRow}>
                <span className={b.evYear}>{e.lunar.year}</span>
                <div>
                  <ItemBadge label={e.label} />
                  <Link href={`/van-hoa/su-kien/${e.slug}/`} className={b.evTitle}>
                    {e.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className={b.more}>
            <Link href="/van-hoa/su-kien/">Xem thêm</Link>
          </p>
        </Frame>
      )}
      <Frame label={`Trăng ${when}`} title={`Trăng ${when}`}>
        <div className={b.moon}>
          <MoonDisc elongation={moon.elongation} percent={moon.illuminatedPercent} label={`Hình dạng mặt trăng ${when}`} />
          <div className={b.moonText}>
            <p className={b.moonPhase}>{moon.phase}</p>
            <p className={s.muted}>Độ sáng {moon.illuminatedPercent}%</p>
          </div>
        </div>
        <p className={s.note}>Tính cho Hà Nội, giờ Việt Nam.</p>
      </Frame>
    </div>
  );
}

/** Trang tuổi can chi: tối đa 3 mốc lịch sử của các năm mang can chi đó. */
export function NamTrongLichSu({ canChi }: { canChi: CanChi }) {
  if (!vanHoaBlocksOn()) return null;
  const events = namEventsOfCanChi(canChi);
  if (events.length === 0) return null;
  const { slug } = canChiYearHeader(canChi);
  const title = `Năm ${canChi.name} trong lịch sử`;
  return (
    <Frame label={title} title={title}>
      <ol className={t.timeline}>
        {events.map((e) => (
          <li key={`${e.year}-${e.title}`} className={t.tlRow}>
            <span className={t.tlNode} style={{ background: ITEM_LABELS[e.label].node }} aria-hidden="true" />
            <div className={b.tlBox}>
              <span className={b.tlY}>{e.year}</span> <ItemBadge label={e.label} />
              <b>{e.title}</b>
              <p>{e.summary}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className={b.more}>
        <Link href={`/van-hoa/nam/${slug}/`}>Xem đủ dòng thời gian</Link>
      </p>
    </Frame>
  );
}

/** Trang ngày lễ: 2–3 nhân vật có lễ hội gắn với ngày lễ này (thẻ chỉ lấy từ trang có thật). */
export function NhanVatLienQuan({ leSlug }: { leSlug: string }) {
  if (!vanHoaBlocksOn()) return null;
  const people = nhanVatOfHoliday(leSlug);
  if (people.length === 0) return null;
  return (
    <Frame label="Nhân vật và nơi thờ liên quan" title="Nhân vật & nơi thờ liên quan">
      <ul className={`${t.plain} ${t.cards} ${b.people}`}>
        {people.map((n) => (
          <li key={n.slug} className={t.cardItem}>
            <Pic src={n.cardImage ?? n.image} alt={n.imageAlt} className={t.cardImg} width={112} height={160} />
            <div className={t.cardBody}>
              <ItemBadge label={n.label} />
              <h3 className={t.cardName}>{n.name}</h3>
              {n.places?.[0] && <p className={b.place}>Nơi thờ: {n.places[0].name}</p>}
              <p className={t.moreR}>
                <Link href={`/van-hoa/nhan-vat/${n.slug}/`}>Xem chi tiết</Link>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
