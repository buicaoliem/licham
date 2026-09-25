/** Dữ liệu "Ngày này năm xưa" và "Đố vui lịch sử hôm nay". Nội dung sẽ được cung cấp sau — hiện để trống. */

export type EventTag = "Chính sử" | "Truyền thuyết";

export interface HistoryEvent {
  lunarDay: number;
  lunarMonth: number;
  year: number;
  title: string;
  summary: string;
  tag: EventTag;
  sources: string[];
}

export interface QuizItem {
  question: string;
  options: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explanation: string;
  sources: string[];
}

export const EVENTS: readonly HistoryEvent[] = [];
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
