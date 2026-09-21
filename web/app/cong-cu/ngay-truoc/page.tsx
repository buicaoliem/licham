import type { Metadata } from "next";
import { OffsetTool } from "@/components/tools/OffsetTool";
import type { SearchParams } from "@/lib/tools/params";
import { generateToolMetadata, toolBySlug } from "@/lib/tools/tools";

const tool = toolBySlug("ngay-truoc");

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  return generateToolMetadata(tool, await searchParams);
}

export default async function NgayTruocPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return <OffsetTool tool={tool} direction={-1} sp={await searchParams} />;
}
