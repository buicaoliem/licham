import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { SINH_NAM_MAX, SINH_NAM_MIN } from "@/lib/sinh-nam";
import { goiYTenTheoNam } from "@/lib/ten";
import { CON_GIAP_LIST, QUAN_HE_LABEL, conGiapBySlug } from "@/lib/tu-vi";
import { TU_VI_NAM_END, TU_VI_NAM_START, tuViNamInfo, tuViNamParams, tuViNamTrongPhamVi } from "@/lib/tu-vi-nam";
import { canChiSlug } from "@/lib/tuoi";

export function generateStaticParams() {
  return tuViNamParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; nam: string }>;
}): Promise<Metadata> {
  const { slug, nam } = await params;
  const giap = conGiapBySlug(slug);
  const year = Number(nam);
  if (!giap || !tuViNamTrongPhamVi(year)) return { robots: { index: false, follow: false } };
  const info = tuViNamInfo(giap, year);
  return {
    title: `Tử vi tuổi ${giap.ten} năm ${year} (${info.canChiNam.name}) | Lịch Âm`,
    description: `Tuổi ${giap.ten} năm ${year}: ${info.canChiNam.name}, mệnh năm ${info.canChiNam.napAm.name}, ${QUAN_HE_LABEL[info.quanHe]}. Kim Lâu, Hoang Ốc theo từng năm sinh.`,
    alternates: { canonical: `/tu-vi/${slug}/${year}/` },
  };
}

export default async function TuViNamPage({ params }: { params: Promise<{ slug: string; nam: string }> }) {
  const { slug, nam } = await params;
  const giap = conGiapBySlug(slug);
  const year = Number(nam);
  if (!giap || !tuViNamTrongPhamVi(year)) notFound();

  const info = tuViNamInfo(giap, year);
  const tenGoiY = goiYTenTheoNam(year).slice(0, 8);
  const prev = year > TU_VI_NAM_START ? year - 1 : null;
  const next = year < TU_VI_NAM_END ? year + 1 : null;

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Tử vi" />

        <div className="band">
          <div className="bg bg-kim" />
          <div className="band-in">
            <div className="crumb" style={{ marginBottom: 10 }}>
              <Link href="/">Trang chủ</Link> › <Link href="/tu-vi">Tử vi</Link> ›{" "}
              <Link href={`/tu-vi/${giap.slug}`}>{giap.ten}</Link> › Năm {year}
            </div>
            <h1>
              Tử vi tuổi {giap.ten} năm {year} — {info.canChiNam.name}
            </h1>
            <p>
              Mệnh năm {info.canChiNam.napAm.name} (hành {info.canChiNam.napAm.element}) — nạp âm của năm {year}, không
              phải một hành cho mọi người tuổi {giap.ten}.
            </p>
          </div>
        </div>

        <div className="body">
          <div className="box">
            <p>{info.luan}</p>
            {info.napAmMoTa && <p>{info.napAmMoTa}</p>}
          </div>

          <div className="cols2" style={{ marginTop: 16 }}>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Năm {year} với tuổi {giap.ten}</span>
                <span className="rule" />
              </div>
              <div className="diresrow">
                <span>Can chi năm</span>
                <span>
                  <Link href={`/tuoi/${canChiSlug(info.canChiNam)}`}>{info.canChiNam.name}</Link>
                </span>
              </div>
              <div className="diresrow">
                <span>Quan hệ chi</span>
                <span>{QUAN_HE_LABEL[info.quanHe]}</span>
              </div>
              <div className="diresrow">
                <span>Năm tuổi</span>
                <span>{info.namTuoi ? "Có" : "Không"}</span>
              </div>
              <div className="diresrow">
                <span>Tam tai</span>
                <span>
                  {info.tamTai ? `Phạm (tuổi ${giap.ten} kỵ năm ${info.tamTaiNam})` : `Không — kỵ ${info.tamTaiNam}`}
                </span>
              </div>
            </div>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Khác tử vi hôm nay</span>
                <span className="rule" />
              </div>
              <p>
                Trang này luận theo <b>năm</b> {year}.{" "}
                <Link href={`/tu-vi/${giap.slug}`}>Tử vi tuổi {giap.ten} hôm nay</Link> luận theo can chi <b>ngày</b>. Hai
                trang không copy một đoạn.
              </p>
            </div>
          </div>

          <div className="box" style={{ marginTop: 16 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Từng năm sinh tuổi {giap.ten} — hạn năm {year}</span>
              <span className="rule" />
            </div>
            <table className="tuoitable">
              <thead>
                <tr>
                  <th>Năm sinh</th>
                  <th>Can chi</th>
                  <th>Tuổi mụ {year}</th>
                  <th>Kim Lâu</th>
                  <th>Hoang Ốc</th>
                </tr>
              </thead>
              <tbody>
                {info.birthRows.map((r) => (
                  <tr key={r.namSinh}>
                    <td data-k="Năm sinh">
                      {r.namSinh >= SINH_NAM_MIN && r.namSinh <= SINH_NAM_MAX ? (
                        <Link href={`/sinh-nam/${r.namSinh}`}>{r.namSinh}</Link>
                      ) : (
                        r.namSinh
                      )}
                    </td>
                    <td data-k="Can chi">{r.canChi}</td>
                    <td data-k="Tuổi mụ">{r.tuoiMu}</td>
                    <td data-k="Kim Lâu">{r.kimLau}</td>
                    <td data-k="Hoang Ốc">{r.hoangOc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
              Kim Lâu / Hoang Ốc theo tuổi mụ từng người. Sinh trước Tết nhập ngày đủ ở tính tuổi.
            </p>
          </div>

          {tenGoiY.length > 0 && (
            <div className="box" style={{ marginTop: 16 }}>
              <div className="box-h">
                <span className="rule" />
                <span className="t">Đặt tên năm {year}</span>
                <span className="rule" />
              </div>
              <p>Gợi ý chữ theo nạp âm năm {year} ({info.canChiNam.napAm.name}), không ghép họ.</p>
              <div className="chips">
                {tenGoiY.map((t) => (
                  <Link className="chip" href={`/ten/${t.slug}`} key={t.slug}>
                    {t.ten}
                  </Link>
                ))}
                <Link className="chip" href="/ten">
                  Từ điển tên
                </Link>
              </div>
            </div>
          )}

          <TraditionalDisclaimer />

          <div className="pn">
            {prev ? <Link href={`/tu-vi/${giap.slug}/${prev}`}>‹ Năm {prev}</Link> : <span />}
            {next ? <Link href={`/tu-vi/${giap.slug}/${next}`}>Năm {next} ›</Link> : <span />}
          </div>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Tuổi khác năm {year}
          </h2>
          <div className="chips">
            {CON_GIAP_LIST.filter((c) => c.slug !== giap.slug).map((c) => (
              <Link className="chip" href={`/tu-vi/${c.slug}/${year}`} key={c.slug}>
                {c.ten}
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
