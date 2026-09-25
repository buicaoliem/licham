import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { EclipseDetail } from "@/components/van-hoa/eclipse/EclipsePages";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { ECLIPSES, ECLIPSE_LIST_PATH, dmy, eclipseBySlug } from "@/lib/van-hoa/eclipses";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ECLIPSES.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = eclipseBySlug(slug);
  if (!x) return {};
  return {
    title: `${x.title} ${dmy(x.peak)} | Lịch Âm`,
    description: `${x.title} ngày ${dmy(x.peak)}: giờ các pha, độ che và khả năng quan sát ở Việt Nam.`,
    alternates: { canonical: `${ECLIPSE_LIST_PATH}${slug}/` },
    robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = eclipseBySlug(slug);
  if (!x) notFound();
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <EclipseDetail e={x} />
    </ChShell>
  );
}
