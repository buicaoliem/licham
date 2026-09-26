#!/usr/bin/env node
/**
 * Nhập dữ liệu Văn hoá đợt 1 từ artwork-inbox/vanhoa/data (chỉ đọc, không sửa file nguồn) và sinh:
 *  - lib/van-hoa/data/nam-su-kien.generated.ts    — 235 mốc lịch sử đến 1945 (trang năm can chi, danh sách sự kiện)
 *  - lib/van-hoa/data/ngay-nay-nam-xua.generated.ts — mốc có ngày âm cụ thể ("Ngày này năm xưa")
 *  - lib/van-hoa/data/nhan-vat.generated.ts       — 20 nhân vật truyền thuyết, nơi thờ lấy từ noi-tho.csv
 *  - lib/van-hoa/data/bai-viet.generated.ts       — 6 bài Tết
 *  - lib/van-hoa/data/le-hoi.generated.ts         — lễ hội theo ngày âm (le-hoi.csv), tóm tắt trung lập từ scripts/le-hoi-neutral.ts
 *  - content/van-hoa/needs-check.json             — ghi chú nội bộ cột needsCheck (không trang nào đọc)
 * Chạy lại được nhiều lần; giọng văn trung lập cho mốc từ 1900 nằm trong NEUTRAL_SUMMARY bên dưới.
 * Chạy: pnpm --filter @licham/web import:van-hoa [-- --in <thư mục dữ liệu>] [--date yyyy-mm-dd]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canChiOfYear } from "@licham/core";
import {
  LABEL_BY_TEXT,
  computeSolar,
  parseArticleBody,
  parseArticleLunarDates,
  parseFestivals,
  parseLunarDate,
  parseSolarDate,
  parseSolarYear,
  slugify,
  splitArticles,
  splitList,
  toHistoryEvents,
} from "../lib/van-hoa/import-logic";
import { NEUTRAL_LE_HOI_SUMMARY, LOADED_LE_HOI } from "./le-hoi-neutral";
import { NHAN_VAT_GROUPS, type BaiViet, type ItemLabel, type LeHoi, type NamSuKien, type NhanVat, type NhanVatGroupKey, type NhanVatPlace, type Source } from "../lib/van-hoa/types";

const WEB = dirname(dirname(fileURLToPath(import.meta.url)));
const arg = (name: string) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const IN = resolve(arg("--in") ?? join(WEB, "..", "artwork-inbox", "vanhoa", "data"));
const vnToday = () => new Date(Date.now() + 7 * 3600_000).toISOString().slice(0, 10);
const UPDATED_AT = arg("--date") ?? vnToday();

/**
 * Giọng văn trung lập, bách khoa cho mốc từ năm 1900 (id → tóm tắt). Giữ nguyên mọi sự kiện, tên, số, ngày;
 * chỉ bỏ từ ngữ mang sắc thái ("dã man", "tay sai", "tàn bạo", "đẫm máu"…). File CSV giữ nguyên.
 */
