import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VAN_KHAN_NHOM_LIST, vanKhanByNhom } from "@/lib/van-khan";

export const metadata: Metadata = {
  title: "Văn khấn cổ truyền Việt Nam — Tuyển tập đầy đủ | LịchÂm",
  description: "Tuyển tập 20 bài văn khấn cổ truyền: trong nhà, lễ tết, việc lớn và cầu an — đầy đủ sắm lễ, lưu ý và bài khấn nguyên văn.",
  alternates: { canonical: "/van-khan/" },
};

export default function VanKhanIndexPage() {
  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Văn khấn" />

        <div className="band">
          <div className="bg bg-son" />
          <div className="band-in">
            <h1>Văn khấn cổ truyền Việt Nam</h1>
            <p>20 bài văn khấn đầy đủ, chia theo bốn nhóm: trong nhà, lễ tết, việc lớn và cầu an</p>
          </div>
        </div>

        <div className="body">
          <div className="khangrid">
            {VAN_KHAN_NHOM_LIST.map((nhom) => (
              <div className="box khangroup" key={nhom}>
                <h2>{nhom}</h2>
                <div className="khanlist">
                  {vanKhanByNhom(nhom).map((v) => (
                    <Link className="khanitem" href={`/van-khan/${v.slug}`} key={v.slug}>
                      <div className="n">{v.ten}</div>
                      <div className="s">{v.moTa}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
