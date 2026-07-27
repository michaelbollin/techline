# Techline research plan — people & leadership milestones

Companion to [RESEARCH-PLAN.md](./RESEARCH-PLAN.md) (languages & frameworks), [RESEARCH-PLAN-INFRA.md](./RESEARCH-PLAN-INFRA.md) (infrastructure & tooling), [RESEARCH-PLAN-DEVICES.md](./RESEARCH-PLAN-DEVICES.md) (computers, servers, smartphones, embedded hardware), and [COMPANY-MAP.md](./COMPANY-MAP.md) (event → company reference).

All dates must be verified from primary or authoritative sources before adding to the timeline.
Status: `[ ]` pending · `[~]` in progress · `[x]` verified & added · `[-]` skip (not notable enough)

---

## Rules for inclusion

1. **Career milestones, not biographies** — "founds", "creates", "named CEO", "researches", "publishes", "steps down as BDFL". **No birthdays, deaths, or awards-only entries** unless the award is the canonical milestone (e.g. Turing Award).
2. **Event-style titles** — write what happened: *"Satya Nadella named Microsoft CEO"*, not *"Satya Nadella born"*.
3. **Avoid duplicate events** — if a tech milestone already exists (e.g. `git-created`), attach the person via attribution instead of adding *"Torvalds creates Git"* as a second event.
4. **Importance weighting** — `1` world-changing (major platform founders, field-defining researchers); `2` significant but narrower (CEO handoffs, maintainer step-downs, individual Turing winners); `3` dense history (niche but worth documenting).
5. **Never guess** — if date is fuzzy, use `year.json` + `datePrecision: "year"` and cite source.
6. **Tag** all people milestones with `"people"` in `tags`.
7. **Programming-oriented** — creators, researchers, language/tool maintainers, and leaders of software platforms. Skip consumer/media milestones (Netflix streaming, Tesla, social networks), pure CEO handoffs at non-dev companies, and hardware product launches unless the person created the underlying technology.

---

## How to add people

| Situation | Action | File |
|-----------|--------|------|
| Tech event exists (`git-created`, `react-open-sourced`) | Add `people` attribution overlay | `lib/timeline/people-attributions.ts` |
| No tech event (`microsoft-founded`, `satya-nadella-microsoft-ceo`) | Add milestone event | `scripts/data/people-milestones.ts` → run seed script |
| Both | Attribution on tech event + separate leadership milestone if distinct (e.g. Altman on `chatgpt-released` **and** `sam-altman-openai-founded`) | Both files |

```bash
# After editing people-milestones.ts:
npx tsx scripts/seed-people-milestones.ts
npm run validate
```

Person roles: `creator`, `co-creator`, `founder`, `co-founder`, `ceo`, `researcher`, `author`, `maintainer`.

---

## People attributions (tech events → people)

These attach `people` to **existing** tech events at load time. Do **not** create duplicate person+tech milestone events for these.

