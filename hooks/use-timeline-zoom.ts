import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";

import { TIMELINE_EXTENT, TIMELINE_TRANSITION_MS, TIMELINE_ZOOM_MAX_SCALE } from "@/lib/timeline/constants";
import {
  clampZoomTransform,
  computeFitTransform,
} from "@/lib/timeline/zoom";

type UseTimelineZoomOptions = {
  width: number;
  height: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
};

export function useTimelineZoom({ width, height, svgRef }: UseTimelineZoomOptions) {
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const hasInitialized = useRef(false);

  const [transform, setTransform] = useState<d3.ZoomTransform>(() =>
    computeFitTransform(1200, TIMELINE_EXTENT),
  );

  const animateTo = useCallback(
    (next: d3.ZoomTransform) => {
      const clamped = clampZoomTransform(next, width, TIMELINE_EXTENT);
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
    [svgRef, width],
  );

  useEffect(() => {
    if (width <= 0 || !svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const minScale = computeFitTransform(width, TIMELINE_EXTENT).k;
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([minScale, TIMELINE_ZOOM_MAX_SCALE])
      .translateExtent([
        [-width * 3, 0],
        [width * 4, height],
      ])
      .wheelDelta((event) => -event.deltaY * (event.deltaMode === 1 ? 0.05 : 0.002))
      .on("zoom", (event) => {
        const clamped = clampZoomTransform(event.transform, width, TIMELINE_EXTENT);
        if (
          Math.abs(clamped.x - event.transform.x) > 0.5 ||
          Math.abs(clamped.k - event.transform.k) > 1e-6
        ) {
          svg.call(zoom.transform, clamped);
          return;
        }
        setTransform(clamped);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    if (!hasInitialized.current) {
      animateTo(computeFitTransform(width, TIMELINE_EXTENT));
      hasInitialized.current = true;
    }

    return () => {
      svg.on(".zoom", null);
      zoomRef.current = null;
    };
  }, [animateTo, height, svgRef, width]);

  return { transform, animateTo };
}
