import { visualImportanceTier, type Importance } from "./importance";

export const DOT_COLLISION_GAP = 4;

export function desktopDotRadius(importance: Importance, filled: boolean): number {
  const tier = visualImportanceTier(importance);

  if (filled) {
    if (tier === 0) {
      return 9;
    }

    if (tier === 1) {
      return 7;
    }

    return 5.5;
  }

  if (tier === 0) {
    return 5;
  }

  if (tier === 1) {
    return 4;
  }

  return 3.25;
}

export function desktopHitRadius(importance: Importance): number {
  return desktopDotRadius(importance, false) + 4;
}

export function mobileDotRadius(importance: Importance, filled: boolean): number {
  const tier = visualImportanceTier(importance);

  if (filled) {
    if (tier === 0) {
      return 8;
    }

    if (tier === 1) {
      return 6.5;
    }

    return 5;
  }

  if (tier === 0) {
    return 4.5;
  }

  if (tier === 1) {
    return 3.75;
  }

  return 3;
}

export function mobileHitRadius(importance: Importance): number {
  return mobileDotRadius(importance, false) + 4;
}
