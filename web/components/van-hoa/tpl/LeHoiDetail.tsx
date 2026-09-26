import Link from "next/link";
import { JsonLd } from "@/components/calendar/JsonLd";
import { articleJsonLd, leHoiEventJsonLd } from "@/lib/van-hoa/jsonld";
import type { LeHoi } from "@/lib/van-hoa/types";
import { LE_HOI_PATH, figuresOfLeHoi, hasFixedLunarDate, leHoiMonthPath, leHoiPath, lunarSpanText, monthLabel, nextOccurrence } from "@/lib/van-hoa/le-hoi";
import { getVietnamToday } from "@/lib/today";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import { Card, Hero, Page, Related, Sources } from "./Shared";

/** "{nơi} – {địa chỉ mới} (trước đây: {địa chỉ cũ})"; bỏ phần trong ngoặc khi không có địa chỉ cũ. */
export const leHoiPlace = (f: LeHoi) => `${f.site} – ${f.newAddress}${f.oldAddress ? ` (trước đây: ${f.oldAddress})` : ""}`;

export function LeHoiDetail({ f }: { f: LeHoi }) {
  const today = getVietnamToday();
  const path = leHoiPath(f.slug);
  const occ = hasFixedLunarDate(f) ? nextOccurrence(f, today) : null;
  const related = [
    ...figuresOfLeHoi(f).map((n) => ({ label: n.name, href: `/van-hoa/nhan-vat/${n.slug}/`, summary: "Nhân vật được thờ" })),
    ...(f.lunarMonth ? [{ label: `Lễ hội ${monthLabel(f.lunarMonth)}`, href: leHoiMonthPath(f.lunarMonth), summary: "Các lễ hội cùng tháng âm lịch" }] : []),
    { label: "Tất cả lễ hội", href: LE_HOI_PATH, summary: "Lễ hội theo tháng âm lịch" },
  ];
  return (
    <Page
      crumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Văn hoá", href: "/van-hoa/" },
        { label: "Lễ hội", href: LE_HOI_PATH },
        { label: f.name },
      ]}
    >
      <JsonLd data={articleJsonLd({ headline: f.name, description: f.summary, path, image: f.image, updatedAt: f.updatedAt, about: { "@type": "Place", name: f.site, address: f.newAddress } })} />
      {occ && <JsonLd data={leHoiEventJsonLd(f, path, occ)} />}
      <Hero badge="Lễ hội" title={f.name} sub={f.dateText} lead={f.summary} image={f.image} alt={f.imageAlt} center />
      <div className={s.wrap}>
        <div className={t.grid2}>
          <Card id="dia-diem" icon="temple" title="Địa điểm">
            <p style={{ margin: 0 }}>{leHoiPlace(f)}</p>
          </Card>
          <Card id="doi-tuong-tho" icon="home" title="Đối tượng thờ, tôn vinh">
            <p style={{ margin: 0 }}>{f.worship}</p>
          </Card>
        </div>
        <div className={t.stack}>
          <Card id="nghi-le" icon="flame" title="Nghi lễ và hoạt động">
            <p style={{ margin: 0 }}>{f.rituals}</p>
          </Card>
        </div>
        {f.heritage && (
          <div className={t.stack}>
            <Card id="di-san" icon="scroll" title="Di tích, di sản được công nhận">
              <p style={{ margin: 0 }}>{f.heritage}</p>
            </Card>
          </div>
        )}
        {occ && (
          <div className={t.stack}>
            <Card id="ngay-am" icon="calendar" title="Ngày âm liên quan">
              <p style={{ margin: 0 }}>
                <b>{lunarSpanText(f)} âm lịch</b>
              </p>
              <p style={{ margin: "8px 0 0" }}>
                {occ.start.solar.year === today.year ? "Năm nay" : "Năm sau"}: {occ.start.text}
                {occ.end.text !== occ.start.text && ` đến ${occ.end.text}`}
              </p>
            </Card>
          </div>
        )}
        <div className={t.grid2}>
          <Related links={related} />
          <Sources sources={f.sources} />
        </div>
        <p className={t.stack} style={{ textAlign: "right" }}>
          <Link href={LE_HOI_PATH} style={{ color: "var(--vh-red)", fontWeight: 600 }}>
            Tất cả lễ hội
          </Link>
        </p>
      </div>
    </Page>
  );
}
