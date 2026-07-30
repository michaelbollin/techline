#!/usr/bin/env npx tsx
/** @deprecated Use `npx tsx scripts/seed-media-batch.ts 70 50` */
export {};

if (!process.argv[2]) {
  process.argv[2] = "70";
}
await import("./seed-media-batch.ts");
