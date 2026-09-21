import Link from "next/link";
import type { RelatedLink } from "@/lib/calendar/related";

export function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <>
      <h2 className="hh" style={{ marginTop: 32 }}>
        Có thể bạn quan tâm
      </h2>
      <div className="chips">
        {links.map((l) => (
          <Link className="chip" href={l.href} key={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
