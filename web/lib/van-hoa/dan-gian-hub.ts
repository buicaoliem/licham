/** Trang mục /van-hoa/dan-gian/: lời giới thiệu (đúng nguyên văn) và ba trang con. */
import { BAI_VIET } from "./data/bai-viet";
import { peopleInText } from "./cross-links";
import { TRO_CHOI_PATH, isTroChoi, troChoiCardImage } from "./tro-choi";
import { FIXTURE_SLUG, type DanGianGroupKey } from "./types";

export const DAN_GIAN_PATH = "/van-hoa/dan-gian/";

/** Ba đoạn giới thiệu — giữ nguyên văn. */
export const DAN_GIAN_INTRO = [
  "Ngày xưa, một đứa trẻ lớn lên giữa làng quê Việt không cần đồ chơi mua sẵn. Sợi dây thừng đủ làm nên một buổi kéo co náo nhiệt sau vụ gặt; một nắm bột nếp trong tay người nghệ nhân biến thành con giống bột đủ hình thù; tờ giấy dó quét điệp dưới bàn tay thợ làng Đông Hồ hóa thành bức tranh treo Tết mang lời chúc cả năm. Không có sách vở nào dạy những điều này — chúng được truyền từ đời trước sang đời sau, qua đôi tay, qua trí nhớ, qua những buổi chiều ngồi cạnh ông bà nghe kể chuyện.",
  "Đây là nơi lưu lại nếp sống đó. Trò chơi dân gian — từ kéo co, đánh phết trên sân đình đến ô ăn quan, chơi chuyền của trẻ nhỏ ngày thường — mỗi trò một cách chơi, một dịp gắn liền, một vùng đất mang nó đi xa. Tranh dân gian Đông Hồ với những bức tranh gà, tranh lợn, tranh chuột vinh quy mang trong mình lời chúc và cả tiếng cười châm biếm của người xưa. Đồ chơi Tết và Trung thu xưa — tò he, đèn ông sao, trống bỏi — làm từ bột gạo, tre nứa, đất sét, giản dị mà đủ khiến một mùa lễ hội trở nên đáng nhớ.",
  "Sắp tới, mục này sẽ có thêm truyện cổ tích Việt Nam, giai thoại dân gian như Trạng Quỳnh, Trạng Trình, tín ngưỡng và những món ăn gắn với từng dịp lễ trong năm — dần dần phủ đầy bức tranh văn hóa dân gian Việt, mỗi phần một mảnh ghép, nối lại với những gì đã có.",
] as const;

/** Cụm thể loại → trang mục/bài con. Dài hơn đứng trước khi khớp. */
export const DAN_GIAN_GENRE_LINKS = [
  { phrase: "Đồ chơi Tết và Trung thu xưa", href: "/van-hoa/bai-viet/do-choi-tet-xua/" },
  { phrase: "Tranh dân gian Đông Hồ", href: "/van-hoa/bai-viet/tranh-dong-ho/" },
  { phrase: "Trò chơi dân gian", href: TRO_CHOI_PATH },
] as const;

export interface TextSeg {
  text: string;
  href?: string;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Cắt đoạn thành phần tử; mỗi cụm thể loại chỉ gắn link lần đầu. */
export function linkFirstPhrases(text: string, phrases: readonly { phrase: string; href: string }[], used = new Set<string>()): TextSeg[] {
  const hits: { start: number; end: number; href: string }[] = [];
  for (const { phrase, href } of phrases) {
    if (used.has(href)) continue;
    const re = new RegExp(escapeRe(phrase), "u");
    const m = re.exec(text);
    if (!m) continue;
    used.add(href);
    hits.push({ start: m.index, end: m.index + phrase.length, href });
  }
  hits.sort((a, b) => a.start - b.start);
  if (!hits.length) return [{ text }];
  const segs: TextSeg[] = [];
  let i = 0;
  for (const h of hits) {
    if (h.start > i) segs.push({ text: text.slice(i, h.start) });
    segs.push({ text: text.slice(h.start, h.end), href: h.href });
    i = h.end;
  }
  if (i < text.length) segs.push({ text: text.slice(i) });
  return segs;
}

export function danGianIntroPeople(): string[] {
  return peopleInText(DAN_GIAN_INTRO);
}

const GROUP_BY_SLUG: Partial<Record<string, DanGianGroupKey>> = {
  "tranh-dong-ho": "tranh-dan-gian",
  "do-choi-tet-xua": "do-choi",
  "banh-chung-banh-giay": "mon-an-theo-le",
  "ong-cong-ong-tao": "tin-nguong",
  "cay-neu-ngay-tet": "tin-nguong",
  "cho-tet-xua": "tin-nguong",
  "tro-choi-dan-gian-ngay-tet": "tro-choi",
};

function cardImage(hero?: string): string | undefined {
  return hero?.replace("-hero.webp", "-the.webp") ?? hero;
}

/** Thẻ trang mục: một mục trò chơi + các bài Dân gian (không lặp từng trò). */
export function danGianHubItems(): {
  href: string;
  title: string;
  summary: string;
  group: DanGianGroupKey;
  badge: string;
  image?: string;
  imageAlt?: string;
}[] {
  const games = BAI_VIET.find((p) => p.slug === "keo-co");
  const hub = {
    href: TRO_CHOI_PATH,
    title: "Trò chơi dân gian",
    summary: "Hai mươi trò chơi dân gian Việt Nam: Tết, hội làng và giờ ra chơi — cách chơi, vùng miền và nguồn gốc.",
    group: "tro-choi" as const,
    badge: "Dân gian",
    image: games ? troChoiCardImage(games) : "/heritage/van-hoa/van-hoa-dan-gian-480.webp",
    imageAlt: games?.heroAlt,
  };
  const posts = BAI_VIET.filter((p) => p.slug !== FIXTURE_SLUG && p.category === "Dân gian" && !isTroChoi(p.slug)).map((p) => ({
    href: `/van-hoa/bai-viet/${p.slug}/`,
    title: p.title,
    summary: p.summary,
    group: GROUP_BY_SLUG[p.slug] ?? ("tro-choi" as const),
    badge: p.category ?? "Dân gian",
    image: cardImage(p.heroImage),
    imageAlt: p.heroAlt,
  }));
  return [hub, ...posts];
}
