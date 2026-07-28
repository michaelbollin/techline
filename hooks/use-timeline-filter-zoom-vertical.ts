import { useEffect, useMemo, useRef } from "react";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { filterSignature, hasActiveFilters } from "@/lib/timeline/filters";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import {
  computeFitTransformVertical,
  computeZoomToEventsVertical,
} from "@/lib/timeline/vertical/zoom";

type UseTimelineFilterZoomVerticalOptions = {
  height: number;
  plotted: PlottedEvent[];
  activeFilterIds: Set<string>;
  fulltextQuery: string;
  animateTo: (transform: ReturnType<typeof computeFitTransformVertical>) => void;
};

export function useTimelineFilterZoomVertical({
  height,
  plotted,
  activeFilterIds,
  fulltextQuery,
  animateTo,
}: UseTimelineFilterZoomVerticalOptions) {
  const hasInitialized = useRef(false);
  const filterKey = useMemo(
    () => filterSignature(activeFilterIds, fulltextQuery),
    [activeFilterIds, fulltextQuery],
  );

  useEffect(() => {
    if (height <= 0) {
      return;
    }

    if (hasActiveFilters(activeFilterIds, fulltextQuery)) {
      if (plotted.length === 0) {
        return;
      }

      animateTo(computeZoomToEventsVertical(height, TIMELINE_EXTENT, plotted, { tight: true }));
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

    animateTo(computeFitTransformVertical(height, TIMELINE_EXTENT));
  }, [activeFilterIds, animateTo, filterKey, fulltextQuery, height, plotted]);
}
