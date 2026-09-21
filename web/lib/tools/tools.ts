import type { Metadata } from "next";
import { type SearchParams, hasAnyParam } from "./params";

export interface ToolDef {
  slug: string;
  href: string;
  /** Tên ngắn, dùng trong menu, breadcrumb và link liên quan. */
  name: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** Các query param công cụ đọc; có một trong số này thì trang là trạng thái nhập liệu (noindex). */
  params: readonly string[];
}

export const TOOLS: readonly ToolDef[] = [
  {
    slug: "dem-ngay",
    href: "/cong-cu/dem-ngay/",
    name: "Đếm ngày giữa hai ngày",
    h1: "Đếm số ngày giữa hai ngày",
    title: "Đếm ngày giữa hai ngày - Tính số ngày, tuần, tháng",
    description: "Tính từ ngày A đến ngày B có bao nhiêu ngày, tuần, tháng và bao nhiêu ngày làm việc, kèm thứ và ngày âm lịch của hai đầu.",
    intro: "Chọn hai ngày dương lịch để biết khoảng cách giữa chúng theo ngày, tuần, tháng và ngày làm việc.",
    params: ["tu", "den"],
  },
  {
    slug: "ngay-sau",
    href: "/cong-cu/ngay-sau/",
    name: "Bao nhiêu ngày nữa là ngày nào",
    h1: "Bao nhiêu ngày nữa là ngày nào?",
    title: "Bao nhiêu ngày nữa là ngày nào - Tính ngày sau",
    description: "Nhập ngày bắt đầu và số ngày để biết ngày kết quả, thứ mấy và ngày âm lịch tương ứng.",
    intro: "Cộng thêm một số ngày vào ngày bắt đầu để biết ngày kết quả rơi vào thứ mấy và là ngày bao nhiêu âm lịch.",
    params: ["tu", "so"],
  },
  {
    slug: "ngay-truoc",
    href: "/cong-cu/ngay-truoc/",
    name: "Bao nhiêu ngày trước là ngày nào",
    h1: "Bao nhiêu ngày trước là ngày nào?",
    title: "Bao nhiêu ngày trước là ngày nào - Tính ngày trước",
    description: "Nhập ngày bắt đầu và số ngày để biết ngày đã qua, thứ mấy và ngày âm lịch tương ứng.",
    intro: "Lùi lại một số ngày từ ngày bắt đầu để biết ngày kết quả rơi vào thứ mấy và là ngày bao nhiêu âm lịch.",
    params: ["tu", "so"],
  },
  {
    slug: "con-bao-nhieu-ngay",
    href: "/cong-cu/con-bao-nhieu-ngay/",
    name: "Còn bao nhiêu ngày nữa",
    h1: "Còn bao nhiêu ngày nữa?",
    title: "Còn bao nhiêu ngày nữa đến Tết, Trung Thu, ngày lễ",
    description: "Đếm ngược số ngày từ hôm nay đến Tết, Trung Thu, ngày lễ hoặc một ngày bất kỳ, kèm ngày dương và âm lịch.",
    intro: "Chọn một ngày lễ hoặc nhập ngày bất kỳ để biết còn bao nhiêu ngày kể từ hôm nay (giờ Việt Nam).",
    params: ["den", "ngay"],
  },
  {
    slug: "da-bao-nhieu-ngay",
    href: "/cong-cu/da-bao-nhieu-ngay/",
    name: "Đã bao nhiêu ngày kể từ",
    h1: "Đã bao nhiêu ngày kể từ một ngày?",
    title: "Đã bao nhiêu ngày kể từ ngày - Tính số ngày đã qua",
    description: "Tính từ một ngày trong quá khứ đến hôm nay đã bao nhiêu ngày, tuần, tháng, năm và bao nhiêu ngày làm việc.",
    intro: "Nhập một ngày trong quá khứ để biết đã trôi qua bao nhiêu ngày tính đến hôm nay (giờ Việt Nam).",
    params: ["tu"],
  },
  {
    slug: "tuoi-theo-ngay-sinh",
    href: "/cong-cu/tuoi-theo-ngay-sinh/",
    name: "Tuổi theo ngày sinh",
    h1: "Tính tuổi theo ngày sinh",
    title: "Tính tuổi theo ngày sinh - Số năm, tháng, ngày đã sống",
    description: "Nhập ngày sinh để biết số năm, tháng, ngày và tổng số ngày đã sống, cùng ngày sinh nhật tiếp theo.",
    intro: "Tính tuổi dương theo lịch và tổng số ngày đã sống. Công cụ này chỉ tính khoảng thời gian, không xem tuổi hay bói.",
    params: ["sinh", "den"],
  },
];

export function toolBySlug(slug: string): ToolDef {
  const t = TOOLS.find((x) => x.slug === slug);
  if (!t) throw new Error(`Không có công cụ ${slug}`);
  return t;
}

export function generateToolMetadata(tool: ToolDef, sp: SearchParams): Metadata {
  return {
    title: `${tool.title} | Lịch Âm`,
    description: tool.description,
    alternates: { canonical: tool.href },
    // Trạng thái nhập liệu (?tu=...) không được index; canonical luôn trỏ về URL sạch.
    ...(hasAnyParam(sp, tool.params) ? { robots: { index: false, follow: true } } : {}),
  };
}

export const TOOLS_HUB = {
  href: "/cong-cu/",
  title: "Công cụ ngày tháng - Đếm ngày, tính ngày, tính tuổi",
  description: "Bộ công cụ tính toán ngày tháng: đếm số ngày giữa hai ngày, bao nhiêu ngày nữa là ngày nào, đếm ngược ngày lễ, tính tuổi theo ngày sinh.",
} as const;
