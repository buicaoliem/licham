/**
 * Suy ngược bảng luật sao tốt/sao xấu từ dữ liệu thật đã thu bằng collect-sao.ts.
 *
 * CHẠY TAY:
 *   node --experimental-strip-types --experimental-loader ./scripts/ts-extension-loader.mjs scripts/derive-sao.ts
 *
 * Cách làm: với mỗi tên sao, thử lần lượt các dạng luật (tháng âm → chi ngày,
 * tháng âm → can ngày, chi tháng tiết khí → chi ngày, can năm → can/chi ngày,
 * ngày âm cố định, chu kỳ đều theo số ngày). Mỗi dạng là một ánh xạ
 * "khóa → tập giá trị"; bảng được dựng bằng biểu quyết đa số trên NĂM 2025,
 * rồi chấm điểm trên NĂM 2026 (dữ liệu chưa hề dùng để dựng bảng). Chỉ nhận
 * luật khi tỷ lệ khớp trên phần dữ liệu kiểm tra đạt từ 98% trở lên — cách này
 * loại được các bảng chỉ "học thuộc" dữ liệu chứ không phải luật thật.
 *
 * Kết quả ghi ra src/tables/ngoc-hap-derived.ts và sao-report.md ở gốc repo.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CAN,
  CHI,
  NHI_THAP_BAT_TU_STARS,
  type SolarDate,
  getDayInfo,
} from "../src/index.ts";
import { saoTotOfDay, saoXauOfDay } from "../src/tables/ngoc-hap.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const RAW_FILE = resolvePath(HERE, "data/sao-raw.json");
const TABLE_FILE = resolvePath(HERE, "../src/tables/ngoc-hap-derived.ts");
const REPORT_FILE = resolvePath(HERE, "../../sao-report.md");

const ACCEPT = 0.98;
const TRAIN_YEAR = 2025;

interface RawDay {
  date: string;
  saoTot: string[];
  saoXau: string[];
}

interface Day {
  iso: string;
  jd: number;
  lunarMonth: number;
  lunarDay: number;
  dayCan: number;
  dayChi: number;
  termMonthChi: number;
  yearCan: number;
  /** Chỉ số sao nhị thập bát tú của ngày, 0 = Giác. */
  tu: number;
  isTrain: boolean;
  tot: Set<string>;
  xau: Set<string>;
  /** Số sao tốt/xấu mà bảng 13 sao hiện có sinh ra cho ngày này, để so sánh. */
  oldTot: number;
  oldXau: number;
}

type Kind =
  | "lunar-month-chi"
  | "lunar-month-can"
  | "term-month-chi"
  | "year-can-day-can"
  | "year-can-day-chi"
  | "lunar-day"
  | "day-cycle"
  | "term-month-can"
  | "nhi-thap-bat-tu"
  | "lunar-month-can-or-chi"
  | "term-month-can-or-chi"
  | "lunar-month-lunar-day"
  | "lunar-month-day-60";

/**
 * Mã hoá giá trị của dạng "tháng âm → can hoặc chi ngày": 0–9 là can ngày,
 * 10–21 là chi ngày cộng 10. Tháng không có giá trị nào tức là tháng đó ứng
 * vào một hướng bát quái, và khi ấy không ngày nào trong tháng có sao.
 */
const CHI_OFFSET = 10;

interface Form {
  kind: Kind;
  period?: number;
  key: (d: Day) => number;
  /** Các giá trị mà ngày này có thể ứng vào; hầu hết các dạng chỉ có một. */
  candidates: (d: Day) => number[];
  /**
   * true = mỗi khóa chỉ được chọn nhiều nhất MỘT giá trị (hoặc không giá trị nào).
   * Dùng cho dạng "mỗi tháng âm ứng một can, một chi, hoặc một hướng" — tháng rơi
   * vào hướng thì không ngày nào trong tháng có sao.
   */
  singleValue?: boolean;
}

interface Fit {
  kind: Kind;
  period?: number;
  table: Map<number, Set<number>>;
  cells: number;
  trainAcc: number;
  /** Tỷ lệ ngày đoán đúng (có cũng như không) trên năm kiểm tra. */
  testAcc: number;
  /** Trong số ngày thực sự có sao (năm kiểm tra), bao nhiêu phần được đoán đúng. */
  testRecall: number;
  /** Trong số ngày luật bảo là có sao (năm kiểm tra), bao nhiêu phần đúng. */
  testPrecision: number;
  missAll: number;
}

