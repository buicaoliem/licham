import type { MetadataRoute } from "next";
import { jdFromDate, jdToDate } from "@licham/core";
import { dateToSlug } from "@/lib/date-slug";
import { monthToSlug } from "@/lib/month-slug";
import { SITE_URL } from "@/lib/site";
import { VIEC_LIST } from "@/lib/xem-ngay-tot";

const YEAR = 2026;

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({ url: `${SITE_URL}/`, lastModified, priority: 1, changeFrequency: "daily" });
  entries.push({ url: `${SITE_URL}/doi-ngay-am-duong/`, lastModified, priority: 0.6, changeFrequency: "yearly" });

  for (const v of VIEC_LIST) {
    entries.push({
      url: `${SITE_URL}/xem-ngay-tot/${v.slug}/`,
      lastModified,
      priority: 0.7,
      changeFrequency: "monthly",
    });
  }

  for (let month = 1; month <= 12; month++) {
    entries.push({
      url: `${SITE_URL}/${monthToSlug(month, YEAR)}/`,
      lastModified,
      priority: 0.7,
      changeFrequency: "monthly",
    });
  }

  const start = jdFromDate(1, 1, YEAR);
  const end = jdFromDate(31, 12, YEAR);
  for (let jd = start; jd <= end; jd++) {
    entries.push({
      url: `${SITE_URL}/ngay/${dateToSlug(jdToDate(jd))}/`,
      lastModified,
      priority: 0.5,
      changeFrequency: "yearly",
    });
  }

  return entries;
}
