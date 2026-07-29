import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EventModal } from "./event-modal";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
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
    expect(push).toHaveBeenCalledWith("/", { scroll: false });
  });

  it("closes on Escape and via close button", async () => {
    const user = userEvent.setup();
    push.mockClear();

    render(
      <EventModal returnHref="/javascript">
        <p>Details</p>
      </EventModal>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(push).toHaveBeenCalledWith("/javascript", { scroll: false });

    push.mockClear();
    await user.keyboard("{Escape}");
    expect(push).toHaveBeenCalledWith("/javascript", { scroll: false });
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
