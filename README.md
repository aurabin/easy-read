# Easy Read mode for OpenCode

This project adds an accessibility mode to OpenCode for people with
intellectual disabilities.

It is based on Easy Read and plain-language practice. It keeps the full power of
OpenCode. It only changes how answers are written.

> **Status: not yet tested with the people it is for.**
>
> The rules come from published Easy Read guidance. No member of the target
> group has reviewed this project. Treat it as a draft until they do.
> See `.opencode/skills/easy-read/references/co-design.md` for how to get
> feedback, including if you have no contacts yet.

## Online

The live site is at <https://aurabin.github.io/easy-read/>.

It has the demos and short links to the lessons. The files in `docs/` are
generated from `site/` and `field-generator/`. Run
`node field-generator/build-docs.mjs` after a change, then push.

## A joke to start

| Language | The joke |
| --- | --- |
| Deutsch | „Mir reichts! Ich geh schaukeln! Meine Freunde gehen rutschen!“ |
| English | “I’ve had enough! I’m off to the swings! My friends are off to the slide!” |
| Español | «¡Ya tengo bastante! ¡Me voy a los columpios! ¡Mis amigos se van al tobogán!» |
| Français | « J’en ai assez ! Je vais sur les balançoires ! Mes amis vont sur le toboggan ! » |
| Português | «Já me cansei! Vou para o baloiço! Os meus amigos vão para o escorrega!» |
| Italiano | «Ne ho abbastanza! Vado sull’altalena! I miei amici vanno sullo scivolo!» |

The pun is German. The other lines are plain translations. The picture is the
same: leave the stress, go to the playground.

In Brazilian Portuguese, use “balanço” and “escorregador”.

The full file, with the explanation, is [`learn/joke.md`](learn/joke.md).

## What it does

| Feature | Where | What it gives you |
| --- | --- | --- |
| Easy Read agent | `.opencode/agents/easy-read.md` | Short sentences, common words, clear steps |
| `/easy` | `.opencode/commands/easy.md` | Switch this session to Easy Read |
| `/easy-mode` | `.opencode/plugins/easy-read` | Toggle Easy Read on or off for this session |
| `/simple` | `.opencode/commands/simple.md` | Rewrite text in Easy Read |
| `/steps` | `.opencode/commands/steps.md` | Turn a task into numbered steps |
| `/define` | `.opencode/commands/define.md` | Explain a word with an example |
| `/lang <code>` | `.opencode/commands/lang.md` | Set the language: en, de, es, fr, pt, it, zh |
| `/learn <topic>` | `.opencode/commands/learn.md` | Learn language, science, art, music, retro computing, or AI coding |
| `/joke` | `.opencode/commands/joke.md` | Tell the project joke in your language |
| `easy-read` skill | `.opencode/skills/easy-read` | Rules, word list, checklist, checker |
| `easy_read_check` tool | plugin | Score text and list problems, in 7 languages |

## Use it

1. Open this folder in OpenCode.
2. Type `/easy` and ask your question.
3. Or type `/easy-mode` to turn the style on for the whole session.

The agent still reads files, runs commands, and edits code. It explains what it
did in Easy Read.

### Examples

```text
/easy why does the app show a red error?
/simple The migration will be executed asynchronously.
/steps set up this project on my computer
/define repository
/joke
```

## Start your own idea

The tool is not only for code. You can use it to start something of your own.
One sentence is enough to begin.

| Idea | What to type |
| --- | --- |
| Invite people to a meeting | `/easy write an invitation for our meeting` |
| Write to an office | `/easy help me write a letter to the office` |
| Make rules for a group | `/steps rules for our group` |
| Tell your story | `/easy start my story` |
| Ask your neighbours something | `/easy make a short survey` |

You do not need to be a programmer. You do not need the right words. Ask for
one small step, then the next.

The people this is for are not only testers. They can start their own
projects. This tool should help with that. Ten starter ideas, and an example of
a project that began small, are in `outreach/ideas.md`.

## Languages

The checker works in English, German, Spanish, French, Portuguese, and Italian.
It finds the language itself, or you pass a code.

```sh
node .opencode/skills/easy-read/scripts/readability.mjs --lang de letter.md
node .opencode/skills/easy-read/scripts/readability.mjs --list-languages
```

The writing rules work in any language. The agent answers in the language you
use. `/lang pt` switches the session. Per-language rules, and how to add a
language, are in
`.opencode/skills/easy-read/references/languages.md`.

## Learn something

