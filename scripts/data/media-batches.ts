import {
  BATCH_0_COMMONS_OVERRIDES,
  BATCH_0_OPENVERSE_QUERIES,
  BATCH_0_WIKI_TITLES,
} from "./media-wiki-titles-batch-0";
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
import {
  BATCH_12_COMMONS_OVERRIDES,
  BATCH_12_OPENVERSE_QUERIES,
  BATCH_12_WIKI_TITLES,
} from "./media-wiki-titles-batch-12";
import {
  BATCH_13_COMMONS_OVERRIDES,
  BATCH_13_OPENVERSE_QUERIES,
  BATCH_13_WIKI_TITLES,
} from "./media-wiki-titles-batch-13";
import {
  BATCH_14_COMMONS_OVERRIDES,
  BATCH_14_OPENVERSE_QUERIES,
  BATCH_14_WIKI_TITLES,
} from "./media-wiki-titles-batch-14";
import {
  BATCH_15_COMMONS_OVERRIDES,
  BATCH_15_OPENVERSE_QUERIES,
  BATCH_15_WIKI_TITLES,
} from "./media-wiki-titles-batch-15";
import {
  BATCH_16_COMMONS_OVERRIDES,
  BATCH_16_OPENVERSE_QUERIES,
  BATCH_16_WIKI_TITLES,
} from "./media-wiki-titles-batch-16";
import {
  BATCH_17_COMMONS_OVERRIDES,
  BATCH_17_OPENVERSE_QUERIES,
  BATCH_17_WIKI_TITLES,
} from "./media-wiki-titles-batch-17";
import {
  BATCH_18_COMMONS_OVERRIDES,
  BATCH_18_OPENVERSE_QUERIES,
  BATCH_18_WIKI_TITLES,
} from "./media-wiki-titles-batch-18";
import {
  BATCH_19_COMMONS_OVERRIDES,
  BATCH_19_OPENVERSE_QUERIES,
  BATCH_19_WIKI_TITLES,
} from "./media-wiki-titles-batch-19";
import {
  BATCH_20_COMMONS_OVERRIDES,
  BATCH_20_OPENVERSE_QUERIES,
  BATCH_20_WIKI_TITLES,
} from "./media-wiki-titles-batch-20";
import {
  BATCH_21_COMMONS_OVERRIDES,
  BATCH_21_OPENVERSE_QUERIES,
  BATCH_21_WIKI_TITLES,
} from "./media-wiki-titles-batch-21";
import {
  BATCH_22_COMMONS_OVERRIDES,
  BATCH_22_OPENVERSE_QUERIES,
  BATCH_22_WIKI_TITLES,
} from "./media-wiki-titles-batch-22";

export type MediaBatchConfig = {
  wikiTitles: Record<string, string>;
  openverseQueries: Record<string, string>;
  commonsOverrides: Record<string, string>;
};

export function getMediaBatchConfig(offset: number): MediaBatchConfig {
  if (offset >= 1020) {
    return {
      wikiTitles: BATCH_22_WIKI_TITLES,
      openverseQueries: BATCH_22_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_22_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 970) {
    return {
      wikiTitles: BATCH_21_WIKI_TITLES,
      openverseQueries: BATCH_21_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_21_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 920) {
    return {
      wikiTitles: BATCH_20_WIKI_TITLES,
      openverseQueries: BATCH_20_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_20_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 870) {
    return {
      wikiTitles: BATCH_19_WIKI_TITLES,
      openverseQueries: BATCH_19_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_19_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 820) {
    return {
      wikiTitles: BATCH_18_WIKI_TITLES,
      openverseQueries: BATCH_18_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_18_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 770) {
    return {
      wikiTitles: BATCH_17_WIKI_TITLES,
      openverseQueries: BATCH_17_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_17_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 720) {
    return {
      wikiTitles: BATCH_16_WIKI_TITLES,
      openverseQueries: BATCH_16_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_16_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 670) {
    return {
      wikiTitles: BATCH_15_WIKI_TITLES,
      openverseQueries: BATCH_15_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_15_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 620) {
    return {
      wikiTitles: BATCH_14_WIKI_TITLES,
      openverseQueries: BATCH_14_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_14_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 570) {
    return {
      wikiTitles: BATCH_13_WIKI_TITLES,
      openverseQueries: BATCH_13_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_13_COMMONS_OVERRIDES,
    };
  }

  if (offset >= 520) {
    return {
      wikiTitles: BATCH_12_WIKI_TITLES,
      openverseQueries: BATCH_12_OPENVERSE_QUERIES,
      commonsOverrides: BATCH_12_COMMONS_OVERRIDES,
    };
  }

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

  return {
    wikiTitles: BATCH_0_WIKI_TITLES,
    openverseQueries: BATCH_0_OPENVERSE_QUERIES,
    commonsOverrides: BATCH_0_COMMONS_OVERRIDES,
  };
}
