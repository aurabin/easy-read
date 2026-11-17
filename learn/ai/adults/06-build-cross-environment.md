# Lesson 6: Build and cross-environment

**Time:** 30 minutes. **You need:** lesson 5. The demo file.

## Short answer

A build turns source files into the file you share.
Cross-environment means: it works on other machines too.
Both are about trust. You want the same result everywhere.

## The build

**Rule:** one command, from a clean copy, gives the artifact.

A simple build has six steps:

1. **Clean.** Remove old output.
2. **Install.** Use the lockfile, not "latest".
3. **Check.** Run lint, types, and tests.
4. **Compile or bundle.** Make the artifact.
5. **Label.** Add a version and a date.
6. **Record.** Write a checksum or a build log.

The artifact is the thing you publish. It is not the source folder.
For the Boing Ball demo, the artifact is one HTML file.
There is no compile step. That is a valid build.

## A reproducible build

**Rule:** same source plus same lockfile equals same artifact.

- Pin the runtime version.
- Commit the lockfile.
- Avoid "latest" in a build.
- Avoid the current time in the output, if you can.
- Write down the command in the README.
- Test a clean build on a second machine.

If the build needs a secret, keep the secret out of the artifact.
Use an environment variable, and document its name only.

## Continuous integration

CI runs the build on every change.
A small CI job has three parts:

1. Install from the lockfile.
2. Run the checks.
3. Save the artifact.

If the checks fail, do not publish. Fix the build first.

## Cross-environment

**Rule:** test where your users are, not only where you are.

Check these dimensions:

- **Operating system:** Windows, macOS, Linux.
- **Browser:** Chrome, Firefox, Safari, Edge.
- **Screen size:** phone, tablet, laptop, large screen.
- **Input:** keyboard, touch, screen reader, switch.
- **Language:** long words, right-to-left, accents.
- **Timezone and locale:** dates, money, decimal marks.
- **Network:** offline, slow, blocked.
- **Device power:** an old phone, not only a new laptop.
- **Permissions:** no camera, no microphone, no location.
- **Motion:** reduced motion turned on.
- **Colour:** light mode, dark mode, high contrast.
- **Files:** paths, case sensitivity, line endings, encoding.

You do not need every combination. Pick a small matrix.
Example: two browsers, two screen sizes, one screen reader.
Write down what you tested. Write down what you did not test.

## Portability rules

- Use `path.join`, not `C:\` or `/`.
- Read and write UTF-8.
- Do not assume file names are case-sensitive.
- Do not assume a drive letter exists.
- Do not assume a browser has a camera.
- Detect a feature. Do not guess from the browser name.
- Offer a fallback when a feature is missing.
- Keep the page usable with JavaScript off, if you can.

## A build and test checklist

- [ ] A clean build works with one command.
- [ ] The lockfile is committed.
- [ ] The version is written in the artifact.
- [ ] The build does not need a secret.
- [ ] The artifact opens offline.
- [ ] I tested two browsers.
- [ ] I tested one small screen.
- [ ] I used only the keyboard.
- [ ] I turned on reduced motion.
- [ ] I wrote down what I did not test.

## Try this

1. Copy the demo to a temp folder.
2. Open it in a second browser.
3. Set the window to phone width.
4. Use Tab and Enter only.
5. Write three lines: what worked, what broke, what you did not test.

## Ask me

Ask the agent: "Make a small cross-environment test plan for this demo."
