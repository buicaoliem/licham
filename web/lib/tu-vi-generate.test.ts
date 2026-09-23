import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CON_GIAP_LIST, DIEM_RANGE, getTuViData, loadTuViDay, quanHeVoiNgay, type TuViDayData } from "./tu-vi";
import {
  DEFAULT_MAX_REQUESTS,
  FALLBACK_MODEL,
  MAX_OUTPUT_TOKENS,
  PRIMARY_MODEL,
  buildDayContext,
  fsTuViStore,
  parseBatchResponse,
  refuseInBuildEnv,
  runTuViGeneration,
  writeJsonAtomic,
  type TuViStore,
} from "./tu-vi-generate";

/** 10h sáng 23/9/2026 giờ Việt Nam. */
const NOW = new Date("2026-09-23T03:00:00Z");
const TODAY = "2026-09-23";
const YESTERDAY = "2026-09-22";
const FAKE_KEY = "test-key-khong-duoc-in-ra-0123456789";
const CTX = buildDayContext({ day: 23, month: 9, year: 2026 });

/** 12 lời luận khác hẳn nhau — validator loại các cặp tuổi dùng chung một lời luận. */
const LUAN_12 = [
  "Buổi sáng thuận để sắp xếp giấy tờ còn dang dở, chiều nên dành thời gian cho người thân trong nhà.",
  "Công việc cần kiên nhẫn hơn thường lệ; bàn bạc kỹ với đồng nghiệp trước khi chốt kế hoạch mới.",
  "Hợp gặp gỡ bạn cũ, trò chuyện cởi mở giúp gỡ được một vướng mắc đã kéo dài từ tuần trước.",
  "Nên giữ lời nói mềm mỏng, tránh tranh cãi chuyện nhỏ ở nơi làm việc để không mất hòa khí.",
  "Thời điểm tốt để học thêm một kỹ năng, đọc sách hoặc hoàn thiện dự án cá nhân đang ấp ủ.",
  "Việc đi lại nên chuẩn bị chu đáo, kiểm tra lịch hẹn kỹ càng để khỏi lỡ những cuộc gặp quan trọng.",
  "Tinh thần phấn chấn, dễ nhận được sự ủng hộ khi đề xuất ý tưởng với cấp trên hoặc đối tác.",
  "Hãy ưu tiên dọn dẹp nhà cửa, sắp xếp lại góc làm việc cho gọn gàng, tâm trí sẽ nhẹ nhõm hơn.",
  "Người tuổi này nên lắng nghe nhiều hơn nói, một lời góp ý chân thành từ bạn bè sẽ rất đáng giá.",
  "Chuyện gia đình êm ấm, buổi tối quây quần bên mâm cơm là cách vun đắp tình cảm tốt nhất hôm nay.",
  "Đừng vội vàng quyết định việc lớn; ghi chép lại các phương án rồi cân nhắc thêm vài ngày nữa.",
  "Nhịp làm việc đều đặn mang lại kết quả chắc chắn, cuối ngày có thể tự thưởng một chút nghỉ ngơi.",
];

interface Item {
  slug: string;
  luan: string;
  diem: number;
  gioTot: string;
}

function validItems(): Item[] {
  return CON_GIAP_LIST.map((cg, i) => ({
    slug: cg.slug,
    luan: LUAN_12[i]!,
    diem: DIEM_RANGE[quanHeVoiNgay(CTX.dayChiIndex, cg.chiIndex)][0],
    gioTot: CTX.gioHoangDaoRanges[i % CTX.gioHoangDaoRanges.length]!,
  }));
}
const batch = (tuoi: unknown = validItems(), date: unknown = TODAY) => ({ date, tuoi });

function geminiBody(payload: unknown, finishReason = "STOP"): Response {
  const text = typeof payload === "string" ? payload : JSON.stringify(payload);
  return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text }] }, finishReason }] }), { status: 200 });
}

