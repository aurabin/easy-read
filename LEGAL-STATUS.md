# Rechtlicher Status — vollständige Bestandsaufnahme

Stand: 17. November 2026.

**Update:** Ein Teil ist jetzt abgesichert. Neu angelegt wurden
`LICENSE.md`, `THIRD-PARTY-NOTICES.md`, `IMPRESSUM.md` und `DATENSCHUTZ.md`.
Der Markenhinweis steht auf der Startseite. Das Gästebuch weist auf die
lokale Speicherung hin. Die Punkte 1, 5, 6, 7, 9 und 10 sind damit
dokumentiert. Die Punkte 2, 3, 4 und 8 brauchen weiterhin deine Entscheidung
oder eine Beratung. Impressum und Datenschutz haben Platzhalter.

**Wichtig zuerst:** Das ist keine Rechtsberatung.
Ich bin kein Anwalt.
Für echte Entscheidungen frag eine Anwältin oder einen Anwalt.
Diese Datei sammelt Fakten aus dem Projekt.
Sie zeigt, was geklärt ist und was offen bleibt.

## Kurze Antwort

Das Projekt ist überwiegend offen lizenziert.
Der Kurs ist bewusst AGPL-3.0.
Es gibt aber **elf offene Punkte**.
Zwei davon sind dringend: die GPL-2.0-Abstammung im Code und das fehlende Impressum.
Der Store-Entwurf ist nicht eingereicht.
Nichts ist mit echten Nutzern getestet.

## 1. Was heute gilt

| Bereich | Lizenz | Quelle |
| --- | --- | --- |
| Code im ganzen Projekt | MIT | `AGENTS.md`, `CONTRIBUTING.md` |
| Bilder und Texte | CC0 oder CC BY | `AGENTS.md`, `CONTRIBUTING.md` |
| Kurs `learn/coding-course/` | AGPL-3.0, bewusst gewählt | `learn/coding-course/LICENSE.md`, `AGPL-3.0.txt` |
| `products/computer-history/` | MIT + CC0/CC BY | `products/computer-history/LICENSE.md` |
| KolibriOS-Paket | MIT + CC0/CC BY | `learn/retro/kolibrios/package/README.TXT` |
| `virtual_field_generator/` | keine Lizenz, geheim, lokal | `.gitignore`, `AGENTS.md` |

Es gibt **keine `LICENSE.md` im Projekt-Root**.
Der volle MIT-Text liegt nur in `products/computer-history/LICENSE.md`.

## 2. Was uns gehört

- Eigene SVGs, Bilder und Farbsysteme.
- Eigene Musik im Browser. Keine externen Audiodateien.
- Eigene Lektionen und Übersetzungen.
- Eigene Demos und Prüfwerkzeuge.
- Der karierte Ball ist neu gezeichnet. Er ist kein kopiertes Bild.
  Siehe `products/computer-history/brand/design-tokens.md`.

## 3. Was nicht uns gehört

| Sache | Status | Fundstelle |
| --- | --- | --- |
| Kickstart-ROMs, Workbench | Urheberrechtlich geschützt. Nicht enthalten. Nur Dateiname lokal gespeichert. | `learn/retro/amiga/02-install-the-emulator.md`, `PERMISSIONS.md` |
| `Ml.OctaGroover` | Von John Carehag und Christian Cyréus. Über Aminet. **Lizenz nicht dokumentiert.** | `learn/octagroover.md` |
| Paula-Player | Basiert auf siday player, **GPL-2.0**. | `tools/paula-ml.js` |
| AROS One | Von der AROS-Community. APL-Lizenz. Quelle aros.org. | `learn/coding-course/18-aros.md`, `aros-one-ram.html` |
| FASM 1.73.32 | Werkzeug zum Assemblieren. | `learn/retro/kolibrios/README.md` |
| Marken: Commodore, Amiga, Microsoft, Windows, Hyperion, Cloanto, OpenCode, Suno | Namen werden benutzt. Nur für Commodore/Amiga gibt es einen klaren Hinweis. | `PERMISSIONS.md`, diverse Seiten |

## 4. Geld und Werbung

