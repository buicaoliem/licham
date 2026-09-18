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

type HeroIconDef = { label: string; content: string };

const HERO_ICON_DEFS: Record<string, HeroIconDef> = {
  "gio-duc-thanh-tran": {
    label: "Cọc gỗ Bạch Đằng",
    content:
      '<path d="M18 84h84"/><path d="M14 94q10-7 20 0t20 0 20 0 20 0"/><path d="M34 84V46l7-12 7 12v38"/><path d="M58 84V34l8-14 8 14v50"/><path d="M84 84V52l6-11 6 11v32"/>',
  },
  "gio-hai-ba-trung": {
    label: "Voi chiến và cờ",
    content:
      '<path d="M30 86V64c0-14 12-24 27-24h13c14 0 24 10 24 23v23"/><path d="M30 86h8m14 0h8m14 0h8m14 0h8" stroke-width="4"/><path d="M57 52c-6 6-6 16-1 24 3 5 1 10-4 11"/><path d="M44 40V14"/><path d="M44 16h26l-7 8 7 8H44"/>',
  },
  "le-hoi-hoa-lu": {
    label: "Bó cờ lau",
    content:
      '<path d="M40 100c6-26 12-44 18-58M60 100c0-26 1-44 3-60M80 100c-5-25-10-42-15-56"/><path d="M58 42c-9-10-9-21-1-30 9 7 11 19 5 30z"/><path d="M63 40c-4-13 1-24 12-30 4 11 0 23-9 31z"/><path d="M65 44c3-11 12-18 23-19-2 11-10 19-20 22z"/>',
  },
  "gio-ngo-quyen": {
    label: "Cọc nhọn trên sóng",
    content:
      '<path d="M30 74V44l6-12 6 12v30"/><path d="M54 78V36l6-14 6 14v42"/><path d="M78 74V48l6-11 6 11v26"/><path d="M12 86q12-8 24 0t24 0 24 0 24 0"/><path d="M12 98q12-8 24 0t24 0 24 0 24 0"/>',
  },
  "gio-ba-trieu": {
    label: "Voi một ngà",
    content:
      '<path d="M28 88V62c0-15 13-26 29-26h12c15 0 23 11 23 25v27"/><path d="M28 88h9m15 0h9m15 0h9m13 0h6" stroke-width="4"/><path d="M54 50c-7 7-7 18-1 26 4 6 1 12-5 13"/><path d="M62 54c5 6 6 14 3 20" stroke-width="2.6"/><path d="M74 44c8 2 12 7 13 14" stroke-width="2.6"/>',
  },
  "gio-le-dai-hanh": {
    label: "Núi Hoa Lư và ấn",
    content:
      '<path d="M10 74l22-30 16 20 14-22 20 32"/><path d="M10 74h72"/><rect x="70" y="72" width="38" height="26" rx="4"/><path d="M80 72v-8h18v8" /><path d="M79 85h20" stroke-width="2.6"/>',
  },
  "gio-le-loi": {
    label: "Gươm và rùa",
    content:
      '<path d="M72 14L46 54"/><path d="M66 20l8 5"/><path d="M52 44l9 6"/><path d="M44 56l-6 10 12-4z"/><path d="M22 88q10-7 20 0t20 0 20 0 18 0"/><path d="M40 80c0-9 8-15 18-15s18 6 18 15z"/><path d="M76 74h10M40 80H30" stroke-width="2.6"/>',
  },
  "gio-le-lai": {
    label: "Áo bào thay chúa",
    content:
      '<path d="M44 24l16 12 16-12 22 14-10 18-8-5v49H40V51l-8 5-10-18z"/><path d="M60 36v64" stroke-width="2.6"/><path d="M44 62h-4m36 0h4" stroke-width="2.6"/>',
  },
  "gio-nguyen-trai": {
    label: "Bút lông và cuộn thư",
    content:
      '<path d="M86 16l14 14-44 44-18 4 4-18z"/><path d="M78 24l14 14" stroke-width="2.6"/><path d="M20 88h64c6 0 10 4 10 10H30c-6 0-10-4-10-10z"/><path d="M28 88V64h34" stroke-width="2.6"/>',
  },
  "gio-quang-trung": {
    label: "Cành đào chiến thắng",
    content:
      '<path d="M24 98c14-30 26-48 40-62"/><path d="M40 74c-10-2-16-8-18-17 11 1 17 6 20 14" /><path d="M54 56c-4-11-2-20 6-27 6 9 5 19-2 27"/><path d="M60 62c9-6 18-6 26 0-7 8-17 9-26 3"/><circle cx="46" cy="66" r="4"/><circle cx="68" cy="48" r="4"/><circle cx="82" cy="72" r="4"/><path d="M22 100h76" stroke-width="2.6"/>',
  },
  "gio-phung-hung": {
    label: "Hổ (Bố Cái Đại Vương)",
    content:
      '<path d="M34 48c0-14 12-24 26-24s26 10 26 24c0 16-12 28-26 28S34 64 34 48z"/><path d="M36 32l-4-14 14 8M84 32l4-14-14 8"/><circle cx="50" cy="46" r="3.4" fill="currentColor"/><circle cx="70" cy="46" r="3.4" fill="currentColor"/><path d="M60 56v6m0 0l-8 5m8-5l8 5" /><path d="M44 62h-8m40 0h8" stroke-width="2.6"/><path d="M46 88q14 10 28 0"/>',
  },
  "gio-nguyen-trung-truc": {
    label: "Thuyền bốc lửa",
    content:
      '<path d="M22 76h72l-10 18H32z"/><path d="M58 76V34"/><path d="M58 38l24 12-24 12"/><path d="M44 34c8-6 8-14 4-20 10 4 14 14 8 22"/><path d="M14 100q12-7 24 0t24 0 24 0 20 0"/>',
  },
  "gio-tran-nhan-tong": {
    label: "Sen và núi Yên Tử",
    content:
      '<path d="M12 46l20-22 14 16 12-14 18 22" opacity=".55"/><path d="M60 92c-16 0-28-9-30-22 12-4 22-1 30 8 8-9 18-12 30-8-2 13-14 22-30 22z"/><path d="M60 78c-8-8-10-19-4-28 9 5 12 17 4 28z"/><path d="M18 98q12-6 22 0t22 0 22 0 18 0"/>',
  },
  "ngay-sinh-dai-tuong-vo-nguyen-giap": {
    label: "Mũ nan và sao",
    content:
      '<path d="M26 74c0-22 15-38 34-38s34 16 34 38z"/><path d="M18 74h84c0 6-4 10-10 10H28c-6 0-10-4-10-10z"/><path d="M38 60q22-12 44 0M34 48q26-14 52 0" stroke-width="2.2" opacity=".5"/><path d="M60 28l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z"/>',
  },
  "gio-vo-thi-sau": {
    label: "Hoa lê ki ma",
    content:
      '<path d="M60 100V56"/><path d="M60 72c-12 0-20-6-22-16 12-3 20 1 22 10"/><path d="M60 62c10-8 20-8 30-2-7 9-19 11-30 4"/><circle cx="48" cy="38" r="12"/><circle cx="74" cy="32" r="10"/><circle cx="62" cy="50" r="8"/><path d="M44 100h32" stroke-width="2.6"/>',
  },
};

/** Minh hoạ SVG riêng cho từng anh hùng dân tộc (khi có trong HERO_ICON_DEFS). */
export function LeHeroIllustration({ slug }: { slug: string }) {
  const def = HERO_ICON_DEFS[slug];
  if (!def) return null;
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={def.label}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: def.content }}
    />
  );
}

export function hasHeroIllustration(slug: string) {
  return Object.prototype.hasOwnProperty.call(HERO_ICON_DEFS, slug);
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
