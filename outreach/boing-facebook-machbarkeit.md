# Machbarkeit: Boing-Ball-Demo → sichtbarer Facebook-Post

## Kurze Antwort

Die **live laufende Demo** kann kein Facebook-Post sein.
Ein **Bild, eine Linkvorschau oder ein Video** davon schon.

## Geprüft

| Form | Möglich? | Wie |
| --- | --- | --- |
| Laufendes HTML/JS im Post | **Nein** | Facebook führt keinen Code aus |
| Standbild im Post | **Ja** | `media/boing-1984.png` anhängen |
| Link mit Vorschau | **Ja** | Live-Seite mit Open-Graph-Bild |
| Video | **Ja, durch dich** | Bildschirm aufnehmen — keine Kamera nötig |
| Animiertes GIF | Grundsätzlich ja | Hier nicht erzeugt (kein Encoder) |
| `.jpg` das sich selbst startet | **Nein** | Browser-Regel, `image/jpeg` |

## Was jetzt live ist

- Reine Demo: https://aurabin.github.io/easy-read/boing-ball.html
- Share-Seite mit Vorschau: https://aurabin.github.io/easy-read/share.html
- Vorschau-Bild: https://aurabin.github.io/easy-read/og-image.png
- Facebook-Teilen-Link:
  `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Faurabin.github.io%2Feasy-read%2Fshare.html`

## Empfehlung

1. Bild `outreach/media/boing-1984.png` anhängen.
2. Link auf die Share-Seite einfügen — Facebook zeigt Titel und Bild automatisch.
3. Text aus `outreach/facebook-demo-post.md` nehmen.
4. Vorher Admin der Gruppe fragen.

## Ehrlich

Ich habe **nichts auf Facebook veröffentlicht**. Das bleibt deine Handlung.
Die Demo ist eine Hommage von 1984, nicht das Original — und sie ist
nicht mit echten Nutzern getestet.
