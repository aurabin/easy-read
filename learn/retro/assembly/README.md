# Assembler-Versionen der Boing-Ball-Idee

Hier sind echte Assembler-Quellen für die alten Maschinen. Das ist die ehrliche
Grenze: Ein Browser führt keinen 6502- oder 68000-Code aus. Die interaktiven
Demos bleiben darum JavaScript. Für den Browser wäre **WebAssembly (WAT)** die
„Assembler"-Entsprechung — die ist hier nicht enthalten.

## Dateien

| Datei | Maschine | Was |
| --- | --- | --- |
| `boing-c64.asm` | C64, 6502 | Komplettes Sprite-Programm: karierter Ball, Bewegung, Wandabprall |
| `boing-amiga.asm` | Amiga, 68000 | Copper-Liste mit Farbzyklus — der echte Rotations-Trick des Originals |

## Was nicht „rekompiliert" wurde

- Die Kurs-Texte sind Text — kein Assembler nötig oder möglich.
- Die Browser-Demos (`field-generator/`, `products/computer-history/index.html`)
  brauchen JavaScript. Sie laufen in keiner Retro-CPU.
- Die SVG-Bilder sind Vektorgrafik — auch das ist kein Assembler-Code.

## Assemblieren

Ich habe hier **keinen Assembler installiert**, darum konnte ich die Quellen
nicht testen. Sie sind lehrreich kommentiert, aber nicht verifiziert.
Für den C64 eignet sich z. B. ca65 oder Kick Assembler, für den Amiga
vasm oder GNU as (m68k).

## Ehrlich

Das ist eine Hommage an die Original-Demos, keine exakte Rekonstruktion.
Das Original (1984, RJ Mical / Dale Luck) nutzte Farbzyklus für die Rotation
und Bildfeld-Scrollen für den Sprung — die Amiga-Datei zeigt genau diesen Trick.
