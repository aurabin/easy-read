# CGI — ein Programm für alle

## Was ist CGI?

CGI ist ein Fachwort aus dem Web.
Ein Programm bekommt eine Frage.
Es gibt eine Antwort zurück.
So war das Web früher.

Heute liegen die meisten Seiten nur als Datei da.
CGI braucht einen Rechner, der Programme startet.

## Was wir gebaut haben

Unser Programm heißt CGI.
Es läuft bei jeder Frage neu.
Es macht zwei Dinge:

1. Ein Gästebuch. Nur Text. Kein Video, kein Anruf.
2. Einen Weg zu Suno.

Im Gästebuch schreibst du eine kurze Nachricht.
Andere Namen und Fotos sind nicht erlaubt.

## Suno — ganz ehrlich

Suno ist eine Website für Musik mit KI.
Du kannst dort selbst Musik machen.
Aber Suno gibt Programmen keinen offenen Weg.
Das ist nicht von Suno selbst bestätigt.

Wir haben keinen Zugang. Wir zahlen nichts.
Wir nutzen keine anderen bezahlten Dienste.

Unser Programm hilft dir trotzdem:

- Es schreibt einen Satz für Suno.
- Du kannst den Satz kopieren.
- Du kannst ein Lied von Suno laden.
- Daraus machst du ein Bild.

Hast du später doch einen Zugang?
Dann legst du ihn in die Einstellungen deines Rechners.
Der Schlüssel steht nie im Quelltext.
Fehlt er, bleibt der Weg zu Suno zu.

## So startest du es

```sh
node tools/cgi/server.mjs
```

Dann öffne `http://localhost:8124`.
Die Musik-Seite läuft dort auch.
Sie heißt `apps/cgi-music.html`.

## Musik wird Bild

Die Musik-Seite macht kurze Musik mit vier Reihen.
Du klickst auf kleine Felder.
Das Bild ändert sich mit dem Ton.
Du kannst ein Bild und ein Video speichern.
Kein WAV. Das gilt im ganzen Projekt.

## Ehrlich

Das ist nicht mit echten Nutzern getestet.
Kein Geheimnis steht im Code.
Keine Werbung. Keine Datenverkäufe.
Die App ist kostenlos für alle.

## Weiterlesen

- `CONTRIBUTING.md` — Mitmachen, nur schriftlich.
- Die Geschichte der Computer — unser Überblick.
