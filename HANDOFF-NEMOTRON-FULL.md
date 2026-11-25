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
- Real AROS One 1.3 (64 Bit, ABIv11) is now described in `outreach/apps/aros-one.html`. It comes from the official AROS One page. The ZIP is kept outside the repo in `C:\Users\icaro\Setup\aros-one\`.
- ZIP SHA-256: `E8E0E98ED9D5B3949974199249952BB0985294BA8779C753AE8BDEF068961351`. ISO SHA-256: `E0ADDB07B910ADD52BD580AA370EBE1B861AE37FBA4F8F8DF12D2DCD1DC80473`. ISO name: `AROS One 64Bit.iso`. Valid ISO 9660 with El Torito. QEMU started with it; desktop not checked.
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

## 16. RAM disk rebuilt (20 Nov 2026)

- After a reset, `R:`, the ImDisk service, the boot task and the whole `C:\Users\icaro\Setup` folder were gone. TEMP/TMP were back at their old values.
- The user asked for a safe rebuild. Choice: full setup with a persistent link for `%TEMP%\opencode`.
- New folder: `C:\Users\icaro\Setup\ramdisk`. It holds `ramdisk-setup.ps1`, `ramdisk-create.ps1`, `ramdisk-rollback.ps1`, `temp-original.txt`, `ramdisk.log`, `README.md` and the verified installer files.
- Official ImDisk downloads were checked by SHA256 and Authenticode signature. Hashes are pinned in `ramdisk-setup.ps1`.
- The disk is **virtual-memory backed** (`imdisk -a -t vm -s 4G`). It does not lock 4 GB of physical RAM. It is still volatile: all files vanish at shutdown.
- `R:\Temp` is machine and user TEMP/TMP. `R:\Build` is a scratch build folder with a README. `R:\Temp\opencode` is a junction to `C:\Users\icaro\AppData\Local\Temp\opencode`, so session tools survive a reset.
- If creation fails, `ramdisk-create.ps1` writes the old TEMP/TMP values back. `ramdisk-rollback.ps1` can undo the change; it only removes `R:` when `-RemoveDrive` is passed.
- Verified now: `R:` is 4 GB and writable, ImDisk service runs, machine/user TEMP/TMP are `R:\Temp`, junction exists, boot task `ER RAM Temp Disk` is Ready with trigger `At startup` as SYSTEM.
- Not verified: no reboot was done. The boot task has never actually run. Node.js was missing at this point.

## 17. Node.js installed (20 Nov 2026)

- The user asked for Node.js to enable fast offline compilation.
- Installed Node.js **v26.13.1 LTS (Lithium)**, x64, from `https://nodejs.org/dist/v26.13.1/node-v26.13.1-x64.msi`.
- SHA256 from the official `SHASUMS256.txt`: `0398ced8446e119478c724d1aa37c5afd6aa1a76fceab12787eb9714c5ed8b45`. Local file matched.
- Authenticode signature valid. Signer: OpenJS Foundation.
- Installer in `C:\Users\icaro\Setup\nodejs\installer`. Silent install, exit code 0.
- Verified: `node -v` = v26.13.1, `npm -v` = 11.20.0, `where node` finds `C:\Program Files\nodejs\node.exe`.
- `tools/self-engineer.mjs` now starts, but stops at check 4 with `spawnSync git ENOENT`. `git.exe` is not installed.
- These checks pass without Git: checker tests (29), local links (229, 0 broken), WASM kernel, CGI, Google login, GitHub login, Amiga formats, Paula engine.
- `wat2wasm` was also missing at that point.

## 18. Git and WABT installed, full check green (20 Nov 2026)

