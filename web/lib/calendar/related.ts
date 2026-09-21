import type { SolarDate } from "@licham/core";
import type { CalendarDay } from "./calendar-day";
import { isSupportedYear } from "./config";
import { monthHref, yearHref } from "./urls";

export interface RelatedLink {
  label: string;
  href: string;
}

/** Thứ tự cố định, không ngẫu nhiên: cùng đầu vào luôn ra cùng danh sách. */
export function getRelatedCalendarLinks(date: SolarDate): RelatedLink[] {
  const links: RelatedLink[] = [{ label: `Lịch tháng ${date.month} năm ${date.year}`, href: monthHref(date.month, date.year) }];
  if (isSupportedYear(date.year)) links.push({ label: `Lịch năm ${date.year}`, href: yearHref(date.year) });
  return links;
}

export function getRelatedHolidayLinks(day: CalendarDay): RelatedLink[] {
  const links = day.holidayEvents.map((h) => ({ label: h.name, href: `/le/${h.slug}/` }));
  links.push({ label: "Tất cả ngày lễ", href: "/le/" });
  return links;
}

export function getRelatedActivityLinks(day: CalendarDay): RelatedLink[] {
  const seen = new Set<string>();
  const links: RelatedLink[] = [];
  for (const a of [...day.goodActivities, ...day.badActivities]) {
    if (!a.toolSlug || seen.has(a.toolSlug)) continue;
    seen.add(a.toolSlug);
    links.push({ label: `Xem ngày tốt ${a.label}`, href: `/xem-ngay-tot/${a.toolSlug}/` });
  }
  links.push({ label: "Xem ngày tốt", href: "/xem-ngay-tot/" });
  return links;
}

export function getRelatedToolLinks(): RelatedLink[] {
  return [
    { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" },
    { label: "Đếm ngày giữa hai ngày", href: "/cong-cu/dem-ngay/" },
    { label: "Bao nhiêu ngày nữa là ngày nào", href: "/cong-cu/ngay-sau/" },
    { label: "Còn bao nhiêu ngày nữa", href: "/cong-cu/con-bao-nhieu-ngay/" },
    { label: "Tính tuổi", href: "/tinh-tuoi/" },
  ];
}

export function getRelatedLinksForDay(date: SolarDate, day: CalendarDay): RelatedLink[] {
  return [
    ...getRelatedCalendarLinks(date),
    ...getRelatedHolidayLinks(day),
    ...getRelatedActivityLinks(day),
    ...getRelatedToolLinks(),
  ];
}
