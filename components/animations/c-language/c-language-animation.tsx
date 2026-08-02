"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createCLanguageCanvasState,
  renderCLanguageCanvas,
  stepCLanguageCanvasState,
  type CLanguageCanvasState,
} from "@/lib/animations/c-language";
import { cn } from "@/lib/cn";

type CLanguageAnimationProps = {
  className?: string;
};

export function CLanguageAnimation({ className }: CLanguageAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<CLanguageCanvasState | null>(null);
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

      stateRef.current = createCLanguageCanvasState(width, height);
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
        stepCLanguageCanvasState(state, width, height, time - lastTime);
        renderCLanguageCanvas(context, width, height, state);
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
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,127,212,0.14),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(232,162,59,0.12),transparent_50%)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
