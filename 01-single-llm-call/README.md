# Rung 01 — Single LLM Call

**One prompt in, one completion out. Stateless.**

We added intelligence. The model can now produce a real brief on any topic. But it
gets exactly one shot: no tools to look things up, no memory of past calls, no way
to take a second step or check its own work.

- **Adds over rung 00:** real understanding, generalizes to any topic.
- **Can't:** use tools, remember, or self-correct.

```bash
node main.js          # mock
LLM_MOCK=0 node main.js   # real model
```

➡ Next rung chains calls together: [02 — Workflow](../02-workflow/)
