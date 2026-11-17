# Lesson 4: Write a small program

**Time:** 15 minutes. **You need:** the emulator at `READY.`

## The idea

A program is a list of lines with numbers.
The C64 runs the lines in number order.
Not in the order you typed them.

## Step 1: Type two lines

```text
10 PRINT "HELLO"
20 GOTO 10
```

Nothing happens yet. The C64 stored the lines.

## Step 2: Run it

```text
RUN
```

**You should see:** `HELLO` again and again, very fast.

## Step 3: Stop it

Press **Esc**.

The list stops. `READY.` comes back.

`GOTO 10` means "jump back to line 10".
That is why it never ends.

## Step 4: Look at your program

```text
LIST
```

**You should see:**

```text
10 PRINT "HELLO"
20 GOTO 10
```

## Step 5: Delete it

```text
NEW
```

Now `LIST` shows nothing. The program is gone.

## If it does not work

- **`?SYNTAX ERROR`:** check the line number and the quotes.
- **It will not stop:** press Esc again. If that fails, close the emulator
  window and start again. You lose nothing.
- **`RUN` does nothing:** type `LIST` first. Maybe the program is empty.

## Try this

Write a program that prints your name 20 times, then stops.

Hint: you need a counter. That is harder. If you want, ask the agent:

> Show me a small C64 BASIC loop that prints my name 20 times, in Easy Read.

## What you learned

- Line numbers set the order.
- `RUN` starts the program.
- `GOTO` jumps to a line.
- `NEW` clears the memory.

## Ask me

Ask the agent: "What is the difference between GOTO and a normal next line?"
