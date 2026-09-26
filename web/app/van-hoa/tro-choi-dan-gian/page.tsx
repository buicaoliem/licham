import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { TroChoiList } from "@/components/van-hoa/tpl/TroChoiList";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { TRO_CHOI_PATH } from "@/lib/van-hoa/tro-choi";

export const metadata: Metadata = {
  title: "Trò chơi dân gian | Lịch Âm",
  description: "Hai mươi trò chơi dân gian Việt Nam: Tết, hội làng và giờ ra chơi — cách chơi, vùng miền và nguồn gốc.",
  alternates: { canonical: TRO_CHOI_PATH },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function TroChoiHubPage() {
  return (
    <ChShell activeMenu="Văn hoá" className="ch-page">
      <TroChoiList />
    </ChShell>
  );
}