interface Call {
  url: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

/** fetch giả: mỗi lần gọi lấy phản hồi kế tiếp từ `responder`, ghi lại URL, header và body. */
function fakeFetch(responder: (n: number, call: Call, init: RequestInit) => Response | Promise<Response>) {
  const calls: Call[] = [];
  const fn = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const call = {
      url: String(input),
      headers: { ...(init?.headers as Record<string, string>) },
      body: JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>,
    };
    calls.push(call);
    return responder(calls.length, call, init ?? {});
  }) as typeof fetch;
  return { fn, calls };
}

function captureLogger() {
  const lines: string[] = [];
  const push = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  return { logger: { log: push, warn: push, error: push }, lines };
}

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "tu-vi-gen-"));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

const run = (fetchFn: typeof fetch, extra: Partial<Parameters<typeof runTuViGeneration>[0]> = {}) => {
  const { logger, lines } = captureLogger();
  const sleeps: number[] = [];
  const promise = runTuViGeneration({
    dataDir: dir,
    apiKey: FAKE_KEY,
    now: NOW,
    fetch: fetchFn,
    retryDelayMs: 0,
    timeoutMs: 1_000,
    logger,
    sleep: async (ms) => {
      sleeps.push(ms);
    },
    ...extra,
  });
  return { promise, lines, sleeps };
};

const validDay = (date: string, luan: string[] = LUAN_12): TuViDayData => ({
  date,
  generatedAt: "2026-09-22T17:12:00.000Z",
  model: FALLBACK_MODEL,
  tuoi: Object.fromEntries(CON_GIAP_LIST.map((cg, i) => [cg.slug, { luan: luan[i]!, diem: 3, gioTot: "7h–9h" }])),
});
const filesIn = () => readdirSync(dir).sort();

describe("Một request hợp lệ đủ 12 tuổi", () => {
  it("một request duy nhất, lưu đủ 12 tuổi, khóa đi qua header chứ không nằm trong URL/log", async () => {
    const f = fakeFetch(() => geminiBody(batch()));
    const { promise, lines } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(1);
    const c = f.calls[0]!;
    expect(c.headers["x-goog-api-key"]).toBe(FAKE_KEY);
    expect(c.url).not.toContain(FAKE_KEY);
    expect(c.url).toContain(`/models/${PRIMARY_MODEL}:generateContent`);
    const loaded = loadTuViDay(TODAY, dir);
    expect(loaded.status).toBe("ok");
    if (loaded.status === "ok") {
      expect(loaded.data.model).toBe(PRIMARY_MODEL);
      expect(loaded.data.canChiNgay).toBe(CTX.ngayCanChi);
      expect(Object.keys(loaded.data.tuoi)).toHaveLength(12);
      expect(loaded.data.tuoi["ty-ran"]!.luan).toBe(LUAN_12[5]);
    }
    expect(filesIn()).toEqual([`${TODAY}.json`]); // không còn tệp tạm hay khóa
    expect(lines.join("\n")).not.toContain(FAKE_KEY);
  });

  it("request có schema JSON, trần output token và tắt thinking ở model 2.5-flash", async () => {
    const f = fakeFetch(() => geminiBody(batch()));
    await run(f.fn).promise;
    const cfg = f.calls[0]!.body.generationConfig as Record<string, unknown>;
    expect(cfg.responseMimeType).toBe("application/json");
    expect(cfg.maxOutputTokens).toBe(MAX_OUTPUT_TOKENS);
    expect(cfg.thinkingConfig).toEqual({ thinkingBudget: 0 });
    const schema = cfg.responseSchema as { properties: { date: { enum: string[] }; tuoi: Record<string, unknown> } };
    expect(schema.properties.date.enum).toEqual([TODAY]);
    expect(schema.properties.tuoi.minItems).toBe(12);
    expect(schema.properties.tuoi.maxItems).toBe(12);
    // Prompt mang dữ kiện lịch do core tính, không bắt Gemini tự suy ra.
    const prompt = JSON.stringify(f.calls[0]!.body.contents);
    expect(prompt).toContain(CTX.ngayCanChi);
    for (const g of CTX.gioHoangDaoRanges) expect(prompt).toContain(g);
  });

  it("model dự phòng không nhận thinkingConfig (tránh 400 ở model không hỗ trợ)", async () => {
    const f = fakeFetch(() => geminiBody(batch()));
    await run(f.fn, { primaryModel: FALLBACK_MODEL }).promise;
    expect((f.calls[0]!.body.generationConfig as Record<string, unknown>).thinkingConfig).toBeUndefined();
  });

  it("chuẩn hóa sai lệch vô hại: điểm 4.0, gạch nối thường, bọc ```json", async () => {
    const items = validItems().map((it) => ({ ...it, diem: it.diem + 0.0, gioTot: it.gioTot.replace("–", " - ") }));
    const f = fakeFetch(() => geminiBody("```json\n" + JSON.stringify(batch(items)) + "\n```"));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    const loaded = loadTuViDay(TODAY, dir);
    if (loaded.status === "ok") expect(loaded.data.tuoi.ty!.gioTot).toBe(CTX.gioHoangDaoRanges[0]);
  });

  it("lần đầu sai schema, lần thử lại đúng → vẫn lưu, tổng 2 request", async () => {
    const f = fakeFetch((n) => (n === 1 ? geminiBody(batch(validItems().slice(0, 11))) : geminiBody(batch())));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    if (r.status === "written") expect(r.requests).toBe(2);
  });
});

