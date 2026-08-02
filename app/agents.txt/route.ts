import { buildAgentsTxt, discoveryTextResponse } from "@/lib/site-discovery";

export function GET() {
  return discoveryTextResponse(buildAgentsTxt());
}
