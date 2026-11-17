# Standard development features: the full map

This file lists the standard features of software development.
It is a map, not a promise.

**Checked:** 16 November 2026.
**Status keys:**
- **here** — you can use it in this project today.
- **taught** — a lesson explains it and gives you a task.
- **planned** — named here, not built yet.

No list can be truly complete. Use this map to find gaps in your own work.

## 1. Workspace

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Editor | The place where you read and change files. | Open one file and change one line. | here |
| File tree | A list of folders and files. | Find `learn/` in the tree. | here |
| Search | Find text in many files. | Search for `fieldAngle`. | here |
| Replace | Change a word in many places. | Rename one word in two files. | here |
| Terminal | A window where you type commands. | Run the checker once. | here |
| Diff view | Show what changed, line by line. | Compare a file before and after. | here |
| Preview | See a page without leaving the editor. | Open the Boing Ball demo. | here |
| Session | Keep one task and its context together. | Start a new session for a new task. | here |
| Worktree | A second copy for a separate branch. | Ask the agent to list worktrees. | here |
| Settings | Change the tool to fit you. | Change one keybind or theme. | here |
| Keybinds | Short keys for common actions. | Learn one new shortcut. | taught |
| Extensions | Add features from other people. | List your installed extensions. | here |

## 2. Source control

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Init | Start a git repository. | Run `git init` in a safe folder. | planned |
| Clone | Copy a repository to your machine. | Clone one small public repo. | taught |
| Ignore file | Keep secrets and junk out of git. | Add `.env` to `.gitignore`. | taught |
| Branch | A separate line of work. | Make one branch for one change. | taught |
| Commit | Save a labelled snapshot. | Commit one file with a clear message. | taught |
| Stage and diff | Choose what goes into a commit. | Stage one file, not all. | taught |
| Merge | Join two branches. | Merge a small branch into `main`. | taught |
| Rebase | Move commits onto a new base. | Rebase one local commit. | taught |
| Tag | Mark a release. | Tag `v0.1.0`. | taught |
| Remote | A copy on a server. | Add one remote, do not push. | planned |
| Pull request | Ask to merge a branch. | Open a draft PR with a checklist. | taught |
| Code review | Another person reads the change. | Review one small diff. | taught |
| Signed commit | Prove who made a commit. | Read how GPG signing works. | planned |
| Blame | See who changed each line. | Run `git blame` on one file. | taught |
| Stash | Park changes for later. | Stash one change, then restore it. | taught |

## 3. Environment

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Runtime version | The version of Node, Python, or Java. | Print your Node version. | here |
| Version file | Pin the version for everyone. | Add `.nvmrc` or `.tool-versions`. | taught |
| Package manager | Install and update libraries. | Read `package.json` if it exists. | taught |
| Lockfile | Freeze exact dependency versions. | Find the lockfile in a project. | taught |
| Environment variables | Settings kept outside the code. | Read one variable, never print a secret. | taught |
| Secrets | Passwords and keys. | Keep a key in a local file, not git. | taught |
| Container | A small box for the app and its files. | Read a 10-line Dockerfile. | taught |
| Dev container | A ready-made coding box. | Open one example config. | planned |
| Reproducible build | Same input, same output. | Build twice and compare. | taught |
| Setup script | One command to prepare a machine. | Write 3 setup steps. | taught |
| Cross-platform paths | Paths that work on Windows and Linux. | Use `path.join`, not a hard slash. | taught |

## 4. Build and assets

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Compile | Turn source into a runnable program. | Compile one small file. | taught |
| Transpile | Turn new syntax into older syntax. | Read one Babel or TypeScript example. | taught |
| Bundle | Pack many files into few. | Compare a bundle before and after. | taught |
| Minify | Make the file smaller. | Minify one CSS file. | taught |
| Code splitting | Load only what a page needs. | Split one large page into two. | planned |
| Static assets | Images, fonts, and sounds. | List the assets in the demo. | here |
| Cache busting | Force a new file after a change. | Add a version to one file name. | taught |
| Source map | Link built code back to source. | Open a source map in dev tools. | taught |
| Build cache | Reuse parts of an old build. | Time a cold and a warm build. | planned |
| Asset licence | Know what you may publish. | Check the licence of one image. | taught |

