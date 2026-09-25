import { BAI_VIET } from "./data/bai-viet";
import { NHAN_VAT } from "./data/nhan-vat";
import { FIXTURE_SLUG, type BaiViet, type RelatedLink } from "./types";

/** Câu đầu (tối đa ~120 ký tự) làm mô tả ngắn trên thẻ. */
function firstSentence(text: string): string {
  const s = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return s.length > 120 ? `${s.slice(0, 117).trimEnd()}…` : s;
}

/**
 * "Bài liên quan" tự dựng, không cấu hình từng liên kết: nhân vật trong `relatedFigures`, rồi bài cùng chuyên mục,
 * rồi các bài khác. Ảnh thu nhỏ = ảnh hero/thẻ của mục đích; nhãn = chuyên mục (bài) hoặc nhãn mục (nhân vật).
 */
export function relatedForBaiViet(post: BaiViet, max = 3, posts: readonly BaiViet[] = BAI_VIET): RelatedLink[] {
  if (post.related?.length) return post.related.slice(0, max);
  const figures = (post.relatedFigures ?? [])
    .map((slug) => NHAN_VAT.find((n) => n.slug === slug))
    .filter((n) => n !== undefined)
    .map((n): RelatedLink => ({ label: n.name, href: `/van-hoa/nhan-vat/${n.slug}/`, summary: firstSentence(n.summary), image: n.cardImage ?? n.image, itemLabel: n.label }));
  const others = posts.filter((p) => p.slug !== post.slug && p.slug !== FIXTURE_SLUG);
  const ordered = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)];
  const articles = ordered.map((p): RelatedLink => ({ label: p.title, href: `/van-hoa/bai-viet/${p.slug}/`, summary: firstSentence(p.summary), image: p.heroImage, badge: p.category, itemLabel: p.category ? undefined : p.label }));
  return [...figures, ...articles].slice(0, max);
}