describe("Phản hồi thiếu, trùng, sai schema, bị cắt → không lưu gì", () => {
  const items = validItems;
  it.each<[string, () => unknown]>([
    ["thiếu một tuổi", () => batch(items().slice(0, 11))],
    ["trùng tuổi (Tý hai lần, thiếu Hợi)", () => batch([...items().slice(0, 11), { ...items()[0]!, luan: LUAN_12[11]! }])],
    ["13 phần tử", () => batch([...items(), { ...items()[0]!, slug: "meo" }])],
    ["slug lạ", () => batch(items().map((it, i) => (i === 3 ? { ...it, slug: "meo" } : it)))],
    ["date sai ngày", () => batch(items(), YESTERDAY)],
    ["tuoi không phải mảng", () => ({ date: TODAY, tuoi: Object.fromEntries(items().map((it) => [it.slug, it])) })],
    ["luận rỗng ở một tuổi", () => batch(items().map((it, i) => (i === 7 ? { ...it, luan: "" } : it)))],
    ["điểm là chuỗi", () => batch(items().map((it, i) => (i === 2 ? { ...it, diem: "4" } : it)))],
    ["điểm ngược luật (xung mà 5 sao)", () => {
      const xung = CON_GIAP_LIST.findIndex((cg) => quanHeVoiNgay(CTX.dayChiIndex, cg.chiIndex) === "xung");
      return batch(items().map((it, i) => (i === xung ? { ...it, diem: 5 } : it)));
    }],
    ["giờ không thuộc giờ hoàng đạo", () => batch(items().map((it, i) => (i === 1 ? { ...it, gioTot: "2h–3h" } : it)))],
    ["hai tuổi dùng chung lời luận", () => batch(items().map((it, i) => (i === 4 ? { ...it, luan: LUAN_12[0]! } : it)))],
    ["lời luận chép gần nguyên văn, chỉ đổi một chữ", () =>
      batch(items().map((it, i) => (i === 6 ? { ...it, luan: LUAN_12[0]!.replace("Buổi sáng", "Sáng nay") } : it)))],
    ["lời luận tự bịa can chi ngày", () =>
      batch(items().map((it, i) => (i === 9 ? { ...it, luan: `Ngày Giáp Tý hôm nay ${it.luan}` } : it)))],
    ["không phải object", () => "[1,2,3]"],
  ])("%s → dùng hết trần request rồi dừng, không lưu", async (_label, payload) => {
    const f = fakeFetch(() => geminiBody(payload()));
    const { promise, lines } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") {
      expect(r.category).toBe("invalid");
      expect(r.requests).toBe(DEFAULT_MAX_REQUESTS);
    }
    expect(f.calls).toHaveLength(DEFAULT_MAX_REQUESTS);
    // 2 lần model chính rồi 1 lần model dự phòng.
    expect(f.calls.map((c) => c.url.includes(FALLBACK_MODEL))).toEqual([false, false, true]);
    expect(filesIn()).toEqual([]);
    expect(lines.some((l) => l.includes("LỖI"))).toBe(true);
  });

  it("output bị cắt (finishReason MAX_TOKENS) → không dùng dù phần đầu có vẻ hợp lệ", async () => {
    const full = JSON.stringify(batch());
    const f = fakeFetch(() => geminiBody(full.slice(0, Math.floor(full.length * 0.6)), "MAX_TOKENS"));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.reason).toContain("bị cắt");
    expect(filesIn()).toEqual([]);
  });

  it("MAX_TOKENS kể cả khi JSON trông đủ → vẫn bỏ", async () => {
    const f = fakeFetch(() => geminiBody(batch(), "MAX_TOKENS"));
    const r = await run(f.fn, { maxRequests: 1 }).promise;
    expect(r.status).toBe("failed");
    expect(filesIn()).toEqual([]);
  });

  it("JSON lỗi (cắt giữa chừng, không có finishReason lạ) → không lưu", async () => {
    const f = fakeFetch(() => geminiBody('{"date":"2026-09-23","tuoi":[{"slug":"ty","luan":"Buổi sáng'));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.reason).toContain("JSON lỗi");
    expect(filesIn()).toEqual([]);
  });

  it.each([
    ["không có candidate", () => new Response(JSON.stringify({ candidates: [] }), { status: 200 })],
    ["bị chặn an toàn", () => new Response(JSON.stringify({ promptFeedback: { blockReason: "SAFETY" } }), { status: 200 })],
    ["phản hồi API không phải JSON", () => new Response("<html>502</html>", { status: 200 })],
  ])("%s → không lưu", async (_l, respond) => {
    const f = fakeFetch(() => respond());
    expect((await run(f.fn).promise).status).toBe("failed");
    expect(filesIn()).toEqual([]);
  });

  it("parseBatchResponse báo đủ lỗi thiếu và trùng", () => {
    const r = parseBatchResponse(batch([...validItems().slice(0, 10), validItems()[0]!]), CTX);
    expect("errors" in r).toBe(true);
    if ("errors" in r) {
      const all = r.errors.join(" | ");
      expect(all).toContain("trùng tuổi Tý");
      expect(all).toContain("thiếu tuổi Tuất");
      expect(all).toContain("thiếu tuổi Hợi");
      expect(all).toContain("cần đúng 12");
    }
  });
});

