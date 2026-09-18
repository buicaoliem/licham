import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canChiOfYear, jdFromDate } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LeFlagIllustration, LeHeroIllustration, LeIllustration, hasHeroIllustration } from "@/components/LeIllustration";
import { dateToSlug } from "@/lib/date-slug";
import { WEEKDAY_LONG, pad2 } from "@/lib/format";
import { LE_LIST, LE_NHOM_LABEL, leBySlug, leKhac } from "@/lib/le";
import { daysUntil, nextOccurrence, tenYearTable } from "@/lib/le-date-engine";
import { monthToSlug } from "@/lib/month-slug";
import { getVietnamToday } from "@/lib/today";
import { vanKhanBySlug } from "@/lib/van-khan";

const YEAR_START = 2022;
const YEAR_END = 2031;

export function generateStaticParams() {
  return LE_LIST.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = leBySlug(slug);
  if (!page) return {};
  const today = getVietnamToday();
  const { year } = nextOccurrence(page, today);
  return {
    title: `${page.tieuDe} ${year} là ngày nào? | Lịch Âm`,
    description: page.moTa,
    alternates: { canonical: `/le/${slug}/` },
  };
}

function upcomingHolidayChips(afterJd: number, excludeSlug: string, count: number, today: ReturnType<typeof getVietnamToday>) {
  return LE_LIST.filter((p) => p.slug !== excludeSlug)
    .map((p) => ({ page: p, next: nextOccurrence(p, today) }))
    .filter(({ next }) => jdFromDate(next.solar.day, next.solar.month, next.solar.year) > afterJd)
    .sort(
      (a, b) =>
        jdFromDate(a.next.solar.day, a.next.solar.month, a.next.solar.year) -
        jdFromDate(b.next.solar.day, b.next.solar.month, b.next.solar.year),
    )
    .slice(0, count);
}

