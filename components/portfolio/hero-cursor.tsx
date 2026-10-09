"use client";

import { useEffect, useRef, useState, type FC } from "react";

// Hero-only custom cursor: a crisp dot with an eased follower ring that
// expands over interactive elements. Fine-pointer devices only; disabled for
// reduced motion and touch. Native cursor is hidden only while inside #home.
export const HeroCursor: FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [hot, setHot] = useState(false);
  const hotRef = useRef(false);
  const scaleRef = useRef(1);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;
    const rafEnable = requestAnimationFrame(() => setEnabled(true));

    const hero = document.getElementById("home");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      const el = e.target as HTMLElement | null;
      const overHero = !!el?.closest("#home");
      const overInteractive = !!el?.closest("a, button, [data-cursor]");
      hotRef.current = overInteractive && overHero;
      setActive(overHero);
      setHot(overInteractive && overHero);
      if (hero) hero.style.cursor = overHero ? "none" : "";
    };

    const onLeaveWindow = () => {
      setActive(false);
      if (hero) hero.style.cursor = "";
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      const target = hotRef.current ? 1.45 : 1;
      scaleRef.current += (target - scaleRef.current) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current.toFixed(3)})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      cancelAnimationFrame(rafEnable);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
      if (hero) hero.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={dot}
        className={`absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-white transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={ring}
        className={`absolute left-0 top-0 h-9 w-9 rounded-full border transition-colors duration-200 ${
          hot ? "border-coral/80" : "border-white/35"
        } ${active ? "opacity-100" : "opacity-0"}`}
        style={{ transitionProperty: "opacity, border-color" }}
      />
    </div>
  );
};
