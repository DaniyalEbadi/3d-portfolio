"use client";

import { type CSSProperties, type FC } from "react";
import { FlipWords } from "@/components/portfolio/flip-words";
import {
  FLIP_WORDS,
  HERO_NAME,
  HERO_ROLE,
} from "@/constants/portfolio-constants";

const delay = (seconds: number): CSSProperties => ({
  animationDelay: `calc(var(--intro-delay) + ${seconds}s)`,
});

export const HeroText: FC = () => {
  return (
    <div className="z-10 mt-24 text-center md:mt-32 md:text-start max-w-3xl">
      <div className="flex-col hidden md:flex c-space">
        <div
          className="reveal inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md px-3 py-1.5 mb-6"
          style={delay(0.05)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-mint animate-ping opacity-75" />
            <span className="relative rounded-full bg-mint h-2 w-2" />
          </span>
          <span className="text-xs tracking-[0.25em] text-neutral-300">
            آماده همکاری در پروژه‌های جدید
          </span>
        </div>

        <h1
          className="reveal text-3xl font-light text-neutral-400"
          style={delay(0.12)}
        >
          سلام، من {HERO_NAME} هستم
        </h1>

        <p
          className="reveal text-5xl lg:text-6xl font-bold mt-2 text-gradient leading-tight"
          style={delay(0.19)}
        >
          {HERO_ROLE} <br />
          می‌سازم
        </p>

        <div className="reveal" style={delay(0.26)}>
          <FlipWords
            words={[...FLIP_WORDS]}
            className="font-black text-white text-7xl lg:text-8xl"
          />
        </div>

        <p
          className="reveal text-3xl lg:text-4xl font-semibold text-neutral-300"
          style={delay(0.33)}
        >
          برای کسب‌وکارهای واقعی.
        </p>

        <div className="reveal flex flex-wrap gap-4 mt-10" style={delay(0.4)}>
          <a href="#contact" className="btn-primary">
            <span>تماس با من</span>
            <span aria-hidden>←</span>
          </a>
          <a href="#work" className="btn-ghost">
            <span>نمونه‌کارها</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col space-y-5 md:hidden px-2">
        <div
          className="reveal inline-flex self-center items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5"
          style={delay(0.05)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-mint animate-ping opacity-75" />
            <span className="relative rounded-full bg-mint h-2 w-2" />
          </span>
          <span className="text-[10px] tracking-[0.25em] text-neutral-300">
            آماده همکاری
          </span>
        </div>

        <p
          className="reveal text-3xl font-light text-neutral-400"
          style={delay(0.12)}
        >
          سلام، من {HERO_NAME.split(" ")[0]} هستم
        </p>

        <p
          className="reveal text-4xl font-bold text-gradient"
          style={delay(0.19)}
        >
          {HERO_ROLE}
        </p>

        <div className="reveal" style={delay(0.26)}>
          <FlipWords
            words={[...FLIP_WORDS]}
            className="font-bold text-white text-5xl"
          />
        </div>

        <p
          className="reveal text-3xl font-semibold text-neutral-300"
          style={delay(0.33)}
        >
          برای کسب‌وکارهای واقعی.
        </p>

        <div
          className="reveal flex flex-col gap-3 mt-4 items-center"
          style={delay(0.4)}
        >
          <a href="#contact" className="btn-primary w-full">
            <span>تماس با من</span>
            <span aria-hidden>←</span>
          </a>
          <a href="#work" className="btn-ghost w-full">
            <span>نمونه‌کارها</span>
          </a>
        </div>
      </div>
    </div>
  );
};
