#!/usr/bin/env python3
"""Seed flagship smartphone events into the timeline."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TIMELINE = ROOT / "content/timeline"

# Skip IDs already in the timeline (canonical first-gen / existing entries)
SKIP_IDS = {
    "iphone-goes-on-sale",
    "iphone-3g-released",
    "iphone-4-released",
    "samsung-galaxy-s-released",
    "nokia-9000-communicator-released",
    "blackberry-5810-released",
    "t-mobile-g1-released",
}


@dataclass(frozen=True)
class Device:
    id: str
    date: str
    title: str
    summary: str
    about: str
    why_chosen: str
    why_important: str
    problem_solved: str
    importance: int
    tags: tuple[str, ...]
    company_id: str
    company_name: str
    wiki: str
    date_url: str
    line: str  # for chaining relatedIds


def d(
    line: str,
    slug: str,
    date: str,
    title: str,
    summary: str,
    about: str,
    why_chosen: str,
    why_important: str,
    problem_solved: str,
    importance: int,
    tags: tuple[str, ...],
    company: tuple[str, str],
    wiki: str,
    date_url: str,
) -> Device:
    legacy_importance = {1: 3, 2: 6, 3: 9}
    mapped_importance = legacy_importance.get(importance, importance)
    return Device(
        id=slug,
        date=date,
        title=title,
        summary=summary,
        about=about,
        why_chosen=why_chosen,
        why_important=why_important,
        problem_solved=problem_solved,
        importance=mapped_importance,
        tags=tags,
        company_id=company[0],
        company_name=company[1],
        wiki=wiki,
        date_url=date_url,
        line=line,
    )


APPLE = ("apple", "Apple")
SAMSUNG = ("samsung", "Samsung")
NOKIA = ("nokia", "Nokia")
BLACKBERRY = ("blackberry", "BlackBerry")
GOOGLE = ("google", "Google")
HTC = ("htc", "HTC")
ONEPLUS = ("oneplus", "OnePlus")
MOTOROLA = ("motorola", "Motorola")

IPHONE_TAGS = ("hardware", "mobile", "smartphone", "apple", "iphone")
GALAXY_S_TAGS = ("hardware", "mobile", "smartphone", "samsung", "galaxy", "android")
GALAXY_NOTE_TAGS = ("hardware", "mobile", "smartphone", "samsung", "galaxy-note", "android")
GALAXY_Z_TAGS = ("hardware", "mobile", "smartphone", "samsung", "galaxy-z", "android")
NOKIA_TAGS = ("hardware", "mobile", "smartphone", "nokia")
BB_TAGS = ("hardware", "mobile", "smartphone", "blackberry")
PIXEL_TAGS = ("hardware", "mobile", "smartphone", "google", "android", "pixel")
NEXUS_TAGS = ("hardware", "mobile", "smartphone", "google", "android", "nexus")

DEVICES: list[Device] = [
    # --- iPhone ---
    d("iphone", "iphone-3gs-released", "2009-06-19", "iPhone 3GS released",
      "Apple began selling the iPhone 3GS on June 19, 2009 — adding a faster processor, video recording, and voice control.",
      "The 3GS refined the iPhone platform with substantially better performance and a 3-megapixel video camera. Developers gained headroom for richer games and media apps while mobile Safari improved with better JavaScript performance.",
      "The 3GS proved Apple's 'S' year could deliver meaningful speed and camera upgrades without a redesign.",
      "Faster hardware made native iOS apps feel responsive enough for console-style games and video workflows.",
      "Early iPhones struggled with sluggish UI and limited multimedia capture for mainstream users.",
      3, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_3GS",
      "https://www.apple.com/newsroom/2009/06/08iPhone-3GS-Available-in-US-on-June-19/"),
    d("iphone", "iphone-4s-released", "2011-10-14", "iPhone 4S released",
      "Apple released the iPhone 4S on October 14, 2011 — introducing Siri and the A5 chip in the iPhone 4 body.",
      "Siri brought voice-driven assistants to mainstream smartphones and gave developers a speech API path through iOS integration. The 4S also shipped an 8 MP camera that raised mobile photography expectations for app developers building camera workflows.",
      "The 4S launched Siri — the assistant that pushed every platform to add voice interfaces.",
      "Voice control and better cameras expanded what mobile apps could assume about device capabilities.",
      "Smartphones lacked credible on-device voice assistants integrated with third-party services.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_4S",
      "https://www.apple.com/newsroom/2011/10/04iPhone-4S-Pre-Orders-Top-One-Million-in-First-24-Hours/"),
    d("iphone", "iphone-5-released", "2012-09-21", "iPhone 5 released",
      "Apple began selling the iPhone 5 on September 21, 2012 — taller 4-inch display, LTE, and the Lightning connector.",
      "Lightning replaced the 30-pin dock connector — forcing accessory and hardware accessory developers to redesign. The taller screen broke the fixed 320×480 pt layout assumptions early iOS apps relied on, pushing Auto Layout adoption.",
      "The iPhone 5 changed the iOS screen shape and connector standard overnight.",
      "LTE and a new aspect ratio reshaped mobile layout and peripheral ecosystems.",
      "Developers designed for a square-ish 3.5-inch canvas and a decade-old dock standard.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_5",
      "https://www.apple.com/newsroom/2012/09/17iPhone-5-First-Weekend-Sales-Top-Five-Million/"),
    d("iphone", "iphone-5s-released", "2013-09-20", "iPhone 5S released",
      "Apple released the iPhone 5S on September 20, 2013 — debuting Touch ID fingerprint authentication and the 64-bit A7 chip.",
      "Touch ID enabled secure app login and Apple Pay foundations; the A7 made 64-bit ARM mainstream and pushed Android OEMs to match. Developers gained LocalAuthentication APIs and a performance ceiling for AR and graphics-heavy apps years earlier than expected.",
      "The 5S made biometrics and 64-bit mobile CPUs standard expectations.",
      "Fingerprint auth and 64-bit chips changed security and performance baselines for mobile dev.",
      "Phone unlock and payment auth relied on PINs; mobile CPUs were still treated as 32-bit platforms.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_5S",
      "https://www.apple.com/newsroom/2013/09/23iPhone-5s-and-iPhone-5c-First-Weekend-Sales-Top-Nine-Million/"),
    d("iphone", "iphone-5c-released", "2013-09-20", "iPhone 5C released",
      "Apple shipped the colorful iPhone 5C alongside the 5S on September 20, 2013 — a plastic-bodied model targeting mid-tier buyers.",
      "The 5C expanded iOS reach with a lower price point while running the same iOS 7 stack developers already targeted. It showed Apple would segment hardware without fragmenting the software platform.",
      "The 5C tested whether Apple could sell a colorful mid-range iPhone without splitting the developer stack.",
      "One iOS target across premium and mid-tier hardware simplified mobile development.",
      "Premium-only iPhones limited iOS audience growth in price-sensitive markets.",
      3, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_5C",
      "https://www.apple.com/newsroom/2013/09/23iPhone-5s-and-iPhone-5c-First-Weekend-Sales-Top-Nine-Million/"),
    d("iphone", "iphone-6-released", "2014-09-19", "iPhone 6 released",
      "Apple began selling the iPhone 6 on September 19, 2014 — jumping to 4.7-inch and 5.5-inch screens after years of 4-inch phones.",
      "Larger iPhones forced responsive layouts and adaptive UI across iOS apps. Reachability, size classes, and split-screen iPad multitasking later built on the bigger canvas the iPhone 6 normalized for mainstream users.",
      "The iPhone 6 ended Apple's small-phone era and mainstreamed large-screen mobile design.",
      "Bigger screens changed touch targets, typography, and how developers layout iOS interfaces.",
      "Four-inch phones cramped content apps; Android phablets were pulling users away.",
      1, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_6",
      "https://www.apple.com/newsroom/2014/09/22First-Weekend-iPhone-Sales-Top-10-Million/"),
    d("iphone", "iphone-6-plus-released", "2014-09-19", "iPhone 6 Plus released",
      "Apple launched the iPhone 6 Plus on September 19, 2014 — a 5.5-inch phablet with optical image stabilization.",
      "The Plus legitimized phablets for Western markets and gave developers a 'regular' vs 'plus' size class split that persists in iOS layout APIs. Landscape apps and split views became viable on a phone form factor.",
      "The 6 Plus made phablets a first-class iOS form factor, not an Android oddity.",
      "Two iPhone size classes became a permanent constraint for iOS UI design.",
      "Large-screen power users chose Android phablets because Apple offered no equivalent.",
      1, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_6_Plus",
      "https://www.apple.com/newsroom/2014/09/22First-Weekend-iPhone-Sales-Top-10-Million/"),
    d("iphone", "iphone-6s-released", "2015-09-25", "iPhone 6S released",
      "Apple released the iPhone 6S on September 25, 2015 — adding 3D Touch pressure sensitivity and Live Photos.",
      "3D Touch introduced peek-and-pop interactions and quick actions — a short-lived but influential pressure UI layer. Developers experimented with context menus before long-press and haptics replaced most use cases.",
      "The 6S introduced pressure-sensitive input as an iOS developer surface.",
      "3D Touch APIs let apps expose preview and shortcut interactions from the home screen and in-app.",
      "Touch UIs lacked a middle ground between tap and long-press for previews.",
      3, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_6S",
      "https://www.apple.com/newsroom/2015/09/28iPhone-6s-6s-Plus-Available-in-More-Than-40-Countries/"),
    d("iphone", "iphone-se-released", "2016-03-31", "iPhone SE (1st gen) released",
      "Apple began selling the first iPhone SE on March 31, 2016 — packing iPhone 6S internals into the compact iPhone 5 body.",
      "The SE kept a 4-inch screen alive for developers who still tested small-size-class layouts. It also offered a lower entry price for markets and users who wanted modern iOS without phablet dimensions.",
      "The SE proved Apple would ship a modern small iPhone for holdouts and budget buyers.",
      "A compact iOS device kept small-screen layout testing relevant for developers.",
      "Users who wanted a small phone had to buy aging hardware or switch platforms.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_SE_(1st_generation)",
      "https://www.apple.com/newsroom/2016/03/21Apple-Introduces-iPhone-SE-The-Most-Powerful-Phone-with-a-Four-inch-Display/"),
    d("iphone", "iphone-7-released", "2016-09-16", "iPhone 7 released",
      "Apple released the iPhone 7 on September 16, 2016 — removing the headphone jack and adding water resistance and stereo speakers.",
      "Dropping the 3.5 mm jack pushed developers and accessory makers toward Bluetooth audio and Lightning adapters — a controversial port transition that foreshadowed wireless-first mobile design.",
      "The iPhone 7 forced the mobile ecosystem toward wireless audio.",
      "Removing the headphone jack changed how apps and hardware handled audio routing.",
      "Wired headphones were universal; phones needed better water resistance without port compromises.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_7",
      "https://www.apple.com/newsroom/2016/09/07iPhone-7-and-iPhone-7-Plus-A-New-Generation-of-iPhone/"),
    d("iphone", "iphone-8-released", "2017-09-22", "iPhone 8 released",
      "Apple began selling the iPhone 8 on September 22, 2017 — adding wireless charging and the A11 Bionic chip in a familiar design.",
      "The iPhone 8 refined the classic home-button iPhone while Apple bet the design future on iPhone X. Developers still targeted iPhone 8 class hardware as the conservative baseline through 2018.",
      "The iPhone 8 was the last iteration of the classic Touch ID iPhone form.",
      "Wireless charging and A11 performance kept a familiar target for iOS developers during the X transition.",
      "Users wanted wireless charging without giving up the established home-button UX.",
      3, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_8",
      "https://www.apple.com/newsroom/2017/09/12iPhone-8-and-iPhone-8-Plus-Redesigned-Glass-and-Aluminum-Design/"),
    d("iphone", "iphone-x-released", "2017-11-03", "iPhone X released",
      "Apple began selling the iPhone X on November 3, 2017 — Face ID, an edge-to-edge OLED display, and the notch.",
      "The X eliminated the home button and introduced safe areas — every iOS app had to adapt layouts for the notch and gesture navigation. Face ID APIs replaced Touch ID for secure auth in a generation of flagship apps.",
      "The iPhone X redefined iOS layout with the notch, gestures, and Face ID.",
      "Safe-area insets and facial authentication became mandatory considerations for iOS developers.",
      "Bezels and home buttons dominated phone design; secure face unlock was not mainstream.",
      1, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_X",
      "https://www.apple.com/newsroom/2017/09/12iPhone-X-The-Future-of-the-Smartphone/"),
    d("iphone", "iphone-xr-released", "2018-10-26", "iPhone XR released",
      "Apple released the iPhone XR on October 26, 2018 — a lower-cost LCD model with Face ID and the A12 chip.",
      "The XR brought notch-era design to a mass price point with a single camera and LCD display. Developers treated it as the volume iPhone for testing Face ID layouts without assuming OLED or telephoto hardware.",
      "The XR spread Face ID and notch layouts to Apple's best-selling price tier.",
      "A single affordable Face ID phone simplified the mainstream iOS test matrix.",
      "Notch-era iOS design was limited to expensive OLED models.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_XR",
      "https://www.apple.com/newsroom/2018/09/12iPhone-xr-comes-in-five-stunning-new-finishes/"),
    d("iphone", "iphone-xs-released", "2018-09-21", "iPhone XS released",
      "Apple began selling the iPhone XS on September 21, 2018 — refining the iPhone X with the A12 Bionic and improved cameras.",
      "The XS established the annual 'pro' tier cadence with better neural engine performance for Core ML and computational photography APIs developers could leverage in camera and AR apps.",
      "The XS iterated the premium iPhone template with a much faster neural engine.",
      "On-device ML performance became a realistic baseline for iOS camera and AR apps.",
      "Premium iPhones needed better ML silicon for real-time vision workloads.",
      3, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_XS",
      "https://www.apple.com/newsroom/2018/09/12iPhone-xs-and-iphone-xs-max-the-best-and-biggest-displays-in-iphone-history/"),
    d("iphone", "iphone-11-released", "2019-09-20", "iPhone 11 released",
      "Apple released the iPhone 11 line on September 20, 2019 — dual cameras on the base model and Night mode computational photography.",
      "Night mode and ultra-wide lenses made multi-camera assumptions standard even on non-Pro iPhones. Developers building AR and vision features could expect depth and wide-angle hardware on the mainstream model.",
      "The iPhone 11 made multi-camera computational photography the default iOS baseline.",
      "Night mode and ultra-wide sensors expanded what camera apps could assume on base iPhones.",
      "Low-light mobile photography required third-party hacks or Pro-tier hardware.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_11",
      "https://www.apple.com/newsroom/2019/09/10apple-introduces-dual-camera-iphone-11/"),
    d("iphone", "iphone-12-released", "2020-10-23", "iPhone 12 released",
      "Apple began selling the iPhone 12 on October 23, 2020 — 5G, flat-edge design, and MagSafe accessories.",
      "5G connectivity changed how developers thought about mobile bandwidth; MagSafe created a new accessory and charging API ecosystem. The flat design returned to a form factor reminiscent of iPhone 4/5 industrial design.",
      "The iPhone 12 brought 5G and MagSafe to the mainstream iPhone line.",
      "5G and magnetic accessory attachment opened new mobile hardware interaction patterns.",
      "iPhones lacked 5G radios; wireless charging alignment was finicky without magnets.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_12",
      "https://www.apple.com/newsroom/2020/10/apple-announces-iphone-12-and-iphone-12-mini-a-new-era-for-iphone/"),
    d("iphone", "iphone-13-released", "2021-09-24", "iPhone 13 released",
      "Apple released the iPhone 13 on September 24, 2021 — improved battery life, smaller notch, and Cinematic mode video.",
      "Incremental gains in battery and video APIs kept iOS as the reference for mobile cinematography apps. The smaller notch slightly adjusted safe-area metrics developers had to handle.",
      "The iPhone 13 refined the 5G iPhone with major battery and video upgrades.",
      "Cinematic mode showed computational video could be a default camera feature.",
      "All-day battery and pro-style video required Pro-tier hardware or third-party apps.",
      3, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_13",
      "https://www.apple.com/newsroom/2021/09/14apple-introduces-iphone-13-and-iphone-13-mini/"),
    d("iphone", "iphone-14-released", "2022-09-16", "iPhone 14 released",
      "Apple began selling the iPhone 14 on September 16, 2022 — satellite emergency SOS and crash detection on Pro models, USB standards pressure building.",
      "The 14 Pro introduced Dynamic Island — a live activity surface developers could target for persistent status UI. Emergency satellite features showed phones as safety devices beyond apps.",
      "The iPhone 14 Pro's Dynamic Island created a new live UI surface for developers.",
      "Dynamic Island APIs extended how apps show ongoing status around the camera cutout.",
      "Persistent status UI was trapped in notifications or in-app chrome.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_14",
      "https://www.apple.com/newsroom/2022/09/07apple-introduces-iphone-14-and-iphone-14-plus/"),
    d("iphone", "iphone-15-released", "2023-09-22", "iPhone 15 released",
      "Apple released the iPhone 15 on September 22, 2023 — USB-C on all models and the A16/A17 Pro split across tiers.",
      "USB-C ended the Lightning era for iPhone peripherals — one cable for iPad, Mac, and iPhone simplified hardware accessory development. The 15 Pro's A17 Pro emphasized console-grade mobile gaming.",
      "The iPhone 15 switched the entire iPhone line to USB-C.",
      "A universal USB-C port aligned iPhone with the rest of Apple's and Android's hardware ecosystem.",
      "Developers and users juggled Lightning and USB-C cables across Apple devices.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_15",
      "https://www.apple.com/newsroom/2023/09/12apple-unveils-iphone-15-and-iphone-15-plus/"),
    d("iphone", "iphone-16-released", "2024-09-20", "iPhone 16 released",
      "Apple began selling the iPhone 16 on September 20, 2024 — Camera Control button and Apple Intelligence integration.",
      "The Camera Control button added a dedicated hardware input for camera and future app actions. Apple Intelligence brought on-device LLM features that iOS developers began integrating through new system APIs.",
      "The iPhone 16 paired a new hardware button with Apple's on-device AI push.",
      "Camera Control and Apple Intelligence APIs expanded how apps integrate with system AI and capture.",
      "Mobile AI features were mostly cloud-dependent; camera access lacked dedicated hardware.",
      2, IPHONE_TAGS, APPLE, "https://en.wikipedia.org/wiki/IPhone_16",
      "https://www.apple.com/newsroom/2024/09/09apple-introduces-iphone-16-and-iphone-16-plus/"),
]

# Append Samsung, Nokia, BlackBerry, Google, others in continuation...
# Due to length, I'll add them in the script via extend()

def galaxy_s_devices() -> list[Device]:
    models = [
        ("samsung-galaxy-s2-released", "2011-05-27", "Samsung Galaxy S II released", 2,
         "dual-core Exynos and a slimmer design made it the Android benchmark of 2011.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S_II"),
        ("samsung-galaxy-s3-released", "2012-05-29", "Samsung Galaxy S III released", 2,
         "4.8-inch HD Super AMOLED and Smart Stay — Samsung's breakout global Android flagship.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S_III"),
        ("samsung-galaxy-s4-released", "2013-04-27", "Samsung Galaxy S4 released", 2,
         "1080p five-inch display and eye-tracking features — peak TouchWiz era dominance.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S4"),
        ("samsung-galaxy-s5-released", "2014-04-11", "Samsung Galaxy S5 released", 3,
         "water resistance and a fingerprint sensor in a plastic flagship body.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S5"),
        ("samsung-galaxy-s6-released", "2015-04-10", "Samsung Galaxy S6 released", 2,
         "glass-and-metal redesign dropped removable battery for premium build quality.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S6"),
        ("samsung-galaxy-s7-released", "2016-03-11", "Samsung Galaxy S7 released", 3,
         "refined waterproof design and microSD return — solid iterative flagship.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S7"),
        ("samsung-galaxy-s8-released", "2017-04-21", "Samsung Galaxy S8 released", 2,
         "Infinity Display with 18.5:9 aspect ratio and Bixby — bezel-less Android reference.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S8"),
        ("samsung-galaxy-s9-released", "2018-03-16", "Samsung Galaxy S9 released", 3,
         "variable aperture camera and AR Emoji — iterative S-line update.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S9"),
        ("samsung-galaxy-s10-released", "2019-03-08", "Samsung Galaxy S10 released", 2,
         "hole-punch display, ultrasonic fingerprint, and three-model lineup including S10e.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S10"),
        ("samsung-galaxy-s20-released", "2020-03-06", "Samsung Galaxy S20 released", 2,
         "120 Hz displays and 5G across the line — COVID-era flagship launch.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S20"),
        ("samsung-galaxy-s21-released", "2021-01-29", "Samsung Galaxy S21 released", 3,
         "Snapdragon 888/Exynos 2100 and Contour Cut camera housing.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S21"),
        ("samsung-galaxy-s22-released", "2022-02-25", "Samsung Galaxy S22 released", 3,
         "smaller S22 brought flagship specs to a compact Android form factor.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S22"),
        ("samsung-galaxy-s23-released", "2023-02-17", "Samsung Galaxy S23 released", 3,
         "Snapdragon 8 Gen 2 globally — refined efficiency-focused flagship.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S23"),
        ("samsung-galaxy-s24-released", "2024-01-31", "Samsung Galaxy S24 released", 2,
         "Galaxy AI on-device features integrated across the S24 line.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S24"),
        ("samsung-galaxy-s25-released", "2025-02-07", "Samsung Galaxy S25 released", 3,
         "Snapdragon 8 Elite and expanded Galaxy AI — annual flagship refresh.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25"),
    ]
    out = []
    for slug, date, title, imp, hook, wiki in models:
        out.append(d(
            "galaxy-s", slug, date, title,
            f"Samsung began selling the {title.replace(' released', '')} — {hook}",
            f"The Galaxy S series remained Android's volume flagship counterweight to iPhone. {hook.capitalize()} Developers testing Android builds routinely validated on Galaxy S hardware as the default non-Pixel reference.",
            f"The {title.split(' released')[0]} continued Samsung's annual Android flagship cadence.",
            "Galaxy S devices set the hardware bar millions of Android users and developers encounter.",
            "Android needed consistent premium hardware for testing flagship features each year.",
            imp, GALAXY_S_TAGS, SAMSUNG, wiki,
            wiki,
        ))
    return out


def galaxy_note_devices() -> list[Device]:
    models = [
        ("samsung-galaxy-note-released", "2011-10-29", "Samsung Galaxy Note released", 1,
         "5.3-inch display and S Pen stylus created the phablet category.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_(original)"),
        ("samsung-galaxy-note-2-released", "2012-09-26", "Samsung Galaxy Note II released", 2,
         "larger 5.5-inch screen and split-screen multitasking on Android.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_II"),
        ("samsung-galaxy-note-3-released", "2013-09-25", "Samsung Galaxy Note 3 released", 2,
         "1080p display and USB 3.0 — productivity-focused phablet peak.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_3"),
        ("samsung-galaxy-note-4-released", "2014-10-17", "Samsung Galaxy Note 4 released", 3,
         "QHD display and improved S Pen latency for note-taking apps.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_4"),
        ("samsung-galaxy-note-5-released", "2015-08-21", "Samsung Galaxy Note 5 released", 3,
         "glass unibody design — dropped microSD in favor of premium build.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_5"),
        ("samsung-galaxy-note-7-released", "2016-08-19", "Samsung Galaxy Note 7 released", 2,
         "iris scanner and curved display — recalled worldwide for battery defects.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_7"),
        ("samsung-galaxy-note-8-released", "2017-09-15", "Samsung Galaxy Note 8 released", 2,
         "dual cameras and S Pen after the Note 7 recall recovery.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_8"),
        ("samsung-galaxy-note-9-released", "2018-08-24", "Samsung Galaxy Note 9 released", 3,
         "Bluetooth S Pen and 4000 mAh battery — iterative Note update.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_9"),
        ("samsung-galaxy-note-10-released", "2019-08-23", "Samsung Galaxy Note 10 released", 2,
         "center punch-hole and removed headphone jack from the Note line.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_10"),
        ("samsung-galaxy-note-20-released", "2020-08-21", "Samsung Galaxy Note 20 released", 3,
         "final Galaxy Note generation before Ultra absorbed the stylus line.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_20"),
    ]
    out = []
    for slug, date, title, imp, hook, wiki in models:
        out.append(d(
            "galaxy-note", slug, date, title,
            f"Samsung released the {title.replace(' released', '')} — {hook}",
            f"The Galaxy Note targeted stylus power users on Android. {hook.capitalize()} Note apps and split-screen Android development often targeted this hardware class.",
            f"The {title.split(' released')[0]} advanced Samsung's stylus phablet line.",
            "Galaxy Note hardware defined large-screen Android productivity for years.",
            "Android lacked a premium large-screen stylus flagship for note-taking workflows.",
            imp, GALAXY_NOTE_TAGS, SAMSUNG, wiki, wiki,
        ))
    return out


def galaxy_z_devices() -> list[Device]:
    models = [
        ("samsung-galaxy-fold-released", "2019-09-06", "Samsung Galaxy Fold released", 1,
         "first mainstream foldable smartphone — 7.3-inch unfolded tablet phone.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Fold"),
        ("samsung-galaxy-z-flip-released", "2020-02-14", "Samsung Galaxy Z Flip released", 2,
         "clamshell foldable with a small outer display — new form factor for Android.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Flip"),
        ("samsung-galaxy-z-fold-2-released", "2020-09-18", "Samsung Galaxy Z Fold 2 released", 2,
         "refined hinge and larger cover display — foldables became more durable.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold_2"),
        ("samsung-galaxy-z-fold-3-released", "2021-08-27", "Samsung Galaxy Z Fold 3 released", 3,
         "S Pen support and IPX8 water resistance on a foldable.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold_3"),
        ("samsung-galaxy-z-fold-4-released", "2022-08-26", "Samsung Galaxy Z Fold 4 released", 3,
         "Snapdragon 8+ Gen 1 and improved multitasking on foldables.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold_4"),
        ("samsung-galaxy-z-fold-5-released", "2023-08-11", "Samsung Galaxy Z Fold 5 released", 3,
         "gapless hinge design and lighter chassis.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold_5"),
        ("samsung-galaxy-z-fold-6-released", "2024-07-24", "Samsung Galaxy Z Fold 6 released", 3,
         "Galaxy AI features on Samsung's flagship foldable line.",
         "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold_6"),
    ]
    out = []
    for slug, date, title, imp, hook, wiki in models:
        out.append(d(
            "galaxy-z", slug, date, title,
            f"Samsung began selling the {title.replace(' released', '')} — {hook}",
            f"Foldables forced Android developers to handle resizable and multi-window layouts on flexible displays. {hook.capitalize()}",
            f"The {title.split(' released')[0]} pushed foldable Android hardware into the mainstream.",
            "Foldable form factors require adaptive UI patterns beyond fixed phone screens.",
            "Phones were locked to a single rigid screen size and aspect ratio.",
            imp, GALAXY_Z_TAGS, SAMSUNG, wiki, wiki,
        ))
    return out


def nokia_devices() -> list[Device]:
    models = [
        ("nokia-9210-communicator-released", "2000-11", "Nokia 9210 Communicator released", 3,
         "color screen Symbian Communicator with fold-out QWERTY keyboard.", "month",
         "https://en.wikipedia.org/wiki/Nokia_9210_Communicator"),
        ("nokia-n95-released", "2007-03-23", "Nokia N95 released", 2,
         "5 MP camera and GPS — Symbian smartphone peak before iPhone.", "day",
         "https://en.wikipedia.org/wiki/Nokia_N95"),
        ("nokia-n97-released", "2009-06-26", "Nokia N97 released", 3,
         "touchscreen Symbian with slide-out keyboard — late Symbian flagship.", "day",
         "https://en.wikipedia.org/wiki/Nokia_N97"),
        ("nokia-lumia-800-released", "2011-11-11", "Nokia Lumia 800 released", 2,
         "first Nokia Windows Phone — Mango-era Metro UI hardware.", "day",
         "https://en.wikipedia.org/wiki/Nokia_Lumia_800"),
        ("nokia-lumia-920-released", "2012-11-02", "Nokia Lumia 920 released", 2,
         "wireless charging and PureView camera on Windows Phone 8.", "day",
         "https://en.wikipedia.org/wiki/Nokia_Lumia_920"),
        ("nokia-lumia-1020-released", "2013-07-26", "Nokia Lumia 1020 released", 3,
         "41 MP PureView camera — photography-focused Windows Phone.", "day",
         "https://en.wikipedia.org/wiki/Nokia_Lumia_1020"),
        ("nokia-lumia-1520-released", "2013-11-15", "Nokia Lumia 1520 released", 3,
         "6-inch phablet Windows Phone with 1080p display.", "day",
         "https://en.wikipedia.org/wiki/Nokia_Lumia_1520"),
    ]
    out = []
    for row in models:
        slug, date, title, imp, hook = row[0], row[1], row[2], row[3], row[4]
        precision = row[5] if len(row) > 6 else "day"
        wiki = row[-1]
        out.append(d(
            "nokia", slug, date, title,
            f"Nokia released the {title.replace(' released', '')} — {hook}",
            f"Nokia hardware shaped pre-iPhone smartphones and later Microsoft's mobile platform bet. {hook.capitalize()}",
            f"The {title.split(' released')[0]} was a flagship Nokia smartphone milestone.",
            "Nokia devices defined mobile platforms from Symbian through Windows Phone.",
            "Mobile users needed capable smartphones before the iPhone/Android era matured.",
            imp, NOKIA_TAGS, NOKIA, wiki, wiki,
        ))
    return out


def blackberry_devices() -> list[Device]:
    models = [
        ("blackberry-7290-released", "2004", "BlackBerry 7290 released", 3,
         "Bluetooth and color screen enterprise BlackBerry.", "year",
         "https://en.wikipedia.org/wiki/BlackBerry_7290"),
        ("blackberry-pearl-released", "2006-09-12", "BlackBerry Pearl released", 2,
         "consumer-focused BlackBerry with trackball and camera.", "day",
         "https://en.wikipedia.org/wiki/BlackBerry_Pearl"),
        ("blackberry-bold-9000-released", "2008-05-12", "BlackBerry Bold 9000 released", 2,
         "premium QWERTY BlackBerry that defined the late-2000s enterprise icon.", "day",
         "https://en.wikipedia.org/wiki/BlackBerry_Bold"),
        ("blackberry-torch-released", "2010-08-12", "BlackBerry Torch released", 3,
         "slider phone mixing touch and keyboard on BlackBerry OS 6.", "day",
         "https://en.wikipedia.org/wiki/BlackBerry_Torch"),
        ("blackberry-z10-released", "2013-01-31", "BlackBerry Z10 released", 2,
         "first BlackBerry 10 full-touch flagship — post-iPhone reboot attempt.", "day",
         "https://en.wikipedia.org/wiki/BlackBerry_Z10"),
        ("blackberry-key2-released", "2018-06-07", "BlackBerry Key2 released", 3,
         "Android-powered QWERTY phone from TCL — final BB keyboard flagship.", "day",
         "https://en.wikipedia.org/wiki/BlackBerry_Key2"),
    ]
    out = []
    for row in models:
        slug, date, title, imp, hook = row[0], row[1], row[2], row[3], row[4]
        wiki = row[-1]
        out.append(d(
            "blackberry", slug, date, title,
            f"BlackBerry released the {title.replace(' released', '')} — {hook}",
            f"BlackBerry dominated enterprise mobile before iPhone and Android. {hook.capitalize()} BES-connected apps and push email defined mobile workflows for years.",
            f"The {title.split(' released')[0]} was a key BlackBerry hardware milestone.",
            "BlackBerry hardware set expectations for mobile email and messaging security.",
            "Business users needed secure mobile email before modern smartphone platforms.",
            imp, BB_TAGS, BLACKBERRY, wiki, wiki,
        ))
    return out


def google_devices() -> list[Device]:
    nexus = [
        ("nexus-one-released", "2010-01-05", "Nexus One released", 2,
         "Google's first Nexus phone with HTC — pure Android reference device.", NEXUS_TAGS),
        ("nexus-s-released", "2010-12-16", "Nexus S released", 3,
         "Samsung-built Nexus with NFC and curved glass.", NEXUS_TAGS),
        ("galaxy-nexus-released", "2011-11-17", "Galaxy Nexus released", 2,
         "first phone with Android 4.0 Ice Cream Sandwich.", NEXUS_TAGS),
        ("nexus-4-released", "2012-11-13", "Nexus 4 released", 3,
         "LG-built affordable flagship with wireless charging.", NEXUS_TAGS),
        ("nexus-5-released", "2013-10-31", "Nexus 5 released", 2,
         "LG Nexus with KitKat — popular developer reference phone.", NEXUS_TAGS),
        ("nexus-6-released", "2014-11-12", "Nexus 6 released", 3,
         "Motorola-built large Nexus with Lollipop.", NEXUS_TAGS),
        ("nexus-6p-released", "2015-09-29", "Nexus 6P released", 3,
         "Huawei-built premium Nexus with fingerprint sensor.", NEXUS_TAGS),
    ]
    pixels = [
        ("google-pixel-released", "2016-10-20", "Google Pixel released", 2,
         "first Google-only phone — Assistant, best-in-class Android camera.", PIXEL_TAGS),
        ("google-pixel-2-released", "2017-10-19", "Google Pixel 2 released", 2,
         "computational photography with Portrait Mode and Active Edge.", PIXEL_TAGS),
        ("google-pixel-3-released", "2018-10-18", "Google Pixel 3 released", 3,
         "Night Sight and dual front cameras on Google's flagship.", PIXEL_TAGS),
        ("google-pixel-4-released", "2019-10-24", "Google Pixel 4 released", 3,
         "Soli radar gestures and Astro Photography mode.", PIXEL_TAGS),
        ("google-pixel-5-released", "2020-10-15", "Google Pixel 5 released", 3,
         "mid-range pivot with wireless charging in aluminum body.", PIXEL_TAGS),
        ("google-pixel-6-released", "2021-10-28", "Google Pixel 6 released", 2,
         "first Tensor chip — Google-designed silicon for ML workloads.", PIXEL_TAGS),
        ("google-pixel-7-released", "2022-10-13", "Google Pixel 7 released", 3,
         "Tensor G2 and refined camera bar design.", PIXEL_TAGS),
        ("google-pixel-8-released", "2023-10-12", "Google Pixel 8 released", 2,
         "Tensor G3 with seven years of OS updates promised.", PIXEL_TAGS),
        ("google-pixel-9-released", "2024-08-22", "Google Pixel 9 released", 3,
         "Tensor G4 and Gemini Nano on-device AI features.", PIXEL_TAGS),
    ]
    out = []
    for slug, date, title, imp, hook, tags in nexus + pixels:
        line = "pixel" if slug.startswith("google-pixel") else "nexus"
        out.append(d(
            line, slug, date, title,
            f"Google began selling the {title.replace(' released', '')} — {hook}",
            f"Nexus and Pixel phones were Google's pure-Android reference hardware for developers. {hook.capitalize()} AOSP builds and CTS testing often used Pixel devices as the baseline.",
            f"The {title.split(' released')[0]} was a flagship Google Android reference device.",
            "Pixel/Nexus hardware defines the reference Android experience for developers.",
            "Android needed first-party reference phones without OEM skin fragmentation.",
            imp, tags, GOOGLE,
            f"https://en.wikipedia.org/wiki/{title.split(' released')[0].replace(' ', '_')}",
            f"https://en.wikipedia.org/wiki/{title.split(' released')[0].replace(' ', '_')}",
        ))
    return out


def other_android_flagships() -> list[Device]:
    models = [
        ("motorola-droid-released", "2009-11-06", "Motorola Droid released", 2,
         "Verizon Android flagship that popularized Android 2.0 in the US.", MOTOROLA,
         "https://en.wikipedia.org/wiki/Motorola_Droid"),
        ("htc-one-m7-released", "2013-03-22", "HTC One (M7) released", 2,
         "aluminum unibody and BoomSound — premium Android design reference.", HTC,
         "https://en.wikipedia.org/wiki/HTC_One_(2013)"),
        ("oneplus-one-released", "2014-04-23", "OnePlus One released", 2,
         "flagship specs at mid-range price — CyanogenMod-era disruptor.", ONEPLUS,
         "https://en.wikipedia.org/wiki/OnePlus_One"),
    ]
    out = []
    for slug, date, title, imp, hook, company, wiki in models:
        tags = ("hardware", "mobile", "smartphone", "android", company[0])
        out.append(d(
            "android-flagship", slug, date, title,
            f"{company[1]} released the {title.replace(' released', '')} — {hook}",
            f"The phone expanded Android's flagship landscape beyond Samsung and Google. {hook.capitalize()}",
            f"The {title.split(' released')[0]} was a significant Android flagship.",
            "Diverse Android flagships gave developers multiple hardware targets beyond Galaxy and Pixel.",
            "Android needed credible flagship alternatives to Samsung and carrier-skinned phones.",
            imp, tags, company, wiki, wiki,
        ))
    return out


DEVICES.extend(galaxy_s_devices())
DEVICES.extend(galaxy_note_devices())
DEVICES.extend(galaxy_z_devices())
DEVICES.extend(nokia_devices())
DEVICES.extend(blackberry_devices())
DEVICES.extend(google_devices())
DEVICES.extend(other_android_flagships())

# Chain relatedIds within each line
LINE_ANCHORS = {
    "iphone": "iphone-goes-on-sale",
    "galaxy-s": "samsung-galaxy-s-released",
    "galaxy-note": "samsung-galaxy-note-released",
    "galaxy-z": "samsung-galaxy-fold-released",
    "nokia": "nokia-9000-communicator-released",
    "blackberry": "blackberry-5810-released",
    "nexus": "nexus-one-released",
    "pixel": "google-pixel-released",
    "android-flagship": "t-mobile-g1-released",
}

CROSS_LINKS = {
    "iphone": ["android-announced", "t-mobile-g1-released", "samsung-galaxy-s-released"],
    "galaxy-s": ["iphone-goes-on-sale", "android-announced", "t-mobile-g1-released"],
    "galaxy-note": ["samsung-galaxy-s-released", "iphone-6-plus-released"],
    "galaxy-z": ["samsung-galaxy-s10-released", "iphone-x-released"],
    "nokia": ["iphone-goes-on-sale", "android-announced", "windows-phone-eol"],
    "blackberry": ["iphone-goes-on-sale", "blackberry-os-eol"],
    "nexus": ["android-announced", "t-mobile-g1-released"],
    "pixel": ["android-announced", "nexus-one-released"],
    "android-flagship": ["android-announced", "t-mobile-g1-released"],
}


def bucket_path(date: str, precision: str = "day") -> str:
    if precision == "year" or (precision == "month" and len(date) == 4):
        return f"{date}/year.json"
    if len(date) == 4:
        return f"{date}/year.json"
    if len(date) == 7:
        y, m = date.split("-")
        return f"{y}/{m}.json"
    y, m, _ = (date + "-01").split("-")[:3]
    return f"{y}/{m}.json"


def precision_for(date: str) -> str:
    if len(date) == 4:
        return "year"
    if len(date) == 7:
        return "month"
    return "day"


def to_event(device: Device, prev_id: str | None, next_id: str | None) -> dict:
    related = []
    anchor = LINE_ANCHORS.get(device.line)
    if anchor and anchor != device.id:
        related.append(anchor)
    if prev_id:
        related.append(prev_id)
    if next_id:
        related.append(next_id)
    for rid in CROSS_LINKS.get(device.line, []):
        if rid not in related:
            related.append(rid)

    precision = precision_for(device.date)
    return {
        "id": device.id,
        "slug": device.id,
        "date": device.date,
        "datePrecision": precision,
        "title": device.title,
        "summary": device.summary,
        "about": device.about,
        "narrative": {
            "whyChosen": device.why_chosen,
            "whyImportant": device.why_important,
            "problemSolved": device.problem_solved,
        },
        "category": "hardware",
        "tags": list(device.tags),
        "people": [],
        "companies": [{"id": device.company_id, "name": device.company_name}],
        "importance": device.importance,
        "media": [],
        "sources": [
            {"title": f"{device.title} — launch", "url": device.date_url, "role": "date"},
            {"title": f"Wikipedia — {device.title.replace(' released', '')} (overview)", "url": device.wiki, "role": "overview"},
        ],
        "relatedIds": related[:6],
    }


def main() -> None:
    existing_ids: set[str] = set()
    for path in TIMELINE.rglob("*.json"):
        data = json.loads(path.read_text())
        for e in data.get("events", []):
            existing_ids.add(e["id"])

    by_line: dict[str, list[Device]] = {}
    for dev in DEVICES:
        if dev.id in SKIP_IDS or dev.id in existing_ids:
            continue
        by_line.setdefault(dev.line, []).append(dev)

    new_events: list[dict] = []
    for line, devices in by_line.items():
        devices.sort(key=lambda d: d.date)
        for i, dev in enumerate(devices):
            prev_id = devices[i - 1].id if i > 0 else None
            next_id = devices[i + 1].id if i + 1 < len(devices) else None
            new_events.append(to_event(dev, prev_id, next_id))

    buckets: dict[str, list[dict]] = {}
    for event in new_events:
        rel = bucket_path(event["date"], event["datePrecision"])
        buckets.setdefault(rel, []).append(event)

    for rel, events in buckets.items():
        path = TIMELINE / rel
        if path.exists():
            data = json.loads(path.read_text())
            data["events"].extend(events)
            data["events"].sort(key=lambda e: (e["date"], e["title"]))
        else:
            data = {"events": events}
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")

    print(f"Added {len(new_events)} flagship device events across {len(buckets)} buckets")


if __name__ == "__main__":
    main()
