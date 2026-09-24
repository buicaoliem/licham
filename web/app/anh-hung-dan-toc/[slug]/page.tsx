import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { JsonLd } from "@/components/calendar/JsonLd";
import { AhArtView, AhCard, anhHungArt } from "@/components/heritage/AnhHungParts";
import { ChShell } from "@/components/heritage/ChShell";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { ANH_HUNG, anhHungBySlug, anhHungCungThoi, anhHungHref, anhHungKeCan, thoiKyLabel, wikiUrl } from "@/lib/anh-hung";
import { leItem } from "@/lib/le-hub";
import { leBySlug } from "@/lib/le";
import { SITE_URL } from "@/lib/site";
import { getVietnamToday } from "@/lib/today";

export const dynamicParams = false;
// Ngày giỗ kế tiếp và số ngày còn lại tính theo giờ Việt Nam.
export const revalidate = 300;

export function generateStaticParams() {
  return ANH_HUNG.map((a) => ({ slug: a.slug }));
}

function moTaMeta(a: NonNullable<ReturnType<typeof anhHungBySlug>>): string {
  const s = `${a.ten} (${a.nienDai}): ${a.tomTat}`;
  return s.length > 158 ? `${s.slice(0, 155).replace(/\s+\S*$/, "")}…` : s;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = anhHungBySlug(slug);
  if (!a) return {};
  const title = `${a.ten}: tiểu sử, công trạng, di tích và ngày tưởng niệm | Lịch Âm`;
  const description = moTaMeta(a);
  return {
    title,
    description,
    alternates: { canonical: anhHungHref(slug) },
    openGraph: {
      title: `${a.ten} — anh hùng dân tộc`,
      description,
      url: anhHungHref(slug),
      type: "profile",
    },
  };
}

