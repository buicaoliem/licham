import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VanKhanSearch } from "@/components/VanKhanSearch";
import { VAN_KHAN_NHOM_LIST, vanKhanByNhom } from "@/lib/van-khan";

export const metadata: Metadata = {
  title: "Văn khấn cổ truyền Việt Nam — Tuyển tập đầy đủ | Lịch Âm",
  description: "Tuyển tập 40 bài văn khấn cổ truyền: trong nhà, lễ tết, việc lớn, cầu an và đi lễ — đầy đủ sắm lễ, lưu ý và bài khấn nguyên văn.",
  alternates: { canonical: "/van-khan/" },
};

export default function VanKhanIndexPage() {
  const nhomList = VAN_KHAN_NHOM_LIST.map((nhom) => ({ ten: nhom, items: vanKhanByNhom(nhom) }));

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Văn khấn" />

        <div className="band">
          <div className="bg bg-son" />
          <div className="band-in">
            <h1>Văn khấn cổ truyền Việt Nam</h1>
            <p>40 bài văn khấn đầy đủ, chia theo năm nhóm: trong nhà, lễ tết, việc lớn, cầu an và đi lễ</p>
          </div>
        </div>

        <div className="body">
          <VanKhanSearch nhomList={nhomList} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
