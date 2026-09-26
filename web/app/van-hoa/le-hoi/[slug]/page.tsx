import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { LeHoiDetail } from "@/components/van-hoa/tpl/LeHoiDetail";
import { LeHoiList } from "@/components/van-hoa/tpl/LeHoiList";
import { heritageFile } from "@/lib/heritage-assets";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { LE_HOI, leHoiBySlug } from "@/lib/van-hoa/data/le-hoi";
import { LE_HOI_BANNER, MONTHS, leHoiMonthPath, leHoiOfMonth, leHoiPath, monthLabel } from "@/lib/van-hoa/le-hoi";

export const revalidate = 3600;
export const dynamicParams = false;

/** "thang-3" → 3 (chỉ tháng có lễ hội); slug lễ hội không bao giờ bắt đầu bằng "thang-". */
const monthOfSlug = (slug: string): number | null => {
  const m = /^thang-(\d{1,2})$/.exec(slug);
  const n = m ? Number(m[1]) : 0;
  return n >= 1 && n <= 12 && leHoiOfMonth(n).length > 0 ? n : null;
};

export function generateStaticParams() {
  return [...MONTHS.filter((m) => leHoiOfMonth(m).length > 0).map((m) => ({ slug: `thang-${m}` })), ...LE_HOI.map((x) => ({ slug: x.slug }))];
}

const robots = VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const month = monthOfSlug(slug);
  if (month) {
    const banner = heritageFile(LE_HOI_BANNER);
    const bannerImg = banner ? [{ url: banner, width: 1280, height: 720, alt: "Lễ hội theo ngày âm" }] : undefined;
    return {
      ...(bannerImg ? { openGraph: { images: bannerImg }, twitter: { card: "summary_large_image" as const, images: bannerImg } } : {}),
      title: `Lễ hội ${monthLabel(month)} | Lịch Âm`,
      description: `Các lễ hội truyền thống diễn ra trong ${monthLabel(month)} âm lịch: thời gian, địa điểm và đối tượng thờ.`,
      alternates: { canonical: leHoiMonthPath(month) },
      robots,
    };
  }
  const x = leHoiBySlug(slug);
  if (!x) return {};
  const img = x.image ? [{ url: x.image, width: 1280, height: 720, alt: x.imageAlt }] : undefined;
  return {
    title: `${x.name} | Lịch Âm`,
    description: x.summary,
    alternates: { canonical: leHoiPath(slug) },
    ...(img ? { openGraph: { images: img }, twitter: { card: "summary_large_image" as const, images: img } } : {}),
    robots,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const month = monthOfSlug(slug);
  const x = month ? null : leHoiBySlug(slug);
  if (!month && !x) notFound();
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      {month ? <LeHoiList month={month} /> : <LeHoiDetail f={x!} />}
    </ChShell>
  );
}
