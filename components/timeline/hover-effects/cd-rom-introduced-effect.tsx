"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createCdRomCanvasState,
  renderCdRomCanvas,
  stepCdRomCanvasState,
  type CdRomCanvasState,
} from "@/lib/timeline/hover-effects/cd-rom-canvas";

export function CdRomIntroducedEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<CdRomCanvasState | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      stateRef.current = createCdRomCanvasState(width, height);
    };

    resize();

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const tick = (time: number) => {
      const state = stateRef.current;
      const parent = canvas.parentElement;

      if (state && parent) {
        const { width, height } = parent.getBoundingClientRect();
        stepCdRomCanvasState(state, width, height, time - lastTime);
        renderCdRomCanvas(context, width, height, state);
      }

      lastTime = time;
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,220,255,0.18),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(255,180,220,0.14),transparent_50%)]"
        aria-hidden
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="timeline-hover-prismatic-sweep absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
