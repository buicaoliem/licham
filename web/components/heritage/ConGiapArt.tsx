import { conGiapImagePath } from "@/lib/heritage-assets";
import { HeritageImage } from "./HeritageImage";

/** Tranh con giáp (asset public/heritage/con-giap/<slug>.webp). Chưa có file thì không hiển thị. */
export function ConGiapArt({ chiSlug, ten, className }: { chiSlug: string; ten: string; className?: string }) {
  return <HeritageImage src={conGiapImagePath(chiSlug)} alt={`Tranh tuổi ${ten}`} className={className} label={`Tranh con giáp ${ten}`} />;
}
