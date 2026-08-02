export type Gpt3ApiPhase =
  | "input-typing"
  | "send"
  | "thinking"
  | "streaming"
  | "hold"
  | "reset";

export type Gpt3ApiScene = {
  prompt: string;
  completion: string;
};

export const GPT3_API_SCENES: readonly Gpt3ApiScene[] = [
  {
    prompt: "Explain recursion to a beginner.",
    completion: " A function that calls itself with a smaller problem until it hits a base case.",
  },
  {
    prompt: "Write a haiku about debugging.",
    completion: "\nIt worked yesterday.\nOne semicolon was missing.\nNow I question everything.",
  },
  {
    prompt: "What can you help me with?",
    completion: " Writing, coding, brainstorming, tutoring — just ask in plain language.",
  },
] as const;

export const PHASE_MS = {
  inputTyping: 36,
  send: 320,
  thinking: 900,
  stream: 28,
  hold: 2200,
  reset: 450,
} as const;

export const UI_OPACITY = 0.34;

export type Gpt3ApiCanvasState = {
  sceneIndex: number;
  phase: Gpt3ApiPhase;
  phaseElapsed: number;
  visibleInputChars: number;
  visibleResponseChars: number;
  sceneOpacity: number;
  sendPulse: number;
};

export function createGpt3ApiCanvasState(): Gpt3ApiCanvasState {
  return {
    sceneIndex: 0,
    phase: "input-typing",
    phaseElapsed: 0,
    visibleInputChars: 0,
    visibleResponseChars: 0,
    sceneOpacity: 1,
    sendPulse: 0,
  };
}

export function getCurrentScene(state: Gpt3ApiCanvasState): Gpt3ApiScene {
  return GPT3_API_SCENES[state.sceneIndex % GPT3_API_SCENES.length]!;
}

export function visibleInputText(scene: Gpt3ApiScene, visibleChars: number): string {
  return scene.prompt.slice(0, Math.min(visibleChars, scene.prompt.length));
}

export function visibleResponseText(scene: Gpt3ApiScene, visibleChars: number): string {
  return scene.completion.slice(0, Math.min(visibleChars, scene.completion.length));
}

export function thinkingDotScale(phaseElapsed: number, dotIndex: number): number {
  const wave = (phaseElapsed / 280 + dotIndex * 0.45) % 1;
  return 0.55 + 0.45 * Math.sin(wave * Math.PI);
}

export function stepGpt3ApiCanvasState(state: Gpt3ApiCanvasState, deltaMs: number) {
  state.phaseElapsed += deltaMs;

  const scene = getCurrentScene(state);

  if (state.phase === "input-typing") {
    const charsToShow = Math.floor(state.phaseElapsed / PHASE_MS.inputTyping);
    state.visibleInputChars = Math.min(charsToShow, scene.prompt.length);

    if (state.visibleInputChars >= scene.prompt.length) {
      state.phase = "send";
      state.phaseElapsed = 0;
      state.sendPulse = 0;
    }
    return;
  }

  if (state.phase === "send") {
    state.sendPulse = Math.min(1, state.phaseElapsed / PHASE_MS.send);
    if (state.phaseElapsed >= PHASE_MS.send) {
      state.phase = "thinking";
      state.phaseElapsed = 0;
    }
    return;
  }

  if (state.phase === "thinking") {
    if (state.phaseElapsed >= PHASE_MS.thinking) {
      state.phase = "streaming";
      state.phaseElapsed = 0;
    }
    return;
  }

  if (state.phase === "streaming") {
    const streamChars = Math.floor(state.phaseElapsed / PHASE_MS.stream);
    state.visibleResponseChars = Math.min(streamChars, scene.completion.length);

    if (state.visibleResponseChars >= scene.completion.length) {
      state.phase = "hold";
      state.phaseElapsed = 0;
    }
    return;
  }

  if (state.phase === "hold") {
    if (state.phaseElapsed >= PHASE_MS.hold) {
      state.phase = "reset";
      state.phaseElapsed = 0;
    }
    return;
  }

  const fadeProgress = Math.min(1, state.phaseElapsed / PHASE_MS.reset);
  state.sceneOpacity = 1 - fadeProgress;

  if (fadeProgress >= 1) {
    state.sceneIndex = (state.sceneIndex + 1) % GPT3_API_SCENES.length;
    state.phase = "input-typing";
    state.phaseElapsed = 0;
    state.visibleInputChars = 0;
    state.visibleResponseChars = 0;
    state.sceneOpacity = 1;
    state.sendPulse = 0;
  }
}

type ChatLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
  padding: number;
  fontSize: number;
  lineHeight: number;
  bodyFont: string;
  titleFont: string;
};

function getChatLayout(width: number, height: number): ChatLayout {
  const panelWidth = width * 0.96;
  const panelHeight = height * 0.94;
  const fontSize = Math.max(17, Math.min(24, width * 0.048));

  return {
    x: (width - panelWidth) / 2,
    y: (height - panelHeight) / 2,
    width: panelWidth,
    height: panelHeight,
    padding: Math.max(22, width * 0.03),
    fontSize,
    lineHeight: fontSize * 1.42,
    bodyFont: `500 ${fontSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`,
    titleFont: `600 ${Math.max(15, fontSize - 2)}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`,
  };
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current.length > 0 ? `${current} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && current.length > 0) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current.length > 0) {
    lines.push(current);
  }

  return lines.length > 0 ? lines : [""];
}

function measureWrappedTextHeight(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = wrapText(ctx, text, maxWidth);
  return lines.length * lineHeight;
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

function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";

  for (let index = 0; index < 4; index += 1) {
    ctx.save();
    ctx.rotate((Math.PI / 2) * index);
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.15);
    ctx.lineTo(0, -size);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

function drawMessageBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  text: string,
  layout: ChatLayout,
  variant: "user" | "assistant",
) {
  const bubblePaddingX = Math.max(16, layout.fontSize * 0.9);
  const bubblePaddingY = Math.max(14, layout.fontSize * 0.75);
  const maxTextWidth = width - bubblePaddingX * 2;

  ctx.font = layout.bodyFont;
  const textHeight = measureWrappedTextHeight(ctx, text, maxTextWidth, layout.lineHeight);
  const bubbleHeight = textHeight + bubblePaddingY * 2;

  ctx.fillStyle = variant === "user" ? "rgba(52, 53, 65, 0.95)" : "rgba(68, 70, 84, 0.92)";
  roundRect(ctx, x, y, width, bubbleHeight, Math.max(18, layout.fontSize * 1.1));
  ctx.fill();

  ctx.fillStyle = "rgba(236, 236, 241, 0.96)";
  const lines = wrapText(ctx, text, maxTextWidth);
  let textY = y + bubblePaddingY + layout.fontSize * 0.85;

  for (const line of lines) {
    ctx.fillText(line, x + bubblePaddingX, textY);
    textY += layout.lineHeight;
  }

  return bubbleHeight;
}

function drawThinkingDots(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  phaseElapsed: number,
  layout: ChatLayout,
) {
  const bubbleHeight = Math.max(52, layout.fontSize * 3.2);
  ctx.fillStyle = "rgba(68, 70, 84, 0.92)";
  roundRect(ctx, x, y, width, bubbleHeight, Math.max(18, layout.fontSize * 1.1));
  ctx.fill();

  const dotRadius = Math.max(5, layout.fontSize * 0.28);
  const gap = Math.max(12, layout.fontSize * 0.65);
  const totalWidth = dotRadius * 2 * 3 + gap * 2;
  let dotX = x + (width - totalWidth) / 2 + dotRadius;

  for (let index = 0; index < 3; index += 1) {
    const scale = thinkingDotScale(phaseElapsed, index);
    ctx.beginPath();
    ctx.fillStyle = `rgba(236, 236, 241, ${0.45 + scale * 0.45})`;
    ctx.arc(dotX, y + bubbleHeight / 2, dotRadius * scale, 0, Math.PI * 2);
    ctx.fill();
    dotX += dotRadius * 2 + gap;
  }

  return bubbleHeight;
}

function drawInputBar(
  ctx: CanvasRenderingContext2D,
  layout: ChatLayout,
  inputText: string,
  sendPulse: number,
  showCaret: boolean,
) {
  const barHeight = Math.max(54, layout.fontSize * 3.4);
  const barY = layout.y + layout.height - layout.padding - barHeight;
  const barX = layout.x + layout.padding;
  const barWidth = layout.width - layout.padding * 2;
  const sendSize = Math.max(36, layout.fontSize * 2.2);

  ctx.fillStyle = "rgba(48, 49, 58, 0.95)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  roundRect(ctx, barX, barY, barWidth, barHeight, barHeight / 2);
  ctx.fill();
  ctx.stroke();

  const textX = barX + layout.fontSize;
  const textY = barY + barHeight / 2 + layout.fontSize * 0.35;
  const maxTextWidth = barWidth - sendSize - 36;

  ctx.font = layout.bodyFont;
  const displayText = inputText.length > 0 ? inputText : "Message…";
  ctx.fillStyle = inputText.length > 0 ? "rgba(236, 236, 241, 0.95)" : "rgba(148, 163, 184, 0.7)";

  const clipped = wrapText(ctx, displayText, maxTextWidth)[0] ?? "";
  ctx.fillText(clipped, textX, textY);

  if (showCaret && inputText.length > 0) {
    const caretX = textX + ctx.measureText(clipped).width + 2;
    ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
    ctx.fillRect(caretX, barY + barHeight * 0.22, 2, barHeight * 0.56);
  }

  const sendX = barX + barWidth - sendSize - 8;
  const sendY = barY + (barHeight - sendSize) / 2;
  const sendScale = 1 - sendPulse * 0.08;

  ctx.save();
  ctx.translate(sendX + sendSize / 2, sendY + sendSize / 2);
  ctx.scale(sendScale, sendScale);
  ctx.translate(-(sendX + sendSize / 2), -(sendY + sendSize / 2));

  ctx.fillStyle = inputText.length > 0 ? "rgba(16, 185, 129, 0.95)" : "rgba(100, 116, 139, 0.55)";
  roundRect(ctx, sendX, sendY, sendSize, sendSize, sendSize / 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
  ctx.lineWidth = Math.max(1.8, sendSize * 0.06);
  ctx.beginPath();
  const tipX = sendX + sendSize * 0.78;
  const midY = sendY + sendSize * 0.5;
  const stemLeft = sendX + sendSize * 0.36;
  const stemRight = sendX + sendSize * 0.62;
  ctx.moveTo(stemLeft, midY);
  ctx.lineTo(stemRight, midY);
  ctx.lineTo(stemRight, sendY + sendSize * 0.28);
  ctx.lineTo(tipX, midY);
  ctx.lineTo(stemRight, sendY + sendSize * 0.72);
  ctx.lineTo(stemRight, midY);
  ctx.stroke();
  ctx.restore();
}

export function renderGpt3ApiCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: Gpt3ApiCanvasState,
) {
  ctx.clearRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, width * 0.85);
  glow.addColorStop(0, "rgba(16, 185, 129, 0.06)");
  glow.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const layout = getChatLayout(width, height);
  const scene = getCurrentScene(state);
  const alpha = UI_OPACITY * state.sceneOpacity;

  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = "rgba(32, 33, 35, 0.72)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  roundRect(ctx, layout.x, layout.y, layout.width, layout.height, Math.max(22, layout.fontSize * 1.2));
  ctx.fill();
  ctx.stroke();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  const headerY = layout.y + layout.padding;
  const sparkleSize = Math.max(16, layout.fontSize * 0.95);
  drawSparkle(ctx, layout.x + layout.padding + sparkleSize * 0.55, headerY + sparkleSize * 0.7, sparkleSize);
  ctx.font = layout.titleFont;
  ctx.fillStyle = "rgba(236, 236, 241, 0.95)";
  ctx.fillText("Chat", layout.x + layout.padding + sparkleSize * 1.7, headerY + sparkleSize * 0.95);

  const contentTop = headerY + sparkleSize * 1.8;
  const bubbleWidth = layout.width - layout.padding * 2;
  const bubbleX = layout.x + layout.padding;
  let bubbleY = contentTop;

  const showUserBubble = state.phase !== "input-typing" && state.phase !== "send";
  const showAssistant =
    state.phase === "thinking" || state.phase === "streaming" || state.phase === "hold";

  if (showUserBubble) {
    bubbleY += drawMessageBubble(ctx, bubbleX, bubbleY, bubbleWidth, scene.prompt, layout, "user") + layout.fontSize * 0.75;
  }

  if (showAssistant) {
    if (state.phase === "thinking") {
      drawThinkingDots(ctx, bubbleX, bubbleY, Math.min(96, bubbleWidth * 0.18), state.phaseElapsed, layout);
    } else {
      const response = visibleResponseText(scene, state.visibleResponseChars);
      const streamingSuffix = state.phase === "streaming" ? "▍" : "";
      drawMessageBubble(
        ctx,
        bubbleX,
        bubbleY,
        bubbleWidth,
        `${response}${streamingSuffix}`,
        layout,
        "assistant",
      );
    }
  }

  const inputText =
    state.phase === "input-typing" || state.phase === "send"
      ? visibleInputText(scene, state.visibleInputChars)
      : "";

  drawInputBar(
    ctx,
    layout,
    inputText,
    state.sendPulse,
    state.phase === "input-typing" && Math.floor(state.phaseElapsed / 500) % 2 === 0,
  );

  ctx.restore();
}
