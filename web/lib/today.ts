import { type SolarDate, jdFromDate, jdToDate, vietnamDateOf } from "@licham/core";

/** "Hôm nay" theo giờ Việt Nam (UTC+7), bất kể máy dựng trang chạy múi giờ nào. */
export function getVietnamToday(): SolarDate {
  return vietnamDateOf(new Date());
}

/** Ngày mai theo giờ Việt Nam. */
export function getVietnamTomorrow(): SolarDate {
  const t = getVietnamToday();
  return jdToDate(jdFromDate(t.day, t.month, t.year) + 1);
}