| Event id | Person(s) | Role | Status |
|----------|-----------|------|--------|
| `git-created` | Linus Torvalds | creator | `[x]` |
| `redis-first-released` | Salvatore Sanfilippo | creator | `[x]` |
| `nodejs-first-released` | Ryan Dahl | creator | `[x]` |
| `javascript-name-announced` | Brendan Eich | creator | `[x]` |
| `worldwideweb-browser` | Tim Berners-Lee | creator | `[x]` |
| `python-0-9-0-released` | Guido van Rossum | creator | `[x]` |
| `ruby-0-95-released` | Yukihiro Matsumoto | creator | `[x]` |
| `java-announced` | James Gosling | creator | `[x]` |
| `php-tools-1-0-released` | Rasmus Lerdorf | creator | `[x]` |
| `express-released` | TJ Holowaychuk | creator | `[x]` |
| `vue-js-released` | Evan You | creator | `[x]` |
| `rails-open-sourced` | David Heinemeier Hansson | creator | `[x]` |
| `laravel-first-beta` | Taylor Otwell | creator | `[x]` |
| `nestjs-announced` | Kamil Myśliwiec | creator | `[x]` |
| `elixir-first-release` | José Valim | creator | `[x]` |
| `phoenix-1-0-released` | Chris McCord | creator | `[x]` |
| `phoenix-liveview-released` | José Valim | creator | `[x]` |
| `typescript-preview-released` | Anders Hejlsberg | creator | `[x]` |
| `csharp-announced` | Anders Hejlsberg | creator | `[x]` |
| `go-open-sourced` | Robert Griesemer, Rob Pike, Ken Thompson | co-creator | `[x]` |
| `rust-1-0-released` | Graydon Hoare | creator | `[x]` |
| `swift-announced` | Chris Lattner | creator | `[x]` |
| `kotlin-unveiled` | Dmitry Jemerov | co-creator | `[x]` |
| `django-open-sourced` | Adrian Holovaty | co-creator | `[x]` |
| `graphql-open-sourced` | Lee Byron | co-creator | `[x]` |
| `react-open-sourced` | Jordan Walke | creator | `[x]` |
| `docker-open-sourced` | Solomon Hykes | creator | `[x]` |
| `github-launched` | Tom Preston-Werner, Chris Wanstrath | co-founder | `[x]` |
| `cobol-specifications-submitted` | Grace Hopper | researcher | `[x]` |
| `fortran-formally-published` | John Backus | researcher | `[x]` |
| `simula-67-presented` | Ole-Johan Dahl, Kristen Nygaard | creator / co-creator | `[x]` |
| `chatgpt-released` | Sam Altman | ceo | `[x]` |
| `claude-3-released` | Dario Amodei | ceo | `[x]` |
| `kubernetes-open-sourced` | Joe Beda, Brendan Burns, Craig McLuckie | co-creator | `[x]` |
| `webpack-released` | Tobias Koppers | creator | `[x]` |
| `npm-first-released` | Isaac Schlueter | creator | `[x]` |
| `hudson-ci-released` | Kohsuke Kawaguchi | creator | `[x]` |
| `nginx-released` | Igor Sysoev | creator | `[x]` |
| `apache-http-server-released` | Brian Behlendorf | maintainer | `[x]` |
| `babel-released` | Sebastian McKenzie | creator | `[x]` |
| `eslint-released` | Nicholas Zakas | creator | `[x]` |
| `rollup-released` | Rich Harris | creator | `[x]` |
| `vite-1-released` | Evan You | creator | `[x]` |
| `terraform-released` | Mitchell Hashimoto | creator | `[x]` |
| `vagrant-released` | Mitchell Hashimoto | creator | `[x]` |
| `ansible-released` | Michael DeHaan | creator | `[x]` |
| `heroku-launched` | Adam Wiggins, James Lindenbaum, Orion Henry | co-founder | `[x]` |
| `travis-ci-launched` | Mathias Meyer, Josh Lukaszewicz | co-founder | `[x]` |
| `gitlab-released` | Dmitriy Zaporozhets | creator | `[x]` |
| `bitbucket-launched` | Jesper Noehr | creator | `[x]` |
| `nextjs-open-sourced` | Guillermo Rauch | creator | `[x]` |
| `fastapi-released` | Sebastián Ramírez | creator | `[x]` |
| `flask-released` | Armin Ronacher | creator | `[x]` |
| `mosaic-1-0-released` | Marc Andreessen, Eric Bina | co-creator | `[x]` |
| `rest-architectural-style-defined` | Roy Fielding | author | `[x]` |
| `tcp-ip-flag-day` | Vint Cerf, Bob Kahn | researcher | `[x]` |
| `bash-1-0-released` | Brian Fox | creator | `[x]` |
| `oracle-2-released` | Larry Ellison | co-founder | `[x]` |

### Attributions to add (tech event exists, person missing)

_All attribution-pass items added — see table above._

---

