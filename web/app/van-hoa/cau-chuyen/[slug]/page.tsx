import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { StoryDetail } from "@/components/van-hoa/tpl/StoryDetail";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { STORY, storyBySlug } from "@/lib/van-hoa/data/story";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return STORY.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = storyBySlug(slug);
  if (!x) return {};
  return {
    title: `${x.title} | Lịch Âm`,
    description: x.summary,
    alternates: { canonical: `/van-hoa/cau-chuyen/${slug}/` },
    robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = storyBySlug(slug);
  if (!x) notFound();
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <StoryDetail story={x} />
    </ChShell>
  );
}
