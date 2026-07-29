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
  animateTo: (transform: ReturnType<typeof computeFitTransform>, source?: string) => void;
};

export function useTimelineFilterZoom({
  width,
  plotted,
  activeFilterIds,
  fulltextQuery,
  animateTo,
}: UseTimelineFilterZoomOptions) {
  const animateToRef = useRef(animateTo);
  animateToRef.current = animateTo;

  const previousFilterKeyRef = useRef<string | undefined>(undefined);
  const filterKey = useMemo(
    () => filterSignature(activeFilterIds, fulltextQuery),
    [activeFilterIds, fulltextQuery],
  );

  useEffect(() => {
    if (width <= 0) {
      return;
    }

    const previousKey = previousFilterKeyRef.current;
    const filterKeyChanged = previousKey !== undefined && previousKey !== filterKey;
    previousFilterKeyRef.current = filterKey;

    const filtered = hasActiveFilters(activeFilterIds, fulltextQuery);

    if (filtered) {
      if (plotted.length === 0) {
        return;
      }

      if (previousKey === undefined || filterKeyChanged) {
        animateToRef.current(
          computeZoomToEvents(width, TIMELINE_EXTENT, plotted, { tight: true }),
          "filter-zoom",
        );
      }
      return;
    }

    if (previousKey === undefined) {
      return;
    }

    if (filterKeyChanged && plotted.length > 0) {
      animateToRef.current(computeFitTransform(width, TIMELINE_EXTENT), "filter-clear");
    }
  }, [activeFilterIds, filterKey, fulltextQuery, plotted, width]);
}
