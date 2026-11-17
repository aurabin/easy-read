# Lektion 5 — Das Bildfeld

## Die Idee

Ein Bildfeld ist eine Fläche zum Zeichnen.
JavaScript malt darauf.
Punkte haben eine X- und eine Y-Zahl.
X geht nach rechts. Y geht nach unten.

## Ein Beispiel

```html
<canvas id="bild" width="200" height="100"></canvas>
<script>
const c = document.getElementById("bild");
const g = c.getContext("2d");
g.fillStyle = "#e8382f";
g.beginPath();
g.arc(100, 50, 30, 0, 7);
g.fill();
</script>
```

## Die Schritte

1. Öffne deine Seite.
2. Setze das Beispiel vor `</body>`.
3. Speichere und lade neu.

## Das solltest du sehen

Einen roten Kreis.
Er sitzt in der Mitte des Feldes.

## Wenn es nicht geht

- Kein Kreis? Prüfe, ob `id="bild"` und `getElementById("bild")` gleich sind.
- Alles schwarz? Prüfe den Wert nach `fillStyle`.

## Wörter

- **Canvas** — die Fläche zum Zeichnen.
- **Koordinate** — eine Zahl für die Position.

## Deine Übung

Mach den Kreis blau.
Verschiebe ihn nach links.
Ändere nur die Zahlen 100 und 50.

## Eine Frage an den Agenten

„Warum steht bei `arc` eine 7?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
Weiter: [Bewegung](06-bewegung.md).
