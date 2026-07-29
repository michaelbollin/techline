import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TimelineSearchFilter } from "./timeline-search-filter";

describe("TimelineSearchFilter", () => {
  it("renders search input with value", () => {
    render(<TimelineSearchFilter value="react" onChange={() => {}} />);

    expect(screen.getByRole("searchbox", { name: "Search events" })).toHaveValue("react");
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimelineSearchFilter value="" onChange={onChange} />);
    await user.type(screen.getByRole("searchbox"), "vue");

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.some(([value]) => value.includes("v"))).toBe(true);
  });

  it("shows clear button and clears query", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimelineSearchFilter value="react" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("hides clear button when empty", () => {
    render(<TimelineSearchFilter value="" onChange={() => {}} />);

    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });
});
