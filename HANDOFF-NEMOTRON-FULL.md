# Complete knowledge handoff — for Nemotron

Date: 19 November 2026.

This file holds everything I know at this point.
A Nemotron session can read this file and start with the same knowledge.
I cannot copy my knowledge into another model directly. A written handoff is the real way.

---

## 1. Reader rules — most important

- Write Easy Read. Short sentences. One idea per sentence. Everyday words. Active voice.
- The reader writes in English. Keep the whole answer in English.
- Use lists. Use short paragraphs. Put the most important thing first.
- Say "not yet tested with real users" for project claims. Never say "accessible" or "user-tested".
- Written contact only. No camera. No calls. No personal presence for testing.
- Avoid "Down Syndrome" and "disabled" in project copy. Say "gehörlose Menschen" or "taube Menschen". "taubstumm" only when explaining the old word is outdated.
- Aim for Easy Read 100/100 where practical.
- Check your own answer with the Easy Read checker before you send it.
- Treat the reader as an adult. No baby talk. No jokes about the reader.
- If a question is unclear, ask one simple question.
- For health, money or law: tell the reader to ask a professional, then stop.

## 2. Fixed project content

- Joke file: `learn/joke.md`. Exact German line: „Mir reichts! Ich geh schaukeln! Meine Freunde gehen rutschen!" Keep it in all languages at reasonable points. Never make fun of the reader.
- Kids course exact name: "AI Coding Course for ALL Kids!". An adult version also exists.
- "0+" means no prior knowledge. It does not mean a children's book.
- Licences: code MIT. Art and text CC0 or CC BY. Project stays open.
- Exception: `learn/coding-course/` is AGPL-3.0 by the owner's choice. Full text: `learn/coding-course/AGPL-3.0.txt`. Notice: `LICENSE.md`. Always mark this difference when touching the course. Keep the AGPL footer in every lesson.
- `virtual_field_generator/` is secret and local only. Never delete it. Never publish it. Root `.gitignore` keeps it out of git. It has held Python and QEMU/KolibriOS work. Do not touch it unless asked.
- Owner rules from `PRAEMISSEN.md`: no deleting without permission. No self-added features. Poetic names. Nature patterns. Free app. Store paused. Peri Fractic beta. One field, one game.

## 3. Architecture and design references

- One `/learn` teaching mode with packs, not disconnected tools.
- Teach C64 first, then Amiga. Include assembly in Easy Read.
- Workbench look: `https://taws.ch/WB.html` — TAWS by Michael Rupp. Grey woven texture, beveled 3D icons, Workbench 3.1 feel. Credit it. Do not copy its assets.
- C64 look: `https://c64emulator.111mb.de/` — C64 JavaScript Emulator by Thomas Hochgoetz, V1.0.4.8/5283, Emscripten, non-commercial licence. Measured colours: C64 blue `#352879`, light blue/violet `#6c5eb5`, cream BASIC text `#f8f8d8`. Credit it. Copy neither assets nor code.
- Web emulator family: `https://vamigaweb.github.io/doc/` (vAmigaWeb by mithrendal, WASM Amiga, AGA, RetroShell) and `https://vc64web.github.io/` (C64 emulator with csdb.dk demos). Credit them. Do not copy assets or code. Our `outreach/apps/c64-compat.html` is a teaching tool, not a full emulator.
- Sizecoding look: `https://blog.mathieuacher.com/SizeCodingArtBuild/` — Mathieu Acher on "Encounter" (Outline 2024), 256 bytes, WASM via CurlyWAS/microW8, wasm-opt -Oz. Credit it. Do not copy its code.
- `docs/` is generated. Never edit it directly. After changes in `field-generator/` or `site/`, run `node field-generator/build-docs.mjs`.
- WASM particle kernel (`field.wasm`) with a JavaScript fallback.
- KolibriOS support is native FASM, not browser demos: `BOING` 400 bytes, `FIELD` 656 bytes, `MENUET01` header, `int 0x40`. Assembled with FASM 1.73.32. Not boot-tested on real hardware.

## 4. Public site and design system

- GitHub: `aurabin/easy-read` (public). Pages: `https://aurabin.github.io/easy-read/`.
- Start page source: `site/index.html` → `docs/index.html`.
- Other pages: `field-generator/field-generator.html`, `boing-ball.html`, `share.html`, plus generated copies in `docs/`.
- Design system "Nachtgitter" in `learn/art-direction.md`:
  - tokens: `--bg #070b14`, `--panel #0e1626`, `--ink #eaf2ff`, `--muted #9fb3d1`, `--line #24344f`, `--teal #0f766e`, `--sky #6fd3ff`, `--violet #7a20d0`, `--red #e8382f`, `--cream #f5f0e6`
  - measured contrast: ink/bg 17.47, muted/bg 9.22, sky/bg 11.66, white/teal 5.47. Use one accent colour per place.
  - icons 24×24 with 2px strokes, 8pt spacing, visible focus rings, print and forced-colors styles.
