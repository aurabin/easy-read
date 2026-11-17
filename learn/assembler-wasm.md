# Assembler und Web Assembly

## Was ist Assembler?

Ein Computer rechnet mit Nullen und Einsen.
Assembler sind kurze Befehle dafür.
Ein Programm übersetzt sie in Nullen und Einsen.

Wir haben den Feldgenerator als Assembler geschrieben.
Die Datei heißt `field.wat`.
Sie ist für Web Assembly.

## Was ist Web Assembly?

Web Assembly ist ein Format für das Web.
Es ist schnell.
Der Browser liest es direkt.
`field.wasm` ist unsere Datei.

## Was drin läuft

Zwei Funktionen rechnen dort:

- `advance` — bewegt die Punkte im Feld.
- `bounce` — lässt den Ball springen.

Der Ball trifft den Boden.
Dann gibt `bounce` eine 1 zurück.
Der Ton und das Wort „BOING!" kommen dann.

## Alte Computer

Alte Systeme sollen nicht abstürzen.
Darum prüfen wir zuerst:

- Gibt es Web Assembly?
- Gibt es ein Canvas?
- Gibt es Speicher im Browser?

Fehlt etwas, nimmt das Programm einen anderen Weg.
JavaScript rechnet dann weiter.
Ohne Canvas bleibt ein Bild stehen.
Nichts bricht ab.

## Ehrlich

Ich habe den Assembler selbst geschrieben.
Ich habe ihn im Browser geprüft.
Ich habe keine alten Computer getestet.
Das ist nur eine Vorsorge.

## Weiterlesen

- [`musik.md`](musik.md) — Takt und Form.
- [`octagroover.md`](octagroover.md) — das Modul im Browser.
