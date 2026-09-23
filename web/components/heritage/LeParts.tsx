import Link from "next/link";
import { LeHeroIllustration } from "@/components/LeIllustration";
import type { LeArt, LeItem, LeLichKind } from "@/lib/le-hub";
import { HeritageImage } from "./HeritageImage";
import { Icon, type IconName } from "./Icon";

export const LE_LICH_ICON: Record<LeLichKind, IconName> = { am: "yinyang", duong: "calendar", "tiet-khi": "sun" };

const THANG_NGAN = ["TH 1", "TH 2", "TH 3", "TH 4", "TH 5", "TH 6", "TH 7", "TH 8", "TH 9", "TH 10", "TH 11", "TH 12"];

/** Ô ngày dương lịch (ngày lớn, tháng nhỏ) — dùng khi lễ không có tranh, và trong danh sách "sắp diễn ra". */
export function LeDateTile({ day, month, tone, size = "md" }: { day: number; month: number; tone?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <span className={["le-date", size, tone ?? ""].filter(Boolean).join(" ")} aria-hidden="true">
      <b>{String(day).padStart(2, "0")}</b>
      <span>{THANG_NGAN[month - 1]}</span>
    </span>
  );
}

/** Hình của lễ: tranh heritage / ảnh thật / minh hoạ SVG anh hùng; không có thì ô ngày. */
export function LeArtView({ art, item, className }: { art: LeArt; item: Pick<LeItem, "day" | "month" | "nhom">; className?: string }) {
  const cls = ["le-art", className ?? ""].filter(Boolean).join(" ");
  if (art?.kind === "img") {
    return (
      <span className={`${cls} img`}>
        <HeritageImage src={art.src} alt="" />
      </span>
    );
  }
  if (art?.kind === "photo") {
    return (
      <span className={`${cls} img photo`}>
        <img src="/le/ho-chi-minh-1946.jpg" alt="" loading="lazy" decoding="async" />
      </span>
    );
  }
  if (art?.kind === "icon") {
    return (
      <span className={`${cls} icon`}>
        <LeHeroIllustration slug={art.slug} />
      </span>
    );
  }
  return (
    <span className={`${cls} tile n-${item.nhom}`}>
      <LeDateTile day={item.day} month={item.month} tone={`n-${item.nhom}`} size="lg" />
    </span>
  );
}

/** Thẻ lễ trong lưới danh mục. */
export function LeCard({ item }: { item: LeItem }) {
  return (
    <Link className={`le-card n-${item.nhom}`} href={`/le/${item.slug}/`}>
      <LeArtView art={item.art} item={item} className="le-card-art" />
      <span className="le-card-b">
        <span className="le-tag">{item.nhomLabel}</span>
        <b className="le-card-t">{item.ten}</b>
        <span className="le-card-d">{item.moTa}</span>
        <span className="le-card-m">
          <span>
            <Icon name={LE_LICH_ICON[item.lich]} size={14} />
            {item.rule}
          </span>
          <span className="when">
            {String(item.day).padStart(2, "0")}/{String(item.month).padStart(2, "0")}/{item.year}
            {" · "}
            {item.daysLeft === 0 ? "Hôm nay" : `còn ${item.daysLeft} ngày`}
          </span>
        </span>
      </span>
    </Link>
  );
}
