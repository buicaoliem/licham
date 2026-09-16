const OCCASIONS = [
  { label: "Xem ngày cưới hỏi", hot: true },
  { label: "Xem ngày khai trương", hot: true },
  { label: "Xem ngày động thổ", hot: false },
  { label: "Xem ngày nhập trạch", hot: false },
  { label: "Xem ngày mua xe", hot: false },
  { label: "Xem ngày ký hợp đồng", hot: false },
  { label: "Xem ngày xuất hành", hot: false },
  { label: "Xem ngày cất nóc", hot: false },
] as const;

export function OccasionChips() {
  return (
    <>
      <h2 className="hh" style={{ marginTop: 30 }}>
        Chọn ngày cho việc lớn
      </h2>
      <div className="chips">
        {OCCASIONS.map((o) => (
          <span key={o.label} className={o.hot ? "chip hot" : "chip"}>
            {o.label}
          </span>
        ))}
      </div>
    </>
  );
}
