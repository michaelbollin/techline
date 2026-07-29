import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { axisXAt } from "@/lib/timeline/vertical/axis-path";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { MobileTimelineNodeLabel } from "./mobile-timeline-node-label";

describe("MobileTimelineNodeLabel", () => {
  it("renders label and handles click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const event = makePlottedEvent({ title: "Rust 1.0", dateLabel: "2015" });
    const yScale = () => 300;
    const getAxisX = (y: number) => axisXAt(y, 48);
    const layout = { showLabel: true, lane: 0, width: 110 };

    render(
      <svg width={390} height={800}>
        <MobileTimelineNodeLabel
          event={event}
          yScale={yScale}
          getAxisX={getAxisX}
          layout={layout}
          viewportWidth={390}
          onClick={onClick}
        />
      </svg>,
    );

    await user.click(screen.getByRole("button", { name: "Rust 1.0, 2015" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Rust 1.0")).toBeInTheDocument();
  });
});
