# Lektion 25 — AROS Entwicklung

## Die Idee

AROS wird von Freiwilligen gebaut.
Sie schreiben ein Betriebssystem neu.
Der Code liegt offen im Internet.
Jede Person darf ihn lesen.
Jede Person darf ihn verbessern.

## Wo der Code liegt

Der Code liegt bei GitHub.
Das Repository heißt AROS.
Dort liegt auch das Bausystem.

Der Code liegt auf GitHub.
Suche dort nach AROS.

Es gibt noch zwei Sammlungen.
Die erste heißt `contrib`.
Die zweite heißt `ports`.
Dort liegen Programme von anderen.
Quelle: developers.aros.org, Seite „Git".

## Das Ziel

AROS soll so arbeiten wie AmigaOS 3.1.
Diese Regeln heißen API.
Eine API sind Regeln für Programme.
Alte Programme sollen mit AROS sprechen.
AROS kopiert aber keinen alten Code.
Alles wird neu geschrieben.
Quelle: aros.org, Seite „Introduction".

## Zwei Wege zu bauen

Es gibt zwei Wege, AROS zu bauen.
Weg 1: Auf Linux, FreeBSD oder macOS bauen.
Das heißt: Ein anderer Rechner baut AROS.
Weg 2: Direkt auf AROS bauen.
Quelle: developers.aros.org, Seite „Compiling".

## Die Schritte

1. Hole den Code von GitHub.
2. Öffne den Ordner.
3. Stelle die Bau-Regeln ein.
4. Starte den Bau.
5. Prüfe das Ergebnis.

Für Schritt 1:
Gehe auf GitHub und suche nach AROS.
Kopiere den Befehl, den GitHub dir zeigt.
Der Befehl heißt `git clone`.
Er holt den Code auf deinen Rechner.

Öffne den Ordner:

```sh
cd AROS
```

Stelle die Bau-Regeln ein:

```sh
./configure
```

Starte den Bau:

```sh
make
```

Das solltest du sehen:
Der Bau läuft eine Weile.
Danach liegt eine Datei im Ordner `distfiles`.
Sie heißt `aros-pc-i386.iso`.
Das ist eine startbare Datei.

Wenn es nicht geht:
Prüfe, ob `make` installiert ist.
Prüfe auch, ob der Ordner `bin` alt ist.
Lösche ihn und starte neu.

## Wie du helfen kannst

Du kannst den Code kopieren und ändern.
Das heißt: ein Fork.
Dafür brauchst du keine Erlaubnis.
Willst du den Hauptcode ändern, fragst du das Team.
Du schickst erst kleine Änderungen.
Dann kannst du mitmachen.

Du musst keinen Code schreiben.
Du kannst auch:

- eine Bauart testen und Fehler melden
- Texte in deine Sprache übersetzen
- die Hilfe verbessern
- einen kleinen Fehler beheben
- ein Programm zu AROS bringen

Man schickt Änderungen als Pull Request.
Ein Pull Request ist ein Vorschlag.
Andere sehen den Vorschlag vorher.
Sie können ihn annehmen oder Fragen stellen.
Bei großen Änderungen fragt man zuerst.
Man fragt auf der Mailingliste.
Es gibt auch einen Slack-Kanal.
Es gibt Regeln für gutes Verhalten.
Quelle: GitHub, Datei `CONTRIBUTING.md`.

## Jeden Tag neu gebaut

Es gibt fertige Bauarten jeden Tag.
Sie heißen „Nightly Builds".
Sie kommen aus dem Git-Repository.
Du musst nicht selbst bauen.
Quelle: aros.org, Seite „Nightly Build Downloads".

## Ehrlich

Ich habe AROS nicht selbst gebaut.
Ich habe die Anleitungen gelesen.
Nicht mit echten Nutzern getestet.

## Weiterlesen

- [AROS helfen](26-aros-helfen.md) — wie du mitmachst.
- [AROS](18-aros.md) — was AROS ist.
- developers.aros.org — die Anleitungen.
- GitHub — der Code, wie oben gezeigt.

---
Lizenz dieses Kurses: AGPL-3.0 — siehe [LICENSE.md](LICENSE.md).