## 5. Quality

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Lint | Find likely mistakes in code. | Run one linter on one file. | taught |
| Format | Make the code look the same everywhere. | Run a formatter on one file. | taught |
| Type check | Catch wrong types before running. | Run `tsc --noEmit` on one file. | taught |
| Unit test | Test one small function. | Run the 26 checker tests. | here |
| Integration test | Test parts working together. | Test the checker on one file. | here |
| End-to-end test | Test the whole flow like a user. | Click Start in the demo and check. | taught |
| Coverage | See which lines a test touches. | Ask for a coverage report. | taught |
| Mutation test | Change code and see if tests fail. | Break one line on purpose. | taught |
| Fuzz test | Throw random input at the code. | Send 20 odd strings to the checker. | taught |
| Static analysis | Find risks without running. | Run one security scan. | taught |
| Dependency audit | Check libraries for known bugs. | Run `npm audit` in one project. | taught |
| Accessibility test | Check keyboard, contrast, and names. | Tab through the demo. | here |
| Performance test | Measure speed and memory. | Time one page load. | taught |
| Regression test | Check that old bugs stay fixed. | Add one test for one fixed bug. | taught |

## 6. Delivery

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Continuous integration | Run checks on every change. | Write 3 checks for a CI job. | planned |
| Continuous delivery | Ship small changes often. | Describe one safe release. | taught |
| Release | Give users a new version. | Write 5 release steps. | taught |
| Semantic version | Numbers that show the size of a change. | Label one change as major or minor. | taught |
| Changelog | A list of what changed. | Write 3 lines for one release. | taught |
| Artifact | The file you publish. | Name the file for one release. | taught |
| Staging | A test copy that looks real. | List what staging must copy. | planned |
| Production | The copy real people use. | Write one rule for production. | taught |
| Feature flag | Turn a feature on or off. | Name one feature to hide. | planned |
| Canary | Give a new version to a few users first. | Describe a 5% canary release. | planned |
| Rollback | Go back to the last good version. | Keep the old artifact ready. | taught |

## 7. Operations

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Logging | Write down what the app did. | Add one useful log line. | taught |
| Log levels | Separate debug, info, warn, error. | Label 3 log lines. | taught |
| Metrics | Numbers over time. | Pick one number to watch. | taught |
| Tracing | Follow one request across services. | Draw the steps of one request. | planned |
| Alerting | Tell a person when something breaks. | Write one alert rule. | planned |
| Dashboard | One screen with the key numbers. | Sketch 3 panels. | planned |
| Backup | Keep a second copy of data. | Say where the backup lives. | taught |
| Restore test | Prove the backup works. | Restore one file. | taught |
| Incident runbook | Steps for a bad day. | Write 5 steps for one failure. | taught |
| On-call | Who answers at night. | Name the first person to call. | planned |
| Service level | A promise about speed or uptime. | Write one simple promise. | planned |
| Postmortem | Learn from a failure without blame. | Write 3 lines after a small bug. | taught |

## 8. Security

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Authentication | Prove who a user is. | List 2 login methods. | taught |
| Authorization | Decide what a user may do. | Write 2 roles and their rights. | taught |
| Input validation | Check data before you use it. | Reject one empty field. | taught |
| Output encoding | Stop data from becoming code. | Read how HTML escaping works. | taught |
| XSS | A script hidden in a page. | Try a harmless test string. | taught |
| SQL injection | A query changed by bad input. | Read one parameterised query. | taught |
| CSRF | A hidden request from another site. | Read how a token helps. | taught |
| Secrets scan | Find keys that leaked into git. | Search one repo for `API_KEY`. | taught |
| Least privilege | Give only the rights needed. | Remove one unused right. | taught |
| SBOM | A list of what is inside. | List 5 dependencies. | planned |
| Patch policy | Update before a bug is used. | Set a monthly update day. | taught |
| Threat model | List what can go wrong. | Name 3 threats and 3 fixes. | taught |
| Privacy by design | Collect less data from the start. | Remove one field from a form. | taught |
| Consent and deletion | Ask, and let people leave. | Write one delete request flow. | taught |

