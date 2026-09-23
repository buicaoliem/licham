"use client";

import Link from "next/link";
import { Fragment, type ReactNode, useEffect, useMemo, useState } from "react";
import { LeArtView, LeCard } from "@/components/heritage/LeParts";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { dayHref } from "@/lib/calendar/urls";
import type { LeItem, LeLichKind, TietKhiItem } from "@/lib/le-hub";

// Lọc / tìm kiếm trên dữ liệu dựng sẵn ở server (60 lễ + 24 tiết khí năm nay). HTML ban đầu có đủ
// 60 thẻ (tab "Tất cả") để liên kết luôn có trong trang; bộ lọc chỉ ẩn/hiện phía client.

export type LeTab = "all" | "am-lich" | "nghi-le" | "anh-hung" | "ky-niem" | "quoc-te" | "tiet-khi";
type SortKey = "sap-toi" | "thang" | "ten";

const TABS: { key: LeTab; label: string; icon: IconName }[] = [
  { key: "all", label: "Tất cả", icon: "list" },
  { key: "am-lich", label: "Lễ âm lịch", icon: "yinyang" },
  { key: "nghi-le", label: "Nghỉ lễ", icon: "calendar" },
  { key: "anh-hung", label: "Anh hùng dân tộc", icon: "temple" },
  { key: "ky-niem", label: "Kỷ niệm", icon: "flame" },
  { key: "quoc-te", label: "Quốc tế", icon: "heart" },
  { key: "tiet-khi", label: "Tiết khí", icon: "sun" },
];

/** Bỏ dấu tiếng Việt để tìm "trung thu" khớp "Trung Thu", "tet" khớp "Tết". */
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

interface Props {
  items: LeItem[];
  tietKhi: TietKhiItem[];
  tietKhiYear: number;
  featured: LeItem | null;
  /** Đoạn "Ý nghĩa" đầu tiên của lễ nổi bật (dữ liệu trang lễ). */
  featuredNote?: string;
  /** Khối "sắp diễn ra" (dựng ở server) đặt cạnh thẻ nổi bật khi chưa lọc. */
  aside?: ReactNode;
}

