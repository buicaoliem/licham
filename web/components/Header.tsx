const MENU = ["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày"] as const;

export function Header({ lunarDay, activeMenu = "Hôm nay" }: { lunarDay: number; activeMenu?: (typeof MENU)[number] }) {
  return (
    <div className="nav">
      <div className="logo">
        <span className="mk">{lunarDay}</span> licham.app
      </div>
      <ul>
        {MENU.map((item) => (
          <li key={item} className={item === activeMenu ? "on" : undefined}>
            {item}
          </li>
        ))}
      </ul>
      <div className="sp" />
      <div className="getapp">
        <svg viewBox="0 0 24 24">
          <rect x="7" y="2.6" width="10" height="18.8" rx="2.2" />
          <path d="M10.8 5.4h2.4" />
        </svg>
        Tải ứng dụng
      </div>
    </div>
  );
}
