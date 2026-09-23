import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { canChiNamDuong, xungNgay } from "@licham/core";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { SINH_NAM_MAX, SINH_NAM_MIN } from "@/lib/sinh-nam";
import { buildShareUrl } from "@/lib/share";
import { getVietnamToday } from "@/lib/today";
import {
  ALL_CAN_CHI,
  CHI_LIST,
  type ChiInfo,
  NAP_AM_MO_TA,
  assertNoSlugCollision,
  birthYearsForCanChi,
  birthYearsForChi,
  canChiBySlug,
  canChiSlug,
  chiBySlug,
  chiByIndex,
  hopMenh,
  hopTuoiChi,
  kyTuoiChi,
  namDangLuuY,
  nextYearForChi,
  nhiHopChi,
  soTuoi,
  tamHopGroup,
  tuHanhXungGroup,
  xungTrongNam,
} from "@/lib/tuoi";

assertNoSlugCollision();

const CHI_SLUGS = CHI_LIST.map((c) => c.slug);
const CAN_CHI_SLUGS = ALL_CAN_CHI.map((cc) => canChiSlug(cc));

export function generateStaticParams() {
  return [...CHI_SLUGS, ...CAN_CHI_SLUGS].map((slug) => ({ slug }));
}

export const dynamicParams = false;

function chiNames(chiIndexes: number[]): string {
  return chiIndexes.map((i) => chiByIndex(i).ten).join(", ");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const today = getVietnamToday();

  const chi = chiBySlug(slug);
  if (chi) {
    return {
      title: `Tuổi ${chi.ten}: hợp tuổi nào, kỵ tuổi nào? | Lịch Âm`,
      description: `Tuổi ${chi.ten} (${chi.conVat}) hợp và kỵ tuổi nào, mệnh gì theo từng năm sinh, các năm sinh gần đây cho tuổi ${chi.ten}.`,
      alternates: { canonical: `/tuoi/${slug}/` },
    };
  }

  const canChi = canChiBySlug(slug);
  if (canChi) {
    const recentYear = birthYearsForCanChi(canChi.index, today.year)[1];
    return {
      title: `Tuổi ${canChi.name} ${recentYear}: mệnh gì, hợp tuổi nào? | Lịch Âm`,
      description: `Tuổi ${canChi.name} mệnh ${canChi.napAm.name}, hành ${canChi.napAm.element}. Xem năm sinh, tuổi hợp, tuổi kỵ và tuổi xung của ${canChi.name}.`,
      alternates: { canonical: `/tuoi/${slug}/` },
    };
  }

  return {};
}

function TuoiFact({ k, v, h, tone }: { k: string; v: string; h?: string; tone?: "g" | "r" }) {
  return (
    <div className="tuoi-fact">
      <span className={tone ? `dot ${tone}` : "dot"} aria-hidden="true" />
      <div>
        <div className="k">{k}</div>
        <div className="v">{v}</div>
        {h && <div className="h">{h}</div>}
      </div>
    </div>
  );
}

/** Khối nội dung của trang tuổi: thẻ + tiêu đề mục + ghi chú nguồn (tùy chọn). */
function TuSec({ title, note, className, children }: { title: string; note?: string; className?: string; children: ReactNode }) {
  return (
    <section className={className ? `ch-card tu-sec ${className}` : "ch-card tu-sec"}>
      <h2 className="tu-sec-h">{title}</h2>
      {children}
      {note && <p className="tu-note">{note}</p>}
    </section>
  );
}

/** Một dòng hợp/kỵ: nhãn · giá trị · nhãn trạng thái. */
function HkRow({ k, v, tone }: { k: string; v: ReactNode; tone?: "g" | "r" }) {
  return (
    <li>
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      {tone && <span className={`pill ${tone}`}>{tone === "g" ? "Hợp" : "Kỵ"}</span>}
    </li>
  );
}

