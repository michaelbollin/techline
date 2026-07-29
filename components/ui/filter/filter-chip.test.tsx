import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterChip } from "./filter-chip";

describe("FilterChip", () => {
  it("calls onRemove when clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <FilterChip kind="Theme" onRemove={onRemove}>
        Web
      </FilterChip>,
    );

    await user.click(screen.getByRole("button", { name: /Web/ }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