- User said "Install". Installed Git for Windows **2.56.1** and WABT **1.0.42**.
- Git: official release asset `Git-2.56.1-64-bit.exe`. SHA256 `c330c72e10b408cc39994bfefdb63542b0d93d21699325c3e0bd874af8a5a559`. Authenticode valid, signer Johannes Schindelin. Silent install, exit 0.
- WABT: official release `wabt-1.0.42-windows-x64.tar.gz`. SHA256 `62f1eb2b51aa57cf0f0b8ba333bf2c72a049930aa9c5de01dcad271c4fe48c88`, matched the release `.sha256` file. Extracted to `C:\Users\icaro\Setup\wabt`.
- Machine environment variable `WAT2WASM` now points to `C:\Users\icaro\Setup\wabt\wabt-1.0.42\bin\wat2wasm.exe`, so `field-generator/build-wasm.mjs` works without edits.
- Verified: `git --version` = 2.56.1.windows.1, `wat2wasm --version` = 1.0.42.
- `node tools/self-engineer.mjs` now passes all 13 checks: `SELF-ENGINEERING OK`.
- Offline rebuild test in `R:\Build\field.wasm` produced the same SHA256 as the committed `field-generator/field.wasm` (`60b964ab26abee3dde96378e18255b064a5ce859bc846a689338f01c90510c80`). No project file was changed.
- Still not verified: no reboot was done. The `ER RAM Temp Disk` boot task has not run yet. Not tested with real users.

## 19. Offline AI and the other PC (20 Nov 2026, in progress)

- User asked for "AI Offline Capability". Chose a local model for OpenCode. OpenCode V2 auto-discovers a local Ollama at `127.0.0.1:11434`; no config edit is needed.
- User then asked for private network capability. Chose **LAN now, internet later**. Plan: `OLLAMA_HOST=0.0.0.0:11434` plus a Windows Firewall rule `ER Ollama LAN` allowing TCP 11434 only from `192.168.0.0/24` to local IP `192.168.0.137`. Script is at `C:\Users\icaro\Setup\ollama\ollama-lan.ps1`. Not run yet.
- Ollama was not installed. Official `OllamaSetup.exe` is 1,857,663,944 bytes (about 1.86 GB). Two `Invoke-WebRequest` attempts timed out and left unsigned partial files. Switched to `curl.exe -L -C - --retry 10`, resumable. Verified by Authenticode before install.
- Hardware for model choice: 47.9 GB RAM, 38.9 GB free, Xeon E5-2683 v3 (14 cores / 28 threads), NVIDIA Quadro K4000 with 3 GB VRAM. The Quadro is compute capability 3.0, below Ollama's 5.0 GPU minimum. Inference will be **CPU only**. Choose a small coding model.
- The other PC is `192.168.0.40`, name `QBITXEONWOZI489`, NetBIOS workgroup `WORKGROUP`, reachable by ping. SMB ports 139 and 445 are open but `net view` and UNC access return **Access denied**. No saved credentials. Both PCs have a local account named `icaro`, but they are different identities.
- Analysis of the other PC (read-only script `C:\Users\icaro\Setup\opencode-analyze-other-pc.ps1`): no `opencode` in PATH, no OpenCode install folder, no running OpenCode process, Node.js missing. Only `C:\Users\icaro\.config\opencode\service.json` (64 bytes) exists. It can reach this PC on port 445; port 11434 is closed as expected. So there is **no OpenCode client installed on the other PC**.
- User said they would restart both PCs. They did not: this PC last booted `20:10:36`, before the RAM disk was made at `20:49:05`. Only the OpenCode server restarted. The `ER RAM Temp Disk` boot task is still untested.
- `R:` still holds the original 20:49 ready marker. Nothing was lost.

## 20. Tools, OneDrive and RAM disk restored (22 Nov 2026)