## P1 — Founders & systems pioneers `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `microsoft-founded` | Bill Gates, Paul Allen | Found Microsoft (Apr 4, 1975) | 1 | `[x]` |
| `linux-kernel-announced` | Linus Torvalds | Announces Linux on comp.os.minix (Aug 25, 1991) | 1 | `[x]` |
| `steve-jobs-returns-to-apple` | Steve Jobs | Returns to Apple as interim CEO (1997) | 1 | `[-]` removed |
| `google-founded` | Larry Page, Sergey Brin | Found Google (Sep 1998) | 1 | `[x]` |
| `knuth-taocp-volume-1-published` | Donald Knuth | Publishes TAOCP Vol. 1 (1968) | 1 | `[x]` |
| `ritchie-thompson-turing-award` | Dennis Ritchie, Ken Thompson | Share Turing Award (1983) | 1 | `[x]` |
| `claude-shannon-information-theory` | Claude Shannon | Publishes information theory (1948) | 1 | `[x]` |
| `alan-turing-computable-numbers` | Alan Turing | Publishes computable numbers paper (1936) | 1 | `[x]` |
| `margaret-hamilton-apollo-software` | Margaret Hamilton | Leads Apollo flight software (1969) | 1 | `[x]` |
| `ada-lovelace-analytical-engine-notes` | Ada Lovelace | Publishes Analytical Engine notes (1843) | 1 | `[x]` |

---

## P2 — Platform & business leadership `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `bill-gates-steps-down-microsoft-ceo` | Bill Gates | Steps down as Microsoft CEO (2000) | 2 | `[x]` |
| `steve-ballmer-named-microsoft-ceo` | Steve Ballmer | Named Microsoft CEO (2000) | 2 | `[x]` |
| `satya-nadella-microsoft-ceo` | Satya Nadella | Named Microsoft CEO (Feb 2014) | 1 | `[x]` |
| `tim-cook-apple-ceo` | Tim Cook | Named Apple CEO (Aug 2011) | 2 | `[-]` removed |
| `sundar-pichai-google-ceo` | Sundar Pichai | Named Google/Alphabet CEO (2015) | 2 | `[x]` |
| `mark-zuckerberg-facebook-launched` | Mark Zuckerberg | Launches Facebook (Feb 2004) | 1 | `[-]` removed |
| `jeff-bezos-amazon-founded` | Jeff Bezos | Founds Amazon (1994) | 1 | `[-]` removed |
| `eric-schmidt-google-ceo` | Eric Schmidt | Named Google CEO (2001) | 2 | `[x]` |
| `sam-altman-openai-founded` | Sam Altman | Co-founds OpenAI (2015) | 1 | `[x]` |
| `dario-amodei-anthropic-founded` | Dario Amodei | Co-founds Anthropic (2021) | 2 | `[x]` |

---

## P3 — Language creators & maintainers `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `guido-van-rossum-bdfl-step-down` | Guido van Rossum | Steps down as Python BDFL (Jul 2018) | 2 | `[x]` |
| `sanfilippo-redis-maintainer-steps-down` | Salvatore Sanfilippo | Steps down as Redis maintainer (2020) | 2 | `[x]` |
| `brendan-eich-mozilla-ceo-resigns` | Brendan Eich | Resigns as Mozilla CEO (2014) | 2 | `[x]` |
| `ryan-dahl-deno-announced` | Ryan Dahl | Announces Deno (2018) | 2 | `[x]` |
| `rich-hickey-clojure-released` | Rich Hickey | Releases Clojure (2007) | 2 | `[x]` |
| `bjarne-stroustrup-cpp-released` | Bjarne Stroustrup | Ships Cfront / C++ (1985) | 1 | `[x]` |
| `james-gosling-leaves-oracle` | James Gosling | Leaves Oracle / Java (2010) | 2 | `[x]` |
| `larry-wall-perl-1-released` | Larry Wall | Releases Perl 1.0 (1987) | 2 | `[x]` |
| `anders-hejlsberg-turbo-pascal-shipped` | Anders Hejlsberg | Ships Turbo Pascal (1983) | 2 | `[x]` |
| `graydon-hoare-rust-started` | Graydon Hoare | Starts Rust side project (2006) | 2 | `[x]` |

> **Note:** Language *releases* for Python, Ruby, JS, etc. use attributions on tech events — not separate person milestones.

---

