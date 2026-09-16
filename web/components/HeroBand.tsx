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
          d="M0 62 q34 -36 70 -14 q28 17 52 -6 q30 -28 62 -6 q26 18 54 -6 q26 -22 56 4 L348 160 L0 160Z"
          fill="#256064"
          opacity=".55"
        />
        <path
          d="M0 88 q42 -28 86 -8 q34 16 62 -6 q36 -26 76 -2 q32 18 62 -4 L348 160 L0 160Z"
          fill="#17454b"
          opacity=".85"
        />
        <path d="M0 116 q86 -12 174 0 q88 12 174 0 L348 160 L0 160Z" fill="#7fb99f" opacity=".5" />
      </svg>
      <div className="hero-in">
        <div className="hero-l">
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
