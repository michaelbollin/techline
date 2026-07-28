import { useCallback } from "react";
import type * as d3 from "d3";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import type { FilterUpdater } from "@/hooks/use-timeline-filters";
import {
  canPanEarlierVertical,
  canPanLaterVertical,
  computeFitTransformVertical,
  computePanTransformVertical,
  computeZoomToYearVertical,
} from "@/lib/timeline/vertical/zoom";

type UseTimelineViewActionsVerticalOptions = {
  height: number;
  transform: d3.ZoomTransform;
  plottedCount: number;
  animateTo: (transform: d3.ZoomTransform) => void;
  updateFilters: (updater: FilterUpdater) => void;
  onResetFilters: () => void;
};

export function useTimelineViewActionsVertical({
  height,
  transform,
  plottedCount,
  animateTo,
  updateFilters,
  onResetFilters,
}: UseTimelineViewActionsVerticalOptions) {
  const resetView = useCallback(() => {
    updateFilters(new Set());
    onResetFilters();

    if (height <= 0) {
      return;
    }

    animateTo(computeFitTransformVertical(height, TIMELINE_EXTENT));
  }, [animateTo, height, onResetFilters, updateFilters]);

  const zoomToYear = useCallback(
    (year: number) => {
      if (height <= 0) {
        return;
      }

      animateTo(computeZoomToYearVertical(height, TIMELINE_EXTENT, year));
    },
    [animateTo, height],
  );

  const panEarlier = useCallback(() => {
    if (height <= 0) {
      return;
    }

    animateTo(computePanTransformVertical(transform, height, TIMELINE_EXTENT, "earlier"));
  }, [animateTo, height, transform]);

  const panLater = useCallback(() => {
    if (height <= 0) {
      return;
    }

    animateTo(computePanTransformVertical(transform, height, TIMELINE_EXTENT, "later"));
  }, [animateTo, height, transform]);

  const showPanEarlier =
    height > 0 && plottedCount > 0 && canPanEarlierVertical(transform, height, TIMELINE_EXTENT);
  const showPanLater =
    height > 0 && plottedCount > 0 && canPanLaterVertical(transform, height, TIMELINE_EXTENT);

  return {
    resetView,
    zoomToYear,
    panEarlier,
    panLater,
    showPanEarlier,
    showPanLater,
  };
}
