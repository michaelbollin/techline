import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("forwards change events", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox aria-label="Accept" onChange={onChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Accept" }));

    expect(onChange).toHaveBeenCalled();
  });
});
