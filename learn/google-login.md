# Login with Google

## Was das ist

Du kannst dich mit deinem Google-Konto anmelden.
Danach darf der Nebentask für E-Mails eine Nachricht senden.
Das passiert nur, wenn du es sagst.

## Was du brauchst

- Ein Google-Konto.
- Eine Client-ID aus der Google Cloud Console.
- Die Adresse `http://localhost:8125/oauth2callback` muss dort eingetragen sein.

Die Client-ID kommt in die Umgebung.
Sie steht nie im Quelltext.

```sh
set GOOGLE_CLIENT_ID=deine-id.apps.example.com
node tools/google/server.mjs
```

Dann öffne `http://localhost:8125`.

## So meldest du dich an

1. Klicke auf **Mit Google anmelden**.
2. Google fragt dich nach deinem Konto.
3. Du bestätigst den Zugriff.
4. Die Seite zeigt deine E-Mail-Adresse.

## Danach senden

Die Datei für Peri Fractic liegt unter `outreach/email-*.json`.
Nenne sie im Befehl `DATEI.json`.

Erst einen Probelauf ohne Versand:

```sh
node tools/email/send.mjs DATEI.json
```

Dann erst mit Zustimmung:

```sh
node tools/email/send.mjs DATEI.json --send
```

Die Adresse im JSON ist ein Platzhalter.
Du musst sie einsetzen.

## Sicherheit

- Kein Passwort im Code.
- Kein Token im Code.
- Der Token bleibt in `tools/google/runtime/`.
- Dieser Ordner ist in `.gitignore`.
- Der Server läuft nur auf deinem Rechner.
- **Abmelden** löscht den Token.

## Ehrlich

- Ohne Client-ID geht nichts.
- Ein Probelauf sendet nichts.
- Ein Platzhalter wird nie versendet.
- Kein Test mit echten Nutzern.
- Keine Rechtsberatung.

## Weiterlesen

- `DATENSCHUTZ.md` — was mit Daten passiert.
- Die Beta-Anfrage an Peri Fractic im Ordner `outreach`.