describe("API lỗi, quota, timeout — giới hạn request và thời gian", () => {
  it("403 (khóa sai/hết quyền) → dừng ngay sau 1 request, không in khóa", async () => {
    const f = fakeFetch(
      () => new Response(JSON.stringify({ error: { message: `API key ${FAKE_KEY} is not valid` } }), { status: 403 }),
    );
    const { promise, lines } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("failed");
    expect(f.calls).toHaveLength(1);
    expect(filesIn()).toEqual([]);
    expect(lines.join("\n")).not.toContain(FAKE_KEY);
    if (r.status === "failed") expect(r.reason).not.toContain(FAKE_KEY);
  });

  it("500 liên tục → đúng 3 request (2 model chính + 1 dự phòng), chờ tăng dần, không lưu", async () => {
    const f = fakeFetch(() => new Response("backend error", { status: 500 }));
    const { promise, sleeps } = run(f.fn, { retryDelayMs: 5_000 });
    const r = await promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.category).toBe("api");
    expect(f.calls.map((c) => c.url.includes(FALLBACK_MODEL))).toEqual([false, false, true]);
    expect(sleeps).toEqual([5_000, 10_000]);
    expect(filesIn()).toEqual([]);
  });

  it("maxRequests=1 → không bao giờ vượt 1 request", async () => {
    const f = fakeFetch(() => new Response("backend error", { status: 500 }));
    const r = await run(f.fn, { maxRequests: 1 }).promise;
    expect(r.status).toBe("failed");
    expect(f.calls).toHaveLength(1);
  });

  it("model chính quá tải (503) liên tục → model dự phòng ghi được ở request thứ 3", async () => {
    const overloaded = '{"error":{"code":503,"message":"This model is currently experiencing high demand.","status":"UNAVAILABLE"}}';
    const f = fakeFetch((_n, call) =>
      call.url.includes(PRIMARY_MODEL) ? new Response(overloaded, { status: 503 }) : geminiBody(batch()),
    );
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(3);
    if (r.status === "written") expect(r.model).toBe(FALLBACK_MODEL);
  });

  it("lỗi mạng → không lưu", async () => {
    const f = fakeFetch(() => {
      throw new TypeError("fetch failed");
    });
    const r = await run(f.fn).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.reason).toContain("lỗi mạng");
    expect(filesIn()).toEqual([]);
  });

  it("timeout → hủy yêu cầu, không lưu", async () => {
    const f = fakeFetch(
      (_n, _c, init) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(init.signal!.reason));
        }),
    );
    const r = await run(f.fn, { timeoutMs: 20 }).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") {
      expect(r.reason).toContain("hết thời gian chờ");
      expect(r.category).toBe("timeout");
    }
    expect(f.calls).toHaveLength(3);
    expect(filesIn()).toEqual([]);
  });

  it("model chính 404 → chuyển model dự phòng, ghi đúng tên model đã sinh", async () => {
    const f = fakeFetch((_n, call) =>
      call.url.includes(PRIMARY_MODEL)
        ? new Response('{"error":{"message":"models/x is not found"}}', { status: 404 })
        : geminiBody(batch()),
    );
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(2);
    if (r.status === "written") expect(r.model).toBe(FALLBACK_MODEL);
  });

  const quota429 = (quotaId: string, retryDelay?: string) =>
    new Response(
      JSON.stringify({
        error: {
          code: 429,
          message: "You exceeded your current quota",
          details: [
            { "@type": "type.googleapis.com/google.rpc.QuotaFailure", violations: [{ quotaId }] },
            ...(retryDelay ? [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay }] : []),
          ],
        },
      }),
      { status: 429 },
    );

  it("429 theo phút → chờ đúng retryDelay Google đưa rồi gọi lại, lưu được", async () => {
    const f = fakeFetch((n) =>
      n === 1 ? quota429("GenerateRequestsPerMinutePerProjectPerModel-FreeTier", "23s") : geminiBody(batch()),
    );
    const { promise, sleeps } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(2);
    expect(sleeps).toEqual([24_000]);
  });

  it("hết hạn mức ngày ở cả hai model → 2 request, không chờ, báo nhóm quota, không lưu", async () => {
    const f = fakeFetch(() => quota429("GenerateRequestsPerDayPerProjectPerModel-FreeTier", "40s"));
    const { promise, sleeps } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") {
      expect(r.reason).toContain("theo ngày");
      expect(r.category).toBe("quota");
    }
    expect(f.calls.map((c) => c.url.includes(FALLBACK_MODEL))).toEqual([false, true]);
    expect(sleeps).toEqual([]);
    expect(filesIn()).toEqual([]);
  });

  it("hết hạn mức ngày chỉ ở model chính → model dự phòng lưu được", async () => {
    const f = fakeFetch((_n, call) =>
      call.url.includes(PRIMARY_MODEL) ? quota429("GenerateRequestsPerDayPerProjectPerModel-FreeTier") : geminiBody(batch()),
    );
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(2);
  });

  it("429 đòi chờ vượt thời gian cho phép của lượt → dừng, không lưu", async () => {
    const f = fakeFetch(() => quota429("GenerateRequestsPerMinutePerProjectPerModel-FreeTier", "50s"));
    const { promise, sleeps } = run(f.fn, { maxRunMs: 10_000 });
    const r = await promise;
    expect(r.status).toBe("failed");
    expect(f.calls).toHaveLength(1);
    expect(sleeps).toEqual([]);
    expect(filesIn()).toEqual([]);
  });

  it("thiếu GEMINI_API_KEY → không gọi API, không lưu, báo lỗi rõ", async () => {
    const f = fakeFetch(() => geminiBody(batch()));
    const { promise, lines } = run(f.fn, { apiKey: undefined });
    const r = await promise;
    expect(r.status).toBe("no-key");
    expect(f.calls).toHaveLength(0);
    expect(filesIn()).toEqual([]);
    expect(lines.join("\n")).toContain("GEMINI_API_KEY");
  });
});

