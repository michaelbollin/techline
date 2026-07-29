import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TimelineFilterTrigger } from "./timeline-filters";

describe("TimelineFilterTrigger", () => {
  it("uses accessible label for open and closed states", () => {
    const { rerender } = render(
      <TimelineFilterTrigger isOpen={false} activeCount={0} onToggle={() => {}} />,
    );
    expect(screen.getByRole("button", { name: "Filters" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    rerender(<TimelineFilterTrigger isOpen activeCount={2} onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Close filters" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("shows active count badge when closed", () => {
    render(<TimelineFilterTrigger isOpen={false} activeCount={3} onToggle={() => {}} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onToggle", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<TimelineFilterTrigger isOpen={false} activeCount={0} onToggle={onToggle} />);
    await user.click(screen.getByRole("button", { name: "Filters" }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
