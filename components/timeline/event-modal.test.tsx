import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EventModal } from "./event-modal";

const back = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back }),
}));

describe("EventModal", () => {
  it("renders children and closes on backdrop click", async () => {
    const user = userEvent.setup();

    render(
      <EventModal>
        <p>Event body</p>
      </EventModal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Event body")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close event details" }));
    expect(back).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape and via close button", async () => {
    const user = userEvent.setup();
    back.mockClear();

    render(
      <EventModal>
        <p>Details</p>
      </EventModal>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(back).toHaveBeenCalledTimes(1);

    back.mockClear();
    await user.keyboard("{Escape}");
    expect(back).toHaveBeenCalledTimes(1);
  });

  it("locks body scroll while open", () => {
    document.body.style.overflow = "auto";

    const { unmount } = render(
      <EventModal>
        <p>Details</p>
      </EventModal>,
    );

    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });
});
