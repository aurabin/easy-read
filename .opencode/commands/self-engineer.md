---
description: Let the project check and repair itself
agent: easy-read
---

Run the self-engineering check for this project.

1. Run `node tools/self-engineer.mjs` from the project root.
2. Read every PASS and FAIL line.
3. For each FAIL, find the cause. Fix small causes yourself:
   - broken links: correct the path,
   - stale `docs/`: the tool already rebuilds it,
   - readability under 100: shorten sentences and words,
   - a private file in git: untrack it and keep it local.
4. Run the check again. Repeat until it says `SELF-ENGINEERING OK`.
5. Report what you checked and what you changed. Keep it short.

Never delete `virtual_field_generator/`. Never edit `docs/` by hand.
Never claim the project is tested with real users.
