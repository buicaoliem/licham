const MENU = ["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày"] as const;

// Chưa có trang đích — làm mờ, không cho bấm, tới khi trang được dựng.
const DISABLED_MENU = new Set<(typeof MENU)[number]>(["Tử vi"]);

export function Header({ activeMenu = "Hôm nay" }: { activeMenu?: (typeof MENU)[number] }) {
  return (
    <div className="nav">
      <div className="logo">
        <img src="/logo.svg" alt="LịchÂm" width={32} height={32} className="mk" />
        <span>
          <span className="logo-ink">Lịch</span>
          <span className="logo-son">Âm</span>
        </span>
      </div>
      <ul>
        {MENU.map((item) => (
          <li
            key={item}
            className={item === activeMenu ? "on" : DISABLED_MENU.has(item) ? "disabled" : undefined}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="sp" />
    </div>
  );
}
