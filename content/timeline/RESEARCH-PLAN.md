# Techline research plan — languages & frameworks

> **Infrastructure, protocols & tooling:** see [RESEARCH-PLAN-INFRA.md](./RESEARCH-PLAN-INFRA.md) (databases, HTTP, web servers, Git, npm, Docker, IDEs, CI, etc.)
>
> **Devices & hardware:** see [RESEARCH-PLAN-DEVICES.md](./RESEARCH-PLAN-DEVICES.md) (PCs, servers, smartphones, embedded boards)
>
> **People & leadership milestones:** see [RESEARCH-PLAN-PEOPLE.md](./RESEARCH-PLAN-PEOPLE.md) (founders, CEOs, researchers, maintainers — not biographies)
>
> **Famous quotes:** see [RESEARCH-PLAN-QUOTES.md](./RESEARCH-PLAN-QUOTES.md) (predictions, memes, controversies — not apocrypha)

All dates must be verified from primary or authoritative sources before adding to `content/timeline/`.
Status: `[ ]` pending · `[~]` in progress · `[x]` verified & added · `[-]` skip (not notable enough)

## Rules for inclusion

1. **Creation / first public release** — always include for tier-1 items.
2. **Major language standards** — e.g. ANSI C (1989), C++98, ECMAScript editions, Python 2/3.
3. **Paradigm shifts only** — Rails for Ruby, Laravel+Symfony components, Python 3 migration, async/await in JS, etc.
4. **Skip** patch releases, bugfix LTS point releases, formatting-only changes.
5. **Never guess** — if date is fuzzy, use `year.json` + `datePrecision: "year"` and cite source.

---

## Tier 1 — Must cover (foundational & mainstream)

### Assembly & low-level
| Item | Events to verify | Status |
|------|------------------|--------|
| Assembly (concept) | First assemblers (1947–1950s), NASM, GNU as | `[x]` EDSAC Initial Orders May 1949 |

### 1950s–1960s languages
| Item | Events to verify | Status |
|------|------------------|--------|
| Fortran | Feb 1957 announcement, Apr 1957 delivery, Fortran 77/90/95/2003 | `[x]` all major standards |
| Lisp | 1958 McCarthy, first interpreter May 1959 | `[x]` |
| COBOL | 1959 CODASYL specs Dec 17, first run Aug 1960 | `[x]` |
| ALGOL | ALGOL 58, ALGOL 60 | `[x]` |
| BASIC | 1964 Dartmouth | `[x]` |
| Simula | 1967 (OOP origins) | `[x]` |
| BCPL / B | 1967 / 1969 (C precursors) | `[x]` |

### 1970s–1980s
| Item | Events to verify | Status |
|------|------------------|--------|
| C | 1972 Bell Labs, K&R Feb 22 1978, ANSI C 1989 | `[x]` |
| Pascal | 1970 Wirth | `[x]` |
| SQL | 1974 IBM System R | `[x]` |
| C++ | Cfront 1.0 Oct 1985, templates Oct 1991, C++98/11 | `[x]` |
| Ada | 1983 DoD standard | `[x]` |
| Objective-C | 1984 | `[x]` |
| C++ STL / templates | Cfront 3.0 Oct 1991 templates | `[x]` |
| Perl | 1987 Larry Wall | `[x]` |
| Tcl | 1988 | `[x]` |
| Visual Basic (classic) | 1991 Microsoft May | `[x]` |

### 1990s scripting & VM langs
| Item | Events to verify | Status |
|------|------------------|--------|
| Python | Feb 1991 0.9.0, **3.0 Dec 3 2008**; typing/async TBD | `[x]` |
| Ruby | Dec 21 1995 0.95, **Rails Jul 24 2004, 1.0 Dec 13 2005** | `[x]` |
| Java | May 23 1995, JDK 1.0 Jan 23 1996 | `[x]` |
| JavaScript | May 1995 Mocha, Dec 4 1995 name, ES1/3/5/2015 | `[x]` |
| PHP | 1995 Rasmus Lerdorf | `[x]` |
| R | 1993 | `[x]` |
| Lua | 1993 | `[x]` |
| Haskell | 1990 report | `[x]` |

### 2000s–2010s
| Item | Events to verify | Status |
|------|------------------|--------|
| C# | Jun 26 2000 announcement | `[x]` |
| ActionScript | Flash 4 scripting Jun 1999, **AS 1.0 Aug 24 2000** | `[x]` |
| Scala | 2004 | `[x]` |
| Go | Nov 2009 public | `[x]` |
| Rust | 2010 Mozilla, 1.0 2015 | `[x]` |
| TypeScript | Oct 2012 public | `[x]` |
| Swift | Jun 2014 WWDC | `[x]` |
| Kotlin | Jul 2011 JetBrains, 2016 1.0 | `[x]` |
| Dart | 2011 | `[x]` Oct 10 2011 |
| Elixir | 2012 | `[x]` v0.1.0 Mar 2 2011 |

