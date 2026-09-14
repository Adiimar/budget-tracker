// Icon paths (as simple SVG path data) and color themes per category,
// styled as frosted glass tiles with a colored icon.

export const CATEGORY_ICONS = {
  Food: {
    color: 'text-slate-100',
    icon: (
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
    ),
  },
  Transport: {
    color: 'text-slate-300',
    icon: (
      <>
        <path d="M3 11l1.5-4.5A2 2 0 0 1 6.4 5h11.2a2 2 0 0 1 1.9 1.5L21 11" />
        <rect x="3" y="11" width="18" height="6" rx="2" />
        <circle cx="7.5" cy="20" r="1.5" />
        <circle cx="16.5" cy="20" r="1.5" />
      </>
    ),
  },
  Entertainment: {
    color: 'text-zinc-300',
    icon: (
      <path d="M12 3v18M3 8h18M3 8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4M3 8v9a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V8" />
    ),
  },
  Utilities: {
    color: 'text-stone-300',
    icon: <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />,
  },
  Health: {
    color: 'text-teal-400',
    icon: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
  },
  Shopping: {
    color: 'text-neutral-300',
    icon: <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4M3 6h18M16 10a4 4 0 0 1-8 0" />,
  },
  Other: {
    color: 'text-zinc-400',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
      </>
    ),
  },
};

export const getCategoryStyle = (category) => CATEGORY_ICONS[category] || CATEGORY_ICONS.Other; 