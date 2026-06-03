# Setup

## Requirements
- Node.js 18+ (uses the built-in `fetch` — no `npm install`, no dependencies)

## Run it (zero setup)
Every rung runs offline in **mock mode** by default:

```bash
node 00-plain-code/main.js
node 01-single-llm-call/main.js
node 02-workflow/main.js
node 03-agent/main.js
node 04-agentic-team/main.js
node 05-swarm/main.js
```

Mock output is intentionally simple — it exists so you can *see the flow* of each
rung instantly. The lesson is the **difference between the rungs**, not the prose.

## Run it with a real model
Point it at any OpenAI-compatible endpoint.

**Ollama (free, local):**
```bash
ollama pull llama3.2
LLM_MOCK=0 node 03-agent/main.js
```

**OpenAI / any cloud provider:**
```bash
LLM_MOCK=0 \
LLM_BASE_URL=https://api.openai.com/v1 \
LLM_MODEL=gpt-4o-mini \
LLM_API_KEY=sk-... \
node 03-agent/main.js
```

## Change the task
Everything runs the same task. Change it once, re-run the ladder:
```bash
TOPIC="the rise of the transistor" node 05-swarm/main.js
```

## Python parity
JavaScript is the reference implementation. A Python port (`shared/llm.py` +
`main.py` per rung) is a great first contribution — see CONTRIBUTING.
