import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TimelineHeader } from "./timeline-header";

describe("TimelineHeader", () => {
  it("renders brand and filter trigger", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(<TimelineHeader isOpen={false} activeCount={0} onToggle={onToggle} />);

    expect(screen.getByRole("link")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Filters" }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
