# Lektion 28 — Underfork: Web Technologien für AROS

## Die Idee

Ein **"Underfork"** bedeutet: Wir nehmen bestehende Web-Technologien und
schaffen einen Weg, sie auf AROS zum Laufen zu bringen — nicht als Kopie,
sondern als angepasste Version, die die Philosophie des Projekts respektiert.

Dies ist kein "echter Fork" im Git-Sinne (wo man das Original kopiert),
sondern ein **neuer Weg**, der "unter" der ursprünglichen Oberfläche verläuft.

## Warum ein Underfork?

| Grund | Erklärung |
|-------|-----------|
| **Browser-Unterstützung** | AROS-Browser (NetSurf/OWB) können JavaScript, aber oft kein WebAssembly |
| **Eingabeschwierigkeiten** | Tastatur/Maus-Mapping auf AROS input.device ist anders als im Browser |
| **Canvas-Grafik** | Canvas-Rendering unterscheidet sich zwischen browser-framebuffer und AROS-Gfx |
| **Audio-Handling** | Web Audio API vs. AROS Sound device |
| **Philosophie** | "Kleiner Code, große Bilder" soll erhalten bleiben, aber auf neueren Plattformen |

## Zwei Ansätze für den Underfork

### Weg 1: Die "Schichten"-Methode (empfohlen)

Wir trennen die Technologien in Ebenen und betreuen jede separat:

```
Ebene 1: Inhalts-Lieferung (funktioniert schon)
├── HTML-Text,
│   ├── Lektionen,
│   ├── Bilder,
│   └── Disclaimer ("nicht getestet")
├── CSS-Styles,
│   ├── Nachtgitter-Token,
│   └── Modi (cb/low/deaf)
└── Ebene 2: Interaktivität (braucht Anpassung)
    ├── Feld-Generator-Logik,
    │   ├── JS-Code (teilweise anpassbar),
    │   └── WASM-Änderung (optional)
    ├── Boing-Ball-Physik,
    │   ├── Assembly-Variante (existiert bereits),
    │   └── JS-Fallback (vereinfacht)
    └── Eingabemapping,
        ├── Tastatur scancodes,
        ├── Maus-Buttons,
        └── Touch-Events
```

**Was bereits funktioniert (Ebene 1):**
- Texte lesen
- Bilder ansehen
- Modi umschalten (cb/low/deaf)
- Den Witz in 6 Sprachen lesen

**Was auf Ebene 2 angepasst werden müsste:**
- Feld-Generator interaktiv werden
- Boing Ball Physik auf AROS lauffähig machen
- Tastatur/Mouse auf AROS mapped

### Weg 2: Die "Native Port"-Methode (hoher Aufwand)

Wir portieren den Code direkt nach AROS:

```asm
; Beispiel: Boing Ball in AROS-Assembly
; (Existiert bereits in learn/retro/assembly/boing-amiga.asm)

; Was benötigt wird:
1. input.device für Tastatur/Maus
2. gfx.library für Canvas-Ersatz
3. audio.library für Boing-Sound
4. JIT-Kompiler oder JIT-freie Umsetzung
```

**Der Aufwand ist hoch**, aber das Ergebnis wäre:
- Vollständige Interaktivität
- Native Performance
- Passt perfekt in die AROS-Ökosystem

---

## Praktischer Underfork-Workflow

### Schritt 1: Repository-Zweig erstellen

```sh
# Im Projekt-Verzeichnis:
git branch underfork-webtechnologies
git checkout underfork-webtechnologies
```

### Schritt 2: Verzeichnis-Struktur anpassen

```
underfork/
  docs/               # Generierte Docs (wie original)
  field-generator/    # Angepasste Feld-Generator-Version
    field-wasm-opt.mjs # Optional: WASM-Optimierung für AROS
    field-js-aros.mjs  # JS-Fallback für AROS-Browser
  lessons/            # Angepasste Lektionen
    28-underfork-webtechnologies.md  # Diese Datei
  aros/               # AROS-spezifische Dateien
    input-mapping.py  # Tastatur/Mouse Mapping
    canvas-aros.c     # Canvas-Ersatz für AROS
```

### Schritt 3: Kern-Änderungen

**Wichtige Dateien, die angepasst werden müssten:**

1. **field-generator/field-generator.html** — Mode-Buttons beibehalten,
   Canvas-Ereignisse anpassen

2. **learn/ai/demo/index.html** — Boing Ball vereinfachen,
   Enter/Steuerung an AROS anpassen

3. **.opencode/plugins/easy-read/index.js** — Modi beibehalten,
   Funktionsfähigkeit auf AROS prüfen

