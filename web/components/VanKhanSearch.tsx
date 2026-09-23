"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/heritage/Icon";
import { NHOM_ICON, khongDau, nhomAnchor } from "@/components/heritage/vanKhanUi";
import { PLACEHOLDER_MODE } from "@/lib/heritage-assets";
import type { VanKhanNhom } from "@/lib/van-khan";

/** Một bài trong danh mục; `thumb` đã được giải ở server (null = chưa có ảnh). */
export interface VanKhanCardData {
  slug: string;
  ten: string;
  moTa: string;
  nhom: VanKhanNhom;
  thumb: string | null;
  /** Đường dẫn asset mong đợi, chỉ để ghi trong khung đánh dấu khi thiếu ảnh. */
  thumbPath: string;
}

interface Nhom {
  ten: VanKhanNhom;
  items: VanKhanCardData[];
}

function Thumb({ item, className }: { item: VanKhanCardData; className: string }) {
  if (item.thumb) {
    return (
      <span className={className}>
        <img src={item.thumb} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }
  if (!PLACEHOLDER_MODE) return null;
  return (
    <span className={className}>
      <span className="ch-asset-missing">
        <span>
          Thiếu ảnh
          <br />
          <code>{item.thumbPath.replace("/heritage/", "")}</code>
        </span>
      </span>
    </span>
  );
}

function hasThumb(item: VanKhanCardData): boolean {
  return item.thumb !== null || PLACEHOLDER_MODE;
}

export function VanKhanSearch({ nhomList, featured }: { nhomList: Nhom[]; featured?: VanKhanCardData }) {
  const [q, setQ] = useState("");
  // null = tất cả nhóm; mặc định hiển thị đủ mọi bài (HTML tĩnh chứa toàn bộ danh sách).
  const [nhomChon, setNhomChon] = useState<VanKhanNhom | null>(null);
  const total = nhomList.reduce((n, nhom) => n + nhom.items.length, 0);
  const query = khongDau(q.trim());

  const filtered = useMemo(() => {
    const theoNhom = nhomChon ? nhomList.filter((nhom) => nhom.ten === nhomChon) : nhomList;
    if (!query) return theoNhom;
    return theoNhom
      .map((nhom) => ({
        ten: nhom.ten,
        items: nhom.items.filter((v) => khongDau(v.ten).includes(query) || khongDau(v.moTa).includes(query)),
      }))
      .filter((nhom) => nhom.items.length > 0);
  }, [query, nhomChon, nhomList]);

  const showFeatured = featured && !query && nhomChon === null;

  return (
    <>
      <div className="vk-tabs" role="group" aria-label="Lọc theo nhóm">
        <button type="button" className="vk-tab" aria-pressed={nhomChon === null} onClick={() => setNhomChon(null)}>
          <Icon name="list" size={17} />
          Tất cả<span className="n">{total}</span>
        </button>
        {nhomList.map((nhom) => (
          <button
            type="button"
            className="vk-tab"
            key={nhom.ten}
            aria-pressed={nhomChon === nhom.ten}
            onClick={() => setNhomChon(nhom.ten)}
          >
            <Icon name={NHOM_ICON[nhom.ten]} size={17} />
            {nhom.ten}
            <span className="n">{nhom.items.length}</span>
          </button>
        ))}
      </div>
      <div className="vk-search">
        <Icon name="search" size={19} />
        <input
          type="search"
          placeholder="Tìm bài văn khấn, ví dụ: thần tài, gia tiên, động thổ…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Tìm bài văn khấn"
        />
      </div>

      {showFeatured && (
        <article className={hasThumb(featured) ? "vk-feature" : "vk-feature no-thumb"}>
          {hasThumb(featured) && (
            <div className="vk-feature-media">
              <Thumb item={featured} className="vk-feature-img" />
              <span className="vk-badge">
                <Icon name="flame" size={14} />
                Bài nổi bật
              </span>
            </div>
          )}
          <div className="vk-feature-body">
            {!hasThumb(featured) && (
              <span className="vk-badge">
                <Icon name="flame" size={14} />
                Bài nổi bật
              </span>
            )}
            <Link className="vk-feature-t" href={`/van-khan/${featured.slug}/`}>
              {featured.ten}
            </Link>
            <p className="vk-feature-d">{featured.moTa}</p>
            <div className="vk-feature-f">
              <span className="vk-meta-tag">
                <Icon name={NHOM_ICON[featured.nhom]} size={15} />
                {featured.nhom}
              </span>
              <Link className="ch-btn outline" href={`/van-khan/${featured.slug}/`}>
                Xem chi tiết
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </article>
      )}

      <div className="vk-list-h">
        <h2>Danh sách văn khấn</h2>
      </div>

      {filtered.length === 0 ? (
        <p className="vk-empty">Không tìm thấy bài văn khấn phù hợp.</p>
      ) : (
        filtered.map((nhom) => (
          <section className="vk-group" key={nhom.ten} id={nhomAnchor(nhom.ten)} aria-labelledby={`${nhomAnchor(nhom.ten)}-h`}>
            <div className="vk-group-h">
              <h3 id={`${nhomAnchor(nhom.ten)}-h`}>{nhom.ten}</h3>
              <span>{nhom.items.length} bài</span>
            </div>
            <div className="vk-cards">
              {nhom.items.map((v) => (
                <Link className={hasThumb(v) ? "vk-card" : "vk-card no-thumb"} href={`/van-khan/${v.slug}/`} key={v.slug}>
                  <Thumb item={v} className="vk-card-media" />
                  <span className="vk-card-b">
                    <span className="vk-card-t">{v.ten}</span>
                    <span className="vk-card-d">{v.moTa}</span>
                    <span className="vk-card-f">
                      <span className="vk-meta-tag">
                        <Icon name={NHOM_ICON[v.nhom]} size={14} />
                        {v.nhom}
                      </span>
                      <span className="go">Xem bài</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
