/** Minh hoạ SVG nguyên bản (không dùng ảnh có bản quyền) cho các trang giỗ anh hùng dân tộc thời xưa. */
export function LeIllustration() {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Minh hoạ ấn triện và thanh gươm">
      <rect x="10" y="12" width="100" height="136" rx="10" fill="none" stroke="#c0272d" strokeWidth="4" />
      <rect x="20" y="22" width="80" height="116" rx="6" fill="none" stroke="#c0272d" strokeWidth="1.5" />
      <path d="M60 36 L66 50 L63 110 L57 110 L54 50 Z" fill="#c2932f" />
      <rect x="44" y="108" width="32" height="6" rx="3" fill="#8d1a1e" />
      <rect x="57" y="114" width="6" height="16" fill="#8d1a1e" />
      <circle cx="60" cy="133" r="4" fill="#c2932f" />
    </svg>
  );
}

/** Minh hoạ cờ tròn dùng cho lưới "anh hùng dân tộc khác". */
export function LeFlagIllustration() {
  return (
    <svg width="90" height="90" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Minh hoạ cờ">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#c0272d" strokeWidth="4" />
      <path d="M44 30 V92" stroke="#8d1a1e" strokeWidth="4" />
      <path d="M46 32 Q70 26 82 36 Q70 46 46 52 Z" fill="#c0272d" />
    </svg>
  );
}
