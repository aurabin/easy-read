# AI features: the full map

This file lists the AI features a modern coding tool can have.
It is a map, not a promise.

**Checked:** 16 November 2026. Tools change fast.
**Status keys:**
- **here** — you can use it in this project today.
- **taught** — a lesson explains it and gives you a task.
- **planned** — named here, not built yet.

No list can be truly complete. New features appear every month.
Use this map to ask better questions, not to claim that everything works.

## 1. Models and input

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Model choice | Pick one model for one job. | Ask for a small job with two models. Compare. | here |
| Provider | The company or server that runs the model. | Name your provider before you ask. | here |
| Context window | How much text the model can hold at once. | Give a short file, then a long one. Notice the drop. | taught |
| Token | A small piece of text. A word or part of a word. | Ask the agent to count tokens in one sentence. | taught |
| Temperature | A setting for safe or surprising answers. | Ask the same question at low and high temperature. | planned |
| System prompt | Standing rules for the model. | Read `RULES` in the plugin file. | here |
| Streaming | The answer appears word by word. | Watch a long answer arrive. | here |
| Multimodal input | Text, image, audio, or video as input. | Ask about a screenshot. | here |
| Embeddings | Numbers that stand for meaning. | Ask why "car" and "auto" can be close. | taught |
| Vector search | Find text by meaning, not exact words. | Search a folder for an idea, not a word. | planned |
| RAG | Retrieve documents, then answer with them. | Ask the agent to cite a file in this project. | taught |
| Fine-tuning | Train a model on your own examples. | List 10 good and 10 bad answers. | planned |
| Local model | A model that runs on your machine. | Ask which local models fit your memory. | planned |
| Model routing | Send easy jobs to a cheap model. | Split a job into easy and hard parts. | planned |
| Cost budget | A limit on what a job may cost. | Set a limit before a long job. | planned |
| Latency budget | A limit on how long a job may take. | Time one small task. | taught |

## 2. Code

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Code generation | Write new code from a prompt. | Build one small page. | here |
| Code completion | Guess the next line as you type. | Type a function name, stop, and read. | here |
| Code explanation | Say what a block does in plain words. | Ask for line 1 of `fieldAngle`. | here |
| Refactoring | Change the shape, keep the behaviour. | Rename one variable everywhere. | taught |
| Bug finding | Find a likely cause of a failure. | Give one error message and one file. | here |
| Test generation | Write tests for existing code. | Ask for one test for the checker. | here |
| Test data | Make safe fake data for a test. | Ask for 5 fake names, no real people. | taught |
| Code review | Read code and list risks. | Ask for 3 risks in the demo. | taught |
| Documentation | Write a README or a comment. | Ask for a 5-line README. | here |
| Commit message | Summarise a change in one line. | Ask for a commit message for one file. | taught |
| Language port | Rewrite code in another language. | Port one small function to Python. | taught |
| Migration | Move code or data to a new version. | List the steps for one rename. | taught |
| Regex and SQL | Write a pattern or a query. | Ask for a pattern that finds dates. | here |
| Infrastructure as code | Describe servers in a file. | Ask for a 10-line example, not a deploy. | planned |

## 3. Agents and tools

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Agent loop | The model plans, acts, checks, repeats. | Ask for a 3-step task and watch. | here |
| Tool calling | The model uses a tool, then reads the result. | Ask it to list files, then read one. | here |
| MCP | A standard way to add tools and data. | List the MCP tools you have. | here |
| Subagents | Child agents for separate jobs. | Send one research job to a subagent. | here |
| Planning | Write the steps before acting. | Ask for a plan before any edit. | taught |
| Memory | Keep useful facts between turns. | Ask it to remember one project rule. | taught |
| Skills | A folder of instructions for one job. | Load the Easy Read skill. | here |
| Slash commands | A short name for a repeated task. | Type `/easy` or `/learn`. | here |
| Plugins and hooks | Code that runs at set moments. | Read the Easy Read plugin. | here |
| Permissions | Ask before a risky action. | Try a command that needs approval. | here |
| Sandbox | Run code with limits. | Ask what the sandbox blocks. | taught |
| Background tasks | Long work runs while you continue. | Start a long build in the background. | here |
| Human handoff | Stop and ask a person to act. | Log in to a site, then hand over. | taught |
| Agent-to-agent | Two agents pass a task. | Ask one agent to review another. | planned |

