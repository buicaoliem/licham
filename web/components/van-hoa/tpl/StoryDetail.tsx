import Link from "next/link";
import { Icon } from "@/components/heritage/Icon";
import { STORY_ANGLE_LABELS, STORY_SOURCE_STATUS_LABELS, type Story } from "@/lib/van-hoa/types";
import { storiesInSeries } from "@/lib/van-hoa/cross-links";
import { BaiVietDetail } from "./BaiVietDetail";
import { Pic } from "./Shared";
import a from "./article.module.css";

/** Trang "câu chuyện lịch sử": dùng lại BaiVietDetail, chỉ thêm nhãn góc kể/nguồn, khối series và "Đọc tiếp". */
export function StoryDetail({ story }: { story: Story }) {
  const seriesStories = story.series ? storiesInSeries(story.series.slug) : [];
  return (
    <BaiVietDetail
      post={story}
      pathPrefix="/van-hoa/cau-chuyen/"
      extraBadges={
        <span className="le-tag" title={STORY_SOURCE_STATUS_LABELS[story.sourceStatus]}>
          {STORY_ANGLE_LABELS[story.angle]}
        </span>
      }
      afterBody={
        <>
          {story.series && seriesStories.length > 1 && (
            <section className={`${a.box} ${a.tint}`} aria-labelledby="series-h" style={{ margin: "24px 0" }}>
              <h2 className={a.h3} id="series-h">
                Câu chuyện thuộc series: {story.series.title}
              </h2>
              <ol className={a.tocList}>
                {seriesStories.map((s) => (
                  <li key={s.slug}>
                    {s.slug === story.slug ? (
                      <b>
                        {s.series?.order}. {s.title} <span aria-hidden="true">— đang đọc</span>
                      </b>
                    ) : (
                      <Link href={`/van-hoa/cau-chuyen/${s.slug}/`}>
                        {s.series?.order}. {s.title}
                        <Icon name="chevron" size={16} className={a.tocGo} />
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
          {story.readNext && (
            <section aria-labelledby="doc-tiep-h" style={{ margin: "24px 0" }}>
              <h2 className={a.h2} id="doc-tiep-h">
                Đọc tiếp
              </h2>
              <Link href={story.readNext.href} className={a.relCard}>
                <Pic src={story.readNext.image} alt="" className={a.relImg} width={480} height={360} />
                <b>{story.readNext.label}</b>
                {story.readNext.summary && <span>{story.readNext.summary}</span>}
                <em>
                  Xem thêm
                  <Icon name="arrow" size={16} />
                </em>
              </Link>
            </section>
          )}
        </>
      }
    />
  );
}