describe("Dữ liệu đã tồn tại", () => {
  const placeholder = {
    date: TODAY,
    generatedAt: "2026-09-22T23:10:43.814Z",
    model: "fallback-cu",
    tuoi: Object.fromEntries(CON_GIAP_LIST.map((cg) => [cg.slug, { luan: "", diem: 0, gioTot: "" }])),
  };

  it("file hôm nay hợp lệ → 0 request, không ghi đè", async () => {
    const tPath = join(dir, `${TODAY}.json`);
    writeFileSync(tPath, JSON.stringify(validDay(TODAY)));
    const before = readFileSync(tPath, "utf8");
    const f = fakeFetch(() => geminiBody(batch()));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("exists");
    expect(f.calls).toHaveLength(0);
    expect(readFileSync(tPath, "utf8")).toBe(before);
  });

  it("file hôm nay hợp lệ nhưng không có khóa API → vẫn 'exists', không báo lỗi thiếu khóa", async () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(validDay(TODAY)));
    const r = await run(fakeFetch(() => geminiBody(batch())).fn, { apiKey: undefined }).promise;
    expect(r.status).toBe("exists");
  });

  it("file hôm nay là placeholder → không coi là 'đã có', sinh và thay bằng nội dung thật", async () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(placeholder));
    const r = await run(fakeFetch(() => geminiBody(batch())).fn).promise;
    expect(r.status).toBe("written");
    expect(loadTuViDay(TODAY, dir).status).toBe("ok");
  });

  it("file hôm nay là placeholder + Gemini lỗi → giữ nguyên file, trang vẫn coi là chưa có nội dung", async () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(placeholder));
    const before = readFileSync(join(dir, `${TODAY}.json`), "utf8");
    const r = await run(fakeFetch(() => new Response("unavailable", { status: 503 })).fn).promise;
    expect(r.status).toBe("failed");
    expect(readFileSync(join(dir, `${TODAY}.json`), "utf8")).toBe(before);
    expect(loadTuViDay(TODAY, dir).status).toBe("invalid");
  });

  it("hôm qua có luận thật + hôm nay Gemini lỗi → không mượn luận hôm qua, file hôm qua giữ nguyên", async () => {
    const yPath = join(dir, `${YESTERDAY}.json`);
    writeFileSync(yPath, JSON.stringify(validDay(YESTERDAY)));
    const before = readFileSync(yPath, "utf8");
    const r = await run(fakeFetch(() => new Response("unavailable", { status: 503 })).fn).promise;
    expect(r.status).toBe("failed");
    expect(existsSync(join(dir, `${TODAY}.json`))).toBe(false);
    expect(readFileSync(yPath, "utf8")).toBe(before);
    expect(getTuViData({ day: 23, month: 9, year: 2026 }, dir)).toBeNull();
  });

  it("file mang tên hôm nay nhưng nội dung của ngày khác → không hợp lệ, sinh lại", async () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(validDay(YESTERDAY)));
    expect(loadTuViDay(TODAY, dir).status).toBe("invalid");
    const r = await run(fakeFetch(() => geminiBody(batch())).fn).promise;
    expect(r.status).toBe("written");
  });
});

