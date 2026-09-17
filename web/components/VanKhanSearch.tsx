"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { VanKhanBai, VanKhanNhom } from "@/lib/van-khan";

interface Nhom {
  ten: VanKhanNhom;
  items: VanKhanBai[];
}

function khongDau(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase();
}

export function VanKhanSearch({ nhomList }: { nhomList: Nhom[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = khongDau(q.trim());
    if (!query) return nhomList;
    return nhomList
      .map((nhom) => ({
        ten: nhom.ten,
        items: nhom.items.filter((v) => khongDau(v.ten).includes(query) || khongDau(v.moTa).includes(query)),
      }))
      .filter((nhom) => nhom.items.length > 0);
  }, [q, nhomList]);

  return (
    <>
      <div className="khansearch">
        <input
          type="search"
          className="khansearch-inp"
          placeholder="Tìm bài văn khấn…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Tìm bài văn khấn"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="khansearch-empty">Không tìm thấy bài văn khấn phù hợp.</p>
      ) : (
        <div className="khangrid">
          {filtered.map((nhom) => (
            <div className="box khangroup" key={nhom.ten}>
              <h2>{nhom.ten}</h2>
              <div className="khanlist">
                {nhom.items.map((v) => (
                  <Link className="khanitem" href={`/van-khan/${v.slug}`} key={v.slug}>
                    <div className="n">{v.ten}</div>
                    <div className="s">{v.moTa}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
