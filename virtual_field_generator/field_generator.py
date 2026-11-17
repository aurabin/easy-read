#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VIRTUAL FIELD GENERATOR  --  KolibriOS Core
===========================================

A small, dependency-free Python application that presents a sci-fi
"field generator" control console and boots the real KolibriOS operating
system inside a QEMU virtual machine.

The app uses only the Python standard library (tkinter for the GUI), so
there is nothing to pip-install.

Usage
-----
    python field_generator.py            # launch the graphical console
    python field_generator.py --check    # check QEMU / image / platform
    python field_generator.py --download # download the KolibriOS image only
    python field_generator.py --engage   # headless: download (if needed) + boot
    python field_generator.py --cli      # alias for --engage

Requirements
------------
    * Python 3.8+ with tkinter (standard on most desktop installs)
    * QEMU (qemu-system-i386) somewhere on PATH or in a standard install dir
    * Internet access the first time (to fetch the KolibriOS floppy image)

License
-------
    KolibriOS is GPLv2. This wrapper is provided as-is.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import platform
import queue
import re
import shlex
import shutil
import subprocess
import sys
import threading
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext, ttk

# --------------------------------------------------------------------------- #
# Constants
# --------------------------------------------------------------------------- #

APP_NAME = "VIRTUAL FIELD GENERATOR"
APP_SUBTITLE = "KOLIBRI-OS CORE  //  VIRTUAL MACHINE CONTAINMENT FIELD"
APP_VERSION = "1.0.0"

KOLIBRI_DOWNLOAD_PAGE = "https://kolibrios.org/en/download"
# Known-good direct image as of 2026-11. The app prefers scraping the live
# download page for the newest build and falls back to this URL.
KOLIBRI_FALLBACK_IMG = (
    "https://builds.kolibrios.org/ci/0.7.7.0-9254-g62b2b72c/en_US/"
    "kolibrios-0.7.7.0-9254-g62b2b72c-en_US.img"
)
USER_AGENT = "VirtualFieldGenerator/%s (+https://kolibrios.org)" % APP_VERSION

BASE_DIR = Path(__file__).resolve().parent
IMAGES_DIR = BASE_DIR / "images"
CONFIG_PATH = BASE_DIR / "config.json"
IMAGE_PATH = IMAGES_DIR / "kolibrios.img"

DEFAULTS = {
    "qemu": "",
    "image": str(IMAGE_PATH),
    "ram": 128,
    "cores": 1,
    "vga": "std",
    "network": True,
    "extra_args": "",
    "download_url": "",
}

STATE_COLORS = {
    "offline": "#ef4444",
    "ready": "#38bdf8",
    "charging": "#facc15",
    "active": "#4ade80",
}

BG = "#070b14"
PANEL = "#0d1524"
PANEL_2 = "#111c30"
FG = "#d7e6f5"
MUTED = "#7d93ad"
CYAN = "#22d3ee"
GREEN = "#4ade80"
RED = "#ef4444"
YELLOW = "#facc15"


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

def now_stamp() -> str:
    return datetime.now().strftime("%H:%M:%S")


def load_config() -> dict:
    cfg = dict(DEFAULTS)
    try:
        if CONFIG_PATH.is_file():
            data = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
            if isinstance(data, dict):
                for key in cfg:
                    if key in data:
                        cfg[key] = data[key]
    except Exception:
        pass
    return cfg


def save_config(cfg: dict) -> None:
    try:
        CONFIG_PATH.write_text(
            json.dumps(cfg, indent=2, ensure_ascii=False), encoding="utf-8"
        )
    except Exception:
        pass


def find_qemu(explicit: str = "") -> str:
    """Return a usable path to qemu-system-i386, or '' if not found."""
    if explicit and Path(explicit).is_file():
        return str(Path(explicit).resolve())

    exe = "qemu-system-i386.exe" if os.name == "nt" else "qemu-system-i386"
    found = shutil.which("qemu-system-i386")
    if found:
        return found

    candidates = []
    if os.name == "nt":
        roots = [
            os.environ.get("ProgramFiles"),
            os.environ.get("ProgramFiles(x86)"),
            os.environ.get("LOCALAPPDATA"),
        ]
        for root in roots:
            if not root:
                continue
            candidates += [
                Path(root) / "qemu" / exe,
                Path(root) / "QEMU" / exe,
                Path(root) / "Programs" / "qemu" / exe,
                Path(root) / "scoop" / "apps" / "qemu" / "current" / exe,
            ]
    else:
        candidates += [
            Path("/usr/bin") / exe,
            Path("/usr/local/bin") / exe,
            Path("/opt/homebrew/bin") / exe,
        ]

    for candidate in candidates:
        if candidate.is_file():
            return str(candidate)
    return ""


