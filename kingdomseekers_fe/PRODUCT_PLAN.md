# Product concept and sprint plan

## Product aim

Create a trusted digital front door for **Kingdom Seekers Eastern Bypass, Nairobi**, led by **Rev. Simon Chege**, connected to the wider Kingdom Seekers ministry founded by **Apostle John Kimani William** in Nakuru. Serve three audiences:

1. **Visitors:** understand the church, find a service, see genuine stories, and plan a visit with little friction.
2. **Members:** develop daily habits, join fellowship, register for events, and receive relevant church updates.
3. **Church teams:** publish once, manage pastoral follow-up carefully, and turn approved long-form teaching into accessible media.

The public website is phase one. A mobile app or installable PWA can reuse the same API and design system when member workflows have been validated. A Spring Boot backend comes after the front-end and content model are agreed.

## Experience principles

- **Local and global:** Nairobi branch information is specific; sermons and stories can reach anyone.
- **Phone first:** one-handed navigation, readable type, low data use, clear offline and slow-network states.
- **Trustworthy:** real names, dates, images, quotes, giving details and event schedules require church approval.
- **Pastoral and private:** prayer requests and member details are visible only to authorized teams; consent and retention rules are explicit.
- **Accessible:** keyboard use, contrast, captions, transcripts, descriptive labels, reduced motion, and Kiswahili support planned.

## Product areas and priority

| Area | MVP website | Member phase | Later expansion |
| --- | --- | --- | --- |
| Public presence | Home, about, leadership, first visit, service times, map, FAQs, contact | — | Multilingual pages, testimonies, branch directory |
| Media | Sermon library, playlists, video embeds, search, transcripts | Saved sermons, listening history | Livestream, podcast feed, personalized discovery |
| Community | Ministries, youth, children, serving, projects | Fellowship finder, event RSVP, approved directory | Group discussion and team scheduling |
| Discipleship | Preview tracks and devotionals | Daily devotionals, Bible reading, courses, quizzes, notes and progress | Cohort pathways, mentor check-ins, certificates where useful |
| Care | Prayer request, consent-aware follow-up | Prayer updates, pastoral appointments | Care workflows and referral routing |
| Giving | Clear, verified giving information | Giving history only if the payment provider supports it securely | Project funding pages with transparent updates |
| Communications | News and social links | Opt-in notifications and reminders | Audience-based campaigns, WhatsApp integration where permitted |
| Creator tools | — | — | Transcript, chapter suggestions, vertical reframing, captions, clip drafts, approval queue and export |

### Extra ideas worth testing

- **Plan a visit on WhatsApp:** a familiar low-friction path, with consent and a real welcome-team number.
- **Low-bandwidth sermon mode:** audio plus transcript and downloadable notes for uneven connections.
- **First-visit journey:** directions, parking/transport, children’s experience, accessibility and a personal welcome.
- **Service and project updates:** milestones, photos and impact reports, without unverified fundraising claims.
- **Volunteer matching:** interests, availability, onboarding and safeguarding checks for children’s roles.
- **Youth space:** youth events and teaching without exposing minors’ profiles or images by default.
- **Pastoral search:** find sermons by scripture, topic, date and speaker, supported by reviewed transcripts.

## Suggested sprints

Assumption: two-week sprints with a small product/design, Next.js, Spring Boot, media/content and QA team. Adjust after staffing and content audit.

| Sprint | Outcome | Reviewable deliverable | Exit check |
| --- | --- | --- | --- |
| 0 — Discovery | Verify branch facts and brand | Approved brief, audience journeys, content inventory, logo/colour/photo permissions, service and contact details | Branch lead signs off on public facts and owners |
| 1 — Public front door | Make the church easy to discover | Responsive home, about, visit, ministries, youth, contact, map, FAQs | Visitors can find where/when and request a welcome on a phone |
| 2 — Content and SEO | Make publishing sustainable | CMS workflow, sermon pages, event pages, structured data, sitemap, redirects, analytics consent | Editors publish without a developer; pages index correctly |
| 3 — Backend foundation | Establish trusted data and access | Spring Boot API, PostgreSQL, identity, roles, audit log, file storage, API contract | Role tests pass; private records do not leak |
| 4 — Member core | Support everyday engagement | Accounts, preferences, devotionals, saved sermons, fellowship requests, event RSVP, installable iPhone/Android web app | Member completes core tasks on a small phone |
| 5 — Discipleship | Enable self-paced growth | Courses, lessons, progress, notes, quizzes, leader authoring | A member starts, resumes and completes a track |
| 6 — Media workflow | Multiply approved teaching | Upload/transcript, clip suggestions, caption edit, vertical preview, review and export | A human approves every public clip; rights and source are recorded |
| 7 — Hardening and launch | Operate reliably | Performance, accessibility, privacy, backup, monitoring, editorial training | Launch checklist signed off; support ownership assigned |

