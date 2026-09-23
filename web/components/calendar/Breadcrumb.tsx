import Link from "next/link";
import { type Crumb, breadcrumbJsonLd } from "@/lib/calendar/jsonld";
import { JsonLd } from "./JsonLd";

/**
 * Breadcrumb hiển thị kèm BreadcrumbList JSON-LD; mục cuối là trang hiện tại, không có href.
 * `jsonLd={false}` chỉ hiển thị, dùng cho trang trước đây chưa phát JSON-LD breadcrumb (giữ nguyên dữ liệu có cấu trúc).
 */
export function Breadcrumb({ items, jsonLd = true }: { items: Crumb[]; jsonLd?: boolean }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <span key={c.label + i}>
          {i > 0 && " › "}
          {c.href ? <Link href={c.href}>{c.label}</Link> : <b>{c.label}</b>}
        </span>
      ))}
      {jsonLd && <JsonLd data={breadcrumbJsonLd(items)} />}
    </nav>
  );
}

export type { Crumb };
