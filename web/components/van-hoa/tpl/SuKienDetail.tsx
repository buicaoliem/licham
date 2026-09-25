import Link from "next/link";
import { Icon } from "@/components/heritage/Icon";
import { canChiOfYear } from "@licham/core";
import { lunarToSolarSafe } from "@/lib/van-hoa/logic";
import { NHAN_VAT } from "@/lib/van-hoa/data/nhan-vat";
import type { NhanVat, SuKien } from "@/lib/van-hoa/types";
import { Accordion } from "./Accordion";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import { Card, Hero, Page, Pic, Sources } from "./Shared";

export function SuKienDetail({ ev }: { ev: SuKien }) {
  const { day, month, year, leap } = ev.lunar;
  const lunarText = ev.lunarText ?? `Ngày ${day} tháng ${month}${leap ? " nhuận" : ""} năm ${canChiOfYear(year).name}`;
  const solar = lunarToSolarSafe(day, month, year, leap);
  const chars = (ev.relatedNhanVat ?? []).map((sl) => NHAN_VAT.find((n) => n.slug === sl)).filter((n): n is NhanVat => Boolean(n));
  const blocks: { title: string; paras: string[] }[] = [
    { title: "Bối cảnh", paras: ev.boiCanh },
    { title: "Diễn biến", paras: ev.dienBien },
    { title: "Ý nghĩa", paras: ev.yNghia },
  ];
  return (
    <Page
      crumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Văn hoá", href: "/van-hoa/" },
        { label: ev.title },
      ]}
    >
      <Hero label={ev.label} title={ev.title} lead={ev.summary} image={ev.heroImage} center />
      <div className={s.wrap}>
        <div className={t.dates}>
          <div className={t.dateCard}>
            <small>Ngày theo sử sách (âm lịch)</small>
            <b>{lunarText}</b>
          </div>
          {solar && (
            <div className={t.dateCard}>
              <small>Ngày quy đổi dương lịch</small>
              <b>{solar.text}</b>
              <span>Quy đổi bằng thuật toán lịch âm hiện hành; lịch xưa có thể lệch một, hai ngày.</span>
            </div>
          )}
        </div>

        <div className={t.grid2}>
          <div className={t.stack} style={{ marginTop: 0 }}>
            {blocks.map((b, i) => (
              <Accordion key={b.title} num={i + 1} title={b.title}>
                {b.paras.map((p) => (
                  <p className={t.p} key={p}>
                    {p}
                  </p>
                ))}
              </Accordion>
            ))}
          </div>
          <div className={t.stack} style={{ marginTop: 0 }}>
            {ev.mapImage && (
              <Card id="ban-do" icon="home" title="Bản đồ vị trí và sơ đồ">
                <Pic src={ev.mapImage} alt={ev.mapAlt} className={t.mapImg} width={800} height={500} />
              </Card>
            )}
            {ev.disputed && (
              <aside className={t.alert} aria-labelledby="chua-thong-nhat">
                <Icon name="question" size={24} />
                <div>
                  <h2 className={t.alertTitle} id="chua-thong-nhat">
                    Các nguồn chưa thống nhất
                  </h2>
                  <p>{ev.disputed}</p>
                </div>
              </aside>
            )}
          </div>
        </div>

        {chars.length > 0 && (
          <div className={t.stack}>
            <Card id="nhan-vat" icon="user" title="Nhân vật liên quan">
              <ul className={`${t.plain} ${t.cards}`}>
                {chars.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/van-hoa/nhan-vat/${n.slug}/`} className={t.linkRow}>
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
        <div className={t.stack}>
          <Sources sources={ev.sources} />
        </div>
      </div>
    </Page>
  );
}
