# Lesson 5: Revise, debug, and remove garbage

**Time:** 30 minutes. **You need:** lesson 4. A copy of the demo.

## Short answer

Good projects are not written once.
They are revised, debugged, and cleaned.
Each step has a simple rule.

## Revision

**Rule:** change one thing, then check it.

1. Make a copy, or use git.
2. Change one thing.
3. Read the diff. The diff shows added and removed lines.
4. Run the smallest test.
5. Keep the change, or roll it back.

A commit is a labelled snapshot. A good message says what changed and why.
A changelog is a list for users. It is not the same as a commit log.

Revision also means review. Ask one person to read the diff.
Ask: "What could break?" Not: "Do you like it?"

## Debugging

**Rule:** find the smallest case that fails.

1. **Reproduce.** Make the failure happen again.
2. **Read the error.** Copy the first real line, not the whole wall.
3. **Reduce.** Remove everything that is not needed.
4. **Observe.** Add one log line near the failure.
5. **Hypothesise.** Write one sentence: "I think X causes Y."
6. **Test the hypothesis.** Change one thing.
7. **Fix.** Change the cause, not the symptom.
8. **Add a regression test.** The same bug must fail the test.

If you do not know when it broke, use bisect. Bisect cuts the history in half.
It finds the first bad change in a few steps.

Do not change five things at once. You will not know what worked.

## Garbage removal

**Rule:** keep a copy, remove one kind at a time, test after each kind.

Garbage in a software project includes:

- dead code that nothing calls;
- unused files and folders;
- duplicate images, fonts, and documents;
- build output and cache folders;
- old logs and crash dumps;
- commented-out code;
- secrets in a file that should not have them;
- merged or stale branches;
- old releases nobody uses.

Find it:

- search for the name before you delete it;
- use the editor's "find references";
- ask the agent to list files not linked from anywhere;
- check `.gitignore` for generated folders;
- run the tests before and after.

Safe order:

1. Back up, or commit.
2. Remove build output first. It can be rebuilt.
3. Remove logs and caches next.
4. Remove unused files after a search.
5. Remove dead code last.
6. Run all tests. Run the demo.
7. Commit the cleanup on its own. Do not mix it with a feature.

Never delete a file just because its name looks old. Check it first.

## Cleanup

Garbage removal is about what to delete. Cleanup is about what to keep.

- Give files clear names.
- Group files by purpose, not by date.
- Delete commented-out code. Git remembers it.
- Write comments that explain why, not what.
- Close or label old issues.
- Keep one README per folder, if the folder is hard to read.
- Run the formatter once, in its own commit.

## A cleanup checklist

- [ ] I have a backup or a commit.
- [ ] I searched before each deletion.
- [ ] I removed one kind of garbage at a time.
- [ ] I ran the tests after each kind.
- [ ] I did not mix cleanup with a feature.
- [ ] I wrote down what I removed.

## Try this

1. Copy `learn/ai/demo/index.html` to a temp folder.
2. Search for one constant, such as `PARTICLE_COUNT`.
3. Change it once. Note the diff.
4. Break the file on purpose. Read the error.
5. Fix it. Add one line to a test checklist.

## Ask me

Ask the agent: "Find one piece of safe cleanup in this folder. Do not delete it yet."
