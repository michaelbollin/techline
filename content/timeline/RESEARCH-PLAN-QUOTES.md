# Techline research plan — famous quotes

Companion to [RESEARCH-PLAN-PEOPLE.md](./RESEARCH-PLAN-PEOPLE.md) (career milestones), [RESEARCH-PLAN.md](./RESEARCH-PLAN.md) (languages), [RESEARCH-PLAN-INFRA.md](./RESEARCH-PLAN-INFRA.md) (infrastructure), and [RESEARCH-PLAN-DEVICES.md](./RESEARCH-PLAN-DEVICES.md) (hardware).

All dates must be verified from primary or authoritative sources before adding to the timeline.
Status: `[ ]` pending · `[~]` in progress · `[x]` verified & added · `[-]` skip (not notable enough / apocryphal)

---

## Rules for inclusion

1. **Famous words, not biographies** — the quote is the event. Title describes who said it and the context; `quoteText` holds the exact wording (or the canonical short form).
2. **Surprising, influential, or infamous** — predictions that aged (Moore, Andreessen), laws (Brooks), flame wars (Dijkstra, Tanenbaum), memes (Ballmer), controversial CEO lines (Linux cancer, move fast and break things).
3. **Speaker need not be in people backlog** — attribute via `people` when helpful, but quotes stand alone.
4. **Avoid apocrypha** — skip misattributed lines unless the *misquote itself* is historically notable (e.g. Gates "640K" only if we document it as legend). Default: `[-]` skip.
5. **Don't duplicate tech/people milestones** — link with `relatedIds` (e.g. Moore's Law paper → `gordon-moore-moores-law`). The quote event is about the *words*, not the product launch.
6. **Tag tone** — use one or more: `insight`, `prediction`, `controversy`, `critique`, `meme`, `warning`. Always include `quote`.
7. **Never guess dates** — use `year.json` + `datePrecision: "year"` when only the year is known.
8. **Video when available** — add `media` with `type: "youtube"` for famous clips (Ballmer chants, Senate testimony, etc.).

```bash
# After editing scripts/data/quotes.ts:
npm run seed:quotes   # upserts by id (updates media & people too)
npm run validate
```

---

## Q1 — Canonical quotes `[x]` done

| Event id | Speaker | Quote (short) | Date | Tone | Status |
|----------|---------|---------------|------|------|--------|
| `moore-components-doubling-quote` | Gordon Moore | Component density doubles yearly | 1965-04-19 | prediction | `[x]` |
| `dijkstra-goto-letter-quote` | Edsger Dijkstra | Go To considered harmful | 1968-03 | critique | `[x]` |
| `knuth-premature-optimization` | Donald Knuth | Premature optimization is the root of all evil | 1974-12 | insight | `[x]` |
| `brooks-add-manpower-makes-later` | Fred Brooks | Adding manpower to a late project makes it later | 1975 | insight | `[x]` |
| `stallman-free-speech-not-beer` | Richard Stallman | Free as in speech, not beer | 1996 | insight | `[x]` |
| `gabriel-worse-is-better` | Richard Gabriel | Worse is better | 1990 | critique | `[x]` |
| `tanenbaum-linux-obsolete` | Andrew Tanenbaum | LINUX is obsolete | 1992-01-29 | controversy | `[x]` |
| `torvalds-talk-is-cheap` | Linus Torvalds | Talk is cheap. Show me the code. | 2000-08-30 | insight | `[x]` |
| `ballmer-developers-chant` | Steve Ballmer | Developers! Developers! Developers! | 2000-09 | meme | `[x]` + YouTube |
| `ballmer-linux-cancer` | Steve Ballmer | Linux is a cancer | 2001-06-01 | controversy | `[x]` |
| `gates-internet-tidal-wave-memo` | Bill Gates | Internet tidal wave | 1995-05-26 | prediction | `[x]` |
| `andreessen-software-eating-world` | Marc Andreessen | Software is eating the world | 2011-08-20 | prediction | `[x]` |
| `zuckerberg-move-fast-break-things` | Mark Zuckerberg / Facebook | Move fast and break things | 2009 | controversy | `[x]` |

---

## Q2 — Predictions & laws `[x]` done

