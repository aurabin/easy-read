# Design aus der Retro-Zeit

Ich habe im Internet gestöbert und Bilder angeschaut.
Das war am 17. November 2026.
Ziel: aus der Retro-Scene Design lernen.
Die ganze Chronik steht im Ordner `learn`.
Die Poesie des Amiga-Teams steht im Amiga-Ordner.

## Was ich angeschaut habe

| Bild | Quelle | Was zu sehen ist |
| --- | --- | --- |
| Boing Ball | Mical, 1984 | Kugel, Schatten, Gitter. |
| Space Invaders | Atari, 1980 | Großer Titel, UFO-Bild. |
| Atari-Katalog | 1980er | Gitter, CRT, Joysticks. |
| Pixelbild | OrangeCrush | Raster, Spiel aus Monitor. |

Ein paar Einzelheiten:

- Die Kugel ist rot und weiß. Sie wirft einen Schatten. Das Gitter ist violett.
- Bei Space Invaders ist der Titel weiß. Die zweite Zeile ist gelb. Das Bild ist gemalt.
- Im Katalog leuchtet ein Gitter. In der Mitte steht ein Bildschirm. Das Licht ist rot.
- Das Pixelbild hat klare Umrisse. Die Spielwelt kommt aus dem Monitor.

Texte habe ich auch gelesen:

- Wikipedia: Demoscene.
- 99designs: Einfluss der 80er-Spiele.
- Medium: State of the Art.
- Mical: seine Seite zum Boing Ball.
- Retro8bitShop und Editions64k: zur Scene.

---

## 1. Geschichte: woher das Design kommt

1. **Display Hacks (ab 1950er):** erste Programme. Sie zeigten nur etwas Schönes.
2. **Cracktros (frühe 1980er):** Cracker entfernten Kopierschutz. Sie signierten mit
   Startbildern. Aus Signaturen wurde ein Wettbewerb um die schönste Präsentation.
3. **Eigene Demos (ab 1985/86):** 1001 Crew und The Judges (C64) machten Demos ohne
   Spiel. Die Scene war geboren. 1985 kam der Boing Ball auf den Amiga.
4. **Demoparties (ab 1991):** The Party, Assembly, Breakpoint, Revision. Es gab
   Wettbewerbe. Es gab Abstimmungen und Charts für Coder, Grafiker und Musiker.
5. **Size-Intros:** 4 KB und 64 KB. Grenzen zwingen zur Erzeugung zur Laufzeit.
6. **Heute:** Finnland (2020), Deutschland und Polen (2021) nahmen die Scene auf.
   Die Niederlande (2023) und Schweden und Frankreich (2025) auch.
   Es ist Kulturerbe der UNESCO.

**Lektion:** Kunst entsteht hier aus Zwang. Nicht aus Überfluss. Grenzen sind der Motor.

## 2. Farbe und Kontrast

- Sehr wenige Farben. Extrem hoher Kontrast. Neon auf Schwarz oder Dunkelblau.
- Der Ball nutzt vier Farben: Rot, Weiß, Schwarz, Violett.
  Genau das macht ihn leicht zu erkennen.
- Cover aus den 80ern: kräftige Farben. Fast schon neon. Gegen dunklen Grund.
- Dark Mode ist keine kurze Mode. Er kommt aus Arcade und Röhrenmonitor.
  Weniger Belastung für die Augen. Bessere Lesbarkeit in dunklen Räumen.

**Für uns:** dunkler Grund. Wenige kräftige Akzente. Keine verwaschenen Farben.

## 3. Pixelkunst und Raster

- Pixelkunst ist Arbeit im Raster. Ein Bild ist eine Anordnung von Quadraten.
- Ein 8×8-Raster prägte Pixel-Fonts. Monospace: jedes Zeichen ist gleich breit.
- Umrisse von einem Pixel machen Formen lesbar. Siehe das moderne Pixelbild.
- Dithering täuscht mehr Farben vor. Das Gerät hat sie gar nicht.
- Alte Cover waren oft handgemalt. Zum Beispiel mit Öl oder Airbrush.
  Sie sahen **nicht** aus wie das Spiel. Sie verkauften ein Gefühl. Nicht die Auflösung.

**Für uns:** klare Umrisse. Bewusstes Raster. Lieber ein starkes Bild als Details.

## 4. Tricks der Hardware als Stilmittel

- **Boing Ball:** Die Kugel dreht sich durch *Farbzyklus* im Chip. Sie wird nicht neu gezeichnet.
  Das Springen läuft über Scrollen im Bildfeld. Der Schatten ist halb durchsichtig.
  Der Ton kommt vom Soundchip. Die CPU rechnet nur die Winkel.
  Darum bleibt viel Kraft frei. Echtes Multitasking war möglich.
- **Copperbars / Rasterbars:** Der Strahl wird beim Zeichnen der Zeile umgefärbt.
  Streifen entstehen fast kostenlos.
- **State of the Art:** Schatten sind derselbe Tänzer. Er wird oft versetzt gezeichnet.
  Die Überlagerung erzeugt das Leuchten. Karos entstehen durch Farbwechsel pro Zeile.
  Die Ringe sind ein einziges Bild. Es scrollt unter den Tänzern.
  1992 gab es schon Tweening. Zwischenbilder wurden berechnet, nicht gespeichert.
- **64K-Intros:** Texturen, Musik und 3D-Netze entstehen zur Laufzeit. Nicht gespeichert.

