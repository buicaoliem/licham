import { PLACEHOLDER_MODE, heritageFile } from "@/lib/heritage-assets";

/**
 * Ảnh minh họa từ public/heritage. Thiếu file: không hiển thị gì (bố cục tự co lại),
 * trừ khi bật chế độ đánh dấu vị trí asset (NEXT_PUBLIC_CH_PLACEHOLDER=1) để duyệt bố cục.
 */
export function HeritageImage({
  src,
  fallback,
  alt = "",
  className,
  width,
  height,
  label,
  eager = false,
}: {
  src: string;
  fallback?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  /** Mô tả asset hiển thị trong khung đánh dấu. */
  label?: string;
  /** Ảnh nằm trong màn hình đầu tiên: tải ngay, không lazy. */
  eager?: boolean;
}) {
  const file = heritageFile(src) ?? (fallback ? heritageFile(fallback) : null);
  if (file) {
    return <img src={file} alt={alt} className={className} width={width} height={height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} decoding="async" />;
  }
  if (!PLACEHOLDER_MODE) return null;
  return (
    <span className={`ch-asset-missing ${className ?? ""}`} aria-hidden="true">
      <span>
        Thiếu asset
        <br />
        <code>{src.replace("/heritage/", "")}</code>
        {label && (
          <>
            <br />
            {label}
          </>
        )}
      </span>
    </span>
  );
}

/** true nếu khối minh họa sẽ chiếm chỗ (có file, hoặc đang ở chế độ đánh dấu). */
export function heritageVisible(src: string, fallback?: string): boolean {
  return PLACEHOLDER_MODE || heritageFile(src) !== null || (fallback ? heritageFile(fallback) !== null : false);
}
