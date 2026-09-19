/** Disclaimer bắt buộc trên trang phong thủy / tuổi / tử vi — không schema Medical. */
export function TraditionalDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p className={compact ? "disclaimer compact" : "disclaimer"}>
      Thông tin phong thủy, tuổi tác, ngày tốt xấu là tri thức dân gian, chỉ để tham khảo. Không phải tư vấn y khoa, pháp
      lý hay bảo đảm kết quả trong đời sống.
    </p>
  );
}
