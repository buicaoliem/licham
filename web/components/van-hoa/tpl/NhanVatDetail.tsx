import Link from "next/link";
import { Icon } from "@/components/heritage/Icon";
import { canChiOfYear } from "@licham/core";
import { festivalTable } from "@/lib/van-hoa/logic";
import { NHAN_VAT } from "@/lib/van-hoa/data/nhan-vat";
import type { NhanVat } from "@/lib/van-hoa/types";
import { getVietnamToday } from "@/lib/today";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import { Card, Hero, Page, Related, SectionTitle, Sources } from "./Shared";

export function NhanVatDetail({ nv }: { nv: NhanVat }) {
  const today = getVietnamToday();
  const fests = nv.festivals ?? [];
  const rows = fests.length ? festivalTable(fests, today.year) : [];
  const others = (nv.relatedNhanVat ?? []).map((sl) => NHAN_VAT.find((n) => n.slug === sl)).filter((n): n is NhanVat => Boolean(n));
  const related = [
    ...(nv.relatedVanKhan ?? []),
    { label: "Xem ngày âm hôm nay", href: "/hom-nay/", summary: "Tra cứu ngày tốt, ngày xấu theo lịch âm." },
    ...others.map((o) => ({ label: o.name, href: `/van-hoa/nhan-vat/${o.slug}/`, summary: "Nhân vật liên quan" })),
  ];
  return (
    <Page
      crumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Văn hoá", href: "/van-hoa/" },
        { label: "Nhân vật", href: "/van-hoa/nhan-vat/" },
        { label: nv.name },
      ]}
    >
      <Hero label={nv.label} title={nv.name} sub={nv.otherNames?.join(" · ")} lead={nv.summary} image={nv.image} alt={nv.imageAlt} center />
      <div className={s.wrap}>
        {nv.variants && nv.variants.length > 0 && (
          <div className={t.stack}>
            <Card id="di-ban" icon="book" title="Các dị bản">
              <ul className={t.bullets}>
                {nv.variants.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}
        <div className={t.grid2}>
          {nv.places && nv.places.length > 0 && (
            <Card id="noi-tho" icon="temple" title="Nơi thờ chính">
              <div className={t.stack} style={{ marginTop: 0, gap: 12 }}>
                {nv.places.map((p) => (
                  <div key={p.name} className={t.placeItem}>
                    <Icon name="home" size={20} />
                    <div>
                      <h3 className={t.placeName}>{p.name}</h3>
                      <p style={{ margin: 0 }}>{p.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          {fests.length > 0 && (
            <Card id="le-hoi" icon="flame" title="Lễ hội">
              <ul className={t.bullets}>
                {fests.map((f) => (
                  <li key={f.name}>
                    <b>{f.name}</b> — mùng {f.lunarDay} tháng {f.lunarMonth} âm lịch{f.note ? `. ${f.note}` : ""}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {rows.length > 0 && (
          <section aria-labelledby="bang-10-nam">
            <SectionTitle id="bang-10-nam">Bảng ngày dương lịch 10 năm</SectionTitle>
            <p style={{ textAlign: "center", margin: "-8px 0 16px" }}>Tự tính từ ngày âm lịch của từng lễ hội.</p>
            <div className={t.tblWrap}>
              <table className={t.tbl}>
                <thead>
                  <tr>
                    <th scope="col">Năm</th>
                    {fests.map((f) => (
                      <th scope="col" key={f.name}>
                        {f.name}
                        <br />
                        <small style={{ fontWeight: 400 }}>
                          (mùng {f.lunarDay} tháng {f.lunarMonth} âm lịch)
                        </small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.year}>
                      <td>
                        {r.year} <small style={{ fontWeight: 400 }}>{r.canChi}</small>
                      </td>
                      {r.cells.map((c, i) => (
                        <td key={fests[i]?.name}>{c ? c.text : "—"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={t.yearCards}>
              {rows.map((r) => (
                <article className={t.yearCard} key={r.year}>
                  <h3>
                    {r.year} <span>{canChiOfYear(r.year).name}</span>
                  </h3>
                  {fests.map((f, i) => (
                    <p key={f.name}>
                      <b>{f.name}</b>
                      <br />
                      {r.cells[i]?.text ?? "—"} <span style={{ color: "var(--vh-muted)" }}>(mùng {f.lunarDay} tháng {f.lunarMonth} âm lịch)</span>
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </section>
        )}

        <div className={t.grid2}>
          <Related links={related} />
          <Sources sources={nv.sources} />
        </div>
        <p className={t.stack} style={{ textAlign: "right" }}>
          <Link href="/van-hoa/nhan-vat/" style={{ color: "var(--vh-red)", fontWeight: 600 }}>
            Tất cả nhân vật
          </Link>
        </p>
      </div>
    </Page>
  );
}
