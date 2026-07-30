import { describe, expect, it } from "vitest";

import { buildTransistorSchematic, getOrderedPaths } from "./schematic";

describe("buildTransistorSchematic", () => {
  it("returns paths for body, leads, and emitter arrow", () => {
    const schematic = buildTransistorSchematic(800, 600);

    expect(schematic.paths.map((path) => path.id)).toEqual([
      "body",
      "base",
      "collector",
      "emitter",
      "arrow",
    ]);
  });

  it("orders draw animation from body outward", () => {
    const schematic = buildTransistorSchematic(800, 600);

    expect(getOrderedPaths(schematic).map((path) => path.id)).toEqual([
      "body",
      "base",
      "collector",
      "emitter",
      "arrow",
    ]);
  });

  it("centers the junction in the viewport", () => {
    const schematic = buildTransistorSchematic(640, 480);

    expect(schematic.junction).toEqual({ x: 320, y: 240 });
  });

  it("extends leads to the viewport edges", () => {
    const width = 1000;
    const height = 800;
    const schematic = buildTransistorSchematic(width, height);
    const base = schematic.paths.find((path) => path.id === "base");
    const collector = schematic.paths.find((path) => path.id === "collector");
    const emitter = schematic.paths.find((path) => path.id === "emitter");

    expect(base?.d).toMatch(/^M 50 /);
    expect(collector?.d).toMatch(/950 48$/);
    expect(emitter?.d).toMatch(/950 752$/);
  });

  it("includes electron paths for base input and amplified collector output", () => {
    const schematic = buildTransistorSchematic(800, 600);

    expect(schematic.electrons).toHaveLength(4);
    expect(schematic.electrons[0]?.id).toBe("electron-base");
    expect(schematic.electrons.slice(1).every((electron) => electron.id.startsWith("electron-collector"))).toBe(
      true,
    );
  });
});
