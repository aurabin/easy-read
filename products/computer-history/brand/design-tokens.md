# Original design system

This is the project's own design language. It is original work.
It does not copy any company's logo, trade dress, or artwork.

The research behind it: [`../../../learn/retro/design-history.md`](../../../learn/retro/design-history.md).

## Brand idea

A warm, calm "museum at night" look. Dark fields, glowing nodes,
one red-and-white ball as the signature object. Friendly, adult, clear.

## Colour tokens

| Token | Hex | Use |
| --- | --- | --- |
| bg | #faf6ee | Page background (light, warm) |
| panel | #ffffff | Cards and panels |
| ink | #1f2937 | Main text |
| muted | #5b6472 | Secondary text |
| teal | #0f766e | Primary action, focus, "visited" |
| red | #e8382f | The ball, alerts, wrong answers |
| blue | #3b82f6 | Links, secondary accents |
| sky | #6fd3ff | Field lines, glows, highlights |
| cream | #f5f0e6 | Ball light squares, paper |
| line | #e5ddcf | Borders |
| field-bg | #070b14 | Canvas / night background |
| c64-bg | #40318d | C64 screen (historical reference colour) |
| c64-fg | #8f83e8 | C64 text |
| wb | #2a6db5 | Workbench desktop (reference colour) |

Reference colours (C64 blue, Workbench blue) describe historical machines.
They are facts about old hardware, not copied artwork.

## Type

- System stack: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- No licensed webfonts. This keeps the product offline and free of font licences.
- Scale: 12 / 14 / 17 / 24 / 30 / 42. Body 17, line-height 1.55.
- Monospace for terminals: `"Courier New", monospace`.

## Shape & space

- Radius: cards 14, buttons 10, badges 99.
- Spacing unit: 4px. Common gaps 8 / 12 / 14 / 18.
- Max content width: 960px.

## Motion

- Transition: .45s, ease `cubic-bezier(.22,.61,.36,1)`.
- Ambient pulses: 2.6–4s, low amplitude. No flashing above 3Hz.
- Everything stops under "Less motion" and `prefers-reduced-motion`.

## Iconography & illustration

- Flat vector SVG, drawn by this project. Gradient light + soft glow + vignette.
- Unique gradient IDs per illustration to avoid collisions.
- Every image has `role="img"` and a plain-language `aria-label`.

## The signature object

A red-and-white checkered sphere, drawn from scratch as projected quads.
It is an original rendering inspired by a historic demo, not a copied asset.
See `../PERMISSIONS.md` for the rights note.

## Accessibility rules (non-negotiable)

- Contrast: text on background meets at least 4.5:1.
- Focus: visible 3px teal outline.
- Touch targets: at least 44px on phones.
- Keyboard: every action reachable; drag has an arrow-key alternative.
- Sound: opt-in only. Narration and music never autoplay.
