# Lektion 7 — Assembler

## Die Idee

In Lektion 6 hat JavaScript den Ball bewegt.
Jetzt soll die Maschine selbst rechnen.
Das geht mit Assembler.

Ein Computer rechnet mit Nullen und Einsen.
Assembler nutzt kurze Wörter dafür.
Ein Werkzeug macht daraus Nullen und Einsen.

Der Ball aus Lektion 6 springt jetzt in Web Assembly.
Der Quelltext heißt `field.wat`.
Das ist Assembler für das Web.

## Ein Beispiel

Hier ist ein Teil aus `field.wat`:

```wat
(f32.store (i32.const 6144) (local.get $y))
(f32.store (i32.const 6148) (local.get $vy))
```

Die Zahlen 6144 und 6148 sind Plätze im Speicher.
Dort liegen die Höhe und das Tempo vom Ball.

## Die Schritte

1. Öffne die Datei `field.wat` im Ordner für das Feld.
2. Suche nach `bounce`.
3. Lies die Zeilen langsam.
4. Ändere die Zahl 0.9 in 0.8.
5. Speichere die Datei.

## Das solltest du sehen

Eine Datei mit vielen Klammern.
Jede Klammer gehört zu einer anderen.
Die Zahl 0.9 bestimmt den Sprung.

## Wenn es nicht geht

- Du findest `bounce` nicht? Suche nach dem Wort `export`.
- Die Datei öffnet sich nicht? Prüfe die Endung `.wat`.

## Wörter

- **Speicher** — ein Ort für Zahlen.
- **Export** — eine Funktion, die JavaScript nutzen darf.

## Deine Übung

Ändere die 0.9 auf 0.7.
Der Ball springt jetzt niedriger.

## Eine Frage an den Agenten

„Warum steht im WAT so viel in Klammern?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
Weiter: [Web Assembly](09-web-assembly.md).
