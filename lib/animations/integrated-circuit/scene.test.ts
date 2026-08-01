import { describe, expect, it } from "vitest";

import { buildIcScene, getOrderedWires, wirePathForPhase } from "./scene";

describe("integrated-circuit scene", () => {
  it("models Kilby's oscillator from resistor, transistor, and capacitor", () => {
    const scene = buildIcScene(1000, 700);

    expect(scene.components.map((component) => component.kind)).toEqual([
      "resistor",
      "transistor",
      "capacitor",
    ]);
    expect(getOrderedWires(scene)).toHaveLength(3);
  });

  it("moves components from spread positions onto the chip", () => {
    const scene = buildIcScene(800, 600);
    const resistor = scene.components.find((component) => component.id === "resistor");

    expect(resistor).toBeDefined();
    expect(Math.abs(resistor!.spread.x - scene.cx)).toBeGreaterThan(scene.chip.width * 0.35);
    expect(Math.abs(resistor!.nested.x - scene.cx)).toBeLessThan(scene.chip.width * 0.5);
    expect(scene.nestedScale).toBeLessThan(scene.spreadScale);
  });

  it("shortens wires when components land on the chip", () => {
    const scene = buildIcScene(800, 600);
    const wire = getOrderedWires(scene)[0]!;
    const spread = wirePathForPhase(wire, scene.components, "spread");
    const nested = wirePathForPhase(wire, scene.components, "nested");

    expect(spread).not.toBe(nested);
  });
});
