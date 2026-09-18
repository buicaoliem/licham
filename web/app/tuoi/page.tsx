import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ALL_CAN_CHI, CHI_LIST, birthYearsForChi, canChiSlug } from "@/lib/tuoi";
import { getVietnamToday } from "@/lib/today";

export const metadata: Metadata = {
  title: "Xem tuổi: 12 con giáp và 60 tuổi can chi | Lịch Âm",
  description:
    "Tra cứu tuổi theo 12 con giáp và 60 tuổi can chi: mệnh nạp âm, ngũ hành, tuổi hợp, tuổi kỵ và các năm sinh tương ứng.",
  alternates: { canonical: "/tuoi/" },
};

export default function TuoiHubPage() {
  const today = getVietnamToday();

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <h1>Xem tuổi: 12 con giáp và 60 tuổi can chi</h1>
          <p className="sub">Tra cứu mệnh nạp âm, ngũ hành, tuổi hợp, tuổi kỵ và các năm sinh tương ứng, theo quan niệm dân gian.</p>
        </div>

        <div className="body">
          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t">12 con giáp</span>
              <span className="rule" />
            </div>
            <div className="tuoi-hub-grid">
              {CHI_LIST.map((c) => {
                const years = birthYearsForChi(c.chiIndex, today.year, 3);
                return (
                  <Link className="tuoi-hub-card" href={`/tuoi/${c.slug}`} key={c.slug}>
                    <b>
                      Tuổi {c.ten} ({c.conVat})
                    </b>
                    <span>{years.join(" · ")}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Tra nhanh 60 tuổi can chi</span>
              <span className="rule" />
            </div>
            {CHI_LIST.map((c) => {
              const group = ALL_CAN_CHI.filter((cc) => cc.chiIndex === c.chiIndex);
              return (
                <div key={c.slug} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)", marginBottom: 8, textAlign: "center" }}>
                    Nhóm tuổi {c.ten}
                  </div>
                  <div className="chips">
                    {group.map((cc) => (
                      <Link className="chip" href={`/tuoi/${canChiSlug(cc)}`} key={cc.name}>
                        {cc.name}
                      </Link>
                    ))}
                    <Link className="chip" href={`/tuoi/${c.slug}`} style={{ fontWeight: 600 }}>
                      Xem tuổi {c.ten} ›
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
