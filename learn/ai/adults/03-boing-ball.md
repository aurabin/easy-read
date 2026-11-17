# Lesson 3: Read and change the demo

**Time:** 25 minutes. **You need:** lesson 2. A browser and a text editor.

## The prompt

Here is the prompt in six languages.

| Language | The prompt |
| --- | --- |
| Deutsch | Erzeuge einen virtuellen Feldgenerator mit eine Commodore Amiga Boing Ball Demo. |
| English | Create a virtual field generator with a Commodore Amiga Boing Ball demo. |
| Español | Crea un generador virtual de campos con una demo de la Boing Ball del Commodore Amiga. |
| Français | Crée un générateur de champs virtuel avec une démo Boing Ball du Commodore Amiga. |
| Português | Cria um gerador virtual de campos com uma demo da Boing Ball do Commodore Amiga. |
| Italiano | Crea un generatore virtuale di campi con una demo della Boing Ball del Commodore Amiga. |

## What the demo contains

- One HTML file. No build step. No network requests.
- A canvas with a flow field: `fieldAngle(x, y)`.
- 240 particles that follow the field.
- A 3D checkered sphere drawn as projected quads.
- Simple physics: gravity, bounce, squash.
- A start screen. It waits for **Enter**.

## Run it

1. Open [`../demo/index.html`](../demo/index.html).
2. Press **Enter**.
3. Change **Field strength**.
4. Press **Pause** and **Reset**.

## Find the constants

Open the file in a text editor. Search for:

| What | Where | Try |
| --- | --- | --- |
| Gravity | `ball.vy += 0.62` | `0.3` or `1.2` |
| Particle count | `PARTICLE_COUNT = 240` | `80` or `500` |
| Field strength | `strength = 1` | `0` to `2` |
| Ball size | `r: 62` | `40` or `80` |
| Checker detail | `latBands`, `lonBands` | `8`, `24` |

Change one value. Save. Reload. Compare.

## What AI did, and what a person did

- AI produced a first draft from a short prompt.
- A person chose the field meaning, the layout, and the start screen.
- A person checked the physics and the drawing.
- A person wrote the lesson and the safety notes.
- The original German prompt had a grammar slip. The demo still worked.

## What to check before you publish

- Does it run offline?
- Does it use only files you have the right to use?
- Does it work with a keyboard?
- Does it respect reduced motion?
- Does it say what it does not know?

## Honest note

This demo is a draft.
It is not audited for security.
It is not tested with adults from the target group.
Do not call it accessible.

## Ask me

Ask the agent: "Walk me through `fieldAngle` line by line."
