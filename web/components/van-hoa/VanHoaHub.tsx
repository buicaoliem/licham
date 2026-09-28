import Link from "next/link";
import { ListLd } from "./tpl/Shared";
import { TopicBadge } from "./tpl/Shared";
import { HERO_IMAGE, NEW_POSTS, TOPICS, type Topic } from "@/lib/van-hoa/config";
import { HomNay } from "./HomNay";
import { Upcoming } from "./Upcoming";
import { STORY } from "@/lib/van-hoa/data/story";
import { FIXTURE_SLUG } from "@/lib/van-hoa/types";
import s from "./van-hoa.module.css";

/** Câu chuyện mới nhất trước, tối đa 4 — khối khám phá gọn trên trang tổng, không phải một feed dài. */
const DISCOVERY_STORIES = STORY.filter((x) => x.slug !== FIXTURE_SLUG)
  .slice()
  .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
  .slice(0, 4);


function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 className={s.h2} id={id}>
      <span className={s.orn} aria-hidden="true" />
      {children}
      <span className={`${s.orn} ${s.ornR}`} aria-hidden="true" />
    </h2>
  );
}

function TopicCard({ t }: { t: Topic }) {
  const hasLinks = t.links.length > 0;
  return (
    <li className={s.topic}>
      <img src={t.image} alt={t.imageAlt} width={480} height={360} loading="lazy" decoding="async" className={s.topicImg} style={{ objectPosition: t.imagePosition }} />
      <div className={s.topicBody}>
        <TopicBadge text={t.badge} />
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
      <ListLd
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn hoá" }]}
        name="Lịch sử & Văn hoá Việt"
        description="Các chủ đề văn hoá Việt: lịch sử theo năm, văn hoá dân gian, nhân vật và lễ hội."
        path="/van-hoa/"
        items={TOPICS.filter((x) => x.live).map((x) => ({ name: x.title, href: x.href }))}
      />
      <section className={s.hero}>
        <img src={HERO_IMAGE} alt="" aria-hidden="true" className={`${s.heroArt} ${s.heroL}`} width={1200} height={600} fetchPriority="high" />
        <img src={HERO_IMAGE} alt="" aria-hidden="true" className={`${s.heroArt} ${s.heroR}`} width={1200} height={600} />
        <div className={s.heroIn}>
          <h1 className={s.h1}>Lịch sử &amp; Văn hoá Việt</h1>
          <p className={s.lead}>
            Trăng, tiết khí, lễ hội và những câu chuyện xưa gắn với lịch âm — để mỗi ngày trên lịch thêm một điều đáng biết về cội nguồn.
          </p>
        </div>
      </section>

      <div className={s.wrap}>
        <section aria-labelledby="vh-homnay">
          <SectionTitle id="vh-homnay">Hôm nay</SectionTitle>
          <HomNay />
        </section>

        <section aria-labelledby="vh-saptoi">
          <SectionTitle id="vh-saptoi">Văn hoá trong 30 ngày tới</SectionTitle>
          <Upcoming />
        </section>

        <section aria-labelledby="vh-chude">
          <SectionTitle id="vh-chude">Khám phá các chủ đề văn hoá</SectionTitle>
          <ul className={s.topics}>
            {TOPICS.map((t) => (
              <TopicCard key={t.slug} t={t} />
            ))}
          </ul>
        </section>

        {DISCOVERY_STORIES.length > 0 && (
          <section aria-labelledby="vh-cauchuyen">
            <SectionTitle id="vh-cauchuyen">Câu chuyện lịch sử</SectionTitle>
            <p className={s.topicDesc}>Lớp nội dung giữa hồ sơ nhân vật và mốc sự kiện — mỗi bài mở đầu bằng một câu hỏi cụ thể, phân biệt rõ sử liệu và truyền tụng.</p>
            <ul className={s.newList}>
              {DISCOVERY_STORIES.map((st) => (
                <li key={st.slug} className={s.newItem}>
                  {st.heroImage && <img src={st.heroImage} alt="" width={88} height={64} loading="lazy" decoding="async" className={s.newImg} />}
                  <div className={s.newBody}>
                    <TopicBadge text="Câu chuyện" />
                    <h3 className={s.h3}>{st.title}</h3>
                    <p className={s.more}>
                      <Link href={`/van-hoa/cau-chuyen/${st.slug}/`}>Đọc tiếp</Link>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={s.more}>
              <Link href="/anh-hung-dan-toc/">Xem hồ sơ đầy đủ các anh hùng dân tộc</Link>
            </p>
          </section>
        )}

        {NEW_POSTS.length > 0 && (
          <section aria-labelledby="vh-moi">
            <SectionTitle id="vh-moi">Bài mới</SectionTitle>
            <ul className={s.newList}>
              {NEW_POSTS.map((p) => (
                <li key={p.href} className={s.newItem}>
                  {p.image && <img src={p.image} alt="" width={88} height={64} loading="lazy" decoding="async" className={s.newImg} />}
                  <div className={s.newBody}>
                    <TopicBadge text={p.badge} />
                    <h3 className={s.h3}>{p.title}</h3>
                    <p className={s.note}>{p.date}</p>
                    <p className={s.more}>
                      <Link href={p.href}>Xem thêm</Link>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
