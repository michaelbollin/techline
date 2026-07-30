/** True during local `next dev` — not production builds or `next start` in prod. */
export function isDevEnvironment(): boolean {
  return process.env.NODE_ENV === "development";
}
