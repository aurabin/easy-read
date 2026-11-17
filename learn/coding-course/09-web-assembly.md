# Lektion 8 — Web Assembly

## Die Idee

Lektion 7 war der Quelltext.
Jetzt wird daraus eine Datei für den Browser.
Die Datei heißt `field.wasm`.
Der Browser liest sie schnell.

## Ein Beispiel

So holt unsere Seite die Datei:

```javascript
fetch("field.wasm")
  .then(r => r.arrayBuffer())
  .then(b => WebAssembly.instantiate(b, {}))
  .then(res => { WASM = res.instance.exports; });
```

Danach darf JavaScript die Funktion `bounce` nutzen.

## Die Schritte

1. Öffne die Datei `boing-ball.html` im Ordner für das Feld.
2. Suche nach `fetch`.
3. Lies die Zeilen bis `WASM`.
4. Öffne die Demo im Browser.
5. Der Ball springt.

## Das solltest du sehen

Den Ball aus Lektion 6.
Er springt genauso.
Du siehst keinen Unterschied.
Die Rechnung läuft nur woanders.

## Wenn es nicht geht

- Der Ball steht still? Prüfe, ob `field.wasm` neben der Seite liegt.
- Nichts passiert? Dein Browser kann kein Web Assembly. Dann rechnet JavaScript.

## Wörter

- **Datei** — ein Stück Code zum Laden.
- **Fallback** — ein zweiter Weg, wenn etwas fehlt.

## Deine Übung

Lösche die Datei `field.wasm` in einer Kopie.
Starte die Demo trotzdem.
Der Ball muss weiter springen.

## Eine Frage an den Agenten

„Warum brauchen wir einen zweiten Weg?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
Weiter: [Alte Geräte](10-alte-geraete.md).
