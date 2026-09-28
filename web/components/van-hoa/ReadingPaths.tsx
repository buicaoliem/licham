import Link from "next/link";
import { resolvedReadingPaths } from "@/lib/van-hoa/reading-paths";

/** Khối "Chuỗi đọc gợi ý" — chuỗi nội dung đã publish, biên tập tay (xem lib/van-hoa/reading-paths.ts). Tự ẩn khi rỗng. */
export function ReadingPaths() {
  const paths = resolvedReadingPaths();
  if (paths.length === 0) return null;
  return (
    <section className="ah-paths-sec" aria-labelledby="ah-paths-h">
      <div className="ah-sec-head">
        <h2 className="ch-h2" id="ah-paths-h">
          Chuỗi đọc gợi ý
        </h2>
        <p className="ch-sub">Đọc theo thứ tự để nối liền nhân vật, câu chuyện và sự kiện đã có trên trang.</p>
      </div>
      <div className="ah-paths">
        {paths.map((p) => (
          <article className="ah-path" key={p.slug} aria-labelledby={`ah-path-${p.slug}`}>
            <h3 id={`ah-path-${p.slug}`}>{p.title}</h3>
            <p className="ah-path-desc">{p.description}</p>
            <ol className="ah-path-steps">
              {p.items.map((it, i) => (
                <li key={`${p.slug}-${it.type}-${it.slug}`}>
                  <Link href={it.href} className="ah-path-step">
                    <span className="ah-path-step-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="ah-path-step-b">
                      <b>{it.title}</b>
                      <em>{it.badge}</em>
                    </span>
                  </Link>
                  <span className="ah-path-note">{it.note}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
