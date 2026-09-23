import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CON_GIAP_LIST, loadTuViDay } from "./tu-vi";
import { FALLBACK_MODEL, PRIMARY_MODEL, gioHoangDaoRanges, runTuViGeneration, writeJsonAtomic } from "./tu-vi-generate";

/** 10h sáng 23/9/2026 giờ Việt Nam. */
const NOW = new Date("2026-09-23T03:00:00Z");
const TODAY = "2026-09-23";
const YESTERDAY = "2026-09-22";
const FAKE_KEY = "test-key-khong-duoc-in-ra-0123456789";
const GIO = gioHoangDaoRanges({ day: 23, month: 9, year: 2026 })[0]!;
const LUAN = "Ngày bình hòa, tuổi này nên giữ nhịp đều, làm trọn việc đã định và tránh tranh luận không cần thiết.";

interface Call {
  url: string;
  headers: Record<string, string>;
}

function geminiBody(payload: unknown): Response {
  const text = typeof payload === "string" ? payload : JSON.stringify(payload);
  return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text }] }, finishReason: "STOP" }] }), {
    status: 200,
  });
}

/** fetch giả: mỗi lần gọi lấy phản hồi kế tiếp từ `responder`, ghi lại URL và header. */
function fakeFetch(responder: (n: number, call: Call, init: RequestInit) => Response | Promise<Response>) {
  const calls: Call[] = [];
  const fn = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const call = { url: String(input), headers: { ...(init?.headers as Record<string, string>) } };
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

const validDay = (date: string, luan = LUAN) => ({
  date,
  generatedAt: "2026-09-22T17:12:00.000Z",
  model: FALLBACK_MODEL,
  tuoi: Object.fromEntries(CON_GIAP_LIST.map((cg) => [cg.slug, { luan, diem: 3, gioTot: GIO }])),
});
const filesIn = () => readdirSync(dir).sort();

describe("Gemini trả nội dung hợp lệ", () => {
  it("ghi đủ 12 tuổi, file đọc lại hợp lệ, khóa đi qua header chứ không nằm trong URL", async () => {
    const f = fakeFetch(() => geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }));
    const { promise, lines } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(12);
    expect(f.calls.every((c) => c.headers["x-goog-api-key"] === FAKE_KEY && !c.url.includes(FAKE_KEY))).toBe(true);
    expect(f.calls[0]!.url).toContain(`/models/${PRIMARY_MODEL}:generateContent`);
    const loaded = loadTuViDay(TODAY, dir);
    expect(loaded.status).toBe("ok");
    if (loaded.status === "ok") {
      expect(loaded.data.model).toBe(PRIMARY_MODEL);
      expect(Object.keys(loaded.data.tuoi)).toHaveLength(12);
    }
    expect(filesIn()).toEqual([`${TODAY}.json`]); // không còn tệp tạm
    expect(lines.join("\n")).not.toContain(FAKE_KEY);
  });

  it("chuẩn hóa sai lệch vô hại: điểm 4.0, gạch nối thường, bọc ```json", async () => {
    const gioHyphen = GIO.replace("–", " - ");
    const f = fakeFetch(() => geminiBody("```json\n" + JSON.stringify({ luan: LUAN, diem: 4.0, gioTot: gioHyphen }) + "\n```"));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    const loaded = loadTuViDay(TODAY, dir);
    if (loaded.status === "ok") expect(loaded.data.tuoi.ty!.gioTot).toBe(GIO);
  });

  it("một lần trả sai rồi lần thử lại trả đúng thì vẫn ghi", async () => {
    const f = fakeFetch((n) => (n === 1 ? geminiBody({ luan: "" }) : geminiBody({ luan: LUAN, diem: 4, gioTot: GIO })));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(13);
  });
});

describe("Gemini trả rỗng hoặc sai schema", () => {
  it.each([
    ["phản hồi không có candidate", () => new Response(JSON.stringify({ candidates: [] }), { status: 200 })],
    ["text rỗng", () => geminiBody("")],
    ["text không phải JSON", () => geminiBody("Xin lỗi, tôi không thể trả lời.")],
    ["luận rỗng", () => geminiBody({ luan: "", diem: 3, gioTot: GIO })],
    ["thiếu điểm", () => geminiBody({ luan: LUAN, gioTot: GIO })],
    ["điểm ngoài 1-5", () => geminiBody({ luan: LUAN, diem: 9, gioTot: GIO })],
    ["giờ không thuộc giờ hoàng đạo", () => geminiBody({ luan: LUAN, diem: 3, gioTot: "2h–3h" })],
    ["bị chặn an toàn", () => new Response(JSON.stringify({ promptFeedback: { blockReason: "SAFETY" } }), { status: 200 })],
  ])("%s → thử 3 lần mỗi model (chính + dự phòng) rồi dừng, không ghi file", async (_label, respond) => {
    const f = fakeFetch(() => respond());
    const { promise, lines } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("failed");
    expect(f.calls).toHaveLength(6);
    expect(filesIn()).toEqual([]);
    expect(lines.some((l) => l.includes("LỖI"))).toBe(true);
  });

  it("11 tuổi đúng, tuổi cuối luôn sai → không ghi file thiếu tuổi", async () => {
    const f = fakeFetch((n) =>
      n <= 11 ? geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }) : geminiBody({ luan: "", diem: 0, gioTot: "" }),
    );
    const r = await run(f.fn).promise;
    expect(r.status).toBe("failed");
    expect(filesIn()).toEqual([]);
  });
});

