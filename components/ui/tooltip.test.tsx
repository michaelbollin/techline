import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("links the trigger to tooltip content", () => {
    render(
      <Tooltip label="Buy me a coffee!">
        <button type="button">Coffee</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Coffee" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    expect(tooltip).toHaveTextContent("Buy me a coffee!");
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id);
  });
});
