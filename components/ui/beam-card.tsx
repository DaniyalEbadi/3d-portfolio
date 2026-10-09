"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BeamCardProps {
  children?: ReactNode;
  className?: string;
  /** Small label shown above the title. */
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  /** Visual treatment for the border beam. */
  colorVariant?: "ocean" | "violet" | "coral" | "mint";
  /** Add an outer glow that breathes outward. */
  size?: "default" | "pulse-outside";
}

const BEAM_COLORS: Record<NonNullable<BeamCardProps["colorVariant"]>, string> =
  {
    ocean: "from-aqua via-transparent to-aqua",
    violet: "from-lavender via-transparent to-royal",
    coral: "from-coral via-transparent to-lavender",
    mint: "from-mint via-transparent to-aqua",
  };

/**
 * BeamCard — a glass card with a thin beam of light that travels around its
 * rounded border. An optional outer glow "breathes" outward.
 */
export function BeamCard({
  children,
  className,
  eyebrow,
  title,
  description,
  colorVariant = "violet",
  size = "default",
}: BeamCardProps) {
  return (
    <div className={cn("relative", size === "pulse-outside" && "group")}>
      {/* Outer breathing glow (pulse-outside only). */}
      {size === "pulse-outside" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-[inherit] bg-gradient-to-br opacity-40 blur-lg animate-pulse"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--brand), var(--brand-3))",
          }}
        />
      )}

      {/* 1px padding ring so the rotating beam only shows on the border. */}
      <div className="relative overflow-hidden rounded-2xl p-px">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,currentColor_80deg,transparent_160deg)]",
            BEAM_COLORS[colorVariant],
          )}
          style={{ color: "var(--brand)" }}
        />

        {/* Inner surface covers the centre, leaving only the 1px beam. */}
        <div
          className={cn(
            "relative h-full rounded-[inherit] bg-surface/90 backdrop-blur-md p-6 md:p-7",
            className,
          )}
        >
          {eyebrow && (
            <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
              {eyebrow}
            </p>
          )}
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-neutral-400">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
