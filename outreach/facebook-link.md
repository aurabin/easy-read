# Öffentlicher Facebook-Link — Status und Weg dorthin

## Ehrlicher Status

**Es gibt noch keinen öffentlichen Link.** Dafür fehlen zwei Dinge:

1. **Öffentliches Hosting** — eine `https://`-Adresse, unter der die Demo erreichbar ist.
   Eine lokale Datei oder `localhost` kannFacebook nicht aufrufen.
2. **Dein Facebook-Konto** — ich poste nichts für dich. Das wäre eine persönliche
   Handlung und widerspricht deiner Regel (schriftlich, kein persönliches Auftreten).

GitHub ist bei uns **nicht angemeldet**. Die Geräte-Anmeldung wartet auf Bestätigung.

## Was schon fertig liegt

| Datei | Zweck |
| --- | --- |
| `field-generator/share.html` | Öffentliche Landing-Seite mit Facebook/Open-Graph-Vorschau |
| `field-generator/og-image.png` | Das Bild für die Link-Vorschau |
| `field-generator/field-generator.html` | Die Demo selbst |
| `outreach/facebook-demo-post.md` | Fertiger Beitragstext + Admin-Nachricht |
| `field-generator/make-share-link.mjs` | Baut aus der URL den „Teilen"-Link |

## In 4 Schritten zum Link

1. **Hosting wählen** (eine Variante):
   - GitHub Pages, sobald GitHub angemeldet ist, oder
   - Netlify: Ordner `field-generator/` per Drag & Drop hochladen, oder
   - itch.io: HTML-Spiel als ZIP hochladen.
2. **URL notieren**, z. B. `https://DEIN-NAME.github.io/DEIN-REPO/share.html`.
3. **In `share.html` die Platzhalter ersetzen:**
   - `og:image` → `https://…/og-image.png`
   - `og:url` → die echte URL
   Neu hochladen. Danach zeigt Facebook das richtige Vorschaubild.
4. **Teilen-Link erzeugen:**
   ```sh
   node field-generator/make-share-link.mjs https://DEIN-NAME.github.io/DEIN-REPO/share.html
   ```
   Die ausgegebene URL in den Browser einfügen — dort erscheint das Facebook-
   Teilen-Fenster mit deinem Beitrag. Danach Text aus `facebook-demo-post.md` einfügen.

## Wichtig

- Vor dem Posten: **Admin der Gruppe fragen** (siehe `facebook-demo-post.md`).
- Gruppen mit Promotionsverbot nicht nutzen.
- Nicht „barrierefrei" oder „getestet" schreiben.
- Antworten von Angehörigen gelten nicht als Test.

## Was ich nicht kann

Keinen Account erstellen, kein Passwort eingeben, nichts auf Facebook veröffentlichen
und ohne Hosting keine öffentliche Adresse erfinden. Sobald du Hosting oder die
GitHub-Bestätigung gibst, baue ich den echten Link fertig.
