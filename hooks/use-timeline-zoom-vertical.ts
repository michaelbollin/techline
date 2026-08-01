import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";

import { TIMELINE_EXTENT, TIMELINE_TRANSITION_MS, TIMELINE_ZOOM_MAX_SCALE } from "@/lib/timeline/constants";
import {
  clampZoomTransformVertical,
  computeFitTransformVertical,
  verticalZoomTransform,
} from "@/lib/timeline/vertical/zoom";

type UseTimelineZoomVerticalOptions = {
  width: number;
  height: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  svgReady?: boolean;
};

export function useTimelineZoomVertical({ width, height, svgRef, svgReady = true }: UseTimelineZoomVerticalOptions) {
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const hasInitialized = useRef(false);

  const [transform, setTransform] = useState<d3.ZoomTransform>(() =>
    computeFitTransformVertical(800, TIMELINE_EXTENT),
  );

  const animateTo = useCallback(
    (next: d3.ZoomTransform) => {
      const clamped = clampZoomTransformVertical(verticalZoomTransform(next), height, TIMELINE_EXTENT);
      const svg = svgRef.current;
      const zoom = zoomRef.current;
      if (!svg || !zoom) {
        setTransform(clamped);
        return;
      }

      d3.select(svg)
        .transition()
        .duration(TIMELINE_TRANSITION_MS)
        .ease(d3.easeCubicOut)
        .call(zoom.transform, clamped);
    },
    [height, svgRef],
  );

  useEffect(() => {
    if (height <= 0 || !svgReady || !svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const minScale = computeFitTransformVertical(height, TIMELINE_EXTENT).k;
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([minScale, TIMELINE_ZOOM_MAX_SCALE])
      .translateExtent([
        [0, -height * 3],
        [width, height * 4],
      ])
      .wheelDelta((event) => -event.deltaY * (event.deltaMode === 1 ? 0.05 : 0.002))
      .on("zoom", (event) => {
        if (!event.sourceEvent) {
          setTransform(verticalZoomTransform(event.transform));
          return;
        }

        const clamped = clampZoomTransformVertical(
          verticalZoomTransform(event.transform),
          height,
          TIMELINE_EXTENT,
        );
        const needsRedirect =
          Math.abs(clamped.y - event.transform.y) > 0.5 ||
          Math.abs(clamped.k - event.transform.k) > 1e-6;

        if (needsRedirect) {
          svg.call(zoom.transform, clamped);
          return;
        }

        setTransform(clamped);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    if (!hasInitialized.current) {
      animateTo(computeFitTransformVertical(height, TIMELINE_EXTENT));
      hasInitialized.current = true;
    }

    return () => {
      svg.on(".zoom", null);
      zoomRef.current = null;
    };
  }, [animateTo, height, svgReady, svgRef, width]);

  return { transform, animateTo };
}
