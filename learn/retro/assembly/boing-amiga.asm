; ============================================================
; BOING BALL - Commodore Amiga / 68000
; Der Original-Trick: Die Kugel dreht sich durch FARBFOLGE,
; nicht durch neues Zeichnen. Zwei Farbregister tauschen
; pro Bild die Plaetze - das sieht wie Rotation aus.
; ============================================================
; Syntax: GNU as (m68k)
; A6 = $DFF000 (Custom Chip Basis)
; Dies ist ein LEHRFRAGMENT, kein vollstaendiges Demo.
; ============================================================

  .equ COLOR00, $180         ; Hintergrundfarbe
  .equ COLOR01, $182         ; erste Kugelfarbe
  .equ VPOSR,   $1E          ; Vertikalposition (vereinfacht)

  .text
  .global _start
_start:
  movea.l #$00DFF000, a6     ; Custom Chips ansprechen
  move.w  #$0F00, COLOR00(a6) ; Rot
  move.w  #$0FFF, COLOR01(a6) ; Weiss

.frame:
  ; --- auf Vertical Blank warten ----------------------------
.wait:
  move.w  VPOSR(a6), d0
  andi.w  #$1FF00, d0
  cmpi.w  #$10000, d0
  bne     .wait

  ; --- Farbzyklus: Rotation simulieren ----------------------
  move.w  COLOR00(a6), d0    ; rot holen
  move.w  COLOR01(a6), d1    ; weiss holen
  move.w  d1, COLOR00(a6)    ; weiss nach unten
  move.w  d0, COLOR01(a6)    ; rot nach oben

  bra     .frame             ; naechstes Bild

; ============================================================
; Erklaerung:
; Die echte Kugel besteht aus vier Farben in zwei Zyklen.
; Der Kupfer-Coprozessor („copper") aendert die Palette
; waehrend des Bildaufbaus. Dadurch rotieren die Karos,
; ohne dass ein einziges Pixel neu berechnet wird.
; Genau das machte das Original 1984 so schnell und User -
; die CPU rechnete nur den Sprungwinkel.
; ============================================================
