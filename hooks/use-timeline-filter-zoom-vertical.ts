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
  const animateToRef = useRef(animateTo);

  useEffect(() => {
    animateToRef.current = animateTo;
  }, [animateTo]);

  const previousFilterKeyRef = useRef<string | undefined>(undefined);
  const filterKey = useMemo(
    () => filterSignature(activeFilterIds, fulltextQuery),
    [activeFilterIds, fulltextQuery],
  );

  useEffect(() => {
    if (height <= 0) {
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
          computeZoomToEventsVertical(height, TIMELINE_EXTENT, plotted, { tight: true }),
        );
      }
      return;
    }

    if (previousKey === undefined) {
      return;
    }

    if (filterKeyChanged && plotted.length > 0) {
      animateToRef.current(computeFitTransformVertical(height, TIMELINE_EXTENT));
    }
  }, [activeFilterIds, filterKey, fulltextQuery, plotted, height]);
}
