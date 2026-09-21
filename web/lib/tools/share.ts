import { buildShareUrl } from "@/lib/share";
import type { SearchParams } from "./params";
import type { ToolDef } from "./tools";

export interface ToolShareProps {
  path: string;
  title: string;
  text: string;
}

/**
 * Thông tin chia sẻ cho kết quả công cụ. Chỉ trả về khi URL có ít nhất một tham số công cụ đọc
 * (tức có kết quả để tái tạo); nếu không thì null và không hiện nút Share. Query không thuộc công cụ bị bỏ.
 */
export function toolShare(tool: ToolDef, sp: SearchParams, text: string): (ToolShareProps & { url: string }) | null {
  const url = buildShareUrl(tool.href, { keep: tool.params, query: sp });
  if (!url.includes("?")) return null;
  return { path: url, url, title: tool.h1, text };
}