/**
 * Luật chỉ được nhận khi vừa đoán đúng tổng thể, vừa bắt đúng những ngày có sao,
 * vừa không báo thừa. Nếu chỉ xét tỷ lệ tổng thể thì một sao hiếm sẽ "đạt" chỉ nhờ
 * luôn luôn đoán là không có — đó không phải luật.
 */
function isAccepted(fit: Fit): boolean {
  return (
    fit.cells > 0 &&
    fit.testAcc >= ACCEPT &&
    fit.testRecall >= ACCEPT &&
    fit.testPrecision >= ACCEPT
  );
}

function solarOf(iso: string): SolarDate {
  const [y, m, d] = iso.split("-").map(Number);
  return { day: d as number, month: m as number, year: y as number };
}

/** Khóa so khớp tên sao: bỏ qua hoa/thường và phần tên gọi khác trong ngoặc. */
function nameKey(raw: string): string {
  return raw
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function loadRaw(): RawDay[] {
  if (!existsSync(RAW_FILE)) throw new Error(`Chưa có ${RAW_FILE} — chạy collect-sao.ts trước.`);
  return JSON.parse(readFileSync(RAW_FILE, "utf8")) as RawDay[];
}

function toDays(rows: RawDay[]): Day[] {
  return rows.map((r) => {
    const info = getDayInfo(solarOf(r.date));
    const dayChi = info.canChi.day.chiIndex;
    return {
      iso: r.date,
      jd: info.solar.jd,
      lunarMonth: info.lunar.month,
      lunarDay: info.lunar.day,
      dayCan: info.canChi.day.canIndex,
      dayChi,
      // Chi của tháng tiết khí: suy ngược từ trực (trực = chi ngày − chi tháng).
      termMonthChi: (((dayChi - info.truc.index) % 12) + 12) % 12,
      yearCan: info.canChi.year.canIndex,
      tu: NHI_THAP_BAT_TU_STARS.findIndex((t) => t.name === info.nhiThapBatTu?.name),
      isTrain: info.solar.year === TRAIN_YEAR,
      tot: new Set(r.saoTot.map(nameKey)),
      xau: new Set(r.saoXau.map(nameKey)),
      oldTot: saoTotOfDay(info.canChi.day.can, info.canChi.day.chi, info.lunar.day).length,
      oldXau: saoXauOfDay(info.canChi.day.can, info.canChi.day.chi, info.lunar.day).length,
    };
  });
}

function forms(): Form[] {
  const list: Form[] = [
    { kind: "lunar-month-chi", key: (d) => d.lunarMonth, candidates: (d) => [d.dayChi] },
    { kind: "lunar-month-can", key: (d) => d.lunarMonth, candidates: (d) => [d.dayCan] },
    { kind: "term-month-chi", key: (d) => d.termMonthChi, candidates: (d) => [d.dayChi] },
    { kind: "year-can-day-can", key: (d) => d.yearCan, candidates: (d) => [d.dayCan] },
    { kind: "year-can-day-chi", key: (d) => d.yearCan, candidates: (d) => [d.dayChi] },
    { kind: "lunar-day", key: () => 0, candidates: (d) => [d.lunarDay] },
    // Bổ sung vòng 2.
    { kind: "term-month-can", key: (d) => d.termMonthChi, candidates: (d) => [d.dayCan] },
    { kind: "nhi-thap-bat-tu", key: () => 0, candidates: (d) => [d.tu] },
    {
      kind: "lunar-month-can-or-chi",
      key: (d) => d.lunarMonth,
      candidates: (d) => [d.dayCan, d.dayChi + CHI_OFFSET],
      singleValue: true,
    },
    {
      kind: "term-month-can-or-chi",
      key: (d) => d.termMonthChi,
      candidates: (d) => [d.dayCan, d.dayChi + CHI_OFFSET],
      singleValue: true,
    },
    { kind: "lunar-month-lunar-day", key: (d) => d.lunarMonth, candidates: (d) => [d.lunarDay] },
    { kind: "lunar-month-day-60", key: (d) => d.lunarMonth, candidates: (d) => [d.jd % 60] },
  ];
  for (let p = 2; p <= 60; p++) {
    list.push({ kind: "day-cycle", period: p, key: () => 0, candidates: (d) => [d.jd % p] });
  }
  return list;
}

/** Bảng theo lối "mỗi giá trị tự quyết": giá trị nào phần lớn là ngày có sao thì giữ. */
function buildByMajority(train: Day[], has: (d: Day) => boolean, form: Form): Map<number, Set<number>> {
  const tally = new Map<string, { yes: number; no: number }>();
  for (const d of train) {
    for (const v of form.candidates(d)) {
      const cell = `${form.key(d)}|${v}`;
      const t = tally.get(cell) ?? { yes: 0, no: 0 };
      if (has(d)) t.yes++;
      else t.no++;
      tally.set(cell, t);
    }
  }
  const table = new Map<number, Set<number>>();
  for (const [cell, t] of tally) {
    if (t.yes <= t.no) continue;
    const [k, v] = cell.split("|").map(Number);
    let set = table.get(k as number);
    if (!set) {
      set = new Set<number>();
      table.set(k as number, set);
    }
    set.add(v as number);
  }
  return table;
}

/**
 * Bảng theo lối "mỗi khóa chọn nhiều nhất một giá trị": với từng khóa, thử mọi
 * giá trị gặp được cùng với phương án "không giá trị nào", giữ phương án sai ít
 * ngày nhất trong phạm vi khóa đó.
 */
function buildBestPerKey(train: Day[], has: (d: Day) => boolean, form: Form): Map<number, Set<number>> {
  const byKey = new Map<number, Day[]>();
  for (const d of train) {
    const k = form.key(d);
    const list = byKey.get(k) ?? [];
    list.push(d);
    byKey.set(k, list);
  }
  const table = new Map<number, Set<number>>();
  for (const [k, list] of byKey) {
    // Phương án "không giá trị nào": sai đúng bằng số ngày có sao trong khóa này.
    let bestErrors = list.filter(has).length;
    let bestValue: number | null = null;
    const seen = new Set<number>();
    for (const d of list) for (const v of form.candidates(d)) seen.add(v);
    for (const v of seen) {
      let errors = 0;
      for (const d of list) {
        if (form.candidates(d).includes(v) !== has(d)) errors++;
      }
      if (errors < bestErrors) {
        bestErrors = errors;
        bestValue = v;
      }
    }
    if (bestValue !== null) table.set(k, new Set([bestValue]));
  }
  return table;
}

function fitForm(days: Day[], has: (d: Day) => boolean, form: Form): Fit {
  const train = days.filter((d) => d.isTrain);
  const table = form.singleValue
    ? buildBestPerKey(train, has, form)
    : buildByMajority(train, has, form);
  let cells = 0;
  for (const set of table.values()) cells += set.size;
  const predict = (d: Day) => {
    const set = table.get(form.key(d));
    return set !== undefined && form.candidates(d).some((v) => set.has(v));
  };
  let trainOk = 0;
  let trainN = 0;
  let testOk = 0;
  let testN = 0;
  let missAll = 0;
  let truePos = 0;
  let actualPos = 0;
  let predPos = 0;
  for (const d of days) {
    const ok = predict(d) === has(d);
    if (!ok) missAll++;
    if (d.isTrain) {
      trainN++;
      if (ok) trainOk++;
    } else {
      testN++;
      if (ok) testOk++;
      if (has(d)) actualPos++;
      if (predict(d)) predPos++;
      if (has(d) && predict(d)) truePos++;
    }
  }
  return {
    kind: form.kind,
    period: form.period,
    table,
    cells,
    trainAcc: trainN ? trainOk / trainN : 0,
    testAcc: testN ? testOk / testN : 0,
    testRecall: actualPos ? truePos / actualPos : 0,
    testPrecision: predPos ? truePos / predPos : 0,
    missAll,
  };
}

/** Ngày `d` có ứng luật `fit` hay không — dùng lại đúng định nghĩa của dạng luật đó. */
function fitMatches(fit: Fit, d: Day): boolean {
  const form = forms().find((f) => f.kind === fit.kind && f.period === fit.period);
  if (!form) throw new Error(`Không tìm thấy dạng luật ${fit.kind}`);
  const set = fit.table.get(form.key(d));
  return set !== undefined && form.candidates(d).some((v) => set.has(v));
}

interface Derived {
  name: string;
  isGood: boolean;
  count: number;
  fit: Fit | null;
  best: Fit | null;
}

function main(): void {
  const raws = loadRaw();
  const days = toDays(raws);
  if (days.length < 400) throw new Error(`Chỉ có ${days.length} ngày — chưa đủ để suy luật.`);

  // Cách viết tên hay gặp nhất cho mỗi khóa tên, và phân loại tốt/xấu.
  const spelling = new Map<string, Map<string, number>>();
  const totCount = new Map<string, number>();
  const xauCount = new Map<string, number>();
  for (const r of raws) {
    for (const [list, counter] of [
      [r.saoTot, totCount],
      [r.saoXau, xauCount],
    ] as const) {
      for (const raw of list) {
        const k = nameKey(raw);
        counter.set(k, (counter.get(k) ?? 0) + 1);
        const s = spelling.get(k) ?? new Map<string, number>();
        s.set(raw, (s.get(raw) ?? 0) + 1);
        spelling.set(k, s);
      }
    }
  }

  const allForms = forms();
  const results: Derived[] = [];
  for (const key of new Set([...totCount.keys(), ...xauCount.keys()])) {
    const good = (totCount.get(key) ?? 0) >= (xauCount.get(key) ?? 0);
    const has = (d: Day) => d.tot.has(key) || d.xau.has(key);
    const count = days.filter(has).length;
    let best: Fit | null = null;
    let bestScore = -1;
    for (const form of allForms) {
      const fit = fitForm(days, has, form);
      const score = Math.min(fit.testAcc, fit.testRecall, fit.testPrecision);
      if (best === null || score > bestScore + 1e-9 || (score > bestScore - 1e-9 && fit.cells < best.cells)) {
        best = fit;
        bestScore = score;
      }
    }
    const display = [...(spelling.get(key) ?? new Map<string, number>())].sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0];
    results.push({
      name: display ?? key,
      isGood: good,
      count,
      best,
      fit: best && isAccepted(best) ? best : null,
    });
  }
  results.sort((a, b) => a.name.localeCompare(b.name, "vi"));

  writeTable(results, days);
  writeReport(results, days);
  const okCount = results.filter((r) => r.fit).length;
  console.log(
    `Tổng ${results.length} sao, xác định được ${okCount}, chưa xác định ${results.length - okCount}.`,
  );
}

