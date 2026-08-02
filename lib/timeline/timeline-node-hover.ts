import { useCallback, useRef, useState } from "react";

import { TIMELINE_HOVER_CLEAR_DELAY_MS } from "./constants";
import type { PlottedEvent } from "./plot-data";

type UseTimelineNodeHoverOptions = {
  onHoverIdChange?: (id: string | null) => void;
};

export function useTimelineNodeHover(options: UseTimelineNodeHoverOptions = {}) {
  const { onHoverIdChange } = options;
  const [hovered, setHovered] = useState<PlottedEvent | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const clearHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledHoverClear = useCallback(() => {
    if (clearHoverTimeoutRef.current !== null) {
      clearTimeout(clearHoverTimeoutRef.current);
      clearHoverTimeoutRef.current = null;
    }
  }, []);

  const clearHoverImmediate = useCallback(() => {
    cancelScheduledHoverClear();
    if (hoveredIdRef.current !== null) {
      hoveredIdRef.current = null;
      onHoverIdChange?.(null);
    }
    setHovered(null);
  }, [cancelScheduledHoverClear, onHoverIdChange]);

  const handleHoverEnter = useCallback(
    (event: PlottedEvent) => {
      cancelScheduledHoverClear();

      const nextId = event.id;
      if (hoveredIdRef.current !== nextId) {
        hoveredIdRef.current = nextId;
        onHoverIdChange?.(nextId);
      }
      setHovered(event);
    },
    [cancelScheduledHoverClear, onHoverIdChange],
  );

  const handleHoverLeave = useCallback(
    (event: PlottedEvent) => {
      cancelScheduledHoverClear();

      const idAtLeave = event.id;
      if (hoveredIdRef.current !== idAtLeave) {
        return;
      }

      clearHoverTimeoutRef.current = setTimeout(() => {
        clearHoverTimeoutRef.current = null;
        if (hoveredIdRef.current !== idAtLeave) {
          return;
        }
        hoveredIdRef.current = null;
        onHoverIdChange?.(null);
        setHovered(null);
      }, TIMELINE_HOVER_CLEAR_DELAY_MS);
    },
    [cancelScheduledHoverClear, onHoverIdChange],
  );

  return {
    hovered,
    handleHoverEnter,
    handleHoverLeave,
    clearHoverImmediate,
    cancelScheduledHoverClear,
  };
}
