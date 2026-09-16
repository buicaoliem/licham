const COLUMNS = [
  {
    title: "Văn khấn hay tra",
    items: ["văn khấn gia tiên", "văn khấn thần tài", "văn khấn ông công ông táo", "văn khấn rằm, mùng một"],
  },
  {
    title: "Tử vi",
    items: ["tử vi 12 con giáp", "xem tuổi vợ chồng", "xem tuổi xông đất", "sao hạn theo tuổi"],
  },
  {
    title: "Tra cứu nhanh",
    items: ["xem ngày tốt xấu", "đổi ngày âm dương", "xem giờ hoàng đạo", "xem hướng nhà, hướng bếp"],
  },
] as const;

export function LinkColumns() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="grid gap-5 sm:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.title} className="rounded-[14px] border border-line p-[17px]">
            <h3 className="text-center text-base font-semibold text-ink">{col.title}</h3>
            <ul className="mt-3 divide-y divide-line-2 text-center text-sm text-ink-2">
              {col.items.map((item) => (
                <li key={item} className="py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-ink-3">Các trang này đang được xây dựng.</p>
    </section>
  );
}
