# Lesson 4: Use the Shell

**Time:** 15 minutes. **You need:** lesson 3 done.

The Shell is a text window.
You type a command. The Amiga answers.

## Step 1: Open the Shell

1. Open the **Workbench1.3** disk.
2. Open the **System** drawer.
3. Find the **Shell** icon. Some versions call it **CLI**.
4. Click it twice.

**You should see:** a window with a text prompt.
The prompt often ends with `>`.

## Step 2: List the files

```text
dir
```

Press Enter.

**You should see:** a list of file and drawer names.

## Step 3: Look at the floppy

```text
dir df0:
```

That lists the whole Workbench disk.

## Step 4: Say hello

```text
echo "Hello from the Amiga"
```

**You should see:** `Hello from the Amiga`

## Step 5: Check memory

```text
avail
```

**You should see:** a table with **chip** and **fast** memory.

Chip memory is used by the chips.
Fast memory is only for the CPU.
On a plain Amiga 500, fast memory is 0.
That is normal.

## Step 6: Close the Shell

```text
endcli
```

## If it does not work

- **`Unknown command`:** check the spelling. AmigaDOS ignores upper and lower case.
- **`endcli` does nothing:** click inside the Shell window first.
- **The Shell is not in System:** look in the **C** drawer, or on other disks.
- **There is no prompt:** wait. Then press Enter once.

## Try this

1. Type `dir df0:c`.
2. Find the command `Dir`.
3. Type `dir df0:s` to see the startup files.

## Ask me

Ask the agent: "What is a drawer, in everyday words?"
