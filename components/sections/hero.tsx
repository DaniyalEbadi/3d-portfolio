"use client";

import { type FC } from "react";
import { Squares } from "@/components/backgrounds/squares";
import { ProfileCard } from "@/components/ui/profile-card";
import { HeroText } from "@/components/portfolio/hero-text";
import { HeroCursor } from "@/components/portfolio/hero-cursor";

export const Hero: FC = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-primary"
    >
      {/* Animated grid backdrop. */}
      <Squares
        size={28}
        speed={0.6}
        direction="diagonal"
        lineColor="139,160,255"
        hoverColor="196,181,253"
        reach={80}
        className="absolute inset-0 h-full w-full"
      />

      {/* RTL: first flex child sits on the right (text), second on the left
          (profile card). On mobile only the text shows, centered. */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center gap-12 px-6 py-28 md:justify-between md:px-10">
        <div className="w-full max-w-2xl">
          <HeroText />
        </div>

        <div className="hidden shrink-0 md:block">
          <ProfileCard
            name="دانیال عبادی"
            title="برنامه نویس"
            handle="danial"
            status="آنلاین"
            avatarUrl="/assets/portrait.webp"
            showContact
            contactLabel="پیام بده"
            onContact={scrollToContact}
            tilt={16}
            sheen={0.7}
            glare
            behindGlow
            color="#7a57db"
            color2="#33c2cc"
            radius={22}
            className="max-w-[420px]"
          />
        </div>
      </div>

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