- After another reset, `node`, `git`, the RAM disk and `C:\Users\icaro\Setup` were gone again.
- OneDrive placeholders in the project folder could not be read. Error: "Der Clouddateianbieter wird nicht ausgeführt". A OneDrive restart followed by `OneDrive.exe /reset` made the files readable again. No project file was changed by that.
- Installed portable Node.js **v24.22.3** at `%TEMP%\opencode\node-v24.22.3-win-x64`. The global PATH was not changed.
- Installed Git for Windows **2.56.1** with winget.
- `node tools/self-engineer.mjs` now passes all 13 checks: `SELF-ENGINEERING OK`.
- Rebuilt `C:\Users\icaro\Setup\ramdisk` with `ramdisk-setup.ps1`, `ramdisk-create.ps1`, `ramdisk-rollback.ps1`, `temp-original.txt`, `README.md`, log and the verified installer.
- The ImDisk installer SHA256 matched `11D3423F3971B4D7A2BBDA538E47998BE901199546B36455315F22D3FC8B8A04`. The Authenticode signature was valid. Silent install exited 0.
- `R:` is 4 GB NTFS and virtual-memory backed. Machine and user TEMP/TMP are `R:\Temp`. `R:\Build` and the `R:\Temp\opencode` junction exist. Write test passed.
- Boot task `\ER RAM Temp Disk` is Ready, enabled and set to run as SYSTEM at startup. Last result 267011 means it has never run.
- Not verified: no reboot since this rebuild. Not tested with real users.
- The public start page loaded with no console errors. All browser tabs were closed again.

## 21. Tiny AROS integration (23 November 2026)

The user chose "Both, if obtainable": the archived i386 Live CD and the
newer x86_64 1.3 package if it can be recovered.

### What was found

- Tiny AROS is a real distribution based on AROS.
- The old official domain `www.tinyaros.it` is now for sale.
- `https://tinyaros.flazio.com/` and `https://tinyarosdistro.flazio.com/`
  return HTTP 404.
- The Wayback Machine has the old distro page. Archived snapshot:
  `https://web.archive.org/web/20260410220021id_/https://tinyarosdistro.flazio.com/`
- That page names two builds: `TinyAros 32 bit - v3.5` and
  `TinyAros X86_64v11 - 1.3`. It says to install a base core first,
  then overwrite it with the TinyAros core package.
- The 32-bit base link on that page is an AXRT AROS i386 boot ISO:
  `https://www.axrt.org/download/aros/v0/AROS-20250313-1-pc-i386-boot-iso.zip`
- The 32-bit core link was
  `https://drive.google.com/file/d/13VO5A_jO-VJQpHuw8ZFL8cAZlWN4txGs/view?usp=sharing`.
  It returns 404.
- The 64-bit base link was
  `https://drive.google.com/file/d/1W7xdP8WmO8l3kMz-BzddqIsb90vmRlqe/view?usp=sharing`.
  It returns 404.
- The 64-bit core link was
  `https://drive.google.com/file/d/1klGPsEfhjmHOxTdz5HuTuKV_Nzt6J_4i/view?usp=sharing`.
  It returns 404.
- All other core and development-tool links tested from that page are dead.
  Only old Games Pack 1 to 5 files still exist on Google Drive.
- AROSWorld forum post 339, dated 15 November 2026, says the maintainer
  is still waiting before releasing the 64-bit distribution.
  Source:
  `https://arosworld.org/infusions/forum/viewthread.php?thread_id=1105&rowstart=320`

### What is obtainable

- ArchiveOS keeps a real Tiny AROS Live CD for i386:
  `https://archiveos.org/tiny-aros/`
  `https://sourceforge.net/projects/archiveos/files/t/tiny-aros/AROS-Live-CD.zip`
