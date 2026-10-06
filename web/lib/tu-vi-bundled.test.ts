import { describe, expect, it } from "vitest";
import { loadTuViDayBundled } from "./tu-vi-bundled";

describe("loadTuViDayBundled", () => {
  it("ngày không có trong bản gói → missing (trang chỉ hiện phần tính bằng luật)", () => {
    expect(loadTuViDayBundled("2026-10-06", {})).toEqual({ status: "missing" });
  });

  it("dữ liệu giữ chỗ/sai ngày bị loại giống khi đọc từ đĩa", () => {
    const r = loadTuViDayBundled("2026-10-06", { "2026-10-06": { date: "2026-10-05", generatedAt: "2026-10-05T00:00:00Z", model: "placeholder", tuoi: {} } });
    expect(r.status).toBe("invalid");
  });
});
