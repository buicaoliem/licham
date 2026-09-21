import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { TEN_LIST, namKhopTen, tenBySlug, tenCungHanh } from "@/lib/ten";
import { getVietnamToday } from "@/lib/today";

export function generateStaticParams() {
  return TEN_LIST.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = tenBySlug(slug);
  if (!t) return { robots: { index: false, follow: false } };
  const year = getVietnamToday().year;
  return {
    title: `Tên ${t.ten} (${t.chuHan}) nghĩa là gì? Gợi ý năm ${year} | Lịch Âm`,
    description: `${t.ten} (${t.chuHan}): ${t.nghia}. ${t.nguon}. Hành chữ ${t.hanh}, gợi ý theo nạp âm năm sinh.`,
    alternates: { canonical: `/ten/${slug}/` },
  };
}

export default async function TenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tenBySlug(slug);
  if (!t) notFound();

  const year = getVietnamToday().year;
  const cungHanh = tenCungHanh(t.hanh, t.slug).slice(0, 8);
  const namKhop = namKhopTen(t);
  const gioiLabel = t.gioi === "nam" ? "thường đặt cho nam" : t.gioi === "nu" ? "thường đặt cho nữ" : "dùng được cho cả hai giới";

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <Link href="/ten/">Đặt tên</Link> › {t.ten}
          </div>
          <h1>
            Tên {t.ten} ({t.chuHan}): {t.nghia}
          </h1>
          <p className="sub">{t.luan}</p>
        </div>

        <div className="body">
          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t">Chữ và nguồn</span>
              <span className="rule" />
            </div>
            <div className="diresrow">
              <span>Chữ Hán</span>
              <span>{t.chuHan}</span>
            </div>
            <div className="diresrow">
              <span>Nghĩa</span>
              <span>{t.nghia}</span>
            </div>
            <div className="diresrow">
              <span>Nguồn</span>
              <span>{t.nguon}</span>
            </div>
            <div className="diresrow">
              <span>Hành theo chữ</span>
              <span>{t.hanh}</span>
            </div>
            <div className="diresrow">
              <span>Giới theo tục</span>
              <span>{gioiLabel}</span>
            </div>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Năm sinh hay được gợi ý {t.ten}</span>
              <span className="rule" />
            </div>
            <p>
              Theo tục hành chữ sinh mệnh năm hoặc cùng hành nạp âm năm (không phải mệnh con giáp). Trong 2024–2031, tên{" "}
              {t.ten} khớp: {namKhop.length > 0 ? namKhop.join(", ") : "không năm nào trong dải — vẫn dùng được nếu thích nghĩa chữ"}.
              Năm hiện tại trên trang: {year}.
            </p>
          </div>

          <TraditionalDisclaimer />

          <h2 className="hh" style={{ marginTop: 32 }}>
            Tên cùng hành {t.hanh}
          </h2>
          <div className="chips">
            {cungHanh.map((x) => (
              <Link className="chip" href={`/ten/${x.slug}/`} key={x.slug}>
                {x.ten}
              </Link>
            ))}
            <Link className="chip" href="/ten/">
              Tất cả tên
            </Link>
            <Link className="chip" href="/tinh-tuoi/">
              Tính tuổi
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