## P4 — Researchers & theory `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `dijkstra-go-to-considered-harmful` | Edsger Dijkstra | Publishes "goto considered harmful" (1968) | 2 | `[x]` |
| `leslie-lamport-paxos-published` | Leslie Lamport | Publishes Paxos (1989) | 2 | `[x]` |
| `barbara-liskov-turing-award` | Barbara Liskov | Wins Turing Award (2008) | 2 | `[x]` |
| `john-mccarthy-lisp-invented` | John McCarthy | Invents Lisp (1958) | 1 | `[x]` |
| `niklaus-wirth-pascal-published` | Niklaus Wirth | Publishes Pascal (1970) | 2 | `[x]` |
| `fred-brooks-mythical-man-month` | Fred Brooks | Publishes Mythical Man-Month (1975) | 2 | `[x]` |
| `john-von-neumann-architecture` | John von Neumann | Describes stored-program architecture (1945) | 1 | `[x]` |
| `frances-allen-turing-award` | Frances Allen | Wins Turing Award (2006) | 2 | `[x]` |
| `shafi-goldwasser-turing-award` | Shafi Goldwasser | Wins Turing Award (2012) | 2 | `[x]` |
| `karen-sparck-jones-idf` | Karen Spärck Jones | Publishes IDF (1972) | 2 | `[x]` |

---

## P5 — Web, open source & culture `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `berners-lee-web-public-domain` | Tim Berners-Lee | CERN releases web to public domain (Apr 1993) | 1 | `[x]` |
| `stallman-gnu-manifesto` | Richard Stallman | Publishes GNU Manifesto (Mar 1985) | 1 | `[x]` |
| `gpl-version-1-released` | Richard Stallman | Publishes GPL v1 (Feb 1989) | 2 | `[x]` |
| `open-source-initiative-founded` | Eric Raymond, Bruce Perens | Found Open Source Initiative (Feb 1998) | 2 | `[x]` |
| `mozilla-foundation-created` | Mitchell Baker | Mozilla Foundation created (Jul 2003) | 2 | `[x]` |
| `wikipedia-launched` | Jimmy Wales, Larry Sanger | Launch Wikipedia (Jan 2001) | 2 | `[x]` |
| `ward-cunningham-wiki-invented` | Ward Cunningham | Creates first wiki (Mar 1995) | 2 | `[x]` |
| `martin-fowler-refactoring-published` | Martin Fowler | Publishes Refactoring (1999) | 2 | `[x]` |
| `kent-beck-extreme-programming` | Kent Beck | Publishes Extreme Programming Explained (1999) | 2 | `[x]` |
| `eric-raymond-cathedral-bazaar` | Eric Raymond | Publishes Cathedral and the Bazaar (1997) | 2 | `[x]` |

---

## P6 — Women pioneers & networking `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `radia-perlman-spanning-tree` | Radia Perlman | Publishes spanning tree protocol (1985) | 2 | `[x]` |
| `adele-goldberg-smalltalk-80` | Adele Goldberg | Co-releases Smalltalk-80 (1980) | 2 | `[x]` |
| `grace-hopper-nanoseconds-lecture` | Grace Hopper | Popularizes nanosecond wire demo (1980s) | 2 | `[x]` |
| `anita-borg-grace-hopper-conference` | Anita Borg | Founds Grace Hopper Celebration (1994) | 2 | `[x]` |
| `elizabeth-feinler-nic-created` | Elizabeth Feinler | Runs ARPANET NIC (1970s) | 3 | `[x]` |
| `mary-lou-jepsen-olpc-displays` | Mary Lou Jepsen | Leads OLPC display engineering (2007) | 3 | `[x]` |
| `susan-kare-macintosh-icons` | Susan Kare | Designs Macintosh icons (1983–84) | 2 | `[x]` |
| `lynn-conway-vlsi-course` | Lynn Conway | Publishes Mead–Conway VLSI course (1979) | 2 | `[x]` |
| `jean-sammet-formac-published` | Jean Sammet | Develops FORMAC (1962) | 3 | `[x]` |
| `mary-ken-thompson-lynx-created` | Mary Kenneth Thompson, Lou Montulli | Create Lynx browser (1992) | 3 | `[x]` |

---

