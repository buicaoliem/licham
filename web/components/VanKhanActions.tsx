"use client";

import type { VanKhanBai } from "@/lib/van-khan";

/** Ghép toàn bộ nội dung bài khấn thành văn bản thuần để in hoặc tải về. */
function toPlainText(bai: VanKhanBai): string {
  const parts = [bai.ten, ""];
  for (const phan of bai.baiKhan) {
    if (phan.tieuDe) parts.push(phan.tieuDe, "");
    for (const doan of phan.doanVan) {
      parts.push(doan, "");
    }
  }
  return parts.join("\n").trim() + "\n";
}

export function VanKhanActions({ bai }: { bai: VanKhanBai }) {
  return (
    <div className="right khan-noprint">
      <button type="button" className="btn" onClick={() => window.print()}>
        In ra giấy
      </button>
      <button
        type="button"
        className="btn pri"
        onClick={() => {
          const blob = new Blob([toPlainText(bai)], { type: "text/plain;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${bai.slug}.txt`;
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Lưu về máy
      </button>
    </div>
  );
}
