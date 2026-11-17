# Project memory — Easy Read / retro learning system

Read this at the start of every session. This is the durable memory of earlier work.

## Purpose and non-negotiable rules

- Open learning system: Easy Read, retro computing, art, music, AI, money guidance.
- **Written contact only.** No camera, no calls, no personal presence for testing.
- **Honesty first.** Never say "accessible" or "user-tested". Always say
  "not yet tested with real users" until real reviewers from the target group
  have answered.
- Avoid "Down Syndrome" and "disabled" in project copy. Say "gehörlose Menschen"
  or "taube Menschen". Use "taubstumm" only when explaining that the old word is
  outdated.
- Goal for every text: Easy Read **100/100** where practical.

## Fixed content

- Joke: canonical file `learn/joke.md`. Exact German line:
  „Mir reichts! Ich geh schaukeln! Meine Freunde gehen rutschen!"
  Keep it in all languages at reasonable points. Never make fun of the reader.
- Kids course exact name: **"AI Coding Course for ALL Kids!"**. An adult version
  also exists.
- "0+" means no prior knowledge. It does not mean a children's book.
- Licences: code MIT, art/text CC0 or CC BY. Project stays open.
- `virtual_field_generator/` is **secret and local only**. Never delete it, never
  publish it. Root `.gitignore` keeps it out of git. It has contained Python and
  QEMU/KolibriOS work; do not touch it unless asked.

## Architecture

- One `/learn` teaching mode with packs, not disconnected tools.
- Teach **C64 first, then Amiga**. Include assembly in Easy Read.
- `docs/` is **generated**. Never edit it directly. After any change in
  `field-generator/` or `site/`, run `node field-generator/build-docs.mjs`.
- WASM particle kernel (`field.wasm`) with a JavaScript fallback.
- KolibriOS support is **native FASM**, not browser demos:
  `BOING` 400 bytes and `FIELD` 656 bytes, `MENUET01` header, `int 0x40`.
  Assembled with FASM 1.73.32. Not boot-tested on real hardware.

## Public site

- GitHub: `aurabin/easy-read` (public). Pages: `https://aurabin.github.io/easy-read/`
- Start page source: `site/index.html` → `docs/index.html`.
- Other pages: `field-generator/field-generator.html`, `boing-ball.html`,
  `share.html`, plus generated copies in `docs/`.
- Design system "Nachtgitter" is documented in `learn/art-direction.md`:
  - tokens: `--bg #070b14`, `--panel #0e1626`, `--ink #eaf2ff`,
    `--muted #9fb3d1`, `--line #24344f`, `--teal #0f766e`,
    `--sky #6fd3ff`, `--violet #7a20d0`, `--red #e8382f`, `--cream #f5f0e6`
  - measured contrast: ink/bg 17.47, muted/bg 9.22, sky/bg 11.66,
    white/teal 5.47. Use one accent colour per place.
  - icons 24×24 with 2px strokes, 8pt spacing, visible focus rings,
    print and forced-colors styles.
- Inclusive modes: buttons with `data-mode-btn`, values `cb|low|deaf`,
  stored in `localStorage` key `er-mode`, shared across pages.
  - `cb`: checkered ball turns blue/cream; patterns carry the meaning.
  - `low`: 20px text, thicker lines, grid hidden, stronger focus.
  - `deaf`: visible "BOING!" caption on every impact; sound is only extra.

## Known demo fixes — do not revert

- Boing Ball uses **real physics**: `FLOOR = 168`, `R = 22`, gravity `0.42`,
  bounce `-Math.max(6.8, Math.abs(vy) * 0.9)`, squash on impact,
  shadow shrinks with height. It is **not** a sine wave.
- Audio and the "BOING!" caption fire on **impact**, not on toggling sound.
  `boingPending` prevents stacked tones when the AudioContext resumes.
- Chaotic sound came from dozens of open test tabs. **Close all browser tabs**
  after every browser check.
- Field generator: WASM particles, presets, drag/drop, PNG export, reduced motion.

## Fact-checking lessons

- `learn/gesundheit-pruefen.md` holds a 7-step method for checking health claims.
  The 2025 Nature lithium paper is real (Aron et al., Nature 645:712–721,
  DOI 10.1038/s41586-025-09335-x). Claims of cure, plaque clearing, patent
  conspiracy and "orotate is non-toxic and better" are **not supported**.
  Never give medication advice; tell the reader to ask a doctor.
- The claims "the Nirvana Lithium video was only possible because of the Amiga"
  and "Jobs said the Macintosh will never be colour" are **unverified**. They are
  documented as "nicht belegt". Do not assert them as facts without a source.
- `learn/kontext.md` uses the Nirvana song as an example of one word, two meanings.
- `learn/musik.md`, `art-design.md`, `art-direction.md`, `modi.md`,
  `gesundheit-pruefen.md` were all checked at 100/100.

## Commands (run from project root)

- Readability: `node .opencode/skills/easy-read/scripts/readability.mjs --lang de <file>`
- All checker tests: `node .opencode/skills/easy-read/scripts/test-readability.mjs`
- Links: `node tools/link-check.cjs`
- WASM: `node tools/wasm-test.cjs`
- Static check: `node tools/static-check.cjs`
- KolibriOS audit: `node tools/kolibri-audit.mjs`
- Contrast: `node tools/contrast.mjs`
- Bounce physics: `node tools/bounce-sync-test.mjs`
- Local server: `node tools/ch-server.mjs` (port 8123; it sometimes dies — restart)
- Rebuild deployment: `node field-generator/build-docs.mjs`
- Git: commit with `-c user.name="OpenCode" -c user.email="opencode@local"`,
  then `git push origin master`.

## Last known good state

177 files, about 2.14 MB, 26 tests pass, 122 links with none broken, clean git tree.
Last commit: `4bd8011 Add image analysis section to art and design lesson`.
If the session tools (FASM, Node) live under `%TEMP%/opencode`, they may disappear
after a reset — reinstall or check before relying on them.

## Style of work

- Short sentences, everyday words, active voice, one idea per section.
- Keep the joke at reasonable points. Be honest about what is untested.
- Never invent a source. If something cannot be verified, write "nicht belegt".
- If the user asks for something technically impossible (for example changing
  model weights or a model reset), say so plainly and offer the durable
  alternative — such as this file.