describe("Hai lượt chạy cùng lúc", () => {
  it("chạy song song cùng thư mục → chỉ một lượt gọi Gemini (1 request), lượt kia 'locked'", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const f = fakeFetch(async () => {
      await gate;
      return geminiBody(batch());
    });
    const a = run(f.fn);
    const b = run(f.fn);
    release();
    const [ra, rb] = await Promise.all([a.promise, b.promise]);
    expect([ra.status, rb.status].sort()).toEqual(["locked", "written"]);
    expect(f.calls).toHaveLength(1);
    expect(filesIn()).toEqual([`${TODAY}.json`]); // khóa đã nhả
  });

  it("lượt sau chạy khi lượt trước đã lưu xong → 'exists', 0 request", async () => {
    const f = fakeFetch(() => geminiBody(batch()));
    expect((await run(f.fn).promise).status).toBe("written");
    expect((await run(f.fn).promise).status).toBe("exists");
    expect(f.calls).toHaveLength(1);
  });

  it("khóa còn mới của lượt khác → 'locked', không gọi Gemini, không xóa khóa", async () => {
    writeFileSync(join(dir, `.${TODAY}.lock`), "{}");
    const f = fakeFetch(() => geminiBody(batch()));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("locked");
    expect(f.calls).toHaveLength(0);
    expect(existsSync(join(dir, `.${TODAY}.lock`))).toBe(true);
  });

  it("khóa cũ của lượt đã chết → giành lại và sinh bình thường", async () => {
    const lock = join(dir, `.${TODAY}.lock`);
    writeFileSync(lock, "{}");
    const old = new Date(Date.now() - 60 * 60_000);
    utimesSync(lock, old, old);
    const r = await run(fakeFetch(() => geminiBody(batch())).fn).promise;
    expect(r.status).toBe("written");
    expect(existsSync(lock)).toBe(false);
  });

  it("lỗi giữa chừng vẫn nhả khóa", async () => {
    await run(fakeFetch(() => new Response("x", { status: 500 })).fn).promise;
    expect(filesIn()).toEqual([]);
  });
});

