const OCCASIONS = [
  "Cưới hỏi",
  "Khai trương",
  "Động thổ",
  "Nhập trạch",
  "Mua xe",
  "Ký hợp đồng",
  "Xuất hành",
  "Cất nóc",
] as const;

export function OccasionChips() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h3 className="text-center text-base font-semibold text-ink">Chọn ngày cho việc lớn</h3>
      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        {OCCASIONS.map((label, i) => (
          <span
            key={label}
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium",
              i < 2 ? "border-son-soft bg-son-soft text-son" : "border-line text-ink-2",
            ].join(" ")}
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
