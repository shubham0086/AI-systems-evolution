<div align="center">

# AI Systems Evolution — From Code to Swarm

**The same task, solved six times, each time with more autonomy.**
Run each rung in under a minute (zero setup) and *feel* the jump from a plain
script to an emergent swarm.

`code` → `single call` → `workflow` → `agent` → `agentic team` → `swarm`

</div>

---

## Why this exists

Everyone uses the words — *workflow, agent, multi-agent, swarm* — and almost
nobody agrees on where one ends and the next begins. This repo settles it by
**showing** instead of telling: one identical task ("write a 3-bullet brief on a
topic") implemented at six levels of autonomy. The lesson is the **diff between
the rungs**.

It's the front door to a deeper stack:

```
AI-systems-evolution   ← you are here (the "what" and "why", for everyone)
        │
        ├─▶ agent-anatomy        zoom into rung 03: what an agent is made of
        ├─▶ agentic-patterns     the architecture theory behind the choices
        ├─▶ agentic-systems      five runnable production-grade agent systems
        └─▶ agentkernel          the infra engines underneath
```

## The ladder

| Rung | Folder | One line |
|------|--------|----------|
| 00 | [`00-plain-code`](00-plain-code/) | No model. Just instructions a human wrote. |
| 01 | [`01-single-llm-call`](01-single-llm-call/) | One prompt, one answer. Stateless. |
| 02 | [`02-workflow`](02-workflow/) | A fixed chain of calls — on rails. |
| 03 | [`03-agent`](03-agent/) | LLM + tools + loop. The model picks the path. |
| 04 | [`04-agentic-team`](04-agentic-team/) | Roles + orchestrator + shared state. |
| 05 | [`05-swarm`](05-swarm/) | Peers, no boss. Coordination emerges. |

📊 See [`COMPARISON.md`](COMPARISON.md) for the side-by-side table and the two
lines people always blur.

## Run it (zero setup)

Node 18+, no dependencies, no API keys. Everything runs in **mock mode** by default.

```bash
node 00-plain-code/main.js
node 01-single-llm-call/main.js
node 02-workflow/main.js
node 03-agent/main.js
node 04-agentic-team/main.js
node 05-swarm/main.js
```

Use a real model with one env var (`LLM_MOCK=0`, Ollama or any OpenAI-compatible
endpoint) — see [`SETUP.md`](SETUP.md).

## Interactive explainer

Open [`web/index.html`](web/index.html) in a browser (or host it on GitHub Pages):
click any rung to see what it adds, the code, and a simulated run trace.

---

<div align="center">

Built by [Shubham Prajapati](https://github.com/shubham0086) ·
[Portfolio](https://shubham0086.github.io/MyPortfolio.github.io/)
· Code: MIT · Explanatory content: CC BY 4.0

</div>
