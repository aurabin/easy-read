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

Die Datei `boing-kolibri.asm` ist ein Entwurf.
Sie öffnet ein Fenster.
Sie zeichnet eine karierte Kugel aus Punkten.

Wichtig: Hier ist kein FASM installiert.
Der Text ist nicht getestet.
Prüfe die Nummern der Systemrufe in `syscalls.txt`.

## Was ich noch machen kann

- Texte als `.txt` für KolibriOS paketieren.
- Das Bild als PNG speichern.
- Den Entwurf ausbauen, wenn er testbar ist.

## Quellen

```text
kolibrios.org
wiki.kolibrios.org
diamond.kolibrios.org
Wikipedia (KolibriOS)
```

## Weiterlesen

- `../assembly/README.md` — unsere alten Quellen.
