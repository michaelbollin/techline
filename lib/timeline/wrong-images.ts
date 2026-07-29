import { appendFile, readFile } from "node:fs/promises";
import path from "node:path";

export const WRONG_EVENT_IMAGES_PATH = path.join(
  process.cwd(),
  "scripts/wrong-event-images.txt",
);

const EVENT_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidEventId(eventId: string): boolean {
  return EVENT_ID_PATTERN.test(eventId);
}

export function parseWrongEventImageIds(content: string): Set<string> {
  return new Set(
    content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")),
  );
}

export async function readWrongEventImageIds(): Promise<Set<string>> {
  try {
    const content = await readFile(WRONG_EVENT_IMAGES_PATH, "utf8");
    return parseWrongEventImageIds(content);
  } catch {
    return new Set();
  }
}

/** Appends an event id if not already listed. Returns true when newly added. */
export async function appendWrongEventImageId(eventId: string): Promise<boolean> {
  if (!isValidEventId(eventId)) {
    throw new Error(`Invalid event id: ${eventId}`);
  }

  const ids = await readWrongEventImageIds();
  if (ids.has(eventId)) {
    return false;
  }

  await appendFile(WRONG_EVENT_IMAGES_PATH, `${eventId}\n`, "utf8");
  return true;
}