export function LeHubBrowser({ items, tietKhi, tietKhiYear, featured, featuredNote, aside }: Props) {
  const [tab, setTab] = useState<LeTab>("all");
  const [q, setQ] = useState("");
  const [thang, setThang] = useState(0);
  const [lich, setLich] = useState<LeLichKind | "">("");
  const [sort, setSort] = useState<SortKey>("sap-toi");

  // /le/?nhom=anh-hung (liên kết từ breadcrumb trang anh hùng) mở sẵn đúng nhóm.
  useEffect(() => {
    const nhom = new URLSearchParams(window.location.search).get("nhom");
    if (nhom && TABS.some((t) => t.key === nhom)) setTab(nhom as LeTab);
  }, []);

  function chonTab(t: LeTab) {
    setTab(t);
    const url = new URL(window.location.href);
    if (t === "all") url.searchParams.delete("nhom");
    else url.searchParams.set("nhom", t);
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }

  const qf = fold(q.trim());
  const locMacDinh = tab === "all" && !qf && !thang && !lich && sort === "sap-toi";

  const ketQua = useMemo(() => {
    let list = items.filter((it) => {
      if (tab === "tiet-khi") {
        if (it.lich !== "tiet-khi") return false;
      } else if (tab !== "all" && it.nhom !== tab) return false;
      if (thang && it.month !== thang) return false;
      if (lich && it.lich !== lich) return false;
      if (qf && !fold(`${it.ten} ${it.tieuDe} ${it.moTa} ${it.rule}`).includes(qf)) return false;
      return true;
    });
    if (sort === "sap-toi") list = [...list].sort((a, b) => a.jd - b.jd || a.slug.localeCompare(b.slug));
    else if (sort === "thang") list = [...list].sort((a, b) => a.month - b.month || a.day - b.day || a.slug.localeCompare(b.slug));
    else list = [...list].sort((a, b) => a.ten.localeCompare(b.ten, "vi"));
    return list;
  }, [items, tab, thang, lich, qf, sort]);

  const hienNoiBat = locMacDinh && featured;
  const luoi = hienNoiBat ? ketQua.filter((it) => it.slug !== featured.slug) : ketQua;

  const tietKhiLoc = tietKhi.filter((t) => (!thang || t.month === thang) && (!qf || fold(t.name).includes(qf)));
  const hienTietKhi = tab === "tiet-khi" || (tab === "all" && !!qf && tietKhiLoc.length > 0 && !lich);
  const tietKhiKe = tietKhi.find((t) => t.daysLeft >= 0);

  const counts = useMemo(() => {
    const c: Record<LeTab, number> = { all: items.length, "am-lich": 0, "nghi-le": 0, "anh-hung": 0, "ky-niem": 0, "quoc-te": 0, "tiet-khi": tietKhi.length };
    for (const it of items) c[it.nhom as LeTab] += 1;
    return c;
  }, [items, tietKhi.length]);

  function datLai() {
    chonTab("all");
    setQ("");
    setThang(0);
    setLich("");
    setSort("sap-toi");
  }

  return (
    <div className="le-browser">
      <nav className="le-tabs" aria-label="Nhóm ngày lễ">
        {TABS.map((t) => (
          <button key={t.key} type="button" aria-pressed={tab === t.key} onClick={() => chonTab(t.key)}>
            <Icon name={t.icon} size={17} />
            {t.label}
            <span className="n">{counts[t.key]}</span>
          </button>
        ))}
      </nav>

      <div className="le-filters" role="search">
        <label className="le-search">
          <Icon name="search" size={18} />
          <span className="le-sr">Tìm ngày lễ</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm ngày lễ, tiết khí, ngày giỗ…" />
        </label>
        <label className="le-sel">
          <span className="le-sr">Tháng</span>
          <select value={thang} onChange={(e) => setThang(Number(e.target.value))}>
            <option value={0}>Tháng (tất cả)</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label className="le-sel">
          <span className="le-sr">Loại lịch</span>
          <select value={lich} onChange={(e) => setLich(e.target.value as LeLichKind | "")}>
            <option value="">Lịch (tất cả)</option>
            <option value="am">Âm lịch</option>
            <option value="duong">Dương lịch</option>
            <option value="tiet-khi">Tiết khí</option>
          </select>
        </label>
        <label className="le-sel">
          <span className="le-sr">Sắp xếp</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="sap-toi">Sắp diễn ra</option>
            <option value="thang">Theo tháng</option>
            <option value="ten">Tên A–Z</option>
          </select>
        </label>
      </div>

      <p className="le-count" aria-live="polite">
        {tab === "tiet-khi"
          ? `${tietKhiLoc.length} tiết khí năm ${tietKhiYear}${ketQua.length ? ` · ${ketQua.length} ngày lễ theo tiết khí` : ""}`
          : `${ketQua.length} ngày lễ${thang ? ` trong tháng ${thang}` : ""}`}
        {!locMacDinh && (
          <button type="button" onClick={datLai}>
            Đặt lại bộ lọc
          </button>
        )}
      </p>

      {locMacDinh && (featured || aside) && (
        <div className={featured ? "le-top" : "le-top only-aside"}>
          {featured && (
            <Link className={`le-feature n-${featured.nhom}`} href={`/le/${featured.slug}/`}>
              <span className="le-feature-art">
                <LeArtView art={featured.art} item={featured} />
                <span className="badge">
                  <Icon name="flame" size={14} />
                  Sắp diễn ra
                </span>
              </span>
              <span className="le-feature-b">
                <span className="le-tag">{featured.nhomLabel}</span>
                <b className="le-feature-t">{featured.tieuDe}</b>
                <span className="le-feature-d">{featured.moTa}</span>
                <span className="le-feature-when">
                <span>
                  <small>Dương lịch</small>
                  <b>
                    {String(featured.day).padStart(2, "0")}/{String(featured.month).padStart(2, "0")}/{featured.year}
                  </b>
                  <small>{featured.weekday}</small>
                </span>
                <span>
                  <small>Âm lịch</small>
                  <b>{featured.lunarLabel}</b>
                  <small>{featured.rule}</small>
                </span>
                <span className="dem">
                  <small>Còn lại</small>
                  <b>{featured.daysLeft === 0 ? "Hôm nay" : `${featured.daysLeft} ngày`}</b>
                  <small>tính từ hôm nay</small>
                </span>
              </span>
              {featuredNote && <span className="le-feature-note">{featuredNote}</span>}
              <span className="le-feature-go">
                  Xem chi tiết
                  <Icon name="arrow" size={16} />
                </span>
              </span>
            </Link>
          )}
          <Fragment key="aside">{aside}</Fragment>
        </div>
      )}

      {hienTietKhi && (
        <section className="le-tk" aria-labelledby="le-tk-h">
          <div className="le-tk-head">
            <h2 id="le-tk-h">24 tiết khí năm {tietKhiYear}</h2>
            <Link href="/kien-thuc/tiet-khi/">
              Tiết khí là gì
              <Icon name="arrow" size={14} />
            </Link>
          </div>
          <p className="le-tk-sub">Ngày bắt đầu mỗi tiết theo giờ Việt Nam, tính từ kinh độ Mặt Trời. Bấm để xem lịch ngày đó.</p>
          {tietKhiLoc.length > 0 ? (
            <ol className="le-tk-grid">
              {tietKhiLoc.map((t) => (
                <li key={t.name} className={t.daysLeft < 0 ? "qua" : tietKhiKe && t.name === tietKhiKe.name ? "ke" : undefined}>
                  <Link href={dayHref(t)}>
                    <b>{t.name}</b>
                    <span>
                      {String(t.day).padStart(2, "0")}/{String(t.month).padStart(2, "0")}
                    </span>
                    <small>{t.longitude}°</small>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="le-empty-s">Không có tiết khí khớp bộ lọc.</p>
          )}
        </section>
      )}

      {luoi.length > 0 ? (
        <div className="le-grid">
          {luoi.map((it) => (
            <LeCard key={it.slug} item={it} />
          ))}
        </div>
      ) : (
        !hienTietKhi && (
          <div className="le-empty">
            <Icon name="search" size={26} />
            <p>Không có ngày lễ phù hợp với bộ lọc.</p>
            <button type="button" className="ch-btn" onClick={datLai}>
              Đặt lại bộ lọc
            </button>
          </div>
        )
      )}
    </div>
  );
}
