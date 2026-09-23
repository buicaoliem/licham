"use client";

import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";
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

/** Bài nổi bật: thêm phần sắm lễ và số phần bài khấn lấy từ dữ liệu bài. */
export interface VanKhanFeaturedData extends VanKhanCardData {
  samLe: readonly string[];
  soPhan: number;
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

/** "Hương: ba nén hoặc năm nén" → "Hương" (tên lễ vật, bỏ phần định lượng). */
function tenLeVat(s: string): string {
  return s.split(":")[0].trim();
}

function Featured({ bai }: { bai: VanKhanFeaturedData }) {
  const thumb = hasThumb(bai);
  const href = `/van-khan/${bai.slug}/`;
  return (
    <article className={thumb ? "vk-feature" : "vk-feature no-thumb"}>
      {thumb && (
        <div className="vk-feature-media">
          <Thumb item={bai} className="vk-feature-img" />
        </div>
      )}
      <div className="vk-feature-body">
        <span className="vk-badge">
          <Icon name="flame" size={14} />
          Bài nổi bật
        </span>
        <p className="vk-feature-t">
          <Link href={href}>{bai.ten}</Link>
        </p>
        <p className="vk-feature-d">{bai.moTa}</p>
        <div className="vk-feature-f">
          <span className="vk-feature-meta">
            <span>
              <Icon name={NHOM_ICON[bai.nhom]} size={16} />
              {bai.nhom}
            </span>
            <span>
              <Icon name="bowl" size={16} />
              {bai.samLe.length} lễ vật
            </span>
            <span>
              <Icon name="scroll" size={16} />
              {bai.soPhan > 1 ? `${bai.soPhan} bài khấn` : "1 bài khấn"}
            </span>
          </span>
          <Link className="ch-btn outline" href={href}>
            Xem chi tiết
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
      {!thumb && (
        <div className="vk-feature-aside" aria-label="Sắm lễ">
          <span className="vk-feature-aside-h">Sắm lễ</span>
          <ul>
            {bai.samLe.slice(0, 5).map((s) => (
              <li key={s}>{tenLeVat(s)}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

/**
 * Danh mục văn khấn có lọc theo nhóm và tìm kiếm.
 * Hàng tab nằm trên cùng, trải hết bề ngang; bên dưới là cột nội dung và `aside` (sidebar do server dựng).
 */
export function VanKhanSearch({
  nhomList,
  featured,
  aside,
  after,
}: {
  nhomList: Nhom[];
  featured?: VanKhanFeaturedData;
  aside?: ReactNode;
  /** Nội dung đặt cuối cột chính (ví dụ lời nhắc tham khảo). */
  after?: ReactNode;
}) {
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

  const shown = filtered.reduce((n, nhom) => n + nhom.items.length, 0);
  const showFeatured = featured && !query && nhomChon === null;

  return (
    <>
      <div className="vk-tabs" role="group" aria-label="Lọc theo nhóm">
        <button type="button" className="vk-tab" aria-pressed={nhomChon === null} onClick={() => setNhomChon(null)}>
          <Icon name="list" size={18} />
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
            <Icon name={NHOM_ICON[nhom.ten]} size={18} />
            {nhom.ten}
            <span className="n">{nhom.items.length}</span>
          </button>
        ))}
      </div>

      <div className="ch-layout vk-index">
        <div className="vk-index-main">
          <div className="vk-search">
            <Icon name="search" size={19} />
            <input
              type="search"
              placeholder="Tìm bài văn khấn, ví dụ: thần tài, gia tiên, động thổ…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Tìm bài văn khấn"
            />
            <span className="vk-search-n" aria-live="polite">
              {shown} bài
            </span>
          </div>

          {showFeatured && <Featured bai={featured} />}

          <div className="vk-list-h">
            <h2>Danh sách văn khấn</h2>
          </div>

          {filtered.length === 0 ? (
            <p className="vk-empty">Không tìm thấy bài văn khấn phù hợp.</p>
          ) : (
            filtered.map((nhom) => (
              <section className="vk-group" key={nhom.ten} id={nhomAnchor(nhom.ten)} aria-labelledby={`${nhomAnchor(nhom.ten)}-h`}>
                <div className="vk-group-h">
                  <Icon name={NHOM_ICON[nhom.ten]} size={17} />
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
                          <span className="go">
                            Xem bài
                            <Icon name="arrow" size={14} />
                          </span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
          {after}
        </div>
        {aside}
      </div>
    </>
  );
}
