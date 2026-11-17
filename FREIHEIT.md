# Technische Freiheit — ehrlicher Status

Stand: 17. November 2026.

## Was „frei" hier heißt

Die App soll ohne fremde Herren laufen.
Keine Abhängigkeit von einem Konzern.
Kein Zwang zu Cloud, Konto oder Zahlung.
Alles soll auch offline funktionieren.
Wir sagen ehrlich, was geht — und was nicht.

## Was heute schon frei ist

| Bereich | Status | Beleg |
| --- | --- | --- |
| Quelltext | offen, MIT | `LICENSE.md` |
| Texte und Bilder | offen, CC0 / CC BY | `LICENSE.md` |
| Kurs | offen, AGPL-3.0 | `learn/coding-course/LICENSE.md` |
| Keine externen Skripte | ja | keine CDN-Links in `outreach/apps/` |
| Keine externen Fonts | ja | nur Schriften des Geräts |
| Keine Werbung | ja | nirgends im Projekt |
| Keine Tracker | ja | keine Dienste zur Auswertung |
| Keine Datenverkäufe | ja | nirgends |
| Läuft offline | ja | Startseite, Demos, Apps, Standalone |
| Kostenlos | ja | kein Abo, kein Kauf |
| Kein Konto nötig | ja | alle Lektionen frei |
| Selbst hostbar | ja | nur statische Dateien, kein Server nötig |
| Kein WAV | ja | Sound entsteht im Browser |

## Verweise am Rand — keine Abhängigkeit

Diese Links erscheinen in den Apps, aber die App läuft ohne sie:

- `opencode.ai`, GitHub — nur Hinweise, kein Laden von Code.
- C64-Emulator, TAWS, vAmigaWeb — nur weiterführende Links.
- ELSTER, Finanzamt — nur Informationen im Steuer-Feld.

Sie sind **Hinweise**, keine Pflicht.
Wer offline ist, kann die App trotzdem nutzen.

## Was technisch NICHT möglich ist

Das sagen wir klar:

1. **Ohne Browser keine App.** Die Demos brauchen einen Browser
   mit JavaScript und Canvas. Ein reines Text-Terminal reicht nicht.
2. **Kein echter Amiga/C64 ohne ROMs.** Kickstart-ROMs sind gesetzlich
   geschützt. Wir bündeln keine. Unsere Seiten sind Lernwerkzeuge,
   keine vollständigen Emulatoren.
3. **Gmail-/GitHub-Login braucht ein Konto.** Wer die Nebentasks nutzen will,
   braucht selbst ein Konto. Die Lern-App braucht keins.
4. **Gästebuch braucht einen Server.** Nur-local mit `tools/cgi/server.mjs`.
   Ohne Server gibt es kein Gästebuch. Das ist ehrlich so markiert.
5. **Werkzeuge von OpenCode brauchen OpenCode.** Die Dateien der Agenten wirken nur
   in OpenCode. In einem normalen Browser sind sie wirkungslos.

## Wie man die App komplett frei nutzt

1. Dateien herunterladen (ZIP aus `exports/`).
2. `docs/index.html` im Browser öffnen. Oder `site/index.html`.
3. Kein Konto. Kein Netz nötig. Keine Installation.
4. Alles bleibt auf dem eigenen Rechner.

## Was wir nicht ändern werden

- Keine geschützten ROMs einbauen.
- Keine fremden Marken als eigene ausgeben.
- Keine versteckten Rückruf- oder Dienste, die verfolgen einbauen.
- Keine Behauptung „accessible" oder „getestet" ohne echte Prüfung.

## Ehrlich

- Keine Rechtsberatung.
- Kein Test mit echten Nutzern.
- „Frei" heißt hier: offen, kostenlos, offline-fähig, selbst hostbar.
- Es heißt nicht: frei von jeder technischen Grenze.
  Browser, ROMs und Konten sind reale Grenzen.
  Wir umgehen sie nicht — wir benennen sie.

## Siehe auch

- `LICENSE.md` — Lizenzen.
- `LEGAL-STATUS.md` — offene rechtliche Punkte.
- `die Liste der fremden Werke` — fremde Werke.
- `DATENSCHUTZ.md` — was lokal bleibt.
