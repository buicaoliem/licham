import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChShell } from "@/components/heritage/ChShell";
import { NhanVatDetail } from "@/components/van-hoa/tpl/NhanVatDetail";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { NHAN_VAT, nhanVatBySlug } from "@/lib/van-hoa/data/nhan-vat";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return NHAN_VAT.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const x = nhanVatBySlug(slug);
  if (!x) return {};
  return {
    title: `${x.name} | Lịch Âm`,
    description: x.summary,
    alternates: { canonical: `/van-hoa/nhan-vat/${slug}/` },
    ...(x.cardImage ? { openGraph: { images: [{ url: x.cardImage, alt: x.imageAlt }] }, twitter: { images: [x.cardImage] } } : {}),
    robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = nhanVatBySlug(slug);
  if (!x) notFound();
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <NhanVatDetail nv={x} />
    </ChShell>
  );
}