## P7 — Tooling & infrastructure creators `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `fabrice-bellard-ffmpeg-created` | Fabrice Bellard | Creates FFmpeg (2000) | 2 | `[x]` |
| `miguel-de-icaza-mono-announced` | Miguel de Icaza | Announces Mono (Jun 2001) | 2 | `[x]` |
| `bram-moolenaar-vim-released` | Bram Moolenaar | Releases Vim (1991) | 2 | `[x]` |
| `daniel-stenberg-curl-released` | Daniel Stenberg | Releases curl (Mar 1998) | 2 | `[x]` |
| `theo-de-raadt-openbsd-forked` | Theo de Raadt | Forks OpenBSD (Oct 1995) | 2 | `[x]` |
| `rob-pike-utf8-paper` | Rob Pike, Ken Thompson | Publish UTF-8 design (Sep 1992) | 2 | `[x]` |
| `douglas-crockford-json-spec` | Douglas Crockford | Popularizes JSON spec (2006) | 2 | `[x]` |
| `andy-tanenbaum-minix-created` | Andrew Tanenbaum | Creates MINIX (1987) | 2 | `[x]` |
| `brian-kernighan-awk-coauthored` | Brian Kernighan | Co-creates AWK (1977) | 2 | `[x]` |
| `alexander-stepanov-stl-published` | Alexander Stepanov | Publishes STL (1994) | 2 | `[x]` |

---

## P8 — AI pioneers `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `hinton-alexnet-imagenet-breakthrough` | Geoffrey Hinton | Team wins ImageNet with AlexNet (Sep 2012) | 1 | `[x]` |
| `demis-hassabis-deepmind-founded` | Demis Hassabis | Co-founds DeepMind (Sep 2010) | 1 | `[x]` |
| `fei-fei-li-imagenet-dataset-launched` | Fei-Fei Li | Launches ImageNet dataset (2009) | 1 | `[x]` |
| `deep-learning-turing-trio-2018` | Bengio, Hinton, LeCun | Share Turing Award (2018) | 1 | `[x]` |
| `ian-goodfellow-gan-invented` | Ian Goodfellow | Invents GANs (Jun 2014) | 2 | `[x]` |
| `marvin-minsky-dartmouth-workshop` | Minsky, McCarthy | Co-organize Dartmouth AI workshop (Aug 1956) | 1 | `[x]` |
| `judea-pearl-turing-award` | Judea Pearl | Wins Turing Award (2011) | 2 | `[x]` |
| `andrew-ng-stanford-ml-course` | Andrew Ng | Launches Stanford ML MOOC (2011) | 2 | `[x]` |
| `yann-lecun-lenet-published` | Yann LeCun | Publishes LeNet (1989) | 2 | `[x]` |
| `frank-rosenblatt-perceptron` | Frank Rosenblatt | Builds Perceptron (1957) | 2 | `[x]` |

---

## P9 — Browser & web pioneers `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `mosaic-1-0-released` | Marc Andreessen, Eric Bina | Co-create Mosaic | — | `[x]` attribution |
| `marc-andreessen-netscape-founded` | Marc Andreessen, Jim Clark | Found Netscape (Apr 4, 1994) | 2 | `[x]` |
| `haakon-lie-css-proposed` | Håkon Wium Lie | Proposes CSS (Oct 10, 1994) | 2 | `[x]` |
| `javascript-name-announced` | Brendan Eich | Creates JavaScript | — | `[x]` attribution |
| `steve-jobs-iphone-introduced` | Steve Jobs | Introduces iPhone (Jan 9, 2007) | 1 | `[-]` removed |
| `steve-wozniak-apple-founded` | Steve Jobs, Steve Wozniak | Found Apple (Apr 1, 1976) | 1 | `[x]` |
| `worldwideweb-browser` | Tim Berners-Lee | Proposes WWW | — | `[x]` attribution |
| `cerf-kahn-tcp-ip-paper-published` | Vint Cerf, Bob Kahn | Publish TCP/IP paper (May 1974) | 1 | `[x]` |
| `tcp-ip-flag-day` | Vint Cerf, Bob Kahn | ARPANET TCP/IP transition | — | `[x]` attribution |
| `jon-postel-iana-stewardship` | Jon Postel | Begins IANA stewardship (1972) | 2 | `[x]` |
| `rest-architectural-style-defined` | Roy Fielding | Defines REST in dissertation (2000) | — | `[x]` attribution |

---

