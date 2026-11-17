# Lektion 4 — JavaScript

## Die Idee

HTML ist der Text.
CSS ist das Aussehen.
JavaScript ist das Tun.
Es rechnet und reagiert.

## Ein Beispiel

```html
<p id="zahl">0</p>
<button id="mehr">Mehr</button>
<script>
let n = 0;
document.getElementById("mehr").onclick = function(){
  n = n + 1;
  document.getElementById("zahl").textContent = n;
};
</script>
```

## Die Schritte

1. Öffne deine Seite.
2. Setze das Beispiel vor `</body>`.
3. Speichere und lade neu.
4. Klicke auf „Mehr".

## Das solltest du sehen

Eine Zahl.
Sie wird bei jedem Klick größer.

## Wenn es nicht geht

- Nichts passiert? Prüfe, ob alle Gänsefüßchen paarweise sind.
- Die Zahl bleibt null? Prüfe, ob `id="zahl"` und `getElementById("zahl")` gleich sind.

## Wörter

- **Variable** — ein Platz mit einem Namen. Hier heißt er `n`.
- **Funktion** — ein Stück Code, das bei einem Ereignis läuft.

## Deine Übung

Bau einen Knopf „Weniger".
Er zieht die Zahl wieder herab.

## Eine Frage an den Agenten

„Was macht `textContent` mit der Zahl?"

Weiter: [Das Bildfeld](05-canvas.md).

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
