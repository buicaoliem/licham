/** Dữ liệu "Ngày này năm xưa" và "Đố vui lịch sử hôm nay". Sự kiện sinh bởi scripts/import-van-hoa.ts; câu đố chưa có. */
import { NGAY_NAY_NAM_XUA } from "./data/ngay-nay-nam-xua.generated";

export type EventTag = "Chính sử" | "Truyền thuyết" | "Tín ngưỡng";

export interface HistoryEvent {
  lunarDay: number;
  lunarMonth: number;
  year: number;
  /** Năm hiển thị, vd. "40", "938", "2879 TCN". */
  yearText?: string;
  title: string;
  summary: string;
  tag: EventTag;
  sources: string[];
  /** Trang năm can chi chứa sự kiện. */
  href?: string;
}

export interface QuizItem {
  question: string;
  options: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explanation: string;
  sources: string[];
}

export const EVENTS: readonly HistoryEvent[] = NGAY_NAY_NAM_XUA;
export const QUIZZES: readonly QuizItem[] = [];

/** Sự kiện trùng ngày-tháng âm lịch của hôm nay. */
export function eventsForLunar(lunarDay: number, lunarMonth: number, list: readonly HistoryEvent[] = EVENTS): HistoryEvent[] {
  return list.filter((e) => e.lunarDay === lunarDay && e.lunarMonth === lunarMonth);
}

/** Chọn câu đố theo ngày (ổn định trong cả ngày): số ngày Julian mod số câu. */
export function quizForDay(dayNumber: number, list: readonly QuizItem[] = QUIZZES): QuizItem | null {
  if (list.length === 0) return null;
  return list[((dayNumber % list.length) + list.length) % list.length] ?? null;
}
