import { twMerge } from "tailwind-merge";

type ClassValue = string | number | false | null | undefined | ClassValue[];

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input && input !== 0) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else {
      classes.push(String(input));
    }
  }
  return twMerge(classes.join(" "));
}

/** Clamp a number to the inclusive [min, max] range. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** True when the user has requested reduced motion (safe during SSR). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
