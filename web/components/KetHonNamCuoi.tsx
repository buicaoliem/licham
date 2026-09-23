"use client";

import { canChiNamDuong } from "@licham/core";
import { Icon } from "@/components/heritage/Icon";
import { setNamXem, useNamXem } from "@/components/ketHonNamXem";
import { type NamCuoiRow, bangNamCuoiToi, lyDoBoQuaNamCuoi, tuoiMu } from "@/lib/xem-tuoi-ket-hon";

interface Props {
  namNam: number;
  namNu: number;
  /** Bảng mặc định dựng sẵn ở server (tính từ namBatDauMacDinh lúc build) — tránh lệch khi hydrate. */
  initialRows: NamCuoiRow[];
  /** Năm bắt đầu mặc định của bảng (= initialRows[0].nam). */
  namMacDinh: number;
}

/** Năm xem hợp lệ: cô dâu và chú rể đều đã sinh (tuổi mụ từ 1 trở lên). */
function namXemHopLe(nam: number | null, namNam: number, namNu: number): nam is number {
  return nam !== null && nam >= Math.max(namNam, namNu) && nam <= 2199;
}

/** Khối năm cưới: chọn năm bắt đầu xem, năm gần nhất nên chọn và bảng 5 năm theo Kim Lâu của cô dâu. */
export function KetHonNamCuoi({ namNam, namNu, initialRows, namMacDinh }: Props) {
  const hashNam = useNamXem();
  const namXem = namXemHopLe(hashNam, namNam, namNu) ? hashNam : null;
  const rows = namXem === null ? initialRows : bangNamCuoiToi(namNu, namXem, 5);
  const chon = rows.find((r) => r.nenHayTranh === "nên") ?? null;
  const lyDo = lyDoBoQuaNamCuoi(rows, chon);
  const batDau = rows[0]!.nam;

  const options: number[] = [];
  for (let y = namMacDinh - 1; y <= namMacDinh + 10; y++) if (y >= Math.max(namNam, namNu)) options.push(y);
  if (!options.includes(batDau)) options.push(batDau);
  options.sort((a, b) => a - b);

  return (
    <section className="ch-card kh-nc" id="nam-cuoi" aria-labelledby="kh-nc-h">
      <div className="kh-nc-head">
        <div>
          <h2 className="kh-sec-h" id="kh-nc-h">
            Năm cưới theo tuổi cô dâu
          </h2>
          <p className="kh-sec-sub">Kim Lâu tính trên tuổi mụ của cô dâu (sinh {namNu}), 5 năm liền nhau.</p>
        </div>
        <div className="ch-field kh-nc-pick">
          <label htmlFor="kh-nam-xem">Xem từ năm</label>
          <select id="kh-nam-xem" value={batDau} onChange={(e) => setNamXem(Number(e.target.value) === namMacDinh ? null : Number(e.target.value))}>
            {options.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {chon ? (
        <div className="kh-nc-best">
          <span className="kh-nc-year">
            <b>{chon.nam}</b>
            <span>{canChiNamDuong(chon.nam).name}</span>
          </span>
          <div>
            <div className="k">Năm gần nhất nên chọn</div>
            <p>
              Cô dâu {chon.tuoiMuCoDau} tuổi mụ ({chon.tuoiMuCoDau - 1} tuổi dương sau sinh nhật), không phạm Kim Lâu. Chú rể{" "}
              {tuoiMu(chon.nam, namNam)} tuổi mụ.
            </p>
            {lyDo && <p className="why">Bỏ qua: {lyDo}.</p>}
          </div>
        </div>
      ) : (
        <div className="kh-nc-best none">
          <Icon name="note" size={22} />
          <p>
            Cả 5 năm từ {batDau} đến {batDau + 4} đều phạm Kim Lâu với tuổi cô dâu — chọn năm xem khác hoặc xem bảng bên dưới để cân nhắc thêm.
          </p>
        </div>
      )}

      <table className="tuoitable kh-nc-table">
        <thead>
          <tr>
            <th>Năm</th>
            <th>Tuổi mụ cô dâu</th>
            <th>Kim Lâu</th>
            <th>Kết luận</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.nam} className={chon && r.nam === chon.nam ? "on" : undefined}>
              <td data-k="Năm">
                <b>{r.nam}</b>
                <small>{canChiNamDuong(r.nam).name}</small>
              </td>
              <td data-k="Tuổi mụ cô dâu">
                {r.tuoiMuCoDau}
                <small className="dg">dương {r.tuoiMuCoDau - 1}</small>
              </td>
              <td data-k="Kim Lâu">
                {r.kimLau.phamKimLau ? <span className="pill r">{r.kimLau.loai}</span> : <span className="pill g">Không phạm</span>}
              </td>
              <td data-k="Kết luận">
                {r.nenHayTranh === "nên" ? <span className="pill g">Nên</span> : <span className="pill r">Nên cân nhắc</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="kh-note">
        Tuổi mụ = năm xem − năm sinh + 1; tuổi dương = tuổi mụ − 1, tính sau sinh nhật trong năm đó. Kim Lâu chỉ xét tuổi mụ cô dâu, theo tục &ldquo;lấy vợ
        xem tuổi đàn bà&rdquo;. Chỉ mang tính tham khảo dân gian.
      </p>
    </section>
  );
}