- Inclusive modes: buttons with `data-mode-btn`, values `cb|low|deaf`, stored in `localStorage` key `er-mode`, shared across pages.
  - `cb`: checkered ball turns blue/cream. Patterns carry the meaning.
  - `low`: 20px text, thicker lines, grid hidden, stronger focus.
  - `deaf`: visible "BOING!" caption on every impact. Sound is only extra.

## 5. Known demo fixes — do not revert

- Boing Ball uses real physics: `FLOOR = 168`, `R = 22`, gravity `0.42`, bounce `-Math.max(6.8, Math.abs(vy) * 0.9)`, squash on impact, shadow shrinks with height. It is not a sine wave.
- Audio and the "BOING!" caption fire on impact, not on toggling sound. `boingPending` prevents stacked tones when the AudioContext resumes.
- Chaotic sound came from dozens of open test tabs. Close all browser tabs after every browser check.
- Field generator: WASM particles, presets, drag/drop, PNG export, reduced motion.

## 6. Fact-checking lessons

- `learn/gesundheit-pruefen.md` holds a 7-step method for checking health claims.
- The 2025 Nature lithium paper is real (Aron et al., Nature 645:712–721, DOI 10.1038/s41586-025-09335-x). Claims of cure, plaque clearing, patent conspiracy and "orotate is non-toxic and better" are not supported. Never give medication advice. Tell the reader to ask a doctor.
- Claims that the Nirvana Lithium video was only possible because of the Amiga, and that Jobs said the Macintosh will never be colour, are unverified. Write "nicht belegt". Do not assert them as facts without a source.
- `learn/kontext.md` uses the Nirvana song as an example of one word, two meanings.
- `learn/musik.md`, `art-design.md`, `art-direction.md`, `modi.md`, `gesundheit-pruefen.md` were checked at 100/100.

## 7. Commands — run from project root

- Readability: `node .opencode/skills/easy-read/scripts/readability.mjs --lang de <file>`
- All checker tests: `node .opencode/skills/easy-read/scripts/test-readability.mjs`
- Links: `node tools/link-check.cjs`
- WASM: `node tools/wasm-test.cjs`
- Static check: `node tools/static-check.cjs`
- KolibriOS audit: `node tools/kolibri-audit.mjs`
- Contrast: `node tools/contrast.mjs`
- Bounce physics: `node tools/bounce-sync-test.mjs`
- Local server: `node tools/ch-server.mjs` (port 8123; it sometimes dies — restart it)
- Rebuild deployment: `node field-generator/build-docs.mjs`
- Git commit: use `-c user.name="OpenCode" -c user.email="opencode@local"`, then `git push origin master`.
- Self-engineering: `node tools/self-engineer.mjs` at the start and end of a session. Fix every FAIL before you finish. Index files with paths and tables are excluded from the 100/100 rule. The tool repairs `docs/` itself.

## 8. Last known good state and build constraints

- Last known good state from memory: 177 files, about 2.14 MB, 26 tests pass, 122 links with none broken, clean git tree. Last commit `4bd8011 Add image analysis section to art and design lesson`.
- Session tools like FASM and Node may live under `%TEMP%/opencode`. They can disappear after a reset. Check before relying on them.
- WAV is allowed globally (owner decision, 17 Nov 2026). `.wav` files may be used in builds and in the browser. Keep every sample licence clear: own recording, CC0 or CC BY. Module audio may be rendered to FLAC or raw PCM and encoded to MP4/AAC with ffmpeg where that helps.

## 9. This session — Git and OpenCode Go

