"use client";

import { useEffect, useState } from "react";

import { RenderAnimation } from "@/components/animations/render-animation";
import { cn } from "@/lib/cn";
import type { AnimationId } from "@/lib/animations/registry";

type AnimationLayerProps = {
  animationId: AnimationId | null;
  variant?: "fullscreen" | "contained";
  className?: string;
};

export function AnimationLayer({
  animationId,
  variant = "contained",
  className,
}: AnimationLayerProps) {
  const [visibleAnimationId, setVisibleAnimationId] = useState(animationId);
  const [isVisible, setIsVisible] = useState(Boolean(animationId));

  useEffect(() => {
    if (animationId) {
      const frame = window.requestAnimationFrame(() => {
        setVisibleAnimationId(animationId);
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const hideFrame = window.requestAnimationFrame(() => {
      setIsVisible(false);
    });
    const timeout = window.setTimeout(() => {
      setVisibleAnimationId(null);
    }, 450);

    return () => {
      window.cancelAnimationFrame(hideFrame);
      window.clearTimeout(timeout);
    };
  }, [animationId]);

  if (!visibleAnimationId) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none overflow-hidden transition-opacity duration-500 ease-out",
        variant === "fullscreen" && "fixed inset-0 z-[5]",
        variant === "contained" && "absolute inset-0",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      aria-hidden
    >
      <RenderAnimation animationId={visibleAnimationId} />
    </div>
  );
}
