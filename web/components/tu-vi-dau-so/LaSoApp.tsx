"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { canChiOfDay, canChiOfHours, canChiOfMonth, jdFromDate } from "@licham/core";
import { BirthFields, type BirthField, type BirthFormState, DEFAULT_BIRTH, loadSaved, parseBirth, save } from "@/components/birth/BirthFields";
import { formatOffset } from "@/lib/birth/time";
import type { NgaySinhChuanHoa } from "@/lib/tu-vi-dau-so/birth";
import type { GioiTinh, LaSo, SaoTrongCung } from "@/lib/tu-vi-dau-so/engine";
import type { VanHanNam } from "@/lib/tu-vi-dau-so/van-han";
import { CungMap, SaBanDesktop, SaoTen } from "./SaBan";

type Engine = typeof import("@/lib/tu-vi-dau-so/bundle");

const STORE_KEY = "licham.laso.v1";

interface FormState extends BirthFormState {
  hoTen: string;
  gioiTinh: GioiTinh;
  namXem: string;
}

interface Result {
  laSo: LaSo;
  ns: NgaySinhChuanHoa;
  hoTen: string;
  place: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function LaSoApp({ namHienTai }: { namHienTai: number }) {
  const [form, setForm] = useState<FormState>({ ...DEFAULT_BIRTH, hoTen: "", gioiTinh: "nam", namXem: String(namHienTai) });
  const [errors, setErrors] = useState<Partial<Record<BirthField | "form", string>>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState(0);
  const [namXem, setNamXem] = useState(namHienTai);
  const [showLuu, setShowLuu] = useState(true);
  const engine = useRef<Engine | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadSaved<FormState>(STORE_KEY);
    if (saved) setForm((f) => ({ ...f, ...saved, namXem: String(namHienTai), timeUnknown: false }));
  }, [namHienTai]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { value, errors: errs } = parseBirth({ ...form, timeUnknown: false });
    const ny = Number(form.namXem);
    if (!value) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      engine.current ??= await import("@/lib/tu-vi-dau-so/bundle");
      const { chuanHoaNgaySinh, lapLaSo } = engine.current;
      const ns = chuanHoaNgaySinh({ ...value, gioiTinh: form.gioiTinh });
      const laSo = lapLaSo(ns.lunar, form.gioiTinh);
      const y = Number.isInteger(ny) && ny >= laSo.birth.year && ny <= laSo.birth.year + 119 ? ny : Math.max(namHienTai, laSo.birth.year);
      setResult({ laSo, ns, hoTen: form.hoTen.trim(), place: value.place.name });
      setSelected(laSo.menhChi);
      setNamXem(y);
      save(STORE_KEY, { ...form, timeUnknown: false });
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (err) {
      setErrors({ form: err instanceof Error && err.name === "LaSoInputError" ? err.message : "Không lập được lá số với dữ liệu này. Kiểm tra lại ngày, giờ và nơi sinh." });
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const vanHan: VanHanNam | null = useMemo(() => {
    if (!result || !engine.current) return null;
    try {
      return engine.current.vanHanNam(result.laSo, namXem);
    } catch {
      return null;
    }
  }, [result, namXem]);

  const luu = showLuu && vanHan ? vanHan.saoLuu : [];
  const hanCung = { daiHan: vanHan?.daiHan?.chi, tieuHan: vanHan?.tieuHan.chi };

  return (
    <>
      <div className="ls-top">
        <form className="ch-card tool-form ls-form" onSubmit={submit} noValidate aria-labelledby="ls-form-h">
          <h2 className="ch-h2 ch-card-h" id="ls-form-h">
            Thông tin ngày sinh
          </h2>
          <div className="bf-row">
            <div className="difld bf-fld bf-wide">
              <label htmlFor="ls-ten">Họ tên (không bắt buộc, không lưu lên máy chủ)</label>
              <input id="ls-ten" className="bf-text" type="text" autoComplete="off" maxLength={60} value={form.hoTen} onChange={(e) => setForm({ ...form, hoTen: e.target.value })} />
            </div>
            <div className="bf-fld">
              <span className="bf-lbl" id="ls-gt-l">
                Giới tính
              </span>
              <div className="dn-tabs bf-seg" role="group" aria-labelledby="ls-gt-l">
                <button type="button" aria-pressed={form.gioiTinh === "nam"} onClick={() => setForm({ ...form, gioiTinh: "nam" })}>
                  Nam
                </button>
                <button type="button" aria-pressed={form.gioiTinh === "nu"} onClick={() => setForm({ ...form, gioiTinh: "nu" })}>
                  Nữ
                </button>
              </div>
            </div>
          </div>
          <BirthFields
            idPrefix="ls"
            state={form}
            onChange={(b) => setForm({ ...form, ...b })}
            errors={errors}
            allowLunar
            allowUnknownTime={false}
            showCanhGio
          />
          <div className="bf-row bf-submit">
            <div className="difld bf-fld">
              <label htmlFor="ls-namxem">Năm xem vận hạn</label>
              <input id="ls-namxem" type="number" inputMode="numeric" min={1900} max={2100} value={form.namXem} onChange={(e) => setForm({ ...form, namXem: e.target.value })} />
            </div>
            <button type="submit" className="ch-btn pri lg" disabled={loading} aria-busy={loading}>
              {loading ? "Đang an sao…" : "Lập lá số"}
            </button>
          </div>
          {errors.form && (
            <div className="dierr ls-formerr" role="alert">
              {errors.form}
            </div>
          )}
        </form>

        <aside className="ch-card ls-guide" aria-labelledby="ls-guide-h">
          <h2 className="ch-h2 ch-card-h" id="ls-guide-h">
            Cách dùng
          </h2>
          <ol>
            <li>Nhập ngày sinh dương lịch (hoặc âm lịch nếu chỉ nhớ ngày âm), giờ sinh theo đồng hồ và nơi sinh.</li>
            <li>Bấm &ldquo;Lập lá số&rdquo;. Chạm vào từng cung trên sa bàn để xem sao và phần giải nghĩa.</li>
            <li>Đổi năm xem để thấy đại hạn, tiểu hạn và sao lưu của năm đó.</li>
          </ol>
          <p className="ls-guide-note">
            Mọi phép tính chạy ngay trên máy của bạn; ngày sinh không được gửi đi. Giờ sinh lệch sang canh giờ khác sẽ đổi hẳn lá số — hãy kiểm tra kỹ giờ sinh.
          </p>
        </aside>
      </div>

      <div ref={resultRef} className="ls-result-anchor" aria-live="polite">
        {loading && !result && (
          <div className="ch-card ls-loading" role="status">
            <span className="ls-spin" aria-hidden="true" /> Đang an sao…
          </div>
        )}
        {result && (
          <LaSoResult
            r={result}
            selected={selected}
            onSelect={setSelected}
            vanHan={vanHan}
            namXem={namXem}
            setNamXem={setNamXem}
            luu={luu}
            showLuu={showLuu}
            setShowLuu={setShowLuu}
            hanCung={hanCung}
            engine={engine.current}
          />
        )}
      </div>
    </>
  );
}

function LaSoResult({
  r,
  selected,
  onSelect,
  vanHan,
  namXem,
  setNamXem,
  luu,
  showLuu,
  setShowLuu,
  hanCung,
  engine,
}: {
  r: Result;
  selected: number;
  onSelect: (chi: number) => void;
  vanHan: VanHanNam | null;
  namXem: number;
  setNamXem: (n: number) => void;
  luu: VanHanNam["saoLuu"];
  showLuu: boolean;
  setShowLuu: (b: boolean) => void;
  hanCung: { daiHan?: number; tieuHan?: number };
  engine: Engine | null;
}) {
  const { laSo, ns } = r;
  const b = laSo.birth;
  const s = ns.solarTuVi;
  const jd = jdFromDate(s.day, s.month, s.year);
  const ccNgay = canChiOfDay(jd);
  const ccThang = canChiOfMonth(b.month, b.year);
  const ccGio = canChiOfHours(ccNgay.canIndex)[b.hourChi].canChi;
  const civil = ns.solarCivil;
  const minYear = b.year;
  const maxYear = Math.min(2100, b.year + 119);

  const thienBan = (
    <div className="ls-tb">
      <p className="ls-tb-name">{r.hoTen || "Lá số Tử Vi"}</p>
      <dl className="ls-tb-kv">
        <div>
          <dt>Dương lịch</dt>
          <dd>
            {pad(civil.day)}/{pad(civil.month)}/{civil.year} · {pad(ns.gioTuVi.hour === 23 ? 23 : ns.gioTuVi.hour)}:{pad(ns.gioTuVi.minute)}
          </dd>
        </div>
        <div>
          <dt>Âm lịch</dt>
          <dd>
            {b.day}/{b.month}
            {b.isLeapMonth ? " nhuận" : ""}/{b.year}
          </dd>
        </div>
        <div>
          <dt>Năm · tháng</dt>
          <dd>
            {laSo.canChiNam.name} · {ccThang.name}
          </dd>
        </div>
        <div>
          <dt>Ngày · giờ</dt>
          <dd>
            {ccNgay.name} · {ccGio.name}
          </dd>
        </div>
        <div>
          <dt>Âm dương</dt>
          <dd>{laSo.amDuong}</dd>
        </div>
        <div>
          <dt>Bản mệnh</dt>
          <dd>{laSo.banMenh.name}</dd>
        </div>
        <div>
          <dt>Cục</dt>
          <dd>{laSo.cuc.ten}</dd>
        </div>
        <div>
          <dt>Mệnh chủ · Thân chủ</dt>
          <dd>
            {laSo.menhChu} · {laSo.thanChu}
          </dd>
        </div>
        <div>
          <dt>Thân cư</dt>
          <dd>{laSo.thanCu}</dd>
        </div>
      </dl>
    </div>
  );

  return (
    <div className="ls-result">
      <section className="ch-card ls-sum" aria-labelledby="ls-sum-h">
        <div className="ls-sum-head">
          <div>
            <p className="ch-eyebrow">Kết quả tính toán</p>
            <h2 className="ch-h2" id="ls-sum-h">
              {r.hoTen ? `Lá số của ${r.hoTen}` : "Lá số Tử Vi Đẩu Số"}
            </h2>
            <p className="ch-sub">
              {laSo.gioiTinh === "nam" ? "Nam" : "Nữ"} · sinh tại {r.place} · giờ an sao {pad(ns.gioTuVi.hour)}:{pad(ns.gioTuVi.minute)} UTC{formatOffset(ns.gioTuVi.offsetMinutes)} (
              giờ {["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"][b.hourChi]})
            </p>
          </div>
          <button type="button" className="ch-btn ghost ls-print" onClick={() => window.print()}>
            In lá số
          </button>
        </div>
        <div className="ch-stats ls-stats">
          <div className="ch-stat">
            <div className="v sm">{laSo.canChiNam.name}</div>
            <div className="k">Năm sinh âm lịch {b.year}</div>
          </div>
          <div className="ch-stat">
            <div className="v sm">{laSo.cung[laSo.menhChi].chiName}</div>
            <div className="k">Cung Mệnh · {laSo.cung[laSo.menhChi].chinhTinh.map((x) => x.name).join(", ") || "vô chính diệu"}</div>
          </div>
          <div className="ch-stat">
            <div className="v sm">{laSo.cuc.ten}</div>
            <div className="k">Bản mệnh {laSo.banMenh.name}</div>
          </div>
          <div className="ch-stat">
            <div className="v sm">{laSo.amDuong}</div>
            <div className="k">{laSo.thuan ? "Các vòng đi thuận" : "Các vòng đi nghịch"}</div>
          </div>
        </div>
        {ns.ghiChu.length > 0 && (
          <ul className="ls-notes" aria-label="Điều chỉnh đã áp dụng">
            {ns.ghiChu.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        )}
      </section>

      <details className="ch-card ls-tb-mob">
        <summary>Thông tin thiên bàn</summary>
        {thienBan}
      </details>

      <div className="ls-main">
        <section className="ls-board-wrap" aria-labelledby="ls-board-h">
          <div className="ls-board-bar">
            <h2 className="ch-h2" id="ls-board-h">
              Sa bàn 12 cung
            </h2>
            <label className="bf-check">
              <input type="checkbox" checked={showLuu} onChange={(e) => setShowLuu(e.target.checked)} /> Sao lưu năm {namXem}
            </label>
          </div>
          <div className="ls-desk">
            <SaBanDesktop laSo={laSo} selected={selected} onSelect={onSelect} luu={luu} hanCung={hanCung} center={thienBan} />
            <Legend />
          </div>
          <div className="ls-mob">
            <CungMap laSo={laSo} selected={selected} onSelect={onSelect} hanCung={hanCung} />
            <CungTabs laSo={laSo} selected={selected} onSelect={onSelect} />
          </div>
        </section>

        <CungDetail laSo={laSo} chi={selected} onSelect={onSelect} vanHan={vanHan} engine={engine} luu={luu} />
      </div>

      <VanHanPanel laSo={laSo} vanHan={vanHan} namXem={namXem} setNamXem={setNamXem} minYear={minYear} maxYear={maxYear} onSelect={onSelect} />

    </div>
  );
}

function Legend() {
  return (
    <p className="ls-legend">
      <span className="h-kim">Kim</span>
      <span className="h-moc">Mộc</span>
      <span className="h-thuy">Thủy</span>
      <span className="h-hoa">Hỏa</span>
      <span className="h-tho">Thổ</span>
      <span className="sep">·</span>
      <span className="lg-cat">cát tinh</span>
      <span className="lg-sat">sát tinh</span>
      <span className="lg-luu">sao lưu</span>
      <span className="sep">·</span>
      <span>số góc phải: tuổi khởi đại hạn</span>
    </p>
  );
}

function CungTabs({ laSo, selected, onSelect }: { laSo: LaSo; selected: number; onSelect: (chi: number) => void }) {
  const order = Array.from({ length: 12 }, (_, i) => (laSo.menhChi + i) % 12);
  const idx = order.indexOf(selected);
  const go = (d: number) => onSelect(order[(idx + d + 12) % 12]);
  return (
    <div className="ls-tabs">
      <button type="button" className="ls-tabs-nav" aria-label="Cung trước" onClick={() => go(-1)}>
        ‹
      </button>
      <div className="ls-tabs-list" role="group" aria-label="12 cung theo thứ tự từ Mệnh">
        {order.map((chi) => (
          <button key={chi} type="button" aria-pressed={chi === selected} onClick={() => onSelect(chi)}>
            {laSo.cung[chi].ten}
          </button>
        ))}
      </div>
      <button type="button" className="ls-tabs-nav" aria-label="Cung sau" onClick={() => go(1)}>
        ›
      </button>
    </div>
  );
}

function CungDetail({
  laSo,
  chi,
  onSelect,
  vanHan,
  engine,
  luu,
}: {
  laSo: LaSo;
  chi: number;
  onSelect: (chi: number) => void;
  vanHan: VanHanNam | null;
  engine: Engine | null;
  luu: VanHanNam["saoLuu"];
}) {
  const c = laSo.cung[chi];
  const [star, setStar] = useState<string | null>(null);
  useEffect(() => setStar(null), [chi]);
  if (!engine) return null;
  const { tamPhuongTuChinh, giaiNghiaCung, STARS, Y_NGHIA_CHINH_TINH, Y_NGHIA_PHU_TINH, Y_NGHIA_CUNG } = engine;
  const tp = tamPhuongTuChinh(chi);
  const doan = giaiNghiaCung(laSo, chi);
  const luuHere = luu.filter((s) => s.chi === chi);

  const StarList = ({ title, list, tone }: { title: string; list: SaoTrongCung[]; tone: string }) =>
    list.length ? (
      <div className="ls-sl">
        <h4>{title}</h4>
        <div className={`ls-sl-items ${tone}`}>
          {list.map((s) => (
            <button key={s.id} type="button" aria-expanded={star === s.id} onClick={() => setStar(star === s.id ? null : s.id)}>
              <SaoTen s={s} />
            </button>
          ))}
        </div>
      </div>
    ) : null;

  const starInfo = (() => {
    if (!star) return null;
    const meta = STARS[star as keyof typeof STARS];
    if (!meta) return null;
    const chinh = Y_NGHIA_CHINH_TINH[star];
    const text = chinh ? chinh.moTa : Y_NGHIA_PHU_TINH[star as keyof typeof STARS];
    const nhom = { chinh: "Chính tinh", cat: "Phụ tinh cát", sat: "Sát tinh / hung tinh", trung: "Phụ tinh trung tính", khong: "Không vong" }[meta.group];
    return (
      <div className="ls-star-info" role="region" aria-label={`Sao ${meta.name}`}>
        <p className="ls-star-h">
          {meta.name}
          <span>
            {nhom}
            {meta.hanh ? ` · hành ${meta.hanh}` : ""}
          </span>
        </p>
        {chinh && <p className="ls-star-kw">{chinh.tuKhoa.join(" · ")}</p>}
        {text && <p>{text}</p>}
        <p className="ls-star-src">
          {meta.doiChieu === "iztro" && "Vị trí đã đối chiếu tự động với thư viện độc lập iztro."}
          {meta.doiChieu === "iztro-mot-phan" && "Vị trí đối chiếu với iztro ở phần trùng quy tắc; phần Nam phái khác biệt kiểm bằng bảng tay."}
          {meta.doiChieu === "nam-phai" && "Vị trí an theo quy tắc Nam phái, kiểm bằng bảng tay (không có nguồn máy tính độc lập)."}
          {meta.ghiChu ? ` ${meta.ghiChu}` : ""}
        </p>
      </div>
    );
  })();

  return (
    <section className="ch-card ls-detail" aria-labelledby="ls-detail-h">
      <div className="ls-detail-head">
        <p className="ch-eyebrow">
          {c.canName} {c.chiName} · đại hạn {c.daiHan.tu}–{c.daiHan.den} tuổi
        </p>
        <h2 className="ch-h2" id="ls-detail-h">
          Cung {c.ten}
          {c.laThan && <span className="ls-than">Thân</span>}
        </h2>
        <p className="ch-sub">{Y_NGHIA_CUNG[c.ten]}</p>
        <div className="ls-tp" role="group" aria-label="Tam phương tứ chính">
          <span>Tam phương tứ chính:</span>
          {[tp.xungChieu, ...tp.tamHop].map((x) => (
            <button key={x} type="button" className="chip" onClick={() => onSelect(x)}>
              {laSo.cung[x].ten}
            </button>
          ))}
        </div>
      </div>

      <div className="ls-block">
        <h3 className="ls-block-h">
          <span className="ls-badge calc">Tính toán</span> Sao trong cung
        </h3>
        <StarList title="Chính tinh" list={c.chinhTinh} tone="chinh" />
        {!c.chinhTinh.length && <p className="ls-muted">Vô chính diệu — cung không có chính tinh.</p>}
        <StarList title="Cát tinh, phụ tinh" list={c.phuTinhCat} tone="cat" />
        <StarList title="Sát tinh, hung tinh" list={c.phuTinhSat} tone="sat" />
        {starInfo}
        <dl className="ls-rings">
          <div>
            <dt>Tràng Sinh</dt>
            <dd>{c.trangSinh}</dd>
          </div>
          <div>
            <dt>Bác Sĩ</dt>
            <dd>{c.bacSi}</dd>
          </div>
          <div>
            <dt>Thái Tuế</dt>
            <dd>{c.thaiTue}</dd>
          </div>
          <div>
            <dt>Tuần / Triệt</dt>
            <dd>{[c.tuan && "Tuần", c.triet && "Triệt"].filter(Boolean).join(", ") || "—"}</dd>
          </div>
        </dl>
        {vanHan && (
          <p className="ls-muted">
            Năm {vanHan.namXem}: {vanHan.daiHan?.chi === chi ? "đại hạn đang ở cung này. " : ""}
            {vanHan.tieuHan.chi === chi ? "tiểu hạn ở cung này. " : ""}
            {luuHere.length ? `Sao lưu: ${luuHere.map((s) => s.name).join(", ")}.` : "Không có sao lưu chính."}
          </p>
        )}
      </div>

      <div className="ls-block">
        <h3 className="ls-block-h">
          <span className="ls-badge trad">Tham khảo</span> Diễn giải truyền thống
        </h3>
        {doan.map((d, i) => (
          <div className="ls-doan" key={i}>
            <h4>{d.tieuDe}</h4>
            <p>{d.noiDung}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VanHanPanel({
  laSo,
  vanHan,
  namXem,
  setNamXem,
  minYear,
  maxYear,
  onSelect,
}: {
  laSo: LaSo;
  vanHan: VanHanNam | null;
  namXem: number;
  setNamXem: (n: number) => void;
  minYear: number;
  maxYear: number;
  onSelect: (chi: number) => void;
}) {
  const daiHan = [...laSo.cung].sort((a, b) => a.daiHan.tu - b.daiHan.tu);
  return (
    <section className="ch-card ls-vh" aria-labelledby="ls-vh-h">
      <div className="ls-vh-head">
        <div>
          <h2 className="ch-h2" id="ls-vh-h">
            Vận hạn
          </h2>
          <p className="ch-sub">Tuổi tính theo tuổi mụ (năm xem − năm sinh âm lịch + 1). Đại hạn 10 năm, tiểu hạn 1 năm.</p>
        </div>
        <div className="ls-year" role="group" aria-label="Năm xem">
          <button type="button" className="ch-btn" aria-label="Năm trước" disabled={namXem <= minYear} onClick={() => setNamXem(namXem - 1)}>
            ‹
          </button>
          <span className="ls-year-v">
            {namXem}
            {vanHan && <small>{vanHan.canChiNamXem.name}</small>}
          </span>
          <button type="button" className="ch-btn" aria-label="Năm sau" disabled={namXem >= maxYear} onClick={() => setNamXem(namXem + 1)}>
            ›
          </button>
        </div>
      </div>
      {vanHan ? (
        <div className="ls-vh-grid">
          <div className="ch-stat">
            <div className="v sm">{vanHan.tuoi} tuổi</div>
            <div className="k">Tuổi mụ năm {vanHan.namXem}</div>
          </div>
          <button type="button" className="ch-stat ls-vh-btn" disabled={!vanHan.daiHan} onClick={() => vanHan.daiHan && onSelect(vanHan.daiHan.chi)}>
            <div className="v sm">{vanHan.daiHan ? `${vanHan.daiHan.ten} (${vanHan.daiHan.chiName})` : "Chưa vào đại hạn"}</div>
            <div className="k">{vanHan.daiHan ? `Đại hạn ${vanHan.daiHan.daiHan.tu}–${vanHan.daiHan.daiHan.den} tuổi` : `Đại hạn đầu tiên từ ${laSo.cuc.so} tuổi`}</div>
          </button>
          <button type="button" className="ch-stat ls-vh-btn" onClick={() => onSelect(vanHan.tieuHan.chi)}>
            <div className="v sm">
              {vanHan.tieuHan.ten} ({vanHan.tieuHan.chiName})
            </div>
            <div className="k">Tiểu hạn năm {vanHan.namXem}</div>
          </button>
          <button type="button" className="ch-stat ls-vh-btn" onClick={() => onSelect(vanHan.luuThaiTue.chi)}>
            <div className="v sm">
              {vanHan.luuThaiTue.ten} ({vanHan.luuThaiTue.chiName})
            </div>
            <div className="k">Lưu Thái Tuế</div>
          </button>
          <div className="ls-vh-list">
            <h3>Tứ Hóa năm {vanHan.canChiNamXem.can}</h3>
            <ul>
              {vanHan.tuHoaLuu.map((t) => (
                <li key={t.hoa}>
                  <b>Hóa {t.hoa}</b> — {t.name} (cung {laSo.cung[t.chi].ten})
                </li>
              ))}
            </ul>
          </div>
          <div className="ls-vh-list">
            <h3>Sao lưu niên</h3>
            <ul>
              {vanHan.saoLuu.map((s) => (
                <li key={s.id} className={`t-${s.tone}`}>
                  {s.name.replace("L. ", "Lưu ")} — cung {laSo.cung[s.chi].ten}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="dierr">Năm xem cần từ năm sinh tới 120 tuổi.</p>
      )}
      <h3 className="ls-dh-h">12 đại hạn</h3>
      <ol className="ls-dh-list">
        {daiHan.map((c) => {
          const on = vanHan?.daiHan?.chi === c.chi;
          return (
            <li key={c.chi}>
              <button type="button" className={on ? "on" : undefined} aria-current={on ? "step" : undefined} onClick={() => onSelect(c.chi)}>
                <span className="a">
                  {c.daiHan.tu}–{c.daiHan.den}
                </span>
                <span className="n">{c.ten}</span>
                <span className="s">{c.chinhTinh.map((x) => x.name).join(", ") || "VCD"}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
