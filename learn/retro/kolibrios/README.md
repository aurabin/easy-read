# KolibriOS — was geht?

## Was KolibriOS ist

KolibriOS ist ein kleines System für x86-PCs.
Es begann 2004 als Abzweig von MenuetOS.
Der Kern ist in FASM geschrieben. Das ist Assembler.
Das System passt auf eine kleine Diskette.
Es hat Fenster und viele Programme.
Der Browser heißt NetSurf.

## Was bei uns läuft

| Teil | Auf KolibriOS? | Grund |
| --- | --- | --- |
| Unsere Texte | Ja | Einfache Dateien |
| HTML-Demos | Nein | NetSurf kann kein JS |
| Maschinencode (WASM) | Nein | Keine Laufzeit dafür |
| C64-Code (6502) | Nein | Andere CPU |
| Amiga-Code (68000) | Nein | Andere CPU |
| SVG-Bilder | Teilweise | PNG ist besser |
| Unsere Idee | Ja | Als neues Programm |

## Die Antwort

Nicht alles läuft dort.
Die Browser-Demos brauchen JavaScript.
KolibriOS hat das nicht.
Die alten Quellen sind für andere CPUs.

Was geht: Ein neues Programm in FASM.
Es zeigt die Kugel auf dem Bildschirm.
Das passt gut zu Code, nah an der Hardware.

## Der Entwurf

Die Datei `boing-kolibri.asm` ist jetzt assembliert.
FASM 1.73.32 meldet: 2 Durchläufe, 400 Byte, 0 Fehler.
Das Programm öffnet ein Fenster.
Es zeichnet eine karierte Kugel aus Punkten.

Es ist **nicht** in KolibriOS gestartet worden.
Prüfe die Systemrufe trotzdem gegen `syscalls.txt`.

## Das Paket

Im Ordner `package/` liegt alles Nutzbare:

- `BOING` — das Programm, 400 Byte
- `BOING.PNG` — das Vorschaubild
- `.TXT`-Dateien — die ersten Lektionen
- `README.TXT` — die Anleitung

## Prüfung aller Dateien

Alle 154 Dateien wurden einzeln geprüft:

- 98 Dateien laufen auf KolibriOS.
- 29 gehen teilweise (SVG statt PNG).
- 27 gehen nicht (HTML, WASM, Node, 6502, 68000).
- 0 sind unklar.

Die Liste steht in [`audit.md`](audit.md).

## Quellen

```text
kolibrios.org
wiki.kolibrios.org
diamond.kolibrios.org
Wikipedia (KolibriOS)
```

## Weiterlesen

- `../assembly/README.md` — unsere alten Quellen.
