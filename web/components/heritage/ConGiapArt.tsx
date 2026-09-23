import { conGiapImagePath } from "@/lib/heritage-assets";
import { HeritageImage, heritageVisible } from "./HeritageImage";

/**
 * Ô tranh con giáp, kích thước cố định do CSS của nơi dùng quyết định.
 * Có asset public/heritage/con-giap/<slug>.webp thì hiện tranh; chưa có thì giữ nguyên ô,
 * chỉ ghi số thứ tự con giáp (01–12) — không dùng chữ Hán hay hình vẽ thay thế.
 */
export function ConGiapArt({ chiSlug, ten, so, className }: { chiSlug: string; ten: string; so: number; className?: string }) {
  const src = conGiapImagePath(chiSlug);
  const cls = ["cg-slot", className ?? ""].filter(Boolean).join(" ");
  if (heritageVisible(src)) {
    return (
      <span className={`${cls} has-img`} data-cg={chiSlug}>
        <HeritageImage src={src} alt={`Tranh tuổi ${ten}`} label={`Tranh con giáp ${ten}`} />
      </span>
    );
  }
  return (
    <span className={`${cls} empty`} aria-hidden="true">
      <span className="cg-slot-n">{String(so).padStart(2, "0")}</span>
    </span>
  );
}
