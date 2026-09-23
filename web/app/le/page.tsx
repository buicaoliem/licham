import type { Metadata } from "next";
import Link from "next/link";
import { LeHubBrowser } from "@/components/LeHubBrowser";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { LeDateTile } from "@/components/heritage/LeParts";
import { COUNTDOWN_LIST, countdownState } from "@/lib/countdown";
import { dayHref } from "@/lib/calendar/urls";
import { HERITAGE_SLOTS } from "@/lib/heritage-assets";
import { leItems, tietKhiNam, tietKhiSapToi } from "@/lib/le-hub";
import { leBySlug } from "@/lib/le";
import { nghiLeYears } from "@/lib/lich-nghi-le";
import { getVietnamToday } from "@/lib/today";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Ngày lễ Việt Nam năm ${year} — Âm lịch, dương lịch, nghỉ lễ | Lịch Âm`,
    description: `Tra cứu ngày lễ ${year}: nghỉ lễ theo luật, lễ âm lịch, giỗ anh hùng dân tộc. Đếm ngược Tết và lịch nghỉ từng năm.`,
    alternates: { canonical: "/le/" },
  };
}

/** Viết hoa chữ đầu ("ông Công ông Táo" → "Ông Công ông Táo") khi bỏ tiền tố "Đếm ngược". */
function viHoa(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Dựng lại mỗi giờ để "sắp tới" và số ngày còn lại theo giờ Việt Nam không bị cũ.
export const revalidate = 300;

export default function LeHubPage() {
  const today = getVietnamToday();
  const items = leItems(today);
  const sapToi = [...items].sort((a, b) => a.jd - b.jd || a.slug.localeCompare(b.slug));
  // Thẻ nổi bật: lễ âm lịch / nghỉ lễ gần nhất (ưu tiên lễ có tranh), trong vòng 45 ngày.
  const ungVien = sapToi.filter((it) => (it.nhom === "am-lich" || it.nhom === "nghi-le") && it.daysLeft <= 45);
  const featured = ungVien.find((it) => it.art?.kind === "img") ?? ungVien[0] ?? null;
  const tietKhi = tietKhiNam(today.year, today);
  const tkSapToi = tietKhiSapToi(today, 3);
  const demNguoc = COUNTDOWN_LIST.map((c) => ({ def: c, state: countdownState(c, today) })).sort((a, b) => a.state.daysLeft - b.state.daysLeft);

  const upcoming = sapToi.slice(0, 6);

  return (
    <ChShell activeMenu="Ngày lễ" className="ch-le">
      <ChHero
        className="le-hero-idx"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Ngày lễ" }]}
        crumbJsonLd={false}
        eyebrow="Ngày lễ & tiết khí"
        title={`Các ngày lễ trong năm ${today.year}`}
        lead="Tra cứu ngày âm lịch, dương lịch, ngày nghỉ lễ và ý nghĩa của các ngày lễ, ngày giỗ trong năm"
        art={{ src: HERITAGE_SLOTS.heroLe.path, label: HERITAGE_SLOTS.heroLe.spec }}
      >
        <div className="chips">
          <Link className="chip hot" href="/countdown/tet/">
            Đếm ngược Tết
          </Link>
          <Link className="chip" href="/countdown/vu-lan/">
            Vu Lan
          </Link>
          <Link className="chip" href="/countdown/trung-thu/">
            Trung thu
          </Link>
          <Link className="chip" href="/countdown/doan-ngo/">
            Đoan ngọ
          </Link>
          <Link className="chip" href="/countdown/ong-tao/">
            Ông Táo
          </Link>
          <Link className="chip" href="/countdown/giao-thua/">
            Giao thừa
          </Link>
          <Link className="chip" href={`/lich-nghi-le/${today.year}/`}>
            Lịch nghỉ lễ {today.year}
          </Link>
        </div>
      </ChHero>

      <div className="ch-wrap ch-main">
        {/* điện thoại: dải "sắp tới" cuộn ngang ngay dưới tiêu đề */}
        <section className="le-strip" aria-label="Ngày lễ sắp tới">
          <ul>
            {upcoming.map((it) => (
              <li key={it.slug}>
                <Link href={`/le/${it.slug}/`}>
                  <LeDateTile day={it.day} month={it.month} tone={`n-${it.nhom}`} size="sm" />
                  <span>
                    <b>{it.ten}</b>
                    <small>{it.daysLeft === 0 ? "Hôm nay" : `Còn ${it.daysLeft} ngày`}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <LeHubBrowser
          items={items}
          tietKhi={tietKhi}
          tietKhiYear={today.year}
          featured={featured}
          featuredNote={featured ? leBySlug(featured.slug)?.yNghia[0] : undefined}
          aside={
            <section className="ch-sidebox le-box" aria-labelledby="le-up-h">
              <h2 className="vk-sidebox-h son" id="le-up-h">
                <Icon name="calendar" size={20} />
                Sắp diễn ra
              </h2>
              <ul className="le-up">
                {upcoming.map((it) => (
                  <li key={it.slug}>
                    <Link href={`/le/${it.slug}/`}>
                      <LeDateTile day={it.day} month={it.month} tone={`n-${it.nhom}`} size="sm" />
                      <span className="t">
                        <b>{it.ten}</b>
                        <small>
                          {it.weekday} · {it.lunarLabel} âm lịch
                        </small>
                      </span>
                      <span className="left">{it.daysLeft === 0 ? "Hôm nay" : `Còn ${it.daysLeft} ngày`}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          }
        />

        <div className="le-more">
          <section className="ch-sidebox le-box" aria-labelledby="le-tk-side-h">
            <h2 className="vk-sidebox-h jade" id="le-tk-side-h">
              <Icon name="sun" size={20} />
              Tiết khí sắp tới
            </h2>
            <ul className="le-up">
              {tkSapToi.map((t) => (
                <li key={`${t.name}-${t.year}`}>
                  <Link href={dayHref(t)}>
                    <LeDateTile day={t.day} month={t.month} tone="n-tiet-khi" size="sm" />
                    <span className="t">
                      <b>{t.name}</b>
                      <small>Kinh độ Mặt Trời {t.longitude}°</small>
                    </span>
                    <span className="left">{t.daysLeft === 0 ? "Hôm nay" : `Còn ${t.daysLeft} ngày`}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="le-box-more" href="/kien-thuc/tiet-khi/">
              24 tiết khí là gì
              <Icon name="arrow" size={14} />
            </Link>
          </section>

          <section className="ch-sidebox le-box" aria-labelledby="le-cd-h">
            <h2 className="vk-sidebox-h gold" id="le-cd-h">
              <Icon name="hourglass" size={20} />
              Đếm ngược
            </h2>
            <ul className="le-cd">
              {demNguoc.map(({ def, state }) => (
                <li key={def.slug}>
                  <Link href={`/countdown/${def.slug}/`}>
                    <span>{viHoa(def.h1.replace("Đếm ngược ", ""))}</span>
                    <b>{state.daysLeft === 0 ? "Hôm nay" : `${state.daysLeft} ngày`}</b>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="ch-sidebox le-box" aria-labelledby="le-nghi-h">
            <h2 className="vk-sidebox-h son" id="le-nghi-h">
              <Icon name="list" size={20} />
              Lịch nghỉ lễ theo năm
            </h2>
            <div className="le-years">
              {nghiLeYears().map((y) => (
                <Link key={y} href={`/lich-nghi-le/${y}/`} className={y === today.year ? "on" : undefined}>
                  {y}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ChShell>
  );
}
