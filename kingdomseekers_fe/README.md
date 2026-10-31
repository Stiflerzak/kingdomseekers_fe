# Kingdom Seekers Eastern Bypass — digital concept

An exploratory Next.js prototype for the Nairobi Eastern Bypass branch. The public site introduces the church; `/member` demonstrates a mobile-first companion for discipleship and community; `/learn` offers a self-paced new-believer course; `/qr` creates downloadable SVG QR codes. The member view is configured as an installable web app for iPhone and Android. There are no App Store or Google Play packages yet. No account, database, payment, livestream, or messaging integration exists yet.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` for a static production build in `out/`.

## What is in the prototype

- Public home: welcome, branch story, first-visit flow, ministry tabs, discipleship, media concept, location and FAQs.
- Four-slide animated carousel: Matthew 6:33, praise and worship, prayer, and Thursday youth street praise. Slides advance every five seconds and include play/pause, keyboard, swipe, and reduced-motion controls. The scripture uses a short King James Version excerpt.
- Visual interaction: a short logo loading screen, crossfading carousel images, moving sermon/event strip, responsive hover/focus states, and reduced-motion support.
- Events and projects: Thursday evening youth street praise at Mwihoko Market, with two AI concept images and [Psalm 16:5 (KJV)](https://www.bible.com/bible/1/PSA.16.5.KJV), plus sound system and evangelism project concepts. The exact event start time, project budgets and souls-won figures are not invented.
- Testimonies: a moving strip at the top displays three fictional, clearly labelled sample quotes. Replace them with approved member stories before launch.
- Giving: a prominent header button opens Tithe, Offering, Sacrifice, and Project choices. SVG cards preview M-Pesa, RTGS, and a PDQ terminal marked coming soon. The supplied Paybill **247247** is shown with the account-number-pending state. No payment action is enabled.
- Sermons: a responsive layered gallery with an embedded [Rev Simon Mwangi Chege sermon](https://www.youtube.com/watch?v=-otUcXwUwrw), arrows, swipe controls, and [channel links](https://www.youtube.com/channel/UCiJ8sLxT1g_O4IvfAmdULhw). The gallery photos are concept images, not YouTube thumbnails.
- Member preview: sample login (PIN `2468`), sample MFA code (`123456`), dashboard, devotionals, fellowships, event interest, and a Partner tab with a USSD-style menu and sample contribution message. Authentication and messages are simulated in the browser; no real credentials, SMS, USSD session or payment are processed.
- Learning platform: four sample new-believer lessons with reading prompts, short quizzes and progress stored only on this device.
- Home-screen app: manifest, icons, service worker and mobile member layout. App-store packages and synced member accounts remain later work.
- QR generator: website, visit and member presets based on the current origin, plus a custom URL. It creates a vector SVG in the browser and allows download or link copying. Localhost codes will not work on another phone; enter the published URL before printing.
- SEO foundation: semantic sections, descriptive metadata, responsive layout. Crawling is intentionally disabled until real branch content and the final domain are approved.
- Supplied church logo and Rev. Simon portrait are in `public/images/`. The supplied `logo.svg` embeds a 162×162 PNG rather than vector paths, so large print use needs a true vector original. The generated worship and Rev. Simon scenes are **concept images**, not documentary photography of Kingdom Seekers events. Replace or approve them before launch. Photographs are compressed WebP; icons and QR output are SVG.
- The added prayer, worship-team and Mwihoko Market images are generated concept images. They do not document the actual event. All generated scenes need branch approval before publication.

## Content truth

The user supplied the Eastern Bypass branch, Rev. Simon Chege and the relationship to Apostle Kimani. Public results support the wider Kingdom Seekers presence in Nakuru and identify Apostle John Kimani William. A [2023 sermon on Rev. Simon Mwangi Chege's YouTube channel](https://www.youtube.com/watch?v=-otUcXwUwrw) names Kingdom Seekers Fellowship Utawala; a [Nairobi listing](https://www.bizlaza.com/KE/Nairobi/1477002-2/genre/184266718279692/Christian%2BChurches) names an Eastern Bypass branch. The supplied headquarters URL `https://www.ksfchurch.com/` returned 502 when checked on 31 October 2026, so its live design and content could not be reviewed. These sources do not establish an approved branch address, service times, contact details or schedule. The prototype avoids inventing them.

See [PRODUCT_PLAN.md](PRODUCT_PLAN.md) for scope, sprints, architecture and launch criteria.
