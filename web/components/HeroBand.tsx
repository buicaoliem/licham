import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";

export function HeroBand({
  dayOfWeek,
  solarDay,
  solarMonth,
  solarYear,
  lunarDay,
  lunarMonth,
  lunarYear,
  lunarIsLeap,
  yearCanChi,
  isHoangDao,
  trucName,
  solarTermName,
}: {
  dayOfWeek: number;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  lunarIsLeap: boolean;
  yearCanChi: string;
  isHoangDao: boolean;
  trucName: string;
  solarTermName: string;
}) {
  return (
    <div className="hero">
      <div className="bg" />
      <svg className="land" viewBox="0 0 348 160" preserveAspectRatio="none">
        <path
          d="M0 108 q34 -14 70 -4 q28 8 52 -6 q30 -12 62 -2 q26 6 54 -6 q26 -10 56 4 L348 160 L0 160Z"
          fill="#256064"
          opacity=".55"
        />
        <path
          d="M0 126 q42 -10 86 -2 q34 6 62 -4 q36 -10 76 0 q32 6 62 -4 L348 160 L0 160Z"
          fill="#17454b"
          opacity=".85"
        />
        <path d="M0 142 q86 -6 174 0 q88 6 174 0 L348 160 L0 160Z" fill="#7fb99f" opacity=".5" />
      </svg>
      <div className="hero-in">
        <div className="hero-l">
          <div className="hero-l-glow" />
          <div className="hero-l-text">
            <div className="dow">{WEEKDAY_LONG[dayOfWeek]}</div>
            <div className="num">{solarDay}</div>
            <div className="mon">
              Tháng {MONTH_WORD[solarMonth - 1]} năm {solarYear}
            </div>
            <div>
              <span className="lun">
                <b>{lunarDay}</b>
                <span>
                  tháng {MONTH_WORD[lunarMonth - 1]}
                  {lunarIsLeap ? " nhuận" : ""} <em>·</em> năm {yearCanChi}
                </span>
              </span>
            </div>
            <div className="mk2">
              <span>{isHoangDao ? "Hoàng đạo" : "Hắc đạo"}</span>
              <span>Trực {trucName}</span>
              <span>Tiết {solarTermName}</span>
            </div>
          </div>
        </div>
        <div className="hero-r">
          <h2>Đổi ngày âm dương</h2>
          <div className="conv">
            <div className="fld">
              <label>Dương lịch</label>
              <div className="inp">
                {pad2(solarDay)} / {pad2(solarMonth)} / {solarYear}
              </div>
            </div>
            <div className="swp">⇄</div>
            <div className="fld">
              <label>Âm lịch</label>
              <div className="inp">
                {pad2(lunarDay)} / {pad2(lunarMonth)} / {lunarYear}
              </div>
            </div>
          </div>
          <div className="right">
            <button type="button" className="btn onart">
              Đổi ngày
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
