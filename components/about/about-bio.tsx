"use client";

import { useRef, type FC } from "react";
import { motion, useInView } from "motion/react";
import { fadeInUp } from "@/animations/scroll-animations";
import { HERO_NAME } from "@/constants/hero-constants";

export const AboutBio: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.7 }}
      className="glass gradient-border p-8 md:p-10 lg:col-span-7"
    >
      <h3 className="mb-4 text-2xl font-bold md:text-3xl">
        {HERO_NAME} · تهران
      </h3>
      <p className="text-base leading-relaxed text-neutral-300 md:text-lg">
        توسعه‌دهنده بک‌اند با تمرکز اصلی بر{" "}
        <span className="font-semibold text-white">Python، Django و FastAPI</span>{" "}
        و تجربه عملی در توسعه سامانه‌های واقعی، طراحی و پیاده‌سازی API، مدل‌سازی
        داده، احراز هویت، کنترل دسترسی، تست و استقرار. همچنین توانایی توسعه
        فرانت‌اند با{" "}
        <span className="font-semibold text-white">React و Next.js</span> را
        دارم و می‌توانم در ساخت محصولات وب، از طراحی معماری بک‌اند تا پیاده‌سازی
        رابط کاربری، مشارکت کنم.
      </p>
      <p className="mt-4 leading-relaxed text-neutral-400">
        در مسیر حرفه‌ای خود، از پشتیبانی نرم‌افزار و مدیریت پایگاه داده (DBA) تا
        توسعه Python و هوش مصنوعی در فرابک تجربه کسب کرده‌ام. تمرکز من بر طراحی
        معماری ماژولار، کدنویسی قابل نگهداری، امنیت، تست‌پذیری و ساخت راهکارهای
        مقیاس‌پذیر و کاربردی است.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#contact" className="btn-primary">
          <span>شروع پروژه</span>
          <span aria-hidden>←</span>
        </a>
        <a href="#work" className="btn-ghost">
          <span>مشاهده نمونه‌کارها</span>
        </a>
      </div>
    </motion.div>
  );
};
