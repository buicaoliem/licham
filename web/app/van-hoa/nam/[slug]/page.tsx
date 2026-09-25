import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { NamYear } from "@/components/van-hoa/tpl/NamYear";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { CAN_CHI_YEAR_SLUGS } from "@/lib/van-hoa/logic";
import { ALL_CAN_CHI, canChiSlug } from "@/lib/tuoi";

export const dynamicParams = false;

export function generateStaticParams() {
  return CAN_CHI_YEAR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cc = ALL_CAN_CHI.find((c) => canChiSlug(c) === slug);
  if (!cc) return {};
  return {
    title: `Năm ${cc.name} trong lịch sử | Lịch Âm`,
    description: `Các dấu mốc lịch sử của những năm ${cc.name}, xếp theo dòng thời gian.`,
    alternates: { canonical: `/van-hoa/nam/${slug}/` },
    robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function NamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CAN_CHI_YEAR_SLUGS.includes(slug)) notFound();
  return (
    <ChShell activeMenu={null} className="ch-page">
      <NamYear slug={slug} />
    </ChShell>
  );
}
