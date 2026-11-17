# Lesson 2: Write a prompt you can check

**Time:** 12 minutes. **You need:** lesson 1.

## Short answer

A prompt is a specification.
A specification says what success looks like.

## Five parts

1. **Goal:** the result you want.
2. **Context:** who it is for, and what they already know.
3. **Constraints:** size, format, tools, what not to use.
4. **Format:** the shape of the answer. Code, list, table, one file.
5. **Check:** how you will test it, and what the AI must flag.

## Weak and strong

Weak:

```text
Make a game.
```

Strong:

```text
Create one self-contained HTML file with a small ball game.
It is for a beginner. Show the score and a restart button.
Use canvas, no external libraries, no network requests.
The ball bounces with gravity.
Say what you are not sure about, and list three ways to test it.
```

## Iterate one change at a time

- Change one constraint.
- Ask for a diff, not a rewrite.
- Keep the version that passes your test.

## The example prompt

The Boing Ball prompt is short.
It leaves decisions open: size, colours, the meaning of "field", and the physics.
That is why the demo needed a person to finish it.

A stronger version:

```text
Create one self-contained HTML page.
Show a vector field as arrows on a canvas.
Add a red and white checkered ball that bounces with gravity.
Add a field-strength slider and a pause button.
Start on a screen that says "Press Enter to start".
Use no external files. Say what you are not sure about.
```

## Try this

Rewrite the Boing Ball prompt with the five parts.
Then remove one part. Predict what the AI will guess.

## Ask me

Ask the agent: "Review my prompt and name the missing part."
