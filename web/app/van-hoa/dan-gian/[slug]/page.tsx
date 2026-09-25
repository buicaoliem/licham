import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { DanGianDetail } from "@/components/van-hoa/tpl/DanGianDetail";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { DAN_GIAN, danGianBySlug } from "@/lib/van-hoa/data/dan-gian";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return DAN_GIAN.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = danGianBySlug(slug);
  if (!x) return {};
  return {
    title: `${x.title} | Lịch Âm`,
    description: x.summary,
    alternates: { canonical: `/van-hoa/dan-gian/${slug}/` },
    robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = danGianBySlug(slug);
  if (!x) notFound();
  return (
    <ChShell activeMenu={null} className="ch-page">
      <DanGianDetail item={x} />
    </ChShell>
  );
}
