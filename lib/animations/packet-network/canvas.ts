export type NetworkNodeRole = "host" | "imp" | "router";

export type NetworkNodeDef = {
  id: string;
  label: string;
  x: number;
  y: number;
  role: NetworkNodeRole;
};

export type NetworkLinkDef = {
  from: string;
  to: string;
};

export type PacketRoute = {
  linkIndices: number[];
};

export type PacketNetworkScene = {
  id: "arpanet" | "tcp-ip";
  nodes: NetworkNodeDef[];
  links: NetworkLinkDef[];
  message: string;
  routes: PacketRoute[];
  headline?: string;
  headlineSwap?: {
    from: string;
    to: string;
  };
};

export const ARPANET_SCENE: PacketNetworkScene = {
  id: "arpanet",
  headline: "First host-to-host message",
  nodes: [
    { id: "ucla", label: "UCLA", x: 0.16, y: 0.52, role: "host" },
    { id: "imp", label: "IMP", x: 0.5, y: 0.52, role: "imp" },
    { id: "sri", label: "SRI", x: 0.84, y: 0.52, role: "host" },
  ],
  links: [
    { from: "ucla", to: "imp" },
    { from: "imp", to: "sri" },
  ],
  message: "lo",
  routes: [{ linkIndices: [0, 1] }],
};

export const TCP_IP_SCENE: PacketNetworkScene = {
  id: "tcp-ip",
  headline: "Flag day",
  headlineSwap: { from: "NCP", to: "TCP/IP" },
  nodes: [
    { id: "host-a", label: "Host A", x: 0.18, y: 0.34, role: "host" },
    { id: "host-b", label: "Host B", x: 0.82, y: 0.34, role: "host" },
    { id: "router", label: "IP", x: 0.5, y: 0.5, role: "router" },
    { id: "host-c", label: "Host C", x: 0.5, y: 0.78, role: "host" },
  ],
  links: [
    { from: "host-a", to: "router" },
    { from: "router", to: "host-b" },
    { from: "router", to: "host-c" },
    { from: "host-a", to: "router" },
  ],
  message: "SYN",
  routes: [
    { linkIndices: [0, 1] },
    { linkIndices: [0, 2] },
    { linkIndices: [3, 1] },
  ],
};

export const SCENE_OPACITY = 0.4;

export const TIMING = {
  spawn: 520,
  segment: 680,
  hold: 2200,
  reset: 520,
  headlineSwap: 1200,
} as const;

export type NetworkNode = NetworkNodeDef & {
  px: number;
  py: number;
};

export type TravelingPacket = {
  char: string;
  route: number[];
  segmentIndex: number;
  segmentElapsed: number;
};

export type PacketNetworkCanvasState = {
  scene: PacketNetworkScene;
  packets: TravelingPacket[];
  receivedText: string;
  spawnIndex: number;
  spawnElapsed: number;
  routeCursor: number;
  phase: "sending" | "hold" | "reset";
  phaseElapsed: number;
  headlineProgress: number;
};

export function createPacketNetworkCanvasState(scene: PacketNetworkScene): PacketNetworkCanvasState {
  return {
    scene,
    packets: [],
    receivedText: "",
    spawnIndex: 0,
    spawnElapsed: 0,
    routeCursor: 0,
    phase: "sending",
    phaseElapsed: 0,
    headlineProgress: scene.headlineSwap ? 0 : 1,
  };
}

export function buildNetworkLayout(
  width: number,
  height: number,
  scene: PacketNetworkScene,
): { nodes: NetworkNode[]; links: NetworkLinkDef[] } {
  const nodes = scene.nodes.map((node) => ({
    ...node,
    px: node.x * width,
    py: node.y * height,
  }));

  return { nodes, links: scene.links };
}

export function getNodeById(nodes: NetworkNode[], id: string): NetworkNode | undefined {
  return nodes.find((node) => node.id === id);
}

export function packetPosition(
  packet: TravelingPacket,
  nodes: NetworkNode[],
  links: NetworkLinkDef[],
): { x: number; y: number } | null {
  const linkIndex = packet.route[packet.segmentIndex];
  if (linkIndex === undefined) {
    return null;
  }

  const link = links[linkIndex];
  if (!link) {
    return null;
  }

  const from = getNodeById(nodes, link.from);
  const to = getNodeById(nodes, link.to);
  if (!from || !to) {
    return null;
  }

  const t = Math.min(1, packet.segmentElapsed / TIMING.segment);
  return {
    x: from.px + (to.px - from.px) * t,
    y: from.py + (to.py - from.py) * t,
  };
}

export function headlineLabel(scene: PacketNetworkScene, progress: number): string {
  if (!scene.headlineSwap) {
    return scene.headline ?? "";
  }

  return progress < 0.5 ? scene.headlineSwap.from : scene.headlineSwap.to;
}