- Die App ist kostenlos. Keine Abos. Keine In-App-Käufe. Keine Werbung im Kurs.
- Freiwilliger Spendenlink: `https://bunq.me/JMLealRuivo`.
- `outreach/tester-pack.md` nennt einen Platzhalter `[Betrag]`.
  Das ist ein Entwurf. Dort steht noch kein Betrag.
- `learn/ai/features/money.md` und `learn/ai/adults/08-make-money.md`
  sagen ausdrücklich: keine Steuer- oder Rechtsberatung.
- Die Store-Einreichung ist ein Entwurf. Nicht eingereicht.

## 5. Datenschutz — was wirklich passiert

Lokal im Browser, ohne Server:

- Modus `er-mode`, Design `er-theme`, Studio-Dateien, Prompts,
  Erinnerungen, Kurs-Fortschritt und ROM-Dateinamen.

Etwas anderes ist es hier:

- Das CGI-Gästebuch schreibt `tools/cgi/messages.jsonl` auf den Server.
- Die Suno-Brücke sendet bei eigenem Schlüssel an `base/generate`.
- Die Erinnerungs-App verlinkt auf ein öffentliches GitHub-Issue-Formular.
  Was du dort schreibst, wird öffentlich.

Die Aussage „Keine Daten werden gesendet" stimmt für die Offline-Demos.
Sie stimmt **nicht** für das Gästebuch und die Suno-Brücke.
Das sollte klarer unterschieden werden.

Es gibt **keine Datenschutzerklärung und kein Impressum**.

## 6. Die elf offenen Punkte

Ich bewerte jedes Risiko mit niedrig, mittel oder hoch.
Das ist meine Einschätzung, keine juristische Bewertung.

### 1. Kein Root-`LICENSE.md` — mittel
Die Regeln stehen in `AGENTS.md` und `CONTRIBUTING.md`.
Der volle MIT-Text liegt in einem Unterordner.
**Empfehlung:** Eine `LICENSE.md` im Root anlegen.

### 2. GPL-2.0-Code im MIT-Projekt — hoch
`tools/paula-ml.js` basiert auf dem GPL-2.0-siday-Player.
Gleichzeitig sagt `CONTRIBUTING.md` pauschal „Code: MIT".
GPL-2.0 verlangt meist, dass abgeleiteter Code unter GPL bleibt.
Wie das hier vereinbart ist, steht nirgends.
**Empfehlung:** Klären, ob der Player neu geschrieben oder GPL-konform
veröffentlicht wird. Danach die Lizenzangabe genau formulieren.

### 3. AGPL-Kurs in der Store-App — mittel
`microsoft-store.md` kündigt an, den AGPL-Kurs als Store-App zu veröffentlichen.
AGPL hat besondere Pflichten bei Netzwerkdiensten.
Für die Store-App gibt es keine GPL/AGPL-Hinweisdatei.
**Empfehlung:** Vor der Einreichung einen Lizenzhinweis für die App beilegen.

### 4. Kein Impressum, keine Datenschutzerklärung — hoch
Für eine öffentliche Website und einen Store sind das meistens Pflichtangaben.
Besonders bei Spenden und Kontaktformularen.
**Empfehlung:** Beides erstellen. Vor der Veröffentlichung prüfen.

### 5. Marken-Hinweise unvollständig — mittel
Nur für Commodore/Amiga gibt es den Satz
„Not affiliated with, endorsed by, or sponsored by …".
Seiten mit Microsoft, Windows, Hyperion, Cloanto, OpenCode und Suno
haben keinen eigenen Hinweis.
**Empfehlung:** Einen gemeinsamen Markenhinweis auf jede Seite setzen.
Bei OpenCode steht schon: kein offizieller Support. Das ist gut.

### 6. Suno-Behauptung nicht bestätigt — mittel
`learn/cgi.md` sagt, Suno gebe Programmen keinen offenen Weg.
Gleichzeitig wird der Name Suno benutzt und ein API-Key-Mechanismus angeboten.
Der Text sagt ehrlich, dass es nicht bestätigt ist.
**Empfehlung:** So lassen oder von Suno selbst bestätigen lassen.
Nichts als Fakt schreiben, was nicht belegt ist.