describe("API lỗi hoặc timeout", () => {
  it("403 (khóa sai/hết quyền) → dừng ngay sau 1 lần gọi, không in khóa", async () => {
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

  it("500 liên tục → thử 3 lần model chính, 3 lần model dự phòng rồi dừng, không ghi file", async () => {
    const f = fakeFetch(() => new Response("backend error", { status: 500 }));
    const { promise, sleeps } = run(f.fn, { retryDelayMs: 5_000 });
    const r = await promise;
    expect(r.status).toBe("failed");
    expect(f.calls.map((c) => c.url.includes(FALLBACK_MODEL))).toEqual([false, false, false, true, true, true]);
    expect(sleeps).toEqual([5_000, 10_000, 5_000, 10_000]);
    expect(filesIn()).toEqual([]);
  });

  it("model chính quá tải (503) liên tục → chuyển model dự phòng và ghi được", async () => {
    const overloaded = '{"error":{"code":503,"message":"This model is currently experiencing high demand.","status":"UNAVAILABLE"}}';
    const f = fakeFetch((_n, call) =>
      call.url.includes(PRIMARY_MODEL) ? new Response(overloaded, { status: 503 }) : geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }),
    );
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(f.calls.filter((c) => c.url.includes(PRIMARY_MODEL))).toHaveLength(3);
    if (r.status === "written") expect(r.model).toBe(FALLBACK_MODEL);
  });

  it("lỗi mạng → không ghi file", async () => {
    const f = fakeFetch(() => {
      throw new TypeError("fetch failed");
    });
    const r = await run(f.fn).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.reason).toContain("lỗi mạng");
    expect(filesIn()).toEqual([]);
  });

  it("timeout → hủy yêu cầu, không ghi file", async () => {
    const f = fakeFetch(
      (_n, _c, init) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(init.signal!.reason));
        }),
    );
    const r = await run(f.fn, { timeoutMs: 20 }).promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.reason).toContain("hết thời gian chờ");
    expect(f.calls).toHaveLength(6);
    expect(filesIn()).toEqual([]);
  });

  it("model chính 404 → chuyển model dự phòng một lần và ghi đúng tên model đã sinh", async () => {
    const f = fakeFetch((_n, call) =>
      call.url.includes(PRIMARY_MODEL)
        ? new Response('{"error":{"message":"models/x is not found"}}', { status: 404 })
        : geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }),
    );
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(f.calls.filter((c) => c.url.includes(PRIMARY_MODEL))).toHaveLength(1);
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

  it("429 theo phút → chờ đúng retryDelay Google đưa rồi gọi tiếp, vẫn ghi đủ 12 tuổi", async () => {
    const f = fakeFetch((n) =>
      n === 6 ? quota429("GenerateRequestsPerMinutePerProjectPerModel-FreeTier", "23s") : geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }),
    );
    const { promise, sleeps } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(13);
    expect(sleeps).toEqual([24_000]);
  });

  it("429 hết hạn mức theo ngày ở cả hai model → không chờ, không thử lại, không ghi file", async () => {
    const f = fakeFetch(() => quota429("GenerateRequestsPerDayPerProjectPerModel-FreeTier", "40s"));
    const { promise, sleeps } = run(f.fn);
    const r = await promise;
    expect(r.status).toBe("failed");
    if (r.status === "failed") expect(r.reason).toContain("theo ngày");
    expect(f.calls.map((c) => c.url.includes(FALLBACK_MODEL))).toEqual([false, true]);
    expect(sleeps).toEqual([]);
    expect(filesIn()).toEqual([]);
  });

  it("429 hết hạn mức ngày chỉ ở model chính → chuyển model dự phòng và ghi được", async () => {
    const f = fakeFetch((_n, call) =>
      call.url.includes(PRIMARY_MODEL)
        ? quota429("GenerateRequestsPerDayPerProjectPerModel-FreeTier")
        : geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }),
    );
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(f.calls).toHaveLength(13);
  });

  it("429 đòi chờ vượt quá thời gian cho phép của lượt sinh → dừng, không ghi file", async () => {
    const f = fakeFetch(() => quota429("GenerateRequestsPerMinutePerProjectPerModel-FreeTier", "50s"));
    const { promise, sleeps } = run(f.fn, { maxRunMs: 10_000 });
    const r = await promise;
    expect(r.status).toBe("failed");
    expect(f.calls).toHaveLength(1);
    expect(sleeps).toEqual([]);
    expect(filesIn()).toEqual([]);
  });

  it("thiếu GEMINI_API_KEY → không gọi API, không ghi file, báo lỗi rõ", async () => {
    const f = fakeFetch(() => geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }));
    const { promise, lines } = run(f.fn, { apiKey: undefined });
    const r = await promise;
    expect(r.status).toBe("no-key");
    expect(f.calls).toHaveLength(0);
    expect(filesIn()).toEqual([]);
    expect(lines.join("\n")).toContain("GEMINI_API_KEY");
  });
});

