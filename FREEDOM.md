# Technical freedom — an honest status

Date: 17 November 2026.

## What "free" means here

The app should run without outside masters.
You do not need one company.
No pressure to use a cloud, an account, or a payment.
Everything should work offline too.
We say honestly what works — and what does not.

## What is already free today

| Area | Status | Source |
| --- | --- | --- |
| Source code | open, MIT | `LICENSE.md` |
| Text and images | open, CC0 / CC BY | `LICENSE.md` |
| Course | open, AGPL-3.0 | the course licence in `learn/` |
| No external scripts | yes | no CDN links in `outreach/apps/` |
| No external fonts | yes | only fonts on the device |
| No advertising | yes | nowhere in the project |
| No trackers | yes | no analytics services |
| No data sales | yes | nowhere |
| Works offline | yes | start page, demos, apps, standalone |
| Free of charge | yes | no subscription, no buy |
| No account needed | yes | all lessons are open |
| Run on your own | yes | static files only, no server needed |
| No WAV | yes | sound is made in the browser |

## Links at the edge — not something you need

These links appear in the apps, but the app works without them:

- `opencode.ai`, GitHub — only references. We do not load code.
- C64 emulator, TAWS, vAmigaWeb — only further links.
- ELSTER, tax office — only information in the tax field.

They are **references**, not a requirement.
If you are offline, you can still use the app.

## What is NOT technically possible

We say this clearly:

1. **No browser, no app.** The demos need a browser
   with JavaScript and canvas. A text-only window is not enough.
2. **No real Amiga/C64 without ROMs.** The law protects Kickstart ROMs.
   We bundle none. Our pages are learning tools,
   not complete emulators.
3. **Gmail/GitHub login needs an account.** Whoever uses the side tasks
   needs an account. The learning app needs none.
4. **The guestbook needs a server.** Local only with `tools/cgi/server.mjs`.
   Without a server there is no guestbook. We say this openly.
5. **OpenCode tools need OpenCode.** The agent files only work
   in OpenCode. In a normal browser they do nothing.

## How to use the app completely free

1. Download the files (ZIP from `exports/`).
2. Open `docs/index.html` in a browser. Or `site/index.html`.
3. No account. No network needed. No installation.
4. Everything stays on your own computer.

## What we will not change

- No protected ROMs.
- No foreign brands presented as our own.
- No hidden callback or tracking services.
- No claim of "accessible" or "tested" without a real review.

## Honest

- Not legal advice.
- No test with real users.
- "Free" here means: open, no cost, works offline, runs on your own.
- It does not mean: free of every technical limit.
  Browsers, ROMs, and accounts are real limits.
  We do not hide them — we name them.

## See also

- `LICENSE.md` — licences.
- `LEGAL-STATUS.md` — open legal points.
- The notices file in the root — borrowed works.
- `DATENSCHUTZ.md` — what stays local.
