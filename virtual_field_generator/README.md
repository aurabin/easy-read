# Virtual Field Generator — KolibriOS Core

A small, themed Python control console that boots the **real KolibriOS**
operating system inside a QEMU virtual machine. It has no third-party
dependencies — only the Python standard library (`tkinter` for the GUI).

```
┌──────────────────────────────────────────────────────────────┐
│  ◆  VIRTUAL FIELD GENERATOR                       ● ACTIVE   │
│  KOLIBRI-OS CORE // VIRTUAL MACHINE CONTAINMENT FIELD        │
├──────────────────────────────┬───────────────────────────────┤
│                              │ 01 // KOLIBRIOS IMAGE         │
│      ◎   containment field   │ 02 // QEMU HYPERVISOR         │
│         visualizer           │ 03 // FIELD PARAMETERS        │
│                              │ ⚡ ENGAGE FIELD                │
├──────────────────────────────┴───────────────────────────────┤
│ FIELD TELEMETRY ............................... FIELD ACTIVE │
└──────────────────────────────────────────────────────────────┘
```

## What it does

- Detects `qemu-system-i386` on your system (PATH + common install folders).
- Downloads the newest official KolibriOS floppy image from
  <https://kolibrios.org/en/download> (with a fallback direct URL).
- Lets you tune "field parameters" that map to real QEMU options:
  memory, CPU cores, video card, and network.
- Boots KolibriOS in a QEMU window while the console shows a live
  animated containment field and streams QEMU telemetry into the log.

## Requirements

| Requirement | Notes |
|---|---|
| Python 3.8+ | Must include `tkinter` (standard on Windows/macOS and most Linux desktop Python packages). On Windows, install from <https://www.python.org/downloads/> and tick **"Add Python to PATH"** during setup. |
| QEMU | Provides `qemu-system-i386`. See install notes below. |
| Internet | Only needed once, to download the ~1.5 MB KolibriOS image. |

### Installing QEMU

**Windows**

```powershell
winget install --id QEMU.QEMU
```

or grab an installer from <https://qemu.weilnetz.de/w64/>. Make sure the
install directory (e.g. `C:\Program Files\qemu`) is on your `PATH`, or use
the **…** button in the QEMU section of the app to browse to
`qemu-system-i386.exe`.

**macOS**

```bash
brew install qemu
```

**Linux (Debian/Ubuntu)**

```bash
sudo apt update && sudo apt install qemu-system-x86
```

## Run it

```bash
# Graphical console
python field_generator.py

# Check whether QEMU and the image are ready
python field_generator.py --check

# Download the image only
python field_generator.py --download

# Headless: download if needed, then boot KolibriOS
python field_generator.py --engage
```

> On some Windows installs the launcher is `py` instead of `python`, e.g.
> `py field_generator.py`.

## Using the console

1. Press **DOWNLOAD / REFRESH IMAGE** (the app writes `images/kolibrios.img`).
2. Confirm the hypervisor shows a green "detected" status.
3. Optionally adjust memory / cores / video / network.
4. Press **⚡ ENGAGE FIELD**. KolibriOS boots in the QEMU window.
5. Press **■ DISENGAGE** to stop the VM, or **↻ RESET** to clear telemetry.

Settings are saved to `config.json` next to the script.

## Advanced

The **EXTRA QEMU ARGS** field is parsed with shell-style splitting and
appended verbatim to the QEMU command. Examples:

```
-audiodev none                       # disable audio
-rtc base=localtime                  # local RTC
-usbdevice tablet                    # USB tablet mouse
```

You can also pin a specific image with `download_url` in `config.json`.

## Troubleshooting

- **"QEMU not found"** — install QEMU (above) and restart the app, or set the
  path manually in the QEMU section.
- **Download fails** — the app scrapes the official download page for the
  newest `.img` link and falls back to a known build URL. You can set
  `download_url` in `config.json` or download the image yourself and use
  **…** to select it.
- **QEMU opens but no boot** — try `cirrus` video, reduce memory, and check
  that the selected file really is a KolibriOS `.img` floppy image.
- **No network in KolibriOS** — the default is NE2000 PCI; you can remove or
  replace it via extra args (e.g. `-device rtl8139,netdev=vfg0`).

## Files

```
virtual_field_generator/
├── field_generator.py   # the whole application
├── config.json          # created on first launch / save
└── images/
    └── kolibrios.img    # downloaded on demand
```

KolibriOS is distributed under the GPLv2 license. This wrapper is provided
as-is.
