export const NAV_ITEMS = [
  { label: "خانه", href: "#home" },
  { label: "درباره من", href: "#about" },
  { label: "خدمات", href: "#services" },
  { label: "نمونه‌کارها", href: "#work" },
  { label: "تماس", href: "#contact" },
] as const;

export const NAV_OFFSET = 72;

export const NAV_OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "-40% 0px -50% 0px",
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

export const NAV_SCROLLED_AT = 20;
