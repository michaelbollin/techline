import { cache } from "react";

import { loadTimeline } from "./load";

export const getTimeline = cache(loadTimeline);
