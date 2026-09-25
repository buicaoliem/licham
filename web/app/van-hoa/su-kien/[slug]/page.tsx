import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { SuKienDetail } from "@/components/van-hoa/tpl/SuKienDetail";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { SU_KIEN, suKienBySlug } from "@/lib/van-hoa/data/su-kien";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return SU_KIEN.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = suKienBySlug(slug);
  if (!x) return {};
  return {
    title: `${x.title} | Lịch Âm`,
    description: x.summary,
    alternates: { canonical: `/van-hoa/su-kien/${slug}/` },
    robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = suKienBySlug(slug);
  if (!x) notFound();
  return (
    <ChShell activeMenu={null} className="ch-page">
      <SuKienDetail ev={x} />
    </ChShell>
  );
}
