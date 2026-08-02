import { buildAgentsJson, discoveryJsonResponse } from "@/lib/site-discovery";

export function GET() {
  return discoveryJsonResponse(buildAgentsJson());
}
