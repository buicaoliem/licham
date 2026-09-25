import { Icon } from "@/components/heritage/Icon";
import type { DanGian } from "@/lib/van-hoa/types";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import { Card, Hero, Page, Pic, Related, SectionTitle, Sources } from "./Shared";

export function DanGianDetail({ item }: { item: DanGian }) {
  const f = item.facts;
  const facts = [
    { k: "Số người chơi", v: f.players, icon: "user" as const },
    { k: "Dụng cụ", v: f.tools, icon: "bowl" as const },
    { k: "Vùng miền", v: f.region, icon: "home" as const },
    { k: "Dịp chơi", v: f.occasion, icon: "calendar" as const },
  ];
  return (
    <Page
      crumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Văn hoá", href: "/van-hoa/" },
        { label: item.title },
      ]}
    >
      <Hero title={item.title} lead={item.summary} image={item.heroImage} center />
      <div className={s.wrap}>
        <dl className={`${t.facts} ${t.card}`} aria-label="Thông tin nhanh">
          {facts.map((x) => (
            <div key={x.k} className={t.fact}>
              <Icon name={x.icon} size={22} />
              <div>
                <dt>{x.k}</dt>
                <dd>{x.v}</dd>
              </div>
            </div>
          ))}
        </dl>

        <section aria-labelledby="luat-choi">
          <SectionTitle id="luat-choi">Luật chơi theo bước</SectionTitle>
          <ol className={t.steps}>
            {item.steps.map((st, i) => (
              <li key={st.title} className={t.step}>
                <Pic src={st.image} className={st.image ? t.stepImg : t.stepImgNone} style={{ objectPosition: st.imagePosition }} width={240} height={240} />
                <h3 className={t.stepTitle}>
                  <span className={t.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  {st.title}
                </h3>
                <p className={t.stepText}>{st.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className={t.grid2}>
          {item.dongDao && (
            <Card id="dong-dao" icon="scroll" title="Bài đồng dao">
              <ul className={t.dongDao}>
                {item.dongDao.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Card>
          )}
          <Card id="thang-thua" icon="flame" title="Cách tính thắng thua">
            <ul className={t.bullets}>
              {item.winRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>
        </div>

        {item.related && item.related.length > 0 && (
          <div className={t.stack}>
            <Related links={item.related} />
          </div>
        )}
        {item.sources && item.sources.length > 0 && (
          <div className={t.stack}>
            <Sources sources={item.sources} />
          </div>
        )}
      </div>
    </Page>
  );
}