## 9. Accessibility and language

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Semantic HTML | Use the right element for the job. | Replace one `div` with a `button`. | here |
| Keyboard access | Everything works without a mouse. | Tab through the demo. | here |
| Focus style | Show where the keyboard is. | Check the blue focus ring. | here |
| Contrast | Text is easy to see. | Check one colour pair. | here |
| Screen reader name | Every control has a name. | Read the demo's `aria-label`. | here |
| Reduced motion | Respect a wish for less motion. | Turn on "Less motion". | here |
| Alt text | Describe a picture in words. | Write alt text for one image. | here |
| Captions | Words for the sound. | Add captions to one clip. | planned |
| Language tag | Tell the browser the page language. | Check `<html lang="en">`. | here |
| Right-to-left | Support Arabic, Hebrew, and others. | Test one page with `dir="rtl"`. | planned |
| Localization | Change text, money, and dates. | Add one language to a page. | taught |
| Plain language | Write so more people understand. | Run the Easy Read checker. | here |
| Translation review | A person checks the translation. | Ask a speaker to read one page. | taught |

## 10. Data and privacy

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Schema | The shape of the data. | Draw 3 fields and their types. | taught |
| Migration | Change data without losing it. | Write 3 safe migration steps. | taught |
| Seed data | Fake data for a new machine. | Make 5 fake rows. | taught |
| Data backup | A copy you can restore. | Say when the last copy was made. | taught |
| Retention | Delete data you no longer need. | Set one delete date. | taught |
| Data map | Know where data lives. | List 3 places data is stored. | taught |
| Access log | Know who read the data. | Write 1 line per access. | planned |
| Anonymisation | Remove names before analysis. | Replace 3 names with codes. | taught |
| Export | Let a person take their data. | Describe one export file. | planned |
| Delete request | Remove a person's data. | Write the 4 steps. | taught |

## 11. Documentation and community

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| README | The first page a person reads. | Read the root `README.md`. | here |
| API docs | How to call the code. | Write one function's input and output. | taught |
| Architecture note | Why the code is shaped this way. | Write 5 lines about one choice. | taught |
| User guide | How a person does a task. | Write 5 steps for the demo. | taught |
| Tutorial | Teach by doing. | Read one lesson in `learn/`. | here |
| FAQ | Answers to common questions. | Write 3 questions and answers. | taught |
| Licence | What others may do with the work. | Add a `LICENSE` file. | planned |
| Contributing guide | How to send a change. | Write 5 rules. | taught |
| Issue template | Ask for the right details. | Write 3 fields. | taught |
| Code of conduct | How people treat each other. | Read one short example. | taught |
| Support route | Where to ask for help. | Add one contact line. | here |
| Ownership | Who reviews which files. | Add one owner for `learn/`. | planned |
| Changelog | What changed, for users. | Write 3 lines. | taught |
| Status page | Say what is tested and what is not. | Read the status line in `README.md`. | here |

## 12. Lifecycle

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Revision | Change one thing, then check it. | Revise one constant in the demo. | taught |
| Diff review | Read what changed, line by line. | Review one small diff. | here |
| Debugging | Find the cause of a failure. | Reproduce one error. | taught |
| Reproduce | Make the failure happen again. | Write the exact steps. | taught |
| Bisect | Find the first bad change. | Cut a short history in half. | taught |
| Garbage removal | Delete what nothing uses. | Search one unused file first. | taught |
| Cleanup | Keep names, folders, and docs clear. | Rename one unclear file. | taught |
| Build | Turn source into the artifact. | Name the artifact for one release. | taught |
| Reproducible build | Same input, same output. | Build twice and compare. | taught |
| Cross-environment test | Test on other systems and inputs. | Test two browsers and one phone width. | taught |
| Maintenance schedule | Put upkeep in the calendar. | Write one monthly task. | taught |
| Publishing | Put the artifact where people can use it. | Write one release note. | taught |
| Rollback | Return to the last good version. | Keep the old artifact. | here |
| Deprecation | End an old feature with notice. | Write one removal date. | taught |

## The honest limit

This map names features. It does not prove that this project has them all.
Only the rows marked **here** work in this folder today.
The rest are lessons or plans. Say so when you describe the project.