const NEUTRAL_SUMMARY: Record<string, string> = {
  "1904-thanh-lap-hoi-duy-tan":
    "Phan Bội Châu cùng Nguyễn Hàm và một số nhân sĩ họp bí mật tại Quảng Nam, thành lập Duy Tân hội với mục tiêu chấm dứt ách cai trị của Pháp, khôi phục độc lập. Kỳ Ngoại hầu Cường Để được suy tôn làm Hội chủ.",
  "1908-bung-no-phong-trao-chong-suu-thue-trung-ky":
    "Khởi nguồn từ huyện Đại Lộc (Quảng Nam), hàng ngàn nông dân kéo lên tỉnh lỵ biểu tình bất bạo động, đòi giảm sưu thuế và xâu dịch. Phong trào nhanh chóng lan ra các tỉnh Quảng Ngãi, Bình Định, Thừa Thiên trước khi bị chính quyền thuộc địa Pháp đàn áp.",
  "1911-nguyen-tat-thanh-roi-to-quoc-ra-di":
    "Nguyễn Tất Thành (lấy tên Văn Ba) lên tàu buôn Amiral Latouche-Tréville rời cảng Sài Gòn sang phương Tây, bắt đầu hành trình tìm con đường cứu nước mới.",
  "1913-hoang-hoa-tham-bi-sat-hai":
    "Thủ lĩnh nghĩa quân Yên Thế Hoàng Hoa Thám bị những người làm việc cho chính quyền Pháp sát hại tại khu vực Hố Lèo (Bắc Giang). Phong trào khởi nghĩa nông dân Yên Thế, kéo dài gần 30 năm, chấm dứt.",
  "1916-khoi-nghia-viet-nam-quang-phuc-hoi-tai-hue":
    "Thái Phiên và Trần Cao Vân bí mật chuẩn bị khởi nghĩa, đưa vua Duy Tân ra khỏi hoàng thành Huế để lãnh đạo kháng chiến nhưng kế hoạch bị lộ. Vua Duy Tân bị bắt và bị đày sang đảo Réunion; những người chỉ huy chủ chốt bị chính quyền Pháp xử chém tại An Hòa.",
  "1930-thanh-lap-dang-cong-san-viet-nam":
    "Hội nghị hợp nhất các tổ chức cộng sản diễn ra tại Cửu Long (Hương Cảng, Trung Quốc) do Nguyễn Ái Quốc chủ trì, quyết định thống nhất thành lập Đảng Cộng sản Việt Nam. Sự kiện được đánh giá là chấm dứt thời kỳ khủng hoảng về đường lối giải phóng dân tộc.",
  "1930-khoi-nghia-yen-bai-bung-no":
    "Việt Nam Quốc dân Đảng do Nguyễn Thái Học lãnh đạo phát động cuộc nổi dậy vũ trang, đánh chiếm đồn Yên Bái và một số địa phương lân cận. Khởi nghĩa nhanh chóng bị quân Pháp dập tắt; Nguyễn Thái Học cùng 12 đảng viên bị xử chém ngày 17/6/1930.",
  "1940-khoi-nghia-nam-ky-bung-no":
    "Đêm 22 rạng sáng 23/11/1940, Xứ ủy Nam Kỳ lãnh đạo người dân nổi dậy đồng loạt tại hầu khắp các tỉnh miền Nam; lá cờ đỏ sao vàng lần đầu tiên xuất hiện trong các cuộc biểu tình. Chính quyền Pháp đàn áp trên quy mô lớn, bắt và xử bắn nhiều lãnh đạo Đảng.",
  "1945-nhat-dao-chinh-phap-tai-dong-duong":
    "Quân đội Nhật bất ngờ nổ súng tấn công, tước vũ khí quân đội Pháp trên toàn cõi Đông Dương, chấm dứt quyền cai trị của Pháp kéo dài hơn 80 năm. Vua Bảo Đại sau đó tuyên bố hủy bỏ các hiệp ước bảo hộ ký với Pháp và lập chính phủ thân Nhật do Trần Trọng Kim làm Thủ tướng.",
  "1945-khoi-nghia-gianh-chinh-quyen-tai-ha-noi":
    "Dưới sự lãnh đạo của Thành ủy và Ủy ban Khởi nghĩa Hà Nội, hàng vạn người dự mít tinh tại Nhà hát Lớn, sau đó chuyển thành biểu tình tuần hành vũ trang, chiếm Phủ Khâm sai, Tòa Thị chính và Trại Bảo an binh. Kết quả tại Hà Nội tác động lớn tới Tổng khởi nghĩa trên phạm vi cả nước.",
  "1945-vua-bao-dai-thoai-vi":
    'Tại lầu Ngọ Môn (Huế), vua Bảo Đại đọc Tuyên ngôn thoái vị với câu "thà làm dân một nước độc lập hơn làm vua một nước nô lệ", trao ấn kiếm hoàng gia cho phái đoàn đại diện Chính phủ lâm thời. Triều Nguyễn và chế độ quân chủ ở Việt Nam chấm dứt.',
  "1945-tuyen-ngon-doc-lap-khai-sinh-nuoc-vndcch":
    "Tại Quảng trường Ba Đình (Hà Nội), Chủ tịch Hồ Chí Minh thay mặt Chính phủ Cách mạng lâm thời đọc bản Tuyên ngôn Độc lập, tuyên bố với quốc dân và thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa. Sự kiện mở đầu thời kỳ độc lập của Việt Nam.",
};

