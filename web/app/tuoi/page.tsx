import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChSectionHead, ChShell } from "@/components/heritage/ChShell";
import { ChiSeal } from "@/components/heritage/ChiSeal";
import { Icon } from "@/components/heritage/Icon";
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
    <ChShell activeMenu="Xem tuổi">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi" }]}
        crumbJsonLd={false}
        title="Xem tuổi: 12 con giáp và 60 tuổi can chi"
        lead="Tra cứu mệnh nạp âm theo từng năm can chi (không gán một hành cho cả con giáp), tuổi hợp, tuổi kỵ."
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
        <section>
          <ChSectionHead title="12 con giáp" />
          <div className="ch-grid c6">
            {CHI_LIST.map((c) => {
              const years = birthYearsForChi(c.chiIndex, today.year, 3);
              return (
                <Link className="tuoi-chi-card" href={`/tuoi/${c.slug}/`} key={c.slug}>
                  <ChiSeal chiIndex={c.chiIndex} tone={c.chiIndex % 2 ? "jade" : undefined} />
                  <b>Tuổi {c.ten}</b>
                  <span className="cv">{c.conVat}</span>
                  <span className="yr">{years.join(" · ")}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <ChSectionHead title="Tra nhanh 60 tuổi can chi" />
          <div className="ch-grid c4">
            {CHI_LIST.map((c) => {
              const group = ALL_CAN_CHI.filter((cc) => cc.chiIndex === c.chiIndex);
              return (
                <div className="tuoi-cc-col" key={c.slug}>
                  <h3>
                    Nhóm tuổi {c.ten} <span>({group.length} tuổi)</span>
                  </h3>
                  <ul>
                    {group.map((cc) => (
                      <li key={cc.name}>
                        <Link href={`/tuoi/${canChiSlug(cc)}/`}>
                          {cc.name}
                          <span>{birthYearsForCanChi(cc.index, today.year)[1]}</span>
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
