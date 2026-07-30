export type CdRomDisc = {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  spin: number;
  vx: number;
  vy: number;
  opacity: number;
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
  const discs: CdRomDisc[] = Array.from({ length: 7 }, () => ({
    x: randomBetween(width * 0.08, width * 0.92),
    y: randomBetween(height * 0.1, height * 0.9),
    radius: randomBetween(18, 42),
    rotation: randomBetween(0, Math.PI * 2),
    spin: randomBetween(-0.02, 0.02),
    vx: randomBetween(-0.25, 0.25),
    vy: randomBetween(-0.18, 0.18),
    opacity: randomBetween(0.35, 0.7),
  }));

  const bits: CdRomDataBit[] = Array.from({ length: 28 }, () => ({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    char: Math.random() > 0.5 ? "1" : "0",
    speed: randomBetween(0.35, 1.1),
    opacity: randomBetween(0.15, 0.45),
  }));

  return {
    discs,
    bits,
    laserY: height * 0.2,
    laserDirection: 1,
  };
}

function rainbowGradient(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rotation: number,
) {
  const gradient = ctx.createConicGradient(rotation, x, y);
  gradient.addColorStop(0, "rgba(255, 80, 120, 0.65)");
  gradient.addColorStop(0.17, "rgba(255, 200, 80, 0.55)");
  gradient.addColorStop(0.33, "rgba(120, 255, 120, 0.5)");
  gradient.addColorStop(0.5, "rgba(80, 200, 255, 0.6)");
  gradient.addColorStop(0.67, "rgba(160, 120, 255, 0.55)");
  gradient.addColorStop(0.83, "rgba(255, 120, 200, 0.5)");
  gradient.addColorStop(1, "rgba(255, 80, 120, 0.65)");
  return gradient;
}

function drawDisc(ctx: CanvasRenderingContext2D, disc: CdRomDisc) {
  const { x, y, radius, rotation } = disc;

  ctx.save();
  ctx.globalAlpha = disc.opacity * 0.25;
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.15, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(120, 200, 255, 0.8)";
  ctx.filter = "blur(10px)";
  ctx.fill();
  ctx.filter = "none";
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = disc.opacity;

  const body = ctx.createRadialGradient(x, y, radius * 0.08, x, y, radius);
  body.addColorStop(0, "#f5f5f5");
  body.addColorStop(0.65, "#dedede");
  body.addColorStop(1, "#b8b8b8");

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius * 0.9, 0, Math.PI * 2);
  ctx.strokeStyle = rainbowGradient(ctx, x, y, rotation);
  ctx.lineWidth = radius * 0.28;
  ctx.stroke();

  for (let ring = 0.35; ring <= 0.82; ring += 0.12) {
    ctx.beginPath();
    ctx.arc(x, y, radius * ring, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(x, y, radius * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius * 0.04, 0, Math.PI * 2);
  ctx.fillStyle = "#c8c8c8";
  ctx.fill();

  ctx.restore();
}

function drawLaser(ctx: CanvasRenderingContext2D, width: number, laserY: number) {
  const gradient = ctx.createLinearGradient(0, laserY - 12, 0, laserY + 12);
  gradient.addColorStop(0, "rgba(255, 40, 80, 0)");
  gradient.addColorStop(0.45, "rgba(255, 40, 80, 0.22)");
  gradient.addColorStop(0.5, "rgba(255, 60, 100, 0.45)");
  gradient.addColorStop(0.55, "rgba(255, 40, 80, 0.22)");
  gradient.addColorStop(1, "rgba(255, 40, 80, 0)");

  ctx.save();
  ctx.fillStyle = gradient;
  ctx.fillRect(0, laserY - 12, width, 24);

  ctx.strokeStyle = "rgba(255, 30, 70, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, laserY);
  ctx.lineTo(width, laserY);
  ctx.stroke();

  const headX = width * (0.18 + (Math.sin(laserY * 0.03) * 0.5 + 0.5) * 0.64);
  ctx.globalAlpha = 0.5;
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
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
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