/** Từ ngữ mang sắc thái cần tránh ở mốc từ 1900 — còn sót thì script báo. */
const LOADED = ["dã man", "tay sai", "gian tế", "bè lũ", "quân cướp nước", "anh dũng", "oanh liệt", "tàn bạo", "đẫm máu", "kiên cường", "phát xít", "khủng bố trắng", "thủ tiêu"];

/** Nhân vật → trang ngày lễ (/le/) mà khối "Nhân vật & nơi thờ liên quan" hiện ra. */
const RELATED_HOLIDAYS: Record<string, string[]> = {
  "hung-vuong": ["gio-to-hung-vuong"],
  "lang-lieu": ["gio-to-hung-vuong", "tet-nguyen-dan"],
  "tao-quan": ["ong-cong-ong-tao"],
  "tho-cong": ["ong-cong-ong-tao"],
  "tan-vien-son-thanh": ["ram-thang-gieng"],
};

/** Ảnh nhân vật theo quy ước /heritage/van-hoa/nhan-vat/{slug}-hero.webp (trang) và -the.webp (thẻ, chia sẻ). */
const FIGURE_IMAGE_ALT: Record<string, string> = {
  "thanh-giong": "Thánh Gióng cưỡi ngựa sắt cầm giáo giữa mây và núi",
};
function figureImages(slug: string, name: string): Pick<NhanVat, "image" | "cardImage" | "imageAlt"> {
  return {
    image: `/heritage/van-hoa/nhan-vat/${slug}-hero.webp`,
    cardImage: `/heritage/van-hoa/nhan-vat/${slug}-the.webp`,
    imageAlt: FIGURE_IMAGE_ALT[slug] ?? `Tranh minh hoạ ${name}`,
  };
}

// ---------- CSV ----------
function parseCsv(path: string): Record<string, string>[] {
  const s = readFileSync(path, "utf8").replace(/^﻿/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let f = "";
  let q = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i]!;
    if (q) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          f += '"';
          i++;
        } else q = false;
      } else f += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      row.push(f);
      f = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;
      row.push(f);
      f = "";
      if (row.some((x) => x !== "")) rows.push(row);
      row = [];
    } else f += c;
  }
  if (f || row.length) {
    row.push(f);
    rows.push(row);
  }
  const [head, ...rest] = rows;
  return rest.map((r) => Object.fromEntries(head!.map((k, i) => [k.trim(), (r[i] ?? "").trim()])));
}

const sourcesOf = (text: string): Source[] => splitList(text).map((t) => ({ text: t }));
const needsCheck: Record<string, Record<string, string>> = { events: {}, figures: {}, places: {}, festivals: {} };
const warnings: string[] = [];

