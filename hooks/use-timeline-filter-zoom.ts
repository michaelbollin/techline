import { useEffect, useMemo, useRef } from "react";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { filterSignature, hasActiveFilters } from "@/lib/timeline/filters";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import { computeFitTransform, computeZoomToEvents } from "@/lib/timeline/zoom";

type UseTimelineFilterZoomOptions = {
  width: number;
  plotted: PlottedEvent[];
  activeFilterIds: Set<string>;
  fulltextQuery: string;
  animateTo: (transform: ReturnType<typeof computeFitTransform>) => void;
};

export function useTimelineFilterZoom({
  width,
  plotted,
  activeFilterIds,
  fulltextQuery,
  animateTo,
}: UseTimelineFilterZoomOptions) {
  const hasInitialized = useRef(false);
  const filterKey = useMemo(
    () => filterSignature(activeFilterIds, fulltextQuery),
    [activeFilterIds, fulltextQuery],
  );

  useEffect(() => {
    if (width <= 0) {
      return;
    }

    if (hasActiveFilters(activeFilterIds, fulltextQuery)) {
      if (plotted.length === 0) {
        return;
      }

      animateTo(computeZoomToEvents(width, TIMELINE_EXTENT, plotted, { tight: true }));
      hasInitialized.current = true;
      return;
    }

    if (!hasInitialized.current) {
      if (plotted.length > 0) {
        hasInitialized.current = true;
      }
      return;
    }

    if (plotted.length === 0) {
      return;
    }

    animateTo(computeFitTransform(width, TIMELINE_EXTENT));
  }, [activeFilterIds, animateTo, filterKey, fulltextQuery, plotted, width]);
}
