import { useCallback } from "react";
import type * as d3 from "d3";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import type { FilterUpdater } from "@/hooks/use-timeline-filters";
import {
  canPanEarlier,
  canPanLater,
  computeFitTransform,
  computePanTransform,
  computeZoomToYear,
} from "@/lib/timeline/zoom";

type UseTimelineViewActionsOptions = {
  width: number;
  transform: d3.ZoomTransform;
  plottedCount: number;
  animateTo: (transform: d3.ZoomTransform) => void;
  updateFilters: (updater: FilterUpdater) => void;
  onResetFilters: () => void;
};

export function useTimelineViewActions({
  width,
  transform,
  plottedCount,
  animateTo,
  updateFilters,
  onResetFilters,
}: UseTimelineViewActionsOptions) {
  const resetView = useCallback(() => {
    updateFilters(new Set());
    onResetFilters();

    if (width <= 0) {
      return;
    }

    animateTo(computeFitTransform(width, TIMELINE_EXTENT));
  }, [animateTo, onResetFilters, updateFilters, width]);

  const zoomToYear = useCallback(
    (year: number) => {
      if (width <= 0) {
        return;
      }

      animateTo(computeZoomToYear(width, TIMELINE_EXTENT, year));
    },
    [animateTo, width],
  );

  const panEarlier = useCallback(() => {
    if (width <= 0) {
      return;
    }

    animateTo(computePanTransform(transform, width, TIMELINE_EXTENT, "earlier"));
  }, [animateTo, transform, width]);

  const panLater = useCallback(() => {
    if (width <= 0) {
      return;
    }

    animateTo(computePanTransform(transform, width, TIMELINE_EXTENT, "later"));
  }, [animateTo, transform, width]);

  const showPanEarlier =
    width > 0 && plottedCount > 0 && canPanEarlier(transform, width, TIMELINE_EXTENT);
  const showPanLater =
    width > 0 && plottedCount > 0 && canPanLater(transform, width, TIMELINE_EXTENT);

  return {
    resetView,
    zoomToYear,
    panEarlier,
    panLater,
    showPanEarlier,
    showPanLater,
  };
}