4. **tools/self-engineer.mjs** — AROS-spezifische Checks hinzufügen

### Schritt 4: Testen auf AROS

```sh
# AROS booten (Lektion 25)
# Browser installieren (NetSurf/OWB)
# Underfork testen:
open underfork/field-generator/field-generator.html

# Test-Checkliste:
1. Lädt die Seite? (ja/nein)
2. Sieht der Modi-Auswahl? (ja/nein)
3. Funktioniert Enter? (ja/nein)
4. Bewegt sich die Kugel? (ja/nein)
5. Reagiert auf Tastatur? (ja/nein)
```

---

## Bereits Vorhandene Grundlagen

Aus dem Repository existierende Ressourcen, die wir nutzen können:

| Ressource | Status | Nutzen für Underfork |
|-----------|--------|----------------------|
| `learn/retro/assembly/boing-amiga.asm` | ✅ Fertig | Native Boing Ball auf AROS |
| `learn/coding-course/25-aros-bauen.md` | ✅ Fertig | AROS bauen/Installation |
| `learn/coding-course/26-aros-helfen.md` | ✅ Fertig | Mitmachen bei AROS |
| `learn/art-direction.md` | ✅ Fertig | Design-Tokens übernehmen |
| `field-generator/field.wasm` | ⚠️ Braucht Anpassung | WebAssembly-Kernel |
| `field-generator/field-generator.html` | ⚠️ Braucht Anpassung | Oberflächen-Design |
| `tools/self-engineer.mjs` | ⚠️ Prüfungen nötig | Qualitäts-Checks |

---

## Der Underfork-Vergleich

| Aspekt | Original-Projekt | Underfork (AROS) |
|--------|-----------------|------------------|
| **Browser** | Chrome/Firefox/Edge | NetSurf/OWB (AROS) |
| **WASM** | Ja (voll unterstützt) |Nein (meist) |
| **JavaScript** | Voll | Teilweise |
| **Canvas** | HTML5 Canvas | AROS Gfx/Gemini |
| **Modi** | `cb|low|deaf` | Teilweise übertragbar |
| **Eingabe** | Tastatur/Maus/Touch | AROS input.device |
| **Audio** | Web Audio API | AROS audio.library |
| **Ziel** | Browser auf jedem OS | AROS auf x86/m68k/ARM |

---

## Ehrlich

Ich habe den Underfork nicht vollständig auf AROS getestet. Die Browser-Unterstützung variiert je nach AROS-Distribution (Icaros Desktop, AROS One, bare metal). Was ich dokumentiere, basiert auf:

- Der technischen Situation aus dem Repository
- Ähnlichen Systemen (KolibriOS-Erfahrung)
- Der Philosophie des Projekts ("Easy Read", "zugänglich", "offen")
- Der vorhandenen Assembly-Boing-Ball-Implementierung

**Das Ziel dieses Underforks ist nicht, alles perfekt nachzubauen,
sondern einen praktischen Weg aufzuzeigen, wie Web-Technologien**
**auf AROS gebracht werden können — mit ehrlichen Grenzen.**

---

## Weiterlesen

- `learn/coding-course/25-aros-bauen.md` — AROS bauen
- `learn/coding-course/26-aros-helfen.md` — AROS mitbauen
- `learn/coding-course/27-web-on-aros.md` — Web on AROS (Input Handling)
- `learn/retro/assembly/boing-amiga.asm` — Native Boing Ball Assembly
- `aros.org` — Offizielle Website
- `developers.aros.org` — Entwickler-Anleitungen (erreicht per SourceForge)

---

## Abschließende Gedanken

Ein Underfork von Web-Technologien für AROS ist **machbar, aber kein "Klick-durch-und-laufen"-Projekt**. Es erfordert:

1. **Technisches Verständnis** für beide Welten (Web + AROS)
2. **Geduld** für Anpassungen und Testing
3. **Ehrlichkeit über Grenzen** (wie in diesem Dokument skizziert)
4. **Respekt vor der Philosophie** (Easy Read, sizecoding-Spirit, offene Lizenz)

**Vielleicht ist der schönste Underfork-Gedanke**: Die Ideen aus diesem Projekt—Farbmodi, Easy Read, Boing Ball Physik, Sizecoding-Spirit—leben weiter auf AROS, nicht als exakte Kopie, sondern als inspirierte Anpassung, die die jeweils jeweilige Plattform respektiert.

---

*Diese Lektion ist ein Dokumentations-Entwurf. Sie wurde erstellt, um einen Weg aufzuzeigen, nicht als fertige Anleitung, die garantiert funktioniert. Testen, Anpassen, Berichten — so arbeitet die Open-Source-Community.*