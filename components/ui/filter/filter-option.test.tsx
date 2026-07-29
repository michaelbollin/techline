import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterOption } from "./filter-option";

describe("FilterOption", () => {
  it("renders label, kind, and count", () => {
    render(
      <FilterOption
        checked={false}
        onChange={() => {}}
        label="JavaScript"
        kind="Language"
        count={12}
      />,
    );

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("calls onChange when toggled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<FilterOption checked={false} onChange={onChange} label="Web" />);
    await user.click(screen.getByRole("checkbox", { name: "Web" }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
