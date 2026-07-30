export type CdRomDisc = {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  spin: number;
  vx: number;
  vy: number;
  opacity: number;
  hueShift: number;
};

export type CdRomDataBit = {
  x: number;
  y: number;
  char: "0" | "1";
  speed: number;
  opacity: number;
};

export type CdRomCanvasState = {
  discs: CdRomDisc[];
  bits: CdRomDataBit[];
  laserY: number;
  laserDirection: 1 | -1;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function createCdRomCanvasState(width: number, height: number): CdRomCanvasState {
  const discs: CdRomDisc[] = Array.from({ length: 8 }, () => ({
    x: randomBetween(width * 0.06, width * 0.94),
    y: randomBetween(height * 0.08, height * 0.92),
    radius: randomBetween(22, 52),
    rotation: randomBetween(0, Math.PI * 2),
    spin: randomBetween(-0.018, 0.018),
    vx: randomBetween(-0.22, 0.22),
    vy: randomBetween(-0.16, 0.16),
    opacity: randomBetween(0.55, 0.92),
    hueShift: randomBetween(0, Math.PI * 2),
  }));

  const bits: CdRomDataBit[] = Array.from({ length: 36 }, () => ({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    char: Math.random() > 0.5 ? "1" : "0",
    speed: randomBetween(0.35, 1.1),
    opacity: randomBetween(0.12, 0.38),
  }));

  return {
    discs,
    bits,
    laserY: height * 0.2,
    laserDirection: 1,
  };
}

function iridescentGradient(
  ctx: CanvasRenderingContext2D,
  rotation: number,
  hueShift: number,
) {
  const gradient = ctx.createConicGradient(rotation + hueShift, 0, 0);
  gradient.addColorStop(0, "rgba(255, 70, 130, 0.55)");
  gradient.addColorStop(0.12, "rgba(255, 190, 70, 0.5)");
  gradient.addColorStop(0.24, "rgba(255, 255, 120, 0.45)");
  gradient.addColorStop(0.36, "rgba(90, 255, 150, 0.48)");
  gradient.addColorStop(0.48, "rgba(70, 210, 255, 0.55)");
  gradient.addColorStop(0.6, "rgba(120, 130, 255, 0.5)");
  gradient.addColorStop(0.72, "rgba(210, 100, 255, 0.48)");
  gradient.addColorStop(0.84, "rgba(255, 90, 180, 0.5)");
  gradient.addColorStop(1, "rgba(255, 70, 130, 0.55)");
  return gradient;
}

function drawDisc(ctx: CanvasRenderingContext2D, disc: CdRomDisc) {
  const { radius, rotation, hueShift } = disc;

  ctx.save();
  ctx.translate(disc.x, disc.y);
  ctx.globalAlpha = disc.opacity;

  ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
  ctx.shadowBlur = radius * 0.18;
  ctx.shadowOffsetY = radius * 0.06;

  const base = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius);
  base.addColorStop(0, "#f4f6fa");
  base.addColorStop(0.45, "#d5dbe6");
  base.addColorStop(0.78, "#aeb7c8");
  base.addColorStop(1, "#8f99ab");

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = base;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.clip();

  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = iridescentGradient(ctx, rotation, hueShift);
  ctx.fillRect(-radius, -radius, radius * 2, radius * 2);

  const innerFade = ctx.createRadialGradient(0, 0, radius * 0.12, 0, 0, radius);
  innerFade.addColorStop(0, "rgba(255, 255, 255, 0.82)");
  innerFade.addColorStop(0.28, "rgba(255, 255, 255, 0.35)");
  innerFade.addColorStop(0.55, "rgba(255, 255, 255, 0.05)");
  innerFade.addColorStop(1, "rgba(255, 255, 255, 0.12)");

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = innerFade;
  ctx.fillRect(-radius, -radius, radius * 2, radius * 2);

  const trackStep = Math.max(0.55, radius * 0.018);
  for (let trackRadius = radius * 0.2; trackRadius < radius * 0.96; trackRadius += trackStep) {
    const groove = 0.03 + 0.025 * Math.sin(trackRadius * 0.65 + rotation);
    ctx.strokeStyle = `rgba(20, 28, 40, ${groove})`;
    ctx.lineWidth = 0.35;
    ctx.beginPath();
    ctx.arc(0, 0, trackRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  const mirrorBand = ctx.createRadialGradient(0, 0, radius * 0.84, 0, 0, radius);
  mirrorBand.addColorStop(0, "rgba(255, 255, 255, 0)");
  mirrorBand.addColorStop(0.45, "rgba(255, 255, 255, 0.42)");
  mirrorBand.addColorStop(0.82, "rgba(210, 220, 235, 0.35)");
  mirrorBand.addColorStop(1, "rgba(150, 160, 180, 0.55)");
  ctx.fillStyle = mirrorBand;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  const specular = ctx.createLinearGradient(-radius, -radius * 0.9, radius * 0.7, radius);
  specular.addColorStop(0.32, "rgba(255, 255, 255, 0)");
  specular.addColorStop(0.48, "rgba(255, 255, 255, 0.62)");
  specular.addColorStop(0.58, "rgba(255, 255, 255, 0.18)");
  specular.addColorStop(0.72, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = specular;
  ctx.fillRect(-radius, -radius, radius * 2, radius * 2);

  const labelRadius = radius * 0.74;
  ctx.fillStyle = "rgba(255, 255, 255, 0.34)";
  ctx.beginPath();
  ctx.arc(0, -radius * 0.12, labelRadius, Math.PI * 1.08, Math.PI * 1.92);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.07)";
  ctx.lineWidth = 0.6;
  for (let line = 0; line < 5; line += 1) {
    const y = -radius * 0.42 + line * radius * 0.11;
    ctx.beginPath();
    ctx.moveTo(-radius * 0.34, y);
    ctx.lineTo(radius * 0.34, y);
    ctx.stroke();
  }

  ctx.restore();

  const hubOuter = radius * 0.19;
  const hubInner = radius * 0.11;
  const hub = ctx.createRadialGradient(0, 0, hubInner, 0, 0, hubOuter);
  hub.addColorStop(0, "rgba(255, 255, 255, 0.98)");
  hub.addColorStop(0.55, "rgba(236, 242, 250, 0.95)");
  hub.addColorStop(1, "rgba(200, 210, 225, 0.9)");

  ctx.fillStyle = hub;
  ctx.beginPath();
  ctx.arc(0, 0, hubOuter, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(0, 0, hubOuter, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.045, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.045, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawLaser(ctx: CanvasRenderingContext2D, width: number, laserY: number) {
  const gradient = ctx.createLinearGradient(0, laserY - 12, 0, laserY + 12);
  gradient.addColorStop(0, "rgba(255, 40, 80, 0)");
  gradient.addColorStop(0.45, "rgba(255, 40, 80, 0.18)");
  gradient.addColorStop(0.5, "rgba(255, 60, 100, 0.38)");
  gradient.addColorStop(0.55, "rgba(255, 40, 80, 0.18)");
  gradient.addColorStop(1, "rgba(255, 40, 80, 0)");

  ctx.save();
  ctx.fillStyle = gradient;
  ctx.fillRect(0, laserY - 12, width, 24);

  ctx.strokeStyle = "rgba(255, 30, 70, 0.45)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, laserY);
  ctx.lineTo(width, laserY);
  ctx.stroke();

  const headX = width * (0.18 + (Math.sin(laserY * 0.03) * 0.5 + 0.5) * 0.64);
  ctx.globalAlpha = 0.45;
  ctx.beginPath();
  ctx.arc(headX, laserY, 5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 80, 120, 0.8)";
  ctx.fill();
  ctx.restore();
}

function drawDataBits(ctx: CanvasRenderingContext2D, bits: CdRomDataBit[]) {
  ctx.save();
  ctx.font = "11px var(--font-geist-mono, ui-monospace, monospace)";

  for (const bit of bits) {
    ctx.globalAlpha = bit.opacity;
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillText(bit.char, bit.x, bit.y);
  }

  ctx.restore();
}

export function stepCdRomCanvasState(
  state: CdRomCanvasState,
  width: number,
  height: number,
  deltaMs: number,
) {
  const delta = deltaMs / 16;

  for (const disc of state.discs) {
    disc.rotation += disc.spin * delta;
    disc.x += disc.vx * delta;
    disc.y += disc.vy * delta;

    if (disc.x < -disc.radius) {
      disc.x = width + disc.radius;
    } else if (disc.x > width + disc.radius) {
      disc.x = -disc.radius;
    }

    if (disc.y < -disc.radius) {
      disc.y = height + disc.radius;
    } else if (disc.y > height + disc.radius) {
      disc.y = -disc.radius;
    }
  }

  for (const bit of state.bits) {
    bit.y -= bit.speed * delta;

    if (bit.y < -12) {
      bit.y = height + 12;
      bit.x = randomBetween(0, width);
      bit.char = Math.random() > 0.5 ? "1" : "0";
    }
  }

  state.laserY += state.laserDirection * 1.4 * delta;

  if (state.laserY > height * 0.88) {
    state.laserDirection = -1;
  } else if (state.laserY < height * 0.12) {
    state.laserDirection = 1;
  }
}

export function renderCdRomCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: CdRomCanvasState,
) {
  ctx.clearRect(0, 0, width, height);

  drawLaser(ctx, width, state.laserY);

  for (const disc of state.discs) {
    drawDisc(ctx, disc);
  }

  drawDataBits(ctx, state.bits);
}