## 4. Language and content

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Summarise | Shorten text and keep the point. | Summarise one lesson in 3 lines. | here |
| Rewrite and tone | Change the style, keep the meaning. | Rewrite one line for a child. | here |
| Translate | Move text to another language. | Translate the joke into your language. | here |
| Simplify | Use shorter sentences and easier words. | Run `/simple` on one paragraph. | here |
| Structured output | Return JSON or a table, not prose. | Ask for a 3-row table with fixed columns. | here |
| Classification | Put items into named groups. | Sort 10 tasks into 3 groups. | taught |
| Extraction | Pull names, dates, or numbers out. | Extract the dates from one file. | here |
| Q&A over docs | Answer from a set of files. | Ask a question about `learn/README.md`. | taught |
| Citations | Show which file supports the answer. | Ask for a file and line number. | taught |
| Glossary | Keep one word list for a project. | Add one word to the Easy Read list. | here |
| Style guide | Keep one set of writing rules. | Read `references/checklist.md`. | here |
| Readability score | Measure sentence and word length. | Run the checker on one lesson. | here |

## 5. Media

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Image generation | Make a new picture from text. | Ask for one simple icon. | here |
| Image editing | Change an existing picture. | Ask for a colour change. | here |
| Alt text | Describe a picture for screen readers. | Write alt text for the demo canvas. | here |
| OCR | Read text from a picture. | Photograph one page and extract the text. | planned |
| Speech to text | Turn audio into text. | Record one sentence and transcribe it. | planned |
| Text to speech | Read text out loud. | Ask for a voice note of one lesson. | planned |
| Captions | Show the words in a video. | Add captions to a 30-second clip. | planned |
| Media summary | Summarise audio or video. | Summarise a 2-minute recording. | planned |

## 6. Quality and safety

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Evaluation set | A fixed set of test questions. | Write 5 questions with known answers. | taught |
| Benchmark | Compare models on the same tasks. | Run one task on two models. | planned |
| Unit eval | Test one behaviour at a time. | Check that 3 sentences stay short. | taught |
| Human review | A person checks before use. | Ask a person to read one answer. | here |
| Uncertainty | The model says what it does not know. | Ask: "What are you not sure about?" | here |
| Hallucination check | Find a claim that is not supported. | Ask for a source, then check it. | here |
| Prompt injection | Hidden text tries to change the rules. | Put "ignore rules" in a file and test. | taught |
| Privacy and redaction | Remove names and secrets before sending. | Replace a name with `[name]`. | here |
| Bias check | Look for unfair patterns. | Ask who may be left out of an answer. | taught |
| Licence check | Check the rights for code and data. | Ask for the licence of one asset. | taught |
| Guardrails | Block unsafe input or output. | List 3 things the tool must refuse. | taught |
| Audit log | Keep a record of actions. | Read the session log. | planned |
| Consent | Ask before using a person's data. | Read the consent note in `co-design.md`. | here |

## 7. Operations

| Feature | What it means | Try this | Status |
| --- | --- | --- | --- |
| Prompt versioning | Keep old prompts and compare. | Save `prompt-v1` and `prompt-v2`. | taught |
| A/B test | Try two versions with real users. | Give version A and B to two people. | planned |
| Tracing | Follow one request through the system. | Time each step of one task. | planned |
| Logging | Write down what happened. | Add one log line to a script. | taught |
| Feedback loop | Users report what went wrong. | Add a feedback address to a page. | taught |
| Caching | Reuse an answer to save time. | Ask which steps are safe to cache. | planned |
| Rate limits | Stop too many requests. | Ask what a 429 error means. | taught |
| Cost tracking | See what each job costs. | Estimate the cost of 100 answers. | planned |
| Model monitoring | Watch quality after launch. | Pick 3 signals to watch. | planned |
| Rollback | Go back to the last good version. | Keep a copy before a change. | here |

## The honest limit

This map names features. It does not prove that this project has them all.
Only the rows marked **here** work in this folder today.
The rest are lessons or plans. Say so when you describe the project.
