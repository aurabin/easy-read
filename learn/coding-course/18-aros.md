# Lektion 18 — AROS

## Die Idee

AROS heißt: AROS Research Operating System.
Der Name ist ein Kreis: AROS steht für sich selbst.
Es ist ein offenes Betriebssystem.
Es soll so aussehen und sich so anfühlen wie AmigaOS.
Es ist aber neu geschrieben.

Der Unterschied zum Emulator ist wichtig.
Ein Emulator tut so, als wäre es ein Amiga.
AROS läuft direkt auf deinem Gerät.
Es ist eher wie Wine auf Windows.

## Die Geschichte

- 1995 begann die Arbeit an AROS.
- 2026 ist das Projekt sehr aktiv.
- In drei Monaten kamen fast 2.500 Änderungen.
- Viele Menschen aus der ganzen Welt helfen mit.

Das steht auf der Website von aros.org.
Die Entwicklung ist offen im Git-Repository.

## Wo es läuft

- x86 und x86-64 — normale PCs.
- m68k — alte Amiga-Hardware.
- ARM — Raspberry Pi 3, 4, 400, 5, 500.
- RISC-V — eine offene Chip-Familie.
- Hosted — als Programm unter Linux, Windows und macOS.
- Apple Silicon — ein eigener Anschluss ist da.

## Besonderes aus der letzten Zeit

- Neue RISC-V-Version.
- Mehrere Kerne auf ARM und x86.
- Wi-Fi und Bluetooth.
- IPv6 im Netzwerk.
- USB 3.
- Ein Werkzeug für Rust auf AROS.
- Neue Treiber für Raspberry Pi 5.
- Ein Cocoa-Fenster für Apple-Geräte.

Das zeigt: AROS ist kein Museum.
Es wird weitergebaut.

## Die Lizenz

AROS steht unter der **AROS Public License**, kurz APL.
Wer AROS nimmt, darf es ändern und weitergeben.
Aber er muss die Quelle nennen.
Das ist die Regel.

Diese Regel ist wichtig.
Manche Ableger haben das nicht beachtet.
Die Website von aros.org weist darauf hin.
Nenne immer, woher der Code kommt.

## Ausgaben

Es gibt fertige Ausgaben zum Laden.
Icaros Desktop ist eine davon.
AROS One ist eine andere.
Sie unterscheiden sich in Aussehen und Programmen.

## Ausprobieren

1. Lies zuerst die Regeln im Projekt.
2. Lade eine fertige Ausgabe oder eine Nachtversion.
3. Starte sie auf einem PC oder im Emulator.
4. Sieh dir den Workbench an.

Die echten Abbilder stehen auf drei Seiten.
Eine Seite heißt [AROS One](../../outreach/apps/aros-one.html).
Eine Seite heißt [Tiny AROS](../../outreach/apps/tiny-aros.html).
Die dritte Seite heißt [AROS aus Quelle](../../outreach/apps/aros-source.html).

## Was das mit uns zu tun hat

Unser Amiga-Kurs zeigt die alte Maschine.
Die Seite zu KolibriOS zeigt kleine Programme.
AROS zeigt einen dritten Weg:
alte Ideen, neue Hardware, offener Quelltext.

## OpenCode und AROS

OpenCode ist ein Werkzeug zum Programmieren.
Wir benutzen es auf unserem Rechner.
Es läuft nicht in AROS.
Die Gründe stehen auf einer Seite.
Sie heißt [OpenCode und AROS](../../outreach/apps/opencode-aros.html).

## Ehrlich

Ich habe AROS One 1.3 und AROS One v2.9 mit QEMU gestartet.
Ich habe auch die alte CD von Tiny AROS mit QEMU gestartet.
Ich habe AROS aus dem Quelltext gebaut.
Dieses Abbild habe ich mit QEMU gestartet.
Dort habe ich den Desktop gesehen.
Die anderen Desktops habe ich nicht geprüft.
Nicht mit echten Nutzern getestet.

## Weiterlesen

- [Assembler](08-assembler.md) — wie nah die Maschine ist.
- `learn/retro/amiga/` — die alte Maschine.
- aros.org — die offizielle Website.

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
