Easy Read mode - KolibriOS package
==================================

This folder works on KolibriOS (x86, FASM).

BOING       - native program, 400 bytes, assembled with FASM 1.73.32
              Copy it to KolibriOS and start it. It opens a window with
              a checkered Boing Ball drawn from single pixels.
FIELD       - virtual field generator, 656 bytes, native FASM program.
              Shows a swirl field of points and a checkered ball.
              Press any key to move the ball one step and redraw.
              Both programs use MENUET01 and int 0x40.
BOING.PNG   - preview picture
JOKE.TXT    - the project joke
COMPUTER.TXT, KEYS.TXT, PROGRAM.TXT - first lessons, plain text

What does NOT work on KolibriOS:
- the HTML demos (NetSurf has no JavaScript)
- the WASM machine-code kernel (no runtime)
- the C64 and Amiga sources (different CPUs)

The source of BOING is in ../boing-kolibri.asm.
No external libraries. Syscalls via int 0x40.

This is a draft. It was assembled, but not started inside KolibriOS.
Not tested with real users. Do not call it accessible.

License: MIT for code, CC0 / CC BY for text and images.