describe("Qua 00:00 giờ Việt Nam", () => {
  it("16:59:59Z là 23:59:59 ngày 23 ở Việt Nam; 17:00:00Z đã là ngày 24", async () => {
    const f = fakeFetch(() => geminiBody(batch()));
    const r1 = await run(f.fn, { now: new Date("2026-09-23T16:59:59Z") }).promise;
    expect(r1.date).toBe("2026-09-23");
    const r2 = await run(fakeFetch(() => new Response("x", { status: 500 })).fn, {
      now: new Date("2026-09-23T17:00:00Z"),
    }).promise;
    expect(r2.date).toBe("2026-09-24");
    // Ngày 24 dùng can chi/giờ hoàng đạo của ngày 24 trong prompt, không dùng lại của ngày 23.
    const ctx24 = buildDayContext({ day: 24, month: 9, year: 2026 });
    expect(ctx24.ngayCanChi).not.toBe(CTX.ngayCanChi);
  });

  it("lượt bắt đầu 23:59:59 và xong sau nửa đêm → vẫn lưu cho ngày 23, không tạo file ngày 24", async () => {
    let t = new Date("2026-09-23T16:59:59Z").getTime();
    const clock = () => new Date(t);
    const f = fakeFetch(() => {
      t += 5_000; // Gemini trả lời lúc 00:00:04 ngày 24
      return geminiBody(batch());
    });
    const r = await run(f.fn, { now: undefined, clock }).promise;
    expect(r.status).toBe("written");
    expect(r.date).toBe("2026-09-23");
    expect(filesIn()).toEqual(["2026-09-23.json"]);
    const saved = JSON.parse(readFileSync(join(dir, "2026-09-23.json"), "utf8")) as TuViDayData;
    expect(saved.date).toBe("2026-09-23");
    expect(saved.generatedAt).toBe("2026-09-23T17:00:04.000Z");
    // Trang dựng vào ngày 24 không lấy file ngày 23.
    expect(getTuViData({ day: 24, month: 9, year: 2026 }, dir)).toBeNull();
  });
});

