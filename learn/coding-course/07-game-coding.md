# Lektion 7 — Spiel-Coding

## Die Idee

Lektion 6 hatte Bewegung.
Ein Spiel braucht mehr.
Es braucht ein Ziel.
Es braucht eine Steuerung.
Es braucht Punkte.

Jorge schrieb in Lektion 1 eine Zeile.
Der Text wechselte die Farbe.
Das war schon ein kleines Spiel.
Jetzt machst du mehr daraus.

## Die vier Teile

| Teil | Was er tut |
| --- | --- |
| Schleife | Sie hält das Spiel am Laufen. |
| Eingabe | Du drückst eine Taste oder klickst. |
| Regel | Sie entscheidet, was passiert. |
| Ausgabe | Du siehst den Stand auf dem Bildschirm. |

## Ein Beispiel

```html
<canvas id="feld" width="200" height="100"></canvas>
<p id="punkt">0</p>
<script>
const f = document.getElementById("feld"), g = f.getContext("2d");
const p = document.getElementById("punkt");
let y = 10, n = 0;
setInterval(function(){
  g.clearRect(0,0,200,100);
  y = y + 2;
  if(y > 90){ y = 10; n = n + 1; p.textContent = n; }
  g.fillStyle = "#e8382f";
  g.fillRect(90,y,20,20);
}, 16);
</script>
```

## Die Schritte

1. Öffne eine neue Datei `spiel.html`.
2. Setze das Beispiel hinein.
3. Speichere und öffne die Datei.

## Das solltest du sehen

Ein rotes Viereck fällt.
Unten springt es hoch.
Die Zahl oben wird größer.
Das ist dein Punktestand.

## Wenn es nicht geht

- Die Zahl bleibt null? Prüfe die 90 im Code.
- Nichts läuft? Prüfe, ob `setInterval` da ist.

## Wörter

- **Regel** — Wenn dies passiert, dann das.
- **Punktestand** — die Zahl deiner Punkte.

## Deine Übung

Mach den Ball schneller.
Ändere die 2 nach `y = y + 2` in eine 4.

## Was Spiele verbindet

Pong kam 1972.
Space Invaders kam 1978.
Der C64 brachte Spiele in viele Häuser.
Der Amiga zeigte 1984 den Boing Ball.
Die Demoszene machte aus Grenzen Kunst.

Alle haben dieselben vier Teile.
Schleife. Eingabe. Regel. Ausgabe.

## Eine Frage an den Agenten

„Was ist der Unterschied zwischen Spiel und Demo?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
Weiter: [Assembler](08-assembler.md).
