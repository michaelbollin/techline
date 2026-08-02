import type { TimelineEvent } from "../../lib/timeline/schema";

type C = Omit<TimelineEvent, "slug" | "media" | "relatedIds" | "companies"> &
  Partial<Pick<TimelineEvent, "slug" | "media" | "relatedIds" | "companies">>;

function c(event: C): TimelineEvent {
  return {
    ...event,
    slug: event.slug ?? event.id,
    media: event.media ?? [],
    relatedIds: event.relatedIds ?? [],
    people: event.people ?? [],
    companies: event.companies ?? [],
  };
}

/** Dev-relevant physical & access networking milestones (modems, broadband, Wi-Fi, cellular, satellite). */
export const CONNECTIVITY_MILESTONES: TimelineEvent[] = [
  c({
    id: "hayes-smartmodem-introduced",
    date: "1981-04",
    datePrecision: "month",
    title: "Hayes Smartmodem brings PC-controlled dial-up",
    summary:
      "Hayes Microcomputer Products announced the Smartmodem in April 1981 — the first modem a PC could control in software via an RS-232 port and Hayes command set.",
    about:
      "Before the Smartmodem, hobbyists used acoustic couplers or machine-specific modem cards. Hayes put a phone jack and microprocessor on an external box so any computer with a serial port could dial BBSes, UUCP nodes, and early online services. The Hayes AT command language became the de facto standard for dial-up modems through the 56K era.",
    narrative: {
      whyChosen: "The Smartmodem made dial-up networking a plug-in peripheral instead of a custom hardware project.",
      whyImportant: "It enabled the BBS, dial-up ISP, and remote-admin culture that preceded always-on broadband.",
      problemSolved: "Microcomputer owners needed a modem that worked across brands without per-machine hardware designs.",
    },
    category: "hardware",
    tags: ["hardware", "modem", "dial-up", "pc", "networking"],
    importance: 3,
    sources: [
      {
        title: "Smithsonian National Museum of American History — Hayes Smartmodem 300",
        url: "https://americanhistory.si.edu/collections/object/nmah_1303193",
        role: "date",
      },
      {
        title: "Wikipedia — Hayes Microcomputer Products (overview)",
        url: "https://en.wikipedia.org/wiki/Hayes_Microcomputer_Products",
        role: "overview",
      },
    ],
    relatedIds: ["the-world-commercial-isp-launched"],
  }),
  c({
    id: "tat-8-transatlantic-fiber-operational",
    date: "1988-12-14",
    datePrecision: "day",
    title: "TAT-8: first transatlantic fiber-optic cable",
    summary:
      "TAT-8 entered service on December 14, 1988 — the first fiber-optic submarine cable linking North America to Europe, carrying 280 Mbit/s on optical repeaters.",
    about:
      "TAT-8 replaced copper coax for transatlantic voice and data, dramatically lowering per-bit cost on the backbone. It landed in New Jersey, Cornwall, and Brittany — capacity that later carried internet traffic as dial-up and leased-line users multiplied. Datacenter and CDN builders still depend on submarine fiber for cross-ocean latency and bandwidth.",
    narrative: {
      whyChosen: "TAT-8 proved fiber could cross an ocean at scale — the template for every modern submarine internet cable.",
      whyImportant: "It multiplied transatlantic capacity and helped make global internet routing economically viable.",
      problemSolved: "Copper submarine cables could not scale with exploding international telecom and data demand.",
    },
    category: "invention",
    tags: ["fiber", "networking", "internet", "infrastructure", "telecom"],
    importance: 4,
    sources: [
      {
        title: "ETHW Milestone — TAT-8 transatlantic fiber-optic cable (December 14, 1988)",
        url: "https://ethw.org/Milestones:Trans-Atlantic_Telephone_Fiber-Optic_Submarine_Cable_(TAT-8),_1988",
        role: "date",
      },
      {
        title: "Wikipedia — TAT-8 (overview)",
        url: "https://en.wikipedia.org/wiki/TAT-8",
        role: "overview",
      },
    ],
    relatedIds: ["arpanet-first-message", "tcp-ip-flag-day"],
  }),
  c({
    id: "the-world-commercial-isp-launched",
    date: "1989-11",
    datePrecision: "month",
    title: "The World: first commercial dial-up ISP",
    summary:
      "Software Tool & Die's The World began offering dial-up internet access to the public in November 1989 — the first commercial ISP with a direct connection to the internet backbone.",
    about:
      "Unlike CompuServe or AOL, The World sold shell accounts that reached the real internet — email, Usenet, FTP, and Telnet over local phone lines. Barry Shein's Boston ISP showed that individuals and small businesses could get the same TCP/IP reach researchers had on campus, for about $20 a month.",
    narrative: {
      whyChosen: "The World opened the internet to paying consumers outside academia and defense contractors.",
      whyImportant: "It established the commercial dial-up ISP model that AOL and regional providers scaled in the 1990s.",
      problemSolved: "Former students and consultants lost campus internet access and had no consumer path back onto the network.",
    },
    category: "software",
    tags: ["isp", "dial-up", "internet", "networking", "modem"],
    importance: 4,
    sources: [
      {
        title: "The World — Our history (first public ISP, November 1989)",
        url: "https://theworld.com/world/about/history/our_version",
        role: "date",
      },
      {
        title: "Wikipedia — The World (Internet service provider) (overview)",
        url: "https://en.wikipedia.org/wiki/The_World_(internet_service_provider)",
        role: "overview",
      },
    ],
    relatedIds: ["hayes-smartmodem-introduced", "tcp-ip-flag-day", "worldwideweb-browser"],
  }),
  c({
    id: "at-home-cable-internet-launched",
    date: "1996-09",
    datePrecision: "month",
    title: "@Home launches residential cable internet",
    summary:
      "The @Home Network began selling always-on cable modem internet to households in Fremont, California in September 1996 — the first commercial cable ISP rollout.",
    about:
      "@Home paired cable TV plant with Ethernet CPE and a national backbone tuned for IP — speeds far above dial-up modems. Developers could host home servers, download large SDKs, and browse the growing web without tying up a phone line. Cable operators worldwide copied the model after DOCSIS standardized modems.",
    narrative: {
      whyChosen: "@Home was the first mass-market always-on broadband service in the United States.",
      whyImportant: "It proved cable TV coax could carry consumer internet and set expectations for megabit home access.",
      problemSolved: "Dial-up could not deliver always-on, fast enough links for the multimedia web taking shape in the mid-1990s.",
    },
    category: "software",
    tags: ["broadband", "cable", "internet", "networking", "isp"],
    importance: 4,
    sources: [
      {
        title: "CNET — @Home and TCI confirm cable internet rollout (September 5, 1996)",
        url: "https://www.cnet.com/tech/mobile/cable-service-hits-home/",
        role: "date",
      },
      {
        title: "Wikipedia — @Home Network (overview)",
        url: "https://en.wikipedia.org/wiki/@Home_Network",
        role: "overview",
      },
    ],
    relatedIds: ["docsis-1-specification-released", "worldwideweb-browser"],
  }),
  c({
    id: "docsis-1-specification-released",
    date: "1997-03",
    datePrecision: "month",
    title: "DOCSIS 1.0 cable modem standard released",
    summary:
      "Cable operators and vendors finalized DOCSIS 1.0 in March 1997 — a common RF interface so cable modems and head-end gear from different vendors interoperate.",
    about:
      "DOCSIS (Data Over Cable Service Interface Specification) let Comcast, Time Warner, and others deploy millions of compatible cable modems instead of proprietary pairs. It is why you can buy a Surfboard or Netgear modem and expect it to work on many cable ISPs — and why developers could count on tens of megabits downstream to homes.",
    narrative: {
      whyChosen: "DOCSIS standardized the cable modem layer that @Home and regional cable ISPs scaled globally.",
      whyImportant: "Interoperable modems turned cable plant into a competitive broadband access market.",
      problemSolved: "Early cable internet used incompatible modem/CMTS pairs that blocked mass deployment.",
    },
    category: "protocol",
    tags: ["protocol", "cable", "broadband", "modem", "standard", "networking"],
    importance: 4,
    sources: [
      {
        title: "CableLabs — DOCSIS RF specification finalized (March 16, 1997)",
        url: "https://www.cablevision.co.cr/review/1997/0316.html",
        role: "date",
      },
      {
        title: "Wikipedia — DOCSIS (overview)",
        url: "https://en.wikipedia.org/wiki/DOCSIS",
        role: "overview",
      },
    ],
    relatedIds: ["at-home-cable-internet-launched"],
  }),
  c({
    id: "ieee-802-11-wifi-standard-approved",
    date: "1997-06-26",
    datePrecision: "day",
    title: "IEEE 802.11 Wi-Fi standard approved",
    summary:
      "The IEEE Standards Board approved IEEE 802.11-1997 on June 26, 1997 — the first wireless LAN MAC and PHY standard for 2.4 GHz radio LANs.",
    about:
      "802.11 defined how laptops, phones, and access points share airtime without cables — CSMA/CA, association, and wired-equivalent privacy hooks. Wi-Fi Alliance certification followed, and developers built mobile web, home IoT, and coffee-shop coding on cheap radio chips. Office Ethernet remained wired, but Wi-Fi became the default client access layer.",
    narrative: {
      whyChosen: "802.11 created the interoperable wireless LAN market that every laptop and phone depends on.",
      whyImportant: "It untethered computing from desk Ethernet — essential for mobile development and IoT.",
      problemSolved: "Portable computers needed LAN speeds without pulling new cable through every wall and ceiling.",
    },
    category: "protocol",
    tags: ["wifi", "wireless", "protocol", "standard", "networking", "ieee"],
    importance: 2,
    sources: [
      {
        title: "IEEE SA — 802.11-1997 (board approval June 26, 1997)",
        url: "https://standards.ieee.org/ieee/802.11/1163/",
        role: "date",
      },
      {
        title: "Wikipedia — IEEE 802.11 (overview)",
        url: "https://en.wikipedia.org/wiki/IEEE_802.11",
        role: "overview",
      },
    ],
    relatedIds: ["ethernet-invented", "esp8266-released"],
  }),
  c({
    id: "adsl-g992-standard-approved",
    date: "1999-06-22",
    datePrecision: "day",
    title: "ITU G.992.1 ADSL standard approved",
    summary:
      "ITU-T approved Recommendation G.992.1 on June 22, 1999 — the asymmetric digital subscriber line (ADSL) transceiver standard for megabit speeds over copper phone pairs.",
    about:
      "ADSL let telcos reuse existing twisted-pair plant to compete with cable — always-on downstream-heavy links for web browsing and early video. G.992.1 (G.dmt) defined how modems split voice and data on one line, enabling mass consumer DSL services and remote work outside cable-franchise cities.",
    narrative: {
      whyChosen: "G.992.1 standardized the DSL technology that brought broadband to millions of phone-line-only homes.",
      whyImportant: "It gave developers a second mass-market always-on access path beside cable DOCSIS.",
      problemSolved: "Telephone incumbents needed a standards-based way to offer internet without replacing every copper loop.",
    },
    category: "protocol",
    tags: ["adsl", "dsl", "broadband", "protocol", "standard", "networking", "telecom"],
    importance: 4,
    sources: [
      {
        title: "ITU-T — Recommendation G.992.1 (approved June 22, 1999)",
        url: "https://www.itu.int/rec/T-REC-G.992.1-199907-I",
        role: "date",
      },
      {
        title: "Wikipedia — Asymmetric digital subscriber line (overview)",
        url: "https://en.wikipedia.org/wiki/Asymmetric_digital_subscriber_line",
        role: "overview",
      },
    ],
    relatedIds: ["docsis-1-specification-released", "at-home-cable-internet-launched"],
  }),
  c({
    id: "umts-3g-commercial-launched",
    date: "2001-10-01",
    datePrecision: "day",
    title: "NTT DoCoMo launches commercial 3G (FOMA)",
    summary:
      "NTT DoCoMo launched commercial FOMA 3G service in Tokyo on October 1, 2001 — the world's first wide-scale W-CDMA mobile data network.",
    about:
      "FOMA delivered packet data at hundreds of kilobits per second — enough for mobile email, early video calls, and i-mode-style apps on the move. It set the template for 3GPP UMTS networks worldwide and pushed handset vendors to build data-first radios. Mobile developers could finally target cellular bandwidth beyond GSM trickle speeds.",
    narrative: {
      whyChosen: "FOMA was the first commercial third-generation mobile network at scale.",
      whyImportant: "It proved cellular could carry multimedia data, paving the way for smartphone app ecosystems.",
      problemSolved: "2G networks were voice-centric; mobile services needed dedicated wideband packet capacity.",
    },
    category: "protocol",
    tags: ["3g", "cellular", "mobile", "networking", "wireless", "telecom"],
    importance: 3,
    sources: [
      {
        title: "NTT DOCOMO — History (FOMA commercial launch October 2001)",
        url: "https://www.docomo.ne.jp/english/corporate/about/outline/history/",
        role: "date",
      },
      {
        title: "ITU News — NTT DoCoMo FOMA commercial launch (overview)",
        url: "https://www.itu.int/itunews/issue/2001/08/licensing3g.html",
        role: "overview",
      },
    ],
    relatedIds: ["iphone-goes-on-sale", "lte-commercial-launched"],
  }),
  c({
    id: "lte-commercial-launched",
    date: "2009-12-14",
    datePrecision: "day",
    title: "First commercial LTE networks launch",
    summary:
      "TeliaSonera turned on commercial LTE service in Stockholm and Oslo on December 14, 2009 — the first operator deployment marketed as 4G mobile broadband.",
    about:
      "LTE replaced circuit-switched voice assumptions with an all-IP radio optimized for data — tens of megabits to phones and LTE dongles. Developers built streaming video, real-time maps, and push notifications assuming LTE-class latency and throughput. Verizon and others followed within months, making mobile APIs practical for everyday apps.",
    narrative: {
      whyChosen: "TeliaSonera's LTE launch was the first commercial 4G data network operators could sell to the public.",
      whyImportant: "LTE made mobile broadband fast enough to treat phones as primary internet devices.",
      problemSolved: "3G capacity and latency could not support HD video and always-on cloud sync at scale.",
    },
    category: "protocol",
    tags: ["lte", "4g", "cellular", "mobile", "networking", "wireless"],
    importance: 3,
    sources: [
      {
        title: "Telia Company — First commercial 4G/LTE services (December 14, 2009)",
        url: "https://www.teliacompany.com/en/press-releases/teliasonera-first-in-world-with-4g-services-2009-12-14-06-30-00",
        role: "date",
      },
      {
        title: "Wikipedia — LTE (overview)",
        url: "https://en.wikipedia.org/wiki/LTE_(telecommunication)",
        role: "overview",
      },
    ],
    relatedIds: ["umts-3g-commercial-launched", "5g-nr-commercial-launched"],
  }),
  c({
    id: "5g-nr-commercial-launched",
    date: "2019-04-05",
    datePrecision: "day",
    title: "South Korea launches commercial 5G NR",
    summary:
      "South Korean carriers opened commercial 5G NR service nationwide on April 5, 2019 — the first large-scale rollout of fifth-generation cellular data.",
    about:
      "5G NR targets gigabit-class peak speeds, lower latency, and denser small-cell deployment — assumptions behind cloud gaming on phones, AR prototypes, and edge compute experiments. SK Telecom, KT, and LG Uplus beat rival launch clocks by days, but the lasting impact is a new radio generation developers benchmark against for real-time mobile apps.",
    narrative: {
      whyChosen: "South Korea's April 2019 launch was the first nationwide commercial 5G NR deployment.",
      whyImportant: "It marked the cellular generation built for machine-to-machine and high-bandwidth mobile workloads.",
      problemSolved: "LTE alone could not meet projected demand for ultra-low latency and multi-gigabit mobile traffic.",
    },
    category: "protocol",
    tags: ["5g", "cellular", "mobile", "networking", "wireless", "telecom"],
    importance: 4,
    sources: [
      {
        title: "Reuters — South Korea rolls out 5G services (April 3–5, 2019)",
        url: "https://www.reuters.com/article/business/skorea-first-to-roll-out-5g-services-beating-us-and-china-idUSL3N21K114/",
        role: "date",
      },
      {
        title: "Wikipedia — 5G (overview)",
        url: "https://en.wikipedia.org/wiki/5G",
        role: "overview",
      },
    ],
    relatedIds: ["lte-commercial-launched"],
  }),
  c({
    id: "starlink-public-beta-launched",
    date: "2020-10-26",
    datePrecision: "day",
    title: "Starlink opens public beta",
    summary:
      "SpaceX invited early subscribers to its \"Better Than Nothing Beta\" on October 26, 2020 — the first public consumer satellite broadband service using a LEO constellation.",
    about:
      "Starlink ships a user terminal and Wi-Fi router that talks to hundreds of low-Earth-orbit satellites — targeting rural and mobile users where fiber and LTE are weak. Developers testing offline-tolerant apps, high-latency links, and global field deployments gained a new real-world network profile beyond terrestrial ISPs.",
    narrative: {
      whyChosen: "Starlink's public beta made consumer satellite internet a shipping product, not a defense-only niche.",
      whyImportant: "It added a third access architecture (LEO satellite) beside cable, DSL, and terrestrial cellular.",
      problemSolved: "Rural homes and mobile workers lacked affordable broadband with usable latency for modern web apps.",
    },
    category: "software",
    tags: ["satellite", "starlink", "broadband", "internet", "networking", "spacex"],
    importance: 4,
    sources: [
      {
        title: "CNBC — Starlink Better Than Nothing Beta begins (October 27, 2020)",
        url: "https://www.cnbc.com/2020/10/27/spacex-starlink-service-priced-at-99-a-month-public-beta-test-begins.html",
        role: "date",
      },
      {
        title: "Wikipedia — Starlink (overview)",
        url: "https://en.wikipedia.org/wiki/Starlink",
        role: "overview",
      },
    ],
    relatedIds: ["lte-commercial-launched", "mqtt-invented"],
  }),
];
