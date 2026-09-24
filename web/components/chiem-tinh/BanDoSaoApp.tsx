"use client";

import { useEffect, useRef, useState } from "react";
import { BirthFields, type BirthField, type BirthFormState, DEFAULT_BIRTH, loadSaved, parseBirth, save } from "@/components/birth/BirthFields";
import type { Chart, HouseSystem, PointId } from "@/lib/chiem-tinh/engine";
import type { ResolvedBirthTime } from "@/lib/birth/time";
import { Wheel } from "./Wheel";

type Engine = typeof import("@/lib/chiem-tinh/bundle");

const STORE_KEY = "licham.bandosao.v1";

interface FormState extends BirthFormState {
  houseSystem: HouseSystem;
}

interface Result {
  chart: Chart;
  resolved: ResolvedBirthTime;
  place: string;
  local: string;
  /** Không rõ giờ sinh: thiên thể đổi cung trong ngày. */
  doiCung: { id: PointId; from: number; to: number }[];
}

const pad = (n: number) => String(n).padStart(2, "0");
/** Số thập phân kiểu Việt Nam: dấu phẩy. */
const num = (n: number, d: number) => n.toFixed(d).replace(".", ",");

export function BanDoSaoApp() {
  const [form, setForm] = useState<FormState>({ ...DEFAULT_BIRTH, houseSystem: "placidus" });
  const [errors, setErrors] = useState<Partial<Record<BirthField | "form", string>>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState<PointId | null>("sun");
  const engine = useRef<Engine | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadSaved<FormState>(STORE_KEY);
    if (saved) setForm((f) => ({ ...f, ...saved, lich: "duong" }));
  }, []);

  async function compute(f: FormState) {
    const { value, errors: errs } = parseBirth({ ...f, lich: "duong" });
    if (!value) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      engine.current ??= await import("@/lib/chiem-tinh/bundle");
      const { resolveBirthTime, computeChart, signChangesBetween } = engine.current;
      // Không rõ giờ: dùng 12:00 trưa địa phương để sai số Mặt Trăng nhỏ nhất (±6–7°).
      const hour = value.timeUnknown ? 12 : value.hour;
      const minute = value.timeUnknown ? 0 : value.minute;
      const day = { year: value.year, month: value.month, day: value.day };
      const opts = { overrideOffsetMinutes: value.overrideOffsetMinutes };
      const resolved = resolveBirthTime({ ...day, hour, minute }, value.place, opts);
      const chart = computeChart({ utcMs: resolved.utcMs, lat: value.place.lat, lon: value.place.lon, houseSystem: f.houseSystem, timeKnown: !value.timeUnknown });
      // Không rõ giờ: thiên thể nào đổi cung trong cả ngày sinh (00:00–23:59 giờ địa phương) thì chưa chắc cung.
      const doiCung = value.timeUnknown
        ? signChangesBetween(resolveBirthTime({ ...day, hour: 0, minute: 0 }, value.place, opts).utcMs, resolveBirthTime({ ...day, hour: 23, minute: 59 }, value.place, opts).utcMs)
        : [];
      setResult({ chart, resolved, place: value.place.name, local: `${pad(value.day)}/${pad(value.month)}/${value.year} ${pad(hour)}:${pad(minute)}`, doiCung });
      setSelected("sun");
      save(STORE_KEY, f);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (err) {
      setErrors({ form: err instanceof Error && err.name === "ChartInputError" ? err.message : "Không lập được bản đồ sao với dữ liệu này." });
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    void compute(form);
  }

  function recomputeWithOffset(offsetMinutes: number) {
    const next = { ...form, tzMode: String(offsetMinutes) };
    setForm(next);
    void compute(next);
  }

  return (
    <>
      <div className="ls-top">
        <form className="ch-card tool-form ls-form" onSubmit={submit} noValidate aria-labelledby="ct-form-h">
          <h2 className="ch-h2 ch-card-h" id="ct-form-h">
            Thông tin ngày sinh
          </h2>
          <BirthFields idPrefix="ct" state={form} onChange={(b) => setForm({ ...form, ...b })} errors={errors} allowLunar={false} allowUnknownTime showCanhGio={false} />
          <div className="bf-row bf-submit">
            <div className="difld bf-fld">
              <label htmlFor="ct-hs">Hệ thống nhà</label>
              <select id="ct-hs" value={form.houseSystem} onChange={(e) => setForm({ ...form, houseSystem: e.target.value as HouseSystem })}>
                <option value="placidus">Placidus (mặc định)</option>
                <option value="whole-sign">Whole Sign (cả cung)</option>
                <option value="equal">Equal (nhà đều)</option>
                <option value="porphyry">Porphyry</option>
              </select>
            </div>
            <button type="submit" className="ch-btn pri lg" disabled={loading} aria-busy={loading}>
              {loading ? "Đang tính vị trí…" : "Lập bản đồ sao"}
            </button>
          </div>
          {errors.form && (
            <div className="dierr ls-formerr" role="alert">
              {errors.form}
            </div>
          )}
        </form>
        <aside className="ch-card ls-guide" aria-labelledby="ct-guide-h">
          <h2 className="ch-h2 ch-card-h" id="ct-guide-h">
            Cách dùng
          </h2>
          <ol>
            <li>Nhập ngày, giờ theo đồng hồ và nơi sinh. Giờ mùa hè và múi giờ lịch sử được tính tự động.</li>
            <li>Chạm vào ký hiệu hành tinh trên vòng tròn hoặc trong bảng để xem vị trí, nhà, góc hợp và ý nghĩa.</li>
            <li>Không rõ giờ sinh? Đánh dấu ô tương ứng: bản đồ bỏ Ascendant, MC và 12 nhà.</li>
          </ol>
          <p className="ls-guide-note">Ascendant đổi khoảng 1° mỗi 4 phút — giờ sinh sai 15 phút có thể đổi cung Mọc. Dữ liệu chỉ xử lý trên máy của bạn.</p>
        </aside>
      </div>
      <div ref={resultRef} className="ls-result-anchor" aria-live="polite">
        {loading && !result && (
          <div className="ch-card ls-loading" role="status">
            <span className="ls-spin" aria-hidden="true" /> Đang tính vị trí thiên thể…
          </div>
        )}
        {result && engine.current && <ChartResult r={result} selected={selected} onSelect={setSelected} engine={engine.current} onRecompute={recomputeWithOffset} />}
      </div>
    </>
  );
}

