# Techline research plan — infrastructure, protocols & dev tooling

Companion to [RESEARCH-PLAN.md](./RESEARCH-PLAN.md). **Devices & hardware:** [RESEARCH-PLAN-DEVICES.md](./RESEARCH-PLAN-DEVICES.md). **People & leadership:** [RESEARCH-PLAN-PEOPLE.md](./RESEARCH-PLAN-PEOPLE.md). Same rules apply:

1. **First public release / invention** — always include for tier-1 items.
2. **Major standards & paradigm shifts** — HTTP/1.1, TLS 1.0, Docker, Kubernetes, etc.
3. **Termination as separate events** — EOL, retirement, discontinuation (see Flash, Python 2, IE 11).
4. **Skip** patch releases, minor point versions, vendor-specific forks unless historically notable.
5. **Never guess** — cite primary source; use `year.json` + `datePrecision: "year"` when month/day unknown.

Status: `[ ]` pending · `[~]` in progress · `[x]` verified & added · `[-]` skip

Suggested tags: `database`, `protocol`, `web-server`, `vcs`, `build`, `package-manager`, `ide`, `ci`, `container`, `cloud`, `orm`, `compiler`, `runtime`, `standard`

---

## Already covered (do not duplicate)

| Area | Event | Status |
|------|-------|--------|
| Database language | SQL invented (IBM System R, 1974) | `[x]` |
| Query API | GraphQL open-sourced (Jul 1, 2015) | `[x]` |
| API style | REST, SOAP, GraphQL Foundation | `[x]` — see events below |
| Hypertext | WorldWideWeb browser (1990) | `[x]` |
| Web platform | ECMAScript standards, WebAssembly MVP | `[x]` |
| ORM mention | Django (includes ORM) | `[x]` |

---

## Batch K — Databases (relational & pre-relational)

### Pioneers & hierarchical / network era

| Item | Events to verify | Status |
|------|------------------|--------|
| IMS (IBM) | First hierarchical DBMS, Apollo program era (~1968) | `[ ]` |
| CODASYL / network model | DBTG report, IDS | `[ ]` |
| Ingres | Berkeley, QUEL, ~1974–1975 | `[ ]` |
| System R → SQL | Already have SQL language; consider **first working System R** as distinct? | `[ ]` |
| Oracle | First commercial release (1979) | `[x]` |
| dBase | Ashton-Tate, CP/M / PC era (~1979) | `[ ]` |
| PostgreSQL (Postgres) | Berkeley Postgres, ~1986; **PostgreSQL name** 1996 | `[ ]` |
| MySQL | First release (1995) | `[ ]` |
| SQLite | First public release (2000) | `[x]` |
| Microsoft Access / Jet | Access 1.0 (1992) | `[ ]` |

### Enterprise & standards

| Item | Events to verify | Status |
|------|------------------|--------|
| SQL standard | SQL-86 (ANSI X3.135), SQL-92, SQL:1999 | `[ ]` |
| IBM DB2 | First release on MVS (~1983) | `[ ]` |
| Sybase | SQL Server origins; Sybase SQL Server (1987) | `[ ]` |
| Microsoft SQL Server | SQL Server 1.0 for OS/2 (1989) | `[ ]` |
| ODBC | Standard published (1992) | `[ ]` |
| JDBC | Java Database Connectivity (1997) | `[ ]` |

### NoSQL & modern stores

| Item | Events to verify | Status |
|------|------------------|--------|
| Berkeley DB | Sleepycat, embedded KV (~1991) | `[ ]` |
| Memcached | LiveJournal / Brad Fitzpatrick (2003) | `[x]` |
| Redis | First release Salvatore Sanfilippo (2009) | `[x]` |
| MongoDB | 10gen first public (2009) | `[x]` |
| Cassandra | Facebook open-source (2008) | `[x]` |
| CouchDB | Damien Katz first release (2007) | `[x]` |
| Dynamo paper | Amazon SOSP 2007 (influence event, not product) | `[ ]` |
| Amazon DynamoDB | AWS service launch (2012) | `[ ]` |
| Elasticsearch | Shay Banon first release (2010) | `[x]` |
| LevelDB | Google open-source (2011) | `[x]` |
| CockroachDB | First release (2015) | `[x]` |
| MariaDB | Fork from MySQL (2009) | `[x]` |
| Prisma | Prisma 1 / Graphcool era; **Prisma 2** (2020) | `[ ]` |

