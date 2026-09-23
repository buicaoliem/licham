/**
 * "Hôm nay" theo giờ Việt Nam tính ngay trên trình duyệt, dạng "YYYY-MM-DD" (cùng khóa với dateKey()).
 * Dùng cho trang tĩnh/ISR: HTML có thể được dựng trước 00:00 nên ô "hôm nay" phải được đặt lại phía client.
 */
export function vnTodayKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function parseKey(key: string): { day: number; month: number; year: number } {
  const [y, m, d] = key.split("-").map(Number);
  return { day: d!, month: m!, year: y! };
}
