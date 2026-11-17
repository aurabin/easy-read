# Lesson 5: Load a game from a disk image

**Time:** 15 minutes. **You need:** the emulator, and one `.d64` file.

A `.d64` file is a disk image. It holds a whole old floppy disk.

## Where to get one

Use free games. Do not download games you do not own.

- itch.io has free C64 games. Search for "Commodore 64".
- Some authors publish their old games for free.
- VICE itself has no games.

## Step 1: Attach the disk

1. In VICE, open the **File** menu.
2. Choose **Attach disk image**.
3. Choose **Drive 8**.
4. Pick your `.d64` file.

The C64 does not show a message. That is normal.

## Step 2: Look at the disk

Type:

```text
LOAD "$",8
```

Press Enter. Then type:

```text
LIST
```

**You should see:** a list of files on the disk.
The first file is often `LOAD"*",8,1` or `"GAME"`.

## Step 3: Load the first program

```text
LOAD "*",8,1
```

Press Enter. Wait. The disk light in the emulator may blink.

**You should see:** `READY.` after a while.

## Step 4: Run it

```text
RUN
```

The game should start.

## Step 5: Control the game

Most games use a joystick.

1. Open **Settings**.
2. Find **Joystick**.
3. Set a joystick to the number pad or to your gamepad.
4. The fire button is often the Ctrl key or the gamepad button.

## If it does not work

- **`?DEVICE NOT PRESENT ERROR`:** no disk is attached. Do step 1 again.
- **`FILE NOT FOUND`:** type `LOAD"$",8` and `LIST`. Copy the exact name.
- **It loads but does not run:** type `RUN`. If nothing happens, try
  `LOAD"NAME",8,1` with the name from the list.
- **The game asks for another disk:** attach the next `.d64` to Drive 8.

## Try this

Find one free game and start it.
If it is too hard, that is the game, not you.

## Ask me

Ask the agent: "What does the `,8,1` mean in `LOAD`?"