export function stepPacketNetworkCanvasState(state: PacketNetworkCanvasState, deltaMs: number) {
  const { scene } = state;

  if (state.phase === "sending") {
    state.spawnElapsed += deltaMs;

    if (state.spawnElapsed >= TIMING.spawn && state.spawnIndex < scene.message.length) {
      const route =
        scene.routes[state.routeCursor % scene.routes.length]?.linkIndices ?? scene.routes[0]!.linkIndices;

      state.packets.push({
        char: scene.message[state.spawnIndex]!,
        route,
        segmentIndex: 0,
        segmentElapsed: 0,
      });

      state.spawnIndex += 1;
      state.routeCursor += 1;
      state.spawnElapsed = 0;
    }

    for (const packet of state.packets) {
      packet.segmentElapsed += deltaMs;

      while (packet.segmentElapsed >= TIMING.segment) {
        packet.segmentElapsed -= TIMING.segment;
        packet.segmentIndex += 1;

        if (packet.segmentIndex >= packet.route.length) {
          state.receivedText += packet.char;
          packet.segmentIndex = packet.route.length;
          break;
        }
      }
    }

    state.packets = state.packets.filter((packet) => packet.segmentIndex < packet.route.length);

    if (state.spawnIndex >= scene.message.length && state.packets.length === 0) {
      state.phase = "hold";
      state.phaseElapsed = 0;
    }

    return;
  }

  if (state.phase === "hold") {
    state.phaseElapsed += deltaMs;

    if (scene.headlineSwap && state.headlineProgress < 1) {
      state.headlineProgress = Math.min(1, state.phaseElapsed / TIMING.headlineSwap);
    }

    if (state.phaseElapsed >= TIMING.hold) {
      state.phase = "reset";
      state.phaseElapsed = 0;
    }

    return;
  }

  const fade = Math.min(1, state.phaseElapsed / TIMING.reset);
  state.phaseElapsed += deltaMs;

  if (fade >= 1) {
    state.packets = [];
    state.receivedText = "";
    state.spawnIndex = 0;
    state.spawnElapsed = 0;
    state.routeCursor = 0;
    state.phase = "sending";
    state.phaseElapsed = 0;
    state.headlineProgress = scene.headlineSwap ? 0 : 1;
  }
}

export function renderPacketNetworkCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: PacketNetworkCanvasState,
) {
  ctx.clearRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.5, height * 0.48, 0, width * 0.5, height * 0.48, width * 0.72);
  glow.addColorStop(0, "rgba(56, 189, 248, 0.08)");
  glow.addColorStop(0.55, "rgba(99, 102, 241, 0.05)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const { nodes, links } = buildNetworkLayout(width, height, state.scene);
  const fontSize = Math.max(11, Math.min(14, width * 0.028));
  const nodeWidth = Math.max(54, width * 0.11);
  const nodeHeight = Math.max(34, height * 0.075);

  ctx.save();
  ctx.globalAlpha = SCENE_OPACITY;

  if (state.scene.headline || state.scene.headlineSwap) {
    ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
    ctx.textAlign = "center";

    const label = headlineLabel(state.scene, state.headlineProgress);
    ctx.fillText(label, width * 0.5, height * 0.14);

    if (state.scene.headlineSwap && state.headlineProgress < 0.5) {
      const textWidth = ctx.measureText(state.scene.headlineSwap.from).width;
      ctx.strokeStyle = "rgba(248, 113, 113, 0.55)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width * 0.5 - textWidth / 2, height * 0.14 - fontSize * 0.35);
      ctx.lineTo(width * 0.5 + textWidth / 2, height * 0.14 + fontSize * 0.1);
      ctx.stroke();
    }

    ctx.textAlign = "left";
  }

  ctx.strokeStyle = "rgba(148, 163, 184, 0.28)";
  ctx.lineWidth = Math.max(1.5, width * 0.0025);
  ctx.setLineDash([6, 8]);

  for (const link of links) {
    const from = getNodeById(nodes, link.from);
    const to = getNodeById(nodes, link.to);
    if (!from || !to) {
      continue;
    }

    ctx.beginPath();
    ctx.moveTo(from.px, from.py);
    ctx.lineTo(to.px, to.py);
    ctx.stroke();
  }

  ctx.setLineDash([]);

  for (const node of nodes) {
    drawNetworkNode(ctx, node, nodeWidth, nodeHeight, fontSize);
  }

  for (const packet of state.packets) {
    const position = packetPosition(packet, nodes, links);
    if (!position) {
      continue;
    }

    drawPacket(ctx, position.x, position.y, packet.char, fontSize);
  }

  if (state.receivedText.length > 0) {
    const destination = nodes.find((node) => node.id === state.scene.nodes.at(-1)?.id) ?? nodes.at(-1);
    if (destination) {
      ctx.font = `600 ${fontSize + 2}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.fillStyle = "rgba(110, 231, 183, 0.82)";
      ctx.textAlign = "center";
      ctx.fillText(state.receivedText, destination.px, destination.py - nodeHeight * 0.75);
      ctx.textAlign = "left";
    }
  }

  ctx.restore();
}

function drawNetworkNode(
  ctx: CanvasRenderingContext2D,
  node: NetworkNode,
  width: number,
  height: number,
  fontSize: number,
) {
  const x = node.px - width / 2;
  const y = node.py - height / 2;

  if (node.role === "imp" || node.role === "router") {
    ctx.fillStyle = "rgba(99, 102, 241, 0.35)";
    ctx.strokeStyle = "rgba(129, 140, 248, 0.55)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, width * 0.9, height, 8);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillStyle = "rgba(51, 65, 85, 0.42)";
    ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, width, height, 10);
    ctx.fill();
    ctx.stroke();
  }

  ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  ctx.fillStyle = "rgba(226, 232, 240, 0.88)";
  ctx.textAlign = "center";
  ctx.fillText(node.label, node.px, node.py + fontSize * 0.35);
  ctx.textAlign = "left";
}

function drawPacket(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: string,
  fontSize: number,
) {
  const size = fontSize * 1.8;
  ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
  ctx.strokeStyle = "rgba(125, 211, 252, 0.9)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, x - size / 2, y - size / 2, size, size, 5);
  ctx.fill();
  ctx.stroke();

  ctx.font = `700 ${fontSize - 1}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + (fontSize - 1) * 0.35);
  ctx.textAlign = "left";
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
