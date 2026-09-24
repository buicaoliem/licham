"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PLACE_ID, formatCoords, placeById, placeGroups } from "@/lib/birth/places";
import { type BirthPlaceTz, formatOffset, isValidTimeZone, OFFSET_CHOICES } from "@/lib/birth/time";

export interface BirthFormState {
  lich: "duong" | "am";
  /** yyyy-mm-dd */
  dateIso: string;
  amDay: string;
  amMonth: string;
  amYear: string;
  amLeap: boolean;
  /** HH:MM */
  time: string;
  timeUnknown: boolean;
  placeId: string;
  customLat: string;
  customLon: string;
  customTz: string;
  /** "auto" = theo dữ liệu múi giờ của nơi sinh; hoặc số phút lệch UTC do người dùng chọn. */
  tzMode: string;
  /** Tử Vi, sinh ở nước ngoài: "bo" trừ giờ mùa hè về giờ chuẩn; "giu" giữ giờ đồng hồ. */
  gioMuaHe: "bo" | "giu";
}

export const DEFAULT_BIRTH: BirthFormState = {
  lich: "duong",
  dateIso: "1990-05-17",
  amDay: "23",
  amMonth: "4",
  amYear: "1990",
  amLeap: false,
  time: "11:30",
  timeUnknown: false,
  placeId: DEFAULT_PLACE_ID,
  customLat: "",
  customLon: "",
  customTz: "Asia/Ho_Chi_Minh",
  tzMode: "auto",
  gioMuaHe: "bo",
};

export type BirthField = "date" | "time" | "place";

export interface ParsedBirth {
  lich: "duong" | "am";
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  hour: number;
  minute: number;
  timeUnknown: boolean;
  place: BirthPlaceTz & { name: string };
  /** Độ lệch múi giờ tự chọn (phút); undefined = tự động. */
  overrideOffsetMinutes?: number;
  gioMuaHe: "bo" | "giu";
}

/** Kiểm tra dữ liệu nhập; trả về lỗi theo từng ô để hiển thị ngay dưới ô đó. */
export function parseBirth(s: BirthFormState): { value?: ParsedBirth; errors: Partial<Record<BirthField, string>> } {
  const errors: Partial<Record<BirthField, string>> = {};
  let year = 0;
  let month = 0;
  let day = 0;
  if (s.lich === "duong") {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.dateIso);
    if (!m) errors.date = "Chọn ngày sinh.";
    else [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
  } else {
    year = Number(s.amYear);
    month = Number(s.amMonth);
    day = Number(s.amDay);
    if (!Number.isInteger(year) || !s.amYear) errors.date = "Nhập năm âm lịch (4 chữ số).";
  }
  if (!errors.date && (year < 1900 || year > 2100)) errors.date = "Năm sinh cần trong khoảng 1900–2100.";

  let hour = 12;
  let minute = 0;
  if (!s.timeUnknown) {
    const t = /^(\d{1,2}):(\d{2})$/.exec(s.time);
    if (!t || Number(t[1]) > 23 || Number(t[2]) > 59) errors.time = "Nhập giờ sinh dạng giờ:phút, vd 07:45.";
    else [hour, minute] = [Number(t[1]), Number(t[2])];
  }

  let place: ParsedBirth["place"] | undefined;
  if (s.placeId === "custom") {
    const lat = Number(s.customLat.replace(",", "."));
    const lon = Number(s.customLon.replace(",", "."));
    if (!s.customLat || !Number.isFinite(lat) || lat < -90 || lat > 90) errors.place = "Vĩ độ cần từ −90 đến 90 (Bắc dương, Nam âm).";
    else if (!s.customLon || !Number.isFinite(lon) || lon < -180 || lon > 180) errors.place = "Kinh độ cần từ −180 đến 180 (Đông dương, Tây âm).";
    else if (!isValidTimeZone(s.customTz)) errors.place = "Múi giờ không hợp lệ.";
    else place = { lat, lon, tz: s.customTz, country: s.customTz === "Asia/Ho_Chi_Minh" ? "VN" : undefined, name: `Tọa độ ${formatCoords(lat, lon)}` };
  } else {
    const p = placeById(s.placeId);
    if (!p) errors.place = "Chọn nơi sinh.";
    else place = { lat: p.lat, lon: p.lon, tz: p.tz, country: p.country, name: p.name };
  }
  if (Object.keys(errors).length || !place) return { errors };
  const override = s.tzMode && s.tzMode !== "auto" ? Number(s.tzMode) : undefined;
  return {
    value: {
      lich: s.lich,
      year,
      month,
      day,
      isLeapMonth: s.lich === "am" && s.amLeap,
      hour,
      minute,
      timeUnknown: s.timeUnknown,
      place,
      overrideOffsetMinutes: Number.isFinite(override) ? override : undefined,
      gioMuaHe: s.gioMuaHe === "giu" ? "giu" : "bo",
    },
    errors,
  };
}

