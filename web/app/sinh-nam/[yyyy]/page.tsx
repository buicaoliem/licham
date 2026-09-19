import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { YEAR_END, YEAR_START } from "@/lib/site-years";
import { SINH_NAM_MAX, SINH_NAM_MIN, sinhNamInfo, sinhNamTrongPhamVi, sinhNamYears } from "@/lib/sinh-nam";
import { goiYTenTheoNam } from "@/lib/ten";
import { getVietnamToday } from "@/lib/today";
import { canChiSlug } from "@/lib/tuoi";

export function generateStaticParams() {
  return sinhNamYears().map((yyyy) => ({ yyyy: String(yyyy) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ yyyy: string }> }): Promise<Metadata> {
  const { yyyy } = await params;
  const year = Number(yyyy);
  if (!sinhNamTrongPhamVi(year)) return { robots: { index: false, follow: false } };
  const today = getVietnamToday();
  const info = sinhNamInfo(year, today.year);
  return {
    title: `Sinh năm ${year} tuổi gì, mệnh gì? ${info.canChi.name} | Lịch Âm`,
    description: `Sinh năm ${year}: can chi ${info.canChi.name}, con giáp ${info.canChi.chi}, mệnh nạp âm ${info.canChi.napAm.name}, tuổi mụ năm ${today.year}.`,
    alternates: { canonical: `/sinh-nam/${year}/` },
  };
}

export default async function SinhNamPage({ params }: { params: Promise<{ yyyy: string }> }) {
  const { yyyy } = await params;
  const year = Number(yyyy);
  if (!sinhNamTrongPhamVi(year)) notFound();

  const today = getVietnamToday();
  const info = sinhNamInfo(year, today.year);
  const prev = year > SINH_NAM_MIN ? year - 1 : null;
  const next = year < SINH_NAM_MAX ? year + 1 : null;
  const tenGoiY = goiYTenTheoNam(year).slice(0, 10);
  const tuViNamHref =
    today.year >= YEAR_START && today.year <= YEAR_END ? `/tu-vi/${info.chiSlug}/${today.year}` : "/tu-vi";

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <Link href="/tuoi">Xem tuổi</Link> › Sinh năm {year}
          </div>
          <h1>
            Sinh năm {year}: tuổi {info.canChi.name}, mệnh {info.canChi.napAm.name}
          </h1>
          <p className="sub">{info.uniqueIntro}</p>
        </div>

        <div className="body">
          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t">Số liệu năm {year}</span>
              <span className="rule" />
            </div>
            <div className="diresrow">
              <span>Can chi</span>
              <span>
                <Link href={info.canChiPath}>{info.canChi.name}</Link>
              </span>
            </div>
            <div className="diresrow">
              <span>Con giáp</span>
              <span>
                <Link href={info.chiPath}>
                  {info.canChi.chi} ({info.conGiap})
                </Link>
              </span>
            </div>
            <div className="diresrow">
              <span>Nạp âm</span>
              <span>
                {info.canChi.napAm.name} — hành {info.canChi.napAm.element}
              </span>
            </div>
            <div className="diresrow">
              <span>Tuổi mụ năm {today.year}</span>
              <span>{info.tuoiMuHienTai} (nếu đúng năm âm {year})</span>
            </div>
          </div>

          {tenGoiY.length > 0 && (
            <div className="box" style={{ marginTop: 18 }}>
              <div className="box-h">
                <span className="rule" />
                <span className="t">Gợi ý tên theo mệnh năm {year}</span>
                <span className="rule" />
              </div>
              <p>
                Theo tục hành chữ sinh mệnh {info.canChi.napAm.element} hoặc cùng hành — không ghép họ. Xem nghĩa từng
                chữ ở trang tên.
              </p>
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

          <h2 className="hh" style={{ marginTop: 32 }}>
            Có thể anh cần
          </h2>
          <div className="chips">
            <Link className="chip" href="/tinh-tuoi">
              Tính tuổi theo ngày sinh
            </Link>
            <Link className="chip" href={`/tuoi/${canChiSlug(info.canChi)}`}>
              Tuổi {info.canChi.name}
            </Link>
            <Link className="chip" href={tuViNamHref}>
              Tử vi tuổi {info.canChi.chi} năm {today.year}
            </Link>
            <Link className="chip" href={`/tu-vi/${info.chiSlug}`}>
              Tử vi tuổi {info.canChi.chi} hôm nay
            </Link>
            <Link className="chip" href="/xem-ngay-tot/cuoi-hoi">
              Ngày tốt cưới hỏi
            </Link>
            {prev && (
              <Link className="chip" href={`/sinh-nam/${prev}`}>
                Năm {prev}
              </Link>
            )}
            {next && (
              <Link className="chip" href={`/sinh-nam/${next}`}>
                Năm {next}
              </Link>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
