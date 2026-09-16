import { type SolarDate, vietnamDateOf } from "@licham/core";

/** "Hôm nay" theo giờ Việt Nam (UTC+7), bất kể máy dựng trang chạy múi giờ nào. */
export function getVietnamToday(): SolarDate {
  return vietnamDateOf(new Date());
}
