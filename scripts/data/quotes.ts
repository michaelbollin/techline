import type { TimelineEvent } from "../../lib/timeline/schema";

type Q = Omit<TimelineEvent, "slug" | "media" | "relatedIds" | "people" | "companies" | "category"> &
  Partial<Pick<TimelineEvent, "slug" | "media" | "relatedIds" | "people" | "companies">> & {
    quoteText: string;
  };

function q(event: Q): TimelineEvent {
  return {
    ...event,
    slug: event.slug ?? event.id,
    media: event.media ?? [],
    relatedIds: event.relatedIds ?? [],
    people: event.people ?? [],
    companies: event.companies ?? [],
    category: "quote",
  };
}

/** Famous words in tech — category `quote`, complementary to people/tech milestones. */
export const QUOTES: TimelineEvent[] = [
  q({
    id: "moore-components-doubling-quote",
    date: "1965-04-19",
    datePrecision: "day",
    title: 'Gordon Moore predicts chip density will double every year',
    quoteText:
      "The complexity for minimum component costs has increased at a rate of roughly a factor of two per year. Certainly over the short term this rate can be expected to continue.",
    summary:
      'In Electronics magazine, Gordon Moore writes that transistor counts on integrated circuits double about every year — the observation later called Moore\'s Law.',
    about:
      "Moore's four-page article was a business forecast, not a law of physics. It became the industry's planning horizon for fifty years — and the punchline every time a node shrinks or a pundit declares Moore's Law dead.",
    narrative: {
      whyChosen: "This paragraph is one of the most quoted predictions in computing history.",
      whyImportant: "It set expectations for exponential hardware progress that shaped chip R&D and product roadmaps.",
      problemSolved: "Semiconductor planners lacked a simple heuristic for how fast silicon could improve.",
    },
    tags: ["quote", "prediction", "semiconductor", "moores-law"],
    people: [{ id: "gordon-moore", name: "Gordon Moore", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Moore: chip density doubles yearly",
        url: "https://en.wikipedia.org/wiki/Moore%27s_law",
        role: "date",
      },
      {
        title: "Intel — Moore's Law (overview)",
        url: "https://www.intel.com/content/www/us/en/newsroom/resources/moores-law.html",
        role: "overview",
      },
    ],
    relatedIds: ["gordon-moore-moores-law"],
  }),
  q({
    id: "dijkstra-goto-letter-quote",
    date: "1968-03",
    datePrecision: "month",
    title: 'Edsger Dijkstra declares "Go To statement considered harmful"',
    quoteText: "For a number of years I have been familiar with the observed development that program code containing go to statements cancels out the advantages of structured programming.",
    summary:
      'Dijkstra\'s letter to the Communications of the ACM editor — titled "Go To Statement Considered Harmful" — attacks unstructured jumps in code.',
    about:
      "The title became a meme decades before Twitter. Fortran and BASIC programmers had lived on GOTO; Dijkstra argued that structured control flow made programs easier to reason about. The debate still echoes whenever someone reaches for a quick escape hatch.",
    narrative: {
      whyChosen: "One of the earliest flame wars in software engineering, dressed as a one-page letter.",
      whyImportant: "It helped mainstream structured programming and later influenced language design.",
      problemSolved: "Spaghetti code from arbitrary jumps was hard to verify and maintain.",
    },
    tags: ["quote", "critique", "programming-language", "software-engineering"],
    people: [{ id: "edsger-dijkstra", name: "Edsger Dijkstra", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Dijkstra: Go To considered harmful",
        url: "https://doi.org/10.1145/362945.362947",
        role: "date",
      },
      {
        title: "Wikipedia — Go To statement considered harmful (overview)",
        url: "https://en.wikipedia.org/wiki/Go_to_statement_considered_harmful",
        role: "overview",
      },
    ],
    relatedIds: ["dijkstra-go-to-considered-harmful"],
  }),
  q({
    id: "knuth-premature-optimization",
    date: "1974-12",
    datePrecision: "month",
    title: "Knuth: premature optimization",
    quoteText: "Premature optimization is the root of all evil (or at least most of it) in programming.",
    summary:
      "Donald Knuth's paper Structured Programming with go to Statements coins the line every performance tweaker quotes back at themselves.",
    about:
      "Knuth wasn't against optimization — he argued for profiling first. The quote is misused to dismiss all early performance work, but the original point was about clarity before micro-benchmarks.",
    narrative: {
      whyChosen: "The most repeated performance advice in software engineering, often without context.",
      whyImportant: "It reframed optimization as a measured second step, not a design default.",
      problemSolved: "Teams wasted effort tuning code paths before knowing what was slow.",
    },
    tags: ["quote", "insight", "software-engineering", "algorithms"],
    people: [{ id: "donald-knuth", name: "Donald Knuth", role: "author" }],
    importance: 3,
    sources: [
      {
        title: "Knuth — Structured Programming with go to Statements (December 1974)",
        url: "https://doi.org/10.1145/356635.356640",
        role: "date",
      },
      {
        title: "Wikipedia — Donald Knuth (overview)",
        url: "https://en.wikipedia.org/wiki/Donald_Knuth",
        role: "overview",
      },
    ],
    relatedIds: ["knuth-taocp-volume-1-published"],
  }),
  q({
    id: "brooks-add-manpower-makes-later",
    date: "1975",
    datePrecision: "year",
    title: 'Fred Brooks: adding people to a late project makes it later',
    quoteText: "Adding manpower to a late software project makes it later.",
    summary:
      "Fred Brooks states Brooks's Law in The Mythical Man-Month — the book's most quoted line.",
    about:
      "Brooks drew on IBM OS/360 experience: onboarding and communication overhead eat the calendar. The line is still cited in sprint planning, reorgs, and every thread about 'we just need more engineers.'",
    narrative: {
      whyChosen: "Brooks's Law outlived the OS/360 project it described.",
      whyImportant: "It gave managers vocabulary for why throwing bodies at schedule risk backfires.",
      problemSolved: "Late projects triggered instinctive staffing increases that worsened delivery.",
    },
    tags: ["quote", "insight", "software-engineering", "management"],
    people: [{ id: "fred-brooks", name: "Fred Brooks", role: "author" }],
    importance: 3,
    sources: [
      {
        title: "Brooks: adding people delays projects",
        url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
        role: "date",
      },
      {
        title: "Wikipedia — Brooks's law (overview)",
        url: "https://en.wikipedia.org/wiki/Brooks%27s_law",
        role: "overview",
      },
    ],
    relatedIds: ["fred-brooks-mythical-man-month"],
  }),
  q({
    id: "stallman-free-speech-not-beer",
    date: "1996",
    datePrecision: "year",
    title: 'Richard Stallman: "free as in speech, not beer"',
    quoteText: "Think of 'free' as in 'free speech,' not as in 'free beer.'",
    summary:
      "Richard Stallman clarifies free software as freedom to use and modify code — not zero price.",
    about:
      "The phrase appears in GNU philosophy writing and talks as Stallman fought the confusion between gratis downloads and user freedom. It still surfaces in every LGPL vs MIT license thread.",
    narrative: {
      whyChosen: "Stallman's most effective one-liner for a politically loaded term.",
      whyImportant: "It separated libre from gratis in open-source debates for decades.",
      problemSolved: "Businesses and users conflated 'free software' with unpaid products.",
    },
    tags: ["quote", "insight", "open-source", "free-software"],
    people: [{ id: "richard-stallman", name: "Richard Stallman", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "GNU — Free Software Definition (1996 era)",
        url: "https://www.gnu.org/philosophy/free-sw.html",
        role: "date",
      },
      {
        title: "Wikipedia — Free software (overview)",
        url: "https://en.wikipedia.org/wiki/Free_software",
        role: "overview",
      },
    ],
    relatedIds: ["stallman-gnu-manifesto", "gpl-version-1-released"],
  }),
  q({
    id: "gabriel-worse-is-better",
    date: "1990",
    datePrecision: "year",
    title: 'Richard Gabriel argues "worse is better"',
    quoteText:
      "The right thing is frequently a monolithic system design, but the worse-is-better design has better survival characteristics than the right-thing design.",
    summary:
      "Richard Gabriel's Lisp conference talk — later the essay The Rise of Worse Is Better — contrasts elegant designs with messy ones that ship and spread.",
    about:
      "Gabriel was half joking, half serious: Unix and C won by being ugly and portable while Lisp machines aimed for perfection. The phrase explains why good-enough tools beat beautiful ones in the market.",
    narrative: {
      whyChosen: "Worse is better names a pattern everyone recognizes but rarely admits.",
      whyImportant: "It framed why pragmatic ecosystems outcompeted theoretically superior designs.",
      problemSolved: "Perfectionist projects kept losing to incrementally good-enough platforms.",
    },
    tags: ["quote", "critique", "unix", "lisp", "software-engineering"],
    people: [{ id: "richard-gabriel", name: "Richard Gabriel", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Gabriel — The Rise of Worse Is Better (1990 talk / 1991 essay)",
        url: "https://www.dreamsongs.com/RiseOfWorseIsBetter.html",
        role: "date",
      },
      {
        title: "Wikipedia — Worse is better (overview)",
        url: "https://en.wikipedia.org/wiki/Worse_is_better",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "tanenbaum-linux-obsolete",
    date: "1992-01-29",
    datePrecision: "day",
    title: 'Andrew Tanenbaum posts "Linux is obsolete"',
    quoteText:
      "LINUX is obsolete. I think I know a bit about where operating systems are going in the next decade or two. Multithreaded programs are the way things are going to be in the near future.",
    summary:
      "Andrew Tanenbaum tells comp.os.minix that Linux's monolithic kernel is a step backward compared to microkernels like Minix.",
    about:
      "Linus Torvalds replied the same day — the thread became legend. Tanenbaum was wrong about market outcome but right that the debate would run for decades (monolith vs microkernel, Linux vs HURD).",
    narrative: {
      whyChosen: "One of the most famous flamewars in operating-system history.",
      whyImportant: "It crystalized the architectural divide Linux chose and never really left.",
      problemSolved: "Minix users were debating whether a hobby kernel could be taken seriously.",
    },
    tags: ["quote", "controversy", "linux", "operating-system"],
    people: [{ id: "andrew-tanenbaum", name: "Andrew Tanenbaum", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "comp.os.minix — LINUX is obsolete (January 29, 1992)",
        url: "https://en.wikipedia.org/wiki/Tanenbaum%E2%80%93Torvalds_debate",
        role: "date",
      },
      {
        title: "Wikipedia — Tanenbaum–Torvalds debate (overview)",
        url: "https://en.wikipedia.org/wiki/Tanenbaum%E2%80%93Torvalds_debate",
        role: "overview",
      },
    ],
    relatedIds: ["linux-kernel-announced", "andy-tanenbaum-minix-created"],
  }),
  q({
    id: "torvalds-talk-is-cheap",
    date: "2000-08-30",
    datePrecision: "day",
    title: 'Linus Torvalds: "Talk is cheap. Show me the code."',
    quoteText: "Talk is cheap. Show me the code.",
    summary:
      "Linus Torvalds dismisses architecture debates on the Linux kernel mailing list — ship patches, not opinions.",
    about:
      "The line became open-source culture in eight words. It appears on stickers, README files, and every thread where design docs pile up without a pull request.",
    narrative: {
      whyChosen: "The motto of meritocratic open-source contribution.",
      whyImportant: "It reinforced Linux's patch-driven governance over specification committees.",
      problemSolved: "Mailing-list theory needed a norm that rewarded working implementations.",
    },
    tags: ["quote", "insight", "open-source", "linux"],
    people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "maintainer" }],
    importance: 6,
    sources: [
      {
        title: "Torvalds: Talk is cheap",
        url: "https://en.wikiquote.org/wiki/Linus_Torvalds",
        role: "date",
      },
      {
        title: "Wikiquote — Linus Torvalds (overview)",
        url: "https://en.wikiquote.org/wiki/Linus_Torvalds",
        role: "overview",
      },
    ],
    relatedIds: ["linux-kernel-announced", "git-created"],
  }),
  q({
    id: "ballmer-developers-chant",
    date: "2000-09",
    datePrecision: "month",
    title: 'Steve Ballmer chants "Developers! Developers! Developers!"',
    quoteText: "Developers! Developers! Developers! Developers!",
    summary:
      "At Microsoft's 25th anniversary event, CEO Steve Ballmer screams the word developers on stage — sweat, volume, and pure hype.",
    about:
      "The clip became one of tech's earliest viral videos — parodied, remixed, and cited whenever a platform needs third-party apps. Ballmer later reprised it as 'web developers' in 2008.",
    narrative: {
      whyChosen: "Peak CEO energy — a meme before memes had a name.",
      whyImportant: "It symbolized Microsoft's platform bet on ISVs and the Windows ecosystem.",
      problemSolved: "Microsoft needed to rally partners around building on its stack.",
    },
    tags: ["quote", "meme", "microsoft", "developers"],
    people: [{ id: "steve-ballmer", name: "Steve Ballmer", role: "ceo" }],
    importance: 3,
    sources: [
      {
        title: "Ballmer: \"Developers!\" chant",
        url: "https://knowyourmeme.com/memes/steve-ballmer-monkey-dance",
        role: "date",
      },
      {
        title: "Barry Popik — Developers, developers, developers (overview)",
        url: "https://www.barrypopik.com/blog/developers_developers_developers",
        role: "overview",
      },
    ],
    media: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=XxbJw8PrIkc",
        title: "Steve Ballmer — Developers chant (.NET presentation)",
      },
    ],
    relatedIds: ["steve-ballmer-named-microsoft-ceo"],
  }),
  q({
    id: "ballmer-linux-cancer",
    date: "2001-06-01",
    datePrecision: "day",
    title: 'Steve Ballmer calls Linux "a cancer"',
    quoteText:
      "Linux is a cancer that attaches itself in an intellectual property sense to everything it touches.",
    summary:
      "In a Chicago Sun-Times interview, Microsoft CEO Steve Ballmer attacks the GPL and open-source licensing.",
    about:
      "Ballmer was arguing that copyleft 'infects' proprietary code — a framing open-source advocates still push back on. The quote marked peak Microsoft–Linux hostility before Azure embraced open source.",
    narrative: {
      whyChosen: "The most inflammatory corporate quote of the open-source wars.",
      whyImportant: "It galvanized the free-software community and defined Microsoft's public stance for years.",
      problemSolved: "Microsoft was defending its licensing model against government open-source adoption.",
    },
    tags: ["quote", "controversy", "microsoft", "linux", "open-source"],
    people: [{ id: "steve-ballmer", name: "Steve Ballmer", role: "ceo" }],
    importance: 3,
    sources: [
      {
        title: "The Register — Ballmer: Linux is a cancer (June 1, 2001)",
        url: "https://www.theregister.com/2001/06/02/ballmer_linux_is_a_cancer/",
        role: "date",
      },
      {
        title: "Wikipedia — History of Linux adoption (overview)",
        url: "https://en.wikipedia.org/wiki/Linux_adoption",
        role: "overview",
      },
    ],
    relatedIds: ["steve-ballmer-named-microsoft-ceo", "linux-kernel-announced"],
  }),
  q({
    id: "gates-internet-tidal-wave-memo",
    date: "1995-05-26",
    datePrecision: "day",
    title: 'Bill Gates declares the "Internet tidal wave"',
    quoteText:
      "The Internet is a tidal wave. It changes the rules. It is an incredible opportunity as well as an incredible challenge.",
    summary:
      "Bill Gates's internal Microsoft memo redirects the company to make the Internet central to every product.",
    about:
      "Gates had initially dismissed the web; this memo is the pivot. It led to IE bundling, MSN strategy, and the browser wars — and later antitrust scrutiny.",
    narrative: {
      whyChosen: "The moment Microsoft officially bet the company on the web.",
      whyImportant: "It accelerated browser development and reshaped Windows as a networked platform.",
      problemSolved: "Microsoft risked missing the Internet after focusing on desktop CD-ROM products.",
    },
    tags: ["quote", "prediction", "microsoft", "internet", "web"],
    people: [{ id: "bill-gates", name: "Bill Gates", role: "ceo" }],
    importance: 3,
    sources: [
      {
        title: "Microsoft — Internet Tidal Wave memo (May 26, 1995)",
        url: "https://en.wikipedia.org/wiki/Internet_Tidal_Wave",
        role: "date",
      },
      {
        title: "Wikipedia — Internet Tidal Wave (overview)",
        url: "https://en.wikipedia.org/wiki/Internet_Tidal_Wave",
        role: "overview",
      },
    ],
    media: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=fs-YpQj88ew",
        title: "Bill Gates explains the Internet to David Letterman (1995)",
      },
    ],
    relatedIds: ["microsoft-founded", "internet-explorer-1-0"],
  }),
  q({
    id: "andreessen-software-eating-world",
    date: "2011-08-20",
    datePrecision: "day",
    title: 'Marc Andreessen: "Software is eating the world"',
    quoteText: "Software is eating the world.",
    summary:
      "In a Wall Street Journal essay, Marc Andreessen argues that every industry is becoming a software business.",
    about:
      "Written at the height of the mobile and cloud boom, the line justified VC bets on Uber, Airbnb, and SaaS eating hotels, taxis, and shrink-wrapped software. It aged into a cliché — because it was largely right.",
    narrative: {
      whyChosen: "The thesis statement of the 2010s startup era.",
      whyImportant: "It reframed non-tech industries as software delivery problems.",
      problemSolved: "Investors and incumbents underestimated how fast software would disrupt physical businesses.",
    },
    tags: ["quote", "prediction", "venture-capital", "software"],
    people: [{ id: "marc-andreessen", name: "Marc Andreessen", role: "author" }],
    importance: 3,
    sources: [
      {
        title: "Wall Street Journal — Why Software Is Eating the World (August 20, 2011)",
        url: "https://www.wsj.com/articles/SB10001424053111903480904576512250915629460",
        role: "date",
      },
      {
        title: "Andreessen Horowitz — The essay (overview)",
        url: "https://a16z.com/why-software-is-eating-the-world/",
        role: "overview",
      },
    ],
    relatedIds: ["marc-andreessen-netscape-founded"],
  }),
  q({
    id: "zuckerberg-move-fast-break-things",
    date: "2009",
    datePrecision: "year",
    title: 'Facebook motto: "Move fast and break things"',
    quoteText: "Move fast and break things.",
    summary:
      "Facebook's early internal motto encodes shipping velocity over stability — later retired as the company matured.",
    about:
      "The phrase summed up 2010s growth-at-all-costs culture: hackathons, A/B tests, and apologizing later. Facebook dropped it by 2014 for 'Move fast with stable infrastructure' as outages and privacy scandals mounted.",
    narrative: {
      whyChosen: "The most quoted — and criticized — Silicon Valley ethos of the decade.",
      whyImportant: "It named a product culture that prioritized iteration speed over caution.",
      problemSolved: "Fast-growing social products needed permission to ship experiments without paralysis.",
    },
    tags: ["quote", "controversy", "facebook", "culture", "startup"],
    people: [{ id: "mark-zuckerberg", name: "Mark Zuckerberg", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "Business Insider — Facebook motto history (2009–2014)",
        url: "https://www.businessinsider.com/facebook-changes-its-motto-2014-4",
        role: "date",
      },
      {
        title: "Wikipedia — Move fast and break things (overview)",
        url: "https://en.wikipedia.org/wiki/Move_fast_and_break_things",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  // ── Q2: Predictions & laws ──────────────────────────────────────────────
  q({
    id: "metcalfe-metcalfe-law",
    date: "1980",
    datePrecision: "year",
    title: "Robert Metcalfe states Metcalfe's Law",
    quoteText:
      "The value of a telecommunications network is proportional to the square of the number of connected users of the system.",
    summary:
      "Ethernet inventor Robert Metcalfe articulates why network effects compound — each new user makes the network more valuable for everyone else.",
    about:
      "Metcalfe's Law became the mental model behind social networks, marketplaces, and platform economics. Critics note n² oversimplifies real networks, but the core insight — connectivity has nonlinear returns — still shapes startup pitch decks.",
    narrative: {
      whyChosen: "The formula behind 'network effects' before the phrase existed.",
      whyImportant: "It explained why winning platforms could pull away from rivals with similar features.",
      problemSolved: "Investors and engineers lacked vocabulary for why connected products accelerate in value.",
    },
    tags: ["quote", "prediction", "networking", "ethernet"],
    people: [{ id: "robert-metcalfe", name: "Robert Metcalfe", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Wikipedia — Metcalfe's law (1980s formulation)",
        url: "https://en.wikipedia.org/wiki/Metcalfe%27s_law",
        role: "date",
      },
      {
        title: "IEEE Spectrum — Metcalfe's Law after 40 years (overview)",
        url: "https://spectrum.ieee.org/metcalfe-law",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "amara-law",
    date: "1975",
    datePrecision: "year",
    title: "Roy Amara warns we misjudge technology timelines",
    quoteText:
      "We tend to overestimate the effect of a technology in the short run and underestimate the effect in the long run.",
    summary:
      "Roy Amara — president of the Institute for the Future — coins the observation later called Amara's Law.",
    about:
      "Every hype cycle proves Amara right: VR in the 1990s, blockchain in 2017, generative AI in 2023. Short-term disappointment hides long-term transformation — and vice versa for overhyped quarter-to-quarter bets.",
    narrative: {
      whyChosen: "The best one-sentence antidote to tech hype and despair.",
      whyImportant: "It reframed how futurists and policymakers talk about adoption curves.",
      problemSolved: "Teams swung between panic and euphoria without a model for delayed impact.",
    },
    tags: ["quote", "prediction", "futures", "technology-policy"],
    people: [{ id: "roy-amara", name: "Roy Amara", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Wikipedia — Amara's law",
        url: "https://en.wikipedia.org/wiki/Amara%27s_law",
        role: "date",
      },
      {
        title: "Institute for the Future — Roy Amara (overview)",
        url: "https://en.wikipedia.org/wiki/Roy_Amara",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "hofstadter-law",
    date: "1979",
    datePrecision: "year",
    title: "Douglas Hofstadter coins Hofstadter's Law",
    quoteText:
      "It always takes longer than you expect, even when you take into account Hofstadter's Law.",
    summary:
      "In Gödel, Escher, Bach, Douglas Hofstadter states the recursive scheduling joke that became a staple of software estimation.",
    about:
      "Hofstadter's Law is self-referential on purpose — you pad the schedule, then pad the padding, and still slip. Every sprint retrospective and waterfall postmortem cites it, usually while missing the next deadline.",
    narrative: {
      whyChosen: "The funniest accurate model of software project timelines.",
      whyImportant: "It named the optimism bias that planning tools rarely fix.",
      problemSolved: "Teams kept underestimating complex work despite prior experience.",
    },
    tags: ["quote", "insight", "software-engineering", "management"],
    people: [{ id: "douglas-hofstadter", name: "Douglas Hofstadter", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Wikipedia — Hofstadter's law (1979, Gödel, Escher, Bach)",
        url: "https://en.wikipedia.org/wiki/Hofstadter%27s_law",
        role: "date",
      },
      {
        title: "Wikipedia — Douglas Hofstadter (overview)",
        url: "https://en.wikipedia.org/wiki/Douglas_Hofstadter",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "joy-most-smart-people-elsewhere",
    date: "1994",
    datePrecision: "year",
    title: 'Bill Joy: "most of the smartest people work for someone else"',
    quoteText: "No matter who you are, most of the smartest people work for someone else.",
    summary:
      "Sun co-founder Bill Joy's observation — later called Joy's Law — argues that no company can hire all the talent it needs in-house.",
    about:
      "Joy's line underpins open innovation, APIs, and partner ecosystems: build platforms others extend rather than trying to own every smart person. Kevin Kelly popularized it in Out of Control; it still explains why walled gardens lose to networks.",
    narrative: {
      whyChosen: "The strategic case for platforms over headcount.",
      whyImportant: "It reframed competition from hiring wars to ecosystem design.",
      problemSolved: "Tech giants assumed internal R&D could out-invent the rest of the world.",
    },
    tags: ["quote", "insight", "open-innovation", "startups"],
    people: [{ id: "bill-joy", name: "Bill Joy", role: "co-founder" }],
    importance: 6,
    sources: [
      {
        title: "Bill Joy: smartest people elsewhere",
        url: "https://en.wikipedia.org/wiki/Joy%27s_law",
        role: "date",
      },
      {
        title: "Wikipedia — Joy's law (overview)",
        url: "https://en.wikipedia.org/wiki/Joy%27s_law",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "kurzweil-law-accelerating-returns",
    date: "2001-03-07",
    datePrecision: "day",
    title: "Kurzweil: accelerating returns",
    quoteText:
      "An analysis of the history of technology shows that technological change is exponential, contrary to the common-sense 'intuitive linear' view.",
    summary:
      "Ray Kurzweil's essay The Law of Accelerating Returns claims progress compounds — the thesis behind his singularity forecasts.",
    about:
      "Kurzweil plotted Moore's Law, genome sequencing, and internet growth on log charts to argue the 21st century would feel nothing like the 20th. Believers cite AI scaling; skeptics cite cherry-picked curves — but the essay shaped how tech talks about exponentials.",
    narrative: {
      whyChosen: "The manifesto for exponential thinking in Silicon Valley.",
      whyImportant: "It linked hardware trends to a broader law of accelerating returns.",
      problemSolved: "Linear forecasts kept missing how fast digital capabilities compounded.",
    },
    tags: ["quote", "prediction", "ai", "futures"],
    people: [{ id: "ray-kurzweil", name: "Ray Kurzweil", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Kurzweil — The Law of Accelerating Returns (March 7, 2001)",
        url: "https://kurzweilai.net/the-law-of-accelerating-returns",
        role: "date",
      },
      {
        title: "Wikipedia — Technological singularity (overview)",
        url: "https://en.wikipedia.org/wiki/Technological_singularity",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "bush-as-we-may-think-memex",
    date: "1945-07",
    datePrecision: "month",
    title: 'Vannevar Bush envisions the "memex"',
    quoteText:
      "Consider a future device for individual use, which is a sort of mechanized private file and library, and it is called a memex.",
    summary:
      "In The Atlantic, Vannevar Bush describes a desk-sized personal knowledge machine — a direct ancestor of hypertext and the web.",
    about:
      "Written as WWII ended, Bush's essay imagined associative trails linking documents — the conceptual blueprint Tim Berners-Lee would realize decades later. The memex is cited whenever someone builds note apps, wikis, or personal search.",
    narrative: {
      whyChosen: "The 1945 essay that predicted personal hyperlinked knowledge work.",
      whyImportant: "It planted the idea of linked information before digital computers were mainstream.",
      problemSolved: "Researchers drowned in paper; Bush wanted scalable personal memory extension.",
    },
    tags: ["quote", "prediction", "hypertext", "history"],
    people: [{ id: "vannevar-bush", name: "Vannevar Bush", role: "author" }],
    importance: 3,
    sources: [
      {
        title: "The Atlantic — As We May Think (July 1945)",
        url: "https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/",
        role: "date",
      },
      {
        title: "Wikipedia — Memex (overview)",
        url: "https://en.wikipedia.org/wiki/Memex",
        role: "overview",
      },
    ],
    relatedIds: ["worldwideweb-browser", "html-invented"],
  }),
  // ── Q3: Controversies & flame wars ───────────────────────────────────────
  q({
    id: "torvalds-reply-linux-obsolete",
    date: "1992-01-29",
    datePrecision: "day",
    title: 'Linus Torvalds replies: "linux is more portable than minix"',
    quoteText: "The fact is that linux is more portable than minix.",
    summary:
      "Linus Torvalds fires back on comp.os.minix the same day Andrew Tanenbaum declared Linux obsolete — conceding microkernels are nicer in theory while defending Linux's pragmatic portability.",
    about:
      "Torvalds admitted Linux was monolithic and that he 'over-reacted' — but stood by shipping a working kernel over academic purity. The thread is still cited in every monolith-vs-microservices debate.",
    narrative: {
      whyChosen: "The counterpunch that ended the most famous kernel flamewar.",
      whyImportant: "It defended pragmatic shipping over theoretical elegance in systems design.",
      problemSolved: "Hobby OS authors needed a reply when academics dismissed their architecture choices.",
    },
    tags: ["quote", "controversy", "linux", "operating-system"],
    people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "maintainer" }],
    importance: 6,
    sources: [
      {
        title: "Torvalds: Linux more portable than Minix",
        url: "https://groups.google.com/g/comp.os.minix/c/wlhw16QWltI",
        role: "date",
      },
      {
        title: "O'Reilly — Tanenbaum-Torvalds debate appendix (overview)",
        url: "https://www.oreilly.com/openbook/opensources/book/appa.html",
        role: "overview",
      },
    ],
    relatedIds: ["tanenbaum-linux-obsolete", "linux-kernel-announced"],
  }),
  q({
    id: "schwartz-innovate-not-litigate",
    date: "2007-05-15",
    datePrecision: "day",
    title: 'Jonathan Schwartz: "innovate, not litigate"',
    quoteText: "We decided to innovate, not litigate.",
    summary:
      "Sun CEO Jonathan Schwartz responds to Microsoft's patent threats against Linux — offering Sun's patent portfolio to defend open source instead of suing.",
    about:
      "Press dubbed Microsoft's campaign 'patent terrorism'; Schwartz framed Sun's choice as building better products rather than lawyering rivals. The blog post became a rallying cry during the open-source wars of the 2000s.",
    narrative: {
      whyChosen: "Sun's public line when Microsoft threatened Linux with unspecified patents.",
      whyImportant: "It contrasted litigation strategy with open-source ecosystem building.",
      problemSolved: "The Linux community needed corporate allies willing to counter patent FUD.",
    },
    tags: ["quote", "controversy", "open-source", "patents", "sun"],
    people: [{ id: "jonathan-schwartz", name: "Jonathan Schwartz", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Jonathan Schwartz blog — innovate, not litigate (May 15, 2007)",
        url: "https://www.infoworld.com/article/2299673/jonathan-schwartz-to-ballmer-try-innovating-not-litigating.html",
        role: "date",
      },
      {
        title: "Techdirt — Sun: innovate, not litigate (overview)",
        url: "https://www.techdirt.com/2007/05/16/sun-to-microsoft-real-companies-innovate-not-litigate/",
        role: "overview",
      },
    ],
    relatedIds: ["ballmer-linux-cancer", "linux-kernel-announced"],
  }),
  q({
    id: "ellison-pc-ridiculous",
    date: "1995-09",
    datePrecision: "month",
    title: 'Larry Ellison calls the PC "a ridiculous device"',
    quoteText: "The personal computer is a ridiculous device.",
    summary:
      "Oracle CEO Larry Ellison pitches network computers — thin clients that get software from servers — and dismisses overpowered desktop PCs.",
    about:
      "Ellison's NC vision failed in the market as PCs got cheaper, but the quote captures 1990s thin-client thinking that resurfaced with Chromebooks and cloud desktops. He was wrong on timing, right that most users never needed a tower under the desk.",
    narrative: {
      whyChosen: "Peak network-computer rhetoric against the Windows PC mainstream.",
      whyImportant: "It framed the thin-client vs fat-client debate that never fully died.",
      problemSolved: "Enterprise IT wanted cheaper, manageable endpoints for casual users.",
    },
    tags: ["quote", "controversy", "oracle", "thin-client", "prediction"],
    people: [{ id: "larry-ellison", name: "Larry Ellison", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Los Angeles Times — Is the PC becoming passé? (September 28, 1995)",
        url: "https://www.latimes.com/archives/la-xpm-1995-09-28-fi-50966-story.html",
        role: "date",
      },
      {
        title: "Newsweek — Get ready for the NC (overview)",
        url: "https://www.newsweek.com/your-pc-too-complex-get-ready-nc-181210",
        role: "overview",
      },
    ],
    relatedIds: ["larry-ellison-oracle-founded"],
  }),
  q({
    id: "jobs-flash-closed-system",
    date: "2010-04-29",
    datePrecision: "day",
    title: 'Steve Jobs: "Flash is a closed system"',
    quoteText: "By almost any definition, Flash is a closed system.",
    summary:
      "In his open letter Thoughts on Flash, Steve Jobs explains why iPhone and iPad would never ship Adobe Flash — citing openness, battery life, touch, and security.",
    about:
      "Jobs argued Flash was built for mice and PCs, not touch mobile. The letter accelerated HTML5 video adoption and became the epitaph for Flash on phones — even as critics called Apple hypocritical about its own walled garden.",
    narrative: {
      whyChosen: "The manifesto that helped kill Flash on mobile.",
      whyImportant: "It pushed the web toward H.264, HTML5, and native apps on iOS.",
      problemSolved: "Mobile devices needed a stance on plugin-heavy desktop web content.",
    },
    tags: ["quote", "controversy", "apple", "flash", "mobile", "web"],
    people: [{ id: "steve-jobs", name: "Steve Jobs", role: "ceo" }],
    importance: 3,
    sources: [
      {
        title: "Apple — Thoughts on Flash (April 29, 2010)",
        url: "https://en.wikipedia.org/wiki/Thoughts_on_Flash",
        role: "date",
      },
      {
        title: "BBC — Jobs explains Flash ban (overview)",
        url: "https://www.bbc.co.uk/news/10092298",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "musk-openai-more-open",
    date: "2020-02-17",
    datePrecision: "day",
    title: 'Elon Musk: "OpenAI should be more open"',
    quoteText: "OpenAI should be more open imo",
    summary:
      "Years after leaving OpenAI's board, Elon Musk tweets that the research lab he co-founded is not living up to its name.",
    about:
      "Musk helped launch OpenAI as a nonprofit counterweight to Google, then clashed over direction and funding. The tweet foreshadowed his later attacks on OpenAI's Microsoft partnership and his founding of xAI.",
    narrative: {
      whyChosen: "The moment a co-founder publicly broke with OpenAI's openness mission.",
      whyImportant: "It framed later debates about closed frontier models and corporate control.",
      problemSolved: "Observers needed language for the gap between OpenAI's brand and its practices.",
    },
    tags: ["quote", "controversy", "openai", "ai", "open-source"],
    people: [{ id: "elon-musk", name: "Elon Musk", role: "co-founder" }],
    importance: 6,
    sources: [
      {
        title: "Business Insider — Musk: OpenAI should be more open (February 17, 2020)",
        url: "https://www.businessinsider.com/elon-musk-criticizes-openai-dario-amodei-artificial-intelligence-safety-2020-2",
        role: "date",
      },
      {
        title: "Techmeme — Musk OpenAI openness tweet (overview)",
        url: "https://techmeme.com/200218/p9",
        role: "overview",
      },
    ],
    relatedIds: ["sam-altman-openai-founded"],
  }),
  q({
    id: "altman-ai-goes-wrong",
    date: "2023-05-16",
    datePrecision: "day",
    title: 'Sam Altman: "If this technology goes wrong, it can go quite wrong"',
    quoteText:
      "If this technology goes wrong, it can go quite wrong, and we want to be vocal about that.",
    summary:
      "OpenAI CEO Sam Altman tells the Senate Judiciary Committee that frontier AI needs government oversight — while arguing for licensing and safety testing.",
    about:
      "Altman walked a tightrope: urging regulation that could entrench incumbents while presenting OpenAI as the responsible actor. The line became the sound bite from the first major congressional hearing on generative AI.",
    narrative: {
      whyChosen: "The defining quote from Congress's first ChatGPT-era AI hearing.",
      whyImportant: "It mainstreamed AI risk talk in Washington months after ChatGPT's launch.",
      problemSolved: "Lawmakers needed a vocabulary for catastrophic AI failure from industry itself.",
    },
    tags: ["quote", "warning", "ai", "openai", "policy"],
    people: [{ id: "sam-altman", name: "Sam Altman", role: "ceo" }],
    importance: 3,
    media: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=fP5YdyjTfG0",
        title: "Altman: AI can go quite wrong",
      },
    ],
    sources: [
      {
        title: "U.S. Senate — Oversight of A.I. hearing (May 16, 2023)",
        url: "https://www.govinfo.gov/content/pkg/CHRG-118shrg52706/html/CHRG-118shrg52706.htm",
        role: "date",
      },
      {
        title: "Ars Technica — Altman Senate testimony (overview)",
        url: "https://arstechnica.com/tech-policy/2023/05/ai-technology-can-go-quite-wrong-openai-ceo-tells-senate/",
        role: "overview",
      },
    ],
    relatedIds: ["sam-altman-openai-founded"],
  }),
  q({
    id: "huang-generative-ai-era-quote",
    date: "2024-03-18",
    datePrecision: "day",
    title: 'Jensen Huang: "We created a processor for the generative AI era"',
    quoteText:
      "The way we compute is fundamentally different. We created a processor for the generative AI era.",
    summary:
      "At GTC 2024, NVIDIA CEO Jensen Huang unveils Blackwell and frames GPUs as the engine of AI factories, not just graphics.",
    about:
      "Huang pulled a Blackwell chip from his pocket beside a Hopper die — the visual shorthand for a platform shift. The line captured how NVIDIA repositioned from gaming GPUs to the default substrate for trillion-parameter models and real-time generative AI.",
    narrative: {
      whyChosen: "The defining phrase from the Blackwell keynote that named the generative-AI hardware era.",
      whyImportant: "It reframed data centers as AI factories and cemented NVIDIA's narrative for investors and builders.",
      problemSolved: "The industry needed language for why next-gen AI required a new class of processors, not faster CPUs.",
    },
    tags: ["quote", "prediction", "ai", "nvidia", "hardware"],
    people: [{ id: "jensen-huang", name: "Jensen Huang", role: "ceo" }],
    companies: [{ id: "nvidia", name: "NVIDIA" }],
    importance: 4,
    sources: [
      {
        title: "Huang: generative AI era",
        url: "https://blogs.nvidia.com/blog/2024-gtc-keynote/",
        role: "date",
      },
      {
        title: "NVIDIA — Blackwell platform press release (overview)",
        url: "https://investor.nvidia.com/news/press-release-details/2024/NVIDIA-Blackwell-Platform-Arrives-to-Power-a-New-Era-of-Computing/default.aspx",
        role: "overview",
      },
    ],
    relatedIds: ["nvidia-blackwell-announced", "jensen-huang-cuda-announced"],
  }),
  q({
    id: "huang-ceo-math-quote",
    date: "2024-06-02",
    datePrecision: "day",
    title: 'Jensen Huang: "The more you buy, the more you save"',
    quoteText:
      "The more you buy, the more you save. That's called CEO math. It's not accurate, but it is correct.",
    summary:
      "At COMPUTEX 2024, Huang argues GPU clusters save money versus CPU-only AI infrastructure — then jokes about the logic.",
    about:
      "The quip went viral: Huang's pitch that accelerated computing cuts total cost of ownership even as customers buy more GPUs. Tech press dubbed it 'CEO math' — half meme, half serious TCO argument that fueled NVIDIA's trillion-dollar valuation narrative.",
    narrative: {
      whyChosen: "The most quoted Jensen Huang line of the AI boom years — meme and sales pitch in one.",
      whyImportant: "It encapsulated how NVIDIA sold scale-up clusters to hyperscalers and enterprises.",
      problemSolved: "Buyers needed a simple story for why bigger GPU bills could mean lower cost per AI workload.",
    },
    tags: ["quote", "meme", "ai", "nvidia", "hardware"],
    people: [{ id: "jensen-huang", name: "Jensen Huang", role: "ceo" }],
    companies: [{ id: "nvidia", name: "NVIDIA" }],
    importance: 6,
    sources: [
      {
        title: "Huang: more you buy, more you save",
        url: "https://blogs.nvidia.com/blog/computex-2024-jensen-huang/",
        role: "date",
      },
      {
        title: "The Verge — Nvidia's CEO math (overview)",
        url: "https://www.theverge.com/2024/6/2/24169790/nvidias-ceo-math",
        role: "overview",
      },
    ],
    relatedIds: ["nvidia-blackwell-announced", "jensen-huang-cuda-announced"],
  }),
  q({
    id: "anthropic-fable-serious-damage-quote",
    date: "2026-06-09",
    datePrecision: "day",
    title: 'Anthropic: Fable 5 "could be misused to cause serious damage"',
    quoteText:
      "Without safeguards, Fable 5's capabilities in areas like cybersecurity could be misused to cause serious damage.",
    summary:
      "Launching Claude Fable 5, Anthropic warns the model is too capable in offensive cybersecurity to release without safety classifiers.",
    about:
      "Anthropic split Fable 5 from Mythos 5 on day one: same weights, but Fable routes sensitive cyber and biology queries to Opus 4.8. The line justified why a frontier model shipped with guardrails critics called overly broad — and why Mythos stayed locked to Project Glasswing partners.",
    narrative: {
      whyChosen: "Anthropic's own words for why its strongest GA model needed hard blocks on day one.",
      whyImportant: "It framed dual-use AI risk as a shipping constraint, not just a research talking point.",
      problemSolved: "Labs needed language for releasing dangerous-capability models without open-weight misuse.",
    },
    tags: ["quote", "warning", "ai", "anthropic", "claude", "policy"],
    companies: [{ id: "anthropic", name: "Anthropic" }],
    importance: 4,
    sources: [
      {
        title: "Anthropic: Fable 5 misuse risk",
        url: "https://www.anthropic.com/news/claude-fable-5-mythos-5",
        role: "date",
      },
      {
        title: "Anthropic — Introducing Claude Fable 5 and Claude Mythos 5 (overview)",
        url: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5",
        role: "overview",
      },
    ],
    relatedIds: ["claude-fable-5-mythos-5-released", "claude-fable-mythos-access-suspended"],
  }),
  q({
    id: "anthropic-fable-abruptly-disable-quote",
    date: "2026-06-12",
    datePrecision: "day",
    title: 'Anthropic: "We must abruptly disable Fable 5 and Mythos 5 for all our customers"',
    quoteText:
      "The net effect of this order is that we must abruptly disable Fable 5 and Mythos 5 for all our customers to ensure compliance.",
    summary:
      "Three days after launch, a U.S. export-control directive forces Anthropic to pull its frontier models offline worldwide.",
    about:
      "Commerce ordered Anthropic to block foreign nationals from using Fable and Mythos — including employees in the U.S. Because the API could not verify citizenship in real time, Anthropic shut both models off for everyone. The first time Washington used export controls on a deployed commercial frontier model, not just training chips.",
    narrative: {
      whyChosen: "The sentence that turned AI safety rhetoric into a global product blackout.",
      whyImportant: "It showed governments could recall frontier models days after launch over jailbreak fears.",
      problemSolved: "Policymakers needed a lever to block foreign access to models deemed nationally sensitive.",
    },
    tags: ["quote", "warning", "controversy", "ai", "anthropic", "claude", "policy"],
    companies: [{ id: "anthropic", name: "Anthropic" }],
    importance: 5,
    sources: [
      {
        title: "Anthropic disables Fable 5 and Mythos 5",
        url: "https://www.anthropic.com/news/fable-mythos-access",
        role: "date",
      },
      {
        title: "BBC — Anthropic suspends new AI tools over US security concerns (overview)",
        url: "https://www.bbc.com/news/articles/c932g3v3e13o",
        role: "overview",
      },
    ],
    relatedIds: [
      "claude-fable-5-mythos-5-released",
      "claude-fable-mythos-access-suspended",
      "anthropic-fable-serious-damage-quote",
    ],
  }),
  q({
    id: "anthropic-fable-halt-deployments-quote",
    date: "2026-06-12",
    datePrecision: "day",
    title: 'Anthropic: recall standard would "halt all new model deployments"',
    quoteText:
      "If this standard was applied across the industry, we believe it would essentially halt all new model deployments for all frontier model providers.",
    summary:
      "Responding to the Fable 5 shutdown, Anthropic argues a narrow jailbreak finding should not recall models used by hundreds of millions.",
    about:
      "Anthropic complied with the export-control order but disputed the rationale: the reported bypass was narrow, and other frontier models showed similar capability. The pushback previewed an industry fight over when a jailbreak should trigger withdrawal versus patched safeguards.",
    narrative: {
      whyChosen: "Anthropic's counter-argument to the first frontier-model recall order.",
      whyImportant: "It defined the stakes for every lab shipping cyber-capable models after Fable.",
      problemSolved: "Industry lacked a shared standard for when a jailbreak should block a model release.",
    },
    tags: ["quote", "warning", "controversy", "ai", "anthropic", "policy"],
    companies: [{ id: "anthropic", name: "Anthropic" }],
    importance: 4,
    sources: [
      {
        title: "Anthropic: halt model deployments",
        url: "https://www.anthropic.com/news/fable-mythos-access",
        role: "date",
      },
      {
        title: "Anthropic — Redeploying Claude Fable 5 (overview)",
        url: "https://www.anthropic.com/news/redeploying-fable-5",
        role: "overview",
      },
    ],
    relatedIds: ["claude-fable-mythos-access-suspended", "anthropic-fable-abruptly-disable-quote"],
  }),
  // ── Q4: Memes & culture ──────────────────────────────────────────────────
  q({
    id: "ballmer-web-developers-chant",
    date: "2008-03-06",
    datePrecision: "day",
    title: 'Steve Ballmer chants "Web developers! Web developers! Web developers!"',
    quoteText: "Web developers! Web developers! Web developers!",
    summary:
      "At MIX08 in Las Vegas, Ballmer reprised his famous developers chant after an audience member asked for love for the web dev community.",
    about:
      "Ballmer was interviewing with Guy Kawasaki when a developer in the crowd requested the ritual. The moment tied Microsoft's Silverlight and web platform push to the same sweaty enthusiasm as the 2000 original.",
    narrative: {
      whyChosen: "The sequel meme — developers chant updated for the web era.",
      whyImportant: "It signaled Microsoft's courtship of web developers during the Flash/Silverlight wars.",
      problemSolved: "MIX needed a viral moment to rally the web community around Microsoft's stack.",
    },
    tags: ["quote", "meme", "microsoft", "web", "developers"],
    people: [{ id: "steve-ballmer", name: "Steve Ballmer", role: "ceo" }],
    importance: 6,
    media: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=8pdkEJ0nFBg",
        title: "Ballmer: \"Web developers!\" chant",
      },
    ],
    sources: [
      {
        title: "Microsoft — Ballmer MIX08 conversation with Guy Kawasaki (March 6, 2008)",
        url: "https://news.microsoft.com/speeches/steve-ballmer-mix08-conversation-with-guy-kawasaki/",
        role: "date",
      },
      {
        title: "ZDNet — Ballmer: it's all about web developers (overview)",
        url: "https://www.zdnet.com/article/ballmer-its-all-about-web-developers/",
        role: "overview",
      },
    ],
    relatedIds: ["ballmer-developers-chant", "steve-ballmer-named-microsoft-ceo"],
  }),
  q({
    id: "crockford-javascript-good-parts",
    date: "2008-05",
    datePrecision: "month",
    title: 'Douglas Crockford names "JavaScript: The Good Parts"',
    quoteText: "JavaScript: The Good Parts.",
    summary:
      "Douglas Crockford's book title became a rallying cry — use the small subset of JavaScript that is reliable and ignore the rest.",
    about:
      "In 2008 many teams treated JS as a toy language. Crockford argued you could write serious software by deliberately avoiding the bad parts — influencing lint rules, style guides, and later TypeScript's stricter subsets.",
    narrative: {
      whyChosen: "The title that legitimized JavaScript as a professional language.",
      whyImportant: "It gave teams permission to subset the language instead of using all of it.",
      problemSolved: "Developers lacked a shared guide for which JS features were safe in production.",
    },
    tags: ["quote", "insight", "javascript", "books"],
    people: [{ id: "douglas-crockford", name: "Douglas Crockford", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "JavaScript: The Good Parts",
        url: "https://www.oreilly.com/library/view/javascript-the-good/9780596517748/",
        role: "date",
      },
      {
        title: "Wikipedia — Douglas Crockford (overview)",
        url: "https://en.wikipedia.org/wiki/Douglas_Crockford",
        role: "overview",
      },
    ],
    relatedIds: ["douglas-crockford-json-spec", "javascript-name-announced"],
  }),
  q({
    id: "spolsky-joel-test",
    date: "2000-08-09",
    datePrecision: "day",
    title: "Joel Spolsky publishes the Joel Test",
    quoteText:
      "Do you use source control? Can you make a build in one step? Do you make daily builds? Do you have a bug database?",
    summary:
      "Joel Spolsky's blog post The Joel Test lists twelve yes-or-no questions that separate great software teams from dysfunctional ones.",
    about:
      "The Joel Test was never scientific — Joel admitted as much — but it spread because it was memorable and actionable. Teams still score themselves out of 12 in onboarding docs and engineering blog posts.",
    narrative: {
      whyChosen: "The most shared team-health checklist of the blog era.",
      whyImportant: "It gave non-engineers a simple rubric for software organization quality.",
      problemSolved: "Startups had no quick way to audit whether their dev process was broken.",
    },
    tags: ["quote", "insight", "software-engineering", "management"],
    people: [{ id: "joel-spolsky", name: "Joel Spolsky", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Joel on Software — The Joel Test (August 9, 2000)",
        url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
        role: "date",
      },
      {
        title: "Wikipedia — Joel Spolsky (overview)",
        url: "https://en.wikipedia.org/wiki/Joel_Spolsky",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  q({
    id: "fowler-refactoring-definition",
    date: "1999",
    datePrecision: "year",
    title: "Martin Fowler defines refactoring",
    quoteText:
      "Refactoring is a controlled technique for incrementally improving the design of an existing code base.",
    summary:
      "Martin Fowler's book Refactoring gives refactoring a precise definition and a catalog of safe code transformations.",
    about:
      "Before Fowler, 'refactoring' was vague cleanup work. His catalog — extract method, move field, rename — became IDE menu items and code review vocabulary. The definition still anchors agile discussions of paying down debt without changing behavior.",
    narrative: {
      whyChosen: "The sentence that turned refactoring from slang into engineering practice.",
      whyImportant: "It legitimized structural code changes as a disciplined, test-backed activity.",
      problemSolved: "Teams feared changing working code without a shared pattern language.",
    },
    tags: ["quote", "insight", "software-engineering", "refactoring"],
    people: [{ id: "martin-fowler", name: "Martin Fowler", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "martinfowler.com — Refactoring book (1999)",
        url: "https://martinfowler.com/books/refactoring.html",
        role: "date",
      },
      {
        title: "Wikipedia — Code refactoring (overview)",
        url: "https://en.wikipedia.org/wiki/Code_refactoring",
        role: "overview",
      },
    ],
    relatedIds: ["martin-fowler-refactoring-published"],
  }),
  q({
    id: "hunt-thomas-dry",
    date: "1999-10",
    datePrecision: "month",
    title: 'Hunt & Thomas coin DRY — "Don\'t Repeat Yourself"',
    quoteText:
      "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.",
    summary:
      "Andy Hunt and Dave Thomas introduce the DRY principle in The Pragmatic Programmer — later shortened to 'Don't repeat yourself.'",
    about:
      "DRY became a battle cry against copy-paste code and duplicated business rules. It is often misapplied to any repeated line of code — the authors meant duplicated knowledge, not literal character matching.",
    narrative: {
      whyChosen: "The principle behind every 'extract shared module' code review comment.",
      whyImportant: "It gave teams vocabulary for eliminating dangerous duplication of logic.",
      problemSolved: "Copy-pasted code let bugs live in multiple places and drift out of sync.",
    },
    tags: ["quote", "insight", "software-engineering", "pragmatic-programmer"],
    people: [
      { id: "andy-hunt", name: "Andy Hunt", role: "author" },
      { id: "dave-thomas", name: "Dave Thomas", role: "author" },
    ],
    importance: 6,
    sources: [
      {
        title: "The Pragmatic Programmer — DRY principle (October 1999)",
        url: "https://en.wikipedia.org/wiki/Don%27t_repeat_yourself",
        role: "date",
      },
      {
        title: "Wikipedia — Don't repeat yourself (overview)",
        url: "https://en.wikipedia.org/wiki/Don%27t_repeat_yourself",
        role: "overview",
      },
    ],
    relatedIds: ["kent-beck-extreme-programming"],
  }),
  q({
    id: "greenspun-tenth-rule",
    date: "1993",
    datePrecision: "year",
    title: "Philip Greenspun states his tenth rule",
    quoteText:
      "Any sufficiently complicated C or Fortran program contains an ad-hoc, informally-specified, bug-ridden, slow implementation of half of Common Lisp.",
    summary:
      "Philip Greenspun jokes that big C programs secretly reinvent Lisp badly — the observation known as Greenspun's Tenth Rule.",
    about:
      "There are no rules one through nine; Greenspun picked 'tenth' for memorability. The line explains why frameworks grow interpreters, DSLs, and config languages — and why starting with a higher-level tool might have been cheaper.",
    narrative: {
      whyChosen: "The snarkiest law about accidental language design in legacy codebases.",
      whyImportant: "It named the pattern of reimplementing Lisp features inside lower-level systems.",
      problemSolved: "Teams building elaborate C++ frameworks lacked a humorous label for what they were doing.",
    },
    tags: ["quote", "critique", "lisp", "programming-language"],
    people: [{ id: "philip-greenspun", name: "Philip Greenspun", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Greenspun — Tenth rule FAQ (1993 era)",
        url: "https://philip.greenspun.com/bboard/q-and-a-fetch-msg?msg_id=000tgU",
        role: "date",
      },
      {
        title: "Wikipedia — Greenspun's tenth rule (overview)",
        url: "https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
];
