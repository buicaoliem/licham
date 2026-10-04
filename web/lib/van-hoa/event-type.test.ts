import { describe, expect, it } from "vitest";
import { NAM_SU_KIEN_IMPORTED } from "./data/nam-su-kien.generated";
import { EVENT_TYPES, classifyEvent } from "./event-type";

describe("event-type", () => {
  it("mọi mốc đã nhập đều có loại hợp lệ và khớp bộ phân loại", () => {
    const keys = new Set<string>(EVENT_TYPES.map((x) => x.key));
    for (const e of NAM_SU_KIEN_IMPORTED) {
      expect(keys.has(e.type!), e.title).toBe(true);
      expect(e.type, e.title).toBe(classifyEvent(e));
    }
  });
  it("truyền thuyết theo nhãn, không theo từ khoá", () => {
    expect(classifyEvent({ title: "Thánh Gióng dẹp giặc Ân", label: "truyen-thuyet" })).toBe("truyen-thuyet");
    expect(classifyEvent({ title: "Trận Bạch Đằng", label: "chinh-su" })).toBe("tran-danh");
  });
});
