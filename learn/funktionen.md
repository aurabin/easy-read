# Funktionen — eine Regel, ein Ergebnis

## Was ist eine Funktion?

Eine Funktion ist eine Regel.
Du gibst etwas hinein.
Die Regel verarbeitet es.
Du bekommst genau ein Ergebnis.

Stell dir eine Maschine vor.
Du gibst einen Rohstoff hinein.
Die Maschine arbeitet nach einer festen Regel.
Am Ende kommt ein Produkt heraus.

Das ist eine Funktion.

## In der Mathematik

Man schreibt y gleich f von x. X ist die Eingabe. Y ist das Ergebnis. F ist die Regel.

Beispiel: f(x) = 2x + 1.
Gibst du 3 hinein, kommt 7 heraus.
Gibst du 3 noch einmal hinein, kommt wieder 7 heraus.
Immer dasselbe. Das ist wichtig.

### Die drei Teile

- **定义域** (dìngyìyù) — die erlaubten Eingaben.
  Alle Werte, die du hineingeben darfst.
- **对应法则** (duìyìng fǎzé) — die Regel.
  Sie sagt, was gerechnet wird.
- **值域** (zhíyù) — die möglichen Ergebnisse.
  Alle Werte, die herauskommen können.

### Die goldene Regel

Jede Eingabe hat **genau eine** Ausgabe.
Eine Eingabe darf nicht zwei Ergebnisse haben.
Viele Eingaben dürfen dasselbe Ergebnis haben.
Das ist erlaubt.

## Bekannte Funktionen

- **Gerade** — einfach, linear.
- **Parabel** — quadratisch, wie eine Schüssel.
- **Exponential** — wächst sehr schnell.
- **Logarithmus** — wächst sehr langsam.
- **Sinus** — wiederholt sich, wie eine Welle.

Unsere Felder benutzen Sinus und Cosinus.
Daraus werden Wirbel und Wellen.

## Beim Programmieren

Eine Funktion ist ein kleiner Code-Baustein.
Sie hat einen Namen.
Sie hat Parameter — das ist die Eingabe.
Sie hat einen Körper — das ist die Regel.
Sie hat einen Rückgabewert — das ist die Ausgabe.

```js
function f(x){
  return 2*x + 1;
}
```

Schreib sie nicht immer wieder neu. Nutze sie wieder.
Das spart Code. Das macht Programme klein.

Berühmte kleine Programme nennt man Sizecoding.
256 Bytes können ein ganzes Bild erzeugen.
Das ist dieselbe Kunst wie bei C64 und Amiga.

## Der Unterschied

Eine mathematische Funktion hat keine Nebenwirkung.
Sie rechnet nur.

Eine Funktion im Code darf auch etwas tun. Sie kann Text schreiben. Sie kann Farben ändern. Das nennt man Nebenwirkung.

## Im Alltag

- **SUM()** in der Tabelle — addiert Zahlen.
- **AVERAGE()** — rechnet den Durchschnitt.
- **IF()** — prüft eine Bedingung.
- **Barcode → Preis** — jeder Barcode hat genau einen Preis.

## Unsere Felder

In `outreach/apps/system-felder.js` stehen kleine Funktionen:

```js
wirbel: (x,y,t) => [cos(y*.01+t), sin(x*.01+t)]
welle:  (x,y,t) => [1, sin(x*.02+t)*1.5]
```

Jede Funktion bekommt x, y und die Zeit t.
Sie gibt eine Bewegung zurück.
Aus der Bewegung entsteht ein Bild.
Kleine Regel, großes Bild. Das ist die Kunst.

## Ehrlich

- Keine erfundenen Quellen.
- Nicht mit echten Nutzern getestet.
- Die Felder sind eigene Umsetzungen.

## Quellen

- Wikipedia: Funktion, 函数
- Baidu: 函数
- Mathieu Acher: Size Coding, ein Film in 256 Bytes.
  Im Netz unter blog.mathieuacher.com.