### Termination candidates (separate events)

| Item | Event to verify | Status |
|------|-----------------|--------|
| Oracle discontinues Berkeley DB SQL? | Verify if notable | `[-]` |
| MySQL → MariaDB fork | 2009 Oracle acquisition context | `[ ]` |

---

## Batch L — Protocols & networking

### Internet foundations

| Item | Events to verify | Status |
|------|------------------|--------|
| ARPANET | First node operational (1969) | `[ ]` |
| TCP/IP | **NCP → TCP/IP transition** (Jan 1, 1983) | `[x]` |
| DNS | RFC 882/883 (1983); BIND | `[x]` |
| SMTP | RFC 821 (1982) | `[x]` |
| FTP | RFC 959 (1985) or earlier ARPANET FTP | `[x]` |
| Telnet | RFC 854 (1983) | `[x]` |
| NFS | Sun NFS v1 (1984) | `[x]` |
| LDAP | RFC 1777 (1995) | `[x]` |

### Web & HTTP

| Item | Events to verify | Status |
|------|------------------|--------|
| HTTP | **HTTP/1.1** RFC 2068 (Jan 1997) | `[x]` |
| HTML | First spec / Berners-Lee draft (1991) | `[x]` |
| URI / URL | RFC 1630 (1994) | `[x]` |
| CGI | NCSA specification (~1993) | `[x]` |
| Cookies | Netscape spec (1994) | `[ ]` |
| JavaScript in browser | Already covered | `[x]` |
| XMLHttpRequest | Microsoft Outlook Web Access / IE5 (1999) | `[ ]` |
| AJAX term / pattern | Jesse James Garrett essay (Feb 2005) | `[ ]` |
| Comet / Server-Sent Events | SSE HTML5 (2011) | `[ ]` |
| WebSocket | RFC 6455 (2011) | `[x]` |
| HTTP/2 | RFC 7540 (2015) | `[x]` |
| HTTP/3 (QUIC) | RFC 9114 (2022) | `[x]` |
| gRPC | Google open-source (2015) | `[x]` |
| OpenAPI (Swagger) | Swagger 1.0 / OpenAPI 3.0 | `[x]` |

