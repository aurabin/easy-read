# Lektion 6 — Bewegung

## Die Idee

Ein Bild bleibt still.
Du zeichnest es immer wieder neu.
Dann bewegt es sich.
Dazwischen liegt ein kleiner Moment.

## Ein Beispiel

```html
<canvas id="bild" width="200" height="100"></canvas>
<script>
const c = document.getElementById("bild"), g = c.getContext("2d");
let y = 20, vy = 1;
function schritt(){
  g.clearRect(0,0,200,100);
  y += vy;
  if(y > 70 || y < 10) vy = -vy;
  g.fillStyle = "#6fd3ff";
  g.fillRect(90, y, 20, 20);
  setInterval(schritt, 16);
}
schritt();
</script>
```

## Die Schritte

1. Öffne deine Seite.
2. Setze das Beispiel vor `</body>`.
3. Speichere und lade neu.

## Das solltest du sehen

Ein blaues Viereck.
Es fällt und springt wieder hoch.

## Wenn es nicht geht

- Es bewegt sich nicht? Prüfe, ob `schritt()` am Ende steht.
- Es fliegt weg? Prüfe die zwei Zahlen 70 und 10.

## Wörter

- **Schleife** — Code, der immer wieder läuft.
- **Tempo** — hier die Zahl `vy`.

## Deine Übung

Mach die Bewegung schneller.
Ändere die 1 nach `vy` in eine 2.

## Eine Frage an den Agenten

„Was macht `clearRect` vor jedem Bild?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
Weiter: [Assembler](07-game-coding.md).
