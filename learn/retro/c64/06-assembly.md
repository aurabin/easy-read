# Lesson 6: A first look at assembly language

**Time:** 10 minutes. **You need:** lesson 2 done. The emulator is running.

## Short answer

Assembly language is a way to write instructions for the CPU.
One line does one very small thing.

## A picture in your head

Think of making dinner.

- "Make dinner" is a big instruction.
- "Pick up the knife. Cut the carrot. Put it in the pan." are small steps.

Assembly is the small steps.
The CPU only understands small steps.

## Two lines

This is real C64 assembly:

```text
LDA #$01
STA $D020
```

Read it like this:

1. `LDA` means **load** a number into the CPU's hand. The hand is called
   register A.
2. `#$01` means the number **1**. The `#` means "the number itself".
3. `STA` means **store** that number into a place in memory.
4. `$D020` is the address of the **border colour**.

So the two lines say:

> Put the number 1 in the border colour.

Colour 1 on the C64 is white.
The border turns white.

## The same thing in BASIC

You already know a way to do this:

```text
POKE 53280,1
```

`53280` is the same place as `$D020`.
`1` is the same number.

Assembly is the same action, written closer to the machine.

## Why people use it

- It is fast and small.
- It lets you control the hardware exactly.
- Demos, games, and music players often use it.
- It teaches you how the CPU really works.

## Why most people do not

- It is slow to write. One idea becomes many lines.
- One mistake can freeze the machine.
- Modern languages do the small steps for you.

You do not need assembly to enjoy a C64.
It is a choice, not a test.

## Words

- **CPU:** the chip that does the work.
- **Register:** a small holding place inside the CPU.
- **Address:** the number of a place in memory.
- **Hex:** numbers written in base 16. A `$` in front means hex.
- **Assembler:** a program that turns these lines into numbers the CPU reads.

## Try this

1. In BASIC, type `POKE 53280,1` and press Enter.
2. Look at the border. It should be white.
3. Now type `POKE 53280,0`. The border should be black.
4. Guess what `POKE 53280,2` does. Then try it.

## If it does not work

- **The border does not change:** click inside the window first.
- **You see an error:** check the commas. `POKE 53280,1` has one comma.
- **Nothing happens at all:** the number must be 0 to 15.

## One question

Ask the agent: "What does `STA` do, with an everyday example?"

## Honest note

This is a taste, not a course.
Assembly takes time. That is normal.
Nobody is behind.