// ---------- Sự kiện ----------
function importEvents(): { events: NamSuKien[]; rewrites: { id: string; before: string; after: string }[] } {
  const rows = parseCsv(join(IN, "su-kien-viet-nam-den-1945.csv"));
  const events: NamSuKien[] = [];
  const rewrites: { id: string; before: string; after: string }[] = [];
  const used = new Set<string>();
  let lastYear = 0;
  for (const r of rows) {
    const solarYear = parseSolarYear(r.year!);
    const lunarYear = /^-?\d+$/.test(r.lunarYear!) ? Number(r.lunarYear) : null;
    const year = solarYear ?? lastYear;
    lastYear = year;
    let id = `${lunarYear ?? slugify(r.year!)}-${slugify(r.title!)}`;
    for (let n = 2; used.has(id); n++) id = `${id.replace(/-\d+$/, "")}-${n}`;
    used.add(id);

    const label = LABEL_BY_TEXT[r.label!];
    if (!label) throw new Error(`Nhãn lạ "${r.label}" ở ${id}`);
    if (lunarYear !== null && r.canChi && canChiOfYear(lunarYear).name !== r.canChi) {
      warnings.push(`${id}: cột canChi "${r.canChi}" khác can chi của lunarYear ${lunarYear} (${canChiOfYear(lunarYear).name}); trang năm theo lunarYear.`);
    }
    const lunar = parseLunarDate(r.lunarDate!);
    let solar = r.solarDateSource === "sources" ? parseSolarDate(r.solarDate!) : undefined;
    let solarDateSource: NamSuKien["solarDateSource"] = solar ? "sources" : undefined;
    if (r.solarDateSource === "sources" && !solar) warnings.push(`${id}: solarDateSource=sources nhưng solarDate "${r.solarDate}" không đọc được.`);
    if (!solar && lunar.day && lunarYear !== null) {
      solar = computeSolar(lunar.day, lunar.month!, lunarYear);
      if (solar) solarDateSource = "computed";
    }

    let summary = r.summary!;
    if (solarYear !== null && solarYear >= 1900) {
      const after = NEUTRAL_SUMMARY[id];
      if (after && after !== summary) {
        rewrites.push({ id, before: summary, after });
        summary = after;
      }
      const left = LOADED.filter((w) => summary.toLowerCase().includes(w));
      if (left.length) warnings.push(`${id}: còn từ ngữ mang sắc thái: ${left.join(", ")}`);
    }
    if (r.needsCheck) needsCheck.events![id] = r.needsCheck;

    events.push({
      id,
      year,
      lunarYear,
      yearText: r.year!,
      dynasty: r.dynasty!,
      title: r.title!,
      summary,
      label,
      ...(r.lunarDate ? { lunarDate: r.lunarDate } : {}),
      ...(lunar.day ? { lunarDay: lunar.day } : {}),
      ...(lunar.month ? { lunarMonth: lunar.month } : {}),
      ...(solar ? { solar, solarDateSource } : {}),
      ...(r.disputed ? { disputed: r.disputed } : {}),
      ...(r.people ? { people: r.people.split(",").map((x) => x.trim()).filter(Boolean) } : {}),
      ...(r.sources ? { sources: sourcesOf(r.sources) } : {}),
      updatedAt: UPDATED_AT,
    });
  }
  for (const id of Object.keys(NEUTRAL_SUMMARY)) if (!used.has(id)) throw new Error(`NEUTRAL_SUMMARY: không có mốc id "${id}"`);
  return { events, rewrites };
}

// ---------- Nhân vật ----------
function groupKey(text: string): NhanVatGroupKey {
  const first = text.split("/")[0]!.trim();
  const g = NHAN_VAT_GROUPS.find((x) => x.title.toLowerCase() === first.toLowerCase());
  if (!g) throw new Error(`Nhóm nhân vật lạ "${text}"`);
  return g.key;
}

/** Nhãn nhân vật theo câu chuyện, gán tường minh theo slug: truyền thuyết (chuyện dựng nước, cổ tích) hay tín ngưỡng (thần được thờ). Slug ngoài bảng → Truyền thuyết và báo trong warnings. */
const TIN_NGUONG_SLUGS = new Set(["mau-lieu-hanh", "tao-quan", "tho-cong", "ba-chua-kho", "tu-dao-hanh", "ly-ong-trong"]);
const TRUYEN_THUYET_SLUGS = new Set(["tan-vien-son-thanh", "thanh-giong", "chu-dong-tu", "tien-dung", "thuy-tinh", "kinh-duong-vuong", "lac-long-quan", "au-co", "hung-vuong", "lang-lieu", "mai-an-tiem", "an-duong-vuong", "cao-lo", "my-chau"]);
const figureLabel = (slug: string): ItemLabel => {
  if (TIN_NGUONG_SLUGS.has(slug)) return "tin-nguong";
  if (!TRUYEN_THUYET_SLUGS.has(slug)) warnings.push(`Nhân vật "${slug}" chưa có trong bảng nhãn → mặc định Truyền thuyết.`);
  return "truyen-thuyet";
};