---

## Tier 2 — Major frameworks & ecosystems

| Item | Events to verify | Status |
|------|------------------|--------|
| Ruby on Rails | Jul 24 2004 OSS, Dec 13 2005 v1.0 | `[x]` |
| Django | Jul 13 2005 open-sourced | `[x]` |
| Symfony (PHP) | Oct 22 2005 | `[x]` |
| Laravel | Jun 9 2011 beta, **Symfony HttpFoundation May 22 2012 (v3.2)** | `[x]` |
| Spring Framework | 2003 first release | `[x]` 1.0 Mar 24 2004 |
| .NET Framework | Feb 2002 RTM | `[x]` RTM Jan 15 2002 |
| ASP.NET | 2002 | `[x]` |
| Node.js | May 27 2009 Ryan Dahl | `[x]` |
| Express | 2010 | `[x]` Jan 3 2010 |
| React | May 2013 open source | `[x]` |
| AngularJS | 2010 | `[x]` Oct 20 2010 |
| Angular (2+) | Sep 2016 | `[x]` |
| Vue.js | Feb 2014 public release | `[x]` |
| Next.js | Oct 25 2016 | `[x]` |
| NestJS | Feb 26 2017 | `[x]` |
| Flask | 2010 | `[x]` |
| FastAPI | Dec 2018 | `[x]` |

---

## Tier 3 — Notable but secondary (scan after tier 1–2)

| Item | Status |
|------|--------|
| AWK | `[x]` 1977 |
| Erlang | `[x]` OSS Dec 8 1998 |
| F# | `[x]` 2.0 Apr 2010 |
| GraphQL | `[x]` Jul 1 2015 |
| WebAssembly | `[x]` MVP Mar 2017 |
| Prolog | `[x]` fall 1972 Marseille |
| OCaml | `[x]` 1.00 May 9 1996 |
| MATLAB | `[x]` PC-MATLAB Dec 1984 |
| PowerShell | `[x]` 1.0 Nov 14 2006 |
| Delphi | `[x]` 1.0 Feb 14 1995 |
| Groovy | `[x]` 1.0 Jan 5 2007 |
| Crystal | `[x]` 0.1.0 Jun 19 2014 |
| Zig | `[x]` announced Feb 8 2016 |
| Bash | `[x]` 1.0 Jun 8 1989 |
| APL, Forth, etc. | `[ ]` |

---

## Python milestones (user examples — verify each)

| Event | Notes | Status |
|-------|-------|--------|
| Python 0.9.0 | Feb 20 1991 | `[x]` |
| Python 3.0 | Dec 3 2008 | `[x]` |
| "Signals" | **Needs clarification** — Django signals? PEP? User to confirm | `[ ]` |

---

## Research workflow (one by one)

For each row:
1. Find primary source (author blog, release tag, ISO standard date, conference announcement).
2. Cross-check one secondary source (Computer History Museum, Wikipedia with citation, official docs).
3. Draft event with `narrative` (why chosen / important / problem solved).
4. Place in correct `YYYY/MM.json` or `YYYY/year.json`.
5. Run `npm run validate`.
6. Mark `[x]` in this file.

---

## Batch order

1. **Batch A** — Fortran, Lisp, COBOL, ALGOL, BASIC, Assembly era ✓
2. **Batch B** — C, B, Pascal, SQL, C++ (+ standards) ✓
3. **Batch C** — Python, Ruby, Perl, Tcl, PHP ✓
4. **Batch D** — Java, JavaScript, ECMAScript milestones ✓
5. **Batch E** — C#, VB, VB.NET, ActionScript ✓
6. **Batch F** — Go, Rust, Swift, Kotlin, TypeScript, Scala, Haskell, Lua, R ✓
7. **Batch G** — Rails, Django, Symfony, Laravel, Spring, .NET ✓
8. **Batch H** — Node, React, Vue, Angular, Next.js, NestJS, Express, FastAPI ✓
9. **Batch I** — Ada, ObjC, AWK, Erlang, F#, Kotlin 1.0, Dart, Elixir, GraphQL, WASM ✓
10. **Batch J** — Prolog, OCaml, MATLAB, PowerShell, Delphi, Groovy, Crystal, Zig, Bash ✓

---

## Sources to prefer

- Author announcements (stroustrup.com, guido.be, etc.)
- Official release tags / changelogs on GitHub
- ISO/IEC standard publication dates
- Computer History Museum, ACM HOPL papers
- Original conference dates (HOPL, WWDC, Google I/O)

Avoid: uncited blog posts, rounded "circa" dates without backing.
