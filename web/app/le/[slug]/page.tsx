import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canChiOfYear, jdFromDate } from "@licham/core";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { ShareButton } from "@/components/ShareButton";
import { LeFlagIllustration, LeHeroIllustration, hasHeroIllustration } from "@/components/LeIllustration";
import { NhanVatLienQuan } from "@/components/van-hoa/blocks/Blocks";
import { ChShell } from "@/components/heritage/ChShell";
import { HeritageImage } from "@/components/heritage/HeritageImage";
import { HCM_LE_SLUG, HCM_TRANH_NOTE, LE_TRANH_LICH_SU, leImage } from "@/lib/heritage-assets";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { LE_LICH_ICON, LeDateTile } from "@/components/heritage/LeParts";
import { TocDetails } from "@/components/heritage/TocDetails";
import { dayHref, monthHref } from "@/lib/calendar/urls";
import { WEEKDAY_LONG, pad2 } from "@/lib/format";
import { LE_LIST, LE_NHOM_LABEL, leBySlug, leKhac } from "@/lib/le";
import { countdownSlugForLe } from "@/lib/countdown";
import { daysUntil, nextOccurrence, tenYearTable } from "@/lib/le-date-engine";
import { LE_LICH_LABEL, leArt, leItem, leLichKind, leRuleLabel } from "@/lib/le-hub";
import { getRelatedHolidays, googleCalendarUrl, icsDataUri } from "@/lib/holiday";
import { buildShareUrl } from "@/lib/share";
import { SITE_URL } from "@/lib/site";
import { getVietnamToday } from "@/lib/today";
import { vanKhanBySlug } from "@/lib/van-khan";
import { anhHungByLeSlug, anhHungHref } from "@/lib/anh-hung";

/** Bảng năm: 2 năm trước, năm sắp tới, 5 năm sau. */
const YEARS_BEFORE = 2;
const YEARS_AFTER = 5;

// Hôm nay tính theo giờ Việt Nam nên trang dựng lại mỗi giờ để đếm ngược và năm hiện tại không bị cũ.
export const revalidate = 300;

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

/** Mục nội dung đánh số (cùng kiểu trang chi tiết Văn khấn). */
function Sec({ id, icon, title, children, wide = false }: { id: string; icon: IconName; title: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className="ch-card vk-sec le-sec" id={id}>
      <div className="vk-sec-ico">
        <Icon name={icon} size={26} stroke={1.4} />
      </div>
      <h2 className="vk-sec-h">{title}</h2>
      <div className={wide ? "vk-sec-b wide" : "vk-sec-b"}>{children}</div>
    </section>
  );
}

