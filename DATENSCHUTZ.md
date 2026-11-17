# Datenschutz — Entwurf

**Wichtig:** Dies ist ein Entwurf.
Die Felder in Klammern musst du selbst ausfüllen.
Danach von einer Beratungsstelle prüfen lassen.
Keine Rechtsberatung.

## Kurz gesagt

Die Lernseiten laufen offline.
Deine Einstellungen bleiben auf deinem Gerät.
Es gibt keine Werbung und keine Tracker.
Es werden keine Daten verkauft.

Etwas anderes gilt für das Gästebuch und die Suno-Brücke.
Das steht unten.

## 1. Was lokal bleibt

Diese Daten liegen nur in deinem Browser:

- Der gewählte Modus (`er-mode`).
- Das gewählte Design (`er-theme`).
- Dateien und Prompts im Studio und im Prompt-Hub.
- Erinnerungen auf der Wand.
- Der Lernfortschritt und ROM-Dateinamen in der Chronik.

Sie werden nicht an uns gesendet.
Du kannst sie im Browser löschen.

## 2. CGI-Gästebuch

Das Gästebuch läuft nur lokal, wenn du den Server selbst startest.

```sh
node tools/cgi/server.mjs
```

Wenn du eine Nachricht schickst, speichert das Programm:

- deinen Namen, falls du ihn eingibst,
- deine Nachricht,
- den Zeitpunkt.

Die Daten liegen in `tools/cgi/messages.jsonl` auf deinem Rechner.
Die letzten fünf Nachrichten werden angezeigt.

**Bitte keine echten Namen von anderen Menschen und keine Fotos.**

Wenn du die Nachricht löschen willst:
Schreib uns an [DEINE E-MAIL-ADRESSE].

## 3. Suno-Brücke

Die Brücke ist standardmäßig aus.
Sie sendet nur etwas, wenn du selbst einen Schlüssel
in die Umgebung deines Rechners schreibst.

Dann geht der Prompt an den von dir eingestellten Endpunkt.
Ohne Schlüssel passiert nichts.
Ein Schlüssel steht nie im Quelltext.

## 4. Erinnerungen

Die Erinnerungs-App speichert erst lokal.
Mit der Taste „Als Issue teilen" öffnet sie ein Formular auf GitHub.
Was du dort abschickst, wird öffentlich.
Teile keine fremden Namen und keine Fotos.

## 5. Keine Werbung, keine Tracker

- Keine Cookies zu Werbezwecken.
- Keine Analyse-Dienste.
- Keine sozialen Plugins, die beim Laden Daten senden.
- Keine Datenverkäufe.

Der Spendenlink ist freiwillig.
Beim Klick verlässt du die Seite.
Dann gelten die Regeln des Spendenanbieters.

## 6. Deine Rechte

Du kannst Auskunft und Löschung verlangen.
Schreib dazu an [DEINE E-MAIL-ADRESSE].
Ob weitere Rechte gelten, hängt vom Land ab.
Frag eine Beratungsstelle.

## 7. Verantwortlich

[DEIN NAME]
[ADRESSE]
[E-MAIL]

## 8. Stand

Diese Erklärung ist ein Entwurf vom 17. November 2026.
Sie ist nicht von einer Anwältin geprüft.
Das Projekt ist nicht mit echten Nutzern getestet.
