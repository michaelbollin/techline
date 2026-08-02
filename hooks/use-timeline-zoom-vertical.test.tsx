import * as d3 from "d3";
import { act, renderHook, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { computeFitTransformVertical } from "@/lib/timeline/vertical/zoom";
import { useTimelineZoomVertical } from "./use-timeline-zoom-vertical";

function attachSvgRef(width: number, height: number) {
  const svgRef = createRef<SVGSVGElement>();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  (svgRef as { current: SVGSVGElement }).current = svg;
  document.body.appendChild(svg);
  return { svgRef, svg };
}

describe("useTimelineZoomVertical", () => {
  it("initializes d3 zoom on the svg element", async () => {
    const { svgRef, svg } = attachSvgRef(390, 800);

    const { result } = renderHook(() =>
      useTimelineZoomVertical({ width: 390, height: 800, svgRef }),
    );

    await waitFor(() => {
      expect(result.current.transform.k).toBeGreaterThan(0);
    });

    document.body.removeChild(svg);
  });

  it("sets transform directly when animateTo is called without zoom behavior", () => {
    const svgRef = createRef<SVGSVGElement>();
    const next = computeFitTransformVertical(700, TIMELINE_EXTENT);

    const { result } = renderHook(() =>
      useTimelineZoomVertical({ width: 390, height: 700, svgRef }),
    );

    act(() => {
      result.current.animateTo(next);
    });

    expect(result.current.transform.k).toBeCloseTo(next.k, 4);
  });

  it("does not attach zoom when height is zero", () => {
    const { svgRef, svg } = attachSvgRef(390, 800);

    const { result } = renderHook(() =>
      useTimelineZoomVertical({ width: 390, height: 0, svgRef }),
    );

    expect(d3.select(svg).on("zoom")).toBeUndefined();
    expect(result.current.transform).toBeDefined();

    document.body.removeChild(svg);
  });

  it("preserves transform when height changes after initialization", async () => {
    const { svgRef, svg } = attachSvgRef(390, 800);

    const { result, rerender } = renderHook(
      ({ height }) => useTimelineZoomVertical({ width: 390, height, svgRef, svgReady: true }),
      { initialProps: { height: 800 } },
    );

    await waitFor(() => {
      expect(result.current.transform.k).toBeGreaterThan(0);
    });

    const beforeResize = result.current.transform;

    rerender({ height: 700 });

    await waitFor(() => {
      expect(result.current.transform.k).toBeCloseTo(beforeResize.k, 4);
      expect(result.current.transform.y).toBeCloseTo(beforeResize.y, 1);
    });

    document.body.removeChild(svg);
  });
});