`/learn` turns the mode into a patient tutor. It has six packs: language,
science, art, music, retro computing, and AI coding.

Every answer has one sentence, one everyday example, one 5-minute task, and one
question back. It says what is known and what is not. It does not give health,
money, or law advice.

The rules and the packs are in
`.opencode/skills/easy-read/references/learn.md`.

The ready-made course is in [`learn/README.md`](learn/README.md). It has 11
short lessons. The Commodore 64 comes first, then the Amiga. No old hardware is
needed.

If you have never used a computer, start with
[`learn/start-here/`](learn/start-here/01-what-is-a-computer.md). Four short
lessons assume no prior knowledge. "0+" means that, not a children's book.

The AI Coding Course has two versions:
[`for ALL Kids!`](learn/ai/kids/README.md) and
[`for ALL Adults`](learn/ai/adults/README.md). Both share one demo. Open
[`learn/ai/demo/index.html`](learn/ai/demo/index.html) and press Enter.

For the full timeline, from Zuse and ENIAC to the web and AI, read
[`learn/computer-history.md`](learn/computer-history.md). It is written in the
same plain language and links to every part of the course.

An illustrated three-lesson course about the first chip is in
[`learn/chips/README.md`](learn/chips/README.md). It explains how it was
invented, how it was built, and why "first" is disputed.

The **Virtual Field Generator** is now its own project in
[`field-generator/`](field-generator/README.md). Shape a flow field, move era
nodes, toggle the authentic Boing 1984 ball, explore Mandelbrot, use Auto, and
export a PNG. The same generator is also hidden inside a valid JPEG there
(`field-demo.jpg`), with a one-file auto-start version.

## Check text from the terminal

The checker is plain JavaScript. It has no dependencies. It needs Node.js 18 or
newer. If `node` is not installed, use the `easy_read_check` tool inside
OpenCode instead.

```sh
node .opencode/skills/easy-read/scripts/readability.mjs README.md
node .opencode/skills/easy-read/scripts/readability.mjs --json README.md
```

It returns a score from 0 to 100. It lists long sentences, hard words, passive
voice, idioms, and long words. It reads Markdown blocks: headings, list items,
table rows, and code blocks are handled separately. It exits with code 1 when
the score is below 70, so you can use it in a check.

The same checker is available to the agent as the `easy_read_check` tool.

## Make it global

To use Easy Read in every project, copy the contents of `.opencode/` into
`~/.config/opencode/`:

```sh
cp -r .opencode/* ~/.config/opencode/
```

On Windows PowerShell:

```powershell
Copy-Item -Recurse -Force .opencode\* $HOME\.config\opencode\
```

OpenCode reloads agents, commands, skills, and plugins when files change. Run
`/reload` if something does not show up.

## Get feedback

Read `.opencode/skills/easy-read/references/co-design.md`.

It has:

- what to say when you have no contacts yet;
- who to ask for feedback;
- an email template;
- how to run a short test without leading the person;
- a first checklist.

The short version: say "not yet tested", follow published guidance, and ask
people with intellectual disabilities before you call it accessible.

If you want to test online, see
`.opencode/skills/easy-read/references/online-testing.md`. It lists paid remote
review services, free network contacts, a 15-minute async test, and how to
recruit without using support groups as free labour.

You do not have to attend a session or give your name. A service can run the
test and send you a written report.

There is also an `outreach/` folder with ready-to-send German and English
emails, a tester pack, and a checked list of Facebook groups. Nothing there is
sent yet. It is written so that contact stays in writing: no calls, no camera.

If you are in Germany, the doc lists first contacts with current addresses.
The names and addresses are in `co-design.md`.

## Vector field after Wikipedia

[`outreach/apps/wiki-vektor-feld.html`](outreach/apps/wiki-vektor-feld.html) shows
four real vector fields after the German Wikipedia article
`de.wikipedia.org/wiki/Vektorfeld`: point source (gradient), central field
(gravity), vortex field (bathtub), and uniform flow. Each point gets an arrow
showing direction and strength. Our drawing is our own code; the definition is
from Wikipedia (CC BY-SA 4.0).

## Functions and system fields

[`learn/funktionen.md`](learn/funktionen.md) explains functions in Easy Read —
from `y = f(x)` to the tiny formulas in our field generators. The shared module
`outreach/apps/system-felder.js` gives every page one of seven system fields,
in the spirit of sizecoding: small code, big pictures.

## Synthesis