function Sec({ id, icon, title, children, tone = "son" }: { id: string; icon: IconName; title: string; children: ReactNode; tone?: "son" | "jade" | "gold" }) {
  return (
    <section className="lc-card ah-sec" id={id} aria-labelledby={`${id}-h`}>
      <div className="lc-card-h">
        <span className={`lc-ic ${tone}`} aria-hidden="true">
          <Icon name={icon} size={20} />
        </span>
        <div className="t">
          <h2 id={`${id}-h`}>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

/** Năm dạng số (có thể âm) cho JSON-LD; bỏ qua năm không chắc chắn ("khoảng", "?"). */
function namChac(s: string | null): string | undefined {
  return s && /^\d{1,4}$/.test(s.trim()) ? s.trim().padStart(4, "0") : undefined;
}

export default async function AnhHungPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = anhHungBySlug(slug);
  if (!a) notFound();

  const today = getVietnamToday();
  const art = anhHungArt(a);
  const le = a.leSlug ? leBySlug(a.leSlug) : undefined;
  const leInfo = le ? leItem(le, today) : null;
  const { prev, next } = anhHungKeCan(a.slug);
  const cungThoi = anhHungCungThoi(a, 3);
  const url = `${SITE_URL}${anhHungHref(a.slug)}`;

  const crumbs = [{ label: "Trang chủ", href: "/" }, { label: "Anh hùng dân tộc", href: "/anh-hung-dan-toc/" }, { label: a.ten }];

  const person = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    inLanguage: "vi",
    name: `${a.ten} — tiểu sử`,
    mainEntity: {
      "@type": "Person",
      name: a.ten,
      ...(a.tenThat ? { alternateName: [a.tenThat, ...a.tenKhac] } : a.tenKhac.length ? { alternateName: a.tenKhac } : {}),
      description: a.tomTat,
      ...(namChac(a.namSinh) ? { birthDate: namChac(a.namSinh) } : {}),
      ...(namChac(a.namMat) ? { deathDate: namChac(a.namMat) } : {}),
      homeLocation: { "@type": "Place", name: a.queQuan },
      sameAs: [wikiUrl(a.wikiTitle)],
    },
  };

  const factList: { icon: IconName; k: string; v: string }[] = [
    { icon: "hourglass", k: "Niên đại", v: a.nienDai },
    ...(a.tenThat ? [{ icon: "user" as IconName, k: "Tên thật", v: a.tenThat }] : []),
    { icon: "temple", k: "Triều đại", v: a.trieuDai },
    { icon: "home", k: "Quê quán", v: a.queQuan },
  ];
  // Ô ngắn xếp trước theo cặp, ô dài (hoặc ô ngắn lẻ cuối) chiếm cả hàng — không để ô trống nửa hàng.
  const ngan = factList.filter((f) => f.v.length <= 32).map((f) => ({ ...f, wide: false }));
  if (ngan.length % 2 === 1) ngan[ngan.length - 1]!.wide = true;
  const facts = [...ngan, ...factList.filter((f) => f.v.length > 32).map((f) => ({ ...f, wide: true }))];

  const toc = [
    { id: "tieu-su", label: "Tiểu sử" },
    { id: "boi-canh", label: "Bối cảnh lịch sử" },
    { id: "cong-trang", label: "Công trạng" },
    { id: "su-kien", label: "Sự kiện tiêu biểu" },
    ...(a.diTich.length || a.tuongNiem.length || le ? [{ id: "tuong-niem", label: "Di tích & ngày tưởng niệm" }] : []),
    { id: "nguon", label: "Nguồn tư liệu" },
  ];

  return (
    <ChShell activeMenu={null} className="ch-ah">
      <JsonLd data={person} />
      <div className="ch-wrap ch-main ah-detail">
        <div className="vk-crumb">
          <Breadcrumb items={crumbs} />
        </div>

        <section className={`ah-profile tk-${a.thoiKy}`}>
          <div className="ah-profile-art">
            <AhArtView a={a} art={art} eager alt />
            <span className="ah-art-note">
              {art?.kind === "photo" ? "Ảnh: Wikimedia Commons, phạm vi công cộng" : "Tranh minh họa của licham.app, không phải chân dung hay tư liệu lịch sử"}
            </span>
          </div>
          <div className="ah-profile-text">
            <div className="ch-eyebrow">
              <Icon name="temple" size={15} />
              {thoiKyLabel(a.thoiKy)} · {a.trieuDai}
            </div>
            <h1 className="ch-h1">{a.ten}</h1>
            {a.tenKhac.length > 0 && <p className="ah-aka">{a.tenKhac.join(" · ")}</p>}
            <p className="ch-lead">{a.tomTat}</p>
            {a.tieuBieu2013 && (
              <p className="ah-honor">
                <Icon name="flame" size={16} />
                Một trong 14 vị anh hùng dân tộc tiêu biểu do Bộ Văn hóa, Thể thao và Du lịch công bố năm 2013
              </p>
            )}
            <dl className="ah-facts">
              {facts.map((f) => (
                <div key={f.k} className={f.wide ? "wide" : undefined}>
                  <dt>
                    <Icon name={f.icon} size={15} />
                    {f.k}
                  </dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
            {le && leInfo && (
              <Link className="ah-le-link" href={`/le/${le.slug}/`}>
                <span className="ah-le-date" aria-hidden="true">
                  <b>{String(leInfo.day).padStart(2, "0")}</b>
                  <span>TH {leInfo.month}</span>
                </span>
                <span className="ah-le-t">
                  <b>{le.tieuDe}</b>
                  <small>
                    {leInfo.rule} · {leInfo.daysLeft === 0 ? "hôm nay" : `còn ${leInfo.daysLeft} ngày`} ({String(leInfo.day).padStart(2, "0")}/
                    {String(leInfo.month).padStart(2, "0")}/{leInfo.year})
                  </small>
                </span>
                <Icon name="arrow" size={18} />
              </Link>
            )}
          </div>
        </section>

        <div className="ch-layout ah-layout">
          <div className="ah-body">
            <Sec id="tieu-su" icon="user" title="Tiểu sử">
              <div className="ah-prose">
                {a.tieuSu.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Sec>

            <Sec id="boi-canh" icon="book" title="Bối cảnh lịch sử" tone="jade">
              <div className="ah-prose">
                {a.boiCanh.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Sec>

            <Sec id="cong-trang" icon="flame" title="Công trạng" tone="gold">
              <ul className="ah-merits">
                {a.congTrang.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Sec>

            <Sec id="su-kien" icon="history" title="Sự kiện tiêu biểu">
              <ol className="ah-events">
                {a.suKien.map((e) => (
                  <li key={e.nam + e.text}>
                    <span className="y">{e.nam}</span>
                    <span className="t">{e.text}</span>
                  </li>
                ))}
              </ol>
            </Sec>

            {(a.diTich.length > 0 || a.tuongNiem.length > 0 || le) && (
              <Sec id="tuong-niem" icon="temple" title="Di tích, đền thờ và ngày tưởng niệm" tone="jade">
                {a.diTich.length > 0 && (
                  <ul className="ah-places">
                    {a.diTich.map((d) => (
                      <li key={d.ten}>
                        <b>{d.ten}</b>
                        <span>{d.diaDiem}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {a.tuongNiem.length > 0 && (
                  <ul className="ah-memo">
                    {a.tuongNiem.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {le && (
                  <p className="ah-memo-link">
                    Xem ngày âm – dương lịch các năm, cách tính và văn khấn tại trang <Link href={`/le/${le.slug}/`}>{le.tieuDe}</Link>.
                  </p>
                )}
              </Sec>
            )}

            {a.ghiChuSuLieu && (
              <aside className="ah-note">
                <b>Ghi chú sử liệu</b>
                <p>{a.ghiChuSuLieu}</p>
              </aside>
            )}

            <Sec id="nguon" icon="scroll" title="Nguồn tư liệu" tone="gold">
              <ul className="ah-sources">
                <li>
                  Wikipedia tiếng Việt,{" "}
                  <a href={wikiUrl(a.wikiTitle)} target="_blank" rel="noopener noreferrer">
                    “{a.wikiTitle}”
                  </a>{" "}
                  — nguồn tóm lược niên đại, quê quán và sự kiện; truy cập 24/9/2026.
                </li>
                {a.tieuBieu2013 && <li>Bộ Văn hóa, Thể thao và Du lịch, văn bản số 2296/BVHTTDL-MTNATL (21/6/2013) về 14 vị anh hùng dân tộc tiêu biểu.</li>}
                {le && (
                  <li>
                    Ngày giỗ/tưởng niệm: trang <Link href={`/le/${le.slug}/`}>{le.tieuDe}</Link> của licham.app; ngày dương lịch tính từ lõi lịch âm dương (giờ
                    Việt Nam).
                  </li>
                )}
                <li>
                  {art?.kind === "photo"
                    ? "Ảnh: Wikimedia Commons, phạm vi công cộng."
                    : "Tranh / hình minh họa: sáng tác của licham.app, mang tính nghệ thuật, không phải chân dung hay tư liệu lịch sử."}
                </li>
              </ul>
            </Sec>

            <nav className="ah-pager" aria-label="Nhân vật trước và sau trên dòng thời gian">
              {prev ? (
                <Link className="prev" href={anhHungHref(prev.slug)}>
                  <small>Trước</small>
                  <b>{prev.ten}</b>
                  <span>{prev.nienDai}</span>
                </Link>
              ) : (
                <span />
              )}
              <Link className="mid" href="/anh-hung-dan-toc/#dong-thoi-gian">
                Dòng thời gian
              </Link>
              {next ? (
                <Link className="next" href={anhHungHref(next.slug)}>
                  <small>Sau</small>
                  <b>{next.ten}</b>
                  <span>{next.nienDai}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>

          <aside className="ch-side ah-side">
            <nav className="ch-sidebox" aria-labelledby="ah-toc-h">
              <div className="vk-sidebox-h son" id="ah-toc-h">
                <Icon name="list" size={20} />
                Mục lục
              </div>
              <div className="vk-sidebox-b">
                <ol className="ah-toc">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.label}</a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
            {cungThoi.length > 0 && (
              <div className="ch-sidebox">
                <h2 className="vk-sidebox-h gold">
                  <Icon name="temple" size={20} />
                  Cùng thời kỳ
                </h2>
                <div className="vk-sidebox-b ah-side-list">
                  {cungThoi.map((x) => (
                    <Link href={anhHungHref(x.slug)} key={x.slug}>
                      <b>{x.ten}</b>
                      <small>{x.nienDai}</small>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        <section className="ah-more" aria-labelledby="ah-more-h">
          <h2 className="ch-h2" id="ah-more-h">
            Anh hùng dân tộc khác
          </h2>
          <ul className="ah-grid compact">
            {ANH_HUNG.filter((x) => x.slug !== a.slug && x.thoiKy !== a.thoiKy)
              .filter((_, i, arr) => i % Math.max(1, Math.floor(arr.length / 4)) === 0)
              .slice(0, 4)
              .map((x) => (
                <li key={x.slug}>
                  <AhCard a={x} art={anhHungArt(x)} />
                </li>
              ))}
          </ul>
        </section>
      </div>
    </ChShell>
  );
}
