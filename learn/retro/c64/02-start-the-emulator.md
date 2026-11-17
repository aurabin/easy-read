# Lesson 2: Start the emulator

**Time:** 10 minutes. **You need:** a Windows, Mac, or Linux computer.

We use **VICE**. It is free and open source.
VICE includes the C64 ROM files. You do not need to find them.

## Steps

1. Open https://vice-emu.sourceforge.io/ in your browser.
2. Find the download page.
3. Download the build for your system. On Windows, take the GTK3 package.
4. Unzip the file. Do not run it from inside the zip.
5. Open the folder.
6. Start **x64sc.exe**. This is the accurate C64 emulator.
   - If x64sc does not start, try **x64.exe**.
7. Click inside the window, so the keyboard works.

## What you should see

- A blue screen.
- A darker blue border.
- Text like this:

```text
    **** COMMODORE 64 BASIC V2 ****

 64K RAM SYSTEM  38911 BASIC BYTES FREE

READY.
```

The cursor blinks under `READY.`

## If it does not work

- **The window is black:** wait 5 seconds. Then press a key.
- **Keys type the wrong letters:** the C64 keyboard is different. Look for a
  keyboard map setting in VICE. Choose the symbolic or positional map.
- **SmartScreen blocks it:** the file is unsigned. Check that you downloaded
  it from vice-emu.sourceforge.io. Then allow it.
- **No sound:** check the VICE sound settings. Sound is not needed for
  lessons 3 and 4.

## Try this

1. Press **Esc** once. Nothing bad happens.
2. Type `READY.`? No. Do not type it. It is already there.
3. Type one letter. Then press Backspace.

## Ask me

Ask the agent: "Why does the C64 show 38911 free bytes, not 65536?"