function importFigures(): NhanVat[] {
  const rows = parseCsv(join(IN, "nhan-vat-truyen-thuyet.csv"));
  const placeRows = parseCsv(join(IN, "noi-tho.csv"));
  const slugs = new Set(rows.map((r) => r.slug!));
  for (const p of placeRows) if (!slugs.has(p.figureSlug!)) warnings.push(`noi-tho.csv: figureSlug "${p.figureSlug}" không có trong danh sách nhân vật.`);
  const figures = rows.map((r): NhanVat => {
    const slug = r.slug!;
    const group = groupKey(r.group!);
    const mine = placeRows.filter((p) => p.figureSlug === slug);
    const places: NhanVatPlace[] = mine.map((p) => ({ name: p.place!, address: p.newAddress!, ...(p.oldAddress ? { oldAddress: p.oldAddress } : {}) }));
    const placeSources: Source[] = [];
    for (const p of mine) {
      if (p.source && /^https?:\/\//.test(p.source) && !placeSources.some((s) => s.url === p.source)) {
        placeSources.push({ text: `Địa chỉ nơi thờ (${p.place}): ${new URL(p.source).hostname.replace(/^www\./, "")}`, url: p.source });
      }
    }
    if (r.needsCheck) needsCheck.figures![slug] = r.needsCheck;
    for (const p of mine) if (p.confidence && p.confidence !== "cao") needsCheck.places![`${slug}/${p.place}`] = `confidence: ${p.confidence}`;
    const festivals = parseFestivals(r.festivals!);
    return {
      slug,
      name: r.name!,
      ...(r.aliases ? { otherNames: r.aliases.split(",").map((x) => x.trim()).filter(Boolean) } : {}),
      label: figureLabel(slug),
      group,
      summary: r.summary!,
      ...figureImages(slug, r.name!),
      ...(r.variants ? { variants: splitList(r.variants) } : {}),
      ...(places.length ? { places } : r.worshipPlaces ? { worshipPlacesText: r.worshipPlaces } : {}),
      ...(festivals.length ? { festivals } : {}),
      ...(r.festivals ? { festivalsText: splitList(r.festivals) } : {}),
      ...(r.heritage ? { heritage: splitList(r.heritage) } : {}),
      ...(RELATED_HOLIDAYS[slug] ? { relatedHolidays: RELATED_HOLIDAYS[slug] } : {}),
      updatedAt: UPDATED_AT,
      sources: [...sourcesOf(r.sources!), ...placeSources],
    };
  });
  // Nhân vật liên quan: tóm tắt nhắc tới tên nhân vật khác (tối đa 4).
  for (const f of figures) {
    const rel = figures.filter((o) => o.slug !== f.slug && [o.name, ...(o.otherNames ?? [])].some((n) => n.length > 3 && f.summary.includes(n))).map((o) => o.slug);
    if (rel.length) f.relatedNhanVat = rel.slice(0, 4);
  }
  return figures;
}

// ---------- Bài Tết ----------
const CATEGORY_LABEL: Record<string, ItemLabel> = { "Dân gian": "tin-nguong", "Thiên văn": "chinh-su" };