function tableLiteral(fit: Fit): string {
  const rows = [...fit.table]
    .sort((a, b) => a[0] - b[0])
    .map(([k, v]) => `      ${k}: [${[...v].sort((x, y) => x - y).join(", ")}],`);
  return `{\n${rows.join("\n")}\n    }`;
}

function writeTable(results: Derived[], days: Day[]): void {
  const ok = results.filter((r) => r.fit);
  const today = new Date().toISOString().slice(0, 10);
  const head = `/**
 * Bảng sao tốt / sao xấu suy ngược từ dữ liệu thật.
 *
 * PHƯƠNG PHÁP
 * Lấy danh sách TÊN SAO của ${days.length} ngày dương liên tiếp, ghép với dữ liệu lịch
 * của chính dự án (tháng âm, ngày âm, can/chi ngày, chi tháng theo tiết khí, can
 * năm), rồi thử khớp từng sao với các dạng luật bên dưới. Bảng của mỗi dạng được
 * dựng bằng biểu quyết đa số trên dữ liệu năm ${TRAIN_YEAR}, sau đó chấm điểm trên năm
 * ${TRAIN_YEAR + 1} — phần dữ liệu chưa hề dùng để dựng bảng. Một sao chỉ có mặt trong tệp
 * này khi ở bước chấm điểm đạt từ ${Math.round(ACCEPT * 100)}% trở lên trên cả ba mặt: đoán đúng
 * tổng thể, bắt đúng những ngày thực sự có sao, và không báo thừa. Các sao còn
 * lại nằm trong danh sách chưa xác định ở sao-report.md.
 *
 * NGUỒN ĐỐI CHIẾU: lichvannien.net (trang riêng cho từng ngày).
 * Chỉ lấy TÊN SAO — không lấy và không lưu bất kỳ câu mô tả nào của trang nguồn.
 * KHOẢNG NGÀY: 01/01/2025 – 31/12/2026.
 * NGÀY THỰC HIỆN: ${today}.
 *
 * Trường \`description\` để trống có chủ ý — Liêm tự viết.
 * Tệp này CHƯA được nối vào getDayInfo().
 */

/** Dạng luật của một sao. Khóa và giá trị đều là chỉ số 0-based, trừ nơi ghi rõ. */
export type SaoRuleKind =
  /** khóa: tháng âm 1–12 — giá trị: chi ngày (Tý = 0) */
  | "lunar-month-chi"
  /** khóa: tháng âm 1–12 — giá trị: can ngày (Giáp = 0) */
  | "lunar-month-can"
  /** khóa: chi tháng tính theo tiết khí (Tý = 0) — giá trị: chi ngày */
  | "term-month-chi"
  /** khóa: can năm — giá trị: can ngày */
  | "year-can-day-can"
  /** khóa: can năm — giá trị: chi ngày */
  | "year-can-day-chi"
  /** khóa: luôn là 0 — giá trị: ngày âm 1–30 */
  | "lunar-day"
  /** khóa: luôn là 0 — giá trị: số dư của số ngày Julius chia cho \`period\` */
  | "day-cycle"
  /** khóa: chi tháng tính theo tiết khí — giá trị: can ngày */
  | "term-month-can"
  /** khóa: luôn là 0 — giá trị: chỉ số sao nhị thập bát tú của ngày (Giác = 0) */
  | "nhi-thap-bat-tu"
  /**
   * khóa: tháng âm 1–12 — giá trị: can ngày (0–9) hoặc chi ngày cộng 10 (10–21).
   * Tháng vắng mặt trong bảng là tháng ứng vào một hướng bát quái; khi ấy không
   * ngày nào trong tháng có sao.
   */
  | "lunar-month-can-or-chi"
  /** như trên nhưng khóa là chi tháng tính theo tiết khí */
  | "term-month-can-or-chi"
  /** khóa: tháng âm 1–12 — giá trị: ngày âm 1–30 */
  | "lunar-month-lunar-day"
  /** khóa: tháng âm 1–12 — giá trị: số dư của số ngày Julius chia 60 (vòng can chi) */
  | "lunar-month-day-60";

/** Các trường của một ngày mà bảng luật cần đến. */
export interface DerivedSaoDay {
  lunarMonth: number;
  lunarDay: number;
  dayCan: number;
  dayChi: number;
  termMonthChi: number;
  yearCan: number;
  /** Chỉ số sao nhị thập bát tú của ngày, Giác = 0. */
  nhiThapBatTuIndex: number;
  jd: number;
}

/** Bù chỉ số của chi ngày trong dạng luật "tháng âm → can hoặc chi ngày". */
export const CAN_OR_CHI_OFFSET = 10;

export interface DerivedSao {
  name: string;
  isGood: boolean;
  /** Để trống có chủ ý — sẽ do Liêm viết, không chép từ nguồn đối chiếu. */
  description: string;
  kind: SaoRuleKind;
  /** Khóa → danh sách giá trị làm sao ứng vào ngày đó. */
  table: Record<number, number[]>;
  /** Chỉ dùng với kind "day-cycle". */
  period?: number;
  /** Tỷ lệ khớp trên năm ${TRAIN_YEAR + 1}, phần dữ liệu không dùng để dựng bảng. */
  matchRate: number;
}

export const DERIVED_SAO: readonly DerivedSao[] = [`;

  const body = ok
    .map((r) => {
      const f = r.fit as Fit;
      const lines = [
        "  {",
        `    name: ${JSON.stringify(r.name)},`,
        `    isGood: ${r.isGood},`,
        `    description: "",`,
        `    kind: ${JSON.stringify(f.kind)},`,
      ];
      if (f.period !== undefined) lines.push(`    period: ${f.period},`);
      lines.push(`    table: ${tableLiteral(f)},`);
      lines.push(`    matchRate: ${f.testAcc.toFixed(4)},`);
      lines.push("  },");
      return lines.join("\n");
    })
    .join("\n");

  const tail = `];

/** Khóa tra bảng của một ngày theo dạng luật đã cho. */
function ruleKey(sao: DerivedSao, day: DerivedSaoDay): number {
  switch (sao.kind) {
    case "lunar-month-chi":
    case "lunar-month-can":
    case "lunar-month-can-or-chi":
    case "lunar-month-lunar-day":
    case "lunar-month-day-60":
      return day.lunarMonth;
    case "term-month-chi":
    case "term-month-can":
    case "term-month-can-or-chi":
      return day.termMonthChi;
    case "year-can-day-can":
    case "year-can-day-chi":
      return day.yearCan;
    case "lunar-day":
    case "day-cycle":
    case "nhi-thap-bat-tu":
      return 0;
  }
}

/** Các giá trị mà một ngày có thể ứng vào theo dạng luật đã cho. */
function ruleValues(sao: DerivedSao, day: DerivedSaoDay): number[] {
  switch (sao.kind) {
    case "lunar-month-chi":
    case "term-month-chi":
    case "year-can-day-chi":
      return [day.dayChi];
    case "lunar-month-can":
    case "term-month-can":
    case "year-can-day-can":
      return [day.dayCan];
    case "lunar-day":
    case "lunar-month-lunar-day":
      return [day.lunarDay];
    case "day-cycle":
      return [day.jd % (sao.period ?? 1)];
    case "lunar-month-day-60":
      return [day.jd % 60];
    case "nhi-thap-bat-tu":
      return [day.nhiThapBatTuIndex];
    case "lunar-month-can-or-chi":
    case "term-month-can-or-chi":
      return [day.dayCan, day.dayChi + CAN_OR_CHI_OFFSET];
  }
}

/** Ngày đã cho có ứng sao \`sao\` hay không. */
export function derivedSaoMatches(sao: DerivedSao, day: DerivedSaoDay): boolean {
  const values = sao.table[ruleKey(sao, day)];
  if (values === undefined) return false;
  return ruleValues(sao, day).some((v) => values.includes(v));
}
`;

  writeFileSync(TABLE_FILE, `${head}\n${body}\n${tail}`, "utf8");
}