## P10 — Security & cryptography `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `phil-zimmermann-pgp-released` | Phil Zimmermann | Releases PGP (Jun 5, 1991) | 2 | `[x]` |
| `diffie-hellman-paper-published` | Whitfield Diffie, Martin Hellman | Publish Diffie–Hellman (Nov 1976) | 1 | `[x]` |
| `rsa-algorithm-published` | Rivest, Shamir, Adleman | Invent RSA (1977) | 1 | `[x]` |
| `bruce-schneier-applied-cryptography` | Bruce Schneier | Publishes Applied Cryptography (1994) | 2 | `[x]` |
| `goldwasser-micali-zero-knowledge-published` | Shafi Goldwasser, Silvio Micali | Zero-knowledge proofs (1985) | 2 | `[x]` |
| `clifford-cocks-public-key` | Clifford Cocks | Invents RSA-class algorithm at GCHQ (1973) | 3 | `[x]` |
| `moxie-marlinspike-textsecure-released` | Moxie Marlinspike | Releases TextSecure (May 2010) | 2 | `[x]` |
| `bash-1-0-released` | Brian Fox | Creates Bash | — | `[x]` attribution |
| `openssh-first-released` | Theo de Raadt | OpenBSD team ships OpenSSH (Dec 1, 1999) | 2 | `[x]` |
| Bruce Schneier Twofish / blogging | — | — | 3 | `[-]` skip |

---

## P11 — More CEOs & company transitions `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `jensen-huang-nvidia-founded` | Jensen Huang et al. | Co-found NVIDIA (Apr 5, 1993) | 1 | `[x]` |
| `lisa-su-amd-ceo` | Lisa Su | Named AMD CEO (Oct 8, 2014) | 2 | `[x]` |
| `andy-jassy-aws-ceo` | Andy Jassy | Named AWS CEO (Apr 2016) | 2 | `[x]` |
| `pat-gelsinger-intel-ceo` | Pat Gelsinger | Returns as Intel CEO (Feb 15, 2021) | 2 | `[x]` |
| `shantanu-narayen-adobe-ceo` | Shantanu Narayen | Named Adobe CEO (Dec 1, 2007) | 2 | `[-]` removed |
| `marissa-mayer-yahoo-ceo` | Marissa Mayer | Named Yahoo CEO (Jul 16, 2012) | 2 | `[-]` removed |
| `jack-dorsey-twitter-founded` | Jack Dorsey et al. | Launch Twitter (Jul 15, 2006) | 2 | `[-]` removed |
| `reed-hastings-netflix-streaming` | Reed Hastings, Marc Randolph | Launch Netflix streaming (Jan 16, 2007) | 2 | `[-]` removed |
| `larry-ellison-oracle-founded` | Larry Ellison et al. | Co-found Oracle (Jun 16, 1977) | 2 | `[x]` |
| `oracle-2-released` | Larry Ellison | Co-founder attribution | — | `[x]` attribution |
| `elon-musk-tesla-chairman` | Elon Musk | Leads Tesla Series A (Feb 2004) | 2 | `[-]` removed |

---

## P12 — CI/CD, cloud & DevOps creators `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `hudson-ci-released` | Kohsuke Kawaguchi | Creates Hudson | — | `[x]` attribution |
| `kohsuke-kawaguchi-jenkins-renamed` | Kohsuke Kawaguchi | Renames Hudson to Jenkins (Jan 11, 2011) | 2 | `[x]` |
| `vagrant-released` | Mitchell Hashimoto | Creates Vagrant | — | `[x]` attribution |
| `terraform-released` | Mitchell Hashimoto | Creates Terraform | — | `[x]` attribution |
| `docker-open-sourced` | Solomon Hykes | Creates Docker | — | `[-]` attribution (prior batch) |
| `werner-vogels-amazon-cto` | Werner Vogels | Named Amazon CTO (Sep 2005) | 2 | `[x]` |
| `heroku-launched` | Adam Wiggins et al. | Co-founds Heroku | — | `[x]` attribution |
| `npm-first-released` | Isaac Schlueter | Creates npm | — | `[x]` attribution |
| `tom-preston-werner-github-resigns` | Tom Preston-Werner | Resigns from GitHub (Apr 21, 2014) | 3 | `[x]` |
| `chris-wanstrath-github-ceo-steps-down` | Chris Wanstrath | Steps down as CEO (Aug 17, 2017) | 3 | `[x]` |

---

