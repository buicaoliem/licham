import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VanKhanSearch } from "@/components/VanKhanSearch";
import { getVietnamToday } from "@/lib/today";
import { VAN_KHAN_NHOM_LIST, vanKhanByNhom } from "@/lib/van-khan";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Văn khấn cổ truyền Việt Nam ${year} — Tuyển tập đầy đủ | Lịch Âm`,
    description: `Tuyển tập bài văn khấn ${year}: trong nhà, lễ tết, việc lớn, cầu an và đi lễ — sắm lễ, lưu ý và bài khấn nguyên văn.`,
    alternates: { canonical: "/van-khan/" },
  };
}

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
          <div className="chips" style={{ marginBottom: 18, justifyContent: "center" }}>
            <Link className="chip" href="/xem-ngay-tot">
              Xem ngày tốt
            </Link>
            <Link className="chip" href="/van-khan/mung-mot-ngay-ram">
              Mùng một, rằm
            </Link>
            <Link className="chip" href="/van-khan/dong-tho">
              Khấn động thổ
            </Link>
            <Link className="chip" href="/countdown/tet">
              Đếm ngược Tết
            </Link>
          </div>
          <VanKhanSearch nhomList={nhomList} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
