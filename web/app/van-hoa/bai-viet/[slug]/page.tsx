import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { BaiVietDetail } from "@/components/van-hoa/tpl/BaiVietDetail";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { BAI_VIET, baiVietBySlug } from "@/lib/van-hoa/data/bai-viet";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return BAI_VIET.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = baiVietBySlug(slug);
  if (!x) return {};
  return {
    title: `${x.title} | Lịch Âm`,
    description: x.summary,
    alternates: { canonical: `/van-hoa/bai-viet/${slug}/` },
    robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = baiVietBySlug(slug);
  if (!x) notFound();
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <BaiVietDetail post={x} />
    </ChShell>
  );
}