## P13 — More researchers & CS theory `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `tony-hoare-quicksort-published` | Tony Hoare | Publishes Quicksort (Jul 1961) | 2 | `[x]` |
| `tony-hoare-csp-published` | Tony Hoare | Publishes CSP (Aug 1978) | 2 | `[x]` |
| `donald-knuth-tex-development` | Donald Knuth | Begins TeX development (1978) | 2 | `[x]` |
| `dijkstra-go-to-considered-harmful` | Edsger Dijkstra | Goto letter (canonical) | — | `[-]` skip (P4) |
| `john-backus-turing-award` | John Backus | Wins Turing Award (1977) | 2 | `[x]` |
| Ken Thompson / Unix | — | Covered elsewhere | — | `[-]` skip |
| `richard-hamming-error-correcting-codes` | Richard Hamming | Error-correcting codes (1950) | 2 | `[x]` |
| `stephen-cook-np-completeness` | Stephen Cook | NP-completeness (1971) | 2 | `[x]` |
| `michael-stonebraker-postgres-research` | Michael Stonebraker | Leads Postgres project (1986) | 2 | `[x]` |
| `jim-gray-turing-award` | Jim Gray | Wins Turing Award (1998) | 2 | `[x]` |

---

## P14 — Hardware & semiconductor pioneers `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `gordon-moore-moores-law` | Gordon Moore | Publishes Moore's Law (Apr 19, 1965) | 1 | `[x]` |
| `jack-kilby-integrated-circuit` | Jack Kilby | Demonstrates first IC (Sep 12, 1958) | 1 | `[x]` |
| `robert-noyce-integrated-circuit` | Robert Noyce | Invents planar IC (1959) | 1 | `[x]` |
| `moore-noyce-intel-founded` | Gordon Moore, Robert Noyce | Co-found Intel (Jul 18, 1968) | 1 | `[x]` |
| `seymour-cray-cdc-6600` | Seymour Cray | Designs CDC 6600 (1964) | 2 | `[x]` |
| `apple-ii-introduced` | Steve Jobs, Steve Wozniak | Introduce Apple II (Apr 16, 1977) | 2 | `[x]` |
| `jensen-huang-cuda-announced` | Jensen Huang | Announces CUDA (Nov 8, 2006) | 2 | `[x]` |
| `lisa-su-amd-zen-launched` | Lisa Su | Launches Ryzen/Zen (Mar 2, 2017) | 2 | `[x]` |
| `andy-grove-intel-ceo` | Andy Grove | Named Intel CEO (Oct 18, 1987) | 2 | `[x]` |
| `morris-chang-tsmc-founded` | Morris Chang | Founds TSMC (Feb 21, 1987) | 1 | `[x]` |

---

## P15 — International & underrepresented pioneers `[x]` done

| Event id | Person(s) | Milestone to verify | Imp | Status |
|----------|-----------|---------------------|-----|--------|
| `ruby-0-95-released` | Yukihiro Matsumoto | Creates Ruby | — | `[x]` attribution |
| `elixir-first-release` | José Valim | Creates Elixir | — | `[x]` attribution |
| `yukihiro-matsumoto-ruby-1-released` | Yukihiro Matsumoto | Releases Ruby 1.0 (Dec 21, 1996) | 2 | `[x]` |
| `audrey-tang-g0v-launched` | Audrey Tang | Co-launches g0v (Dec 2012) | 2 | `[x]` |
| `audrey-tang-digital-minister` | Audrey Tang | Appointed digital minister (Oct 2016) | 2 | `[x]` |
| `tim-berners-lee-w3c-founded` | Tim Berners-Lee | Founds W3C (Oct 1, 1994) | 2 | `[x]` |
| `richard-stallman-fsf-founded` | Richard Stallman | Founds FSF (Oct 4, 1985) | 2 | `[x]` |
| `git-created` | Linus Torvalds | Creates Git | — | `[x]` attribution |
| `redis-first-released` | Salvatore Sanfilippo | Creates Redis | — | `[x]` attribution |
| `laravel-first-beta` | Taylor Otwell | Creates Laravel | — | `[x]` attribution |
| `nestjs-announced` | Kamil Myśliwiec | Creates NestJS | — | `[x]` attribution |
| `rasmus-lerdorf-php-3-released` | Rasmus Lerdorf | Releases PHP 3 (Jun 1998) | 2 | `[x]` |
| `guido-van-rossum-psf-founded` | Guido van Rossum | PSF incorporated (Mar 6, 2001) | 2 | `[x]` |
| `patrick-volkerding-slackware-released` | Patrick Volkerding | Releases Slackware (Jul 17, 1993) | 2 | `[x]` |

