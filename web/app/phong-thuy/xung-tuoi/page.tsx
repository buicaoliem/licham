import type { Metadata } from "next";
import Link from "next/link";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { XungTuoiForm } from "@/components/XungTuoiForm";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { SideBox, XemTuoiLegend, XemTuoiRelated } from "@/components/heritage/KetHonParts";
import { getVietnamToday } from "@/lib/today";

export async function generateMetadata(): Promise<Metadata> {
  const year = getVietnamToday().year;
  return {
    title: `Xem xung tuổi, hợp tuổi ${year} | Lịch Âm`,
    description:
      "Xem hai năm sinh có xung chi hay thiên khắc địa xung theo lục xung và tứ xung can. Tham khảo dân gian, không bảo đảm.",
    alternates: { canonical: "/phong-thuy/xung-tuoi/" },
  };
}

export default function XungTuoiPage() {
  const year = getVietnamToday().year;

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu ch-kh">
      <ChHero
        className="kh-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi", href: "/tuoi/" }, { label: `Xung tuổi ${year}` }]}
        crumbJsonLd={false}
        title="Xem xung tuổi và hợp tuổi"
        lead="Luật cứng: lục xung địa chi (Tý–Ngọ, Sửu–Mùi, Dần–Thân, Mão–Dậu, Thìn–Tuất, Tỵ–Hợi) và tứ xung thiên can (Giáp–Canh, Ất–Tân, Bính–Nhâm, Đinh–Quý). Xung cả can lẫn chi gọi là thiên khắc địa xung."
      />

      <div className="ch-wrap ch-main ch-layout">
        <div className="ch-stack">
          <XungTuoiForm />
          <TraditionalDisclaimer />
        </div>

        <aside className="ch-side">
          <XemTuoiLegend
            title="Ba mức kết quả"
            lead="Xét chi trước: chi không đối nhau thì không xung, dù can có thuộc tứ xung."
            rows={[
              { cls: "r", label: "Thiên khắc địa xung", text: "Chi đối nhau (lục xung) và can thuộc tứ xung can." },
              { cls: "k", label: "Xung chi", text: "Chi đối nhau, can không xung." },
              { cls: "g", label: "Không xung", text: "Chi không đối nhau trong lục xung." },
            ]}
          />
          <SideBox title="Không dùng làm bảo đảm" icon="note" tone="gold">
            <p className="kh-side-lead">
              Kết quả chỉ nói hai năm can chi có đứng đối trong bảng xung hay không. Không chẩn bệnh, không kết luận hôn nhân. Muốn đủ ngày
              sinh (kể cả trước Tết) thì dùng <Link href="/tinh-tuoi/">tính tuổi</Link>.
            </p>
          </SideBox>
          <XemTuoiRelated
            links={[
              { label: "Xem tuổi kết hôn", sub: "Con giáp, mệnh, thiên can và Kim Lâu", href: "/xem-tuoi-ket-hon/", icon: "rings" },
              { label: "Tính tuổi", sub: "Tuổi dương và tuổi mụ theo ngày sinh", href: "/tinh-tuoi/", icon: "cake" },
              { label: "Xem tuổi 12 con giáp", sub: "Tuổi hợp, tuổi kỵ, mệnh theo năm sinh", href: "/tuoi/", icon: "yinyang" },
              { label: "Xem ngày tốt", sub: "Ngày lành cho việc trọng đại", href: "/xem-ngay-tot/", icon: "sun" },
            ]}
          />
        </aside>
      </div>
    </ChShell>
  );
}
