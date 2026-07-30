"use client";

import { useEffect, useState } from "react";

import { CdRomIntroducedEffect } from "@/components/timeline/hover-effects/cd-rom-introduced-effect";
import { cn } from "@/lib/cn";
import { getTimelineHoverEffectId } from "@/lib/timeline/hover-effects";

type TimelineHoverEffectsLayerProps = {
  eventId: string | null;
  className?: string;
};

export function TimelineHoverEffectsLayer({ eventId, className }: TimelineHoverEffectsLayerProps) {
  const nextEffectId = eventId ? getTimelineHoverEffectId(eventId) : null;
  const [visibleEffectId, setVisibleEffectId] = useState(nextEffectId);
  const [isVisible, setIsVisible] = useState(Boolean(nextEffectId));

  useEffect(() => {
    if (nextEffectId) {
      setVisibleEffectId(nextEffectId);
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    setIsVisible(false);
    const timeout = window.setTimeout(() => {
      setVisibleEffectId(null);
    }, 450);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [nextEffectId]);

  if (!visibleEffectId) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[4] overflow-hidden transition-opacity duration-500 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      aria-hidden
    >
      {visibleEffectId === "cd-rom-introduced" && <CdRomIntroducedEffect />}
    </div>
  );
}
