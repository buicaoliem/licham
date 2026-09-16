import type { CHI, DayInfo } from "@licham/core";

interface HoangDaoHour {
  chiName: (typeof CHI)[number];
  start: string;
  end: string;
}

export function TodayCards({
  hoangDaoHours,
  info,
  saoTotCount,
  saoXauCount,
}: {
  hoangDaoHours: HoangDaoHour[];
  info: DayInfo;
  saoTotCount: number;
  saoXauCount: number;
}) {
  const nguHanh = info.canChi.day.napAm.name
    .split(" ")
    .map((word, i) => (i === 0 ? word : word.toLowerCase()))
    .join(" ");
  const rows: { label: string; value: string }[] = [
    { label: "Can chi ngày", value: info.canChi.day.name },
    { label: "Ngũ hành", value: nguHanh },
    { label: "Sao tốt", value: `${saoTotCount} sao` },
    { label: "Sao xấu", value: `${saoXauCount} sao` },
  ];
  if (info.hyThan) rows.push({ label: "Hỷ thần", value: `Hướng ${info.hyThan.direction.toLowerCase()}` });
  if (info.taiThan) rows.push({ label: "Tài thần", value: `Hướng ${info.taiThan.direction.toLowerCase()}` });
  // Tuổi xung: bảng đối xung theo can chi ngày chưa có trong core (DayInfo.tuoiXung === null).
  rows.push({ label: "Tuổi xung", value: info.tuoiXung ? info.tuoiXung.ngay.map((c) => c.name).join(" · ") : "—" });

  return (
    <div className="cols2">
      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Giờ hoàng đạo hôm nay</span>
          <span className="rule" />
        </div>
        <div className="hours">
          {hoangDaoHours.map((h) => (
            <div key={h.chiName} className="hc">
              <b>{h.chiName}</b>
              <i>
                {Number.parseInt(h.start, 10)}h – {Number.parseInt(h.end, 10)}h
              </i>
            </div>
          ))}
        </div>
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Hôm nay</span>
          <span className="rule" />
        </div>
        {rows.map((row) => (
          <div key={row.label} className="row">
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
