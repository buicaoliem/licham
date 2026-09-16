import type { CHI, DayInfo } from "@licham/core";

interface HoangDaoHour {
  chiName: (typeof CHI)[number];
  start: string;
  end: string;
}

interface CurrentHour extends HoangDaoHour {
  isHoangDao: boolean;
}

export function TodayCards({
  hoangDaoHours,
  bestHour,
  currentHour,
  info,
}: {
  hoangDaoHours: HoangDaoHour[];
  bestHour: HoangDaoHour | null;
  currentHour: CurrentHour;
  info: DayInfo;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Can chi ngày", value: info.canChi.day.name },
    { label: "Ngũ hành", value: `${info.canChi.day.napAm.name} (${info.canChi.day.napAm.element})` },
  ];
  if (info.nhiThapBatTu) rows.push({ label: "Nhị thập bát tú", value: info.nhiThapBatTu.name });
  if (info.hyThan) rows.push({ label: "Hỷ thần", value: info.hyThan.direction });
  if (info.taiThan) rows.push({ label: "Tài thần", value: info.taiThan.direction });
  rows.push({ label: "Trực", value: info.truc.name });
  rows.push({ label: "Tiết khí", value: info.solarTerm.name });

  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-4 md:grid-cols-2">
      <div className="rounded-2xl border border-line bg-sheet p-5">
        <h3 className="text-center text-base font-semibold text-ink">Giờ hoàng đạo hôm nay</h3>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {hoangDaoHours.map((h) => (
            <div key={h.chiName} className="rounded-lg bg-luc-soft px-2 py-2.5 text-center">
              <div className="font-semibold text-luc">Giờ {h.chiName}</div>
              <div className="mt-0.5 text-xs text-ink-3">
                {h.start}–{h.end}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-line-2 pt-3">
          {bestHour && (
            <div className="flex items-center justify-between py-1 text-sm">
              <span className="text-ink-3">Giờ tốt nhất</span>
              <span className="font-semibold text-ink">
                Giờ {bestHour.chiName} ({bestHour.start}–{bestHour.end})
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-1 text-sm">
            <span className="text-ink-3">Giờ hiện tại</span>
            <span className="font-semibold text-ink">
              Giờ {currentHour.chiName} ({currentHour.start}–{currentHour.end})
              {currentHour.isHoangDao ? " · hoàng đạo" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-sheet p-5">
        <h3 className="text-center text-base font-semibold text-ink">Hôm nay</h3>
        <dl className="mt-4 divide-y divide-line-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2 text-sm">
              <dt className="text-ink-3">{row.label}</dt>
              <dd className="font-semibold text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
