import { describe, expect, it } from "vitest";

import { buildLinuxScene, TERMINAL_LINES } from "./scene";

describe("linux-kernel scene", () => {
  it("uses verbatim phrases from Torvalds' 1991 comp.os.minix post", () => {
    const scene = buildLinuxScene(1200, 800);

    expect(scene.terminalLines).toEqual(TERMINAL_LINES);
    expect(scene.terminalLines[2]).toBe("just a hobby, won't be big");
    expect(scene.terminalLines).toHaveLength(3);
  });

  it("sizes the terminal with symmetric horizontal padding", () => {
    const scene = buildLinuxScene(1200, 800);
    const longest = Math.max(...TERMINAL_LINES.map((line) => line.length));
    const contentWidth = longest * scene.fontSize * 0.64;

    expect(scene.terminal.paddingX).toBeGreaterThan(8);
    expect(scene.terminal.width + 0.01).toBeGreaterThanOrEqual(contentWidth + scene.terminal.paddingX * 2);
    expect(scene.penguin.width).toBeGreaterThan(60);
    expect(scene.penguin.height / scene.penguin.width).toBeCloseTo(256 / 216, 1);
  });
});
