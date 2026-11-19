# Lektion 27 — Web Technologien auf AROS

## Die Idee

AROS kann Web-Inhalte darfen, aber die **Eingabesteuerung** ist die größte Hürde.

Unser Projekt nutzt:
- **Tastatur**: Enter, Space, R, Pfeiltasten, Shift
- **Maus/Touch**: Klick, Ziehen, Rad scrolling
- **Canvas-Ereignisse**: pointerdown, pointermove, wheel

AROS hat zwar Browser (NetSurf, Odyssey), diese unterstützen aber oft nur einen Teil von JavaScript und gar kein WebAssembly.

## Zwei Wege der Eingabesteuerung

### Weg 1: Browser-Input (einfach)

Wenn AROS einen Browser startet, funktioniert die Eingabe so:

| Web-Ereignis | AROS-Entsprechung |
|--------------|-------------------|
| `keydown` (Enter) | AROS `input.device` KeyEvent |
| `keyup` | AROS `input.device` KeyRelease |
| `keypress` | Selten unterstützt |
| `pointerdown` (Mausklick) | AROS `mouse.device` ButEvent |
| `pointermove` (Mausbewegung) | AROS `mouse.device` mPos |
| `wheel` (Rad) | AROS `mouse.device` wheelDelta |
| `touchstart`/`touchmove` | Optional: AROS touchscreen support |

**Was funktioniert** (wenn der Browser JavaScript kann):
- Alltliche Tastenkombinationen aus dem Feld-Generator
- Mausklicks auf Buttons und Canvas
- Touchscreen auf Tablets (falls AROS ARM unterstützt)

**Was oft fehlgeschlagen ist** (based on KolibriOS experience):
- WebAssembly (keine Runtime)
- Canvas-Pointer-Eignisse bei eingeschränktem Browser-JS
- komplexe Gesten

### Weg 2: Native AROS-Input (schwer)

Das Feld-Generator-Code direkt für AROS umschreiben:

```c
/* Eingabe via AROS input.device */
struct InputEvent *ie;
ULONG code;

/* Tastatur */
ie = AllocInputEvent(NULL);
Read((struct InputDevice *)GetDevice("input"), ie);
code = ie->ie_Code;  /* scancode */

/* Maus */
ie = AllocInputEvent(NULL);
Read((struct InputDevice *)GetDevice("mouse"), ie);
/* ie->ie_X, ie->ie_Y: Mausposition */
/* ie->ie_Buttons: Tastendruck */
```

**Was nötig wäre**:
- Canvas durch AROS-Graphics ersetzen (Intuition/Iconer oder Gfx)
- Tastatur-Handler durch `input.device` ersetzen
- Maus-Handler durch `mouse.device` ersetzen
- Audio durch AROS Sound device

## Empfohlener Weg: Hybrid

Da der Aufwand für Weg 2 sehr hoch ist, empfehle ich:

### Schritt 1: AROS mit Browser testen

```sh
# AROS booten (Lektion 25: ./configure && make)
# Browser installieren (NetSurf oder OWB)
# Feld-Generator testen:
open field-generator/field-generator.html

# Eing testen:
1. Enter: Startet die Demo
2. Space: Pause/Play
3. R: Reset
4. Pfeiltasten: Knoten bewegen (falls selektiert)
5. Rad: Mandelbrot-Zoom (falls Typ ausgewählt)
```

### Schritt 2: Erwartete Probleme dokumentieren

| Eingabeteil | Erwartetes Verhalten | Problem |
|-------------|---------------------|---------|
| Enter-Taste | Demo starten | Sollte funktionieren, wenn Browser JS kann |
| Space-Taste | Pause/Play | Abhängig von Browser-Unterstützung |
| R-Taste | Reset | Sollte funktionieren |
| Pfeiltasten | Knoten bewegen | Erfordert selektierten Knoten |
| Mausklick | Knoten hinzufügen/selektionieren | Sollte funktionieren |
| Rad | Mandelbrot zoomen | Erfordert mandelbrot-Typ |

### Schritt 3: Fallback-Lösung

Wenn die Eingabe auf AROS nicht funktioniert:

1. **Statische Ansicht**: Nur die Grafik betrachten, keine Interaktion
2. **Assembly-Boing Ball**: Das native 68000-Code aus `learn/retro/assembly/boing-amiga.asm` nutzen
3. **Bilder machen**: Screenshots der Web-Demo machen und als Bild betrachten

## Projekt-Connect

| Projekt-Ziel | Input-Handling-Einfluss |
|--------------|-----------------------|
| **C64 → Amiga → AROS** | Abschluss der Retro-Computing-Trilogie |
| **Ein Feld, ein Spiel** | Field Generator auf AROS = einheitliches Erlebnis |
| **Easy Read 100/100** | Modus funktioniert über alle Plattformen |
| **Sizecoding-Geist** | "Kleiner Code, große Bilder" - Assembly vs WebAssembly |
| **Nur schriftlicher Kontakt** | AROS-Integration dokumentiert für zukünftige Tester |

## Weiterlesen

- `learn/coding-course/25-aros-bauen.md` — AROS bauen
- `learn/coding-course/26-aros-helfen.md` — AROS mitbauen
- `learn/retro/assembly/boing-amiga.asm` — Native Amiga/AROS Assembler
- `learn/retro/amiga/02-install-the-emulator.md` — Amiga-Emulator installieren
- `aros.org` — Offizielle Website

---

**Ehrlich**: Ich habe AROS nicht mit Web-Inhalten getestet. Die Browser-Unterstützung für JavaScript und WebAssembly variiert. Die Tastatur- und Maus-Ereignisse, die im Browser funktionieren, hängen von der Browser-Implementierung auf AROS ab. Die native Assembler-Variante (`boing-amiga.asm`) läuft direkt auf der Hardware und ist die verlässlichste Methode, um die Boing Ball Physik auf AROS zu erleben.