### 7. OctaGroover-Lizenz nicht dokumentiert — mittel
Das Modul wird zum Download angeboten.
Herkunft und Autoren sind genannt. Die Lizenz fehlt.
**Empfehlung:** Die Lizenz des Moduls klären oder den Download entfernen.
Quelle und Autoren stehen schon. Das ist ein guter Anfang.

### 8. AROS-One-Name — niedrig
Das Artefakt heißt „AROS One im RAM".
Die Quelle ist genannt.Eine ausdrückliche Erlaubnis für den Namen fehlt.
**Empfehlung:** Quellenangabe behalten. Bei Veröffentlichung nachfragen.

### 9. Boing-Ball-Nachbau — niedrig
Das eigene Bild ist neu gezeichnet. `PERMISSIONS.md` sagt,
die originale Demo brauche eine schriftliche Erlaubnis.
`design-tokens.md` sagt, es sei kein kopiertes Bild.
**Empfehlung:** Die beiden Aussagen aufeinander abstimmen.

### 10. Datenschutz-Zusage ohne Dokument — hoch
`tester-pack.md` verspricht Löschung nach der Arbeit.
Ein Datenschutzdokument fehlt.
Das Gästebuch speichert Daten auf dem Server.
**Empfehlung:** Zusage und echtes Verhalten zusammenbringen.
Datenschutzerklärung schreiben. Gästebuch kenntlich machen.

### 11. Ungeprüfte Zukunftsangaben — niedrig
`23-microsoft.md` nennt 2026 eigene Chips. Dort steht auch
„Ich habe nicht alles selbst geprüft".
`learn/computer-history.md` nennt das Guinness-Buch ohne Belegstelle.
**Empfehlung:** Belege ergänzen oder „nicht belegt" schreiben.
Das Projekt macht das schon an anderen Stellen vorbildlich.

## 7. Was ich empfehle — in dieser Reihenfolge

1. **Root-`LICENSE.md` anlegen.** Kostet wenig, hilft allen.
2. **GPL-2.0-Frage klären.** Das ist der größte Punkt.
3. **Impressum und Datenschutzerklärung schreiben.**
4. **Markenhinweis auf allen Seiten ergänzen.**
5. **Suno-Text und OctaGroover-Lizenz klären.**
6. **Store-Entwurf vor der Einreichung juristisch prüfen lassen.**
7. **Alte Export-ZIPs neu erzeugen.** Sie enthalten den alten Stand.

## 8. Was ich nicht entscheiden kann

- Ob GPL-2.0-Code unter MIT veröffentlicht werden darf.
- Ob die Store-App AGPL-konform ist.
- Ob Impressum und Datenschutzerklärung in deinem Land ausreichen.
- Ob ein Markenname eine Erlaubnis braucht.
- Ob der Spendenlink steuerlich gemeldet werden muss.

Das braucht eine qualifizierte Beratung.
`learn/gesundheit-pruefen.md` beschreibt eine gute Methode:
Prüfen, Quelle nennen, nicht belegt sagen.

## 9. Ehrlich

- Kein Test mit echten Nutzern.
- Kein Store-Test.
- Keine Rechtsberatung.
- Alles ist offen. Aber „offen" heißt nicht „juristisch geklärt".
- Die beiden dringenden Punkte sind GPL-2.0 und Datenschutz.

## 10. Quellen im Projekt

- `AGENTS.md`
- `CONTRIBUTING.md`
- `LICENSE.md` (Root, fehlt) — `products/computer-history/LICENSE.md`
- `products/computer-history/PERMISSIONS.md`
- `learn/coding-course/LICENSE.md`, `learn/coding-course/AGPL-3.0.txt`
- `learn/octagroover.md`, `tools/paula-ml.js`
- `learn/retro/amiga/06-piracy-and-open.md`
- `learn/cgi.md`, `tools/cgi/handler.mjs`, `tools/cgi/server.mjs`
- `outreach/microsoft-store.md`, `outreach/tester-pack.md`
- `site/index.html`, `.gitignore`
