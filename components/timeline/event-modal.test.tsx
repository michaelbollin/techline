import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EventModal } from "./event-modal";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("EventModal", () => {
  it("renders a modal animation layer when animationId is provided", () => {
    const { container } = render(
      <EventModal animationId="cd-rom" titleId="event-title">
        <p>Event body</p>
      </EventModal>,
    );

    expect(container.querySelector(".cd-rom-prismatic-sweep, canvas")).toBeTruthy();
    expect(container.querySelector(".bg-white\\/90")).toBeNull();
    expect(container.querySelector(".bg-white")).toBeTruthy();
  });

  it("uses a solid white panel when no animation is active", () => {
    const { container } = render(
      <EventModal titleId="event-title">
        <p>Event body</p>
      </EventModal>,
    );

    expect(container.querySelector(".bg-white\\/90")).toBeNull();
    expect(container.querySelector(".bg-white")).toBeTruthy();
  });

  it("renders children and closes on backdrop click", async () => {
    const user = userEvent.setup();

    render(
      <EventModal titleId="event-title">
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
      <EventModal returnHref="/javascript" titleId="event-title">
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
      <EventModal titleId="event-title">
        <p>Details</p>
      </EventModal>,
    );

    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });
});
