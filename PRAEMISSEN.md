# Meine Prämissen — vollständig

Stand: 17. November 2026.
Dies sind alle Regeln und Wünsche des Projektinhabers.
`AGENTS.md` hat die alten. Diese Datei hat alle — auch die neuen.

## Grundhaltungen

- **Nur schriftlich.** Kein Video, kein Anruf, kein Treffen.
- **Ehrlichkeit zuerst.** Nie „accessible" oder „getestet" sagen.
  Immer: „noch nicht mit echten Nutzern getestet".
- **Nichts löschen** ohne meine ausdrückliche Erlaubnis.
  Auch nicht, wenn es unordentlich wirkt.
- **Keine eigenen Ergänzungen.** Ich mache nur, was ich gesagt habe.
  Keine neuen Themes, Icons oder Funktionen von mir aus.
- **Fragen, wenn unklar.** Lieber einmal fragen als falsch bauen.

## Benennung

- Nicht technisch. **Poetisch.**
- Herausrichten nach: **Kunst, Poesie, Musik, Philosophie, Phantasie, Wissenschaft.**
- Namen wie „Das erste Flüstern", „Der kleine Tanz", „Das große Atmen".
- Nicht „QUARKS", „ATOM", „UNIVERSUM" — sondern die Geschichte dahinter.

## Das Projekt

- Offenes Lernsystem. Easy Read. Retro-Computer. Kunst. Musik. KI. Geld.
- **C64 zuerst, dann Amiga.** Assembly in Einfacher Sprache.
- Ein `/learn` Modus mit Packs — keine getrennten Werkzeuge.
- Der Witz bleibt überall: „Mir reichts! Ich geh schaukeln!
  Meine Freunde gehen rutschen!". Nie über den Leser lustig machen.
- „0+" heißt: kein Vorwissen. Nicht: Kinderbuch.
- Kids-Kurs heißt exakt: **„AI Coding Course for ALL Kids!"**

## Der Store

- **Store-Entwurf eingefroren.** Nicht eingereicht.
- Grund: Das Projekt nennt andere Betriebssysteme.
- Fokus auf die **WIP-Beta für Peri Fractic**.
- Die App ist überall **kostenlos**. Kein Abo. Kein Kauf. Keine Werbung.
- Der Spenden-Button ist entfernt. Monetarisierung nur als Dokumentation.
- **„Very special thanks to OpenCode AI"** steht nur auf der Startseite.
- Ich danke Microsoft und OpenCode. Offen, aber nicht offiziell unterstützt.

## Lizenzen und Geheimnis

- Code MIT. Bilder und Texte CC0 oder CC BY.
- Der Kurs `learn/coding-course/` ist AGPL-3.0 — meine bewusste Wahl.
- `virtual_field_generator/` bleibt **geheim und lokal**.
  Never löschen, nie veröffentlichen, nie einchecken.
- Keine urheberrechtlichen ROMs. Keine fremden Bilder ohne Quelle.
- Keine erfundenen Quellen. Wenn nicht belegt: „nicht belegt".

## Design

- **Naturmuster sind das Gesetz.** Zehn Muster aus der Natur:
  Spiegel, Fünfstrahl, Sechskant, Farn, Sonnenblume, Flecken,
  Fluss, Schaum, Düne, Riss.
- Echte Farben: C64-Blau `#352879`, Hellblau `#6c5eb5`,
  Amiga-Creme `#f5f0e6`, Nachtgitter `#070b14`, Sky `#6fd3ff`,
  Violett `#7a20d0`, Rot `#e8382f`, Gelb `#f2d000`, Grün `#3fa04a`.
- Keine erfundenen Farben. Keine kalten abstrakten Muster.
- **Sizecoding-Geist:** kleine Funktionen, große Bilder.
  Wie C64 (64/256 Bytes) und Amiga (400/656 Bytes).
- **Funktionen als Denkmodell:** Eingabe → Regel → Ausgabe.
- Bilder sollen **Geschichten** erzählen.
  Ein Mund mit Nahrung wird „süß" — so ist 甘 entstanden.

## Felder und Spiele

- Ziel: **ein virtuelles Feld, ein phantasievolles Spiel**.
- Die Kosmos-Reise führt Schritt für Schritt vom Mikrokosmos
  über die Erde und das Leben bis zum Makrokosmos.
- Option: **etwas hinzufügen** — eigene Dinge im Feld.
- Alle Felder sollen **realistisch** sein: echte Modelle,
  echte Größenordnungen, echte Physik.
- Referenzen: de.wikipedia.org (Vektorfeld),
  vamigaweb.github.io, taws.ch, c64emulator.111mb.de,
  blog.mathieuacher.com (Sizecoding).
- Wir nennen Quellen. Wir kopieren keinen Code.

## Chinesisch

- 甘 (gān) ist das letzte chinesische Zeichen im Chat.
- Bedeutung: süß, bereit, Gansu, Familienname, Radikal 99, fünf Striche.
- Es gibt eine Lektion und ein „süßes Wunder" im Feld.
- Chinesische Prüfung nutzt `--lang zh`.

## Technik

- `docs/` ist generiert. Nie direkt bearbeiten.
  Nach Änderungen: `node field-generator/build-docs.mjs`.
- WAV ist global erlaubt (Entscheidung des Besitzers, 17.11.2026).
  Jede Sample-Lizenz muss klar sein: eigene Aufnahme, CC0 oder CC BY.
- WASM-Kern mit JavaScript-Rückfall.
- KolibriOS: native FASM, nicht Browser-Demos.
- Boing Ball: echte Physik, `6.8` Bounce, Ton bei Aufprall,
  viele Tabs schließen nach Browser-Checks.
- Alles offline nutzbar, selbst hostbar, statische Dateien.

## Arbeitsweise

- Kurze Sätze. Alltagswörter. Aktive Stimme. Ein Gedanke pro Abschnitt.
- Easy Read **100/100** wo möglich.
- Jede Prüfung muss grün sein: `node tools/self-engineer.mjs`.
- Nicht mit echten Nutzern getestet — das immer sagen.
- Wenn etwas technisch unmöglich ist: klar sagen, Alternative anbieten.
- Keine Modelle ändern. Keinen Reset vortäuschen. Diese Datei ist der Ersatz.

## Quellen dieser Prämissen

- `AGENTS.md` — die alten Regeln.
- Dieses Gespräch — alle neuen Regeln.
- `LEGAL-STATUS.md`, `FREIHEIT.md`, `FREEDOM.md`, `SYNTHESE.md`.
- `learn/design-aus-der-natur.md`, `learn/funktionen.md`,
  `learn/chinesisch-lernen.md`.
- `outreach/peri-fractic-beta.md`, `outreach/china-sales.md`.

## Ehrlich

Diese Datei ist jetzt die vollständige Sammlung.
Wenn etwas fehlt: sag es mir, ich ergänze es.
Ich ändere nichts ohne deine Anweisung.
