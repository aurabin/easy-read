; ============================================================
; VIRTUELLER FELDGENERATOR - native KolibriOS application (FASM)
; Draws a swirl field of points plus a checkered Boing Ball.
; Press any key: the ball moves one step and the field redraws.
;/syscalls: 0 window, 1 pixel, 4 text, 10 event, 12 redraw, -1 exit
; Proof of concept. Assembled with FASM 1.73.32.
; ============================================================

format binary as ''
use32
org 0x0

        db      'MENUET01'
        dd      1
        dd      start
        dd      i_end
        dd      mem
        dd      stacktop
        dd      0, 0

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
        mov     eax, 2                  ; read key
        int     0x40
        add     dword [ball_x], 8
        cmp     dword [ball_x], 260
        jb      .ok
        mov     dword [ball_x], 40
.ok:
        call    draw_window
        jmp     wait_event

button:
        mov     eax, -1
        int     0x40

; ------------------------------------------------------------
draw_window:
        mov     eax, 12
        mov     ebx, 1
        int     0x40                    ; start redraw

        xor     eax, eax
        mov     ebx, 10*65536 + 340
        mov     ecx, 40*65536 + 240
        mov     edx, 0x33FFFFFF
        mov     edi, header
        int     0x40                    ; window

        call    draw_field
        call    draw_ball

        mov     eax, 4
        mov     ebx, 12*65536 + 224
        mov     ecx, 0x80000000
        mov     edx, caption
        int     0x40                    ; text

        mov     eax, 12
        mov     ebx, 2
        int     0x40                    ; end redraw
        ret

; ------------------------------------------------------------
; A swirl field: for every grid point, draw a short stroke
; turned by 90 degrees around the centre (a simple vortex).
draw_field:
        pusha
        mov     dword [fy], 10
.fyloop:
        mov     dword [fx], 10
.fxloop:
        mov     eax, [fx]
        sub     eax, 170                ; dx
        mov     [fxd], eax
        mov     eax, [fy]
        sub     eax, 120                ; dy
        mov     [fyd], eax

        ; swirl direction = (-dy, dx), reduced to a sign
        mov     eax, [fyd]
        neg     eax
        call    sign3
        mov     [sx], eax
        mov     eax, [fxd]
        call    sign3
        mov     [sy], eax

        ; pixel at (fx+sx, fy+sy)
        mov     eax, 1
        mov     ebx, [fx]
        add     ebx, [sx]
        add     ebx, 10
        mov     ecx, [fy]
        add     ecx, [sy]
        add     ecx, 40
        mov     edx, 0x00D0FF           ; field colour (BGR, blue)
        int     0x40

        add     dword [fx], 20
        cmp     dword [fx], 330
        jb      .fxloop
        add     dword [fy], 20
        cmp     dword [fy], 220
        jb      .fyloop
        popa
        ret

; eax -> -1, 0 or +1
sign3:
        test    eax, eax
        jz      .zero
        js      .neg
        mov     eax, 1
        ret
.neg:
        mov     eax, -1
        ret
.zero:
        xor     eax, eax
        ret

; ------------------------------------------------------------
; Checkered ball at (ball_x, 110), radius 36
draw_ball:
        pusha
        mov     dword [py], 0
.byloop:
        mov     dword [px], 0
.bxloop:
        mov     eax, [px]
        sub     eax, 36
        mov     ebx, eax
        imul    ebx, ebx
        mov     eax, [py]
        sub     eax, 36
        mov     ecx, eax
        imul    ecx, ecx
        add     ebx, ecx
        cmp     ebx, 1296                ; 36*36
        ja      .nextx

        mov     eax, [px]
        shr     eax, 3
        mov     ecx, [py]
        shr     ecx, 3
        add     eax, ecx
        test    eax, 1
        jz      .white
        mov     edx, 0x0000FF            ; red
        jmp     .plot
.white:
        mov     edx, 0xFFFFFF            ; white
.plot:
        mov     eax, 1
        mov     ebx, [px]
        add     ebx, [ball_x]
        add     ebx, 10
        mov     ecx, [py]
        add     ecx, 74                  ; 110-36
        add     ecx, 40
        int     0x40
.nextx:
        inc     dword [px]
        cmp     dword [px], 72
        jb      .bxloop
        inc     dword [py]
        cmp     dword [py], 72
        jb      .byloop
        popa
        ret

; ------------------------------------------------------------
header  db      'Virtueller Feldgenerator', 0
caption db      'Taste = Kugel weiter. FASM, nicht getestet.', 0

align 4
fx      dd      0
fy      dd      0
fxd     dd      0
fyd     dd      0
sx      dd      0
sy      dd      0
px      dd      0
py      dd      0
ball_x  dd      40

i_end:
rb 4096
stacktop:
mem:
