import { describe, expect, it } from "vitest";

import { OUT_OF_SCOPE_EVENT_IDS } from "./out-of-scope-events";
import { loadTimeline } from "./load";

describe("out-of-scope events", () => {
  it("references only real event ids", async () => {
    const { events } = await loadTimeline(undefined, { includeDeferred: true });
    const eventIds = new Set(events.map((event) => event.id));

    for (const eventId of OUT_OF_SCOPE_EVENT_IDS) {
      expect(eventIds.has(eventId), `missing out-of-scope event ${eventId}`).toBe(true);
    }
  });

  it("hides office suites and consumer media from the default timeline", async () => {
    const [visible, all] = await Promise.all([
      loadTimeline(undefined, { includeDeferred: false }),
      loadTimeline(undefined, { includeDeferred: true }),
    ]);

    const visibleIds = new Set(visible.events.map((event) => event.id));

    expect(visibleIds.has("openoffice-1-0-released")).toBe(false);
    expect(visibleIds.has("itunes-released")).toBe(false);
    expect(visibleIds.has("microsoft-access-1-0-released")).toBe(true);
    expect(visibleIds.has("zoom-launched")).toBe(true);
    expect(visibleIds.has("microsoft-teams-launched")).toBe(true);
    expect(visibleIds.has("slack-launched")).toBe(true);
    expect(all.events.some((event) => event.id === "openoffice-1-0-released")).toBe(true);
  });
});
