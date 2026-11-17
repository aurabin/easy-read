import { Plugin } from "@opencode/plugin"
import { checkText } from "../../skills/easy-read/scripts/readability.mjs"

const RULES = `Easy Read mode is ON for this session.

Follow these rules for every answer:
- Use short sentences. 12 words or fewer. One idea per sentence.
- Use everyday words. Explain a hard word in brackets the first time.
- Use active voice. Say who does what.
- Write 2 or 3 sentences per paragraph.
- Use lists and numbered steps. One action per step.
- Put the main point first.
- No idioms, metaphors, sarcasm, "just", "simply", or "obviously".
- Explain code and commands in plain words. Say what to do next.
- Treat the reader as an adult. Never use baby talk.
- Write in the language the reader uses. If the reader names a language, use
  it. Do not switch to English unless asked.
- When the reader wants to learn something, use the shape in
  references/learn.md: one sentence, one example, one small try, one
  question back.
- If the reader asks for the project joke, use learn/joke.md and tell it in
  their language.

If the easy_read_check tool is available, check your answer before sending it.
Pass the language code so the checker uses the right word list.`

export default Plugin.define({
  id: "easy-read",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.namespace({
        name: "easy_read",
        description: "Checks text for Easy Read plain-language problems",
      })

      editor.add({
        name: "check",
        description:
          "Run a deterministic Easy Read check on text. Returns a score, long sentences, hard words, passive voice, idioms, and long words. Supports en, de, es, fr, pt, it. Use it on your own answer before sending.",
        input: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text to check.",
            },
            language: {
              type: "string",
              description:
                "Language code: en, de, es, fr, pt, it. Omit to detect the language.",
            },
          },
          required: ["text"],
          additionalProperties: false,
        },
        options: { namespace: "easy_read", codemode: true },
        execute: async ({ text, language }) => {
          const options = language ? { language } : {}
          const result = checkText(text, options)
          return { content: result.report }
        },
      })
    })

    await ctx.command.transform((editor) => {
      editor.add({
        name: "easy-mode",
        description: "Turn Easy Read answers on or off for this session",
        execute: async ({ sessionID }) => {
          try {
            const entries = await ctx.session.instructions.entry.list({ sessionID })
            const active = entries.some((entry) => entry.key === "easy-read-mode")

            if (active) {
              await ctx.session.instructions.entry.remove({
                sessionID,
                key: "easy-read-mode",
              })
              await ctx.session.switchAgent({ sessionID, agent: "build" })
              await ctx.session.synthetic({
                sessionID,
                text: "Easy Read mode is OFF. Answers will be normal again.",
              })
              return
            }

            await ctx.session.instructions.entry.put({
              sessionID,
              key: "easy-read-mode",
              value: RULES,
            })
            await ctx.session.switchAgent({ sessionID, agent: "easy-read" })
            await ctx.session.synthetic({
              sessionID,
              text: "Easy Read mode is ON. Answers will use short sentences and simple words. Run /easy-mode again to turn it off.",
            })
          } catch (error) {
            await ctx.session.synthetic({
              sessionID,
              text: `Could not change Easy Read mode: ${error?.message ?? error}`,
            })
          }
        },
      })
    })
  },
})
