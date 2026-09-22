import Link from "next/link";
import { monthHref } from "@/lib/calendar/urls";
import { getVietnamToday } from "@/lib/today";

export const MENU = ["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày", "Ngày lễ", "Xem tuổi"] as const;

// Chưa có trang đích — làm mờ, không cho bấm, tới khi trang được dựng.
const DISABLED_MENU = new Set<(typeof MENU)[number]>([]);

export type MenuItem = (typeof MENU)[number];

export function menuHref(item: MenuItem): string {
  switch (item) {
    case "Hôm nay":
      return "/";
    case "Lịch tháng": {
      const today = getVietnamToday();
      return monthHref(today.month, today.year);
    }
    case "Xem ngày tốt":
      return "/xem-ngay-tot/";
    case "Văn khấn":
      return "/van-khan/";
    case "Tử vi":
      return "/tu-vi/";
    case "Đổi ngày":
      return "/doi-ngay-am-duong/";
    case "Ngày lễ":
      return "/le/";
    case "Xem tuổi":
      return "/tuoi/";
    default:
      return "/";
  }
}

function MenuItems({ activeMenu }: { activeMenu: (typeof MENU)[number] }) {
  return (
    <>
      {MENU.map((item) => {
        const disabled = DISABLED_MENU.has(item);
        return (
          <li key={item} className={item === activeMenu ? "on" : disabled ? "disabled" : undefined}>
            {disabled ? item : <Link href={menuHref(item)}>{item}</Link>}
          </li>
        );
      })}
    </>
  );
}

export function Header({ activeMenu = "Hôm nay" }: { activeMenu?: (typeof MENU)[number] }) {
  return (
    <div className="nav">
      <div className="navrow">
        <details className="navmenu">
          <summary className="navbtn" aria-label="Mở menu">
            ☰
          </summary>
        </details>
        <Link href="/" className="logo">
          <img src="/logo.svg" alt="Lịch Âm" width={60} height={60} className="mk" />
          <span>
            <span className="logo-ink">Lịch</span> <span className="logo-son">Âm</span>
          </span>
        </Link>
        <span className="navsp" aria-hidden="true" />
      </div>
      <ul className="navlinks">
        <MenuItems activeMenu={activeMenu} />
      </ul>
      <div className="navpanel">
        <ul>
          <MenuItems activeMenu={activeMenu} />
        </ul>
      </div>
    </div>
  );
}
