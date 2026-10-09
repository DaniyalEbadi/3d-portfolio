import {
  HERO_LOCATION,
  HERO_NAME,
  HERO_NAME_LATIN,
  HERO_ROLE,
} from "./hero-constants";
import { CONTACT_EMAIL, MY_SOCIALS } from "./social-constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = `${HERO_NAME} | ${HERO_ROLE}`;

export const SITE_TITLE = `${HERO_NAME} | ${HERO_ROLE}`;

export const SITE_DESCRIPTION =
  "توسعه‌دهنده بک‌اند با تمرکز بر Python، Django، DRF و FastAPI؛ طراحی API، مدل‌سازی داده، PostgreSQL و سامانه‌های واقعی. ساکن تهران و آماده همکاری از راه دور.";

export const SITE_TAGLINE =
  "سرویس‌های وب و APIهای مقیاس‌پذیر با پایتون، جنگو و FastAPI.";

export const OG_IMAGE = "/og.jpg";
export const OG_IMAGE_ALT = `${HERO_NAME}، ${HERO_ROLE} – نمونه‌کار`;
export const OG_LOCALE = "fa_IR";

export const OG_IMAGES = [
  {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: OG_IMAGE_ALT,
  },
];

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

export const SITE_KEYWORDS = [
  HERO_NAME,
  HERO_NAME_LATIN,
  "Danial Ebadi",
  "توسعه‌دهنده بک‌اند",
  "Backend Developer",
  "Python Developer",
  "Django Developer",
  "Django REST Framework",
  "FastAPI Developer",
  "پایتون",
  "جنگو",
  "طراحی API",
  "پایگاه‌داده",
  "PostgreSQL",
  "توسعه نرم‌افزار",
  "نمونه‌کار برنامه‌نویس",
  "دورکاری",
  HERO_LOCATION,
  "ایران",
];

export const HOME_TITLE = `${HERO_NAME} | ${HERO_ROLE} پایتون و جنگو`;

export const HOME_DESCRIPTION =
  "دانیال عبادی، توسعه‌دهنده بک‌اند در تهران؛ ساخت API، سامانه‌های داده‌محور و وب‌سرویس‌ها با Python، Django، DRF و FastAPI. آماده همکاری از راه دور.";

export const ADMIN_TITLE = "Contact submissions";

export const ADMIN_DESCRIPTION =
  "Private dashboard for contact form submissions. Not part of the public site.";

export const ADMIN_LOGIN_TITLE = "Sign in";

export const ADMIN_LOGIN_DESCRIPTION =
  "Sign in to the private contact submissions dashboard.";

export const SITE_SECTIONS = [
  {
    name: "خانه",
    hash: "#home",
    description: `${HERO_NAME}، ${HERO_ROLE} با تمرکز بر ساخت سرویس‌های وب و API.`,
  },
  {
    name: "درباره من",
    hash: "#about",
    description: `پیشینه، ابزارها و سبک کاری ${HERO_NAME}، ${HERO_ROLE} ساکن ${HERO_LOCATION}.`,
  },
  {
    name: "خدمات",
    hash: "#services",
    description:
      "وب‌اپلیکیشن، اپلیکیشن موبایل، API و مشاوره فنی برای استارتاپ‌ها و تیم‌های محصول.",
  },
  {
    name: "نمونه‌کارها",
    hash: "#work",
    description:
      "پروژه‌های منتخب و مطالعات موردی ساخته‌شده با React، Next.js، React Native و Node.js.",
  },
  {
    name: "نظرات",
    hash: "#testimonials",
    description: `آنچه مشتریان و همکاران درباره همکاری با ${HERO_NAME} می‌گویند.`,
  },
  {
    name: "تماس",
    hash: "#contact",
    description: `برای همکاری پروژه‌ای، قراردادی یا تمام‌وقت با ${HERO_NAME} در تماس باشید.`,
  },
] as const;

export const SOCIAL_PROFILES = MY_SOCIALS.map((social) => social.href);

export const CONTACT_POINT_EMAIL = CONTACT_EMAIL;