> **REST, SOAP, GraphQL** — detailed checklist in [Batch S](#batch-s--api-paradigms-rest-soap-graphql--rpc) below.

### Security & identity

| Item | Events to verify | Status |
|------|------------------|--------|
| SSL 2.0 | Netscape (1995) — Navigator 2 already tagged SSL | `[ ]` |
| TLS 1.0 | RFC 2246 (1999) | `[x]` |
| Let's Encrypt | Public launch (2015) | `[x]` |
| OAuth 1.0 | December 2007 | `[x]` |
| OAuth 2.0 | RFC 6749 (2012) | `[x]` |
| JWT | RFC 7519 (2015) | `[x]` |
| OpenID Connect | 1.0 (2014) | `[x]` |
| PGP | Phil Zimmermann (1991) | `[ ]` |

### Messaging & streaming

| Item | Events to verify | Status |
|------|------------------|--------|
| IRC | Jarkko Oikarinen (1988) | `[ ]` |
| XMPP / Jabber | Jeremie Miller (1999) | `[x]` |
| RabbitMQ | Rabbit Technologies (2007) | `[x]` |
| Apache Kafka | LinkedIn open-source (2011) | `[x]` |
| ZeroMQ | iMatix / Martin Sustrik (2007) | `[x]` |
| MQTT | IBM / Eurotech (1999 standard) | `[x]` |

---

## Batch S — API paradigms: REST, SOAP, GraphQL & RPC

How developers expose and consume backend logic over the network. These are **architectural / specification** events — not framework releases (Spring REST, Express routes, etc.).

### REST (Representational State Transfer)

| Item | Events to verify | Status |
|------|------------------|--------|
| REST architectural style defined | Roy Fielding dissertation, Ch. 5 — *Architectural Styles and the Design of Network-based Software Architectures* (2000) | `[ ]` |
| Richardson Maturity Model | Leonard Richardson, QCon 2008 (levels 0–3 for HTTP APIs) | `[ ]` |
| JSON as default API payload | No single date — **skip** unless a clear milestone (e.g. Twitter API JSON switch) | `[-]` |
| HATEOAS in practice | Usually folded into REST dissertation event | `[-]` |

**Notes:** REST is a design *style*, not a protocol. The dissertation is the canonical "birth" event. Most "REST APIs" in the wild are HTTP+JSON without hypermedia — worth saying in `about`, not a separate event.

**Sources to check:** [Fielding dissertation PDF](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm); Fielding's 2008 blog post "REST APIs must be hypertext-driven" if we want a secondary clarification event.

### SOAP (Simple Object Access Protocol)

| Item | Events to verify | Status |
|------|------------------|--------|
| XML-RPC | Dave Winer / UserLand — precursor protocol (1998) | `[x]` |
| SOAP 1.1 | W3C Note (May 8, 2000) — Microsoft, IBM, Userland, DevelopMentor submission | `[ ]` |
| SOAP 1.2 | W3C Recommendation (June 24, 2003) | `[x]` |
| WSDL 1.1 | W3C Note (March 15, 2001) | `[ ]` |
| .NET Web Services / ASMX | Shipped with .NET Framework 1.0 (2002) — SOAP on Windows stack | `[ ]` |
| WS-I Basic Profile | Interop standard (2004) — optional, enterprise angle | `[ ]` |

**Notes:** SOAP peaked in enterprise Java (.NET, JAX-WS, Axis) and B2B integrations before REST+JSON won for public APIs. Pair SOAP 1.1 with XML-RPC in `relatedIds`.

**Termination candidates:** SOAP is deprecated in many stacks but not "dead" — **no EOL event** unless we find a major vendor retirement announcement.

### GraphQL

| Item | Events to verify | Status |
|------|------------------|--------|
| GraphQL open-sourced | Facebook technical preview + graphql-js (Jul 1, 2015) | `[x]` |
| GraphQL public engineering post | Meta — "GraphQL: A data query language" (Sep 14, 2015) | `[x]` cited in existing event |
| Relay open-sourced | Facebook Relay (Aug 2015) | `[ ]` |
| Apollo Client 1.0 | Meteor/Apollo (2016) | `[ ]` |
| GraphQL specification repo | graphql/graphql-spec first public commits | `[ ]` |
| GraphQL Foundation | Linux Foundation (Nov 6, 2018) | `[x]` |
| GraphQL June 2018 spec release | Major spec milestone | `[ ]` |

**Notes:** One event exists (`graphql-open-sourced`). Consider whether Relay, Apollo, or Foundation are tier-1 enough or stay as `relatedIds` targets only. Foundation transfer is the strongest *second* event — marks GraphQL as vendor-neutral.

### RPC & alternatives (context for REST/SOAP/GraphQL)

| Item | Events to verify | Status |
|------|------------------|--------|
| CORBA 2.0 | OMG (1994) — pre-web enterprise RPC | `[ ]` |
| Java RMI | JDK 1.1 (1997) | `[ ]` |
| XML-RPC | Listed under SOAP precursors | `[x]` |
| JSON-RPC | Spec / first widespread use (~2005–2007) | `[x]` |
| gRPC | Google open-source (Feb 2015) | `[x]` |
| OpenAPI (Swagger) | SmartBear Swagger 1.0 (2011); OpenAPI 3.0 (2017) — REST *documentation*, not style | `[x]` |
| OData | Microsoft open protocol (2007) | `[ ]` |
| Falcor | Netflix open-source (2015) — GraphQL contemporary | `[ ]` |

### Suggested event framing

| Style | Good timeline title | Category | Tags |
|-------|---------------------|----------|------|
| REST | "REST architectural style defined" | `protocol` or `software` | `rest`, `api`, `http`, `standard` |
| SOAP | "SOAP 1.1 published as W3C Note" | `protocol` | `soap`, `xml`, `api`, `web-service`, `standard` |
| GraphQL | Already: "GraphQL technical preview open-sourced" | `software` | `graphql`, `api`, `query-language` |

---

## Batch M — Web servers & app servers

| Item | Events to verify | Status |
|------|------------------|--------|
| NCSA HTTPd | Predecessor to Apache (~1993) | `[ ]` |
| Apache HTTP Server | First release 0.6.2 (Apr 21, 1995) | `[x]` |
| nginx | Igor Sysoev first public (Oct 4, 2004) | `[x]` |
| lighttpd | First release (2003) | `[x]` |
| Caddy | Matt Holt first release (2015) | `[x]` |
| Microsoft IIS | First release with Windows NT (1995) | `[ ]` |
| Tomcat | Apache Jakarta Tomcat 3.x era; servlet container origins | `[x]` |
| Jetty | Mort Bay (1995) | `[x]` |
| Gunicorn | Python WSGI server (2010) | `[x]` |
| uWSGI | Unbit (2009) | `[x]` |
| Passenger | Phusion (2008) | `[x]` |
| Caddy automatic HTTPS | Milestone if distinct from first release | `[ ]` |

---

## Batch N — Version control, forges & collaboration

| Item | Events to verify | Status |
|------|------------------|--------|
| SCCS | Bell Labs (1972) | `[ ]` |
| RCS | Walter Tichy (1982) | `[ ]` |
| CVS | GNU CVS (1986) | `[ ]` |
| Subversion (SVN) | CollabNet 1.0 (Feb 23, 2004) | `[x]` |
| BitKeeper | BitMover (1998); **Linux kernel use** | `[ ]` |
| Git | Linus Torvalds announcement (Apr 7, 2005) | `[x]` |
| Mercurial | Matt Mackall (2005) | `[x]` |
| GitHub | Public launch (Apr 2008) | `[x]` |
| GitLab | Dmitriy Zaporozhets (2011) | `[x]` |
| Bitbucket | Jesper Noehr (2008) | `[x]` |
| SourceForge | VA Linux (1999) | `[ ]` |
| Codeberg / Gitea | If notable enough | `[-]` |
| Pull request workflow | GitHub pull requests (2008) | `[ ]` |

### Termination candidates

| Item | Event to verify | Status |
|------|-----------------|--------|
| Google Code shutdown | 2016 | `[ ]` |
| Bitbucket Mercurial support ended | 2020 | `[ ]` |

---

## Batch O — Build systems, package managers & language tooling

### Build & compile

| Item | Events to verify | Status |
|------|------------------|--------|
| Make | Stuart Feldman (Apr 1976) | `[x]` |
| Autoconf | David MacKenzie (1991) | `[x]` |
| CMake | Kitware (2000) | `[x]` |
| Ant | Apache Ant 1.0 (2000) | `[x]` |
| Maven | Apache Maven 1.0 (2004) | `[x]` |
| Gradle | Hans Dockter (2008) | `[x]` |
| Bazel | Google open-source (2015) | `[x]` |
| Meson | Jussi Pakkanen (2013) | `[x]` |
| Ninja | Evan Martin / Chrome team (2012) | `[x]` |
| GCC | GNU Compiler Collection 1.0 (1987) | `[x]` |
| LLVM project | Chris Lattner, UIUC (2003) | `[x]` |
| Clang | First release (2007) | `[x]` |
| javac / JDK | Partially covered via Java 1.0 | `[x]` partial |

### Package & dependency managers

| Item | Events to verify | Status |
|------|------------------|--------|
| CPAN | Perl (1995) | `[ ]` |
| RubyGems | Chad Fowler et al. (2004) | `[x]` |
| pip | First release (2008) | `[x]` |
| npm | Isaac Schlueter (Jan 12, 2010) | `[x]` |
| Yarn | Facebook (2016) | `[x]` |
| pnpm | Zoltan Kochan (2017) | `[x]` |
| Composer | PHP (2012) | `[x]` |
| Cargo | Rust (2015) | `[x]` |
| Homebrew | Max Howell (2009) | `[x]` |
| apt / Debian package manager | dpkg/apt origins (~1994) | `[ ]` |
| NuGet | Microsoft (2010) | `[x]` |
| Maven Central | As distinct from Maven build tool? | `[ ]` |

### Bundlers & frontend toolchain

| Item | Events to verify | Status |
|------|------------------|--------|
| Browserify | James Halliday (2011) | `[x]` |
| webpack | Tobias Koppers (2012) | `[x]` |
| Rollup | Rich Harris (2015) | `[x]` |
| Parcel | Devon Govett (2017) | `[ ]` |
| Vite | Evan You (2020) | `[ ]` |
| esbuild | Evan Wallace (2020) | `[ ]` |
| Babel (6trace) | Sebastian McKenzie (2014) | `[x]` |
| SWC | Dongyoon Kang (2019) | `[ ]` |
| ESLint | Nicholas Zakas (2013) | `[x]` |
| Prettier | James Long (2017) | `[ ]` |
| TypeScript compiler | Partially covered | `[x]` partial |

---

## Batch P — IDEs, editors & developer UX

| Item | Events to verify | Status |
|------|------------------|--------|
| Emacs | Stallman, Gosling Emacs → GNU Emacs (1985) | `[ ]` |
| vi / Vim | Bill Joy vi (1976); **Vim 1.0** Bram Moolenaar (1991) | `[ ]` |
| Turbo Pascal IDE | Borland (1983) | `[ ]` |
| Visual Basic IDE | Covered via VB 1.0 | `[x]` partial |
| Delphi IDE | Covered via Delphi 1.0 | `[x]` partial |
| Eclipse | IBM open-source (2001) | `[x]` |
| IntelliJ IDEA | JetBrains (2001) | `[x]` |
| Visual Studio | VS 97 or VS .NET 2002 — pick milestone | `[ ]` |
| Xcode | Apple (2003) | `[ ]` |
| Sublime Text | Jon Skinner (2008) | `[ ]` |
| Atom | GitHub (2014) | `[ ]` |
| Visual Studio Code | Microsoft (Apr 2015) | `[x]` |
| Neovim | Thiago de Arruda (2015) | `[ ]` |
| LSP (Language Server Protocol) | Microsoft / Red Hat (2016) | `[x]` |
| GitHub Copilot | Technical preview (2021) | `[ ]` |

### Termination candidates

| Item | Event to verify | Status |
|------|-----------------|--------|
| Atom editor discontinued | Dec 2022 | `[ ]` |

---

## Batch Q — CI/CD, containers & platforms

### Continuous integration & deployment

| Item | Events to verify | Status |
|------|------------------|--------|
| CruiseControl | ThoughtWorks (2001) — first popular CI server? | `[ ]` |
| Hudson → Jenkins | Kohsuke Kawaguchi (2005 / 2011 fork) | `[x]` |
| Travis CI | Launch (2011) | `[x]` |
| CircleCI | Launch (2011) | `[x]` |
| GitHub Actions | Public beta (2019) | `[x]` |
| GitLab CI | Built-in CI milestones | `[ ]` |
| Capistrano | Rails deployment (2006) | `[x]` |
| Vagrant | Mitchell Hashimoto (2010) | `[x]` |
| Ansible | Michael DeHaan (2012) | `[x]` |
| Puppet | Luke Kanies (2005) | `[x]` |
| Chef | Hightop (2009) | `[x]` |
| Terraform | HashiCorp (2014) | `[x]` |

### Containers & orchestration

| Item | Events to verify | Status |
|------|------------------|--------|
| chroot | Unix (1979) — too early / skip? | `[-]` |
| FreeBSD jails | (2000) | `[ ]` |
| Linux VServer / OpenVZ | Early containerization | `[ ]` |
| LXC | Linux Containers (2008) | `[x]` |
| Docker | dotCloud open-source (Mar 2013) | `[x]` |
| Kubernetes | Google open-source (Jun 10, 2014) | `[x]` |
| Helm | Kubernetes package manager (2016) | `[x]` |
| Podman | Red Hat (2018) | `[ ]` |
| containerd | CNCF (2017) | `[ ]` |
| OCI / runc | Open Container Initiative (2015) | `[x]` |

### OS & runtime platforms (dev-relevant only)

| Item | Events to verify | Status |
|------|------------------|--------|
| Unix | Ken Thompson & Dennis Ritchie, Bell Labs (1969–1970) | `[ ]` |
| POSIX | IEEE 1003.1 (1988) | `[ ]` |
| GNU project announced | Stallman (1983) | `[ ]` |
| Linux kernel | Linus Torvalds post (Aug 1991) | `[ ]` |
| Minix | Andrew Tanenbaum (1987) | `[ ]` |
| Windows NT | First release (1993) — dev platform angle | `[ ]` |
| WSL | Windows Subsystem for Linux (2016) | `[ ]` |
| JVM spec | First edition (1995) — distinct from Java 1.0? | `[ ]` |
| .NET Core open-source | 2014 announcement | `[x]` partial |
| WebAssembly | Covered | `[x]` |

### PaaS & cloud (landmark launches only)

| Item | Events to verify | Status |
|------|------------------|--------|
| Amazon S3 | Launch (2006) | `[ ]` |
| Amazon EC2 | Launch (2006) | `[ ]` |
| Heroku | Launch (2007) | `[x]` |
| Google App Engine | Preview (2008) | `[ ]` |
| AWS Lambda | Launch (2014) | `[ ]` |
| Vercel / Zeit Now | Rebrand milestones | `[ ]` |
| Netlify | Launch (2014) | `[ ]` |

---

## Batch R — Testing, ORMs & data access

| Item | Events to verify | Status |
|------|------------------|--------|
| xUnit / SUnit | Kent Beck (1998) | `[ ]` |
| JUnit | Erich Gamma & Kent Beck (1997) | `[ ]` |
| TestNG | Cedric Beust (2004) | `[ ]` |
| RSpec | Steven Baker (2005) | `[ ]` |
| pytest | Holger Krekel (2004) | `[ ]` |
| Selenium | ThoughtWorks (2004) | `[ ]` |
| Cypress | Brian Mann (2017) | `[ ]` |
| Playwright | Microsoft (2020) | `[ ]` |
| Jest | Facebook (2016) | `[ ]` |
| Hibernate | Gavin King (2001) | `[ ]` |
| Active Record (Rails) | Covered via Rails? | `[x]` partial |
| Sequelize | Node ORM (2011) | `[ ]` |
| Prisma | See databases batch | `[ ]` |
| TypeORM | (2016) | `[ ]` |
| Entity Framework | Microsoft (2008) | `[ ]` |

---

## Batch T — Physical & access networking `[x]` done

Dev-relevant milestones for how bits reach devices — modems, broadband, Wi-Fi, cellular, satellite. Not every cable SKU; tier-1 paradigm shifts only.

| Event id | Topic | Date | Status |
|----------|-------|------|--------|
| `hayes-smartmodem-introduced` | Hayes Smartmodem (PC-controlled dial-up) | 1981-04 | `[x]` |
| `tat-8-transatlantic-fiber-operational` | First transatlantic fiber (TAT-8) | 1988-12-14 | `[x]` |
| `the-world-commercial-isp-launched` | The World — first commercial dial-up ISP | 1989-11 | `[x]` |
| `at-home-cable-internet-launched` | @Home residential cable internet | 1996-09 | `[x]` |
| `docsis-1-specification-released` | DOCSIS 1.0 cable modem standard | 1997-03 | `[x]` |
| `ieee-802-11-wifi-standard-approved` | IEEE 802.11 Wi-Fi standard | 1997-06-26 | `[x]` |
| `adsl-g992-standard-approved` | ITU G.992.1 ADSL standard | 1999-06-22 | `[x]` |
| `umts-3g-commercial-launched` | NTT DoCoMo FOMA 3G commercial | 2001-10-01 | `[x]` |
| `lte-commercial-launched` | TeliaSonera first commercial LTE | 2009-12-14 | `[x]` |
| `5g-nr-commercial-launched` | South Korea commercial 5G NR | 2019-04-05 | `[x]` |
| `starlink-public-beta-launched` | Starlink public beta | 2020-10-26 | `[x]` |

```bash
# After editing scripts/data/connectivity-milestones.ts:
npm run seed:connectivity
npm run validate
```

---

## Suggested research order

1. **Batch S** — REST (Fielding 2000), SOAP 1.1 (2000), GraphQL Foundation (2018) — completes the API trilogy
2. **Batch N** — Git, GitHub (highest recognition gap)
3. **Batch L** — HTTP, TCP/IP, TLS (foundational protocols)
4. **Batch M** — Apache, nginx (every backend dev knows these)
5. **Batch K** — MySQL, PostgreSQL, Redis, MongoDB (after SQL)
6. **Batch O** — Make, npm, webpack, Docker build chain
7. **Batch Q** — Docker, Kubernetes, CI landmarks
8. **Batch P** — VS Code, Vim, IntelliJ (select milestones)
9. **Batch R** — JUnit, pytest, Hibernate (fill in ecosystem)

---

## Event framing tips

- **Protocols**: prefer RFC publication date or first interoperable implementation — note which in `sources.role`.
- **Databases**: first public release of the *product*, not the research paper (unless paper is the only milestone).
- **Tools**: "first release" not "became popular" — popularity goes in `narrative.whyImportant`.
- **Platforms**: one event per platform birth; major rewrites (e.g. Edge → Chromium) are separate events.
- **Termination**: Flash Player, Python 2, IE 11 are the template — pair with `relatedIds` back to origin event.

---

## Sources to prefer

- RFC Editor (tools.ietf.org) for protocol dates
- Official project blogs & release tags on GitHub
- Author announcements (Torvalds on Git, Berners-Lee on HTTP)
- ACM / IEEE histories for pre-internet systems
- Vendor lifecycle pages for EOL dates

Avoid: "first version circa" without citation; conflating announcement with GA ship date.
