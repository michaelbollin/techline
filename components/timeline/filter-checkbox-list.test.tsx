import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterCheckboxList } from "./filter-checkbox-list";

describe("FilterCheckboxList", () => {
  it("renders options and toggles selection", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <FilterCheckboxList
        label="Theme"
        options={[
          { id: "web", label: "Web", count: 4 },
          { id: "ai", label: "AI", count: 2 },
        ]}
        selectedIds={new Set(["web"])}
        onToggle={onToggle}
      />,
    );

    expect(screen.getByRole("listbox", { name: "Theme filters" })).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: "AI" }));
    expect(onToggle).toHaveBeenCalledWith("ai");
  });
});
