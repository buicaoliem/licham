import { describe, expect, it, vi } from "vitest";
import { buildShareUrl, copyText, facebookShareUrl, reduceMenu, shareNative } from "./share";
import { toolBySlug } from "./tools/tools";
import { toolShare } from "./tools/share";

const data = { title: "t", text: "x", url: "https://www.licham.app/ngay/2026-09-21/" };

describe("buildShareUrl", () => {
  it("dùng host www, thêm / cuối, bỏ query và hash", () => {
    expect(buildShareUrl("/ngay/2026-09-21?utm_source=x&debug=1#a")).toBe("https://www.licham.app/ngay/2026-09-21/");
    expect(buildShareUrl("https://www.licham.app/le/tet")).toBe("https://www.licham.app/le/tet/");
  });
  it("chỉ giữ query được liệt kê, theo thứ tự khai báo", () => {
    const url = buildShareUrl("/cong-cu/dem-ngay/", { keep: ["tu", "den"], query: { den: "2026-12-31", utm_source: "z", tu: "2026-01-01", preview: "1" } });
    expect(url).toBe("https://www.licham.app/cong-cu/dem-ngay/?tu=2026-01-01&den=2026-12-31");
  });
});

describe("toolShare", () => {
  const tool = toolBySlug("dem-ngay");
  it("giữ đúng query cần thiết và bỏ query lạ", () => {
    const s = toolShare(tool, { tu: "2026-01-01", den: "2026-12-31", utm_campaign: "a" }, "kq");
    expect(s?.url).toBe("https://www.licham.app/cong-cu/dem-ngay/?tu=2026-01-01&den=2026-12-31");
  });
  it("trạng thái form trống không có gì để chia sẻ", () => {
    expect(toolShare(tool, {}, "kq")).toBeNull();
    expect(toolShare(tool, { utm_source: "x" }, "kq")).toBeNull();
  });
});

describe("shareNative", () => {
  it("gọi Web Share API khi có", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    expect(await shareNative({ share }, data)).toBe("native");
    expect(share).toHaveBeenCalledWith(data);
  });
  it("không hỗ trợ hoặc canShare=false → fallback", async () => {
    expect(await shareNative({}, data)).toBe("fallback");
    expect(await shareNative({ share: vi.fn(), canShare: () => false }, data)).toBe("fallback");
  });
  it("người dùng huỷ (AbortError) không bị coi là lỗi; lỗi khác → fallback", async () => {
    const abort = Object.assign(new Error("x"), { name: "AbortError" });
    expect(await shareNative({ share: vi.fn().mockRejectedValue(abort) }, data)).toBe("cancelled");
    expect(await shareNative({ share: vi.fn().mockRejectedValue(new Error("boom")) }, data)).toBe("fallback");
  });
});

describe("copyText", () => {
  it("dùng clipboard API", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    expect(await copyText({ writeText }, "u")).toBe(true);
    expect(writeText).toHaveBeenCalledWith("u");
  });
  it("clipboard lỗi → dùng cách dự phòng; không có gì → false", async () => {
    expect(await copyText({ writeText: vi.fn().mockRejectedValue(new Error()), legacyCopy: () => true }, "u")).toBe(true);
    expect(await copyText({}, "u")).toBe(false);
  });
});

describe("facebookShareUrl", () => {
  it("mã hoá URL", () => {
    expect(facebookShareUrl("https://www.licham.app/a/?x=1&y=2")).toBe(
      "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.licham.app%2Fa%2F%3Fx%3D1%26y%3D2",
    );
  });
});

describe("reduceMenu", () => {
  it("mở/đóng bằng toggle; Escape, bấm ra ngoài và chọn mục đều đóng", () => {
    let s = reduceMenu({ open: false }, "toggle");
    expect(s.open).toBe(true);
    for (const ev of ["escape", "outside", "select"] as const) {
      expect(reduceMenu({ open: true }, ev).open).toBe(false);
    }
    s = reduceMenu(s, "toggle");
    expect(s.open).toBe(false);
  });
});