export default async function LePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = leBySlug(slug);
  if (!page) notFound();

  const today = getVietnamToday();
  const todayJd = jdFromDate(today.day, today.month, today.year);
  const { year, solar, canChi, lunarLabel, weekday } = nextOccurrence(page, today);
  const soNgayConLai = daysUntil(today, solar);
  const rows = tenYearTable(page, year - YEARS_BEFORE, year + YEARS_AFTER);
  const related = getRelatedHolidays(page.slug, today, 4);
  const calDetails = `${page.moTa} (${lunarLabel} âm lịch) — ${SITE_URL}/le/${page.slug}/`;
  const isHero = page.nhom === "anh-hung";
  const art = leArt(page);
  // Tranh riêng về nhân vật/sự kiện lịch sử là tranh tưởng tượng: luôn ghi rõ, không để hiểu là chân dung hay tư liệu.
  const tranhLichSu = art?.kind === "img" && art.src.startsWith("/heritage/le/") && (isHero || LE_TRANH_LICH_SU.has(page.slug));
  const lichKind = leLichKind(page);

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
  const countdownSlug = countdownSlugForLe(page.slug);
  const heroesKhac = isHero ? leKhac(page, 4) : [];
  // Trang tiểu sử trong chuyên mục Anh hùng dân tộc (nếu có) — liên kết từ mục "Đôi nét".
  const hoSo = anhHungByLeSlug(page.slug);
  const chips = upcomingHolidayChips(todayJd, page.slug, 5, today);

  const faqDate = `${WEEKDAY_LONG[weekday]}, ngày ${pad2(solar.day)}/${pad2(solar.month)}/${solar.year} dương lịch (${lunarLabel} âm lịch, năm ${canChi})`;
  const faqNghi = page.nghiLe
    ? `Có. Đây là ngày nghỉ lễ theo quy định, người lao động được nghỉ ${page.nghiLe.soNgay} ngày${page.nghiLe.ghiChu ? ` (${page.nghiLe.ghiChu})` : ""}. Lịch nghỉ cụ thể từng năm chờ Chính phủ công bố.`
    : "Không. Đây không phải ngày nghỉ lễ theo quy định, người lao động đi làm bình thường.";
  const faqAmDuong =
    page.lich === "am" || page.lich === "am-cuoi-thang"
      ? `${page.tieuDe} tính theo âm lịch, rơi vào ngày ${lunarLabel} âm lịch, tức ngày ${pad2(solar.day)}/${pad2(solar.month)}/${solar.year} dương lịch năm ${year}.`
      : page.lich === "tiet-khi"
        ? `${page.tieuDe} không tính theo ngày âm lịch cố định mà theo tiết ${page.ngayChinh.tietKhi} (vị trí Mặt Trời), nên luôn rơi vào khoảng 4–5/4 dương lịch. Năm ${year} là ngày ${pad2(solar.day)}/${pad2(solar.month)}, nhằm ngày ${lunarLabel} âm lịch năm ${canChi}.`
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Ngày lễ", item: `${SITE_URL}/le/` },
      { "@type": "ListItem", position: 3, name: page.tieuDe, item: `${SITE_URL}/le/${page.slug}/` },
    ],
  };

  const coBullets = !isHero && (page.bullets ?? []).length > 0;
  const toc: { id: string; label: string }[] = [
    { id: "qua-cac-nam", label: `${page.tieuDe} qua các năm` },
    { id: "y-nghia", label: isHero ? `Đôi nét về ${page.ten}` : "Ý nghĩa" },
    ...(coBullets ? [{ id: "phong-tuc", label: page.nhom === "am-lich" ? "Phong tục thường gặp" : "Hoạt động" }] : []),
    { id: "chuan-bi", label: "Chuẩn bị cho ngày lễ" },
    ...(heroesKhac.length > 0 ? [{ id: "anh-hung-khac", label: "Anh hùng dân tộc khác" }] : []),
    { id: "hoi-dap", label: "Câu hỏi thường gặp" },
  ];
  const tocList = (
    <ol className="ch-toc">
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`}>{t.label}</a>
        </li>
      ))}
    </ol>
  );

  // Thông tin nhanh: trang anh hùng dùng dữ liệu biên soạn sẵn; các trang khác lấy từ quy tắc ngày của lễ.
  const facts: { icon: IconName; k: string; v: ReactNode }[] =
    isHero && page.thongTin
      ? page.thongTin.map((f) => ({ icon: "note" as IconName, k: f.label, v: f.value }))
      : [
          { icon: LE_LICH_ICON[lichKind], k: "Ngày lễ", v: leRuleLabel(page) },
          { icon: "list", k: "Nhóm", v: LE_NHOM_LABEL[page.nhom] },
          { icon: "calendar", k: "Tính theo", v: LE_LICH_LABEL[lichKind] },
          {
            icon: "home",
            k: "Nghỉ lễ",
            v: page.nghiLe ? `${page.nghiLe.soNgay} ngày${page.nghiLe.ghiChu ? ` (${page.nghiLe.ghiChu})` : ""}` : "Không nghỉ",
          },
          ...(page.namGoc ? [{ icon: "history" as IconName, k: "Năm khởi đầu", v: String(page.namGoc) }] : []),
          ...(page.vanKhan.length > 0 && vanKhanBai[0]
            ? [{ icon: "scroll" as IconName, k: "Văn khấn", v: <Link href={`/van-khan/${vanKhanBai[0].slug}/`}>{vanKhanBai[0].ten}</Link> }]
            : []),
        ];
  const factsBox = (
    <ul className="vk-facts le-facts">
      {facts.map((f) => (
        <li key={f.k}>
          <Icon name={f.icon} size={18} />
          <span className="k">{f.k}</span>
          <span className="v">{f.v}</span>
        </li>
      ))}
    </ul>
  );

  const crumbs = isHero
    ? [
        { label: "Trang chủ", href: "/" },
        { label: "Ngày lễ", href: "/le/" },
        { label: "Anh hùng dân tộc", href: "/le/?nhom=anh-hung" },
        { label: page.ten },
      ]
    : [{ label: "Trang chủ", href: "/" }, { label: "Ngày lễ", href: "/le/" }, { label: page.ten }];

  const relatedItems = related.map((e) => leItem(leBySlug(e.slug)!, today));

  return (
    <ChShell activeMenu="Ngày lễ" className="ch-le">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="ch-wrap ch-main le-detail">
        <div className="vk-crumb">
          <Breadcrumb items={crumbs} jsonLd={false} />
        </div>

        <div className="ch-layout le-d-layout">
          <section className={`le-herocard n-${page.nhom} art-${art ? art.kind : "none"}`}>
            <div className="le-hero-text">
              <div className="ch-eyebrow">
                <Icon name={LE_LICH_ICON[lichKind]} size={15} />
                {LE_NHOM_LABEL[page.nhom]} · {badgeLich}
              </div>
              <h1 className="ch-h1">
                {page.tieuDe} {year} là ngày nào?
              </h1>
              <p className="ch-lead">{page.moTa}</p>
              {namGocOrMatLine && <p className="le-hero-line">{namGocOrMatLine}</p>}

              <dl className="le-when">
                <div>
                  <dt>Dương lịch</dt>
                  <dd>
                    {pad2(solar.day)}/{pad2(solar.month)}/{solar.year}
                  </dd>
                  <dd className="s">{WEEKDAY_LONG[weekday]}</dd>
                </div>
                <div>
                  <dt>Âm lịch</dt>
                  <dd>{lunarLabel} tháng</dd>
                  <dd className="s">Năm {canChi}</dd>
                </div>
                <div className="dem">
                  <dt>Còn lại</dt>
                  <dd>{soNgayConLai === 0 ? "Hôm nay" : `${soNgayConLai} ngày`}</dd>
                  <dd className="s">{soNgayConLai === 0 ? "Đúng ngày lễ" : "tính từ hôm nay"}</dd>
                </div>
              </dl>

              <div className="vk-meta le-meta">
                <a
                  className="btn"
                  href={googleCalendarUrl(`${page.tieuDe} ${year}`, solar, calDetails)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Thêm ${page.tieuDe} ${year} (${pad2(solar.day)}/${pad2(solar.month)}/${solar.year}) vào Google Calendar`}
                >
                  <Icon name="calPlus" size={17} />
                  Thêm vào lịch
                </a>
                <ShareButton
                  url={buildShareUrl(`/le/${page.slug}/`)}
                  title={`${page.tieuDe} ${year}`}
                  text={`${page.tieuDe} năm ${year} rơi vào ngày ${pad2(solar.day)}/${pad2(solar.month)}/${solar.year}.`}
                />
                {countdownSlug && (
                  <Link className="btn" href={`/countdown/${countdownSlug}/`}>
                    <Icon name="hourglass" size={17} />
                    Đếm ngược
                  </Link>
                )}
              </div>
            </div>

            <div className={tranhLichSu ? "le-hero-art has-note" : "le-hero-art"} aria-hidden={art?.kind === "photo" || tranhLichSu ? undefined : true}>
              {art?.kind === "img" && <HeritageImage src={art.src} alt="" />}
              {tranhLichSu && <span className="le-art-note">{page.slug === HCM_LE_SLUG ? HCM_TRANH_NOTE : "Tranh minh họa, không phải chân dung hay tư liệu lịch sử"}</span>}
              {art?.kind === "photo" && (
                <figure className="le-photo">
                  <img src="/le/ho-chi-minh-1946.jpg" alt="Chủ tịch Hồ Chí Minh năm 1946" />
                  <figcaption>Ảnh: Wikimedia Commons, phạm vi công cộng</figcaption>
                </figure>
              )}
              {art?.kind === "icon" && (
                <figure className="le-emblem">
                  <LeHeroIllustration slug={art.slug} />
                  <figcaption>Tranh minh họa, không phải chân dung hay tư liệu lịch sử</figcaption>
                </figure>
              )}
              {!art && (
                <div className="le-leaf">
                  <span className="wd">{WEEKDAY_LONG[weekday]}</span>
                  <b>{pad2(solar.day)}</b>
                  <span className="my">
                    Tháng {solar.month} · {solar.year}
                  </span>
                  <span className="lu">{lunarLabel} âm lịch</span>
                </div>
              )}
            </div>
          </section>

          <div className="le-d-main">
            <TocDetails
              className="vk-toc-m"
              summary={
                <>
                  <Icon name="list" size={19} />
                  Mục lục bài viết
                  <span className="n">{toc.length} mục</span>
                  <Icon name="chevron" size={18} className="chev" />
                </>
              }
            >
              {tocList}
            </TocDetails>

            <div className="ch-sidebox le-facts-m">
              <h2 className="vk-sidebox-h jade">
                <span className="dot">
                  <Icon name="note" size={18} />
                </span>
                Thông tin nhanh
              </h2>
              <div className="vk-sidebox-b">{factsBox}</div>
            </div>

            {page.nghiLe && (
              <div className="le-nghi">
                <div className="le-nghi-h">
                  <Icon name="calendar" size={20} />
                  Lịch nghỉ {page.tieuDe} {year}
                </div>
                <div className="le-nghi-g">
                  <div>
                    <span className="s">Cán bộ, công chức</span>
                    <b>Chờ Chính phủ công bố</b>
                  </div>
                  <div>
                    <span className="s">Doanh nghiệp</span>
                    <b>Theo thông báo của công ty</b>
                  </div>
                </div>
                <p>
                  Cập nhật theo thông báo chính thức. Số ngày nghỉ theo luật: {page.nghiLe.soNgay} ngày
                  {page.nghiLe.ghiChu ? ` (${page.nghiLe.ghiChu})` : ""}.
                </p>
              </div>
            )}

            {page.ngayPhu && <p className="le-phu">{page.ngayPhu}</p>}

            <Sec id="qua-cac-nam" icon="calendar" title={`${page.tieuDe} qua các năm`} wide>
              <table className="tuoitable le-table">
                <thead>
                  <tr>
                    <th>Năm</th>
                    <th>Âm lịch</th>
                    <th>Dương lịch</th>
                    <th>Thứ</th>
                    <th>Thêm vào lịch</th>
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
                          <Link href={dayHref(r.solar)}>
                            {pad2(r.solar.day)}/{pad2(r.solar.month)}/{r.solar.year}
                          </Link>
                          {isPast && <span className="letag xam">Đã qua</span>}
                          {isNext && <span className="letag son">Sắp tới</span>}
                        </td>
                        <td data-k="Thứ">{WEEKDAY_LONG[r.weekday]}</td>
                        <td data-k="Thêm vào lịch">
                          <a href={googleCalendarUrl(`${page.tieuDe} ${r.year}`, r.solar, calDetails)} target="_blank" rel="noopener noreferrer">
                            Google
                          </a>
                          {" · "}
                          <a href={icsDataUri(`${page.tieuDe} ${r.year}`, r.solar, page.slug, page.moTa)} download={`${page.slug}-${r.solar.year}.ics`}>
                            .ics
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Sec>

            <Sec id="y-nghia" icon="book" title={isHero ? `Đôi nét về ${page.ten}` : "Ý nghĩa"}>
              <div className="le-prose">
                {page.yNghia.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {hoSo && (
                <Link className="le-hoso" href={anhHungHref(hoSo.slug)}>
                  <Icon name="temple" size={18} />
                  <span>
                    <b>Tiểu sử {hoSo.ten}</b>
                    <small>Niên đại, bối cảnh lịch sử, công trạng và di tích — chuyên mục Anh hùng dân tộc</small>
                  </span>
                  <Icon name="arrow" size={18} />
                </Link>
              )}
            </Sec>

            {coBullets && (
              <Sec id="phong-tuc" icon={page.nhom === "am-lich" ? "lotus" : "flame"} title={page.nhom === "am-lich" ? "Phong tục thường gặp" : "Hoạt động"}>
                <ul className="vk-list one">
                  {(page.bullets ?? []).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Sec>
            )}

            <Sec id="chuan-bi" icon="bowl" title="Chuẩn bị cho ngày lễ">
              <div className="le-links">
                {vanKhanBai.length > 0 ? (
                  vanKhanBai.map((v) => (
                    <Link className="le-lk" href={`/van-khan/${v.slug}/`} key={v.slug}>
                      <Icon name="scroll" size={18} />
                      <span>
                        <b>{v.ten}</b>
                        <small>{v.moTa}</small>
                      </span>
                    </Link>
                  ))
                ) : (
                  <Link className="le-lk" href="/van-khan/">
                    <Icon name="scroll" size={18} />
                    <span>
                      <b>Văn khấn đi lễ</b>
                      <small>Tuyển tập bài khấn đầy đủ</small>
                    </span>
                  </Link>
                )}
                {countdownSlug && (
                  <Link className="le-lk" href={`/countdown/${countdownSlug}/`}>
                    <Icon name="hourglass" size={18} />
                    <span>
                      <b>
                        Đếm ngược {page.ten} {year}
                      </b>
                      <small>Số ngày còn lại, ngày dương và ngày âm</small>
                    </span>
                  </Link>
                )}
                {page.nghiLe && (
                  <Link className="le-lk" href={`/lich-nghi-le/${solar.year}/`}>
                    <Icon name="list" size={18} />
                    <span>
                      <b>Lịch nghỉ lễ {solar.year}</b>
                      <small>Các ngày nghỉ trong năm này</small>
                    </span>
                  </Link>
                )}
                <Link className="le-lk" href={dayHref(solar)}>
                  <Icon name="sun" size={18} />
                  <span>
                    <b>
                      Xem ngày {pad2(solar.day)}/{pad2(solar.month)}/{solar.year}
                    </b>
                    <small>Giờ hoàng đạo, sao tốt xấu của ngày này</small>
                  </span>
                </Link>
                <Link className="le-lk" href={monthHref(solar.month, solar.year)}>
                  <Icon name="calendar" size={18} />
                  <span>
                    <b>
                      Lịch tháng {solar.month}/{solar.year}
                    </b>
                    <small>Các ngày tốt quanh dịp lễ</small>
                  </span>
                </Link>
                {(page.lienKet ?? []).map((lk) => (
                  <Link className="le-lk" href={lk.href} key={lk.href}>
                    <Icon name="arrow" size={18} />
                    <span>
                      <b>{lk.label}</b>
                      <small>Xem thêm</small>
                    </span>
                  </Link>
                ))}
              </div>
            </Sec>

            {heroesKhac.length > 0 && (
              <Sec id="anh-hung-khac" icon="temple" title="Anh hùng dân tộc khác">
                <div className="le-heroes">
                  {heroesKhac.map((h) => (
                    <Link className="le-hc" href={`/le/${h.slug}/`} key={h.slug}>
                      <span className="pic">
                        {h.slug === HCM_LE_SLUG && leImage(h.slug) ? (
                          <img src={leImage(h.slug)!} alt={h.ten} />
                        ) : hasHeroIllustration(h.slug) ? (
                          <LeHeroIllustration slug={h.slug} />
                        ) : (
                          <LeFlagIllustration />
                        )}
                      </span>
                      <b>{h.ten}</b>
                      <small>
                        {h.namMat ? `Giỗ ${h.ngayChinh.am ? `${h.ngayChinh.am.ngay}/${h.ngayChinh.am.thang} âm lịch` : ""}` : "Xem chi tiết"}
                      </small>
                    </Link>
                  ))}
                </div>
              </Sec>
            )}

            <p className="srcnote le-src">
              Ngày dương lịch được tính (thiên văn, giờ Việt Nam UTC+7); ý nghĩa và phong tục là biên soạn của licham.app. Xem{" "}
              <Link href="/phuong-phap-tinh-lich/">phương pháp tính lịch</Link>.
            </p>

            <Sec id="hoi-dap" icon="question" title="Câu hỏi thường gặp">
              <div className="faqs vk-faq">
                {faqItems.map((f) => (
                  <div className="faq" key={f.q}>
                    <b>{f.q}</b>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>
            </Sec>

            <NhanVatLienQuan leSlug={page.slug} />
          </div>

          <aside className="ch-side le-d-side">
            <nav className="ch-sidebox le-toc" aria-labelledby="le-toc-h">
              <div className="vk-sidebox-h son" id="le-toc-h">
                <Icon name="list" size={20} />
                Mục lục bài viết
              </div>
              <div className="vk-sidebox-b">{tocList}</div>
            </nav>

            <div className="ch-sidebox le-facts-d">
              <h2 className="vk-sidebox-h jade">
                <span className="dot">
                  <Icon name="note" size={18} />
                </span>
                Thông tin nhanh
              </h2>
              <div className="vk-sidebox-b">{factsBox}</div>
            </div>

            {relatedItems.length > 0 && (
              <div className="ch-sidebox">
                <h2 className="vk-sidebox-h gold">
                  <Icon name="book" size={20} />
                  Ngày lễ liên quan
                </h2>
                <ul className="le-up">
                  {relatedItems.map((it) => (
                    <li key={it.slug}>
                      <Link href={`/le/${it.slug}/`}>
                        <LeDateTile day={it.day} month={it.month} tone={`n-${it.nhom}`} size="sm" />
                        <span className="t">
                          <b>{it.ten}</b>
                          <small>{it.rule}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="ch-sidebox">
              <h2 className="vk-sidebox-h son">
                <Icon name="calendar" size={20} />
                Ngày lễ sắp tới
              </h2>
              <ul className="le-up">
                {chips.map(({ page: p, next }) => (
                  <li key={p.slug}>
                    <Link href={`/le/${p.slug}/`}>
                      <LeDateTile day={next.solar.day} month={next.solar.month} tone={`n-${p.nhom}`} size="sm" />
                      <span className="t">
                        <b>{p.ten}</b>
                        <small>
                          {pad2(next.solar.day)}/{pad2(next.solar.month)}/{next.solar.year}
                        </small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="le-box-more" href="/le/">
                Xem tất cả ngày lễ
                <Icon name="arrow" size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </ChShell>
  );
}
