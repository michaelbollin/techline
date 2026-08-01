import { TUX_ASPECT } from "./penguin";

export type LinuxScene = {
  cx: number;
  cy: number;
  terminal: {
    x: number;
    y: number;
    width: number;
    height: number;
    rx: number;
    paddingX: number;
  };
  penguin: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  strokeWidth: number;
  fontSize: number;
  lineHeight: number;
  /** Verbatim phrases from Torvalds' Aug 25, 1991 comp.os.minix post. */
  terminalLines: readonly string[];
};

/**
 * From Linus Torvalds, comp.os.minix, 25 Aug 1991 (trimmed).
 */
export const TERMINAL_LINES = [
  "Hello everybody out there",
  "using minix —",
  "just a hobby, won't be big",
] as const;

function terminalMetrics(basis: number) {
  const height = basis * 0.34;
  const fontSize = Math.max(11, height * 0.088);
  const paddingX = fontSize * 1.1;
  const charWidth = fontSize * 0.64;
  const longestChars = Math.max(...TERMINAL_LINES.map((line) => line.length));
  const width = Math.max(
    basis * 0.52,
    longestChars * charWidth + paddingX * 2 + fontSize * 0.5,
  );

  return {
    width,
    height,
    fontSize,
    paddingX,
    lineHeight: height * 0.13,
    rx: basis * 0.02,
  };
}

export function buildLinuxScene(width: number, height: number): LinuxScene {
  const basis = Math.min(width, height);
  const strokeWidth = Math.max(3, Math.min(6, basis * 0.0055));
  const cx = width * 0.5;
  const cy = height * 0.5;
  const terminal = terminalMetrics(basis);
  const penguinWidth = basis * 0.15;
  const penguinHeight = penguinWidth * TUX_ASPECT;

  return {
    cx,
    cy,
    terminal: {
      x: cx - terminal.width / 2,
      y: cy - terminal.height * 0.55,
      width: terminal.width,
      height: terminal.height,
      rx: terminal.rx,
      paddingX: terminal.paddingX,
    },
    penguin: {
      x: cx - terminal.width * 0.52,
      y: cy + terminal.height * 0.12,
      width: penguinWidth,
      height: penguinHeight,
    },
    strokeWidth,
    fontSize: terminal.fontSize,
    lineHeight: terminal.lineHeight,
    terminalLines: TERMINAL_LINES,
  };
}
