# Rung 03 : Agent

**LLM + tools + a loop. The model decides what to do next.**

This is the real definition of an agent. We give the model a tool (`web_search`)
and a loop, then let *it* choose: search first? answer now? search again? Nobody
wrote the path. The agent picks it at runtime based on what it finds.

- **Adds over rung 02:** autonomy. The control flow is decided by the model.
- **The two ingredients that make it an agent:** *tools* (it can act) and the
  *loop* (it can take more than one step). Remove the loop and you're back at rung 01.

```bash
node main.js          # mock : watch it "choose" the tool, then answer
LLM_MOCK=0 node main.js
```

**Real tools that live here:** ChatGPT with tools or browsing turned on (it decides whether to search or answer directly). Claude with computer use. Cursor in agent mode (it reads the error, edits the file, runs again — the model drives the loop). Perplexity AI (searches → reads pages → synthesizes, model picks what to fetch). Open Interpreter (executes code, reads the output, keeps going). Hermes 3 on Ollama (an open-source model built specifically for tool-calling and agent loops — runs fully offline). **OpenClaw** (250k+ GitHub stars — local-first open-source agent that connects any LLM to your filesystem, shell, browser, and APIs; runs fully offline with Ollama).

The moment a tool like ChatGPT or Claude gets a tool and a loop, it crosses from rung 01 to here. The model is the same. The scaffold around it is different.

> Want to dissect a single agent organ by organ? See the companion repo
> **agent-anatomy**, which zooms all the way into this rung.

➡ Next rung adds more agents: [04 : Agentic Team](../04-agentic-team/)
