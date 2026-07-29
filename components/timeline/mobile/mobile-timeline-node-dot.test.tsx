import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { axisXAt } from "@/lib/timeline/vertical/axis-path";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { MobileTimelineNodeDot } from "./mobile-timeline-node-dot";

describe("MobileTimelineNodeDot", () => {
  const event = makePlottedEvent({ title: "Go released", dateLabel: "2009" });
  const yScale = () => 240;
  const getAxisX = (y: number) => axisXAt(y, 48);

  it("handles click without bubbling", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <svg>
        <MobileTimelineNodeDot
          event={event}
          yScale={yScale}
          getAxisX={getAxisX}
          showLabel={false}
          onClick={onClick}
        />
      </svg>,
    );

    await user.click(screen.getByRole("button", { name: "Go released, 2009" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
