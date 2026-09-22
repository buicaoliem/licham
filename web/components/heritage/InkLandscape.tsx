/**
 * Tranh sơn thủy tối giản (SVG nội tuyến) cho hero: dãy núi nhiều lớp tan vào sương, mặt trời son,
 * mái đình nhỏ. Dùng tiết chế, chỉ để trang trí — aria-hidden.
 */
export function InkLandscape({ className, idPrefix = "ink" }: { className?: string; idPrefix?: string }) {
  const g = (n: string) => `${idPrefix}-${n}`;
  return (
    <svg className={className} viewBox="0 0 800 300" preserveAspectRatio="xMaxYMin slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g("far")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fb0a8" stopOpacity="0.5" />
          <stop offset="0.7" stopColor="#c9d2cc" stopOpacity="0.12" />
          <stop offset="1" stopColor="#faf8f4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={g("mid")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f877d" stopOpacity="0.55" />
          <stop offset="0.75" stopColor="#a9b8b0" stopOpacity="0.1" />
          <stop offset="1" stopColor="#faf8f4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={g("near")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3c5a51" stopOpacity="0.72" />
          <stop offset="0.6" stopColor="#6f877d" stopOpacity="0.22" />
          <stop offset="1" stopColor="#faf8f4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={g("bank")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#316d60" stopOpacity="0.28" />
          <stop offset="1" stopColor="#316d60" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id={g("sun")} cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#d0655b" />
          <stop offset="1" stopColor="#b94038" />
        </radialGradient>
      </defs>
      <circle cx="628" cy="74" r="30" fill={`url(#${g("sun")})`} opacity="0.62" />
      <path
        d="M0 232C80 204 140 172 210 186C262 196 300 150 360 140C410 132 450 176 500 170C560 164 600 122 660 118C720 114 760 150 800 160V300H0Z"
        fill={`url(#${g("far")})`}
      />
      <path
        d="M170 300V252C240 232 280 190 330 196C372 201 392 230 432 222C482 212 520 150 580 150C620 150 640 190 680 196C720 202 760 180 800 190V300Z"
        fill={`url(#${g("mid")})`}
      />
      <path
        d="M460 300C520 268 560 212 606 164C636 132 660 102 690 98C720 94 742 128 762 150C780 170 792 180 800 184V300Z"
        fill={`url(#${g("near")})`}
      />
      {/* mái đình trên đỉnh núi gần */}
      <g fill="#2f4a42" opacity="0.7" transform="translate(690 96) scale(1.4) translate(-690 -96)">
        <rect x="684" y="86" width="12" height="10" />
        <path d="M672 88C682 84 698 84 708 88L703 85C696 81 684 81 677 85Z" />
        <rect x="686" y="76" width="8" height="7" />
        <path d="M677 78C684 74 696 74 703 78L699 75.5C694 72.5 686 72.5 681 75.5Z" />
        <rect x="689.4" y="68" width="1.2" height="5" />
      </g>
      {/* thông trên sườn núi */}
      <g stroke="#2f4a42" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" fill="none">
        <path d="M646 130v14M640 136l6-4 6 4M638 141l8-5 8 5" />
        <path d="M728 118v12M723 123l5-3.5 5 3.5M721 128l7-4.5 7 4.5" />
      </g>
      <path d="M300 300C400 280 520 286 620 272C700 262 760 264 800 258V300Z" fill={`url(#${g("bank")})`} />
      {/* chim bay */}
      <g stroke="#3b3e37" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.45">
        <path d="M520 62q5-5 10 0q5-5 10 0" />
        <path d="M548 48q4-4 8 0q4-4 8 0" />
      </g>
    </svg>
  );
}
