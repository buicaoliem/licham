import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { TopicList } from "@/components/van-hoa/tpl/TopicList";
import { Hero, ListLd } from "@/components/van-hoa/tpl/Shared";
import s from "@/components/van-hoa/van-hoa.module.css";
import { NHAN_VAT } from "@/lib/van-hoa/data/nhan-vat";
import { NHAN_VAT_GROUPS } from "@/lib/van-hoa/types";
import { HERO_IMAGE, VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";

export const metadata: Metadata = {
  title: "Nhân vật truyền thuyết & thần thánh | Lịch Âm",
  description: "Các nhân vật huyền thoại, thần linh và bậc tiên nhân trong văn hoá Việt: nơi thờ, lễ hội và ngày dương lịch của lễ hội mỗi năm.",
  alternates: { canonical: "/van-hoa/nhan-vat/" },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function NhanVatListPage() {
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <div className={s.root}>
        <ListLd crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn hoá", href: "/van-hoa/" }, { label: 'Nhân vật' }]} name='Nhân vật truyền thuyết & thần thánh' description={metadata.description!} path='/van-hoa/nhan-vat/' items={NHAN_VAT.map((x) => ({ name: x.name, href: `/van-hoa/nhan-vat/${x.slug}/` }))} />
        <Hero
          title="Nhân vật truyền thuyết & thần thánh"
          lead="Những nhân vật huyền thoại, các vị thần linh và bậc tiên nhân đã góp phần làm nên bản sắc tâm linh, văn hoá Việt Nam."
          image={HERO_IMAGE}
          short
          center
        />
        <div className={s.wrap}>
          <TopicList
            groups={NHAN_VAT_GROUPS}
            placeholder="Tìm nhân vật, nơi thờ, nhóm…"
            items={NHAN_VAT.map((n) => ({
              href: `/van-hoa/nhan-vat/${n.slug}/`,
              title: n.name,
              summary: n.summary,
              group: n.group,
              label: n.label,
              image: n.cardImage ?? n.image,
              imageAlt: n.imageAlt,
              search: [...(n.otherNames ?? []), ...(n.places ?? []).map((p) => `${p.name} ${p.address}`)].join(" "),
            }))}
          />
        </div>
      </div>
    </ChShell>
  );
}
