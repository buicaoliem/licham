import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dayOfWeek, jdFromDate } from "@licham/core";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { JsonLd } from "@/components/calendar/JsonLd";
import { ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { dayHref } from "@/lib/calendar/urls";
import { WEEKDAY_LONG, pad2 } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { MUA_LABEL, NGUON_TIET_KHI, TIET_KHI, tietKhiArt, tietKhiBySlug, tietKhiHref, tietKhiKeCan, tietKhiNgay, wikiTietUrl } from "@/lib/tiet-khi";
import { getVietnamToday } from "@/lib/today";

export const dynamicParams = false;
// "Tiết kế tiếp" và số ngày còn lại tính theo ngày hôm nay (giờ Việt Nam).
export const revalidate = 300;

export function generateStaticParams() {
  return TIET_KHI.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = tietKhiBySlug(slug);
  if (!t) return {};
  const year = getVietnamToday().year;
  const d = tietKhiNgay(t, year);
  const full = `Tiết ${t.ten} năm ${year} bắt đầu ngày ${pad2(d.day)}/${pad2(d.month)}, kinh độ Mặt Trời ${t.kinhDo}°. ${t.nghia} ${t.dongA}`;
  const description = full.length > 160 ? `${full.slice(0, 157).replace(/\s+\S*$/, "")}…` : full;
  return {
    title: `Tiết ${t.ten} ${year}: ngày bắt đầu, ý nghĩa, thời tiết | Lịch Âm`,
    description,
    alternates: { canonical: tietKhiHref(t.slug) },
    openGraph: { title: `Tiết ${t.ten}`, description, url: tietKhiHref(t.slug), type: "article", ...(tietKhiArt(t) ? { images: [tietKhiArt(t)!] } : {}) },
  };
}

function jd(d: { day: number; month: number; year: number }): number {
  return jdFromDate(d.day, d.month, d.year);
}

export default async function TietKhiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tietKhiBySlug(slug);
  if (!t) notFound();

  const today = getVietnamToday();
  const art = tietKhiArt(t);
  const { prev, next } = tietKhiKeCan(t.slug);
  const namNay = tietKhiNgay(t, today.year);
  const keTiep = jd(namNay) >= jd(today) ? namNay : tietKhiNgay(t, today.year + 1);
  const conLai = jd(keTiep) - jd(today);
  const cacNam = [-1, 0, 1, 2, 3].map((k) => tietKhiNgay(t, today.year + k));
  const weekday = (d: { day: number; month: number; year: number }) => WEEKDAY_LONG[dayOfWeek(jd(d))]!;

  const crumbs = [{ label: "Trang chủ", href: "/" }, { label: "24 tiết khí", href: "/kien-thuc/tiet-khi/" }, { label: `Tiết ${t.ten}` }];
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Tiết ${t.ten}`,
    description: `${t.nghia} ${t.dongA}`,
    inLanguage: "vi",
    mainEntityOfPage: `${SITE_URL}${tietKhiHref(t.slug)}`,
    ...(art ? { image: `${SITE_URL}${art}` } : {}),
    author: { "@type": "Organization", name: "licham.app", url: SITE_URL },
    publisher: { "@type": "Organization", name: "licham.app", url: SITE_URL },
  };

  return (
    <ChShell activeMenu="Ngày lễ" className="ch-tk">
      <JsonLd data={article} />
      <div className="ch-wrap ch-main tk-detail">
        <div className="vk-crumb">
          <Breadcrumb items={crumbs} />
        </div>

        <section className={`tk-hero m-${t.mua}`}>
          <div className="tk-hero-art">
            {art && <img src={art} alt={`Tranh minh họa tiết ${t.ten} của licham.app`} width={1448} height={1086} fetchPriority="high" />}
            {art && <span className="tk-art-note">Tranh minh họa của licham.app</span>}
          </div>
          <div className="tk-hero-text">
            <div className="ch-eyebrow">
              <Icon name="sun" size={15} />
              {MUA_LABEL[t.mua]} · {t.loai === "trung-khi" ? "Trung khí" : "Tiết"}
            </div>
            <h1 className="ch-h1">Tiết {t.ten}</h1>
            <p className="tk-han">
              <span lang="zh-Hant">{t.han}</span> · {t.tenAnh}
            </p>
            <p className="ch-lead">{t.nghia}</p>
            <dl className="tk-facts">
              <div>
                <dt>Bắt đầu năm {namNay.year}</dt>
                <dd>
                  <Link href={dayHref(namNay)}>
                    {pad2(namNay.day)}/{pad2(namNay.month)}/{namNay.year}
                  </Link>
                </dd>
                <dd className="s">{weekday(namNay)}</dd>
              </div>
              <div>
                <dt>Kinh độ Mặt Trời</dt>
                <dd>{t.kinhDo}°</dd>
                <dd className="s">{t.loai === "trung-khi" ? "trung khí" : "tiết"}</dd>
              </div>
              <div className="dem">
                <dt>Lần tới</dt>
                <dd>{conLai === 0 ? "Hôm nay" : `${conLai} ngày`}</dd>
                <dd className="s">
                  {pad2(keTiep.day)}/{pad2(keTiep.month)}/{keTiep.year}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="ch-layout tk-layout">
          <div className="tk-body">
            <section className="lc-card" aria-labelledby="tk-y-h">
              <div className="lc-card-h">
                <span className="lc-ic jade" aria-hidden="true">
                  <Icon name="book" size={20} />
                </span>
                <div className="t">
                  <h2 id="tk-y-h">Ý nghĩa tiết {t.ten}</h2>
                </div>
              </div>
              <div className="tk-prose">
                <p>
                  <b>Theo lịch pháp Đông Á:</b> {t.dongA}
                </p>
                {t.vietNam && (
                  <p>
                    <b>Ở Việt Nam:</b> {t.vietNam}
                  </p>
                )}
                <p>
                  Tiết {t.ten} bắt đầu khi Mặt Trời ở kinh độ hoàng đạo {t.kinhDo}° và kéo dài khoảng 15 ngày, đến khi Mặt Trời tới {(t.kinhDo + 15) % 360}° (
                  <Link href={tietKhiHref(next.slug)}>tiết {next.ten}</Link>).
                </p>
              </div>
            </section>

            <section className="lc-card" aria-labelledby="tk-nam-h">
              <div className="lc-card-h">
                <span className="lc-ic" aria-hidden="true">
                  <Icon name="calendar" size={20} />
                </span>
                <div className="t">
                  <h2 id="tk-nam-h">Ngày bắt đầu tiết {t.ten} các năm</h2>
                  <p>Theo giờ Việt Nam (UTC+7), tính từ vị trí Mặt Trời.</p>
                </div>
              </div>
              <ul className="tk-years">
                {cacNam.map((d) => (
                  <li key={d.year} className={d.year === keTiep.year ? "ke" : undefined}>
                    <span className="y">{d.year}</span>
                    <Link href={dayHref(d)}>
                      {pad2(d.day)}/{pad2(d.month)}/{d.year}
                    </Link>
                    <span className="w">{weekday(d)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="tk-caveat">
              <b>Lưu ý về khí hậu</b>
              <p>
                Tên và ý nghĩa 24 tiết khí phản ánh khí hậu vùng trung nguyên Trung Quốc thời cổ. Ở Việt Nam, hệ tiết khí gần với thời tiết miền Bắc hơn; miền
                Nam chỉ có mùa mưa và mùa khô, và các tiết mang tên tuyết, sương giá không mô tả thời tiết thực tế của phần lớn lãnh thổ.
              </p>
            </aside>

            <section className="lc-card" aria-labelledby="tk-src-h">
              <div className="lc-card-h">
                <span className="lc-ic gold" aria-hidden="true">
                  <Icon name="scroll" size={20} />
                </span>
                <div className="t">
                  <h2 id="tk-src-h">Nguồn tham khảo</h2>
                </div>
              </div>
              <ul className="tk-src">
                {t.nguon.map((k) =>
                  k === "wiki-tiet" ? (
                    <li key={k}>
                      <a href={wikiTietUrl(t.ten)} target="_blank" rel="noopener noreferrer">
                        Wikipedia tiếng Việt, “{t.ten}”
                      </a>
                    </li>
                  ) : (
                    <li key={k}>
                      <a href={NGUON_TIET_KHI[k].url} target="_blank" rel="noopener noreferrer">
                        {NGUON_TIET_KHI[k].ten}
                      </a>
                    </li>
                  ),
                )}
                <li>
                  Ngày bắt đầu: tính từ vị trí Mặt Trời theo giờ Việt Nam (UTC+7), xem <Link href="/phuong-phap-tinh-lich/">phương pháp tính lịch</Link>.
                </li>
              </ul>
            </section>

            <nav className="tk-pager" aria-label="Tiết khí trước và sau">
              <Link className="prev" href={tietKhiHref(prev.slug)}>
                <small>Tiết trước</small>
                <b>{prev.ten}</b>
              </Link>
              <Link className="next" href={tietKhiHref(next.slug)}>
                <small>Tiết sau</small>
                <b>{next.ten}</b>
              </Link>
            </nav>
          </div>

          <aside className="ch-side">
            <nav className="ch-sidebox" aria-labelledby="tk-all-h">
              <div className="vk-sidebox-h jade" id="tk-all-h">
                <Icon name="sun" size={20} />
                24 tiết khí
              </div>
              <ol className="tk-all">
                {TIET_KHI.map((x) => (
                  <li key={x.slug} className={`m-${x.mua}${x.slug === t.slug ? " on" : ""}`}>
                    <Link href={tietKhiHref(x.slug)} aria-current={x.slug === t.slug ? "page" : undefined}>
                      {x.ten}
                      <small>{x.kinhDo}°</small>
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="tk-all-more">
                <Link href="/kien-thuc/tiet-khi/">Tiết khí là gì</Link> · <Link href="/le/?nhom=tiet-khi">Lịch tiết khí năm {today.year}</Link>
              </p>
            </nav>
          </aside>
        </div>
      </div>
    </ChShell>
  );
}
