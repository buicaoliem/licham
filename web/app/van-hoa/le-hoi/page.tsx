import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { LeHoiList } from "@/components/van-hoa/tpl/LeHoiList";
import { heritageFile } from "@/lib/heritage-assets";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { LE_HOI_BANNER } from "@/lib/van-hoa/le-hoi";

const banner = heritageFile(LE_HOI_BANNER);
const bannerImg = banner ? [{ url: banner, width: 1280, height: 720, alt: "Lễ hội theo ngày âm" }] : undefined;

export const metadata: Metadata = {
  title: "Lễ hội theo ngày âm | Lịch Âm",
  description: "Lễ hội truyền thống các vùng miền xếp theo tháng âm lịch: thời gian, địa điểm, đối tượng thờ, nghi lễ và ngày dương lịch của lần tổ chức kế tiếp.",
  alternates: { canonical: "/van-hoa/le-hoi/" },
  ...(bannerImg ? { openGraph: { images: bannerImg }, twitter: { card: "summary_large_image" as const, images: bannerImg } } : {}),
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function LeHoiHubPage() {
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <LeHoiList />
    </ChShell>
  );
}
