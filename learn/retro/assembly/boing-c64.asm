; ============================================================
; BOING BALL - Commodore 64 / 6502
; Original teaching program. Sprite 0, checkered pattern,
; bouncing motion with wall reflection.
; Syntax: generic 6502 (ca65 / Kick Assembler nahe)
; ============================================================

SPRITE_DATA = $0340        ; sprite 0 shape
BORDER      = $D020
BACKGROUND  = $D021
SPRITE_ON   = $D015
SP0_COL     = $D027
SP0_X       = $D000
SP0_Y       = $D001

HPOS  = $02                ; zero page: x position
VPOS  = $03                ; zero page: y position
VH    = $04                ; x velocity (+2 oder -2)
VV    = $05                ; y velocity (+1 oder -1)

; --- BASIC loader: SYS 2064 ---------------------------------
  *= $0801
  .word NEXT
  .word 10
  .byte $9E, "2064", $00
NEXT:
  .word 0

; --- main ---------------------------------------------------
  *= $0810
START:
  LDA #$00
  STA BORDER             ; schwarzer Rand
  STA BACKGROUND         ; schwarzer Hintergrund

  LDA #$01
  STA SPRITE_ON          ; Sprite 0 einschalten
  LDA #$01
  STA SP0_COL            ; weisse Farbe

; Checker-Muster in den Sprite-Speicher schreiben
; 64 Bytes: abwechselnd %10101010 und %01010101
  LDX #$00
PATLOOP:
  TXA
  LSR A                  ; parity
  BCC EVENPAT
  LDA #$55
  JMP PATSTORE
EVENPAT:
  LDA #$AA
PATSTORE:
  STA SPRITE_DATA,X
  INX
  CPX #$40
  BNE PATLOOP

; Startposition und Geschwindigkeit
  LDA #$64
  STA HPOS
  LDA #$50
  STA VPOS
  LDA #$02
  STA VH
  LDA #$01
  STA VV

; --- Hauptschleife ------------------------------------------
MAIN:
  LDY #$FF               ; einfache Verzoegerung
DELAY:
  DEY
  BNE DELAY

; horizontale Bewegung
  CLC
  LDA HPOS
  ADC VH
  STA HPOS
  CMP #$18               ; linke Kante
  BCS HLEFT
  LDA #$02               ; nach rechts
  STA VH
  JMP VMOVE
HLEFT:
  CMP #$E0               ; rechte Kante
  BCC VMOVE
  LDA #$FE               ; -2, nach links
  STA VH

; vertikale Bewegung
VMOVE:
  CLC
  LDA VPOS
  ADC VV
  STA VPOS
  CMP #$20               ; obere Kante
  BCS VUP
  LDA #$01
  STA VV
  JMP WRITE
VUP:
  CMP #$C8               ; untere Kante
  BCC WRITE
  LDA #$FF               ; -1, nach oben
  STA VV

; Position an den VIC schreiben
WRITE:
  LDA HPOS
  STA SP0_X
  LDA VPOS
  STA SP0_Y
  JMP MAIN
