import { NextResponse } from "next/server";

import { isDevEnvironment } from "@/lib/dev";
import { appendWrongEventImageId, isValidEventId } from "@/lib/timeline/wrong-images";

export async function POST(request: Request) {
  if (!isDevEnvironment()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const eventId =
    typeof body === "object" && body !== null && "eventId" in body
      ? String((body as { eventId: unknown }).eventId).trim()
      : "";

  if (!isValidEventId(eventId)) {
    return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
  }

  const added = await appendWrongEventImageId(eventId);

  return NextResponse.json({ eventId, added });
}
