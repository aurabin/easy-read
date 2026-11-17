# Lektion 9 — Alte Geräte

## Die Idee

Jorge schrieb in Lektion 1 eine Zeile für den C64.
Die lief auf einem alten Computer.
Heute sind Browser anders.
Manche können weniger.
Darum prüfen wir zuerst.

## Ein Beispiel

```javascript
if(g){
  g.fillStyle = "#e8382f";
} else {
  text.innerHTML = "Kein Bildfeld da.";
}
```

Erst prüfen. Dann zeichnen.
Fehlt das Bildfeld, gibt es Text.

## Die Schritte

1. Öffne die Datei `boing-ball.html` im Ordner für das Feld erneut.
2. Suche nach `if(!g)`.
3. Lies die Zeile darunter.
4. Suche nach `typeof WebAssembly`.
5. Sieh, wie beides geschützt ist.

## Das solltest du sehen

Zwei Prüfungen am Anfang.
Eine für das Bildfeld.
Eine für Web Assembly.

## Wenn es nicht geht

- Du findest die Stellen nicht? Suche nach `if`.
- Der Text bleibt weg? Prüfe, ob `text` ein Element ist.

## Wörter

- **Prüfung** — eine Frage an den Browser.
- **Absturz** — das Programm hört hart auf.

## Deine Übung

Schreibe eine Prüfung für den Ton.

```javascript
if(window.AudioContext){ }
```

Fülle die Klammern mit einem Text.

## Eine Frage an den Agenten

„Warum fragen wir zuerst und nicht später?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
Weiter: [Deine Demo](11-deine-demo.md).
