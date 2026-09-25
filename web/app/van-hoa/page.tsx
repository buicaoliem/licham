import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { VanHoaHub } from "@/components/van-hoa/VanHoaHub";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";

export const metadata: Metadata = {
  title: "Lịch sử & Văn hoá Việt | Lịch Âm",
  description:
    "Trăng tối nay, ngày này năm xưa, đố vui lịch sử và các chủ đề văn hoá Việt: lịch sử theo năm, các đời vua, người Việt cổ, văn hoá dân gian, thiên văn, lễ hội và học đường.",
  alternates: { canonical: "/van-hoa/" },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function VanHoaPage() {
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <VanHoaHub />
    </ChShell>
  );
}
