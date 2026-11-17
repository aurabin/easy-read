---
name: Easy Read
description: Write or rewrite text in Easy Read plain language for people with intellectual disabilities
---

# Easy Read

Easy Read is a way of writing for people with intellectual disabilities.
It is not baby talk. It is clear, adult writing with less to hold in your head.

## Workflow

1. Draft the answer.
2. Keep the main message. Cut anything that is not needed.
3. Apply the rules below.
4. Check the draft:
   - If the `easy_read_check` tool exists, run it on your draft.
   - Otherwise run `node scripts/readability.mjs <file>` from this skill folder.
   - If neither works, use `references/checklist.md` by hand.
5. Fix the top problems. Check again if you changed a lot.
6. Send the clean version. Do not send the checker report unless I ask for it.

## When the output is for real use

This project is not tested with the people it is for. Before you present
material to a real audience, read `references/co-design.md`. Say "not yet
tested" when you describe the tool. Do not call it accessible.

## Writing rules

- One idea per sentence. Aim for 12 words or fewer.
- Common words first. Explain a hard word once, in brackets.
- Active voice. Say who does what.
- Address the reader as "you".
- 2 or 3 sentences per paragraph.
- Lists and numbered steps instead of long prose.
- One action per step. Start with a verb.
- Put the most important information first.
- Give a concrete example for any abstract idea.
- Repeat key facts if the reader must remember them later.
- End with "What to do next" when there is a task.

## Do not

- Do not use idioms, metaphors, or jokes.
- Do not use "just", "simply", "obviously", or "of course".
- Do not use unexplained acronyms.
- Do not use more than one question at a time.
- Do not use long dashes to cram two ideas into one sentence.
- Do not shame the reader for not knowing something.

## Words

Use `references/word-list.md` when a hard word appears. It maps common
technical and business words to everyday words. If a word is missing, pick the
shortest word that keeps the meaning. If no short word is correct, keep the
hard word and explain it.

## Languages

Write in the language the reader uses. Do not answer in English unless the
reader does.

The checker covers `en`, `de`, `es`, `fr`, `pt`, `it`. It detects the language
from the text, or you can pass a code:

```sh
node scripts/readability.mjs --lang de letter.md
```

The `easy_read_check` tool takes `{ "text": "...", "language": "de" }`.

For other languages, use `references/checklist.md` by hand and say that the
automatic check did not run. Details, per-language rules, and how to add a
language are in `references/languages.md`.

Do not translate commands, file names, code, or error messages. Explain them.

## Learning a subject

When the reader wants to learn something, use the four-step shape in
`references/learn.md`:

1. One sentence answer.
2. One everyday example.
3. One small try, about 5 minutes.
4. One question back.

Packs: language, science, art, music, retro computing, AI coding. At most 5 new words per
answer. Say what is known and what is not. For health, money, or law, tell the
reader to ask a professional.

## Numbers and time

- Write numbers as digits: "3 files", not "three files".
- Compare with something real: "about 1 in 4 people", not "25%".
- Avoid "approximately" and "prior to". Write "about" and "before".

## Code and commands

- Say what the command does in one short sentence.
- Put the command on its own line.
- Say what the reader should see when it works.
- When there is an error, quote the important part and explain it in plain words.

## Check before sending

- Every sentence is 12 words or fewer, or has a good reason to be longer.
- No sentence has two ideas.
- Every hard word is explained.
- The next action is clear.
- The reader can do the task without guessing.
