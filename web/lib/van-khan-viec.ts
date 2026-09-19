/** Bài khấn việc lớn → trang xem ngày tốt tương ứng (graph, không nhân nội dung). */
export const VAN_KHAN_VIEC: Readonly<Record<string, { slug: string; label: string }>> = {
  "dong-tho": { slug: "dong-tho", label: "ngày tốt động thổ" },
  "nhap-trach": { slug: "nhap-trach", label: "ngày tốt nhập trạch" },
  "khai-truong": { slug: "khai-truong", label: "ngày tốt khai trương" },
  "cat-noc": { slug: "cat-noc", label: "ngày tốt cất nóc" },
  "sua-nha": { slug: "sua-nha", label: "ngày tốt sửa nhà" },
  "cai-tang": { slug: "an-tang", label: "ngày tốt an táng, cải táng" },
  "cung-xe": { slug: "mua-xe", label: "ngày tốt mua xe" },
  "le-gia-tien-an-hoi": { slug: "cuoi-hoi", label: "ngày tốt cưới hỏi" },
  "le-gia-tien-ngay-cuoi": { slug: "cuoi-hoi", label: "ngày tốt cưới hỏi" },
  "cau-tai-loc": { slug: "cau-tai", label: "ngày tốt cầu tài" },
  "mo-hang-dau-nam": { slug: "khai-truong", label: "ngày tốt khai trương" },
  "chuyen-ban-tho": { slug: "cung-te", label: "ngày tốt cúng tế, an vị bàn thờ" },
  "mung-mot-ngay-ram": { slug: "cung-te", label: "ngày tốt cúng tế" },
};

export function viecLienQuanKhan(vanKhanSlug: string): { slug: string; label: string } | undefined {
  return VAN_KHAN_VIEC[vanKhanSlug];
}
