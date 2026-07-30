import { describe, expect, it } from "vitest";

import {
  buildInternetSymbols,
  buildTidalWaveLayers,
  createTidalWaveCanvasState,
  INTERNET_SYMBOL_DEFS,
  stepTidalWaveCanvasState,
  symbolXAt,
  waveYAt,
} from "./canvas";

describe("internet tidal wave canvas", () => {
  it("builds stacked wave layers from the lower viewport upward", () => {
    const layers = buildTidalWaveLayers(1000, 800);

    expect(layers).toHaveLength(4);
    expect(layers[0]?.baseline).toBeLessThan(layers[3]?.baseline ?? 0);
    expect(layers[3]?.fill).toBeTruthy();
  });

  it("includes icon symbols instead of text labels", () => {
    const symbols = buildInternetSymbols(1000, 800);

    expect(symbols).toHaveLength(INTERNET_SYMBOL_DEFS.length);
    expect(symbols.map((symbol) => symbol.kind)).toEqual(
      expect.arrayContaining(["globe", "database", "cloud", "server", "network", "browser", "link"]),
    );
    expect(symbols.every((symbol) => symbol.size >= 20)).toBe(true);
  });

  it("advances phase over time", () => {
    const state = createTidalWaveCanvasState();

    stepTidalWaveCanvasState(state, 100);
    const first = state.phase;

    stepTidalWaveCanvasState(state, 100);
    expect(state.phase).toBeGreaterThan(first);
  });

  it("offsets wave height by phase", () => {
    const [layer] = buildTidalWaveLayers(800, 600);
    expect(layer).toBeDefined();
    if (!layer) {
      return;
    }

    const a = waveYAt(120, layer, 0);
    const b = waveYAt(120, layer, 1.5);
    expect(a).not.toBe(b);
  });

  it("drifts symbols across the viewport", () => {
    const [symbol] = buildInternetSymbols(800, 600);
    expect(symbol).toBeDefined();
    if (!symbol) {
      return;
    }

    const a = symbolXAt(symbol, 800, 0);
    const b = symbolXAt(symbol, 800, 4);
    expect(a).not.toBe(b);
  });
});