[`SYNTHESE.md`](SYNTHESE.md) ties all ideas together: from the first lessons
through the demos and the Boing Ball style to the 28 games and the step-by-step
cosmos journey. One red thread — learn by doing, from the smallest particle to
the universe.

## Freedom status

[`FREIHEIT.md`](FREIHEIT.md) — German — and [`FREEDOM.md`](FREEDOM.md) — English —
state honestly how free the app is at the system level. No external scripts, no CDNs, no trackers, no account required, works
offline, self-hostable. It also names the real limits: a browser is needed,
no copyrighted ROMs, login tasks need an account, the guestbook needs a local
server. Free means open, costless, offline-capable — not free of all limits.

## Amiga music

A small browser player for Amiga music. It plays 4-channel MOD and 8SVX with
its own Paula emulation. It detects 13 formats and says honestly which ones
it can play. No WAV, no dependencies, no copied GPL code.

- `outreach/apps/amiga-player.html` — the player.
- `tools/amiga-formats.mjs` — format detection with origin and playable flag.
- `tools/amiga-formats-test.mjs` — detection tests.
- `tools/paula-engine.mjs` — our own Paula emulation (PAL clock, stereo pan,
  sample interpolation, loops, low-pass). No copied code.
- `tools/paula-engine-test.mjs` — 20 tests for the engine.
- `outreach/apps/paula-sound.html` — hear the engine: boing, scale, chord,
  bass, noise. Browser Web Audio, no audio file.
- `learn/amiga-audio-formate.md` — plain-language explanation in German.

MusicLine `.ml` stays in `ALL-IN-ONE.html` because that player uses GPL-2.0
code. We do not copy it into the new player.

## Chinese

The checker now supports `zh` as a seventh language. It counts characters and
splits on `。！？`. It is a plain-language check, not an official Easy Read
method for Chinese.

- [`learn/china-computer-history.md`](learn/china-computer-history.md) — a long
  history of computing in simple Chinese.
- [`learn/chinesisch-lernen.md`](learn/chinesisch-lernen.md) — short practice
  lessons in simple Chinese.
- [`outreach/china-sales.md`](outreach/china-sales.md) — an honest draft for a
  China market plan with prices. Nothing is sold. No buyer. No contract.

Publishing in China needs a licensed Chinese publisher and government review.
No sale is planned until a partner and a written contract exist.

## Beta and paperwork

The Microsoft Store draft is **paused**. The project names other operating
systems, so a Store version would be a different project. The current focus is
the WIP beta for Peri Fractic:

- [`outreach/peri-fractic-beta.md`](outreach/peri-fractic-beta.md) — the offer.
- [`outreach/email-peri-fractic.json`](outreach/email-peri-fractic.json) — the
  message for the mailer. The address is a placeholder.

The mailer is a side task (subagent):

- `.opencode/agents/mailer.md` — sends only after confirmation.
- `.opencode/commands/email.md` — `/email` command.
- `tools/email/send.mjs` — dry run by default, no secrets in code.
- `learn/google-login.md` — how the Google login works.
- `tools/google/` — local OAuth with PKCE. Token stays in
  `tools/google/runtime/`, which is in `.gitignore`.
- `learn/github-login.md` — free access with a GitHub login. No paywall.
- `tools/github/` — local GitHub OAuth. Token stays in
  `tools/github/runtime/`, which is in `.gitignore`.

Legal files are at the project root:

- [`LICENSE.md`](LICENSE.md) — MIT, CC0/CC BY, AGPL for the course, GPL for
  derived player code.
- [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md) — borrowed works.
- [`LEGAL-STATUS.md`](LEGAL-STATUS.md) — open questions. Not legal advice.
- [`IMPRESSUM.md`](IMPRESSUM.md) and [`DATENSCHUTZ.md`](DATENSCHUTZ.md) —
  drafts with placeholders. Fill them in before publishing.

## Tune it

- Change the 12-word limit in `checkText` (`MAX_SENTENCE_WORDS`) and in the
  agent prompt.
- Add hard words to `HARD_WORDS` in
  `.opencode/skills/easy-read/scripts/readability.mjs`.
- Add words to `.opencode/skills/easy-read/references/word-list.md`.
- Change the session rules in `.opencode/plugins/easy-read/index.js`
  (`RULES`).

## Limits

- **Not user-tested.** No person from the target group has reviewed this yet.
- The checker is a simple heuristic. It does not understand meaning.
- Easy Read works best with pictures. Ask the agent to suggest pictures or
  icons for printed material.
- Test with real users. The people it is for should help decide what is
  clear. Do not guess for them.
