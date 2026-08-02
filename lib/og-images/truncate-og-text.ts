export function truncateOgText(text: string, maxLength: number): string {
  const trimmed = text.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}

/** Truncate at a word boundary so wrapped OG lines break cleanly between words. */
export function clampOgTextAtWords(text: string, maxChars: number): string {
  const trimmed = text.trim();

  if (trimmed.length <= maxChars) {
    return trimmed;
  }

  const slice = trimmed.slice(0, maxChars - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxChars * 0.55 ? slice.slice(0, lastSpace) : slice;

  return `${cut.trimEnd()}…`;
}
