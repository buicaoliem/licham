"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/heritage/Icon";
import type { VanKhanBai, VanKhanNhom } from "@/lib/van-khan";

interface Nhom {
  ten: VanKhanNhom;
  items: VanKhanBai[];
}

function khongDau(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();
}

export function VanKhanSearch({ nhomList }: { nhomList: Nhom[] }) {
  const [q, setQ] = useState("");
  // null = tất cả nhóm; mặc định hiển thị đủ mọi bài (HTML tĩnh chứa toàn bộ danh sách).
  const [nhomChon, setNhomChon] = useState<VanKhanNhom | null>(null);
  const total = nhomList.reduce((n, nhom) => n + nhom.items.length, 0);

  const filtered = useMemo(() => {
    const query = khongDau(q.trim());
    const theoNhom = nhomChon ? nhomList.filter((nhom) => nhom.ten === nhomChon) : nhomList;
    if (!query) return theoNhom;
    return theoNhom
      .map((nhom) => ({
        ten: nhom.ten,
        items: nhom.items.filter((v) => khongDau(v.ten).includes(query) || khongDau(v.moTa).includes(query)),
      }))
      .filter((nhom) => nhom.items.length > 0);
  }, [q, nhomChon, nhomList]);

  return (
    <>
      <div className="vk-toolbar">
        <div className="ch-tabs" role="group" aria-label="Lọc theo nhóm">
          <button type="button" className="ch-tab" aria-pressed={nhomChon === null} onClick={() => setNhomChon(null)}>
            Tất cả<span className="n">{total}</span>
          </button>
          {nhomList.map((nhom) => (
            <button
              type="button"
              className="ch-tab"
              key={nhom.ten}
              aria-pressed={nhomChon === nhom.ten}
              onClick={() => setNhomChon(nhom.ten)}
            >
              {nhom.ten}
              <span className="n">{nhom.items.length}</span>
            </button>
          ))}
        </div>
        <div className="ch-search">
          <Icon name="search" size={18} />
          <input
            type="search"
            className="ch-input"
            placeholder="Tìm bài văn khấn…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Tìm bài văn khấn"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="vk-empty">Không tìm thấy bài văn khấn phù hợp.</p>
      ) : (
        filtered.map((nhom) => (
          <section className="vk-group" key={nhom.ten} aria-labelledby={`vk-nhom-${khongDau(nhom.ten).replace(/\s+/g, "-")}`}>
            <div className="vk-group-h">
              <h2 className="ch-h3" id={`vk-nhom-${khongDau(nhom.ten).replace(/\s+/g, "-")}`}>
                {nhom.ten}
              </h2>
              <span>{nhom.items.length} bài</span>
            </div>
            <div className="ch-grid c2">
              {nhom.items.map((v) => (
                <Link className="vk-item" href={`/van-khan/${v.slug}/`} key={v.slug}>
                  <span className="n">{v.ten}</span>
                  <span className="s">{v.moTa}</span>
                  <span className="go" aria-hidden="true">
                    <Icon name="arrow" size={17} />
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
