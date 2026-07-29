import * as d3 from "d3";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { axisXAt } from "@/lib/timeline/vertical/axis-path";
import { makeBaseScaleVertical, computeFitTransformVertical } from "@/lib/timeline/vertical/zoom";
import { MobileTimelineAxisGrid } from "./mobile-timeline-axis-grid";

describe("MobileTimelineAxisGrid", () => {
  const height = 800;
  const baseScale = makeBaseScaleVertical(height, TIMELINE_EXTENT);
  const transform = computeFitTransformVertical(height, TIMELINE_EXTENT);
  const yScale = transform.rescaleY(baseScale);
  const getAxisX = (y: number) => axisXAt(y, 48);

  it("renders axis tick labels", () => {
    render(
      <svg width={390} height={height}>
        <MobileTimelineAxisGrid
          yScale={yScale}
          height={height}
          getAxisX={getAxisX}
          onYearClick={() => {}}
        />
      </svg>,
    );

    expect(screen.getAllByText(/\d{4}/).length).toBeGreaterThan(0);
  });

  it("calls onYearClick for zoomable year ticks", async () => {
    const user = userEvent.setup();
    const onYearClick = vi.fn();
    const zoomedIn = d3.zoomIdentity.scale(40).translate(0, -300_000);
    const zoomedScale = zoomedIn.rescaleY(baseScale);

    render(
      <svg width={390} height={height}>
        <MobileTimelineAxisGrid
          yScale={zoomedScale}
          height={height}
          getAxisX={getAxisX}
          onYearClick={onYearClick}
        />
      </svg>,
    );

    const yearLabel = screen.getAllByText("2000")[0];
    const hitTarget = yearLabel?.parentElement?.querySelector("rect");
    expect(hitTarget).toBeTruthy();
    await user.click(hitTarget!);

    expect(onYearClick).toHaveBeenCalledWith(2000);
  });
});