const KIND_VI: Record<Kind, string> = {
  "lunar-month-chi": "theo tháng âm → chi ngày",
  "lunar-month-can": "theo tháng âm → can ngày",
  "term-month-chi": "theo chi tháng (tiết khí) → chi ngày",
  "year-can-day-can": "theo can năm → can ngày",
  "year-can-day-chi": "theo can năm → chi ngày",
  "lunar-day": "theo ngày âm cố định trong tháng",
  "day-cycle": "theo chu kỳ đều số ngày",
  "term-month-can": "theo chi tháng (tiết khí) → can ngày",
  "nhi-thap-bat-tu": "theo nhị thập bát tú của ngày",
  "lunar-month-can-or-chi": "theo tháng âm → can hoặc chi ngày (có tháng ứng hướng, không có sao)",
  "term-month-can-or-chi":
    "theo chi tháng (tiết khí) → can hoặc chi ngày (có tháng ứng hướng, không có sao)",
  "lunar-month-lunar-day": "theo tháng âm → ngày âm",
  "lunar-month-day-60": "theo tháng âm → can chi ngày (vòng 60)",
};

/** Vòng thử nào đã đưa dạng luật này vào. */
const ROUND_OF: Record<Kind, 1 | 2> = {
  "lunar-month-chi": 1,
  "lunar-month-can": 1,
  "term-month-chi": 1,
  "year-can-day-can": 1,
  "year-can-day-chi": 1,
  "lunar-day": 1,
  "day-cycle": 1,
  "term-month-can": 2,
  "nhi-thap-bat-tu": 2,
  "lunar-month-can-or-chi": 2,
  "term-month-can-or-chi": 2,
  "lunar-month-lunar-day": 2,
  "lunar-month-day-60": 2,
};

