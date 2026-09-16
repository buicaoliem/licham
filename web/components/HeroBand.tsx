import { WEEKDAY_LONG } from "@/lib/format";

export function HeroBand({
  dayOfWeek,
  solarDay,
  solarMonth,
  solarYear,
  lunarDay,
  lunarMonth,
  lunarYear,
  lunarIsLeap,
}: {
  dayOfWeek: number;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  lunarIsLeap: boolean;
}) {
  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{ background: "linear-gradient(168deg,#1d5f63 0%,#3f8b84 42%,#7fb99f 74%,#c9dcaf 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.28) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 78%,rgba(0,0,0,0.32) 100%)" }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:py-12 md:grid-cols-2 md:items-center md:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            {WEEKDAY_LONG[dayOfWeek]}
          </span>
          <span className="mt-2 font-display text-7xl font-semibold sm:text-8xl">{solarDay}</span>
          <span className="mt-2 text-sm text-white/85">
            Tháng {solarMonth} năm {solarYear}
          </span>
          <div className="mt-5 flex items-center gap-3 rounded-full bg-white/15 py-1.5 pr-5 pl-1.5 backdrop-blur-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 font-display text-lg font-semibold text-[#1d5f63]">
              {lunarDay}
            </span>
            <span className="text-sm text-white/90">
              {lunarIsLeap ? "tháng nhuận " : "tháng "}
              {lunarMonth} · năm {lunarYear}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-md sm:p-6">
          <h2 className="text-center text-base font-semibold">Đổi ngày âm dương</h2>
          <div className="mt-4 flex items-center gap-3">
            <label className="flex-1 text-sm">
              <span className="mb-1 block text-white/75">Ngày dương</span>
              <input
                type="text"
                readOnly
                defaultValue={`${solarDay}/${solarMonth}/${solarYear}`}
                className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/50"
              />
            </label>
            <button
              type="button"
              aria-label="Đổi chiều"
              className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/15 text-lg"
            >
              ⇄
            </button>
            <label className="flex-1 text-sm">
              <span className="mb-1 block text-white/75">Ngày âm</span>
              <input
                type="text"
                readOnly
                defaultValue={`${lunarDay}/${lunarMonth}/${lunarYear}`}
                className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/50"
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="button" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#1d5f63]">
              Đổi ngày
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
