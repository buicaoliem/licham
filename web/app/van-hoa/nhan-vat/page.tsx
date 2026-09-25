import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { NhanVatList } from "@/components/van-hoa/tpl/NhanVatList";
import { Hero } from "@/components/van-hoa/tpl/Shared";
import s from "@/components/van-hoa/van-hoa.module.css";
import { NHAN_VAT } from "@/lib/van-hoa/data/nhan-vat";
import { HERO_IMAGE, VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";

export const metadata: Metadata = {
  title: "Nhân vật truyền thuyết & thần thánh | Lịch Âm",
  description: "Các nhân vật huyền thoại, thần linh và bậc tiên nhân trong văn hoá Việt: nơi thờ, lễ hội và ngày dương lịch của lễ hội mỗi năm.",
  alternates: { canonical: "/van-hoa/nhan-vat/" },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function NhanVatListPage() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <div className={s.root}>
        <Hero
          title="Nhân vật truyền thuyết & thần thánh"
          lead="Những nhân vật huyền thoại, các vị thần linh và bậc tiên nhân đã góp phần làm nên bản sắc tâm linh, văn hoá Việt Nam."
          image={HERO_IMAGE}
          center
        />
        <div className={s.wrap}>
          <NhanVatList items={NHAN_VAT} />
        </div>
      </div>
    </ChShell>
  );
}
