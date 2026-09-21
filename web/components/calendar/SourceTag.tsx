import { SOURCE_TYPE_LABEL, type SourceType } from "@/lib/knowledge";

/** Nhãn nhỏ cho biết khối nội dung đến từ tính thiên văn, lịch truyền thống hay biên soạn. */
export function SourceTag({ type }: { type: SourceType }) {
  return <span className={`srctag srctag-${type}`}>{SOURCE_TYPE_LABEL[type]}</span>;
}