export default async function LePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = leBySlug(slug);
  if (!page) notFound();

  const today = getVietnamToday();
  const todayJd = jdFromDate(today.day, today.month, today.year);
  const { year, solar, canChi, lunarLabel, weekday } = nextOccurrence(page, today);
  const soNgayConLai = daysUntil(today, solar);
  const rows = tenYearTable(page, YEAR_START, YEAR_END);
  const isHero = page.nhom === "anh-hung";

  const badgeLich =
    page.lich === "am" || page.lich === "am-cuoi-thang"
      ? `${lunarLabel} âm lịch`
      : page.lich === "tiet-khi"
        ? `tiết ${page.ngayChinh.tietKhi}`
        : page.lich === "duong"
          ? `${page.ngayChinh.duong!.ngay}/${page.ngayChinh.duong!.thang} dương lịch`
          : "dương lịch";

  const namGocOrMatLine = page.namMat
    ? `Tưởng niệm ${year - page.namMat} năm ngày mất (${page.namMat} – ${year})`
    : page.namSinh
      ? `Kỷ niệm ${year - page.namSinh} năm ngày sinh (${page.namSinh} – ${year})`
      : page.namGoc
        ? `Kỷ niệm ${year - page.namGoc} năm (${page.namGoc} – ${year})`
        : undefined;

  const vanKhanBai = page.vanKhan.map((s) => vanKhanBySlug(s)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const heroesKhac = isHero ? leKhac(page, 4) : [];
  const chips = upcomingHolidayChips(todayJd, page.slug, 5, today);

  const faqDate = `${WEEKDAY_LONG[weekday]}, ngày ${pad2(solar.day)}/${pad2(solar.month)}/${solar.year} dương lịch (${lunarLabel} âm lịch, năm ${canChi})`;
  const faqNghi = page.nghiLe
    ? `Có. Đây là ngày nghỉ lễ theo quy định, người lao động được nghỉ ${page.nghiLe.soNgay} ngày${page.nghiLe.ghiChu ? ` (${page.nghiLe.ghiChu})` : ""}. Lịch nghỉ cụ thể từng năm chờ Chính phủ công bố.`
    : "Không. Đây không phải ngày nghỉ lễ theo quy định, người lao động đi làm bình thường.";
  const faqAmDuong =
    page.lich === "am" || page.lich === "am-cuoi-thang"
      ? `${page.tieuDe} tính theo âm lịch, rơi vào ngày ${lunarLabel} âm lịch, tức ngày ${pad2(solar.day)}/${pad2(solar.month)}/${solar.year} dương lịch năm ${year}.`
      : `${page.tieuDe} tính theo dương lịch, ngày ${pad2(solar.day)}/${pad2(solar.month)}, nhằm ngày ${lunarLabel} âm lịch năm ${canChi}.`;

  const faqItems = [
    { q: `${page.tieuDe} ${year} vào ngày nào, thứ mấy?`, a: faqDate },
    { q: `${page.tieuDe} có được nghỉ làm không?`, a: faqNghi },
    { q: `${page.tieuDe} tính theo âm lịch hay dương lịch?`, a: faqAmDuong },
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
        <Header activeMenu="Ngày lễ" />

        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        {isHero ? (
          <div className="leband son">
            <div className="leband-grid">
              <div className="leportrait">
                <div className="ill">
                  {page.coAnhThat ? (
                    <img src="/le/ho-chi-minh-1946.jpg" alt="Chủ tịch Hồ Chí Minh năm 1946" />
                  ) : hasHeroIllustration(page.slug) ? (
                    <LeHeroIllustration slug={page.slug} />
                  ) : (
                    <LeIllustration />
                  )}
                </div>
                <small>{page.coAnhThat ? "Ảnh: Wikimedia Commons, phạm vi công cộng" : "Hình minh hoạ của licham.app"}</small>
              </div>
              <div className="leband-txt">
                <div className="crumb">
                  <Link href="/le">Ngày lễ</Link> › <Link href="/le?nhom=anh-hung">Anh hùng dân tộc</Link> › {page.ten}
                </div>
                <span className="lebadge">
                  {LE_NHOM_LABEL[page.nhom]} · {badgeLich}
                </span>
                <h1>
                  {page.tieuDe} {year} là ngày nào?
                </h1>
                <p className="sub">{namGocOrMatLine ?? page.moTa}</p>
                <div className="lehero">
                  <div>
                    <div className="k">Dương lịch</div>
                    <div className="v">
                      {pad2(solar.day)}/{pad2(solar.month)}/{solar.year}
                    </div>
                    <div className="s">{WEEKDAY_LONG[weekday]}</div>
                  </div>
                  <div>
                    <div className="k">Âm lịch</div>
                    <div className="v">{lunarLabel} tháng</div>
                    <div className="s">Năm {canChi}</div>
                  </div>
                  <div className="dem">
                    {soNgayConLai === 0 ? "Hôm nay" : <>Còn <b>{soNgayConLai}</b> ngày nữa</>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="leband">
            <div className="crumb">
              <Link href="/le">Ngày lễ</Link> › {page.ten}
            </div>
            <span className="lebadge">
              {LE_NHOM_LABEL[page.nhom]} · {badgeLich}
            </span>
            <h1>
              {page.tieuDe} {year} là ngày nào?
            </h1>
            <p className="sub">{page.moTa}</p>
            {namGocOrMatLine && <p className="sub">{namGocOrMatLine}</p>}
            <div className="lehero">
              <div>
                <div className="k">Dương lịch</div>
                <div className="v">
                  {pad2(solar.day)}/{pad2(solar.month)}/{solar.year}
                </div>
                <div className="s">{WEEKDAY_LONG[weekday]}</div>
              </div>
              <div>
                <div className="k">Âm lịch</div>
                <div className="v">{lunarLabel} tháng</div>
                <div className="s">Năm {canChi}</div>
              </div>
              <div className="dem">
                {soNgayConLai === 0 ? "Hôm nay" : <>Còn <b>{soNgayConLai}</b> ngày nữa</>}
              </div>
            </div>
          </div>
        )}

        <div className="body">
          {page.nghiLe && (
            <div className="levariant">
              <div className="box" style={{ margin: 0, background: "var(--sheet)" }}>
                <div className="box-h">
                  <span className="rule" />
                  <span className="t">Lịch nghỉ {page.tieuDe} {year}</span>
                  <span className="rule" />
                </div>
                <div className="lenghi">
                  <div>
                    <span className="s">Cán bộ, công chức</span>
                    <b>Chờ Chính phủ công bố</b>
                  </div>
                  <div>
                    <span className="s">Doanh nghiệp</span>
                    <b>Theo thông báo của công ty</b>
                  </div>
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>
                  Cập nhật theo thông báo chính thức.{" "}
                  Số ngày nghỉ theo luật: {page.nghiLe.soNgay} ngày{page.nghiLe.ghiChu ? ` (${page.nghiLe.ghiChu})` : ""}.
                </p>
              </div>
            </div>
          )}

          {page.ngayPhu && (
            <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--ink-2)", marginTop: page.nghiLe ? 16 : 0 }}>
              {page.ngayPhu}
            </p>
          )}

          <div className="box" style={{ marginTop: 22 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">{page.tieuDe} qua các năm</span>
              <span className="rule" />
            </div>
            <table className="letable">
              <thead>
                <tr>
                  <th>Năm</th>
                  <th>Âm lịch</th>
                  <th>Dương lịch</th>
                  <th>Thứ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const rowJd = jdFromDate(r.solar.day, r.solar.month, r.solar.year);
                  const isPast = rowJd < todayJd;
                  const isNext = r.solar.day === solar.day && r.solar.month === solar.month && r.solar.year === solar.year;
                  return (
                    <tr key={r.year} className={isPast ? "qua" : isNext ? "toi" : undefined}>
                      <td data-k="Năm">
                        {page.lich === "am-cuoi-thang" ? `Giao thừa Tết ${canChiOfYear(r.year + 1).name}` : `${r.year} · ${r.canChi}`}
                      </td>
                      <td data-k="Âm lịch">{r.lunarLabel}</td>
                      <td data-k="Dương lịch">
                        <Link href={`/ngay/${dateToSlug(r.solar)}`}>
                          {pad2(r.solar.day)}/{pad2(r.solar.month)}/{r.solar.year}
                        </Link>
                        {isPast && <span className="letag xam">Đã qua</span>}
                        {isNext && <span className="letag son">Sắp tới</span>}
                      </td>
                      <td data-k="Thứ">{WEEKDAY_LONG[r.weekday]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cols2" style={{ marginTop: 18 }}>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">{isHero ? `Đôi nét về ${page.ten}` : "Ý nghĩa"}</span>
                <span className="rule" />
              </div>
              {page.yNghia.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">{isHero ? "Thông tin nhanh" : page.nhom === "am-lich" ? "Phong tục thường gặp" : "Hoạt động"}</span>
                <span className="rule" />
              </div>
              {isHero && page.thongTin ? (
                <dl className="lefacts">
                  {page.thongTin.map((f) => (
                    <Fragment key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </Fragment>
                  ))}
                </dl>
              ) : (
                <ul className="dotlist">
                  {(page.bullets ?? []).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Chuẩn bị cho ngày lễ</span>
              <span className="rule" />
            </div>
            <div className="cols3">
              {vanKhanBai.length > 0 ? (
                vanKhanBai.map((v) => (
                  <Link className="lk" href={`/van-khan/${v.slug}`} key={v.slug}>
                    <b>{v.ten}</b>
                    <span>{v.moTa}</span>
                  </Link>
                ))
              ) : (
                <Link className="lk" href="/van-khan">
                  <b>Văn khấn đi lễ</b>
                  <span>Tuyển tập bài khấn đầy đủ</span>
                </Link>
              )}
              <Link className="lk" href={`/ngay/${dateToSlug(solar)}`}>
                <b>
                  Xem ngày {pad2(solar.day)}/{pad2(solar.month)}/{solar.year}
                </b>
                <span>Giờ hoàng đạo, sao tốt xấu của ngày này</span>
              </Link>
              <Link className="lk" href={`/${monthToSlug(solar.month, solar.year)}`}>
                <b>
                  Lịch tháng {solar.month}/{solar.year}
                </b>
                <span>Các ngày tốt quanh dịp lễ</span>
              </Link>
              {(page.lienKet ?? []).map((lk) => (
                <Link className="lk" href={lk.href} key={lk.href}>
                  <b>{lk.label}</b>
                  <span>Xem thêm</span>
                </Link>
              ))}
            </div>
          </div>

          {isHero && heroesKhac.length > 0 && (
            <div className="box" style={{ marginTop: 18 }}>
              <div className="box-h">
                <span className="rule" />
                <span className="t">Anh hùng dân tộc khác</span>
                <span className="rule" />
              </div>
              <div className="leheroes">
                {heroesKhac.map((h) => (
                  <Link className="lehc" href={`/le/${h.slug}`} key={h.slug}>
                    <div className="pic">
                      {h.coAnhThat ? (
                        <img src="/le/ho-chi-minh-1946.jpg" alt={h.ten} />
                      ) : (
                        <LeFlagIllustration />
                      )}
                    </div>
                    <div className="cap">
                      <b>{h.ten}</b>
                      <span>
                        {h.namMat ? `Giỗ ${h.ngayChinh.am ? `${h.ngayChinh.am.ngay}/${h.ngayChinh.am.thang} âm lịch` : ""}` : "Xem chi tiết"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
              <span className="t">Ngày lễ sắp tới</span>
              <span className="rule" />
            </div>
            <div className="chips">
              {chips.map(({ page: p, next }) => (
                <Link className="chip" href={`/le/${p.slug}`} key={p.slug}>
                  {p.ten}
                  <small>
                    {pad2(next.solar.day)}/{pad2(next.solar.month)}
                  </small>
                </Link>
              ))}
              <Link className="chip" href="/le" style={{ fontWeight: 600 }}>
                Xem tất cả ngày lễ ›
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
