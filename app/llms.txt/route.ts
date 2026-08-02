import { buildLlmsTxt, discoveryTextResponse } from "@/lib/site-discovery";

export function GET() {
  return discoveryTextResponse(buildLlmsTxt());
}
