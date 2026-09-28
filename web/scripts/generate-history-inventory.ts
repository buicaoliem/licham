import { ANH_HUNG } from "../lib/anh-hung";
import fs from "node:fs";

const rows = ANH_HUNG.map((a) => {
  return {
    slug: a.slug,
    ten: a.ten,
    tenKhac: a.tenKhac,
    thoiKy: a.thoiKy,
    namSinh: a.namSinh,
    namMat: a.namMat,
    ngayChacChan: a.ghiChuSuLieu ? "co-luu-y" : "khong-luu-y",
    soSuKien: a.suKien?.length ?? 0,
    soDiTich: a.diTich?.length ?? 0,
    soTuongNiem: a.tuongNiem?.length ?? 0,
    coLeSlug: Boolean(a.leSlug),
    leSlug: a.leSlug ?? null,
    coRelatedPeople: Boolean(a.relatedPeople?.length),
    coRelatedEvents: Boolean(a.relatedEvents?.length),
    coNguonRieng: Boolean(a.nguon?.length),
    soNguon: a.nguon?.length ?? 0,
    tieuBieu2013: Boolean(a.tieuBieu2013),
  };
});

fs.writeFileSync("../docs/seo/history-inventory.json", JSON.stringify(rows, null, 2), "utf8");

const noLe = rows.filter((r) => !r.coLeSlug).length;
const noSuKien = rows.filter((r) => r.soSuKien === 0).length;
const noNguon = rows.filter((r) => !r.coNguonRieng).length;
const withLe = rows.length - noLe;

console.log("Total:", rows.length);
console.log("Có leSlug (ngày giỗ/tưởng niệm):", withLe);
console.log("Không có leSlug:", noLe);
console.log("Không có suKien nào:", noSuKien);
console.log("Không có nguồn riêng (nguon field, chỉ có wikiTitle):", noNguon);
