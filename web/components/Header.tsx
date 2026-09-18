import Link from "next/link";
import { VIEC_LIST } from "@/lib/xem-ngay-tot";
import { monthToSlug } from "@/lib/month-slug";
import { getVietnamToday } from "@/lib/today";

const MENU = ["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày", "Ngày lễ", "Xem tuổi"] as const;

// Chưa có trang đích — làm mờ, không cho bấm, tới khi trang được dựng.
const DISABLED_MENU = new Set<(typeof MENU)[number]>([]);

function menuHref(item: (typeof MENU)[number]): string {
  switch (item) {
    case "Hôm nay":
      return "/";
    case "Lịch tháng": {
      const today = getVietnamToday();
      return `/${monthToSlug(today.month, today.year)}`;
    }
    case "Xem ngày tốt":
      return `/xem-ngay-tot/${VIEC_LIST[0]!.slug}`;
    case "Văn khấn":
      return "/van-khan";
    case "Tử vi":
      return "/tu-vi";
    case "Đổi ngày":
      return "/doi-ngay-am-duong";
    case "Ngày lễ":
      return "/le";
    case "Xem tuổi":
      return "/tuoi";
    default:
      return "/";
  }
}

export function Header({ activeMenu = "Hôm nay" }: { activeMenu?: (typeof MENU)[number] }) {
  return (
    <div className="nav">
      <Link href="/" className="logo">
        <img src="/logo.svg" alt="LịchÂm" width={32} height={32} className="mk" />
        <span>
          <span className="logo-ink">Lịch</span>
          <span className="logo-son">Âm</span>
        </span>
      </Link>
      <ul>
        {MENU.map((item) => {
          const disabled = DISABLED_MENU.has(item);
          return (
            <li key={item} className={item === activeMenu ? "on" : disabled ? "disabled" : undefined}>
              {disabled ? item : <Link href={menuHref(item)}>{item}</Link>}
            </li>
          );
        })}
      </ul>
      <div className="sp" />
    </div>
  );
}
