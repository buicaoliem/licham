/**
 * "Bây giờ" cho mọi thứ phụ thuộc ngày (hôm nay, ngày mai, tiết khí sắp tới, tử vi hôm nay, nhãn "Cập nhật").
 * Production không bao giờ đặt MOCK_NOW. Biến này chỉ để chạy thử cục bộ "như thể là ngày mai":
 * đặt trong web/.dev.vars (đã git-ignore) khi chạy preview, hoặc trong shell khi build thử.
 */
export function currentTime(): Date {
  const mock = process.env.MOCK_NOW?.trim();
  if (mock) {
    const d = new Date(mock);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}
