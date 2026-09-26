import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { LeHoiList } from "@/components/van-hoa/tpl/LeHoiList";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";

export const metadata: Metadata = {
  title: "Lễ hội theo ngày âm | Lịch Âm",
  description: "Lễ hội truyền thống các vùng miền xếp theo tháng âm lịch: thời gian, địa điểm, đối tượng thờ, nghi lễ và ngày dương lịch của lần tổ chức kế tiếp.",
  alternates: { canonical: "/van-hoa/le-hoi/" },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function LeHoiHubPage() {
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <LeHoiList />
    </ChShell>
  );
}
