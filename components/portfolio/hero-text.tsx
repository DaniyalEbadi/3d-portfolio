"use client";

import { type CSSProperties, type FC } from "react";
import { FlipWords } from "@/components/portfolio/flip-words";
import { GlitchText } from "@/components/text/glitch-text";
import { StarBorder } from "@/components/ui/star-border";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FLIP_WORDS } from "@/constants/portfolio-constants";

const delay = (seconds: number): CSSProperties => ({
  animationDelay: `calc(var(--intro-delay) + ${seconds}s)`,
});

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

const HEADLINE = "یه برنامه‌نویس که عاشق تبدیل ایده‌ها به واقعیته :) 👨🏻‍💻";

const StarGhostButton: FC<{ full?: boolean }> = ({ full }) => (
  <StarBorder
    color="var(--brand)"
    speed={6}
    thickness={2}
    radius={999}
    glow={12}
    className={full ? "w-full bg-transparent p-0" : "bg-transparent p-0"}
  >
    <a href="#work" className={full ? "btn-ghost w-full" : "btn-ghost"}>
      <span>نمونه‌کارها</span>
    </a>
  </StarBorder>
);

export const HeroText: FC = () => {
  return (
    <div className="z-10 text-center md:text-start">
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
          className="reveal text-4xl lg:text-5xl font-bold leading-tight"
          style={delay(0.19)}
        >
          <GlitchText text={HEADLINE} />
        </h1>

        <div className="reveal" style={delay(0.26)}>
          <FlipWords
            words={[...FLIP_WORDS]}
            className="font-black text-white text-4xl lg:text-5xl"
          />
        </div>

        <div className="reveal flex flex-wrap items-center gap-4 mt-10" style={delay(0.4)}>
          <StarBorder
            color="var(--brand)"
            speed={6}
            thickness={2}
            radius={999}
            glow={12}
            className="bg-transparent p-0"
          >
            <ShimmerButton onClick={scrollToContact}>
              <span>تماس با من</span>
              <span aria-hidden>←</span>
            </ShimmerButton>
          </StarBorder>
          <StarGhostButton />
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

        <h1 className="reveal text-3xl font-bold leading-tight" style={delay(0.19)}>
          <GlitchText text={HEADLINE} />
        </h1>

        <div className="reveal" style={delay(0.26)}>
          <FlipWords
            words={[...FLIP_WORDS]}
            className="font-bold text-white text-3xl"
          />
        </div>

        <div
          className="reveal flex flex-col gap-3 mt-4 items-center"
          style={delay(0.4)}
        >
          <StarBorder
            color="var(--brand)"
            speed={6}
            thickness={2}
            radius={999}
            glow={12}
            className="w-full bg-transparent p-0"
          >
            <ShimmerButton className="w-full" onClick={scrollToContact}>
              <span>تماس با من</span>
              <span aria-hidden>←</span>
            </ShimmerButton>
          </StarBorder>
          <StarGhostButton full />
        </div>
      </div>
    </div>
  );
};
