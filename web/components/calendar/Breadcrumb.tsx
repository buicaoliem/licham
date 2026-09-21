import Link from "next/link";
import { type Crumb, breadcrumbJsonLd } from "@/lib/calendar/jsonld";
import { JsonLd } from "./JsonLd";

/** Breadcrumb hiển thị kèm BreadcrumbList JSON-LD; mục cuối là trang hiện tại, không có href. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <span key={c.label + i}>
          {i > 0 && " › "}
          {c.href ? <Link href={c.href}>{c.label}</Link> : <b>{c.label}</b>}
        </span>
      ))}
      <JsonLd data={breadcrumbJsonLd(items)} />
    </nav>
  );
}

export type { Crumb };