describe("Kho lưu lỗi", () => {
  const memStore = (over: Partial<TuViStore>): TuViStore => ({
    describe: (d) => `mem:${d}`,
    load: () => ({ status: "missing" }),
    save: () => {},
    tryLock: () => () => {},
    ...over,
  });

  it("ghi lỗi (đĩa đầy/quyền) → failed nhóm storage, đã nhả khóa", async () => {
    let released = false;
    const store = memStore({
      save: () => {
        throw new Error("ENOSPC: no space left on device");
      },
      tryLock: () => () => {
        released = true;
      },
    });
    const r = await run(fakeFetch(() => geminiBody(batch())).fn, { store, dataDir: undefined }).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") {
      expect(r.category).toBe("storage");
      expect(r.reason).toContain("ENOSPC");
    }
    expect(released).toBe(true);
  });

  it("đọc kho lỗi → failed storage, 0 request", async () => {
    const store = memStore({
      load: () => {
        throw new Error("EACCES");
      },
    });
    const f = fakeFetch(() => geminiBody(batch()));
    const r = await run(f.fn, { store, dataDir: undefined }).promise;
    expect(r.status).toBe("failed");
    expect(f.calls).toHaveLength(0);
  });

  it("ghi 'thành công' nhưng đọc lại không hợp lệ → không công nhận", async () => {
    let n = 0;
    const store = memStore({ load: () => (n++ < 2 ? { status: "missing" } : { status: "invalid", errors: ["hỏng"] }) });
    const r = await run(fakeFetch(() => geminiBody(batch())).fn, { store, dataDir: undefined }).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.category).toBe("storage");
  });

  it("thư mục dữ liệu thực ra là một file → failed storage, không ném lỗi ra ngoài", async () => {
    const notDir = join(dir, "khong-phai-thu-muc");
    writeFileSync(notDir, "x");
    const f = fakeFetch(() => geminiBody(batch()));
    const r = await run(f.fn, { dataDir: notDir }).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.category).toBe("storage");
    expect(f.calls).toHaveLength(0);
  });
});

describe("Build không gọi Gemini", () => {
  const webDir = fileURLToPath(new URL("..", import.meta.url));
  const pkg = JSON.parse(readFileSync(join(webDir, "package.json"), "utf8")) as { scripts: Record<string, string> };
  const vercel = JSON.parse(readFileSync(join(webDir, "vercel.json"), "utf8")) as { buildCommand: string };

  it("script build/postbuild và buildCommand của Vercel không chạy bước sinh tử vi", () => {
    for (const cmd of [pkg.scripts.build!, pkg.scripts.postbuild ?? "", vercel.buildCommand]) {
      expect(cmd).not.toMatch(/generate-tu-vi|generate:tu-vi|tu-vi-e2e|tu-vi:e2e/);
    }
  });

  it("script sinh từ chối chạy trong môi trường Vercel/next build", () => {
    expect(refuseInBuildEnv({ VERCEL: "1" })).not.toBeNull();
    expect(refuseInBuildEnv({ NEXT_PHASE: "phase-production-build" })).not.toBeNull();
    expect(refuseInBuildEnv({ CI: "true", GITHUB_ACTIONS: "true" })).toBeNull();
  });

  it("đọc dữ liệu cho trang (như lúc build) không gọi mạng và không ghi file", () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(validDay(TODAY)));
    const spy = vi.spyOn(globalThis, "fetch");
    const before = filesIn();
    for (let i = 0; i < 3; i++) expect(getTuViData({ day: 23, month: 9, year: 2026 }, dir)).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
    expect(filesIn()).toEqual(before);
    spy.mockRestore();
  });

  it("kho mặc định đọc lại được dữ liệu đã lưu mà không cần Gemini", async () => {
    await run(fakeFetch(() => geminiBody(batch())).fn).promise;
    const store = fsTuViStore(dir);
    expect(store.load(TODAY).status).toBe("ok");
  });
});

describe("Ghi file an toàn", () => {
  it("ghi thành công không để lại tệp tạm", () => {
    const p = join(dir, "sub", "a.json");
    writeJsonAtomic(p, { x: 1 });
    expect(JSON.parse(readFileSync(p, "utf8"))).toEqual({ x: 1 });
    expect(readdirSync(join(dir, "sub"))).toEqual(["a.json"]);
  });

  it("đổi tên thất bại → dọn tệp tạm và ném lỗi", () => {
    const p = join(dir, "busy.json");
    mkdirSync(p); // đích là thư mục: rename sẽ lỗi
    expect(() => writeJsonAtomic(p, { x: 1 })).toThrow();
    expect(filesIn()).toEqual(["busy.json"]);
  });
});