function ChartResult({
  r,
  selected,
  onSelect,
  engine,
  onRecompute,
}: {
  r: Result;
  selected: PointId | null;
  onSelect: (id: PointId) => void;
  engine: Engine;
  onRecompute: (offsetMinutes: number) => void;
}) {
  const { chart, resolved } = r;
  const { POINTS, SIGNS, HOUSES, ASPECTS, ASPECT_MEANING, HOUSE_SYSTEMS, formatSignDegree, signOf, pointInSign, pointInHouse, balance, formatOffset } = engine;
  const sun = chart.points.find((p) => p.id === "sun")!;
  const moon = chart.points.find((p) => p.id === "moon")!;
  const known = chart.input.timeKnown;
  const utc = new Date(resolved.utcMs);
  const utcLabel = `${pad(utc.getUTCDate())}/${pad(utc.getUTCMonth() + 1)}/${utc.getUTCFullYear()} ${pad(utc.getUTCHours())}:${pad(utc.getUTCMinutes())} UTC`;
  const bal = balance([...chart.points, ...(chart.asc !== undefined ? [{ id: "asc" as PointId, lon: chart.asc }] : [])]);
  const maxEl = Math.max(...Object.values(bal.element), 1);
  const aspectDef = (t: string) => ASPECTS.find((a) => a.type === t)!;
  const hsName = HOUSE_SYSTEMS.find((h) => h.id === (chart.houseSystemUsed ?? chart.input.houseSystem))?.name;

  /** Tên cung; thêm cung kế bên khi thiên thể đổi cung trong ngày mà không rõ giờ sinh. */
  const signName = (id: PointId, lon: number) => {
    const d = r.doiCung.find((x) => x.id === id);
    return d ? `${SIGNS[d.from].name} hoặc ${SIGNS[d.to].name}` : signOf(lon).name;
  };
  const chuaChac = (id: PointId) => r.doiCung.some((x) => x.id === id);
  const notes: string[] = [];
  if (!known) notes.push("Không rõ giờ sinh: tính theo 12:00 trưa địa phương; Mặt Trăng có thể lệch tới ±6–7°; không có Ascendant, MC, 12 nhà.");
  for (const d of r.doiCung) notes.push(`${POINTS[d.id].name} đổi cung trong ngày sinh (${SIGNS[d.from].name} → ${SIGNS[d.to].name}): cần giờ sinh để biết chắc cung.`);
  if (!known && r.doiCung.length === 0) notes.push("Trong cả ngày sinh không thiên thể nào đổi cung, nên cung của các hành tinh vẫn chắc chắn.");
  if (resolved.manualOffset) notes.push(`Giờ đồng hồ được tính theo múi giờ bạn chọn: UTC${formatOffset(resolved.offsetMinutes)} (không áp dụng giờ mùa hè tự động).`);
  if (chart.polarNote) notes.push(chart.polarNote);
  if (resolved.status === "gap") notes.push("Giờ đã nhập không tồn tại (đúng lúc chuyển sang giờ mùa hè); đã tính theo độ lệch trước khi chuyển.");
  if (resolved.status === "ambiguous") notes.push("Giờ đã nhập lặp hai lần (lúc lùi đồng hồ); đã chọn lần thứ nhất, còn giờ mùa hè.");
  if (resolved.dstMinutes) notes.push(`Giờ đồng hồ nơi sinh đang là giờ mùa hè (+${resolved.dstMinutes} phút so với giờ chuẩn); chiêm tinh dùng thời điểm thực nên đã tính đúng theo giờ mùa hè.`);
  if (resolved.northVietnamAdjusted) notes.push("Miền Bắc Việt Nam 1960–1975 dùng UTC+07:00 (tzdata ghi UTC+08:00 theo Sài Gòn).");
  if (chart.houseFallback) notes.push(chart.houseFallback);
  if (Math.abs(moon.lon % 30) < 1 || Math.abs(moon.lon % 30) > 29) notes.push("Mặt Trăng nằm sát ranh giới hai cung — nên kiểm tra kỹ giờ sinh.");
  if (known && chart.asc !== undefined && (chart.asc % 30 < 1 || chart.asc % 30 > 29)) notes.push("Ascendant nằm sát ranh giới hai cung — sai lệch vài phút giờ sinh sẽ đổi cung Mọc.");

  const sel = selected ? (selected === "asc" ? { id: "asc" as PointId, lon: chart.asc!, house: 1 } : selected === "mc" ? { id: "mc" as PointId, lon: chart.mc!, house: 10 } : chart.points.find((p) => p.id === selected)) : null;
  const selAspects = sel ? chart.aspects.filter((a) => a.a === sel.id || a.b === sel.id) : [];

  return (
    <div className="ls-result">
      <section className="ch-card ls-sum" aria-labelledby="ct-sum-h">
        <div className="ls-sum-head">
          <div>
            <p className="ch-eyebrow">Kết quả tính toán</p>
            <h2 className="ch-h2" id="ct-sum-h">
              Bản đồ sao cá nhân
            </h2>
            <p className="ch-sub">
              {r.local} tại {r.place} · UTC{formatOffset(resolved.offsetMinutes)} · {utcLabel}
            </p>
          </div>
          <button type="button" className="ch-btn ghost ls-print" onClick={() => window.print()}>
            In bản đồ
          </button>
        </div>
        <div className="ch-stats ls-stats">
          <button type="button" className="ch-stat ls-vh-btn" onClick={() => onSelect("sun")}>
            <div className="v sm">{signName("sun", sun.lon)}</div>
            <div className="k">
              Mặt Trời · {chuaChac("sun") ? "chưa chắc cung, cần giờ sinh" : formatSignDegree(sun.lon)}
            </div>
          </button>
          <button type="button" className="ch-stat ls-vh-btn" onClick={() => onSelect("moon")}>
            <div className="v sm">{signName("moon", moon.lon)}</div>
            <div className="k">
              Mặt Trăng · {chuaChac("moon") ? "chưa chắc cung, cần giờ sinh" : formatSignDegree(moon.lon)}
            </div>
          </button>
          {chart.asc !== undefined ? (
            <button type="button" className="ch-stat ls-vh-btn" onClick={() => onSelect("asc")}>
              <div className="v sm">{signOf(chart.asc).name}</div>
              <div className="k">Ascendant · {formatSignDegree(chart.asc)}</div>
            </button>
          ) : (
            <div className="ch-stat">
              <div className="v sm">—</div>
              <div className="k">Ascendant (cần giờ sinh)</div>
            </div>
          )}
          {chart.mc !== undefined && (
            <button type="button" className="ch-stat ls-vh-btn" onClick={() => onSelect("mc")}>
              <div className="v sm">{signOf(chart.mc).name}</div>
              <div className="k">Thiên đỉnh MC · {formatSignDegree(chart.mc)}</div>
            </button>
          )}
        </div>
        {resolved.historical && (
          <div className="ls-warn" role="note">
            <p>
              <b>Giờ sinh thuộc thời kỳ có hai múi giờ.</b> {resolved.historical.note}
            </p>
            <div className="ls-warn-btns">
              {resolved.historical.alternatives.map((a) => {
                const on = Math.abs(resolved.offsetMinutes - a.offsetMinutes) < 1 / 60;
                return (
                  <button key={a.offsetMinutes} type="button" className={on ? "ch-btn pri" : "ch-btn"} aria-pressed={on} onClick={() => onRecompute(a.offsetMinutes)}>
                    {on ? "Đang dùng: " : "Tính lại theo "}
                    {a.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {notes.length > 0 && (
          <ul className="ls-notes">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </section>

      <div className="ct-main">
        <section className="ch-card ct-wheel-card" aria-labelledby="ct-wheel-h">
          <h2 className="ch-h2" id="ct-wheel-h">
            Vòng hoàng đạo
          </h2>
          <p className="ch-sub">{known ? `Ascendant đặt bên trái · hệ nhà ${hsName}` : "0° Bạch Dương đặt bên trái · không có nhà vì thiếu giờ sinh"}</p>
          <Wheel chart={chart} selected={selected} onSelect={onSelect} />
          <p className="ls-legend">
            <span className="lg-hop">hòa hợp (△ ⚹)</span>
            <span className="lg-cang">căng thẳng (□ ☍)</span>
            <span>℞ nghịch hành</span>
          </p>
          <div className="ct-chips" role="group" aria-label="Chọn điểm">
            {[...chart.points.filter((p) => p.id !== "southNode").map((p) => p.id), ...(known ? (["asc", "mc"] as PointId[]) : [])].map((id) => (
              <button key={id} type="button" aria-pressed={selected === id} onClick={() => onSelect(id)}>
                <span aria-hidden="true">{POINTS[id].symbol}</span> {POINTS[id].name}
              </button>
            ))}
          </div>
        </section>

        {sel && (
          <section className="ch-card ls-detail" aria-labelledby="ct-detail-h">
            <p className="ch-eyebrow">
              {formatSignDegree(sel.lon)}
              {"house" in sel && sel.house ? ` · nhà ${sel.house}` : ""}
              {"retrograde" in sel && sel.retrograde && sel.id !== "node" && sel.id !== "southNode" ? " · nghịch hành" : ""}
            </p>
            <h2 className="ch-h2" id="ct-detail-h">
              <span className="ct-glyph" aria-hidden="true">
                {POINTS[sel.id].symbol}
              </span>{" "}
              {POINTS[sel.id].name}
            </h2>
            <div className="ls-block">
              <h3 className="ls-block-h">
                <span className="ls-badge calc">Tính toán</span> Vị trí
              </h3>
              <dl className="ls-rings">
                <div>
                  <dt>Kinh độ hoàng đạo</dt>
                  <dd>{num(sel.lon, 4)}°</dd>
                </div>
                <div>
                  <dt>Cung</dt>
                  <dd>
                    {signOf(sel.lon).name} ({signOf(sel.lon).element}, {signOf(sel.lon).modality.toLowerCase()})
                  </dd>
                </div>
                {"speed" in sel && (
                  <div>
                    <dt>Tốc độ</dt>
                    <dd>{num(sel.speed, 3)}°/ngày</dd>
                  </div>
                )}
                {"house" in sel && sel.house !== undefined && (
                  <div>
                    <dt>Nhà</dt>
                    <dd>{sel.house}</dd>
                  </div>
                )}
                {sel.id === "node" && (
                  <div>
                    <dt>Nút trung bình</dt>
                    <dd>{formatSignDegree(chart.meanNode)}</dd>
                  </div>
                )}
              </dl>
              {selAspects.length > 0 ? (
                <ul className="ct-asp-list">
                  {selAspects.map((a, i) => {
                    const other = a.a === sel.id ? a.b : a.a;
                    const d = aspectDef(a.type);
                    return (
                      <li key={i} className={`t-${d.tone}`}>
                        <button type="button" onClick={() => onSelect(other)}>
                          <b>
                            {d.symbol} {d.name}
                          </b>{" "}
                          với {POINTS[other].name} · orb {num(a.orb, 1)}°{a.applying === undefined ? "" : a.applying ? " · đang tụ" : " · đang tách"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="ls-muted">Không có góc hợp chính trong orb.</p>
              )}
            </div>
            <div className="ls-block">
              <h3 className="ls-block-h">
                <span className="ls-badge trad">Tham khảo</span> Diễn giải chiêm tinh
              </h3>
              <div className="ls-doan">
                <h4>{POINTS[sel.id].domain}</h4>
                <p>{POINTS[sel.id].meaning}</p>
              </div>
              <div className="ls-doan">
                <h4>Tại {signOf(sel.lon).name}</h4>
                <p>
                  {pointInSign(sel.id, sel.lon)} {signOf(sel.lon).name}: {signOf(sel.lon).keywords}.
                </p>
              </div>
              {"house" in sel && sel.house !== undefined && sel.id !== "asc" && sel.id !== "mc" && (
                <div className="ls-doan">
                  <h4>Ở nhà {sel.house}</h4>
                  <p>{pointInHouse(sel.id, sel.house)}</p>
                </div>
              )}
              {selAspects.slice(0, 4).map((a, i) => (
                <div className="ls-doan" key={i}>
                  <h4>
                    {aspectDef(a.type).name} với {POINTS[a.a === sel.id ? a.b : a.a].name}
                  </h4>
                  <p>{ASPECT_MEANING[a.type]}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="ct-tables">
        <section className="ch-card" aria-labelledby="ct-pl-h">
          <h2 className="ch-h2 ch-card-h" id="ct-pl-h">
            Vị trí hành tinh
          </h2>
          <div className="ct-tbl-wrap">
            <table className="ct-tbl">
              <thead>
                <tr>
                  <th scope="col">Điểm</th>
                  <th scope="col">Vị trí</th>
                  {known && <th scope="col">Nhà</th>}
                  <th scope="col">
                    <abbr title="Nghịch hành">℞</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {chart.points.map((p) => (
                  <tr key={p.id} className={selected === p.id ? "on" : undefined}>
                    <th scope="row">
                      <button type="button" onClick={() => onSelect(p.id)}>
                        <span className="ct-glyph" aria-hidden="true">
                          {POINTS[p.id].symbol}
                        </span>{" "}
                        {POINTS[p.id].name}
                      </button>
                    </th>
                    <td>
                      {formatSignDegree(p.lon)}
                      {chuaChac(p.id) && <span className="ct-unsure"> · có thể {signName(p.id, p.lon)}</span>}
                    </td>
                    {known && <td>{p.house}</td>}
                    <td>{p.retrograde && p.id !== "node" && p.id !== "southNode" ? "℞" : ""}</td>
                  </tr>
                ))}
                {known && (
                  <>
                    <tr className={selected === "asc" ? "on" : undefined}>
                      <th scope="row">
                        <button type="button" onClick={() => onSelect("asc")}>
                          AC Ascendant
                        </button>
                      </th>
                      <td>{formatSignDegree(chart.asc!)}</td>
                      <td>1</td>
                      <td />
                    </tr>
                    <tr className={selected === "mc" ? "on" : undefined}>
                      <th scope="row">
                        <button type="button" onClick={() => onSelect("mc")}>
                          MC Thiên đỉnh
                        </button>
                      </th>
                      <td>{formatSignDegree(chart.mc!)}</td>
                      <td>10</td>
                      <td />
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {chart.cusps && (
          <section className="ch-card" aria-labelledby="ct-h-h">
            <h2 className="ch-h2 ch-card-h" id="ct-h-h">
              12 nhà · {hsName}
            </h2>
            <ul className="ct-houses">
              {chart.cusps.map((c, i) => (
                <li key={i}>
                  <span className="n">{i + 1}</span>
                  <span className="p">{formatSignDegree(c)}</span>
                  <span className="m">{HOUSES[i].meaning}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="ch-card" aria-labelledby="ct-as-h">
          <h2 className="ch-h2 ch-card-h" id="ct-as-h">
            Góc hợp chính ({chart.aspects.length})
          </h2>
          <p className="ch-sub">Orb: trùng tụ, đối đỉnh 8°; vuông góc, tam hợp 7°; lục hợp 5°. Mặt Trời, Mặt Trăng +2°; Nút, ASC, MC tối đa 5°.</p>
          <ul className="ct-asp-all">
            {chart.aspects.map((a, i) => {
              const d = aspectDef(a.type);
              return (
                <li key={i} className={`t-${d.tone}`}>
                  <button type="button" onClick={() => onSelect(a.a)}>
                    {POINTS[a.a].name}
                  </button>
                  <span className="sym" title={d.name}>
                    {d.symbol}
                  </span>
                  <button type="button" onClick={() => onSelect(a.b)}>
                    {POINTS[a.b].name}
                  </button>
                  <span className="orb">
                    {d.name} · {num(a.orb, 1)}°
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="ch-card" aria-labelledby="ct-bal-h">
          <h2 className="ch-h2 ch-card-h" id="ct-bal-h">
            Cân bằng nguyên tố
          </h2>
          <p className="ch-sub">Đếm 10 hành tinh{known ? " và Ascendant" : ""} theo cung.</p>
          <ul className="ct-bars">
            {Object.entries(bal.element).map(([k, v]) => (
              <li key={k} className={`el-${{ Lửa: "fire", Đất: "earth", Khí: "air", Nước: "water" }[k]}`}>
                <span className="k">{k}</span>
                <span className="bar">
                  <span style={{ width: `${(v / maxEl) * 100}%` }} />
                </span>
                <span className="v">{v}</span>
              </li>
            ))}
          </ul>
          <p className="ls-muted">
            Tính chất: {Object.entries(bal.modality)
              .map(([k, v]) => `${k} ${v}`)
              .join(" · ")}
          </p>
          <p className="ls-muted">Cung hoàng đạo: {SIGNS.length} cung nhiệt đới, 0° Bạch Dương = điểm Xuân phân.</p>
        </section>
      </div>
    </div>
  );
}
