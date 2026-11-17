; ============================================================
; BOING BALL - native KolibriOS application (FASM, use32)
; Proof of concept. NOT ASSEMBLED OR TESTED.
;
; KolibriOS uses the MENUET01 header and syscalls via int 0x40.
; Check the syscall numbers in syscalls.txt before using.
; Function 0  = define/draw window
; Function 1  = put pixel  (ebx = x, ecx = y, edx = color)
; Function 4  = write text
; Function 10 = wait for event
; Function 12 = start/end redraw
; -1          = exit
; ============================================================

format binary as ''
use32
org 0x0

        db      'MENUET01'      ; signature
        dd      1               ; version
        dd      start
        dd      i_end
        dd      mem
        dd      stacktop
        dd      0, 0            ; params, icon

start:
        call    draw_window

wait_event:
        mov     eax, 10
        int     0x40
        dec     eax
        jz      redraw
        dec     eax
        jz      key
        dec     eax
        jz      button
        jmp     wait_event

redraw:
        call    draw_window
        jmp     wait_event

key:
        mov     eax, 2          ; read and ignore key
        int     0x40
        jmp     wait_event

button:
        mov     eax, -1         ; close
        int     0x40

; ------------------------------------------------------------
draw_window:
        mov     eax, 12
        mov     ebx, 1
        int     0x40            ; start redraw

        xor     eax, eax
        mov     ebx, 10*65536 + 340
        mov     ecx, 40*65536 + 220
        mov     edx, 0x33FFFFFF
        mov     edi, header
        int     0x40            ; window

        call    draw_ball

        mov     eax, 4
        mov     ebx, 16*65536 + 8
        mov     ecx, 0x80000000
        mov     edx, caption
        int     0x40            ; text

        mov     eax, 12
        mov     ebx, 2
        int     0x40            ; end redraw
        ret

; ------------------------------------------------------------
; Draw a checkered ball. Centre (180,120), radius 44.
; The window starts at (10,40), so we add that offset.
draw_ball:
        pusha
        mov     dword [py], 0
.yloop:
        mov     dword [px], 0
.xloop:
        mov     eax, [px]
        sub     eax, 180
        mov     ebx, eax
        imul    ebx, ebx
        mov     eax, [py]
        sub     eax, 120
        mov     ecx, eax
        imul    ecx, ecx
        add     ebx, ecx
        cmp     ebx, 1936        ; 44*44
        ja      .nextx

        ; checker: 8x8 blocks, red / white
        mov     eax, [px]
        shr     eax, 3
        mov     ecx, [py]
        shr     ecx, 3
        add     eax, ecx
        test    eax, 1
        jz      .white
        mov     edx, 0x0000FF    ; red (BGR)
        jmp     .plot
.white:
        mov     edx, 0xFFFFFF    ; white
.plot:
        mov     eax, 1           ; put pixel
        mov     ebx, [px]
        add     ebx, 10
        mov     ecx, [py]
        add     ecx, 40
        int     0x40
.nextx:
        inc     dword [px]
        cmp     dword [px], 340
        jb      .xloop
        inc     dword [py]
        cmp     dword [py], 220
        jb      .yloop
        popa
        ret

; ------------------------------------------------------------
header  db      'Boing Ball - KolibriOS', 0
caption db      'Karierte Kugel - FASM Entwurf, nicht getestet', 0

align 4
px      dd      0
py      dd      0

i_end:
rb 4096
stacktop:
mem:
