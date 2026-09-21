import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canChiNamDuong, xungNgay } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { SINH_NAM_MAX, SINH_NAM_MIN } from "@/lib/sinh-nam";
import { buildShareUrl } from "@/lib/share";
import { getVietnamToday } from "@/lib/today";
import {
  ALL_CAN_CHI,
  CHI_LIST,
  type ChiInfo,
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
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <div className="crumb">
            <Link href="/tuoi/">Xem tuổi</Link> › Tuổi {chi.ten}
          </div>
          <span className="tuoibadge">Con giáp thứ {chi.chiIndex + 1}</span>
          <h1>Tuổi {chi.ten}: hợp tuổi nào, kỵ tuổi nào?</h1>
          <p className="sub">
            Người sinh năm {chi.ten} — {nhomCanChi.map((cc) => cc.name).join(", ")}.
          </p>
          <div className="share-row">
            <ShareButton
              variant="onband"
              url={buildShareUrl(`/tuoi/${chi.slug}/`)}
              title={`Tuổi ${chi.ten}`}
              text={`Tuổi ${chi.ten}: hợp tuổi nào, kỵ tuổi nào – xem đầy đủ tại Lịch Âm.`}
            />
          </div>
          <div className="tuoihero">
            <div>
              <div className="k">Tam hợp</div>
              <div className="v">{chiNames(tamHop)}</div>
            </div>
            <div>
              <div className="k">Tứ hành xung</div>
              <div className="v">{chiNames(tuHanhXung)}</div>
            </div>
            <div>
              <div className="k">Năm {chi.ten} gần nhất</div>
              <div className="v">
                {nextYear} {nextYearCanChi.name}
              </div>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t">Năm nào là tuổi {chi.ten}</span>
              <span className="rule" />
            </div>
            <table className="tuoitable">
              <thead>
                <tr>
                  <th>Năm sinh</th>
                  <th>Can chi</th>
                  <th>Mệnh</th>
                  <th>Tuổi ({today.year})</th>
                </tr>
              </thead>
              <tbody>
                {years.map((y, i) => {
                  const cc = canChiNamDuong(y);
                  return (
                    <tr key={y} className={i === years.length - 1 ? "now" : undefined}>
                      <td data-k="Năm sinh">
                        {y >= SINH_NAM_MIN && y <= SINH_NAM_MAX ? <Link href={`/sinh-nam/${y}/`}>{y}</Link> : y}
                      </td>
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
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
              Ngũ hành / nạp âm gắn với từng năm can chi, không phải một mệnh chung cho mọi người tuổi {chi.ten}.
            </p>
          </div>

          <div className="cols2">
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Hợp và kỵ theo con giáp</span>
                <span className="rule" />
              </div>
              <ul className="dotlist">
                <li>
                  Tam hợp: {chiNames(tamHop)} <span className="pill g">Hợp</span>
                </li>
                {nhiHop !== undefined && (
                  <li>
                    Nhị hợp: {chiByIndex(nhiHop).ten} <span className="pill g">Hợp</span>
                  </li>
                )}
                <li>
                  Xung: {chiByIndex(xungChi).ten} <span className="pill r">Kỵ</span>
                </li>
                {haiChi !== undefined && (
                  <li>
                    Hại: {chiByIndex(haiChi).ten} <span className="pill r">Kỵ</span>
                  </li>
                )}
              </ul>
              <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
                Theo quan niệm dân gian, chỉ mang tính tham khảo.
              </p>
            </div>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Đặc điểm thường nói</span>
                <span className="rule" />
              </div>
              <p>{chi.moTa1}</p>
              <p>{chi.moTa2}</p>
              <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center" }}>
                Đây là mô tả theo quan niệm dân gian, không phải kết luận khoa học.
              </p>
            </div>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Xem chi tiết theo từng tuổi</span>
              <span className="rule" />
            </div>
            <div className="tuoi-grid5">
              {nhomCanChi.map((cc) => (
                <Link className="tuoi-gc" href={`/tuoi/${canChiSlug(cc)}/`} key={cc.name}>
                  <b>{cc.name}</b>
                  <span>{birthYearsForCanChi(cc.index, today.year).join(" · ")}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Con giáp khác</span>
              <span className="rule" />
            </div>
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
          </div>
          <TraditionalDisclaimer />
        </div>

        <Footer />
      </div>
    </div>
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
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        { }
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        <div className="tuoiband kim">
          <div className="crumb">
            <Link href="/tuoi/">Xem tuổi</Link> › <Link href={`/tuoi/${chi.slug}/`}>Tuổi {chi.ten}</Link> › {canChi.name}
          </div>
          <span className="tuoibadge">
            Sinh năm {prevYear} · {recentYear} · {nextCycleYear}
          </span>
          <h1>
            Tuổi {canChi.name} {recentYear}: mệnh gì, hợp tuổi nào?
          </h1>
          <p className="sub">
            {canChi.name} — mệnh {canChi.napAm.name}.
          </p>
          <div className="share-row">
            <ShareButton
              variant="onband"
              url={buildShareUrl(`/tuoi/${slug}/`)}
              title={`Tuổi ${canChi.name}`}
              text={`Tuổi ${canChi.name}: mệnh ${canChi.napAm.name}, hợp tuổi nào – xem đầy đủ tại Lịch Âm.`}
            />
          </div>
          <div className="tuoihero">
            <div>
              <div className="k">Mệnh</div>
              <div className="v">{canChi.napAm.name}</div>
            </div>
            <div>
              <div className="k">Ngũ hành</div>
              <div className="v">{canChi.napAm.element}</div>
            </div>
            <div>
              <div className="k">Tuổi ({today.year})</div>
              <div className="v">{tuoiNam}</div>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="cols2">
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Thông tin nhanh</span>
                <span className="rule" />
              </div>
              <dl className="tuoifacts">
                <dt>Can chi</dt>
                <dd>{canChi.name}</dd>
                <dt>Năm sinh</dt>
                <dd>
                  {prevYear} · {recentYear} · {nextCycleYear}
                </dd>
                <dt>Mệnh nạp âm</dt>
                <dd>{canChi.napAm.name}</dd>
                <dt>Ngũ hành</dt>
                <dd>{canChi.napAm.element}</dd>
                <dt>Con giáp</dt>
                <dd>
                  {chi.ten} ({chi.conVat})
                </dd>
                <dt>Tuổi xung</dt>
                <dd>{xungChinh.canChi.name}</dd>
              </dl>
            </div>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Hợp và kỵ</span>
                <span className="rule" />
              </div>
              <ul className="dotlist">
                <li>
                  Hợp mệnh: {h.sinhRa} sinh {canChi.napAm.element}, {canChi.napAm.element} sinh {h.sinhBoi} <span className="pill g">Hợp</span>
                </li>
                <li>
                  Khắc mệnh: {h.khacBoi} khắc {canChi.napAm.element} <span className="pill r">Kỵ</span>
                </li>
                <li>
                  Hợp tuổi: {chiNames(hopTuoi)} <span className="pill g">Hợp</span>
                </li>
                <li>
                  Kỵ tuổi: {chiNames(kyTuoi)} <span className="pill r">Kỵ</span>
                </li>
              </ul>
              <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
                Theo quan niệm dân gian, chỉ mang tính tham khảo.
              </p>
            </div>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Màu sắc thường dùng</span>
              <span className="rule" />
            </div>
            <div className="cols2" style={{ margin: 0 }}>
              <div>
                <p>
                  <b>Màu hợp:</b> {h.mauHop.join(", ")}.
                </p>
              </div>
              <div>
                <p>
                  <b>Màu nên tránh:</b> {h.mauTranh.join(", ")}.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", margin: "8px 0 0" }}>
              Quan niệm phong thủy dân gian, không bắt buộc.
            </p>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Các năm đáng lưu ý</span>
              <span className="rule" />
            </div>
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
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Câu hỏi thường gặp</span>
              <span className="rule" />
            </div>
            <div className="faqs">
              {faqItems.map((f) => (
                <div className="faq" key={f.q}>
                  <b>{f.q}</b>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Tuổi khác trong nhóm {chi.ten}</span>
              <span className="rule" />
            </div>
            <div className="chips">
              {siblings.map((cc) => (
                <Link className="chip" href={`/tuoi/${canChiSlug(cc)}/`} key={cc.name}>
                  {cc.name}
                </Link>
              ))}
              <Link className="chip" href="/tuoi/" style={{ fontWeight: 600 }}>
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
          </div>
          <TraditionalDisclaimer />
        </div>

        <Footer />
      </div>
    </div>
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
