# GitHub Login mit freiem Zugang

## Was das ist

Du kannst dich mit deinem GitHub-Konto anmelden.
Der Zugang ist für alle frei.
Kein Abo. Keine Bezahlung. Keine Werbung.

Der Login zeigt nur, dass du ein Konto hast.
Er sperrt nichts. Alle Lektionen bleiben offen.

## Was du brauchst

- Ein GitHub-Konto.
- Eine OAuth-App bei GitHub.
- Eine Client-ID und einen Client-Secret.

Beides kommt in die Umgebung.
Nichts davon steht im Quelltext.

```sh
set GITHUB_CLIENT_ID=deine-id
set GITHUB_CLIENT_SECRET=dein-secret
node tools/github/server.mjs
```

Dann öffne `http://localhost:8126`.

In der OAuth-App trägst du diese Adresse ein:

```text
http://localhost:8126/callback
```

## So meldest du dich an

1. Klicke auf **Mit GitHub anmelden**.
2. GitHub fragt dich nach deinem Konto.
3. Du bestätigst den Zugriff.
4. Die Seite zeigt deinen Namen.

## Abmelden

Klicke auf **Abmelden**.
Die Seite löscht den lokalen Token.

## Sicherheit

- Kein Passwort im Code.
- Kein Secret im Code.
- Der Token bleibt in `tools/github/runtime/`.
- Dieser Ordner ist in `.gitignore`.
- Der Server läuft nur auf deinem Rechner.

## Ehrlich

- Ohne Client und Secret geht kein Login.
- Der Zugang ist trotzdem für alle frei.
- Der Login sendet keine E-Mails.
- Kein Test mit echten Nutzern.
- Keine Rechtsberatung.

## Weiterlesen

- `learn/google-login.md` — der Login für den Mailer.
- Die Beta-Anfrage an Peri Fractic im Ordner `outreach`.
