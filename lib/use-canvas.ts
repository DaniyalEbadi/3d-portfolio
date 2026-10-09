"use client";

import { useEffect, useRef } from "react";

interface CanvasState {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

interface UseCanvasOptions<State> {
  /** Build the initial mutable state (kept in a ref across renders). */
  init: () => State;
  /** Draw one frame. Called every animation frame with elapsed seconds. */
  draw: (canvas: CanvasState, state: State, time: number) => void;
  /** Receive pointer position (local px) and whether it is inside the canvas. */
  onPointer?: (state: State, x: number, y: number, inside: boolean) => void;
}

/**
 * useCanvas — mounts a 2D canvas that redraws every frame and tracks the
 * pointer, without re-rendering React. State lives in a ref; the latest `draw`
 * and `onPointer` closures are always called via refs so they never go stale.
 */
export function useCanvas<State>({
  init,
  draw,
  onPointer,
}: UseCanvasOptions<State>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State | null>(null);
  const drawRef = useRef(draw);
  const pointerRef = useRef(onPointer);

  // Keep the latest closures in refs so the animation loop never calls a stale
  // `draw` / `onPointer`, without re-subscribing on every render.
  useEffect(() => {
    drawRef.current = draw;
    pointerRef.current = onPointer;
  }, [draw, onPointer]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (stateRef.current === null) stateRef.current = init();
    const state = stateRef.current;

    let width = 0;
    let height = 0;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now: number) => {
      drawRef.current({ ctx, width, height }, state, (now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current?.(state, e.clientX - rect.left, e.clientY - rect.top, true);
    };
    const leave = () => {
      pointerRef.current?.(state, -9999, -9999, false);
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canvasRef;
}
