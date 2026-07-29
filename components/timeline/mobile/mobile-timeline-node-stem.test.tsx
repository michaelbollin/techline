import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axisXAt } from "@/lib/timeline/vertical/axis-path";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { MobileTimelineNodeStem } from "./mobile-timeline-node-stem";

describe("MobileTimelineNodeStem", () => {
  it("renders a horizontal stem line", () => {
    const event = makePlottedEvent();
    const yScale = () => 180;
    const getAxisX = (y: number) => axisXAt(y, 48);
    const layout = { showLabel: true, lane: 0, width: 100 };

    const { container } = render(
      <svg>
        <MobileTimelineNodeStem
          event={event}
          yScale={yScale}
          getAxisX={getAxisX}
          layout={layout}
          stemStartX={4}
        />
      </svg>,
    );

    const line = container.querySelector("line");
    expect(line).toBeTruthy();
    expect(line?.getAttribute("y1")).toBe("180");
    expect(line?.getAttribute("y2")).toBe("180");
  });
});