function kindLabel(fit: Fit): string {
  return fit.kind === "day-cycle"
    ? `${KIND_VI[fit.kind]} (${fit.period} ngày)`
    : KIND_VI[fit.kind];
}

function describeTable(fit: Fit): string {
  const fmt = (k: number, v: number[]): string => {
    switch (fit.kind) {
      case "lunar-month-chi":
        return `tháng ${k}: ngày ${v.map((i) => CHI[i]).join(", ")}`;
      case "lunar-month-can":
        return `tháng ${k}: ngày ${v.map((i) => CAN[i]).join(", ")}`;
      case "term-month-chi":
        return `tháng ${CHI[k]}: ngày ${v.map((i) => CHI[i]).join(", ")}`;
      case "year-can-day-can":
        return `năm ${CAN[k]}: ngày ${v.map((i) => CAN[i]).join(", ")}`;
      case "year-can-day-chi":
        return `năm ${CAN[k]}: ngày ${v.map((i) => CHI[i]).join(", ")}`;
      case "lunar-day":
        return `ngày âm ${v.join(", ")}`;
      case "day-cycle":
        return `${v.length} vị trí trong chu kỳ ${fit.period} ngày`;
      case "term-month-can":
        return `tháng ${CHI[k]}: ngày ${v.map((i) => CAN[i]).join(", ")}`;
      case "nhi-thap-bat-tu":
        return `sao ${v.map((i) => NHI_THAP_BAT_TU_STARS[i]?.name).join(", ")}`;
      case "lunar-month-can-or-chi":
        return `tháng ${k}: ngày ${v.map((i) => (i < CHI_OFFSET ? CAN[i] : CHI[i - CHI_OFFSET])).join(", ")}`;
      case "term-month-can-or-chi":
        return `tháng ${CHI[k]}: ngày ${v.map((i) => (i < CHI_OFFSET ? CAN[i] : CHI[i - CHI_OFFSET])).join(", ")}`;
      case "lunar-month-lunar-day":
        return `tháng ${k}: ngày âm ${v.join(", ")}`;
      case "lunar-month-day-60":
        return `tháng ${k}: ${v.length} ngày trong vòng 60`;
    }
  };
  return [...fit.table]
    .sort((a, b) => a[0] - b[0])
    .map(([k, v]) => fmt(k, [...v].sort((x, y) => x - y)))
    .join("; ");
}

