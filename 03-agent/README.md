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

> Want to dissect a single agent organ by organ? See the companion repo
> **agent-anatomy**, which zooms all the way into this rung.

➡ Next rung adds more agents: [04 : Agentic Team](../04-agentic-team/)