function ChiPage({ chi }: { chi: ChiInfo }) {
  const today = getVietnamToday();
  const years = birthYearsForChi(chi.chiIndex, today.year, 6);
  const nextYear = nextYearForChi(chi.chiIndex, today.year);
  const nextYearCanChi = canChiNamDuong(nextYear);
  const tamHop = tamHopGroup(chi.chiIndex);
  const tuHanhXung = tuHanhXungGroup(chi.chiIndex);
  const nhiHop = nhiHopChi(chi.chiIndex);
  const [xungChi, haiChi] = kyTuoiChi(chi.chiIndex);
  const nhomCanChi = ALL_CAN_CHI.filter((cc) => cc.chiIndex === chi.chiIndex);
  const otherChi = CHI_LIST.filter((c) => c.chiIndex !== chi.chiIndex);

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu">
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi", href: "/tuoi/" }, { label: `Tuổi ${chi.ten}` }]}
        crumbJsonLd={false}
        eyebrow={`Con giáp thứ ${chi.chiIndex + 1}`}
        title={`Tuổi ${chi.ten}: hợp tuổi nào, kỵ tuổi nào?`}
        lead={`Người sinh năm ${chi.ten} — ${nhomCanChi.map((cc) => cc.name).join(", ")}.`}
      >
        <ShareButton
          url={buildShareUrl(`/tuoi/${chi.slug}/`)}
          title={`Tuổi ${chi.ten}`}
          text={`Tuổi ${chi.ten}: hợp tuổi nào, kỵ tuổi nào – xem đầy đủ tại Lịch Âm.`}
        />
      </ChHero>

      <div className="ch-wrap ch-main ch-stack">
        <section className="ch-card tu-profile" aria-label={`Tóm tắt tuổi ${chi.ten}`}>
          <div className="tuoi-medal">
            <ConGiapArt chiSlug={chi.slug} ten={chi.ten} so={chi.chiIndex + 1} className="tuoi-medal-art" />
            <b>Tuổi {chi.ten}</b>
            <span>{chi.conVat}</span>
            <span className="gio">
              Giờ {chi.ten}: {chi.gio}
            </span>
          </div>
          <div className="tuoi-facts">
            <TuoiFact k="Tam hợp" v={chiNames(tamHop)} tone="g" />
            <TuoiFact k="Tứ hành xung" v={chiNames(tuHanhXung)} tone="r" />
            <TuoiFact k={`Năm ${chi.ten} gần nhất`} v={`${nextYear} ${nextYearCanChi.name}`} />
            <TuoiFact k={`Các tuổi ${chi.ten}`} v={nhomCanChi.map((cc) => cc.name).join(", ")} />
          </div>
        </section>

        <TuSec
          title={`Năm nào là tuổi ${chi.ten}`}
          note={`Ngũ hành / nạp âm gắn với từng năm can chi, không phải một mệnh chung cho mọi người tuổi ${chi.ten}.`}
        >
          <table className="tuoitable">
            <thead>
              <tr>
                <th>Năm sinh</th>
                <th>Can chi</th>
                <th>Mệnh</th>
                <th>Tuổi năm {today.year}</th>
              </tr>
            </thead>
            <tbody>
              {years.map((y, i) => {
                const cc = canChiNamDuong(y);
                return (
                  <tr key={y} className={i === years.length - 1 ? "now" : undefined}>
                    <td data-k="Năm sinh">{y >= SINH_NAM_MIN && y <= SINH_NAM_MAX ? <Link href={`/sinh-nam/${y}/`}>{y}</Link> : y}</td>
                    <td data-k="Can chi">
                      <Link href={`/tuoi/${canChiSlug(cc)}/`}>{cc.name}</Link>
                    </td>
                    <td data-k="Mệnh">{cc.napAm.name}</td>
                    <td data-k="Tuổi">{soTuoi(y, today.year)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TuSec>

        <div className="tu-cols">
          <TuSec title="Hợp và kỵ theo con giáp" note="Theo quan niệm dân gian, chỉ mang tính tham khảo.">
            <ul className="tu-hk">
              <HkRow k="Tam hợp" v={chiNames(tamHop)} tone="g" />
              {nhiHop !== undefined && <HkRow k="Nhị hợp" v={chiByIndex(nhiHop).ten} tone="g" />}
              <HkRow k="Xung" v={chiByIndex(xungChi).ten} tone="r" />
              {haiChi !== undefined && <HkRow k="Hại" v={chiByIndex(haiChi).ten} tone="r" />}
            </ul>
          </TuSec>
          <TuSec title="Đặc điểm thường nói" note="Đây là mô tả theo quan niệm dân gian, không phải kết luận khoa học.">
            <div className="tu-prose">
              <p>{chi.moTa1}</p>
              <p>{chi.moTa2}</p>
            </div>
          </TuSec>
        </div>

        <TuSec title="Xem chi tiết theo từng tuổi">
          <div className="tu-gc-grid">
            {nhomCanChi.map((cc) => (
              <Link className="tu-gc" href={`/tuoi/${canChiSlug(cc)}/`} key={cc.name}>
                <b>{cc.name}</b>
                <span>{birthYearsForCanChi(cc.index, today.year).join(" · ")}</span>
              </Link>
            ))}
          </div>
        </TuSec>

        <TuSec title="Con giáp khác">
          <div className="chips">
            {otherChi.map((c) => (
              <Link className="chip" href={`/tuoi/${c.slug}/`} key={c.slug}>
                {c.ten}
              </Link>
            ))}
            <Link className="chip" href={`/tu-vi/${chi.slug}/${today.year}/`}>
              Tử vi tuổi {chi.ten} năm {today.year}
            </Link>
            <Link className="chip" href="/ten/">
              Đặt tên
            </Link>
          </div>
        </TuSec>
        <TraditionalDisclaimer />
      </div>
    </ChShell>
  );
}

function CanChiPage({ slug }: { slug: string }) {
  const canChi = canChiBySlug(slug)!;
  const today = getVietnamToday();
  const chi = chiByIndex(canChi.chiIndex);
  const [prevYear, recentYear, nextCycleYear] = birthYearsForCanChi(canChi.index, today.year);
  const tuoiNam = soTuoi(recentYear, today.year);
  const h = hopMenh(canChi.napAm.element);
  const hopTuoi = hopTuoiChi(canChi.chiIndex);
  const kyTuoi = kyTuoiChi(canChi.chiIndex);
  const namLuuY = namDangLuuY(canChi.chiIndex, today.year);
  // "Đất ven đường — đất chịu người qua lại…" → phần nghĩa ngắn trước dấu gạch.
  const napAmNghia = (NAP_AM_MO_TA[canChi.napAm.name] ?? "").split(" — ")[0];

  const xungEntries = xungNgay(canChi);
  const xungChinh = xungEntries.find((e) => e.isThienKhacDiaXung) ?? xungEntries.find((e) => e.canChi.canIndex === canChi.canIndex)!;

  const siblings = ALL_CAN_CHI.filter((cc) => cc.chiIndex === canChi.chiIndex && cc.index !== canChi.index);

  const namNayCanChi = canChiNamDuong(today.year);
  const namNayXung = xungTrongNam(canChi, today.year);

  const faqItems = [
    {
      q: `Sinh năm ${recentYear} là mệnh gì?`,
      a: `${canChi.name}, mệnh ${canChi.napAm.name}, thuộc hành ${canChi.napAm.element}.`,
    },
    {
      q: `Tuổi ${canChi.name} kỵ tuổi nào?`,
      a: `Theo quan niệm dân gian, tuổi ${canChi.name} kỵ nhất là tuổi ${kyTuoi.map((i) => chiByIndex(i).ten).join(" và ")}, đặc biệt là ${xungChinh.canChi.name}.`,
    },
    {
      q: `Năm ${today.year} tuổi ${canChi.name} có xung không?`,
      a:
        namNayXung === "khong-xung"
          ? `Không. Năm ${today.year} là năm ${namNayCanChi.name}, không xung với tuổi ${canChi.name}.`
          : `Có. Năm ${today.year} là năm ${namNayCanChi.name}, xung với chi ${chi.ten} của tuổi này${namNayXung === "thien-khac-dia-xung" ? ", mức xung nặng (thiên khắc địa xung)" : ""}. Nhiều người kiêng khởi sự lớn trong năm xung.`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <ChHero
        className="tu-hero"
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Xem tuổi", href: "/tuoi/" },
          { label: `Tuổi ${chi.ten}`, href: `/tuoi/${chi.slug}/` },
          { label: canChi.name },
        ]}
        crumbJsonLd={false}
        eyebrow={`Sinh năm ${prevYear} · ${recentYear} · ${nextCycleYear}`}
        title={`Tuổi ${canChi.name} ${recentYear}: mệnh gì, hợp tuổi nào?`}
        lead={`${canChi.name} — mệnh ${canChi.napAm.name}.`}
      >
        <ShareButton
          url={buildShareUrl(`/tuoi/${slug}/`)}
          title={`Tuổi ${canChi.name}`}
          text={`Tuổi ${canChi.name}: mệnh ${canChi.napAm.name}, hợp tuổi nào – xem đầy đủ tại Lịch Âm.`}
        />
      </ChHero>

      <div className="ch-wrap ch-main ch-stack">
        <TuSec title="Thông tin nhanh" className="tu-profile-sec">
          <div className="tu-profile">
            <div className="tuoi-medal">
              <ConGiapArt chiSlug={chi.slug} ten={chi.ten} so={chi.chiIndex + 1} className="tuoi-medal-art" />
              <b>Tuổi {canChi.name}</b>
              <span>
                Con giáp {chi.ten} ({chi.conVat})
              </span>
            </div>
            <div className="tuoi-facts c3">
              <TuoiFact k="Năm sinh" v={`${prevYear} · ${recentYear} · ${nextCycleYear}`} />
              <TuoiFact k="Can chi" v={canChi.name} />
              <TuoiFact k="Mệnh nạp âm" v={canChi.napAm.name} h={napAmNghia || undefined} tone="g" />
              <TuoiFact k="Ngũ hành" v={canChi.napAm.element} tone="g" />
              <TuoiFact k={`Tuổi năm ${today.year}`} v={`${tuoiNam} tuổi`} h={`Người sinh năm ${recentYear}, chưa cộng tuổi mụ`} />
              <TuoiFact k="Tuổi xung" v={xungChinh.canChi.name} tone="r" />
            </div>
          </div>
        </TuSec>

        <div className="tu-cols">
          <TuSec title="Hợp và kỵ" note="Theo quan niệm dân gian, chỉ mang tính tham khảo.">
            <ul className="tu-hk">
              <HkRow
                k="Hợp mệnh"
                v={`${h.sinhRa} sinh ${canChi.napAm.element}, ${canChi.napAm.element} sinh ${h.sinhBoi}`}
                tone="g"
              />
              <HkRow k="Khắc mệnh" v={`${h.khacBoi} khắc ${canChi.napAm.element}`} tone="r" />
              <HkRow k="Hợp tuổi" v={chiNames(hopTuoi)} tone="g" />
              <HkRow k="Kỵ tuổi" v={chiNames(kyTuoi)} tone="r" />
            </ul>
          </TuSec>
          <TuSec title="Màu sắc thường dùng" note="Quan niệm phong thủy dân gian, không bắt buộc.">
            <ul className="tu-hk">
              <HkRow k="Màu hợp" v={`${h.mauHop.join(", ")}.`} />
              <HkRow k="Màu nên tránh" v={`${h.mauTranh.join(", ")}.`} />
            </ul>
          </TuSec>
        </div>

        <TuSec title="Các năm đáng lưu ý">
          <table className="tuoitable">
            <thead>
              <tr>
                <th>Năm</th>
                <th>Can chi</th>
                <th>Với tuổi {canChi.name}</th>
              </tr>
            </thead>
            <tbody>
              {namLuuY.map((n) => (
                <tr key={n.year}>
                  <td data-k="Năm">{n.year}</td>
                  <td data-k="Can chi">{n.canChi.name}</td>
                  <td data-k="Với tuổi này">
                    {n.nhan === "xung" && <span className="pill r">Năm xung</span>}
                    {n.nhan === "tam-hop" && <span className="pill g">Tam hợp</span>}
                    {n.nhan === "nam-tuoi" && "Năm tuổi"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TuSec>

        <TuSec title="Câu hỏi thường gặp">
          <div className="faqs">
            {faqItems.map((f) => (
              <div className="faq" key={f.q}>
                <b>{f.q}</b>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </TuSec>

        <TuSec title={`Tuổi khác trong nhóm ${chi.ten}`}>
          <div className="chips">
            {siblings.map((cc) => (
              <Link className="chip" href={`/tuoi/${canChiSlug(cc)}/`} key={cc.name}>
                {cc.name}
              </Link>
            ))}
            <Link className="chip strong" href="/tuoi/">
              Xem tất cả 60 tuổi ›
            </Link>
            {recentYear >= SINH_NAM_MIN && recentYear <= SINH_NAM_MAX && (
              <Link className="chip" href={`/sinh-nam/${recentYear}/`}>
                Sinh năm {recentYear}
              </Link>
            )}
            <Link className="chip" href={`/tu-vi/${chi.slug}/${today.year}/`}>
              Tử vi tuổi {chi.ten} năm {today.year}
            </Link>
          </div>
        </TuSec>
        <TraditionalDisclaimer />
      </div>
    </ChShell>
  );
}

export default async function TuoiSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const chi = chiBySlug(slug);
  if (chi) return <ChiPage chi={chi} />;

  const canChi = canChiBySlug(slug);
  if (canChi) return <CanChiPage slug={slug} />;

  notFound();
}