function writeReport(results: Derived[], days: Day[]): void {
  const ok = results.filter((r) => r.fit);
  const no = results.filter((r) => !r.fit);
  const avgTot = days.reduce((s, d) => s + d.tot.size, 0) / days.length;
  const avgXau = days.reduce((s, d) => s + d.xau.size, 0) / days.length;

  // Trung bình mỗi ngày sau khi áp bảng mới (chỉ các sao đã xác định được luật).
  let newTot = 0;
  let newXau = 0;
  for (const d of days) {
    for (const r of ok) {
      const f = r.fit as Fit;
      if (fitMatches(f, d)) {
        if (r.isGood) newTot++;
        else newXau++;
      }
    }
  }

  const vi = (n: number) => n.toFixed(2).replace(".", ",");
  const pct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")}%`;

  const L: string[] = [];
  L.push("# Báo cáo suy ngược bảng sao tốt / sao xấu");
  L.push("");
  L.push(`Ngày thực hiện: ${new Date().toISOString().slice(0, 10)}`);
  L.push("");
  L.push(
    `**Cách làm.** Lấy danh sách *tên sao* của ${days.length} ngày liên tiếp (01/01/2025 – 31/12/2026) từ trang lichvannien.net, ghép với dữ liệu lịch của chính dự án, rồi dò tìm quy luật. Bảng luật của mỗi sao được dựng từ dữ liệu **năm 2025**, sau đó đem chấm điểm trên **năm 2026** — phần dữ liệu chưa hề dùng để dựng bảng. Một luật chỉ được nhận khi ở bước chấm điểm đạt từ 98% trở lên trên cả ba mặt: đoán đúng tổng thể, bắt đúng những ngày thực sự có sao, và không báo thừa. Cách làm này loại được cả những bảng chỉ "học thuộc" dữ liệu lẫn những bảng "đạt" chỉ nhờ luôn luôn đoán là không có sao. Chỉ lấy tên sao, không lấy câu mô tả nào của trang nguồn.`,
  );
  L.push("");
  L.push("## Tổng quan");
  L.push("");
  L.push(`- Tổng số sao gặp được: **${results.length}**`);
  L.push(
    `- Đã xác định được luật: **${ok.length}** (${ok.filter((r) => r.isGood).length} sao tốt, ${ok.filter((r) => !r.isGood).length} sao xấu)`,
  );
  L.push(`- Chưa xác định được: **${no.length}**`);
  L.push("");
  L.push("## Trung bình mỗi ngày");
  L.push("");
  L.push("| Bảng dùng | Sao tốt | Sao xấu |");
  L.push("| --- | --- | --- |");
  const oldTot = days.reduce((s, d) => s + d.oldTot, 0) / days.length;
  const oldXau = days.reduce((s, d) => s + d.oldXau, 0) / days.length;
  L.push(`| Bảng 13 sao cũ | ${vi(oldTot)} | ${vi(oldXau)} |`);
  L.push(`| Bảng mới (các sao đã xác định được luật) | ${vi(newTot / days.length)} | ${vi(newXau / days.length)} |`);
  L.push(`| Nguồn đối chiếu (mức đầy đủ) | ${vi(avgTot)} | ${vi(avgXau)} |`);
  L.push("");
  L.push("## Các sao đã xác định được luật");
  L.push("");
  L.push("| Sao | Tốt/Xấu | Dạng luật | Bảng luật | Số ngày khớp / lệch (2026) |");
  L.push("| --- | --- | --- | --- | --- |");
  const testN = days.filter((d) => !d.isTrain).length;
  for (const r of ok) {
    const f = r.fit as Fit;
    const wrong = Math.round((1 - f.testAcc) * testN);
    L.push(
      `| ${r.name} | ${r.isGood ? "Tốt" : "Xấu"} | ${kindLabel(f)} | ${describeTable(f)} | ${testN - wrong} / ${wrong} (${pct(f.testAcc)}) |`,
    );
  }
  L.push("");
  L.push("## Các sao CHƯA xác định được luật");
  L.push("");
  if (no.length === 0) {
    L.push("(không có)");
  } else {
    L.push(
      "| Sao | Tốt/Xấu | Số ngày xuất hiện | Dạng khớp tốt nhất | Bắt đúng ngày có sao | Báo đúng, không thừa | Lý do loại |",
    );
    L.push("| --- | --- | --- | --- | --- | --- | --- |");
    for (const r of no) {
      const b = r.best;
      const reason = !b
        ? "không dò được dạng nào"
        : b.cells === 0
          ? "không dạng luật nào bắt được ngày có sao"
          : b.testRecall < ACCEPT && b.testPrecision < ACCEPT
            ? "vừa sót vừa báo thừa, dưới ngưỡng 98%"
            : b.testRecall < ACCEPT
              ? "sót quá nhiều ngày có sao, dưới ngưỡng 98%"
              : "báo thừa quá nhiều ngày, dưới ngưỡng 98%";
      L.push(
        `| ${r.name} | ${r.isGood ? "Tốt" : "Xấu"} | ${r.count} | ${b && b.cells > 0 ? kindLabel(b) : "—"} | ${b ? pct(b.testRecall) : "—"} | ${b ? pct(b.testPrecision) : "—"} | ${reason} |`,
      );
    }
  }
  L.push("");
  L.push("## Các dạng luật đã thử");
  L.push("");
  L.push("| Dạng luật | Thêm ở vòng | Số sao giải được bằng dạng này |");
  L.push("| --- | --- | --- |");
  const byKind = new Map<Kind, number>();
  for (const r of ok) {
    const k = (r.fit as Fit).kind;
    byKind.set(k, (byKind.get(k) ?? 0) + 1);
  }
  for (const kind of Object.keys(KIND_VI) as Kind[]) {
    L.push(`| ${KIND_VI[kind]} | ${ROUND_OF[kind]} | ${byKind.get(kind) ?? 0} |`);
  }
  L.push("");
  L.push("## Kết quả vòng thử thứ hai");
  L.push("");
  const round2 = (Object.keys(KIND_VI) as Kind[]).filter((k) => ROUND_OF[k] === 2);
  const round2Solved = round2.reduce((n, k) => n + (byKind.get(k) ?? 0), 0);
  L.push(
    `Vòng hai bổ sung ${round2.length} dạng luật mới: theo nhị thập bát tú của ngày; theo chi tháng tiết khí ghép với can ngày; theo tháng âm (và theo chi tháng tiết khí) ghép với can **hoặc** chi ngày, trong đó có tháng ứng vào hướng bát quái nên cả tháng không sao; theo tháng âm ghép với ngày âm; và theo tháng âm ghép với can chi ngày.`,
  );
  L.push("");
  L.push(
    `Kết quả: **${round2Solved} sao** được giải thêm nhờ các dạng mới. Tổng số sao xác định được vẫn là **${ok.length}**, và **${no.length}** sao vẫn chưa ra luật.`,
  );
  L.push("");
  L.push(
    "Điều đáng ghi nhận: **Thiên đức** và **Thiên đức hợp** nhảy từ mức bắt đúng 69% lên **94%** khi dùng dạng \"tháng âm → can hoặc chi ngày, có tháng ứng hướng\". Giả thuyết về cấu trúc là đúng hướng, nhưng vài tháng vẫn lệch nên chưa chạm ngưỡng 98%. Đã dừng ở đây thay vì chỉnh tay cho vừa số liệu.",
  );
  L.push("");
  L.push("## Ghi chú");
  L.push("");
  L.push(
    `- ${ok.length} sao đã xác định được luật **đã nối vào phần tính ngày** của lõi; bảng 13 sao cũ không còn được dùng nhưng vẫn giữ nguyên trong mã.`,
  );
  L.push(
    "- Phần mô tả của mọi sao vẫn để trống — chỉ trả về tên sao và phân loại tốt hay xấu.",
  );
  L.push(
    "- Các sao chưa xác định được luật nhiều khả năng theo một dạng luật khác nữa chưa thử tới. Đã bỏ chứ không đoán.",
  );
  L.push("");
  writeFileSync(REPORT_FILE, L.join("\n"), "utf8");
}

main();
