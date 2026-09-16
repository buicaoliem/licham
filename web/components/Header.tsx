const MENU = ["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày"] as const;

export function Header({ lunarDay, activeMenu = "Hôm nay" }: { lunarDay: number; activeMenu?: (typeof MENU)[number] }) {
  return (
    <header className="border-b border-line bg-sheet">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:flex-nowrap">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-son font-display text-base font-semibold text-white">
            {lunarDay}
          </div>
          <span className="font-semibold text-ink">licham.app</span>
        </div>

        <nav className="order-3 flex w-full flex-wrap justify-center gap-x-5 gap-y-1 text-sm sm:order-none sm:w-auto sm:flex-1">
          {MENU.map((item) => (
            <span
              key={item}
              className={item === activeMenu ? "font-semibold text-son" : "text-ink-2"}
            >
              {item}
            </span>
          ))}
        </nav>

        <div className="ml-auto shrink-0 sm:ml-0">
          <button
            type="button"
            className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink"
          >
            Tải ứng dụng
          </button>
        </div>
      </div>
    </header>
  );
}
