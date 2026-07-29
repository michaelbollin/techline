import {
  BATCH_3_COMMONS_OVERRIDES,
  BATCH_3_OPENVERSE_QUERIES,
  BATCH_3_WIKI_TITLES,
} from "./media-wiki-titles";
import {
  BATCH_4_COMMONS_OVERRIDES,
  BATCH_4_OPENVERSE_QUERIES,
  BATCH_4_WIKI_TITLES,
} from "./media-wiki-titles-batch-4";
import {
  BATCH_5_COMMONS_OVERRIDES,
  BATCH_5_OPENVERSE_QUERIES,
  BATCH_5_WIKI_TITLES,
} from "./media-wiki-titles-batch-5";
import {
  BATCH_6_COMMONS_OVERRIDES,
  BATCH_6_OPENVERSE_QUERIES,
  BATCH_6_WIKI_TITLES,
} from "./media-wiki-titles-batch-6";
import {
  BATCH_7_COMMONS_OVERRIDES,
  BATCH_7_OPENVERSE_QUERIES,
  BATCH_7_WIKI_TITLES,
} from "./media-wiki-titles-batch-7";
import {
  BATCH_8_COMMONS_OVERRIDES,
  BATCH_8_OPENVERSE_QUERIES,
  BATCH_8_WIKI_TITLES,
} from "./media-wiki-titles-batch-8";

import {
  BATCH_9_COMMONS_OVERRIDES,
  BATCH_9_OPENVERSE_QUERIES,
  BATCH_9_WIKI_TITLES,
} from "./media-wiki-titles-batch-9";
import {
  BATCH_10_COMMONS_OVERRIDES,
  BATCH_10_OPENVERSE_QUERIES,
  BATCH_10_WIKI_TITLES,
} from "./media-wiki-titles-batch-10";
import {
  BATCH_11_COMMONS_OVERRIDES,
  BATCH_11_OPENVERSE_QUERIES,
  BATCH_11_WIKI_TITLES,
} from "./media-wiki-titles-batch-11";

export type MediaBatchConfig = {
  wikiTitles: Record<string, string>;
  openverseQueries: Record<string, string>;
  commonsOverrides: Record<string, string>;
};

export function getMediaBatchConfig(offset: number): MediaBatchConfig {
  if (offset >= 470) {
    return {
      wikiTitles: BATCH_11_WIKI_TITLES,
      openverseQueries: BATCH_11_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_11_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 420) {
    return {
      wikiTitles: BATCH_10_WIKI_TITLES,
      openverseQueries: BATCH_10_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_10_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 370) {
    return {
      wikiTitles: BATCH_9_WIKI_TITLES,
      openverseQueries: BATCH_9_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_9_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 320) {
    return {
      wikiTitles: BATCH_8_WIKI_TITLES,
      openverseQueries: BATCH_8_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_8_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 270) {
    return {
      wikiTitles: BATCH_7_WIKI_TITLES,
      openverseQueries: BATCH_7_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_7_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 220) {
    return {
      wikiTitles: BATCH_6_WIKI_TITLES,
      openverseQueries: BATCH_6_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_6_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 170) {
    return {
      wikiTitles: BATCH_5_WIKI_TITLES,
      openverseQueries: BATCH_5_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_5_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 120) {
    return {
      wikiTitles: BATCH_4_WIKI_TITLES,
      openverseQueries: BATCH_4_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_4_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 70) {
    return {
      wikiTitles: BATCH_3_WIKI_TITLES,
      openverseQueries: BATCH_3_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_3_COMMONS_OVERRIDES,
    };
  }

  throw new Error(
    `No media batch config for offset ${offset}. Supported offsets: 70, 120, 170, 220, 270, 320, 370, 420, 470.`,
  );
}
