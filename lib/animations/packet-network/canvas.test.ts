import { describe, expect, it } from "vitest";

import {
  ARPANET_SCENE,
  createPacketNetworkCanvasState,
  headlineLabel,
  packetPosition,
  stepPacketNetworkCanvasState,
  TCP_IP_SCENE,
  TIMING,
} from "./canvas";

describe("packet-network canvas", () => {
  it("sends ARPANET message characters along the UCLA → IMP → SRI path", () => {
    const state = createPacketNetworkCanvasState(ARPANET_SCENE);

    stepPacketNetworkCanvasState(state, TIMING.spawn);
    expect(state.packets).toHaveLength(1);
    expect(state.packets[0]?.char).toBe("l");

    stepPacketNetworkCanvasState(state, TIMING.segment * 2 + TIMING.spawn + TIMING.segment * 2);
    expect(state.receivedText).toBe("lo");
    expect(state.phase).toBe("hold");
  });

  it("positions packets between linked nodes", () => {
    const state = createPacketNetworkCanvasState(ARPANET_SCENE);
    state.packets.push({
      char: "l",
      route: [0, 1],
      segmentIndex: 0,
      segmentElapsed: TIMING.segment / 2,
    });

    const position = packetPosition(
      state.packets[0]!,
      ARPANET_SCENE.nodes.map((node) => ({ ...node, px: node.x * 400, py: node.y * 300 })),
      ARPANET_SCENE.links,
    );

    expect(position?.x).toBeCloseTo(132, 0);
  });

  it("swaps the TCP/IP headline from NCP during the hold phase", () => {
    const state = createPacketNetworkCanvasState(TCP_IP_SCENE);
    state.phase = "hold";
    state.headlineProgress = 0;

    stepPacketNetworkCanvasState(state, TIMING.headlineSwap * 0.25);
    expect(headlineLabel(TCP_IP_SCENE, state.headlineProgress)).toBe("NCP");

    stepPacketNetworkCanvasState(state, TIMING.headlineSwap);
    expect(headlineLabel(TCP_IP_SCENE, state.headlineProgress)).toBe("TCP/IP");
  });
});