describe("File fallback là placeholder", () => {
  const placeholder = {
    date: TODAY,
    generatedAt: "2026-09-22T23:10:43.814Z",
    model: "fallback-cu",
    tuoi: Object.fromEntries(CON_GIAP_LIST.map((cg) => [cg.slug, { luan: "", diem: 0, gioTot: "" }])),
  };

  it("file hôm nay là placeholder + Gemini lỗi → không chép, không ghi đè, trang vẫn coi là chưa có nội dung", async () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(placeholder));
    const before = readFileSync(join(dir, `${TODAY}.json`), "utf8");
    const f = fakeFetch(() => new Response("unavailable", { status: 503 }));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("failed");
    expect(readFileSync(join(dir, `${TODAY}.json`), "utf8")).toBe(before);
    expect(loadTuViDay(TODAY, dir).status).toBe("invalid");
  });

  it("file hôm nay là placeholder → không coi là 'đã có', gọi Gemini và thay bằng nội dung thật", async () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(placeholder));
    const f = fakeFetch(() => geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(loadTuViDay(TODAY, dir).status).toBe("ok");
  });

  it("file gần nhất là placeholder + Gemini lỗi → không tạo bản fallback-cu cho hôm nay", async () => {
    writeFileSync(join(dir, `${YESTERDAY}.json`), JSON.stringify({ ...placeholder, date: YESTERDAY, model: "placeholder" }));
    const f = fakeFetch(() => new Response("unavailable", { status: 503 }));
    await run(f.fn).promise;
    expect(existsSync(join(dir, `${TODAY}.json`))).toBe(false);
  });
});

describe("Dữ liệu cũ và dữ liệu mới khác ngày", () => {
  it("hôm qua có luận thật + hôm nay Gemini lỗi → không chép luận hôm qua sang hôm nay, file hôm qua giữ nguyên", async () => {
    const yPath = join(dir, `${YESTERDAY}.json`);
    writeFileSync(yPath, JSON.stringify(validDay(YESTERDAY)));
    const before = readFileSync(yPath, "utf8");
    const f = fakeFetch(() => new Response("unavailable", { status: 503 }));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("failed");
    expect(existsSync(join(dir, `${TODAY}.json`))).toBe(false);
    expect(readFileSync(yPath, "utf8")).toBe(before);
    expect(loadTuViDay(TODAY, dir).status).toBe("missing");
  });

  it("hôm qua có luận thật + hôm nay Gemini ổn → file hôm nay là nội dung mới, không đụng file hôm qua", async () => {
    const yPath = join(dir, `${YESTERDAY}.json`);
    writeFileSync(yPath, JSON.stringify(validDay(YESTERDAY, "Nội dung của hôm qua, không được xuất hiện trong file hôm nay.")));
    const before = readFileSync(yPath, "utf8");
    const f = fakeFetch(() => geminiBody({ luan: LUAN, diem: 5, gioTot: GIO }));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
    expect(readFileSync(yPath, "utf8")).toBe(before);
    const today = loadTuViDay(TODAY, dir);
    expect(today.status).toBe("ok");
    if (today.status === "ok") {
      expect(today.data.date).toBe(TODAY);
      expect(Object.values(today.data.tuoi).every((e) => e.luan === LUAN)).toBe(true);
    }
  });

  it("file hôm nay hợp lệ đã có → không gọi lại Gemini, không ghi đè", async () => {
    const tPath = join(dir, `${TODAY}.json`);
    writeFileSync(tPath, JSON.stringify(validDay(TODAY)));
    const before = readFileSync(tPath, "utf8");
    const f = fakeFetch(() => geminiBody({ luan: "Khác hẳn nội dung cũ, không được ghi đè lên file hợp lệ.", diem: 1, gioTot: GIO }));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("exists");
    expect(f.calls).toHaveLength(0);
    expect(readFileSync(tPath, "utf8")).toBe(before);
  });

  it("file mang tên hôm nay nhưng chứa nội dung của ngày khác → bị coi là không hợp lệ và sinh lại", async () => {
    writeFileSync(join(dir, `${TODAY}.json`), JSON.stringify(validDay(YESTERDAY)));
    expect(loadTuViDay(TODAY, dir).status).toBe("invalid");
    const f = fakeFetch(() => geminiBody({ luan: LUAN, diem: 4, gioTot: GIO }));
    const r = await run(f.fn).promise;
    expect(r.status).toBe("written");
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
