import type { TimelineCategory } from "./schema";

type EmojiRule = {
  pattern: RegExp;
  emoji: string;
};

/** First matching rule wins. Patterns run against the plain title (no emoji). */
const TITLE_EMOJI_RULES: EmojiRule[] = [
  { pattern: /\bopen[- ]sourced?\b/i, emoji: "🌐" },
  { pattern: /\b(released?|ships?|shipped|launched|unveiled|debuts?)\b/i, emoji: "🚀" },
  { pattern: /\bannounced\b/i, emoji: "🚀" },
  { pattern: /\b(founded|founds?|incorporated)\b/i, emoji: "🏢" },
  { pattern: /\b(acquired|acquisition|merges?d?)\b/i, emoji: "🤝" },
  { pattern: /\bipo\b/i, emoji: "📈" },
  { pattern: /\b(published|publishes)\b/i, emoji: "📄" },
  { pattern: /\b(standardized|ratified)\b/i, emoji: "📋" },
  { pattern: /\b(invented|invents|demonstrates?)\b/i, emoji: "💡" },
  { pattern: /\b(wins?|awarded|turing)\b/i, emoji: "🏆" },
  { pattern: /\bsteps? down\b/i, emoji: "👋" },
  { pattern: /\b(named|appointed)\b.*\b(ceo|cto)\b/i, emoji: "👔" },
];

const CATEGORY_EMOJI: Partial<Record<TimelineCategory, string>> = {
  quote: "💬",
  ai: "🤖",
};

export function resolveLabelEmoji(title: string, category: TimelineCategory): string | null {
  for (const rule of TITLE_EMOJI_RULES) {
    if (rule.pattern.test(title)) {
      return rule.emoji;
    }
  }

  return CATEGORY_EMOJI[category] ?? null;
}

export function bubbleTitle(title: string, category: TimelineCategory): string {
  const emoji = resolveLabelEmoji(title, category);

  if (!emoji) {
    return title;
  }

  return `${emoji} ${title}`;
}