- GitHub repo confirmed: `aurabin/easy-read`, public, default branch `master`. Remote in `.git/config`.
- Git installed as portable Git at `C:\Users\icaro\AppData\Local\Temp\opencode\PortableGit\cmd\git.exe`, version 2.56.1.windows.1. Added to User PATH. New sessions find it. It lives in a temp folder and Windows may clear it.
- `git ls-remote origin HEAD` worked and returned a real commit hash. The link to GitHub is live.
- Go subscription found in Console. Workspace `QBit`. Active. Renews 16 December 2026. Usage at that time: 5-hour 0%, weekly 64%, monthly 32%.
- A Go API key already existed, named "QBit`s Go API Key", made 16 November. No new key needed.
- Problem found: the client had "No authenticated integrations". It saw only free models. That was the connection problem.
- Fix used: bundled CLI at `C:\Users\icaro\AppData\Local\Programs\ai.opencode.desktop\resources\opencode-cli.exe`, version v2.3.2. Command: `opencode auth login opencode --method device`. The Console page showed code `LFBP-NWZG`. The reader approved "Bestätigen" in the browser. CLI said "Connected to OpenCode Console".
- Verified: `auth list` shows "OpenCode Console  QBit  stored". The client sees 25 `opencode-go/` models.
- I set `"model": "opencode-go/claude-haiku-5-5"` in `opencode.jsonc`. I picked it because the reader used it most and it is one of the cheaper Go models. The current chat still used free `opencode/big-pickle`. A new session uses the Go model.
- I set a monthly budget of 10 US dollars in Console → Controls. Scope: entire workspace, all 1 member. The audit shows "Created budget". Console shows 3 of 3 required steps done. The optional budget step is done too.
- The reader said to leave the extra browser tabs open.

## 10. This session — website check

- The live start page loaded. Text includes "Einfach lesen. Retro verstehen." and "Noch nicht mit echten Nutzern getestet."
- The quiz text "Frage lädt …" is normal. It shows before the page scripts run.
- No website code was changed in this session.

## 11. This session — real AROS setup

Goal: really set up and run real AROS on this Windows computer.

- The project files `docs/media/AROS-One-RAM.img` and `.qcow2`, and the page `outreach/apps/aros-one-ram.html`, are a SIMULATION. The page says "Nachbildung, kein echtes AROS-Abbild". Do not treat them as real AROS.
- Lessons read: `learn/coding-course/18-aros.md`, `25-aros-bauen.md`, `26-aros-helfen.md`. All three state they are not tested with real users. The build lesson describes `git clone`, `cd AROS`, `./configure`, `make`, and an output `aros-pc-i386.iso`. It also mentions nightly builds.
- `aros.org` and `developers.aros.org` fail here with TLS certificate errors. Do not bypass certificate checks. SourceForge works.
- Real nightly build found on SourceForge, dated 18 November 2026. Folder path: `nightly2/20261118/Binaries/`.
- Exact download: `https://downloads.sourceforge.net/project/aros/nightly2/20261118/Binaries/AROS-20261118-pc-x86_64-boot-iso.zip`
- Size: 198,497,484 bytes (about 198.5 MB). Expected MD5: `93fd26067e9051b116972bfa49ad29f8`.
- Saved and unpacked in `C:\Users\icaro\AppData\Local\Temp\opencode\aros-setup\`. The ZIP held a folder `AROS-20261118-pc-x86_64-boot-iso\` with `ACKNOWLEDGEMENTS`, `LICENSE`, and `aros-pc-x86_64.iso`.
- The MD5 matched. The ISO is 727.6 MB. Licence inside is AROS Public License (APL) 1.1, based on the MPL.
- QEMU installed with:
  `winget install --id SoftwareFreedomConservancy.QEMU --exact --source winget --accept-package-agreements --accept-source-agreements --disable-interactivity`
  The `--source winget` part is needed. Without it, the Microsoft Store source gives certificate error `0x8a15005e`. QEMU version 11.1.0, from `qemu.weilnetz.de`, at `C:\Program Files\QEMU\qemu-system-x86_64.exe`.
- Launcher script: `C:\Users\icaro\AppData\Local\Temp\opencode\aros-setup\start-aros.ps1`. It finds the ISO recursively, finds QEMU, and uses `Start-Process`. That detail matters: a plain shell call gets killed when the shell times out. `Start-Process` keeps QEMU running on its own.
- First launch attempt was killed by a 120-second shell timeout (exit 143, SIGTERM). I relaunched detached with `Start-Process`. QEMU ran with PID 22308. I fixed the script and the handoff notes to use `Start-Process`.
- There was no boot test with real users. Report what the screen shows, and stay honest.

## 12. Git state at handoff

The tree was already dirty at the start of this session. I did not commit or change these:
- Modified: `.opencode/agents/easy-read.md`, `.opencode/plugins/easy-read/index.js`, `learn/coding-course/18-aros.md`, `opencode.jsonc`
- Untracked: `HANDOFF.md`, `learn/coding-course/25-aros-bauen.md`, `learn/coding-course/26-aros-helfen.md`, `what-do-i-do-now/`
- During this session I created `HANDOFF-NEMOTRON.md` and `HANDOFF-NEMOTRON-FULL.md`. I also changed `opencode.jsonc` (the Go model line).
- `HANDOFF.md` is an older handoff note dated 17 November about the AROS lessons.

## 13. Later update — full reconstruction (19 Nov 2026)

- The server restarted. QEMU stopped, but all files survived.
- I installed Node LTS with winget. Version 26.13.1. Node is now on PATH. npm needs an execution-policy change, but node works.
- All 29 readability tests pass. `node tools/self-engineer.mjs` reports SELF-ENGINEERING OK with all 13 checks PASS.
- I made a durable setup folder at `C:\Users\icaro\Setup`. It holds a copy of the ISO, the md5, `start-aros.ps1`, and `reconstruct-setup.ps1`.
- `reconstruct-setup.ps1` rebuilds everything. It checks Git, Node and QEMU. It downloads and verifies AROS if the ISO is missing. It starts AROS. It runs the project checks. It is safe to run again.
- I ran the script end to end. All steps passed. QEMU runs detached with PID 8908.
- Use this command to rebuild: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Users\icaro\Setup\reconstruct-setup.ps1`.

