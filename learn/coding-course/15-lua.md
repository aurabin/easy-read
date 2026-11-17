# Lektion 15 — Lua

## Die Idee

Lua ist klein.
Viele Spiele nutzen es für Regeln.
Du kannst es leicht in ein Spiel einbauen.
Es passt zu Lektion 7.

## Ein Beispiel

```lua
punkt = 0
for i = 1, 4 do
  punkt = punkt + i
end
print(punkt)
```

## Die Schritte

1. Öffne einen Lua-Editor oder eine Konsole.
2. Schreibe das Beispiel.
3. Starte es.

## Das solltest du sehen

Die Zahl 10.
Vier plus drei plus zwei plus eins.

## Wenn es nicht geht

- Keine Ausgabe? Prüfe, ob `print` klein geschrieben ist.
- Ein Fehler bei `end`? Jedes `for` braucht ein `end`.

## Wörter

- **Regel** — hier die Schleife. Sie zählt die Punkte zusammen.
- **Schlüsselwort** — ein Wort mit fester Bedeutung. Zum Beispiel `for`.

## Deine Übung

Mach die 4 größer.
Lass `punkt` bei null beginnen.
Rechne nur gerade Zahlen dazu.

## Eine Frage an den Agenten

„Warum nutzen Spiele oft Lua für Regeln?"

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).

Weiter: [GUIs](16-guis.md).

Damit ist der Sprach-Teil fertig.
Du kannst mit jeder Sprache weiter üben.
Der Kurs bleibt offen für mehr.