function importArticles(figureSlugs: Set<string>): BaiViet[] {
  const md = readFileSync(join(IN, "bai-tet-6-chu-de.md"), "utf8");
  return splitArticles(md).map(({ meta, body }): BaiViet => {
    const slug = meta.slug!;
    const title = meta.title!;
    const category = meta.category!;
    if (!CATEGORY_LABEL[category]) throw new Error(`Chuyên mục lạ "${category}" ở ${slug}`);
    const { intro, sections } = parseArticleBody(body);
    const hero = meta.hero ? `/heritage/tet/${meta.hero.replace(/^tet-/, "").replace(/\.\w+$/, "")}.webp` : undefined;
    if (hero && !existsSync(join(WEB, "public", hero))) warnings.push(`${slug}: chưa có ảnh ${hero} — chạy lại sau khi thêm ảnh.`);
    const relatedFigures = (meta.relatedFigures ?? "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const f of relatedFigures) if (!figureSlugs.has(f)) warnings.push(`${slug}: relatedFigures "${f}" không có trang nhân vật.`);
    return {
      slug,
      title,
      label: CATEGORY_LABEL[category]!,
      category,
      summary: intro.join(" ") || title,
      intro,
      relatedFigures: relatedFigures.filter((f) => figureSlugs.has(f)),
      updatedAt: UPDATED_AT,
      ...(hero ? { heroImage: hero, heroAlt: `Tranh minh hoạ: ${title.split(":")[0]}` } : {}),
      sections,
      lunarDates: parseArticleLunarDates(meta.lunarDates ?? "", title.split(":")[0]!.trim()),
      sources: sourcesOf(meta.sources ?? ""),
    };
  });
}

// ---------- Lễ hội ----------
const dayNum = (text: string | undefined): number | undefined => {
  if (!text) return undefined;
  const n = Number(text);
  return Number.isInteger(n) && n >= 1 && n <= 30 ? n : undefined;
};

function importFestivals(): { festivals: LeHoi[]; rewrites: { id: string; before: string; after: string }[] } {
  const rows = parseCsv(join(IN, "le-hoi.csv"));
  const rewrites: { id: string; before: string; after: string }[] = [];
  const seen = new Set<string>();
  const festivals = rows.map((r): LeHoi => {
    const slug = r.slug!;
    if (seen.has(slug)) throw new Error(`le-hoi.csv: trùng slug "${slug}"`);
    seen.add(slug);
    if (r.calendar !== "am" && r.calendar !== "cham") throw new Error(`le-hoi.csv: ${slug}: calendar lạ "${r.calendar}"`);
    const cham = r.calendar === "cham";
    const month = Number(r.lunarMonth);
    const lunarMonth = !cham && Number.isInteger(month) && month >= 1 && month <= 12 ? month : undefined;
    if (r.lunarMonth && !cham && !lunarMonth) throw new Error(`le-hoi.csv: ${slug}: lunarMonth "${r.lunarMonth}" không hợp lệ`);
    // Lịch Chăm không quy ra ngày âm; không có tháng thì không có ngày.
    const startDay = lunarMonth ? dayNum(r.startDay) : undefined;
    const endDay = startDay ? dayNum(r.endDay) : undefined;
    const mainDay = lunarMonth ? dayNum(r.mainDay) : undefined;
    if (lunarMonth && r.startDay && !startDay) warnings.push(`${slug}: startDay "${r.startDay}" không đọc được.`);
    const key = r.imageKey || undefined;
    if (key) for (const f of [`${key}-hero`, `${key}-the`]) if (!existsSync(join(WEB, "public", "heritage", "van-hoa", "le-hoi", `${f}.webp`))) warnings.push(`${slug}: chưa có ảnh ${f}.webp — chạy scripts/optimize-le-hoi-images.py.`);
    let summary = r.summary!;
    const after = NEUTRAL_LE_HOI_SUMMARY[slug];
    if (after && after !== summary) {
      rewrites.push({ id: slug, before: summary, after });
      summary = after;
    }
    const left = LOADED_LE_HOI.filter((w) => summary.toLowerCase().includes(w));
    if (left.length) warnings.push(`${slug}: còn từ ngữ mang sắc thái: ${left.join(", ")}`);
    if (r.needsCheck) needsCheck.festivals![slug] = r.needsCheck;
    return {
      slug,
      name: r.name!,
      calendar: cham ? "cham" : "am",
      ...(lunarMonth ? { lunarMonth } : {}),
      ...(startDay ? { startDay } : {}),
      ...(endDay ? { endDay } : {}),
      ...(mainDay ? { mainDay } : {}),
      dateText: r.dateText!,
      site: r.site!,
      newAddress: r.newAddress!,
      ...(r.oldAddress ? { oldAddress: r.oldAddress } : {}),
      worship: r.worship!,
      summary,
      rituals: r.rituals!,
      ...(r.heritage ? { heritage: r.heritage } : {}),
      ...(key ? { imageKey: key, image: `/heritage/van-hoa/le-hoi/${key}-hero.webp`, cardImage: `/heritage/van-hoa/le-hoi/${key}-the.webp`, imageAlt: `Tranh minh hoạ ${r.name!}` } : {}),
      updatedAt: UPDATED_AT,
      sources: splitList(r.sources!.replace(/,/g, ";")).map((u) => ({ text: /^https?:\/\//.test(u) ? new URL(u).hostname.replace(/^www\./, "") : u, ...(/^https?:\/\//.test(u) ? { url: u } : {}) })),
    };
  });
  for (const id of Object.keys(NEUTRAL_LE_HOI_SUMMARY)) if (!seen.has(id)) throw new Error(`NEUTRAL_LE_HOI_SUMMARY: không có lễ hội "${id}"`);
  return { festivals, rewrites };
}

// ---------- Ghi file ----------
function writeTs(rel: string, header: string, body: string) {
  const path = join(WEB, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `// File sinh tự động bởi scripts/import-van-hoa.ts — không sửa tay.\n${header}\n${body}\n`);
}

const { events, rewrites } = importEvents();
const figures = importFigures();
const articles = importArticles(new Set(figures.map((f) => f.slug)));
const history = toHistoryEvents(events);
const { festivals, rewrites: festivalRewrites } = importFestivals();

writeTs("lib/van-hoa/data/nam-su-kien.generated.ts", 'import type { NamSuKien } from "../types";', `export const NAM_SU_KIEN_IMPORTED: readonly NamSuKien[] = ${JSON.stringify(events, null, 1)};`);
writeTs("lib/van-hoa/data/ngay-nay-nam-xua.generated.ts", 'import type { HistoryEvent } from "../content";', `export const NGAY_NAY_NAM_XUA: readonly HistoryEvent[] = ${JSON.stringify(history, null, 1)};`);
writeTs("lib/van-hoa/data/nhan-vat.generated.ts", 'import type { NhanVat } from "../types";', `export const NHAN_VAT_IMPORTED: readonly NhanVat[] = ${JSON.stringify(figures, null, 1)};`);
writeTs("lib/van-hoa/data/bai-viet.generated.ts", 'import type { BaiViet } from "../types";', `export const BAI_VIET_IMPORTED: readonly BaiViet[] = ${JSON.stringify(articles, null, 1)};`);
writeTs("lib/van-hoa/data/le-hoi.generated.ts", 'import type { LeHoi } from "../types";', `export const LE_HOI_IMPORTED: readonly LeHoi[] = ${JSON.stringify(festivals, null, 1)};`);
mkdirSync(join(WEB, "content", "van-hoa"), { recursive: true });
writeFileSync(join(WEB, "content", "van-hoa", "needs-check.json"), `${JSON.stringify(needsCheck, null, 2)}\n`);

const places = figures.reduce((n, f) => n + (f.places?.length ?? 0), 0);
console.log(`updatedAt ${UPDATED_AT}`);
console.log(`events ${events.length} / specific lunar day ${events.filter((e) => e.lunarDay).length} / "Ngày này năm xưa" ${history.length} / linked to can-chi year ${events.filter((e) => e.lunarYear !== null).length}`);
console.log(`solar: sources ${events.filter((e) => e.solarDateSource === "sources").length}, computed ${events.filter((e) => e.solarDateSource === "computed").length}`);
console.log(`figures ${figures.length} / places ${places} / articles ${articles.length}`);
console.log(`festivals ${festivals.length} / fixed lunar date ${festivals.filter((f) => f.calendar === "am" && f.lunarMonth && f.startDay).length} / cham ${festivals.filter((f) => f.calendar === "cham").length} / no fixed date (empty month or cham) ${festivals.filter((f) => !f.lunarMonth).length} / with image ${festivals.filter((f) => f.imageKey).length}`);
console.log(`festivals by month: ${Array.from({ length: 12 }, (_, i) => `${i + 1}=${festivals.filter((f) => f.lunarMonth === i + 1).length}`).join(" ")}`);
console.log(`needsCheck: festivals ${Object.keys(needsCheck.festivals!).length}, events ${Object.keys(needsCheck.events!).length}, figures ${Object.keys(needsCheck.figures!).length}, places ${Object.keys(needsCheck.places!).length}`);
if (process.argv.includes("--rewrites")) for (const r of rewrites) console.log(`\n[${r.id}]\n- ${r.before}\n+ ${r.after}`);
else console.log(`neutral rewrites ${rewrites.length} events + ${festivalRewrites.length} festivals (thêm --rewrites để xem trước → sau)`);
for (const w of warnings) console.warn(`! ${w}`);