- ArchiveOS lists the ZIP as "Tiny AROS LiveCD i386 297MB.iso.zip".
- ArchiveOS gives MD5 `5e898dbdcb5f134b1aec7bcb6a819691` for the ZIP.
- Local folder: `C:\Users\icaro\Setup\tinyaros\`.

### Honest wording

- Say "archiviertes 32-Bit-Abbild". Do not call it the current release.
- Say the 64-bit package is "nicht verfügbar", not "coming soon".
- AROS base licence is APL. Extra programs in the image have licences that
  were not checked one by one. Say that plainly.
- Not tested with real users.

### WSL source build, still running at this point

- Ubuntu 22.04 runs as WSL version 1. Hardware virtualisation is disabled.
- AROS source is cloned at `/root/arosbuilds/AROS`.
- Build tree: `/root/arosbuilds/build-pc-x86_64`.
- Command: `make -j16 bootiso`.
- Log: `/root/arosbuilds/build-bootiso.log`.
- Exit marker: `/root/arosbuilds/build-bootiso.exit`
  (`BUILD_OK` or `BUILD_FAIL`).
- Check the marker and any `*.iso` in the build tree before claiming success.

## 22. AROS One i386 and Tiny AROS integration (23 November 2026)

### AROS One 32-bit

- The official site is `https://sites.google.com/view/arosone`.
- It lists `AROS One ABIv11 64Bit v1.3` and `AROS One ABIv0 32Bit v2.9`.
- The 32-bit download is therefore version 2.9, not 1.3.
- Official label: `ArosOne-v2.9-ISO-DVD-32Bit`.
- Google Drive ID: `1tqDJHBljqkiBQToifoclAywV_oKvUD8y`.
- Direct download used:
  `https://drive.usercontent.google.com/download?id=1tqDJHBljqkiBQToifoclAywV_oKvUD8y&export=download&confirm=t`
