"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Icon } from "@/components/heritage/Icon";

// Tìm kiếm / lọc trên danh sách dựng sẵn ở server: HTML ban đầu có đủ mọi thẻ (liên kết luôn có trong
// trang), bộ lọc chỉ ẩn/hiện phía client.

export interface AhBrowserItem {
  slug: string;
  /** Chuỗi tìm kiếm: tên, tên thật, tên khác, quê quán. */
  search: string;
  thoiKy: string;
  trieuDai: string;
}

/** Bỏ dấu tiếng Việt để "tran hung dao" khớp "Trần Hưng Đạo". */
function fold(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();
}

interface Props {
  items: AhBrowserItem[];
  thoiKy: { key: string; label: string }[];
  trieuDai: string[];
  cards: Record<string, ReactNode>;
}

export function AnhHungBrowser({ items, thoiKy, trieuDai, cards }: Props) {
  const [q, setQ] = useState("");
  const [tk, setTk] = useState("");
  const [td, setTd] = useState("");

  const shown = useMemo(() => {
    const fq = fold(q);
    return items.filter((it) => (!tk || it.thoiKy === tk) && (!td || it.trieuDai === td) && (!fq || fold(it.search).includes(fq)));
  }, [items, q, tk, td]);

  const dangLoc = Boolean(q || tk || td);

  return (
    <section className="ah-browser" aria-labelledby="ah-list-h">
      <div className="ah-tools">
        <h2 className="ch-h2" id="ah-list-h">
          Danh sách nhân vật
        </h2>
        <div className="ah-filters">
          <label className="ah-search">
            <Icon name="search" size={18} />
            <span className="ah-sr">Tìm theo tên</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên, tên thật, quê quán…" autoComplete="off" />
          </label>
          <label className="ah-select">
            <span className="ah-sr">Lọc theo triều đại</span>
            <select value={td} onChange={(e) => setTd(e.target.value)}>
              <option value="">Mọi triều đại</option>
              {trieuDai.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="chips ah-eras" role="group" aria-label="Lọc theo thời kỳ">
          <button type="button" className={tk === "" ? "chip on" : "chip"} aria-pressed={tk === ""} onClick={() => setTk("")}>
            Tất cả thời kỳ
          </button>
          {thoiKy.map((t) => (
            <button
              type="button"
              key={t.key}
              className={tk === t.key ? "chip on" : "chip"}
              aria-pressed={tk === t.key}
              onClick={() => setTk(tk === t.key ? "" : t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="ah-count" aria-live="polite">
          {dangLoc ? `${shown.length} / ${items.length} nhân vật` : `${items.length} nhân vật, xếp theo dòng thời gian`}
          {dangLoc && (
            <button
              type="button"
              className="ah-reset"
              onClick={() => {
                setQ("");
                setTk("");
                setTd("");
              }}
            >
              Bỏ lọc
            </button>
          )}
        </p>
      </div>
      {shown.length > 0 ? (
        <ul className="ah-grid">
          {items.map((it) => (
            <li key={it.slug} hidden={!shown.includes(it)}>
              {cards[it.slug]}
            </li>
          ))}
        </ul>
      ) : (
        <p className="ah-empty">Không tìm thấy nhân vật phù hợp. Thử bỏ dấu hoặc chọn thời kỳ khác.</p>
      )}
    </section>
  );
}