def discover_image_url() -> str:
    """Scrape the official download page for the newest direct .img link."""
    try:
        req = urllib.request.Request(
            KOLIBRI_DOWNLOAD_PAGE, headers={"User-Agent": USER_AGENT}
        )
        with urllib.request.urlopen(req, timeout=25) as resp:
            html = resp.read(3_000_000).decode("utf-8", "ignore")

        links = re.findall(
            r'''(?:href|src)\s*=\s*["']([^"']+\.img(?:\?[^"']*)?)["']''',
            html,
            flags=re.IGNORECASE,
        )
        # Prefer the English build.
        for needle in ("en_US", "en-us", "english", "/eng/"):
            for link in links:
                if needle.lower() in link.lower():
                    return urllib.parse.urljoin(KOLIBRI_DOWNLOAD_PAGE, link)
        if links:
            return urllib.parse.urljoin(KOLIBRI_DOWNLOAD_PAGE, links[0])
    except Exception:
        pass
    return KOLIBRI_FALLBACK_IMG


def download_image(url: str, dest: Path, progress_cb=None, log_cb=None) -> Path:
    """Download the image to dest (atomically via a .part temp file)."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_name(dest.name + ".part")

    def say(msg: str) -> None:
        if log_cb:
            log_cb(msg)

    say("[NET] Requesting image from: %s" % url)
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=90) as resp, open(tmp, "wb") as fh:
        total = int(resp.headers.get("Content-Length") or 0)
        done = 0
        last_pct = -1
        while True:
            chunk = resp.read(65536)
            if not chunk:
                break
            fh.write(chunk)
            done += len(chunk)
            if total and progress_cb:
                pct = min(100, int(done * 100 / total))
                if pct != last_pct:
                    progress_cb(pct)
                    last_pct = pct

    size = tmp.stat().st_size
    if size < 512 * 1024:
        tmp.unlink(missing_ok=True)
        raise RuntimeError(
            "Downloaded file is only %d bytes - it is not a valid disk image." % size
        )

    if dest.exists():
        dest.unlink()
    tmp.replace(dest)
    say("[NET] Image secured: %s (%d bytes)" % (dest, size))
    return dest


def build_command(cfg: dict, image: str, qemu: str) -> list:
    """Build the QEMU invocation that boots the KolibriOS floppy image."""
    cmd = [
        qemu,
        "-name", "Virtual Field Generator - KolibriOS",
        "-m", str(int(cfg["ram"])),
        "-smp", str(int(cfg["cores"])),
        "-fda", image,
        "-boot", "a",
        "-vga", str(cfg["vga"]),
        "-k", "en-us",
    ]
    if cfg.get("network", True):
        # NE2000 PCI is well supported by the KolibriOS network stack.
        cmd += ["-netdev", "user,id=vfg0", "-device", "ne2k_pci,netdev=vfg0"]

    extra = str(cfg.get("extra_args") or "").strip()
    if extra:
        cmd += shlex.split(extra)
    return cmd


def qemu_install_hint() -> str:
    if os.name == "nt":
        return (
            "Install QEMU for Windows, e.g.:\n"
            "  winget install --id QEMU.QEMU\n"
            "or download from https://qemu.weilnetz.de/w64/\n"
            "Then re-open this app (or browse to qemu-system-i386.exe)."
        )
    if platform.system() == "Darwin":
        return "Install QEMU with:  brew install qemu"
    return "Install QEMU with your package manager, e.g.:\n  sudo apt install qemu-system-x86"


# --------------------------------------------------------------------------- #
# VM controller (threaded, callbacks deliver data to the UI safely)
# --------------------------------------------------------------------------- #

class VMController:
    """Owns the QEMU subprocess and streams its output via callbacks."""

    def __init__(self, log_cb, status_cb):
        self._log_cb = log_cb
        self._status_cb = status_cb
        self.proc = None
        self._lock = threading.Lock()

    def is_running(self) -> bool:
        with self._lock:
            return self.proc is not None and self.proc.poll() is None

    def start(self, cmd: list) -> None:
        if self.is_running():
            raise RuntimeError("A field is already active.")

        self._log_cb("[VM] Igniting field core...")
        self._log_cb("[VM] $ " + " ".join(shlex.quote(c) for c in cmd))

        kwargs = dict(
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        if os.name == "nt":
            kwargs["creationflags"] = getattr(subprocess, "CREATE_NEW_PROCESS_GROUP", 0)

        self.proc = subprocess.Popen(cmd, **kwargs)
        self._status_cb("active", "FIELD ACTIVE")

        threading.Thread(target=self._pump_output, args=(self.proc,), daemon=True).start()
        threading.Thread(target=self._watch_exit, args=(self.proc,), daemon=True).start()

    def _pump_output(self, proc) -> None:
        try:
            for line in proc.stdout:
                line = line.rstrip()
                if line:
                    self._log_cb("[QEMU] " + line)
        except Exception as exc:
            self._log_cb("[VM] Output stream closed: %s" % exc)

    def _watch_exit(self, proc) -> None:
        code = proc.wait()
        with self._lock:
            if self.proc is proc:
                self.proc = None
        self._status_cb("offline", "FIELD OFFLINE")
        self._log_cb("[VM] Field collapsed. QEMU exit code: %d" % code)

    def stop(self) -> None:
        with self._lock:
            proc = self.proc
        if proc is None or proc.poll() is not None:
            return
        self._log_cb("[VM] Disengaging field (terminating QEMU)...")
        try:
            proc.terminate()
            try:
                proc.wait(timeout=6)
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait(timeout=3)
        except Exception as exc:
            self._log_cb("[VM] Stop error: %s" % exc)


# --------------------------------------------------------------------------- #
# Graphical console
# --------------------------------------------------------------------------- #

class FieldGeneratorApp:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.cfg = load_config()
        self.vm = VMController(
            log_cb=lambda t: self._post("log", t),
            status_cb=lambda s, t: self._post("status", s, t),
        )
        self.ui_queue = queue.Queue()
        self.state = "offline"
        self.downloading = False
        self.phase = 0
        self.particles = []
        for i in range(26):
            self.particles.append(
                {
                    "angle": (i * 137.5) % 360,
                    "radius": 18 + (i * 11) % 140,
                    "speed": 0.25 + (i % 5) * 0.12,
                }
            )

        self._build_ui()
        self._pump()
        self._animate()

        self._log("SYSTEM // %s v%s online." % (APP_NAME, APP_VERSION))
        self._log("PLATFORM // %s %s" % (platform.system(), platform.release()))
        self._auto_detect()

    # ---------------- UI construction ---------------- #

    def _build_ui(self) -> None:
        self.root.title("%s  //  KolibriOS Core" % APP_NAME)
        self.root.configure(bg=BG)
        self.root.geometry("1120x760")
        self.root.minsize(980, 700)
        self.root.protocol("WM_DELETE_WINDOW", self._on_close)

        style = ttk.Style()
        try:
            style.theme_use("clam")
        except Exception:
            pass
        style.configure(
            "VFG.Horizontal.TProgressbar",
            troughcolor=PANEL_2,
            background=CYAN,
            bordercolor=PANEL_2,
            lightcolor=CYAN,
            darkcolor=CYAN,
        )

        # Header -----------------------------------------------------------
        header = tk.Frame(self.root, bg=PANEL, height=78)
        header.pack(fill="x", side="top")
        header.pack_propagate(False)

        title = tk.Label(
            header,
            text="◆  " + APP_NAME,
            bg=PANEL,
            fg=CYAN,
            font=("Consolas", 20, "bold"),
        )
        title.pack(anchor="w", padx=18, pady=(10, 0))
        subtitle = tk.Label(
            header, text=APP_SUBTITLE, bg=PANEL, fg=MUTED, font=("Consolas", 9)
        )
        subtitle.pack(anchor="w", padx=20)

        self.header_dot = tk.Canvas(header, width=22, height=22, bg=PANEL,
                                    highlightthickness=0)
        self.header_dot.place(relx=0.965, rely=0.5, anchor="center")
        self._draw_dot("offline")

        # Body -------------------------------------------------------------
        body = tk.Frame(self.root, bg=BG)
        body.pack(fill="both", expand=True, padx=14, pady=(14, 6))
        body.columnconfigure(0, weight=1)
        body.columnconfigure(1, weight=0)
        body.rowconfigure(0, weight=1)

        field_frame = tk.Frame(body, bg=PANEL, bd=1, relief="solid")
        field_frame.grid(row=0, column=0, sticky="nsew", padx=(0, 12))
        self._build_field_panel(field_frame)

        controls = tk.Frame(body, bg=PANEL, bd=1, relief="solid", width=430)
        controls.grid(row=0, column=1, sticky="nsew")
        controls.grid_propagate(False)
        self._build_controls(controls)

        # Footer / log -----------------------------------------------------
        footer = tk.Frame(self.root, bg=BG)
        footer.pack(fill="x", padx=14, pady=(4, 12))

        log_head = tk.Frame(footer, bg=BG)
        log_head.pack(fill="x")
        tk.Label(
            log_head, text="FIELD TELEMETRY", bg=BG, fg=MUTED,
            font=("Consolas", 9, "bold"),
        ).pack(side="left")
        self.status_label = tk.Label(
            log_head, text="FIELD OFFLINE", bg=BG, fg=RED,
            font=("Consolas", 10, "bold"),
        )
        self.status_label.pack(side="right")

        self.log_box = scrolledtext.ScrolledText(
            footer, height=8, bg="#05080f", fg="#a9c7dd",
            insertbackground=CYAN, font=("Consolas", 10),
            bd=1, relief="solid", wrap="word", state="disabled",
        )
        self.log_box.pack(fill="x", pady=(4, 6))

        self.progress = ttk.Progressbar(
            footer, mode="determinate", maximum=100,
            style="VFG.Horizontal.TProgressbar",
        )
        self.progress.pack(fill="x")

    def _build_field_panel(self, parent) -> None:
        tk.Label(
            parent, text="CONTAINMENT FIELD VISUALIZER", bg=PANEL, fg=MUTED,
            font=("Consolas", 9, "bold"),
        ).pack(anchor="w", padx=12, pady=(10, 0))

        self.canvas = tk.Canvas(
            parent, bg="#04070d", highlightthickness=0, width=560, height=520
        )
        self.canvas.pack(fill="both", expand=True, padx=10, pady=8)

        self.canvas_caption = tk.Label(
            parent,
            text="FIELD DORMANT  //  KOLIBRI CORE NOT LOADED",
            bg=PANEL,
            fg=MUTED,
            font=("Consolas", 10, "bold"),
        )
        self.canvas_caption.pack(pady=(0, 12))

    def _build_controls(self, parent) -> None:
        parent.columnconfigure(0, weight=1)

        def section(text: str, row: int) -> tk.Frame:
            f = tk.Frame(parent, bg=PANEL_2, bd=1, relief="solid")
            f.grid(row=row, column=0, sticky="ew", padx=12, pady=6)
            f.columnconfigure(0, weight=1)
            tk.Label(
                f, text=text, bg=PANEL_2, fg=CYAN,
                font=("Consolas", 9, "bold"),
            ).grid(row=0, column=0, columnspan=3, sticky="w", padx=10, pady=(7, 4))
            return f

        # --- Image section ---
        img = section("01 // KOLIBRIOS IMAGE", 0)
        self.image_var = tk.StringVar(value=self.cfg["image"])
        tk.Entry(img, textvariable=self.image_var, bg="#05080f", fg=FG,
                 insertbackground=CYAN, bd=1, relief="solid",
                 font=("Consolas", 9)).grid(
            row=1, column=0, columnspan=2, sticky="ew", padx=(10, 4), pady=3
        )
        tk.Button(img, text="…", command=self._browse_image, bg=PANEL, fg=FG,
                  activebackground=PANEL_2, bd=1, relief="solid", width=3).grid(
            row=1, column=2, padx=(0, 10), pady=3
        )
        self.image_status = tk.Label(img, text="", bg=PANEL_2, fg=MUTED,
                                     font=("Consolas", 8), anchor="w")
        self.image_status.grid(row=2, column=0, columnspan=3, sticky="ew",
                               padx=10, pady=(0, 7))
        self.download_btn = tk.Button(
            img, text="↓  DOWNLOAD / REFRESH IMAGE",
            command=self._download_async, bg=PANEL, fg=CYAN,
            activebackground=PANEL_2, bd=1, relief="solid",
            font=("Consolas", 9, "bold"),
        )
        self.download_btn.grid(row=3, column=0, columnspan=3, sticky="ew",
                               padx=10, pady=(0, 9))

        # --- QEMU section ---
        q = section("02 // QEMU HYPERVISOR", 1)
        self.qemu_var = tk.StringVar(value=self.cfg["qemu"])
        tk.Entry(q, textvariable=self.qemu_var, bg="#05080f", fg=FG,
                 insertbackground=CYAN, bd=1, relief="solid",
                 font=("Consolas", 9)).grid(
            row=1, column=0, columnspan=2, sticky="ew", padx=(10, 4), pady=3
        )
        tk.Button(q, text="…", command=self._browse_qemu, bg=PANEL, fg=FG,
                  activebackground=PANEL_2, bd=1, relief="solid", width=3).grid(
            row=1, column=2, padx=(0, 10), pady=3
        )
        self.qemu_status = tk.Label(q, text="", bg=PANEL_2, fg=MUTED,
                                    font=("Consolas", 8), anchor="w")
        self.qemu_status.grid(row=2, column=0, columnspan=3, sticky="ew",
                              padx=10, pady=(0, 8))

        # --- Field parameters ---
        p = section("03 // FIELD PARAMETERS", 2)
        tk.Label(p, text="CORE MEMORY", bg=PANEL_2, fg=MUTED,
                 font=("Consolas", 8)).grid(row=1, column=0, sticky="w", padx=10)
        self.ram_var = tk.IntVar(value=int(self.cfg["ram"]))
        ram = tk.Scale(p, from_=16, to=512, resolution=16,
                       orient=tk.HORIZONTAL, variable=self.ram_var,
                       bg=PANEL_2, fg=FG, troughcolor="#05080f",
                       highlightthickness=0, length=210, showvalue=True)
        ram.grid(row=1, column=1, columnspan=2, sticky="ew", padx=6)
        tk.Label(p, text="MB", bg=PANEL_2, fg=MUTED,
                 font=("Consolas", 8)).grid(row=1, column=3, padx=(0, 10))

        tk.Label(p, text="CPU CORES", bg=PANEL_2, fg=MUTED,
                 font=("Consolas", 8)).grid(row=2, column=0, sticky="w", padx=10,
                                            pady=3)
        self.cores_var = tk.IntVar(value=int(self.cfg["cores"]))
        core_menu = tk.OptionMenu(p, self.cores_var, 1, 2, 4)
        core_menu.configure(bg=PANEL, fg=FG, activebackground=PANEL_2,
                            bd=1, relief="solid", font=("Consolas", 9))
        core_menu["menu"].configure(bg=PANEL, fg=FG)
        core_menu.grid(row=2, column=1, sticky="w", padx=6, pady=3)

        tk.Label(p, text="VIDEO", bg=PANEL_2, fg=MUTED,
                 font=("Consolas", 8)).grid(row=3, column=0, sticky="w", padx=10,
                                            pady=3)
        self.vga_var = tk.StringVar(value=str(self.cfg["vga"]))
        vga_menu = tk.OptionMenu(p, self.vga_var, "std", "cirrus", "vmware")
        vga_menu.configure(bg=PANEL, fg=FG, activebackground=PANEL_2,
                           bd=1, relief="solid", font=("Consolas", 9))
        vga_menu["menu"].configure(bg=PANEL, fg=FG)
        vga_menu.grid(row=3, column=1, sticky="w", padx=6, pady=3)

        self.network_var = tk.BooleanVar(value=bool(self.cfg["network"]))
        tk.Checkbutton(
            p, text="Network bridge (NE2000)", variable=self.network_var,
            bg=PANEL_2, fg=FG, selectcolor="#05080f", activebackground=PANEL_2,
            font=("Consolas", 9),
        ).grid(row=4, column=0, columnspan=3, sticky="w", padx=10, pady=(4, 2))

        tk.Label(p, text="EXTRA QEMU ARGS", bg=PANEL_2, fg=MUTED,
                 font=("Consolas", 8)).grid(row=5, column=0, sticky="w", padx=10,
                                            pady=3)
        self.extra_var = tk.StringVar(value=str(self.cfg["extra_args"]))
        tk.Entry(p, textvariable=self.extra_var, bg="#05080f", fg=FG,
                 insertbackground=CYAN, bd=1, relief="solid",
                 font=("Consolas", 9)).grid(
            row=5, column=1, columnspan=3, sticky="ew", padx=6, pady=3,
            ipady=2,
        )
        tk.Label(p, text="(advanced; e.g. -audiodev none)", bg=PANEL_2,
                 fg=MUTED, font=("Consolas", 7)).grid(
            row=6, column=1, columnspan=3, sticky="w", padx=6, pady=(0, 8)
        )

        # --- Actions ---
        actions = tk.Frame(parent, bg=PANEL)
        actions.grid(row=3, column=0, sticky="ew", padx=12, pady=(10, 4))
        actions.columnconfigure(0, weight=1)

        self.engage_btn = tk.Button(
            actions, text="⚡  ENGAGE FIELD", command=self._engage,
            bg="#0c3b2a", fg="#9dffd0", activebackground="#155e43",
            bd=1, relief="solid", font=("Consolas", 13, "bold"), height=2,
        )
        self.engage_btn.grid(row=0, column=0, columnspan=2, sticky="ew")

        self.disengage_btn = tk.Button(
            actions, text="■  DISENGAGE", command=self._disengage,
            bg="#3b1414", fg="#ffb3b3", activebackground="#5e1f1f",
            bd=1, relief="solid", font=("Consolas", 10, "bold"),
        )
        self.disengage_btn.grid(row=1, column=0, sticky="ew", pady=(6, 0))

        self.reset_btn = tk.Button(
            actions, text="↻  RESET", command=self._reset,
            bg=PANEL_2, fg=FG, activebackground=PANEL,
            bd=1, relief="solid", font=("Consolas", 10),
        )
        self.disengage_btn.grid_configure(padx=(0, 4))
        self.reset_btn.grid(row=1, column=1, sticky="ew", pady=(6, 0), padx=(4, 0))

        self.disengage_btn.configure(state="disabled")
        self.reset_btn.configure(state="disabled")

    # ---------------- Thread-safe UI pump ---------------- #

    def _post(self, kind: str, *args) -> None:
        self.ui_queue.put((kind, args))

    def _pump(self) -> None:
        try:
            while True:
                kind, args = self.ui_queue.get_nowait()
                if kind == "log":
                    self._log(args[0])
                elif kind == "status":
                    self._set_status(args[0], args[1])
                elif kind == "progress":
                    self.progress["value"] = args[0]
                elif kind == "image_status":
                    self.image_status.configure(text=args[0], fg=args[1])
                elif kind == "qemu_status":
                    self.qemu_status.configure(text=args[0], fg=args[1])
                elif kind == "buttons":
                    self._set_buttons(args[0])
                elif kind == "qemu_path":
                    self.qemu_var.set(args[0])
                elif kind == "error":
                    messagebox.showerror(args[0], args[1])
        except queue.Empty:
            pass
        self.root.after(100, self._pump)

    def _set_buttons(self, downloading: bool) -> None:
        self.downloading = downloading
        busy = downloading
        self.download_btn.configure(state="disabled" if busy else "normal")
        self.engage_btn.configure(
            state="disabled" if busy or self.vm.is_running() else "normal"
        )

    # ---------------- Logging / status ---------------- #

    def _log(self, text: str) -> None:
        self.log_box.configure(state="normal")
        self.log_box.insert("end", "[%s] %s\n" % (now_stamp(), text))
        self.log_box.see("end")
        self.log_box.configure(state="disabled")

    def _set_status(self, state: str, text: str) -> None:
        self.state = state
        color = STATE_COLORS.get(state, MUTED)
        self.status_label.configure(text=text, fg=color)
        self.canvas_caption.configure(
            text=("%s  //  %s" % (text.replace("FIELD ", ""), "KOLIBRI CORE")),
            fg=color,
        )
        self._draw_dot(state)
        if state == "active":
            self.engage_btn.configure(state="disabled")
            self.disengage_btn.configure(state="normal")
            self.reset_btn.configure(state="normal")
        else:
            self.engage_btn.configure(
                state="disabled" if self.downloading else "normal"
            )
            self.disengage_btn.configure(state="disabled")
            self.reset_btn.configure(state="normal")

    def _draw_dot(self, state: str) -> None:
        c = self.header_dot
        c.delete("all")
        color = STATE_COLORS.get(state, MUTED)
        c.create_oval(3, 3, 19, 19, fill=color, outline="")
        c.create_oval(6, 6, 16, 16, fill=BG, outline="")

    # ---------------- Field animation ---------------- #

    def _animate(self) -> None:
        self.phase = (self.phase + (3 if self.state == "active" else 1)) % 360
        self._draw_field()
        self.root.after(50, self._animate)

    def _draw_field(self) -> None:
        c = self.canvas
        c.delete("all")
        w = c.winfo_width() or 560
        h = c.winfo_height() or 520
        cx, cy = w / 2, h / 2
        max_r = min(w, h) * 0.42

        active = self.state == "active"
        charging = self.state == "charging"
        main = STATE_COLORS.get(self.state, CYAN)
        dim = "#0e2a3a" if not active else "#0b4a3a"

        # Subtle grid.
        for x in range(0, w, 40):
            c.create_line(x, 0, x, h, fill="#08121c")
        for y in range(0, h, 40):
            c.create_line(0, y, w, y, fill="#08121c")

        # Rotating containment rings.
        for i, r in enumerate([max_r, max_r * 0.78, max_r * 0.56]):
            start = (self.phase * (1 if i % 2 == 0 else -1) + i * 60) % 360
            c.create_arc(
                cx - r, cy - r, cx + r, cy + r,
                start=start, extent=280, style="arc",
                outline=main if active or charging else dim, width=2,
            )
            c.create_arc(
                cx - r, cy - r, cx + r, cy + r,
                start=start + 180, extent=80, style="arc",
                outline=dim, width=1,
            )

        # Radial spokes.
        for i in range(12):
            a = math.radians(i * 30 + self.phase * 0.25)
            r0, r1 = max_r * 0.30, max_r * 0.95
            c.create_line(
                cx + math.cos(a) * r0, cy + math.sin(a) * r0,
                cx + math.cos(a) * r1, cy + math.sin(a) * r1,
                fill=dim,
            )

        # Particles.
        for p in self.particles:
            p["radius"] += p["speed"] * (2.2 if active else 0.8)
            if p["radius"] > max_r:
                p["radius"] = 16
            a = math.radians(p["angle"] + self.phase * 0.4)
            x = cx + math.cos(a) * p["radius"]
            y = cy + math.sin(a) * p["radius"]
            color = main if active or charging else "#1b6b82"
            c.create_oval(x - 1.5, y - 1.5, x + 1.5, y + 1.5, fill=color)

        # Core.
        core_color = main if active or charging else "#164e63"
        c.create_oval(cx - 46, cy - 46, cx + 46, cy + 46,
                      outline=core_color, width=2)
        c.create_oval(cx - 34, cy - 34, cx + 34, cy + 34,
                      outline=dim, width=1)
        c.create_text(cx, cy - 6, text="KOLIBRI",
                      fill=main if active or charging else "#2b7c93",
                      font=("Consolas", 17, "bold"))
        c.create_text(cx, cy + 15, text="OS CORE",
                      fill=MUTED, font=("Consolas", 9))
        c.create_text(
            cx, h - 22,
            text=("FIELD STABILITY: %.0f%%" % (96 if active else (48 if charging else 0))),
            fill=main if active or charging else MUTED,
            font=("Consolas", 9),
        )

    # ---------------- Actions ---------------- #

    def _auto_detect(self) -> None:
        qemu = find_qemu(self.cfg.get("qemu", ""))
        if qemu:
            self._post("qemu_path", qemu)
            self.cfg["qemu"] = qemu
            self._post("qemu_status", "✔  Hypervisor detected: " + qemu, GREEN)
            self._log("DETECT // QEMU: " + qemu)
        else:
            self._post("qemu_status", "✖  QEMU not found - see README for install", YELLOW)
            self._log("WARN // QEMU not found. " + qemu_install_hint().replace("\n", " "))

        img = Path(self.cfg["image"])
        if img.is_file():
            self._post("image_status", "✔  Image present (%d bytes)" % img.stat().st_size,
                       GREEN)
        else:
            self._post("image_status", "✖  No image yet - press DOWNLOAD", YELLOW)

    def _browse_image(self) -> None:
        path = filedialog.askopenfilename(
            title="Select KolibriOS image",
            filetypes=[("Disk images", "*.img *.ima *.bin"), ("All files", "*.*")],
        )
        if path:
            self.image_var.set(path)
            self._post("image_status", "Image selected: " + path, GREEN)

    def _browse_qemu(self) -> None:
        path = filedialog.askopenfilename(title="Select qemu-system-i386 executable")
        if path:
            self.qemu_var.set(path)
            self._post("qemu_path", path)
            self._post("qemu_status", "Hypervisor set: " + path, GREEN)

    def _download_async(self) -> None:
        if self.vm.is_running():
            messagebox.showwarning("Field active", "Disengage the field first.")
            return
        self._post("buttons", True)
        self._post("status", "charging", "FIELD CHARGING")
        self.progress["value"] = 0

        def work():
            try:
                url = self.cfg.get("download_url") or discover_image_url()
                dest = Path(self.image_var.get().strip() or str(IMAGE_PATH))
                download_image(
                    url, dest,
                    progress_cb=lambda p: self._post("progress", p),
                    log_cb=lambda t: self._post("log", t),
                )
                self._post("image_status", "✔  Image ready: %s" % dest, GREEN)
                self.cfg["image"] = str(dest)
                self._post("status", "ready", "IMAGE READY")
                self._post("log", "[SYS] KolibriOS image secured. Ready to engage.")
            except Exception as exc:
                self._post("log", "[ERR] Download failed: %s" % exc)
                self._post("status", "offline", "DOWNLOAD FAILED")
                self._post("error", "Download failed", str(exc))
            finally:
                self._post("progress", 0)
                self._post("buttons", False)

        threading.Thread(target=work, daemon=True).start()

    def _engage(self) -> None:
        self._sync_config_from_ui()

        image = self.cfg["image"]
        if not Path(image).is_file():
            messagebox.showerror(
                "No image", "KolibriOS image not found:\n%s\n\nDownload it first." % image
            )
            return
        qemu = find_qemu(self.cfg.get("qemu", ""))
        if not qemu:
            messagebox.showerror("No hypervisor", qemu_install_hint())
            return

        self.cfg["qemu"] = qemu
        save_config(self.cfg)
        try:
            cmd = build_command(self.cfg, image, qemu)
            self.vm.start(cmd)
            self._log("[SYS] Containment field engaged. KolibriOS is booting.")
        except Exception as exc:
            self._log("[ERR] Failed to start VM: %s" % exc)
            messagebox.showerror("Launch failed", str(exc))

    def _disengage(self) -> None:
        self.vm.stop()
        self._post("status", "offline", "FIELD OFFLINE")

    def _reset(self) -> None:
        self.vm.stop()
        self.log_box.configure(state="normal")
        self.log_box.delete("1.0", "end")
        self.log_box.configure(state="disabled")
        self._post("status", "offline", "FIELD OFFLINE")
        self._auto_detect()
        self._log("[SYS] Field telemetry reset.")

    def _sync_config_from_ui(self) -> None:
        self.cfg.update(
            {
                "qemu": self.qemu_var.get().strip(),
                "image": self.image_var.get().strip(),
                "ram": self.ram_var.get(),
                "cores": self.cores_var.get(),
                "vga": self.vga_var.get(),
                "network": self.network_var.get(),
                "extra_args": self.extra_var.get(),
            }
        )

    def _on_close(self) -> None:
        if self.vm.is_running() and not messagebox.askokcancel(
            "Field active",
            "The virtual field is still active. Disengage and exit?",
        ):
            return
        self.vm.stop()
        self._sync_config_from_ui()
        save_config(self.cfg)
        self.root.destroy()


# --------------------------------------------------------------------------- #
# Headless CLI
# --------------------------------------------------------------------------- #

def run_cli(args: argparse.Namespace) -> int:
    cfg = load_config()
    print("=" * 64)
    print("%s v%s  (CLI)" % (APP_NAME, APP_VERSION))
    print("=" * 64)

    qemu = find_qemu(cfg.get("qemu", ""))
    image = Path(cfg["image"])
    print("Platform : %s %s" % (platform.system(), platform.release()))
    print("QEMU     : %s" % (qemu or "NOT FOUND"))
    print("Image    : %s %s" % (image, "(present)" if image.is_file() else "(missing)"))

    if args.check:
        if not qemu:
            print("\n" + qemu_install_hint())
            return 2
        return 0

    if not qemu:
        print("\nERROR: QEMU not found.\n" + qemu_install_hint())
        return 2

    if not image.is_file() or args.download:
        print("\nFetching KolibriOS image...")
        url = cfg.get("download_url") or discover_image_url()

        def progress(pct):
            print("\r  progress: %3d%%" % pct, end="", flush=True)

        try:
            download_image(url, image, progress_cb=progress, log_cb=lambda t: print(t))
            print()
        except Exception as exc:
            print("\nERROR: download failed: %s" % exc, file=sys.stderr)
            return 3

    if args.check or args.download:
        return 0

    # Engage ---------------------------------------------------------------
    cfg["qemu"] = qemu
    cmd = build_command(cfg, str(image), qemu)
    print("\nEngaging field with command:")
    print("  " + " ".join(shlex.quote(c) for c in cmd))
    print("\nKolibriOS is booting in the QEMU window. Press Ctrl+C here to stop.")
    proc = None
    try:
        proc = subprocess.Popen(cmd)
        return proc.wait()
    except KeyboardInterrupt:
        print("\nDisengaging field...")
        if proc is not None and proc.poll() is None:
            proc.terminate()
            try:
                proc.wait(timeout=6)
            except subprocess.TimeoutExpired:
                proc.kill()
        return 0


# --------------------------------------------------------------------------- #
# Entry point
# --------------------------------------------------------------------------- #

def main(argv=None) -> int:
    parser = argparse.ArgumentParser(
        description="Virtual Field Generator - boots KolibriOS in QEMU"
    )
    parser.add_argument("--check", action="store_true",
                        help="check QEMU/image/platform and exit")
    parser.add_argument("--download", action="store_true",
                        help="download the KolibriOS image and exit")
    parser.add_argument("--engage", "--cli", dest="engage", action="store_true",
                        help="headless mode: download if needed, then boot KolibriOS")
    args = parser.parse_args(argv)

    if args.check or args.download or args.engage:
        return run_cli(args)

    try:
        root = tk.Tk()
    except Exception as exc:
        print("Cannot start the graphical console: %s" % exc, file=sys.stderr)
        print("Try running with --check or --engage instead.", file=sys.stderr)
        return 1

    app = FieldGeneratorApp(root)
    root.mainloop()
    return 0


if __name__ == "__main__":
    sys.exit(main())
