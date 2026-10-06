import { describe, expect, it } from "vitest";
import { pathsToRefresh, vnDateKey } from "./refresh-plan";

const ROUTES = ["/", "/hom-nay", "/le", "/le/tet", "/le/gio-to", "/tiet-khi/lap-xuan", "/tu-vi", "/tu-vi/ty", "/tu-vi/ty/2026", "/ten/minh", "/van-khan/than-tai-tho-dia", "/countdown/tet"];

describe("vnDateKey", () => {
  it("23:59 UTC đã là ngày hôm sau ở Việt Nam", () => {
    expect(vnDateKey(new Date("2026-10-05T16:59:59Z"))).toBe("2026-10-05");
    expect(vnDateKey(new Date("2026-10-05T17:00:00Z"))).toBe("2026-10-06");
  });
});

describe("pathsToRefresh", () => {
  const now = new Date("2026-10-05T17:05:00Z"); // 00:05 ngày 6/10 giờ VN

  it("dựng lại trang phụ thuộc hôm nay, kể cả khi route chưa có trong manifest", () => {
    const p = pathsToRefresh({ now, routes: ROUTES, lastRunDate: "2026-10-05" });
    expect(p).toEqual(expect.arrayContaining(["/", "/hom-nay/", "/ngay-mai/", "/le/", "/le/tet/", "/tiet-khi/lap-xuan/", "/tu-vi/", "/tu-vi/ty/", "/countdown/tet/"]));
    expect(p).toEqual(expect.arrayContaining(["/ngay/2026-10-06/", "/ngay/2026-10-05/", "/ngay/2026-10-07/", "/thang/2026-10/", "/thang/2026-09/", "/nam/2026/"]));
  });

  it("không đụng trang không đổi theo ngày", () => {
    const p = pathsToRefresh({ now, routes: ROUTES, lastRunDate: null });
    expect(p).not.toContain("/ten/minh/");
    expect(p).not.toContain("/van-khan/than-tai-tho-dia/");
    expect(p).not.toContain("/tu-vi/ty/2026/");
  });

  it("đã chạy hôm nay thì không làm gì (lần gọi thứ hai)", () => {
    expect(pathsToRefresh({ now, routes: ROUTES, lastRunDate: "2026-10-06" })).toEqual([]);
  });

  it("qua tháng và qua năm lấy đúng tháng trước/ngày liền kề", () => {
    const p = pathsToRefresh({ now: new Date("2026-12-31T17:05:00Z"), routes: [], lastRunDate: "2026-12-31" });
    expect(p).toEqual(expect.arrayContaining(["/thang/2027-01/", "/thang/2026-12/", "/nam/2027/", "/ngay/2026-12-31/", "/ngay/2027-01-02/"]));
  });
});
