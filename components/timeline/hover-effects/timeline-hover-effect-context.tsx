"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AnimationLayer } from "@/components/animations/animation-layer";
import { getAnimationIdForEvent } from "@/lib/animations/registry";

type TimelineHoverEffectContextValue = {
  hoveredEventId: string | null;
  setHoveredEventId: (eventId: string | null) => void;
};

const TimelineHoverEffectContext = createContext<TimelineHoverEffectContextValue | null>(null);

type TimelineHoverEffectProviderProps = {
  children: ReactNode;
  /** Open modal event — keeps animations visible behind the modal on mobile. */
  modalEventId?: string | null;
};

export function TimelineHoverEffectProvider({
  children,
  modalEventId = null,
}: TimelineHoverEffectProviderProps) {
  const [hoveredEventId, setHoveredEventIdState] = useState<string | null>(null);

  const setHoveredEventId = useCallback((eventId: string | null) => {
    setHoveredEventIdState(eventId);
  }, []);

  const value = useMemo(
    () => ({
      hoveredEventId,
      setHoveredEventId,
    }),
    [hoveredEventId, setHoveredEventId],
  );

  const hoverAnimationId = hoveredEventId ? getAnimationIdForEvent(hoveredEventId) : null;
  const globalAnimationId = hoverAnimationId && !modalEventId ? hoverAnimationId : null;

  return (
    <TimelineHoverEffectContext.Provider value={value}>
      <AnimationLayer animationId={globalAnimationId} variant="fullscreen" />
      {children}
    </TimelineHoverEffectContext.Provider>
  );
}

export function useTimelineHoverEvent() {
  const context = useContext(TimelineHoverEffectContext);

  if (!context) {
    throw new Error("useTimelineHoverEvent must be used within TimelineHoverEffectProvider");
  }

  return context;
}
