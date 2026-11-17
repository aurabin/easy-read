# Lektion 1 — Was ist Code?

## Die Idee

Code ist eine Anleitung.
Der Computer liest sie.
Dann tut er, was drin steht.

## Ein Beispiel

Eine Seite im Browser ist auch Code.
Du schreibst ihn in eine Textdatei.
Der Browser zeigt ihn dir.

## Code vor dem Browser

Es gab Code lange vor dem Web.
Hier ist eine Zeile für den Commodore 64.
Sie stammt von Jorge.

```basic
10 FOR X=0 to 255:PRINT "HELLO WORLD!    ";:POKE 646,X:;GREETINGS FROM JORGE;NEXT X
20 GOTO 10
```

Was die Teile machen:

- `10` — die Nummer der Zeile.
- `FOR X=0 TO 255` — eine Schleife. X läuft von 0 bis 255.
- `PRINT "HELLO WORLD!"` — schreibt den Text auf den Bildschirm.
- `POKE 646,X` — setzt die Textfarbe. 646 ist die Farbe im C64.
- `NEXT X` — die nächste Runde der Schleife.
- `20 GOTO 10` — springt zurück zu Zeile 10.
  Der Text läuft immer weiter. Die Farbe wechselt dabei.

Das Wort nach dem Gruß ist eine Begrüßung.
Soll sie als Text erscheinen, kommt sie in Gänsefüßchen.

## Die Schritte

1. Öffne einen Texteditor.
2. Schreibe genau das:

```html
<!doctype html>
<html>
<body>
<p>Hallo Welt</p>
</body>
</html>
```

3. Speichere die Datei als `hallo.html`.
4. Ziehe die Datei in den Browser.

## Das solltest du sehen

Ein weißer Bildschirm.
Darauf steht: Hallo Welt.

## Wenn es nicht geht

- Du siehst den Code als Text? Prüfe die Endung `.html`.
- Nichts passiert? Ziehe die Datei in ein Browserfenster.

## Wörter

- **Editor** — ein Programm zum Schreiben von Text.
- **Browser** — ein Programm, das Seiten zeigt.

## Deine Übung

Ändere „Hallo Welt" in deinen Namen.
Speichere erneut.
Sieh dir die Seite wieder an.

## Eine Frage an den Agenten

„Was bedeutet `<p>` in meiner Seite?"

Weiter: [Das HTML](02-html.md).

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
