import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FilterToggleIcon } from "./filter-toggle-icon";

describe("FilterToggleIcon", () => {
  it("marks open state on svg", () => {
    const { container, rerender } = render(<FilterToggleIcon isOpen={false} />);
    expect(container.querySelector("svg")).not.toHaveAttribute("data-open");

    rerender(<FilterToggleIcon isOpen />);
    expect(container.querySelector("svg")).toHaveAttribute("data-open");
  });
});
