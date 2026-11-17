# Lesson 7: Maintain and publish

**Time:** 30 minutes. **You need:** lesson 6. A finished draft.

## Short answer

Publishing is one day. Maintenance is every month after.
A project without maintenance becomes a broken promise.
Maintenance without publishing helps nobody.

## Maintenance

**Rule:** put the work in a calendar. Do not wait for a crisis.

### Every week

- Read new bug reports.
- Check the backups ran.
- Look at the error log, if you have one.
- Answer one user question.

### Every month

- Update dependencies.
- Read the security notices for your tools.
- Remove one piece of garbage.
- Check one link.
- Run the full test suite.

### Every quarter

- Restore a backup. Prove it works.
- Review who has access.
- Review the licence and privacy text.
- Pick one old feature to remove or fix.
- Write a short status note.

### Every year

- Check the runtime and browser versions you support.
- Renew domains and certificates.
- Review the budget.
- Ask users what to keep.
- Decide what to stop.

## Dependencies and security

A dependency is code from someone else.
It saves time. It also adds risk.

- Keep a lockfile.
- Read the changelog before a major update.
- Update one dependency at a time.
- Run the tests after each update.
- Remove a dependency you no longer use.
- Patch a known security bug before you add a feature.
- Keep a list of what you ship. That list is an SBOM.

## Support and ownership

A project needs one named owner.
The owner answers the hard questions.
If two people own it, write down who decides.

Set a support route. An email address or an issue tracker is enough.
Say when you will answer. Say what you will not do.
Do not promise 24-hour support for a free project.

The bus factor is the number of people who can take over.
One is a risk. Write the setup steps down.

## Deprecation

Old features need an end.

1. Say it will be removed.
2. Give a date.
3. Offer a replacement.
4. Keep it one more version.
5. Remove it.
6. Note it in the changelog.

Do not remove a feature in silence.

## Publishing

**Rule:** publish from a clean build, with a version and a licence.

Pick a route:

- **Static host:** one HTML file, a folder, or a site.
- **Package registry:** a library other people install.
- **App store:** a phone or desktop app.
- **Marketplace:** a plugin, theme, or template.
- **Print:** a PDF or a paper document.
- **Internal:** a file for one team.

## Before you publish

- [ ] The build is from a clean copy.
- [ ] The version is in the file or the page.
- [ ] The changelog says what changed.
- [ ] The licence is present.
- [ ] The privacy note says what data you collect.
- [ ] The security check passed.
- [ ] The cross-environment test passed.
- [ ] The keyboard test passed.
- [ ] The status line is honest. No "accessible" claim.
- [ ] The rollback copy is ready.
- [ ] The support address works.

If any box is empty, do not publish. Fix it first.

## After you publish

1. Open the public link yourself.
2. Test the first task as a new user.
3. Watch the error log for one day.
4. Answer the first messages.
5. Write down one thing to fix next.
6. Keep the old version for rollback.

If something breaks, roll back first. Explain after.
A fast rollback protects users. It does not make you weak.

## Do not claim more than you tested

You can say: "Tested in Chrome and Firefox on Windows."
You cannot say: "Works everywhere."
You can say: "Not yet tested with the people it is for."
You cannot say: "Accessible."

## Try this

Write a release note with five lines:

1. What changed.
2. Who it is for.
3. How to open it.
4. What is not tested.
5. Where to send feedback.

Then publish the demo to a local folder only.
Do not put it on the public internet yet.

## Ask me

Ask the agent: "Make a one-month maintenance plan for this project."
