# KolibriOS mit 64 Bit — Konzept

## Der Stand heute

KolibriOS läuft auf 32-Bit-x86-CPUs.
Der Kern ist in FASM-Assembler geschrieben.
Die Vorlage MenuetOS gibt es auch als 64-Bit-Ausgabe.
Das ist ein gutes Vorbild für einen Port.

Ich kann das Betriebssystem hier nicht wirklich umbauen.
Es gibt hier kein KolibriOS zum Booten.
Dies ist daher ein Plan, kein fertiger Port.

## Was 64 Bit ändert

Die Register werden breiter. Aus `eax` wird `rax`.
Man kann mehr als 4 GB Speicher ansprechen.
Die CPU muss in den Long Mode wechseln.
FASM erzeugt solchen Code mit `use64`.

## Was umgebaut werden müsste

1. **Start:** Der Rechner beginnt im Real Mode. Er muss über
   PAE und Seitentabellen in den Long Mode wechseln.
2. **Kern:** Alle `use32`-Teile werden zu `use64`.
   Zeiger und Größen müssen 64 Bit breit sein.
3. **Systemrufe:** Statt `int 0x40` nutzt man `syscall`.
4. **Speicher:** Neue Seitentabellen mit vier Ebenen.
5. **Treiber:** Grafik, PCI, USB, Netz und Ton anpassen.
6. **Oberfläche:** Fenster, Schriften und Zeichnen prüfen.
7. **Programme:** Über 250 Anwendungen sind betroffen.

## Alte Programme laufen weiter

Moderne x86-CPUs können 32-Bit-Code weiter ausführen.
Das nennt man den 32-Bit-Modus.
Ein 64-Bit-Kern kann das nutzen:

- Der 64-Bit-Kern startet zuerst.
- Alte 32-Bit-Programme laufen im Kompatibilitätsmodus weiter.
- Ihr `MENUET01`-Kopf bleibt gültig.
- `int 0x40` bleibt für alte Programme erhalten.
- Neue Programme nutzen `syscall` und einen neuen Kopf.
- Alte Programme bekommen Speicher unter 4 GB.

So könnte man Schritt für Schritt umstellen.
Nichts müsste am ersten Tag neu geschrieben werden.

## Unser BOING-Programm

Die 32-Bit-Datei `BOING` bleibt unverändert nutzbar.
Sie ist 400 Byte groß und assembliert fehlerfrei.
Eine 64-Bit-Fassung wäre ein zweites Programm im Paket.
Beide könnten nebeneinander liegen.

## Ehrlich

Das hier ist ein Entwurf.
Ich habe FASM 1.73.32 genutzt und die 32-Bit-Datei gebaut.
Einen 64-Bit-Kern habe ich nicht getestet.
Bitte mit den KolibriOS-Leuten und OSDev abgleichen.

## Quellen

```text
Wikipedia (KolibriOS, MenuetOS)
kolibrios.org
wiki.kolibrios.org
wiki.osdev.org (Long Mode)
flatassembler.net (use64)
```

## Weiterlesen

- `README.md` — was heute auf KolibriOS läuft.
- `../assembly/README.md` — unsere 6502- und 68000-Quellen.
