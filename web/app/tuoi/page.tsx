import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChSectionHead, ChShell } from "@/components/heritage/ChShell";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { Icon } from "@/components/heritage/Icon";
import { HERITAGE_SLOTS } from "@/lib/heritage-assets";
import { ALL_CAN_CHI, CHI_LIST, birthYearsForCanChi, birthYearsForChi, canChiSlug } from "@/lib/tuoi";
import { getVietnamToday } from "@/lib/today";

export const metadata: Metadata = {
  title: "Xem tuổi: 12 con giáp và 60 tuổi can chi | Lịch Âm",
  description: "Tra cứu tuổi theo 12 con giáp và 60 tuổi can chi: mệnh nạp âm, ngũ hành, tuổi hợp, tuổi kỵ và các năm sinh tương ứng.",
  alternates: { canonical: "/tuoi/" },
};

export default function TuoiHubPage() {
  const today = getVietnamToday();

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu">
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi" }]}
        crumbJsonLd={false}
        title="Xem tuổi: 12 con giáp và 60 tuổi can chi"
        lead="Tra cứu mệnh nạp âm theo từng năm can chi (không gán một hành cho cả con giáp), tuổi hợp, tuổi kỵ."
        art={{ src: HERITAGE_SLOTS.heroTuoi.path, label: HERITAGE_SLOTS.heroTuoi.spec }}
      >
        <div className="chips">
          <Link className="chip hot" href="/tinh-tuoi/">
            Tính tuổi dương và tuổi mụ
          </Link>
          <Link className="chip" href="/phong-thuy/xung-tuoi/">
            Xung tuổi
          </Link>
          <Link className="chip" href="/phong-thuy/xem-tuoi-xay-nha/">
            Tuổi xây nhà
          </Link>
          <Link className="chip" href="/xem-tuoi-ket-hon/">
            Tuổi kết hôn
          </Link>
          <Link className="chip" href="/sinh-nam/1990/">
            Sinh năm 1990
          </Link>
          <Link className="chip" href="/ten/">
            Đặt tên con
          </Link>
          <Link className="chip" href="/tu-vi/">
            Tử vi
          </Link>
        </div>
      </ChHero>

      <div className="ch-wrap ch-main">
        <section aria-labelledby="tu-12-h">
          <ChSectionHead
            id="tu-12-h"
            title="12 con giáp"
            sub="Chọn con giáp để xem tuổi hợp, tuổi kỵ và các năm sinh tương ứng."
          />
          <div className="tu-chi-grid">
            {CHI_LIST.map((c) => {
              const years = birthYearsForChi(c.chiIndex, today.year, 3);
              return (
                <Link className="tu-chi" href={`/tuoi/${c.slug}/`} key={c.slug}>
                  <ConGiapArt chiSlug={c.slug} ten={c.ten} so={c.chiIndex + 1} className="tu-chi-art" />
                  <b>Tuổi {c.ten}</b>
                  <span className="cv">{c.conVat}</span>
                  <span className="yr">
                    {years.map((y) => (
                      <span key={y}>{y}</span>
                    ))}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="tu-cc" aria-labelledby="tu-60-h">
          <ChSectionHead
            id="tu-60-h"
            title="Tra nhanh 60 tuổi can chi"
            sub={`Mỗi con giáp gồm 5 tuổi can chi. Năm ghi bên cạnh là năm sinh gần nhất tính đến ${today.year}.`}
          />
          <div className="tu-cc-grid">
            {CHI_LIST.map((c) => {
              const group = ALL_CAN_CHI.filter((cc) => cc.chiIndex === c.chiIndex)
                .map((cc) => ({ cc, year: birthYearsForCanChi(cc.index, today.year)[1] }))
                .sort((a, b) => a.year - b.year);
              return (
                <div className="tu-cc-col" key={c.slug}>
                  <h3>
                    Nhóm tuổi {c.ten}
                    <span>{group.length} tuổi</span>
                  </h3>
                  <ul>
                    {group.map(({ cc, year }) => (
                      <li key={cc.name}>
                        <Link href={`/tuoi/${canChiSlug(cc)}/`}>
                          {cc.name}
                          <span>{year}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="ch-more" href={`/tuoi/${c.slug}/`}>
                    Xem tuổi {c.ten} <Icon name="arrow" size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </ChShell>
  );
}
