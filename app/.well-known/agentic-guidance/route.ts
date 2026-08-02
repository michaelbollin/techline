import { buildAgenticGuidance, discoveryJsonResponse } from "@/lib/site-discovery";

export function GET() {
  return discoveryJsonResponse(buildAgenticGuidance());
}
