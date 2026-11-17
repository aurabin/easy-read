# Virtual Field Generator

This is its own project. It was split off from the Computer History course at
the point where the course had a field generator. Everything here is offline,
original, and needs no server and no sign-in.

## Open it

| File | What it does |
| --- | --- |
| `field-generator.html` | The full interactive generator. Press Enter to start. |
| `field-demo-standalone.html` | One file. Opens and starts immediately from the embedded JPEG. |
| `field-demo.jpg` | A real JPEG that carries the full generator source after the image data. |
| `jpg-loader.html` | Reads the JPEG and starts the generator embedded in it. |

## What it can do

- **Field types:** swirl, vortex, wave, attract, grid, Mandelbrot.
- **Presets:** Boing Ball, Seven Eras, Agnus Vortex, Paula Wave, Tron Grid,
  Mandelbrot, and Boing 1984.
- **Boing 1984:** the original demo style — 320×200 pixel look, purple wireframe
  grid, checkered ball with colour cycling, shadow on the wall, Workbench strip,
  perspective bounce, and the deep "boing" sound (toggle Sound on).
- **Mandelbrot:** a real escape-time fractal backdrop; scroll to zoom.
- **Auto:** random but tasteful changes every few seconds, within good ranges.
- **Controls:** strength, particles, speed, palette; layers on/off; add, drag and
  remove nodes; pause, reset; export PNG.
- **Keys:** Enter start, Space pause, R reset, arrow keys move the selected node.

## Machine-code core

`field.wasm` is a real WebAssembly module (309 bytes) built by
`build-wasm.mjs`. It advects all particle arrays in one loop — JavaScript
computes the angles (trig), WASM does the hot movement and wrap-around.
It is loaded at startup; if loading fails (for example via `file://`),
JavaScript takes over automatically. The badge shows `WASM` or `JS`.

## Rebuild the packaged versions

From the project folder:

```sh
node build-jpg.mjs [path-to-a-jpeg-screenshot]
node build-standalone.mjs
```

`build-jpg.mjs` appends the generator source to a JPEG between two markers.
`build-standalone.mjs` embeds that JPEG into one self-contained HTML file.

## Honest note

A `.jpg` cannot run code by itself in a browser — that is a browser security
rule. The JPEG carries the source; a small HTML page starts it. Nothing is
uploaded. This project is a teaching tool, not tested with real users. Do not
call it accessible.

## License

Code: MIT. Art and text: CC0 / CC BY. See `../products/computer-history/LICENSE.md`.
