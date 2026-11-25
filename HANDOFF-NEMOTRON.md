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
- Real AROS One 1.3 (64 Bit, ABIv11) is now described in `outreach/apps/aros-one.html`. It comes from the official AROS One page. The ZIP is kept outside the repo in `C:\Users\icaro\Setup\aros-one\`.
- ZIP SHA-256: `E8E0E98ED9D5B3949974199249952BB0985294BA8779C753AE8BDEF068961351`. ISO SHA-256: `E0ADDB07B910ADD52BD580AA370EBE1B861AE37FBA4F8F8DF12D2DCD1DC80473`. ISO name: `AROS One 64Bit.iso`. Valid ISO 9660 with El Torito. QEMU started with it; desktop not checked.
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

## Update 23 November 2026 — Tiny AROS

The user chose "Both, if obtainable".

- Tiny AROS is a distribution based on AROS. The old official site
  `www.tinyaros.it` is now a domain-for-sale page. The Flazio pages
  return 404. Archived pages are in the Wayback Machine.
- A real archived i386 Live CD is available from ArchiveOS:
  `https://sourceforge.net/projects/archiveos/files/t/tiny-aros/AROS-Live-CD.zip`
  ArchiveOS page: `https://archiveos.org/tiny-aros/`
  ArchiveOS MD5 for the ZIP: `5e898dbdcb5f134b1aec7bcb6a819691`.
  Local folder: `C:\Users\icaro\Setup\tinyaros\`.
- The 64-bit package is NOT obtainable. The archived official page listed
  two Google Drive files: `1W7xdP8WmO8l3kMz-BzddqIsb90vmRlqe` (Core Base)
  and `1klGPsEfhjmHOxTdz5HuTuKV_Nzt6J_4i` (Core). Both return 404.
  The 32-bit core link is also dead. Only old game packs still exist.
  The maintainer wrote in November 2026 that he is still waiting for a
  new 64-bit base build.
- Do not claim a 64-bit Tiny AROS image exists here. Write "nicht verfügbar".
- New page: `outreach/apps/tiny-aros.html`. It labels the image as archived.
  It credits ArchiveOS, SourceForge, AROS and the Wayback Machine.

## Update 23 November 2026 — AROS One i386

- The official AROS One site is `https://sites.google.com/view/arosone`.
- The real 32-bit release is AROS One v2.9, ABIv0. It is not v1.3.
- Official label: `ArosOne-v2.9-ISO-DVD-32Bit`.
- Google Drive ID: `1tqDJHBljqkiBQToifoclAywV_oKvUD8y`.
- Local folder: `C:\Users\icaro\Setup\aros-one\`.
- ZIP `AROS-One-v2.9-ISO-DVD-32Bit.zip`
  size `1995761955`, MD5 `9465cb253652e0d2853d69efe7a18703`,
  SHA-256 `819F5EC5919C68514A3E9C2D1A01E96C95C1B4CC3BD0F505F4C8CF714885B00D`.
- ISO `ArosOne-ISO-v2.9-x86_32Bit.iso`
  size `4275406848`, MD5 `3a1898c3f403f291e5ba937629b5f088`,
  SHA-256 `234C97B242232A442C1014810FCB0660B0E2B624D75308469CB0BAC4FE79F657`.
- It is a valid ISO 9660 DVD with El Torito x86. QEMU started it with
  `qemu-system-i386 -accel tcg -m 1024 -cdrom "ArosOne-ISO-v2.9-x86_32Bit.iso" -boot d`.
  A graphical screen appeared. The desktop was not checked. Not tested with real users.
- Tiny AROS verification is complete. ZIP size `304302899`,
  SHA-256 `AF9D5339065DC8160F0DEA7B0864E30D2F58555CBABD1BDFF7903A6E52DF9FFD`.
  ISO size `650272768`, SHA-256
  `e1c7eba915d32869376eef37a9b724985f7a65ffa987ecd12c24dd034e25d9c8`.
- Both pages are updated: `outreach/apps/aros-one.html` and
  `outreach/apps/tiny-aros.html`. Start and store cards link to them.
  The quiz list has 29 entries. Legal notes and handoff files are updated.
  Lesson 18 is changed, so remember the coding course is AGPL-3.0.

## Source build (23 November 2026)

- First try: `make -j16 bootiso` alone. It failed.
  GRUB 2.16 `configure` could not link. The AROS target libraries were missing.
- Second try: the full `make -j16` first. It failed in `rom/security`.
  The 78 catalog submodules were missing. Fixed with
  `git submodule update --init --recursive` in `/root/arosbuilds/AROS`.
- Final try: full `make -j16`, then `make -j16 bootiso`. **Both markers say `BUILD_OK`.**
- Build tree: `/root/arosbuilds/build-pc-x86_64`.
- Source: `/root/arosbuilds/AROS`, commit `5d55abdc`.
- Configure line:
  `../AROS/configure --target=pc-x86_64 --enable-ccache --enable-build-type=nightly`
- ISO: `/root/arosbuilds/build-pc-x86_64/distfiles/aros-pc-x86_64.iso`
  size `723238912`, MD5 `f8820450eb76f3bc59a99a0aa2181aa0`,
  SHA-256 `846e83448187506f171b851949f29270cf37aed084501c067161b9e2c917d9a0`.
- Local copy: `C:\Users\icaro\Setup\aros-source\aros-pc-x86_64.iso`.
- `isoinfo` reports `AROS-X86_64-PC`, volume `AROS Live CD`, El Torito x86.
- QEMU showed the Wanderer desktop with RAM Disk, AROS Live CD and
  Install AROS icons. I checked the desktop. Not tested with real users.
- New page: `outreach/apps/aros-source.html`. Cards and quiz link to it.
