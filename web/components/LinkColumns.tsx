const COLUMNS = [
  { title: "Ngày quan trọng sắp tới", items: ["Đang cập nhật"] },
  { title: "Văn khấn hay tra", items: ["Đang cập nhật"] },
  { title: "Tử vi", items: ["Đang cập nhật"] },
] as const;

export function LinkColumns() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 sm:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-center text-base font-semibold text-ink">{col.title}</h3>
            <ul className="mt-3 space-y-2 text-center text-sm text-ink-2">
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
