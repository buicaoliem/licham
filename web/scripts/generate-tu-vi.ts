#!/usr/bin/env node
/**
 * Chạy lúc BUILD (xem package.json "build"), không chạy khi người dùng mở trang.
 * Gọi Gemini đúng 12 lần — một lần cho mỗi con giáp — sinh nội dung tử vi cho ngày hôm nay
 * (giờ Việt Nam) rồi ghi vào data/tu-vi/{YYYY-MM-DD}.json để trang đọc tĩnh.
 *
 * Không bao giờ làm hỏng build: thiếu khóa, model không tồn tại, hay Gemini lỗi đều chỉ ghi
 * cảnh báo rồi dùng file cũ nhất hiện có (hoặc nội dung giữ chỗ nếu chưa từng có file nào).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CHI, getDayInfo, vietnamDateOf } from "@licham/core";
import {
  CON_GIAP_LIST,
  QUAN_HE_LABEL,
  dateStr,
  listAvailableTuViDates,
  placeholderTuViData,
  quanHeVoiNgay,
  readTuViFile,
  type ConGiap,
  type TuViDayData,
  type TuViEntry,
} from "../lib/tu-vi";

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "tu-vi");

const PRIMARY_MODEL = "gemini-3-flash";
const FALLBACK_MODEL = "gemini-2.5-flash";
/** 1 lần gọi đầu + tối đa 2 lần thử lại. */
const MAX_ATTEMPTS = 3;

interface DayContext {
  dayChiIndex: number;
  ngayChiTen: string;
  solarLabel: string;
  ngayCanChi: string;
  saoTot: string;
  saoXau: string;
  gioHoangDao: string;
}

interface GeminiError extends Error {
  status?: number;
  body?: string;
}

function hourRangeLabel(start: string, end: string): string {
  return `${Number.parseInt(start, 10)}h–${Number.parseInt(end, 10)}h`;
}

function buildDayContext(day: { day: number; month: number; year: number }): DayContext {
  const info = getDayInfo(day);
  const dayChiIndex = info.canChi.day.chiIndex;
  return {
    dayChiIndex,
    ngayChiTen: CHI[dayChiIndex]!,
    solarLabel: `${day.day}/${String(day.month).padStart(2, "0")}/${day.year}`,
    ngayCanChi: info.canChi.day.name,
    saoTot: (info.saoTot ?? []).map((s) => s.name).join(", ") || "không có",
    saoXau: (info.saoXau ?? []).map((s) => s.name).join(", ") || "không có",
    gioHoangDao:
      info.hours
        .filter((h) => h.isHoangDao)
        .map((h) => `${CHI[h.chiIndex]} (${hourRangeLabel(h.start, h.end)})`)
        .join(", ") || "không có giờ hoàng đạo",
  };
}

function buildPrompt(ctx: DayContext, conGiap: ConGiap): string {
  const quanHe = quanHeVoiNgay(ctx.dayChiIndex, conGiap.chiIndex);
  return `Bạn viết nội dung tử vi ngày cho một trang lịch âm Việt Nam. Viết tiếng Việt tự nhiên, giọng điềm đạm.

Dữ kiện của ngày (không phải dữ liệu người dùng, chỉ dùng để luận):
- Ngày dương lịch: ${ctx.solarLabel}
- Can chi ngày: ${ctx.ngayCanChi}
- Sao tốt trong ngày: ${ctx.saoTot}
- Sao xấu trong ngày: ${ctx.saoXau}
- Giờ hoàng đạo trong ngày: ${ctx.gioHoangDao}

Tuổi cần luận: chi "${conGiap.ten}".
Quan hệ giữa chi ngày (${ctx.ngayChiTen}) và chi tuổi này: ${QUAN_HE_LABEL[quanHe]}.

Yêu cầu:
- Viết một đoạn 2 đến 3 câu luận cho tuổi ${conGiap.ten} trong ngày này, dựa trên quan hệ đã nêu ở trên.
- Không dọa nạt, không hứa hẹn tiền bạc, không nói về sức khỏe, bệnh tật hay sinh tử.
- Câu văn phải khác với văn phong liệt kê dữ kiện, đọc như một lời khuyên nhẹ nhàng.
- Chọn một mức đánh giá là số nguyên từ 1 đến 5 (5 là tốt nhất) phù hợp với quan hệ đã nêu.
- Chọn một khung giờ tốt nhất trong ngày cho tuổi này, lấy từ đúng danh sách giờ hoàng đạo đã cho, viết dạng "7h–9h".

Trả về DUY NHẤT một object JSON, không kèm chữ nào khác, không dùng markdown, đúng dạng:
{"luan": "...", "diem": 4, "gioTot": "7h–9h"}`;
}