---

## P16 — Modern AI & ML `[x]` done

| Person | Milestone to verify | Suggested event id | Imp | Status |
|--------|---------------------|-------------------|-----|--------|
| Ilya Sutskever | Co-founds OpenAI / GPT research lead | `ilya-sutskever-openai-research` | 2 | `[x]` |
| Andrej Karpathy | Joins Tesla AI / publishes CS231n | `andrej-karpathy-cs231n` | 2 | `[x]` |
| Sam Altman | ChatGPT launch | *attribution on `chatgpt-released`* | — | `[-]` |
| Dario Amodei | Leaves OpenAI, founds Anthropic | *covered by `dario-amodei-anthropic-founded`* | — | `[-]` |
| Demis Hassabis | AlphaGo beats Lee Sedol (2016) | `demis-hassabis-alphago-victory` | 1 | `[x]` |
| Geoffrey Hinton | Leaves Google, warns on AI risk (2023) | `geoffrey-hinton-google-departure` | 2 | `[x]` |
| Fei-Fei Li | Co-directs Stanford HAI (2019) | `fei-fei-li-stanford-hai` | 2 | `[x]` |
| Yann LeCun | Named Meta Chief AI Scientist (2018) | `yann-lecun-meta-chief-ai` | 2 | `[x]` |
| Yoshua Bengio | Mila institute leadership | `yoshua-bengio-mila-founded` | 2 | `[x]` |
| Rich Sutton | Publishes Reinforcement Learning textbook (1998) | `rich-sutton-rl-textbook` | 2 | `[x]` |

---

## Research workflow (batch by batch)

For each row:

1. **Check duplication** — does a tech event exist? → attribution only. Is there already a people milestone? → skip.
2. **Find primary source** — founder blog post, press release, paper PDF, official announcement, ACM award page.
3. **Cross-check** — Wikipedia with citation, Computer History Museum, official company history.
4. **Draft event** — event-style title, `people` array, `narrative` block, two `sources` (`date` + `overview`).
5. **Place in bucket** — add to `scripts/data/people-milestones.ts` (or attribution file), run seed script.
6. **Validate** — `npm run validate`.
7. **Mark `[x]`** in this file.

### Per-batch checklist

- [ ] All dates verified from primary source
- [ ] No duplicate person+tech events (attributions used where applicable)
- [ ] `importance` set (1 / 2 / 3)
- [ ] `tags` includes `"people"`
- [ ] `relatedIds` point to existing event ids
- [ ] `npm run validate` passes

---

## Suggested batch order (remaining work)

1. ~~**Attribution pass**~~ — done
2. ~~**P9**~~ — done
3. ~~**P10**~~ — done
4. ~~**P11**~~ — done
5. ~~**P12**~~ — done
6. ~~**P13**~~ — done
7. ~~**P14**~~ — done
8. ~~**P15**~~ — done
9. ~~**P16**~~ — done

---

## Sources to prefer

- Founder / author announcements and blogs
- ACM Turing Award pages (amturing.acm.org)
- Official company history pages (Microsoft, Google, Apple press releases)
- Original papers (arXiv, ACM Digital Library, IEEE)
- RFC authors for protocol inventors
- Conference keynotes with verifiable dates (WWDC, Google I/O, re:Invent)

Avoid: uncited birth dates, "influential person" listicles, rounded "circa" dates without backing.

---

## File reference

| File | Purpose |
|------|---------|
| `scripts/data/people-milestones.ts` | Standalone people milestone definitions (P1–P8 seeded) |
| `lib/timeline/people-attributions.ts` | `people` overlay on existing tech events |
| `scripts/seed-people-milestones.ts` | Writes milestones into `content/timeline/` buckets |
| `content/timeline/README.md` | Schema docs for `people` field |