This is a sequencing proposal. The first operational release can ship after sprints 0–2. Backend and member features can follow without delaying the public presence.

## Architecture direction

```text
Next.js public site / member web app / future mobile app
                    │
             Spring Boot REST API
                    │
    PostgreSQL · object storage · search index
                    │
   Background media jobs · notifications · payment provider
```

- Use a shared content model for `Branch`, `Person`, `Service`, `Ministry`, `Sermon`, `Series`, `Event`, `Project`, `Devotional`, `Course`, `Lesson`, `Group`, `PrayerRequest` and `MediaAsset`.
- Publish public information via cacheable read endpoints; isolate member and pastoral data behind authentication and role checks.
- Keep video files in object storage or a video platform, not in PostgreSQL. Generate multiple sizes, captions and audio options.
- Start with CMS/editor tooling that fits the church’s publishing team. Keep a draft → review → publish workflow for public claims and media.
- Prefer a responsive PWA first, then choose native mobile only if device features or adoption justify it.
- The prototype now has a web app manifest and service worker. A published HTTPS domain and device checks are required before claiming the home-screen install works end to end. Native App Store and Google Play packages would be a later delivery using the same API and design system.

## Clip editor concept

1. Import an approved sermon recording and record its source, speaker, date and usage rights.
2. Create a transcript with timecodes and speaker review.
3. Suggest clips based on complete thoughts, not only attention-grabbing phrases.
4. Provide vertical crop, captions, brand-safe templates, music rights checks and platform-specific previews.
5. Require a reviewer to approve the text, context, image and final export. Publishing to TikTok, Facebook, Instagram or WhatsApp is a separate, authorized action.
6. Track source sermon and export history so corrections can be made.

## SEO and performance requirements

- Unique titles/descriptions, clean URLs, canonical tags, sitemap, robots rules and `Church`/`Event`/`VideoObject` structured data once details are verified.
- Fast mobile loading: correctly sized AVIF/WebP images, lazy media below the fold, video posters, lean JavaScript and CDN caching.
- Searchable sermon transcripts and event pages, with intentional internal linking.
- Accessible Core Web Vitals targets: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms at the 75th percentile on real mobile traffic.
- Measure useful outcomes: first-visit requests, directions taps, sermon plays, course completion and event RSVP. Avoid collecting analytics data without a clear purpose.

## Decisions needed from the branch

1. Official branch name and styling, approved logo, colours and typography; whether Nakuru brand assets may be reused. Public references use both “Eastern Bypass” and “Utawala,” so confirm which label the branch wants online.
2. Rev. Simon Chege’s approved title/bio and the exact wording of the relationship to Apostle John Kimani William and Nakuru headquarters.
3. Verified service times, location pin, phone/WhatsApp, email, social pages and livestream channels.
4. Approved photography/video, usage rights, and people’s consent, especially children and youth.
5. Who owns publishing, pastoral requests, group data, event approvals and media review.
6. Which giving methods and projects can be shown, with verified beneficiary and financial reporting details.
7. English/Kiswahili priority and whether another language is needed.
8. Which verified link the default QR code should open: the branch homepage, a first-visit page, a map pin or another destination. Avoid printing QR codes before the final URL exists.
9. Confirm the Equity Bank account number and recipient name for Paybill 247247. Keep payment instructions inactive until both match church finance records.
10. Confirm event dates, sound-system budget and equipment scope, evangelism impact definitions and approved counts before publishing.

## Prototype limitations

The current Next.js build is an interactive concept with sample content. Forms do not submit. Devotional and group demo state resets on refresh; course progress persists only on the current device. SEO crawling is blocked until verified content and a real domain are supplied. The QR tool generates real codes, but localhost destinations are unsuitable for print or distribution. Giving has no payment action because the account number is missing. Event dates, project budgets and evangelism counts are placeholders. The generated worship, prayer, praise-team and Rev. Simon scenes are illustrative composites and must be approved or replaced with real photography for production. The supplied SVG logo contains a small embedded raster image and is not a true vector master.