**Für uns:** Ein paar Regeln sind besser als viele Bilder.
Unser Vektorfeld und die Kugel bauen wir so. Mit Farbwechsel und Nachbildern.
Keine 1000 einzelnen Assets.

## 5. Typografie

- Große, schwere Titel (Space Invaders). Sofort lesbar.
- Eine zweite Ebene in Akzentfarbe. Gelb auf Schwarz.
- Pixel-Fonts: Press Start 2P, Pixel Operator, Sabo. Bis heute gefragt.
- Ein Logo ist eine Signatur. Gruppen waren stolz darauf.

**Für uns:** Klare Hierarchie. Erst Titel, dann Kicker, dann Text.
Eine Akzentfarbe. System-Fonts statt lizenzierter Webfonts.

## 6. Klang

- **SID (C64):** einfache Wellenformen, Filter, schnelle Arpeggios.
  Aus wenig Hardware entsteht viel Musik.
- **Paula (Amiga):** Samples, 4 Kanäle. Ultimate Soundtracker 1987. Daraus wurde MOD.
- Tracker-Musik ist Sequenzierung von kurzen Samples. Effekte wie Vibrato oder Arpeggio
  kommen aus den 8-Bit-Chips.
- Musik läuft **mit** dem Bild. State of the Art lebt davon.
- Über 40.000 SID-Stücke liegen in der High Voltage SID Collection. Die Scene archiviert.

**Für uns:** Kurze Loop-Motive. Erzeugt mit Web Audio. Ein Motiv pro Epoche.
Das Motiv passt zur Bewegung. Kein langes Audio-File nötig.

## 7. Bewegung und Zeit

- Alles ist getaktet: Sprung, Scroll, Farbwechsel, Ton.
- Nachbilder statt Explosionen. Weniger ist mehr.
- CRT-Effekt: Scanlines und Glow gehören zur Erinnerung. Optionale Shader zeigen das heute in 4K.
- Tweening und Interpolation: 25 fps Original, 60 fps heute.
  Das Original wird nicht neu gezeichnet.

**Für uns:** Ruhige Animation im Takt.
„Less motion" und reduced-motion sind modern.
Sie bedeuten: alles abschalten und das Original sehen.

## 8. Oberflächen

- Der Workbench brachte den Desktop auf einen Heimcomputer.
  Vorher gab es ihn schon beim Alto und beim Macintosh.
  Icons, Fenster, Menüs, Requester. Alles ging mit der Maus.
- Sehr niedrige Auflösung. Darum große, klare Ziele und kurze Labels.
- Der Requester ist eine eigene Kunstform. Knapp, höflich, eine Frage pro Dialog.

**Für uns:** große Klickziele. Ein Gedanke pro Dialog. Die Tastatur geht auch.

## 9. Kultur und Ethik

- Kernwerte: Teilen, Handwerk, die Maschine weiter treiben.
- „Ripping" war verpönt. Kopieren ohne Erlaubnis zählte nicht.
- Handles statt Klarnamen. Heute Selbstausdruck, früher auch Schutz.
- Cracktro ist nicht Demo. Cracks entfernten Schutz. Demos sind eigene Kunst.
  Die Macher und Gruppen wie Spaceballs oder TMB verdienen Kredit.
  Der Remake-Autor fragte Lone Starr um Erlaubnis.
  Er ersetzte die Nachricht auf Wunsch.
- John Carmack lobte 64K-Intros. Künstliche Grenzen fördern kreative Programmierung.

**Für uns:** Alles selbst machen. Quellen nennen. Keine fremden Assets bündeln.
Nachfragen, wenn wir fremde Arbeit nutzen.

## 10. Wirkung bis heute

- Neon, Dark Mode, Pixel-Fonts und Glitch kommen aus dieser Ära.
  Auch volle Interfaces und Interaktivität.
- Das Tron-Gitter und OutRun kommen auch daher.
- Spielebranche: Future Crew wurde zu Remedy. Der Designer von Angry Birds war Demoscener.
  Unity-Leute kamen aus PSP-Demos.
- Creative Coding: Shadertoy und Three.js haben Wurzeln in der Scene.
- Marken wie Atari, Commodore, Nintendo und Sega gehören ihren Inhabern.

---

## Was ich daraus gelernt habe

1. **Weniger Farben, mehr Wirkung.** Unsere Palette ist gut. Kein Farbrauschen.
2. **Die Kugel ist das Logo.** Rot-weiß, Schatten, Gitter. Selbst gezeichnet.
3. **Regeln statt Assets.** Das Feld erzeugt Bewegung aus wenigen Zeilen Code.
4. **Ein Motiv pro Epoche.** Kurze Loops, getaktet zur Bewegung.
5. **CRT als Option.** Scanlines sind schön. Aber abschaltbar.
6. **Kredit und Erlaubnis.** Eigene Bilder. Keine ROMs.
   Das Modul `Ml.OctaGroover` ist offen. Wir nennen die Quelle.
   Das steht in `PERMISSIONS.md` und im Lehrtext zur Piraterie.
7. **Klare Wörter zuerst.** Kontraste, große Ziele, ein Gedanke pro Dialog.
   Ob es wirklich gut ist, prüfen echte Leser.
   Reduced motion ist unsere Version von „alles abschalten".

## Quellen

```text
wikipedia.org/wiki/Demoscene
randelshofer.ch (Boing Ball)
medium.com (State of the Art)
99designs.com (Spiele-Design)
retro8bitshop.com (Digitale Kunst)
editions64k.fr (Demoscene)
```
