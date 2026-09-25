import Link from "next/link";
import { HERO_IMAGE, NEW_POSTS, TOPICS, type Topic } from "@/lib/van-hoa/config";
import { HomNay } from "./HomNay";
import s from "./van-hoa.module.css";

function TopicCard({ t }: { t: Topic }) {
  const hasLinks = t.links.length > 0;
  return (
    <li className={s.topic}>
      <img src={t.image} alt={t.imageAlt} width={480} height={360} loading="lazy" decoding="async" className={s.topicImg} />
      <div className={s.topicBody}>
        <span className={s.badge}>{t.badge}</span>
        <h3 className={s.h3}>{t.title}</h3>
        <p className={s.topicDesc}>{t.description}</p>
        {hasLinks && (
          <ul className={s.topicLinks}>
            {t.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        )}
        {t.live && (
          <p className={s.more}>
            <Link href={t.href}>Xem tất cả</Link>
          </p>
        )}
      </div>
    </li>
  );
}

export function VanHoaHub() {
  return (
    <div className={s.root}>
      <section className={s.hero}>
        <img src={HERO_IMAGE} alt="" aria-hidden="true" className={s.heroBg} width={1200} height={600} fetchPriority="high" />
        <div className={s.heroIn}>
          <h1 className={s.h1}>Lịch sử &amp; Văn hoá Việt</h1>
          <p className={s.lead}>
            Trăng, tiết khí, lễ hội và những câu chuyện xưa gắn với lịch âm — để mỗi ngày trên lịch thêm một điều đáng biết về cội nguồn.
          </p>
        </div>
      </section>

      <div className={s.wrap}>
        <section aria-labelledby="vh-homnay">
          <h2 className={s.h2} id="vh-homnay">Hôm nay</h2>
          <HomNay />
        </section>

        <section aria-labelledby="vh-chude">
          <h2 className={s.h2} id="vh-chude">Khám phá các chủ đề văn hoá</h2>
          <ul className={s.topics}>
            {TOPICS.map((t) => (
              <TopicCard key={t.slug} t={t} />
            ))}
          </ul>
        </section>

        {NEW_POSTS.length > 0 && (
          <section aria-labelledby="vh-moi">
            <h2 className={s.h2} id="vh-moi">Bài mới</h2>
            <ul className={s.newList}>
              {NEW_POSTS.map((p) => (
                <li key={p.href} className={s.newItem}>
                  <span className={s.badge}>{p.badge}</span>
                  <h3 className={s.h3}>{p.title}</h3>
                  <p className={s.note}>{p.date}</p>
                  <p className={s.more}>
                    <Link href={p.href}>Xem thêm</Link>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
