import type { CHI, DayInfo } from "@licham/core";

interface HoangDaoHour {
  chiName: (typeof CHI)[number];
  start: string;
  end: string;
}

export function TodayCards({
  hoangDaoHours,
  worstHour,
  info,
  saoTotCount,
  saoXauCount,
}: {
  hoangDaoHours: HoangDaoHour[];
  worstHour: HoangDaoHour | null;
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
  const tuoiXungNgay = info.tuoiXung.ngay;

  const bestHour = hoangDaoHours[0] ?? null;
  const hourLabel = (h: HoangDaoHour) => `${h.chiName} (${Number.parseInt(h.start, 10)}h – ${Number.parseInt(h.end, 10)}h)`;
  const hourRows: { label: string; value: string }[] = [];
  if (bestHour) hourRows.push({ label: "Giờ tốt nhất", value: hourLabel(bestHour) });
  if (worstHour) hourRows.push({ label: "Giờ xấu nhất", value: hourLabel(worstHour) });
  if (info.khongMinh) hourRows.push({ label: "Khổng Minh lục diệu", value: info.khongMinh.name });

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
        {hourRows.length > 0 && (
          <div className="hours-extra">
            {hourRows.map((row) => (
              <div key={row.label} className="row">
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Hôm nay</span>
          <span className="rule" />
        </div>
        {rows.filter((row) => row.value).map((row) => (
          <div key={row.label} className="row">
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
        <div className="row">
          <span>Tuổi xung</span>
          <span>
            {tuoiXungNgay.map((x, i) => (
              <span key={x.canChi.name} style={x.isThienKhacDiaXung ? { color: "var(--son)" } : undefined}>
                {x.canChi.name}
                {i < tuoiXungNgay.length - 1 ? " · " : ""}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
