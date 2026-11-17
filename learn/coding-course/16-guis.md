# Lektion 16 — GUIs

## Die Idee

GUI heißt: Bildoberfläche.
Du klickst auf ein Bild.
Etwas passiert.
Du musst keine Befehle tippen.

Der C64 hatte vor allem Text.
Der Amiga zeigte 1985 den Workbench.
Dort gab es Fenster und Symbole.
Heute nutzt du GUIs jeden Tag.

## Die Teile

| Teil | Was er ist |
| --- | --- |
| Fenster | ein Rahmen für Inhalt |
| Knopf | ein Klick startet etwas |
| Feld | du schreibst Text hinein |
| Symbol | ein Bild für eine Aufgabe |
| Menü | eine Liste zum Auswählen |

## Ein Beispiel

```html
<button id="knopf">Klick mich</button>
<p id="text">Noch nichts passiert.</p>
<script>
document.getElementById("knopf").onclick = function(){
  document.getElementById("text").textContent = "Du hast geklickt.";
};
</script>
```

## Die Schritte

1. Öffne eine neue Datei `gui.html`.
2. Setze das Beispiel hinein.
3. Speichere und öffne die Datei.
4. Klicke auf den Knopf.

## Das solltest du sehen

Erst steht: Noch nichts passiert.
Nach dem Klick steht: Du hast geklickt.

## Wenn es nicht geht

- Nichts passiert? Prüfe, ob beide `id` gleich sind.
- Der Text bleibt alt? Prüfe den Punkt vor `textContent`.

## Wörter

- **Ereignis** — etwas, das passiert. Ein Klick ist ein Ereignis.
- **Zustand** — der Stand gerade jetzt. Hier: geklickt oder nicht.

## Zwei Regeln

Erstens: Zeige, was passiert ist.
Ein Knopf ohne Antwort ist verwirrend.

Zweitens: Die Tastatur muss auch gehen.
Nicht alle Menschen klicken.
Prüfe, ob du mit Tab und Enter kommst.

## Deine Übung

Bau ein Feld dazu.
Schreib deinen Namen hinein.
Nach dem Klick steht er im Text.

## Eine Frage an den Agenten

„Warum braucht ein GUI einen Zustand?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
Weiter: [Linux](17-linux.md).
