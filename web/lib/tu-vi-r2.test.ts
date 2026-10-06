import { afterEach, describe, expect, it, vi } from "vitest";
import { runDaily, targetNow } from "../workers/tu-vi-daily/src/index";
import { CON_GIAP_LIST, DIEM_RANGE, quanHeVoiNgay } from "./tu-vi";
import { buildDayContext } from "./tu-vi-generate";
import { type R2BucketLike, loadTuViDayR2, tuViKey } from "./tu-vi-r2";
import { resolveTuViData } from "./tu-vi-runtime";

/** R2 giả trong bộ nhớ, có put điều kiện etagDoesNotMatch "*" như R2 thật. */
function fakeR2() {
  const store = new Map<string, { body: string; uploaded: Date }>();
  const bucket: R2BucketLike = {
    async get(key) {
      const o = store.get(key);
      return o ? { uploaded: o.uploaded, json: async () => JSON.parse(o.body) } : null;
    },
    async put(key, value, options) {
      if (options?.onlyIf?.etagDoesNotMatch === "*" && store.has(key)) return null;
      store.set(key, { body: value, uploaded: new Date() });
      return {};
    },
    async delete(key) {
      store.delete(key);
    },
  };
  return { bucket, store };
}

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

/** 23:00 giờ VN ngày 22/9/2026 — lượt hẹn giờ đầu tiên; ngày cần sinh là 23/9. */
const CRON_AT = new Date("2026-09-22T16:00:00Z");
const TARGET = "2026-09-23";
const CTX = buildDayContext({ day: 23, month: 9, year: 2026 });

function geminiOk(): Response {
  const tuoi = CON_GIAP_LIST.map((cg, i) => ({
    slug: cg.slug,
    luan: LUAN_12[i]!,
    diem: DIEM_RANGE[quanHeVoiNgay(CTX.dayChiIndex, cg.chiIndex)][0],
    gioTot: CTX.gioHoangDaoRanges[i % CTX.gioHoangDaoRanges.length]!,
  }));
  const text = JSON.stringify({ date: TARGET, tuoi });
  return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text }] }, finishReason: "STOP" }] }), { status: 200 });
}

afterEach(() => vi.unstubAllGlobals());

describe("Ngày cần sinh theo giờ chạy", () => {
  const vn = (d: Date) => new Date(d.getTime() + 7 * 3600_000).toISOString().slice(0, 10);
  it("lượt đêm (23:xx VN) sinh cho ngày mai; lượt sáng (05:30 VN) sinh cho hôm nay", () => {
    expect(vn(targetNow(new Date("2026-09-22T16:00:00Z")))).toBe("2026-09-23"); // 23:00 22/9
    expect(vn(targetNow(new Date("2026-09-22T16:50:00Z")))).toBe("2026-09-23"); // 23:50 22/9
    expect(vn(targetNow(new Date("2026-09-22T22:30:00Z")))).toBe("2026-09-23"); // 05:30 23/9
  });
});

describe("Worker hẹn giờ tử vi (R2 giả, Gemini giả)", () => {
  it("sinh tử vi của NGÀY MAI và ghi vào R2; lượt sau cùng ngày không gọi Gemini nữa", async () => {
    const { bucket, store } = fakeR2();
    const fetchMock = vi.fn(async () => geminiOk());
    vi.stubGlobal("fetch", fetchMock);
    const env = { TU_VI_R2: bucket, GEMINI_API_KEY: "khoa-gia" };

    const first = (await runDaily(env, CRON_AT)) as { status: string; date: string };
    expect(first).toMatchObject({ status: "written", date: TARGET });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect([...store.keys()]).toEqual([tuViKey(TARGET)]); // khóa đã nhả, chỉ còn file dữ liệu
    expect(await loadTuViDayR2(bucket, TARGET)).toMatchObject({ status: "ok", data: { date: TARGET } });

    const second = (await runDaily(env, new Date(CRON_AT.getTime() + 25 * 60_000))) as { status: string };
    expect(second.status).toBe("exists");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("gọi fetch toàn cục như hàm trần (workerd báo \"Illegal invocation\" nếu gọi qua thuộc tính của object)", async () => {
    const { bucket } = fakeR2();
    vi.stubGlobal("fetch", function (this: unknown) {
      if (this !== undefined && this !== globalThis) throw new TypeError("Illegal invocation");
      return Promise.resolve(geminiOk());
    });
    const r = (await runDaily({ TU_VI_R2: bucket, GEMINI_API_KEY: "khoa-gia" }, CRON_AT)) as { status: string };
    expect(r.status).toBe("written");
  });

  it("thiếu GEMINI_API_KEY: không gọi mạng, không ghi gì", async () => {
    const { bucket, store } = fakeR2();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const r = (await runDaily({ TU_VI_R2: bucket }, CRON_AT)) as { status: string };
    expect(r.status).toBe("no-key");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(store.size).toBe(0);
  });

  it("khóa của lượt khác còn mới: bỏ qua; khóa đã cũ: giành lại và sinh", async () => {
    const { bucket, store } = fakeR2();
    vi.stubGlobal("fetch", vi.fn(async () => geminiOk()));
    const env = { TU_VI_R2: bucket, GEMINI_API_KEY: "khoa-gia" };
    await bucket.put(`tu-vi/.${TARGET}.lock`, "{}");
    expect(((await runDaily(env, CRON_AT)) as { status: string }).status).toBe("locked");
    expect(store.has(tuViKey(TARGET))).toBe(false);

    store.get(`tu-vi/.${TARGET}.lock`)!.uploaded = new Date(Date.now() - 60 * 60_000);
    expect(((await runDaily(env, CRON_AT)) as { status: string }).status).toBe("written");
  });

  it("Gemini trả sai (thiếu tuổi) thì không lưu gì vào R2", async () => {
    const { bucket, store } = fakeR2();
    const bad = new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify({ date: TARGET, tuoi: [] }) }] }, finishReason: "STOP" }] }), { status: 200 });
    vi.stubGlobal("fetch", vi.fn(async () => bad.clone()));
    const r = (await runDaily({ TU_VI_R2: bucket, GEMINI_API_KEY: "khoa-gia", TU_VI_MAX_REQUESTS: "1" }, CRON_AT)) as { status: string };
    expect(r.status).toBe("failed");
    expect(store.size).toBe(0);
  });
});

describe("Trang đọc tử vi: R2 trước, bản gói sau", () => {
  const today = { day: 23, month: 9, year: 2026 };
  it("dùng file R2 hợp lệ của đúng ngày", async () => {
    const { bucket } = fakeR2();
    vi.stubGlobal("fetch", vi.fn(async () => geminiOk()));
    await runDaily({ TU_VI_R2: bucket, GEMINI_API_KEY: "khoa-gia" }, CRON_AT);
    expect((await resolveTuViData(today, bucket))?.date).toBe(TARGET);
  });
  it("R2 thiếu, hỏng hoặc lỗi thì rơi về bản gói (ngày không có trong bản gói → null, không mượn ngày khác)", async () => {
    const { bucket } = fakeR2();
    expect(await resolveTuViData(today, bucket)).toBeNull();
    await bucket.put(tuViKey(TARGET), "không phải json");
    expect(await resolveTuViData(today, bucket)).toBeNull();
    const broken: R2BucketLike = { ...bucket, get: async () => Promise.reject(new Error("R2 down")) };
    expect(await resolveTuViData(today, broken)).toBeNull();
    expect(await resolveTuViData(today, undefined)).toBeNull();
  });
});
