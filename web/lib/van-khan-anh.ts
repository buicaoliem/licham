// Chỉ dùng ở server component: module này nạp toàn bộ danh sách văn khấn,
// tách khỏi heritage-assets để component client (VanKhanSearch) không kéo danh sách vào bundle.
import { heritageFile } from "./heritage-assets";
import { VAN_KHAN_LIST } from "./van-khan";

const NHOM_SLUG: Record<string, string> = {
  "Trong nhà": "trong-nha",
  "Lễ tết": "le-tet",
  "Việc lớn": "viec-lon",
  "Cầu an": "cau-an",
  "Đi lễ": "di-le",
};

/** Số biến thể ảnh nhóm tối đa: nhom/<slug>.webp, nhom/<slug>-2.webp … nhom/<slug>-6.webp. */
const NHOM_BIEN_THE_MAX = 6;
/** Số cột lưới thẻ văn khấn trên desktop — dùng để tránh hai thẻ kề nhau (ngang/dọc) trùng ảnh. */
const VK_LUOI_COT = 3;

function nhomBienThe(nhom: string): string[] {
  const base = NHOM_SLUG[nhom] ?? "khac";
  const out: string[] = [];
  for (let i = 1; i <= NHOM_BIEN_THE_MAX; i++) {
    const path = `/heritage/van-khan/nhom/${base}${i === 1 ? "" : `-${i}`}.webp`;
    if (heritageFile(path)) out.push(path);
  }
  return out;
}

let anhNhomTheoBai: Map<string, string> | null = null;

/**
 * Chia ảnh nhóm cho từng bài theo thứ tự bài trong nhóm (cùng thứ tự lưới ở /van-khan/):
 * xoay vòng các biến thể, bỏ qua biến thể trùng với thẻ liền trước hoặc thẻ phía trên.
 * Bài đã có ảnh riêng giữ ảnh riêng. Kết quả cố định nên trang chi tiết dùng cùng ảnh với thẻ.
 */
function anhNhomCuaBai(slug: string): string | null {
  if (!anhNhomTheoBai) {
    anhNhomTheoBai = new Map();
    for (const ten of Object.keys(NHOM_SLUG)) {
      const bienThe = nhomBienThe(ten);
      if (bienThe.length === 0) continue;
      const hienThi: string[] = [];
      VAN_KHAN_LIST.filter((v) => v.nhom === ten).forEach((v, i) => {
        const own = heritageFile(`/heritage/van-khan/${v.slug}.webp`);
        const trai = hienThi[i - 1]; // thẻ liền trước (thẻ bên trái trên desktop, thẻ phía trên trên mobile 1 cột)
        const tren = hienThi[i - VK_LUOI_COT];
        let chon = bienThe[i % bienThe.length]!;
        for (let k = 0; k < bienThe.length; k++) {
          const c = bienThe[(i + k) % bienThe.length]!;
          if (c !== trai && c !== tren) {
            chon = c;
            break;
          }
        }
        anhNhomTheoBai!.set(v.slug, chon);
        hienThi.push(own ?? chon);
      });
    }
  }
  return anhNhomTheoBai.get(slug) ?? null;
}

/** Ảnh riêng của bài (4:3) — nếu chưa có thì dùng ảnh nhóm (biến thể chia theo bài). */
export function vanKhanImagePaths(slug: string, nhom: string): { own: string; nhom: string } {
  return {
    own: `/heritage/van-khan/${slug}.webp`,
    nhom: anhNhomCuaBai(slug) ?? `/heritage/van-khan/nhom/${NHOM_SLUG[nhom] ?? "khac"}.webp`,
  };
}

export function vanKhanImage(slug: string, nhom: string): string | null {
  const p = vanKhanImagePaths(slug, nhom);
  return heritageFile(p.own) ?? heritageFile(p.nhom);
}