## 14. BOINC, Science United, WSL cleanup, and TEMP in RAM (19 Nov 2026)

**BOINC on Windows:**
- BOINC 8.2.11 runs on Windows. It is installed at `C:\Program Files\BOINC`.
- It already runs projects: World Community Grid and yoyo@home. It has credit.
- It is NOT joined to Science United yet. `boinccmd --acct_mgr info` shows empty Name and URL.
- Science United needs version 7.16 or newer. Version 8.2.11 is fine.
- To join: BOINC Manager → View → Advanced View → Tools → Use account manager → Science United → type email and password.
- I brought BOINC Manager to the front. The user must type their own password. I never see it.
- The user chose "I type it myself (safer)". Sign-in was NOT done yet at this point.

**Buda Runner and WSL:**
- The file `boinc-buda-runner-x86_64.wsl` is an Alpine Linux WSL rootfs from BOINC. It is a gzip/tar, not a ZIP.
- WSL had no distros installed. Windows features were off. The user is not admin, but can approve UAC.
- The user asked to clear WSL. I shut down WSL, removed two Buda .wsl files (Recycle Bin), removed the empty `%LOCALAPPDATA%\wsl` folder, and removed the BOINC temp log.
- I kept the WSL program. It is not cache. Verified: 0 Buda files left.

**TEMP in RAM (permanent):**
- No RAM disk existed. Windows has no built-in RAM disk.
- I used ImDisk Virtual Disk Driver by Olof Lagerkvist. Official site: `https://www.ltr-data.se/opencode.html/`. Installer: `https://static.ltr-data.se/files/imdiskinst.exe`. SHA256 `11D3423F3971B4D7A2BBDA538E47998BE901199546B36455315F22D3FC8B8A04`. Valid signature. GPL/MIT-style free licence.
- Author warns ImDisk is old and may have issues on new Windows. It worked here.
- Files live in `C:\Users\icaro\Setup\ramdisk`: `ramdisk-setup.ps1`, `ramdisk-create.ps1`, `ramdisk-rollback.ps1`, `temp-original.txt`, `ramdisk.log`, installer and zip.
- Setup runs elevated. It installs the driver, makes a 4 GB NTFS RAM disk at `R:`, creates `R:\Temp`, and points BOTH machine and user TEMP/TMP to `R:\Temp`.
- Startup task `ER RAM Temp Disk` runs `ramdisk-create.ps1` at boot as SYSTEM. So `R:` returns after reboot.
- Safety net: if `R:` fails, `ramdisk-create.ps1` puts machine TEMP back to `C:\WINDOWS\TEMP`.
- `temp-original.txt` holds the original values for rollback. Run `ramdisk-rollback.ps1` elevated to undo.
- I added this as section 7 in `C:\Users\icaro\Setup\reconstruct-setup.ps1`.
- Verified: machine and user TEMP both `R:\Temp`. R: is 4 GB. Write test passed. BOINC still runs.
- I added `R:\Build` as a compilation workspace. `ramdisk-create.ps1` creates it at boot as well. It has a README. Write test passed. Source and build output there are fast but vanish at shutdown. Copy finished files to disk.

## 15. Open points

- No website code was changed.
- Extra Console browser tabs are still open, by the reader's choice.
- The coding course stays AGPL-3.0. Keep the footer in every lesson.
- The course table in `learn/coding-course/README.md` ends at lesson 15. Lessons 16 to 26 are missing there. Not changed — no instruction given.
- Always say "not yet tested with real users" for project and AROS claims.
