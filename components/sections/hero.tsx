"use client";

import { type FC } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HeroText } from "@/components/portfolio/hero-text";
import { ParallaxBackground } from "@/components/portfolio/parallax-background";
import { HeroCursor } from "@/components/portfolio/hero-cursor";
import { useDeferred3D } from "@/hooks/use-deferred-3d";

const HeroScene = dynamic(
  () => import("@/components/sections/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

// Static, feathered portrait for devices without WebGL / reduced motion, so the
// hero still leads with the real photograph and stays fully readable.
const HeroPortraitFallback: FC = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
    <div className="absolute left-1/2 top-1/2 h-[58vh] w-[46vh] max-w-[86vw] -translate-x-1/2 -translate-y-1/2 md:left-[27%]">
      <div className="absolute -inset-10 rounded-full bg-lavender/20 blur-3xl" />
      <Image
        src="/assets/portrait.webp"
        alt="دانیال عبادی"
        fill
        priority
        sizes="(max-width: 768px) 80vw, 36vw"
        className="object-cover object-top [mask-image:radial-gradient(ellipse_58%_68%_at_50%_40%,black_52%,transparent_84%)]"
      />
    </div>
  </div>
);

export const Hero: FC = () => {
  const showScene = useDeferred3D();

  return (
    <section
      id="home"
      className="relative flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start"
    >
      <HeroText />
      <ParallaxBackground />
      {showScene ? <HeroScene /> : <HeroPortraitFallback />}
      <HeroCursor />

      <a
        href="#about"
        className="reveal absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] tracking-[0.4em] text-neutral-400 hover:text-white transition-colors z-10 cursor-pointer"
        style={{ animationDelay: "calc(var(--intro-delay) + 1.2s)" }}
        aria-label="پایین بروید"
      >
        <span>پایین</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/10">
          <span className="scroll-hint-sweep absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-coral to-transparent" />
        </span>
      </a>
    </section>
  );
};