function isModelNotFoundError(err: GeminiError): boolean {
  return err.status === 404 || /not found|not supported|invalid model/i.test(err.body ?? "");
}

async function callGemini(model: string, apiKey: string, prompt: string): Promise<unknown> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.9 },
    }),
  });
  const bodyText = await res.text();
  if (!res.ok) {
    const err: GeminiError = new Error(`Gemini API lỗi ${res.status}`);
    err.status = res.status;
    err.body = bodyText;
    throw err;
  }
  const json = JSON.parse(bodyText) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini không trả về nội dung");
  return JSON.parse(text);
}

interface ModelState {
  current: string;
  apiKey: string;
}

async function generateOne(ctx: DayContext, conGiap: ConGiap, state: ModelState): Promise<{ entry: TuViEntry; model: string }> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const data = (await callGemini(state.current, state.apiKey, buildPrompt(ctx, conGiap))) as {
        luan?: unknown;
        diem?: unknown;
        gioTot?: unknown;
      };
      if (typeof data.luan !== "string" || typeof data.diem !== "number" || typeof data.gioTot !== "string") {
        throw new Error(`Dữ liệu trả về không đúng dạng cho tuổi ${conGiap.ten}`);
      }
      const diem = Math.min(5, Math.max(1, Math.round(data.diem)));
      return { entry: { luan: data.luan, diem, gioTot: data.gioTot }, model: state.current };
    } catch (err) {
      lastErr = err;
      if (isModelNotFoundError(err as GeminiError) && state.current !== FALLBACK_MODEL) {
        console.warn(`tu-vi: model ${state.current} không dùng được, chuyển sang ${FALLBACK_MODEL}.`);
        state.current = FALLBACK_MODEL;
      }
    }
  }
  throw lastErr;
}

function writeData(outPath: string, data: TuViDayData): void {
  writeFileSync(outPath, `${JSON.stringify(data, null, 2)}\n`);
}

function applyFallback(day: { day: number; month: number; year: number }, outPath: string, reason: string): void {
  console.warn(`tu-vi: ${reason} Dùng file cũ nhất hiện có nếu có, ngược lại dùng nội dung giữ chỗ.`);
  const latestDate = listAvailableTuViDates().at(-1);
  const latest = latestDate ? readTuViFile(latestDate) : null;
  const fallback: TuViDayData = latest
    ? { ...latest, date: dateStr(day), generatedAt: new Date().toISOString(), model: "fallback-cu" }
    : placeholderTuViData(day);
  writeData(outPath, fallback);
}

async function main(): Promise<void> {
  const day = vietnamDateOf(new Date());
  const wanted = dateStr(day);
  const outPath = join(DATA_DIR, `${wanted}.json`);
  mkdirSync(DATA_DIR, { recursive: true });

  if (existsSync(outPath)) {
    console.log(`tu-vi: đã có ${wanted}.json, không gọi lại Gemini.`);
    return;
  }

  // KHÔNG bao giờ in khóa API ra màn hình hay ghi vào file.
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    applyFallback(day, outPath, "Thiếu biến môi trường GEMINI_API_KEY, bỏ qua bước sinh nội dung.");
    return;
  }

  const ctx = buildDayContext(day);
  const state: ModelState = { current: PRIMARY_MODEL, apiKey };
  const tuoi: Record<string, TuViEntry> = {};
  let usedModel = PRIMARY_MODEL;

  try {
    for (const conGiap of CON_GIAP_LIST) {
      const { entry, model } = await generateOne(ctx, conGiap, state);
      usedModel = model;
      tuoi[conGiap.slug] = entry;
      console.log(`tu-vi: đã sinh xong tuổi ${conGiap.ten} (model ${model}).`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    applyFallback(day, outPath, `Gọi Gemini thất bại (${message}).`);
    return;
  }

  writeData(outPath, {
    date: wanted,
    generatedAt: new Date().toISOString(),
    model: usedModel,
    tuoi,
  });
  console.log(`tu-vi: đã ghi ${wanted}.json (model ${usedModel}).`);
}

main().catch((err: unknown) => {
  console.error("tu-vi: lỗi không mong đợi, build vẫn tiếp tục:", err instanceof Error ? err.message : err);
  process.exit(0);
});
