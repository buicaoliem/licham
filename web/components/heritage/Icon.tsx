/** Bộ icon nét mảnh dùng tiết chế trong giao diện Contemporary Heritage. */
const PATHS = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  chevron: "M9 6l6 6-6 6",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  calendar: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2",
  calPlus: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M8 3v4M16 3v4M12 13v5M9.5 15.5h5",
  calMinus: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M8 3v4M16 3v4M9.5 15.5h5",
  hourglass: "M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  history: "M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4M12 8v4l3 2",
  cake: "M5 21h14M6 21v-7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7M6 16c2 1 4 1 6 0s4-1 6 0M12 12V9M12 6.5c.8-.8.8-1.8 0-2.5-.8.7-.8 1.7 0 2.5z",
  swap: "M7 7h13M16 3l4 4-4 4M17 17H4M8 13l-4 4 4 4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  lotus:
    "M12 20c-4 0-8-2.5-9-7 3 0 5.5 1 7 3M12 20c4 0 8-2.5 9-7-3 0-5.5 1-7 3M12 20c-2.5-2-3.5-5-3.5-8S10 6 12 4c2 2 3.5 5 3.5 8s-1 6-3.5 8z",
  bowl: "M3 11h18a9 9 0 0 1-18 0zM8 21h8M9 7c0-1.5 1-2 1-3.5M13 7c0-1.5 1-2 1-3.5",
  scroll: "M8 3h10a2 2 0 0 1 2 2v12M8 3a2 2 0 0 0-2 2v14a2 2 0 0 1-2 2h11a2 2 0 0 0 2-2V5M8 3a2 2 0 0 1 2 2M10 8h5M10 12h5M10 16h3",
  note: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8h.01M11 12h1v5h1",
  question: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14M12 17h.01",
  list: "M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  home: "M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-5h4v5",
  rings: "M9 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM15 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM9 6l1.5-3h3L15 6",
  clover:
    "M12 12c-2.5 0-4.5-2-4.5-4.5S9.5 3 12 5c2.5-2 4.5 0 4.5 2.5S14.5 12 12 12zM12 12c0 2.5-2 4.5-4.5 4.5S3 14.5 5 12c-2-2.5 0-4.5 2.5-4.5M12 12c0 2.5 2 4.5 4.5 4.5S21 14.5 19 12c2-2.5 0-4.5-2.5-4.5M12 12c2.5 0 4.5 2 4.5 4.5M12 12c-2.5 0-4.5 2-4.5 4.5",
  yinyang: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 3a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 9M12 7.5h.01M12 16.5h.01",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  temple: "M3 21h18M5 21v-8M19 21v-8M9 21v-5h6v5M2 13l10-5 10 5M5 10l7-4 7 4M12 3v3",
  printer: "M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z",
  download: "M12 3v12M7 10l5 5 5-5M4 20h16",
  book: "M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14C17 4 14 4.5 12 6zM12 6v14",
  flame: "M12 21c-3.9 0-7-2.7-7-6.5 0-3 2-5 3.5-6.5.3 1.8 1.2 3 2.5 3.5C11 8 11.5 5 14 3c.5 3 4 5.5 4 10 0 4.5-2.7 8-6 8z",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, stroke = 1.6, className }: { name: IconName; size?: number; stroke?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
