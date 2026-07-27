import * as d3 from "d3";

import { TIMELINE_EDGE_MARGIN } from "./constants";
import type { PlottedEvent } from "./plot-data";

export function makeBaseScale(width: number, extent: [number, number]) {
  const margin = TIMELINE_EDGE_MARGIN;
  const innerWidth = Math.max(width - margin * 2, 1);
  return d3.scaleTime().domain(extent).range([margin, margin + innerWidth]);
}

export function computeTransformForTimeRange(
  width: number,
  extent: [number, number],
  visibleRange: [number, number],
): d3.ZoomTransform {
  const margin = TIMELINE_EDGE_MARGIN;
  const innerWidth = Math.max(width - margin * 2, 1);
  const base = makeBaseScale(width, extent);
  const [t0, t1] = visibleRange;
  const x0 = base(t0);
  const x1 = base(t1);
  const scale = innerWidth / Math.max(x1 - x0, 1);
  return d3.zoomIdentity.translate(margin - scale * x0, 0).scale(scale);
}

export function computeFitTransform(
  width: number,
  extent: [number, number],
): d3.ZoomTransform {
  return computeTransformForTimeRange(width, extent, extent);
}

export function visibleInnerTimeRange(
  transform: d3.ZoomTransform,
  width: number,
  extent: [number, number],
): [number, number] {
  const margin = TIMELINE_EDGE_MARGIN;
  const innerWidth = Math.max(width - margin * 2, 1);
  const xScale = transform.rescaleX(makeBaseScale(width, extent));
  return [xScale.invert(margin).getTime(), xScale.invert(margin + innerWidth).getTime()];
}

export function clampZoomTransform(
  transform: d3.ZoomTransform,
  width: number,
  extent: [number, number],
): d3.ZoomTransform {
  if (width <= 0) {
    return transform;
  }

  const [tMin, tMax] = extent;
  const maxSpan = tMax - tMin;
  let [t0, t1] = visibleInnerTimeRange(transform, width, extent);
  const span = t1 - t0;

  if (span > maxSpan) {
    return computeFitTransform(width, extent);
  }

  if (t0 >= tMin && t1 <= tMax) {
    return transform;
  }

  if (t0 < tMin) {
    t0 = tMin;
    t1 = tMin + span;
  }
  if (t1 > tMax) {
    t1 = tMax;
    t0 = tMax - span;
  }

  return computeTransformForTimeRange(width, extent, [t0, t1]);
}

export function computeZoomToEvents(
  width: number,
  extent: [number, number],
  targets: PlottedEvent[],
): d3.ZoomTransform {
  const edgeMargin = TIMELINE_EDGE_MARGIN;
  const innerWidth = Math.max(width - edgeMargin * 2, 1);
  const base = d3.scaleTime().domain(extent).range([edgeMargin, edgeMargin + innerWidth]);
  const times = targets.map((event) => event.timestamp);
  const t0 = Math.min(...times);
  const t1 = Math.max(...times);
  const timePad = Math.max((t1 - t0) * 0.2, (extent[1] - extent[0]) * 0.005);
  const x0 = base(t0 - timePad);
  const x1 = base(t1 + timePad);
  const scale = (innerWidth * 0.9) / Math.max(x1 - x0, 1);
  const mid = (x0 + x1) / 2;
  const transform = d3.zoomIdentity
    .translate(edgeMargin + innerWidth / 2 - scale * mid, 0)
    .scale(scale);

  return clampZoomTransform(transform, width, extent);
}
