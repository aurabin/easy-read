# Handoff note — for Nemotron

Date: 19 November 2026.

## What this file is

This file carries the knowledge from this session to a Nemotron session.
I cannot copy my knowledge into another model directly.
A new session can read this file and start here.

## Reader rules — keep these

- Write in Easy Read. Short sentences. Everyday words. Active voice.
- The reader uses English. Keep the whole answer in English.
- Say "not yet tested with real users" for project claims. Never say "accessible".
- Written contact only. No camera, no calls, no personal presence.
- Avoid "Down Syndrome" and "disabled" in project copy.
- Keep the joke in `learn/joke.md`: „Mir reichts! Ich geh schaukeln! Meine Freunde gehen rutschen!"
- Kids course name: "AI Coding Course for ALL Kids!".
- "0+" means no prior knowledge. It does not mean a children's book.
- The coding course is AGPL-3.0. The rest of the project is MIT / CC0 or CC BY.
- `virtual_field_generator/` is secret and local only. Never delete it. Never publish it.
- `docs/` is generated. Never edit it directly. Run `node field-generator/build-docs.mjs` after changes in `field-generator/` or `site/`.
- Run `node tools/self-engineer.mjs` at the start and the end of a work session.
- Check your own answer with the Easy Read checker before you send it.

## OpenCode and Go status

- GitHub repo: `aurabin/easy-read`. Public. Default branch `master`.
- Git is portable at `C:\Users\icaro\AppData\Local\Temp\opencode\PortableGit\cmd\git.exe`. It is on the User PATH.
- Go subscription: active. Workspace `QBit`. Renews 16 December 2026.
- The client connection problem is fixed. The CLI said "Connected to OpenCode Console".
  `auth list` shows "OpenCode Console  QBit  stored".
- The client now sees 25 Go models. They start with `opencode-go/`.
- I set the default model in `opencode.jsonc` to `opencode-go/claude-haiku-5-5`.
  Note: the current chat still uses the free `opencode/big-pickle`. A new session uses the Go model.
- I set a monthly budget of 10 US dollars in Console, Controls. The audit shows "Created budget".
- Console shows 3 of 3 required Go steps done. The optional budget step is done too.

## AROS setup — active work

Goal: really set up and run real AROS on this Windows computer.

What I found:

- The files `docs/media/AROS-One-RAM.img` and `.qcow2` are a SIMULATION. They are not real AROS. Do not treat them as real.
- `aros.org` has a TLS certificate error on this computer. SourceForge works.
- A real, fresh AROS nightly build exists, dated 18 November 2026.

Exact download:

- URL: `https://downloads.sourceforge.net/project/aros/nightly2/20261118/Binaries/AROS-20261118-pc-x86_64-boot-iso.zip`
- Size: 198,497,484 bytes (about 198.5 MB).
- Expected MD5: `93fd26067e9051b116972bfa49ad29f8`.
- Save folder: `C:\Users\icaro\AppData\Local\Temp\opencode\aros-setup`.

QEMU:

- Installed with:
  `winget install --id SoftwareFreedomConservancy.QEMU --exact --source winget --accept-package-agreements --accept-source-agreements --disable-interactivity`
- The `--source winget` part is needed. Without it, the Microsoft Store source gives certificate error `0x8a15005e`.
- Version 11.1.0. Installer came from `qemu.weilnetz.de`. winget said "Successfully installed".

Launcher script I wrote:

- `C:\Users\icaro\AppData\Local\Temp\opencode\aros-setup\start-aros.ps1`
- It finds `.iso` in that folder, finds `qemu-system-x86_64.exe`, then runs:
  `qemu-system-x86_64.exe -m 1024 -cdrom <iso> -boot d -net none`
- It uses `Start-Process`. This matters. A plain shell call gets killed when the shell times out. `Start-Process` lets QEMU keep running on its own.

Next steps:

1. Let the AROS ZIP download finish.
2. Check the MD5 matches `93fd26067e9051b116972bfa49ad29f8`.
3. Unzip it into the `aros-setup` folder.
4. Run `start-aros.ps1` to boot real AROS in QEMU. It starts QEMU detached, so a shell timeout will not kill it.
5. Tell the reader what they should see. Stay honest: not tested with real users.
6. Later update: the download and unpack are done. QEMU is running detached with PID 22308. Nemotron confirmed it read this handoff file.

Background jobs at handoff time:

- AROS ZIP download: shell id `sh_1f27f08a1001KCTOybfKQV7EFD`.
- QEMU install check: shell id `sh_1f27fd94d001x5ZUgluXTLI5dX`.
Do not poll them. Wait for the completion notices.

## Open points

- No website code was changed in this session.
- Browser tabs from the Console work are still open. The reader said to leave them.
- Git changes from before this session were not committed by me. The tree was already dirty.
- The AROS lesson files 18, 25 and 26 exist but are not committed.
