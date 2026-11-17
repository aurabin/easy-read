# Lektion 4 — Der springende Ball

## Die Idee

Ein Ball fällt nach unten.
Er trifft den Boden.
Er springt hoch.
Dann fällt er wieder.

Das ist eine Animation.
Du kannst sie selbst bauen.

## Die drei Regeln

Ein Ball braucht drei Dinge:

- **Die Position** — wo ist er gerade?
- **Das Tempo** — wie schnell ist er?
- **Den Boden** — wo bleibt er liegen?

## Ein kleiner Code

```html
<canvas id="ball" width="300" height="200"></canvas>
<script>
var c = document.getElementById("ball").getContext("2d");
var y = 20;
var speed = 2;
function tick(){
  c.clearRect(0,0,300,200);
  c.beginPath();
  c.arc(150,y,12,0,7);
  c.fill();
  y = y + speed;
  if(y > 185){ speed = -speed; }
  requestAnimationFrame(tick);
}
tick();
</script>
```

Kopiere das in eine Datei.
Nenn sie `ball.html`.
Öffne sie im Browser.

## Was passiert?

Der Ball fällt.
Er kommt unten an.
Die Zahl `speed` wechselt das Vorzeichen.
Jetzt geht er hoch.
Unten wechselt sie wieder.
Der Ball springt für immer.

## Mach das

Ändere die Zahl 2 in 5.
Der Ball springt schneller.
Ändere 12 in 20.
Der Ball wird größer.

## Weiter

In Lektion 5 sprechen wir über Fehler.
Sie sind nicht schlimm.

---

Lizenz: MIT für Code. Texte CC0 oder CC BY.
Nicht mit echten Kids getestet.
