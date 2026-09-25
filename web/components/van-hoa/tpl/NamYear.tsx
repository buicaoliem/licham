import Link from "next/link";
import { Icon } from "@/components/heritage/Icon";
import { dynastyInfo } from "@/lib/van-hoa/dynasty";
import { canChiYearHeader, eventsOfCanChi } from "@/lib/van-hoa/logic";
import { NAM_SU_KIEN } from "@/lib/van-hoa/data/nam-su-kien";
import { ITEM_LABELS } from "@/lib/van-hoa/types";
import { ALL_CAN_CHI, CHI_LIST } from "@/lib/tuoi";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import { JsonLd } from "@/components/calendar/JsonLd";
import { CHI_HERO_ANIMAL_SIDE, NGU_HANH_ICON } from "@/lib/van-hoa/config";
import { articleJsonLd } from "@/lib/van-hoa/jsonld";
import { Drafting, ItemBadge, LinkRow, Page, Pic, SectionTitle } from "./Shared";

function ZodiacHero({ chiSlug, alt, title, lead }: { chiSlug: string; alt: string; title: string; lead: string }) {
  const base = `/heritage/con-giap/ngang/${chiSlug}`;
  const textRight = CHI_HERO_ANIMAL_SIDE[chiSlug] !== "right";
  return (
    <header className={t.zHero}>
      <img src={`${base}-1600.webp`} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes="(min-width: 1440px) 1440px, 100vw" alt={alt} width={1600} height={900} className={t.zImg} loading="eager" decoding="async" />
      <div className={`${t.zText} ${textRight ? t.zTextR : t.zTextL}`}>
        <h1 className={s.h1} style={{ textAlign: "inherit" }}>{title}</h1>
        <p className={s.lead} style={{ marginLeft: 0, textAlign: "inherit" }}>{lead}</p>
      </div>
    </header>
  );
}

export function NamYear({ slug }: { slug: string }) {
  const cc = ALL_CAN_CHI.find((c) => canChiYearHeader(c).slug === slug);
  if (!cc) return null;
  const h = canChiYearHeader(cc);
  const events = eventsOfCanChi(cc, NAM_SU_KIEN);
  const chiSlug = CHI_LIST[cc.chiIndex]!.slug;
  const heroBase = `/heritage/con-giap/ngang/${chiSlug}`;
  const hanhIcon = NGU_HANH_ICON[h.menhHanh];
  const others = ALL_CAN_CHI.filter((c) => c.index !== cc.index);
  return (
    <Page
      crumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Văn hoá", href: "/van-hoa/" },
        { label: "Sự kiện lịch sử", href: "/van-hoa/su-kien/" },
        { label: `Năm ${cc.name}` },
      ]}
    >
      <JsonLd data={articleJsonLd({ headline: `Năm ${cc.name} trong lịch sử`, description: `Các dấu mốc lịch sử của những năm ${cc.name}, xếp theo dòng thời gian.`, path: `/van-hoa/nam/${slug}/`, image: `${heroBase}-1600.webp`, updatedAt: events.map((e) => e.updatedAt).sort().pop() })} />
      <ZodiacHero chiSlug={chiSlug} alt={`Con giáp ${h.conGiap}`} title={`Năm ${cc.name} trong lịch sử`} lead={`Những dấu mốc gắn với các năm ${cc.name} trong lịch sử dân tộc, xếp theo dòng thời gian.`} />
      <div className={s.wrap}>
        <dl className={t.headCards} aria-label={`Thông tin năm ${cc.name}`}>
          <div className={t.headCard}>
            <dt>Can</dt>
            <dd>
              <b>{cc.can}</b>
              Hành {h.canHanh}
            </dd>
          </div>
          <div className={t.headCard}>
            <dt>Chi</dt>
            <dd>
              <b>{cc.chi}</b>
              Con giáp thứ {h.chiOrder}
            </dd>
          </div>
          <div className={t.headCard}>
            <dt>Con giáp</dt>
            <dd>
              <b>{h.conGiap}</b>
              Tuổi {cc.chi}
            </dd>
          </div>
          <div className={t.headCard}>
            <dt>Mệnh</dt>
            <dd>
              {hanhIcon && <img src={`/heritage/ngu-hanh/${hanhIcon}-128.webp`} srcSet={`/heritage/ngu-hanh/${hanhIcon}-128.webp 128w, /heritage/ngu-hanh/${hanhIcon}-256.webp 256w`} sizes="48px" alt={`Hành ${h.menhHanh}`} width={48} height={48} className={t.hanhIcon} loading="lazy" decoding="async" />}
              <b>{h.menh}</b>
              Nạp âm hành {h.menhHanh}
            </dd>
          </div>
        </dl>

        {events.length > 0 && (
          <section aria-labelledby="cac-moc">
            <SectionTitle id="cac-moc">Xem nhanh các mốc</SectionTitle>
            <ul className={t.chips}>
              {events.map((e) => (
                <li key={`${e.year}-${e.title}`}>
                  <a href={`#nam-${e.year}`} className={`${t.chip} ${t.chipYear}`}>
                    <b>{e.year}</b>
                    <span>{cc.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="dong-thoi-gian">
          <SectionTitle id="dong-thoi-gian">Dòng thời gian các năm {cc.name}</SectionTitle>
          {events.length === 0 ? (
            <Drafting />
          ) : (
            <ol className={t.timeline}>
              {events.map((e) => {
                const d = dynastyInfo(e.dynasty);
                const box = (
                  <>
                    <Pic src={d.image} className={t.tlImg} width={360} height={144} />
                    <div className={t.tlYear}>
                      {e.year}
                      <small>{cc.name}</small>
                    </div>
                    <div className={t.tlBody}>
                      <ItemBadge label={e.label} />
                      <h3>{e.title}</h3>
                      <p className={t.tlDyn}>{d.name}</p>
                      <p>{e.summary}</p>
                    </div>
                  </>
                );
                return (
                  <li key={`${e.year}-${e.title}`} className={t.tlRow} id={`nam-${e.year}`}>
                    <span className={t.tlNode} style={{ background: ITEM_LABELS[e.label].node }} aria-hidden="true" />
                    {e.href ? (
                      <Link href={e.href} className={t.tlBox} style={{ color: "inherit", textDecoration: "none" }}>
                        {box}
                      </Link>
                    ) : (
                      <div className={t.tlBox}>{box}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <div className={t.stack}>
          <section aria-labelledby="lien-ket">
            <h2 className={t.cardTitle} id="lien-ket">
              <Icon name="clover" size={22} />
              Liên kết liên quan
            </h2>
            <LinkRow link={{ label: `Tuổi ${cc.name}`, href: h.tuoiHref, summary: "Xem tử vi, tính cách, hợp tuổi, màu sắc…" }} icon="user" />
          </section>
          <section aria-labelledby="nam-khac">
            <h2 className={t.cardTitle} id="nam-khac">
              <Icon name="calendar" size={22} />
              59 năm can chi còn lại
            </h2>
            <ul className={t.yearsFlow}>
              {others.map((c) => (
                <li key={c.index}>
                  <Link href={`/van-hoa/nam/${canChiYearHeader(c).slug}/`} className={t.chip}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Page>
  );
}