- Local folder: `C:\Users\icaro\Setup\aros-one\`.
- ZIP `AROS-One-v2.9-ISO-DVD-32Bit.zip`
  size `1995761955`, MD5 `9465cb253652e0d2853d69efe7a18703`,
  SHA-256 `819F5EC5919C68514A3E9C2D1A01E96C95C1B4CC3BD0F505F4C8CF714885B00D`.
- ISO `ArosOne-ISO-v2.9-x86_32Bit.iso`
  size `4275406848`, MD5 `3a1898c3f403f291e5ba937629b5f088`,
  SHA-256 `234C97B242232A442C1014810FCB0660B0E2B624D75308469CB0BAC4FE79F657`.
- ZIP integrity passed. `isoinfo` reports ISO 9660 and El Torito arch 0 (x86).
- QEMU command:
  `qemu-system-i386 -accel tcg -m 1024 -cdrom "ArosOne-ISO-v2.9-x86_32Bit.iso" -boot d`
- QEMU showed a graphical screen with many blue tones. The desktop was not
  checked. Not tested with real users.

### Tiny AROS verification

- ZIP `AROS-Live-CD.zip` size `304302899`,
  MD5 `5e898dbdcb5f134b1aec7bcb6a819691`,
  SHA-256 `AF9D5339065DC8160F0DEA7B0864E30D2F58555CBABD1BDFF7903A6E52DF9FFD`.
- ISO `AROS Live CD.iso` size `650272768`,
  MD5 `66ac57abcccc9d251a5d97b4eecc8221`,
  SHA-256 `e1c7eba915d32869376eef37a9b724985f7a65ffa987ecd12c24dd034e25d9c8`.
- `isoinfo` reports system id `AROS-i386-pc`, volume id `AROS Live CD`,
  ISO 9660 and El Torito arch 0 (x86).
- QEMU command:
  `qemu-system-i386 -accel tcg -m 512 -cdrom "AROS Live CD.iso" -boot d`
- QEMU reached GRUB and then showed a graphical screen. The desktop was not
  checked. Not tested with real users.

### Files changed

- `outreach/apps/aros-one.html` now describes both 64-bit 1.3 and 32-bit 2.9.
- `outreach/apps/tiny-aros.html` is new and labels the image as archived.
- `site/index.html` and `site/store.html` have updated AROS One cards and
  a Tiny AROS card.
- `outreach/apps/alle-spiele.html` has 29 entries and includes Tiny AROS.
- `LEGAL-STATUS.md`, `THIRD-PARTY-NOTICES.md` and both handoff files are updated.
- `learn/coding-course/18-aros.md` links to the two pages and names all three
  QEMU boot checks. This file is inside the AGPL-3.0 coding course.

### Honest wording

- Say "echte Abbilder" for AROS One. Say "archiviertes Abbild" for Tiny AROS.
- Say "64 Bit ist nicht verfügbar" for Tiny AROS.
- Never say "accessible" or "user-tested". Say "not yet tested with real users".

### WSL source build — succeeded, 23 November 2026

- First attempt: `make -j16 bootiso` only. It failed at GRUB 2.16 `configure`.
  `x86_64-aros-ld` could not find `-lutility`, `-loop`, `-lexec`,
  `-lautoinit` and `-llibinit`. No AROS target libraries had been built.
- Fix 1: follow the AROS nightly script order. Run the full `make -j16`
  first, then `make -j16 bootiso`.
- Second attempt: full `make -j16`. It failed in `rom/security` because the
  78 catalog submodules were missing. Fix 2:
  `cd /root/arosbuilds/AROS && git submodule update --init --recursive`.
- Final run: full `make -j16` then `make -j16 bootiso`. Both markers say
  `BUILD_OK`. Logs: `/root/arosbuilds/full-build.log` (13,808 lines) and
  `/root/arosbuilds/build-bootiso.log`.
- Build tree `/root/arosbuilds/build-pc-x86_64`. Source `/root/arosbuilds/AROS`
  at commit `5d55abdcb84d819a9e42eb4f6174ac6707c67516`.
- Configure line:
  `/root/arosbuilds/AROS/configure --target=pc-x86_64 --enable-ccache --enable-build-type=nightly`
- ISO `aros-pc-x86_64.iso`, size `723238912`,
  MD5 `f8820450eb76f3bc59a99a0aa2181aa0`,
  SHA-256 `846e83448187506f171b851949f29270cf37aed084501c067161b9e2c917d9a0`.
  It is in `/root/arosbuilds/build-pc-x86_64/distfiles/` and copied to
  `C:\Users\icaro\Setup\aros-source\`.
- `isoinfo`: ISO 9660, system id `AROS-X86_64-PC`, volume id `AROS Live CD`,
  El Torito arch 0 (x86), bootable.
- QEMU command:
  `qemu-system-x86_64 -accel tcg -m 2048 -cdrom "aros-pc-x86_64.iso" -boot d`
- QEMU reached the Wanderer desktop. Icons: RAM Disk, AROS Live CD,
  Install AROS. The desktop was checked by me. Not tested with real users.
- New page `outreach/apps/aros-source.html`. Start and store cards link to it.
  The quiz list has 30 entries. Legal notes are updated.
- The wrapper that ran the build was killed twice by tool timeouts and once
  by a server restart. The final run was detached with `nohup setsid` from
  `/root/arosbuilds/run-build.sh`. This is why the build survived.

## 24. OpenCode and AROS (25 November 2026)

- User asked to integrate OpenCode into AROS. I clarified the request and the
  user chose "try to run OpenCode inside AROS".
- Result: not feasible as a direct install. No fake port was attempted.
- OpenCode 2 binaries are published for Linux x64 (glibc and musl), macOS and
  Windows. The npm install route needs Node.js. No AROS binary is published.
  A Linux ELF binary cannot run on AROS: AROS implements the AmigaOS API,
  not the Linux ABI.
- Official AROS FAQ lists Python, Regina, Lua and Hollywood as native
  languages. There is no official Node.js. The local source tree at
  `5d55abdc` has no `node` or `nodejs` component.
- Experimental `terminills/aros-web` provides a Node 22 library for AROS.
  It needs an ADT tree, a matching SDK and patched Chromium 124. Its README
  says compile, hosted, QEMU and hardware results are different. It does not
  claim to run OpenCode.
- OpenCode also needs a background HTTP service, SQLite, TLS/network and a
  truecolor terminal. These are not available in current AROS.
- Any claim of OpenCode running inside AROS is "nicht belegt".
- New page `outreach/apps/opencode-aros.html` explains this in Easy Read.
  Start and store cards link to it. Lesson 18 links to it.
  The quiz list now has 31 entries. No secret or API key is in the project.
