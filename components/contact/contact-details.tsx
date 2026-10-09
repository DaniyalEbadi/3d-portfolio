"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { revealProps } from "@/animations/scroll-animations";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  HERO_LOCATION,
} from "@/constants/portfolio-constants";
import { ContactInfoCard } from "./contact-info-card";

export const ContactDetails: FC = () => (
  <motion.div {...revealProps()} className="lg:col-span-5">
    <p className="text-eyebrow">بیایید صحبت کنیم</p>
    <h2 className="text-heading mt-3">
      ایده‌ای دارید؟ <br />
      <span className="text-gradient">بیایید اجرایش کنیم.</span>
    </h2>
    <p className="mt-4 leading-relaxed text-neutral-400">
      چه در حال راه‌اندازی یک محصول جدید باشید، چه در حال گسترش آنچه دارید، و
      چه بخواهید پروژه‌ای متوقف‌شده را به حرکت درآورید، پیام بدهید؛ حداکثر تا ۲۴
      ساعت پاسخ می‌دهم.
    </p>

    <div className="mt-8 space-y-4">
      <ContactInfoCard
        icon="✉"
        label="ایمیل"
        value={CONTACT_EMAIL}
        href={`mailto:${CONTACT_EMAIL}`}
        gradient="from-coral/30 to-lavender/30"
      />
      <ContactInfoCard
        icon="☎"
        label="تلفن"
        value={CONTACT_PHONE}
        href={`tel:${CONTACT_PHONE}`}
        gradient="from-aqua/30 to-lavender/30"
      />
      <ContactInfoCard
        icon="⌖"
        label="موقعیت"
        value={`${HERO_LOCATION} · آماده همکاری از راه دور`}
        gradient="from-aqua/30 to-mint/30"
      />
      <ContactInfoCard
        icon="⏱"
        label="زمان پاسخ‌گویی"
        value="معمولاً حداکثر ۲۴ ساعت"
        gradient="from-royal/30 to-fuchsia/30"
      />
    </div>
  </motion.div>
);
