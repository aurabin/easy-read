# Languages

Easy Read is not one language. Every country has its own name and its own
rules.

| Language | Name of the method |
| --- | --- |
| English | Easy Read |
| German | Leichte Sprache |
| Spanish | lectura fácil |
| French | FALC (facile à lire et à comprendre) |
| Portuguese | leitura fácil |
| Italian | linguaggio facile da leggere |

The checker supports these six codes:

| Code | Language | Sentence limit | Long-word limit |
| --- | --- | --- | --- |
| `en` | English | 12 words | 12 letters |
| `de` | Deutsch | 12 words | 14 letters |
| `es` | Español | 12 words | 13 letters |
| `fr` | Français | 12 words | 13 letters |
| `pt` | Português | 12 words | 13 letters |
| `it` | Italiano | 12 words | 13 letters |

German gets a higher letter limit because German builds long compound words.
That is normal in German. Do not split a compound just to please the checker.

## How the checker picks a language

1. If you pass a code, it uses that code.
2. If not, it guesses from common words and letters (ä, ß, ñ, ã, ç, ì).
3. If the guess is weak, it uses English.

Guessing is not perfect. On short text, pass the code yourself.

```sh
node readability.mjs --lang de letter.md
node readability.mjs --lang es --json carta.md
node readability.mjs --list-languages
```

The `easy_read_check` tool takes the same option: `{ "text": "...",
"language": "pt" }`.

## What each language needs

### German

- Prefer verbs to nouns. "Wir prüfen den Antrag" beats "Die Prüfung des
  Antrags erfolgt".
- Split compounds with a hyphen when they get long: "Barriere-Freiheit".
  Use this only when it helps. It is not standard spelling.
- Decide between "du" and "Sie". Ask the reader. Do not mix them.
- Avoid the passive with "wird ... gemacht". Say who does it.
- Watch for "bzw.", "usw.", "z. B." The checker knows these.

### Spanish

- Bureaucratic Spanish hides the actor with "se": "se solicita", "se informa".
  The checker does not catch this. Rewrite it: "tú pides", "te informamos".
- Choose "tú" or "usted". Ask. Do not mix.
- Long formal words often have a short everyday word: "obtener" → "conseguir".

### French

- Avoid "il convient de", "il y a lieu de", "dans le cadre de". Write "il
  faut", "pour".
- Choose "tu" or "vous". Ask. Do not mix.
- Use the FALC rules: one idea per line, images on the left, text on the
  right when you print.

### Portuguese

- Avoid the passive with "foi ... feito". Say who does it.
- Brazilian and European Portuguese differ. Ask which one the reader uses.
- Choose "você" or "o senhor". Ask. Do not mix.

### Italian

- Avoid the impersonal "si": "si prega di compilare". Write "compila".
- Choose "tu" or "lei". Ask. Do not mix.
- Long words often split: "documentazione" → "documenti".

## All languages

- Keep names, places, commands, file names, and error messages as they are.
  Explain them. Do not translate them.
- Write numbers as digits: "3 files", "3 archivos", "3 Dateien".
- Use the local date and number format.
- Do not translate an idiom word for word. Say the plain meaning.
- Do not use a word from another language because the checker knows it.
- If the reader uses a language the checker does not support, check by hand
  with `references/checklist.md`. Say that the automatic check did not run.

## The limit you must say out loud

The checker is a heuristic. It knows a short list of hard words and idioms per
language. It cannot tell whether a sentence makes sense.

Plain language is also cultural. A word that is easy in Germany may be hard in
Austria or Brazil. Ask the reader.

Nobody from the target group has tested this project in any language. Do not
describe any output as "accessible" or "approved", in any language.

## Add a language

1. Open `scripts/readability.mjs`.
2. Copy the `en` block in `LANGUAGES`.
3. Change `name`, `hints`, `stopwords`, `hardWords`, `idioms`,
   `abbreviations`, `passive`, and `messages`.
4. Keep the message placeholders: `{score}`, `{grade}`, `{sentences}`,
   `{words}`, `{avg}`, `{count}`, `{quote}`, `{word}`, `{easy}`, `{n}`,
   `{limit}`.
5. Add 5 test sentences to `scripts/test-readability.mjs`.
6. Run `node scripts/test-readability.mjs`.

Start with the words your readers actually meet: offices, doctors, housing,
work, school, money. Do not start with computer words.