| Event id | Speaker | Quote / topic | Date | Status |
|----------|---------|---------------|------|--------|
| `metcalfe-metcalfe-law` | Robert Metcalfe | Network value ~ n² | 1980 | `[x]` |
| `amara-law` | Roy Amara | Overestimate short-term, underestimate long-term | 1975 | `[x]` |
| `hofstadter-law` | Douglas Hofstadter | Everything takes longer than expected | 1979 | `[x]` |
| `joy-most-smart-people-elsewhere` | Bill Joy | Most bright people work for someone else | 1994 | `[x]` |
| `kurzweil-law-accelerating-returns` | Ray Kurzweil | Law of accelerating returns | 2001-03-07 | `[x]` |
| `bush-as-we-may-think-memex` | Vannevar Bush | Memex vision | 1945-07 | `[x]` |

---

## Q3 — Controversies & flame wars `[x]` done

| Event id | Speaker | Topic | Date | Status |
|----------|---------|-------|------|--------|
| `torvalds-reply-linux-obsolete` | Linus Torvalds | Reply to Tanenbaum | 1992-01-29 | `[x]` |
| `schwartz-innovate-not-litigate` | Jonathan Schwartz | Innovate, not litigate | 2007-05-15 | `[x]` |
| `ellison-pc-ridiculous` | Larry Ellison | PC is a ridiculous device | 1995-09 | `[x]` |
| `jobs-flash-closed-system` | Steve Jobs | Flash is a closed system | 2010-04-29 | `[x]` |
| `musk-openai-more-open` | Elon Musk | OpenAI should be more open | 2020-02-17 | `[x]` |
| `altman-ai-goes-wrong` | Sam Altman | AI can go quite wrong | 2023-05-16 | `[x]` + YouTube |

---

## Q4 — Memes & culture `[x]` done

| Event id | Speaker | Topic | Date | Status |
|----------|---------|-------|------|--------|
| `ballmer-web-developers-chant` | Steve Ballmer | Web developers chant | 2008-03-06 | `[x]` + YouTube |
| `crockford-javascript-good-parts` | Douglas Crockford | JavaScript: the good parts | 2008-05 | `[x]` |
| `spolsky-joel-test` | Joel Spolsky | Joel Test for better software | 2000-08-09 | `[x]` |
| `fowler-refactoring-definition` | Martin Fowler | Refactoring definition | 1999 | `[x]` |
| `hunt-thomas-dry` | Hunt & Thomas | Don't repeat yourself (DRY) | 1999-10 | `[x]` |
| `greenspun-tenth-rule` | Philip Greenspun | Buggy half-Lisp in big C programs | 1993 | `[x]` |

---

## Q5 — Apocryphal / disputed `[-]` skip unless documenting the myth

| Quote | Attributed to | Why skip |
|-------|---------------|----------|
| "640K ought to be enough" | Bill Gates | No verified source; Gates denies |
| "I think there is a world market for maybe five computers" | IBM / Watson | Disputed attribution |
| "Linux is free only if your time has no value" | Unknown | Needs primary source |

---

## YouTube clips in timeline

| Event id | Video |
|----------|-------|
| `ballmer-developers-chant` | [Developers chant (.NET presentation)](https://www.youtube.com/watch?v=XxbJw8PrIkc) |
| `ballmer-web-developers-chant` | [Guy Kawasaki and Steve Ballmer at MIX08](https://www.youtube.com/watch?v=9-F139UX94A&t=3399) |
| `gates-internet-tidal-wave-memo` | [Gates explains the Internet to Letterman (1995)](https://www.youtube.com/watch?v=fs-YpQj88ew) |
| `altman-ai-goes-wrong` | [CNBC — Senate AI oversight hearing](https://www.youtube.com/watch?v=fP5YdyjTfG0&t=2709) |
| `jobs-flash-closed-system` | [Bloomberg — Jobs on Adobe Flash](https://www.youtube.com/watch?v=aSkaVyWaGeA) |

---

## File reference

| File | Purpose |
|------|---------|
| `scripts/data/quotes.ts` | Quote event definitions |
| `scripts/seed-quotes.ts` | Upserts into `content/timeline/` buckets |
| `lib/timeline/schema.ts` | `category: "quote"`, required `quoteText` |
| `content/timeline/README.md` | Schema docs |
