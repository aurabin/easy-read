# Lesson 3: Your first commands

**Time:** 10 minutes. **You need:** the emulator open at `READY.`

## Type, then press Enter

The C64 does nothing until you press Enter.
A mistake is normal. Press Backspace to erase one letter.

## Step 1: Say hello

Type this exactly:

```text
PRINT "HELLO"
```

Press Enter.

**You should see:**

```text
HELLO
READY.
```

## Step 2: Do some maths

```text
PRINT 2+2
```

**You should see:** `4`

Try `PRINT 10*3` and `PRINT 100/4`.

## Step 3: Clear the screen

```text
PRINT CHR$(147)
```

The screen clears. `CHR$(147)` means "the clear-screen character".

## Step 4: Change the colours

The border and the background have numbers.

```text
POKE 53280,0
POKE 53281,0
```

**You should see:** a black border and a black background.

The text stays blue, so it is hard to read now. That is fine.
Type `POKE 53281,1` to make the background white again.

## If it does not work

- **`?SYNTAX ERROR`:** a letter or quote is wrong. Type the line again.
- **The screen looks frozen:** press Esc once. Then type `PRINT "OK"`.
- **Nothing appears:** click inside the window. Then press Enter again.

## Try this

Make the border red. Red is colour 2.

```text
POKE 53280,2
```

Then make it green. Green is colour 5.

## Ask me

Ask the agent: "Why does the C64 use numbers for colours?"