function useTimeZones(): string[] {
  const [zones, setZones] = useState<string[]>(["Asia/Ho_Chi_Minh", "UTC"]);
  useEffect(() => {
    try {
      const list = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone");
      if (list?.length) setZones(list.includes("Asia/Ho_Chi_Minh") ? list : ["Asia/Ho_Chi_Minh", ...list]);
    } catch {
      /* giữ danh sách tối thiểu */
    }
  }, []);
  return zones;
}

const CHI_GIO = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export function BirthFields({
  idPrefix,
  state,
  onChange,
  errors,
  allowLunar,
  allowUnknownTime,
  showCanhGio,
  showDstChoice = false,
}: {
  idPrefix: string;
  state: BirthFormState;
  onChange: (next: BirthFormState) => void;
  errors: Partial<Record<BirthField, string>>;
  allowLunar: boolean;
  allowUnknownTime: boolean;
  /** Hiện canh giờ tương ứng ngay dưới ô giờ (Tử Vi). */
  showCanhGio: boolean;
  /** Tử Vi: cho chọn cách xử lý giờ mùa hè khi sinh ở nước ngoài. */
  showDstChoice?: boolean;
}) {
  const zones = useTimeZones();
  const groups = useMemo(() => placeGroups(), []);
  const set = <K extends keyof BirthFormState>(k: K, v: BirthFormState[K]) => onChange({ ...state, [k]: v });
  const id = (s: string) => `${idPrefix}-${s}`;
  const canhGio = (() => {
    const t = /^(\d{1,2}):(\d{2})$/.exec(state.time);
    if (!t) return null;
    const h = Number(t[1]);
    if (h > 23) return null;
    const chi = Math.floor((h + 1) / 2) % 12;
    return `Giờ ${CHI_GIO[chi]}${h === 23 ? " — sau 23:00 tính sang ngày hôm sau" : ""}`;
  })();
  const place = placeById(state.placeId);
  const isVN = state.placeId === "custom" ? state.customTz === "Asia/Ho_Chi_Minh" : place?.country === "VN";
  // Người dùng tự mở/đóng; tự mở khi đang có múi giờ tự chọn (vd bấm "Tính lại theo UTC+7").
  const [advOpen, setAdvOpen] = useState(state.tzMode !== "auto");
  useEffect(() => {
    if (state.tzMode !== "auto") setAdvOpen(true);
  }, [state.tzMode]);

  return (
    <div className="bf">
      {allowLunar && (
        <div className="bf-row">
          <div className="bf-fld">
            <span className="bf-lbl" id={id("lich-l")}>
              Ngày sinh theo
            </span>
            <div className="dn-tabs bf-seg" role="group" aria-labelledby={id("lich-l")}>
              <button type="button" aria-pressed={state.lich === "duong"} onClick={() => set("lich", "duong")}>
                Dương lịch
              </button>
              <button type="button" aria-pressed={state.lich === "am"} onClick={() => set("lich", "am")}>
                Âm lịch
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bf-row">
        {state.lich === "duong" ? (
          <div className="difld bf-fld">
            <label htmlFor={id("date")}>Ngày sinh (dương lịch)</label>
            <input
              id={id("date")}
              type="date"
              min="1900-01-01"
              max="2100-12-31"
              value={state.dateIso}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? id("date-e") : undefined}
              onChange={(e) => set("dateIso", e.target.value)}
            />
          </div>
        ) : (
          <fieldset className="bf-fld bf-am" aria-describedby={errors.date ? id("date-e") : undefined}>
            <legend className="bf-lbl">Ngày sinh (âm lịch)</legend>
            <div className="bf-am-grid">
              <div className="difld">
                <label htmlFor={id("am-d")}>Ngày</label>
                <select id={id("am-d")} value={state.amDay} onChange={(e) => set("amDay", e.target.value)}>
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="difld">
                <label htmlFor={id("am-m")}>Tháng</label>
                <select id={id("am-m")} value={state.amMonth} onChange={(e) => set("amMonth", e.target.value)}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="difld">
                <label htmlFor={id("am-y")}>Năm</label>
                <input
                  id={id("am-y")}
                  type="number"
                  inputMode="numeric"
                  min={1900}
                  max={2100}
                  value={state.amYear}
                  aria-invalid={Boolean(errors.date)}
                  onChange={(e) => set("amYear", e.target.value)}
                />
              </div>
            </div>
            <label className="bf-check">
              <input type="checkbox" checked={state.amLeap} onChange={(e) => set("amLeap", e.target.checked)} /> Tháng nhuận
            </label>
          </fieldset>
        )}

        <div className="difld bf-fld">
          <label htmlFor={id("time")}>Giờ sinh (giờ đồng hồ tại nơi sinh)</label>
          <input
            id={id("time")}
            type="time"
            value={state.time}
            disabled={state.timeUnknown}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? id("time-e") : id("time-h")}
            onChange={(e) => set("time", e.target.value)}
          />
          <div className="fldhint" id={id("time-h")}>
            {showCanhGio && canhGio ? canhGio : "Theo giấy khai sinh hoặc lời kể của gia đình."}
          </div>
          {allowUnknownTime && (
            <label className="bf-check">
              <input type="checkbox" checked={state.timeUnknown} onChange={(e) => set("timeUnknown", e.target.checked)} /> Không rõ giờ sinh
            </label>
          )}
          {errors.time && (
            <div className="dierr" role="alert" id={id("time-e")}>
              {errors.time}
            </div>
          )}
        </div>
      </div>
      {errors.date && (
        <div className="dierr" role="alert" id={id("date-e")}>
          {errors.date}
        </div>
      )}

      <div className="bf-row">
        <div className="difld bf-fld bf-wide">
          <label htmlFor={id("place")}>Nơi sinh</label>
          <select id={id("place")} value={state.placeId} aria-describedby={id("place-h")} onChange={(e) => set("placeId", e.target.value)}>
            {groups.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.places.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="custom">Nơi khác — nhập tọa độ…</option>
          </select>
          <div className="fldhint" id={id("place-h")}>
            {place ? `${formatCoords(place.lat, place.lon)} · múi giờ ${place.tz}` : "Tra tọa độ trên bản đồ (vd Google Maps: nhấn giữ vào vị trí)."}
          </div>
        </div>
      </div>
      {state.placeId === "custom" && (
        <div className="bf-row bf-custom">
          <div className="difld bf-fld">
            <label htmlFor={id("lat")}>Vĩ độ</label>
            <input id={id("lat")} type="text" inputMode="decimal" placeholder="vd 21.03" value={state.customLat} onChange={(e) => set("customLat", e.target.value)} />
          </div>
          <div className="difld bf-fld">
            <label htmlFor={id("lon")}>Kinh độ</label>
            <input id={id("lon")} type="text" inputMode="decimal" placeholder="vd 105.85" value={state.customLon} onChange={(e) => set("customLon", e.target.value)} />
          </div>
          <div className="difld bf-fld">
            <label htmlFor={id("tz")}>Múi giờ</label>
            <select id={id("tz")} value={state.customTz} onChange={(e) => set("customTz", e.target.value)}>
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {errors.place && (
        <div className="dierr" role="alert">
          {errors.place}
        </div>
      )}

      {showDstChoice && !isVN && (
        <div className="bf-row">
          <div className="difld bf-fld bf-wide">
            <label htmlFor={id("dst")}>Giờ mùa hè (sinh ở nước ngoài)</label>
            <select id={id("dst")} value={state.gioMuaHe} aria-describedby={id("dst-h")} onChange={(e) => set("gioMuaHe", e.target.value === "giu" ? "giu" : "bo")}>
              <option value="bo">Trừ giờ mùa hè, an sao theo giờ chuẩn địa phương (khuyến nghị)</option>
              <option value="giu">Giữ nguyên giờ đồng hồ</option>
            </select>
            <div className="fldhint" id={id("dst-h")}>
              Chỉ có tác dụng khi nơi sinh đang dùng giờ mùa hè vào ngày đó; lá số luôn ghi rõ đã xử lý thế nào.
            </div>
          </div>
        </div>
      )}

      <details className="bf-adv" open={advOpen} onToggle={(e) => setAdvOpen(e.currentTarget.open)}>
        <summary>Múi giờ lúc sinh{state.tzMode !== "auto" ? ` · tự chọn UTC${formatOffset(Number(state.tzMode))}` : " · tự động"}</summary>
        <div className="bf-row">
          <div className="difld bf-fld">
            <label htmlFor={id("tzmode")}>Múi giờ của giờ sinh đã nhập</label>
            <select id={id("tzmode")} value={state.tzMode} aria-describedby={id("tzmode-h")} onChange={(e) => set("tzMode", e.target.value)}>
              <option value="auto">Tự động theo nơi sinh (gồm lịch sử múi giờ và giờ mùa hè)</option>
              {OFFSET_CHOICES.map((o) => (
                <option key={o} value={String(o)}>
                  UTC{formatOffset(o)}
                </option>
              ))}
            </select>
            <div className="fldhint" id={id("tzmode-h")}>
              Chỉ chọn tay khi biết chắc đồng hồ lúc sinh theo múi giờ nào (vd giờ kháng chiến UTC+7 giai đoạn 1947–1955).
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

/** Đọc/ghi trạng thái form gần nhất của người xem (chỉ là tiện ích; lỗi lưu trữ bị bỏ qua). */
export function loadSaved<T>(key: string): Partial<T> | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Partial<T>) : null;
  } catch {
    return null;
  }
}

export function save(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* bỏ qua */
  }
}
