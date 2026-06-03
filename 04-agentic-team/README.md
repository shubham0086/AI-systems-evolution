# Rung 04 : Agentic Team

**Several agents, different roles, one shared state, an orchestrator.**

One agent is powerful but does everything itself. A team splits the work:
a **planner** decides the steps, a **worker** does them (with tools), a
**reviewer** checks the result. They share a "blackboard" (common state each agent reads from and writes to), and an orchestrator decides who acts when.

- **Adds over rung 03:** specialization, division of labor, a review step that
  catches mistakes a single agent would miss.
- **Still centralized:** something is in charge of the order. That's the
  difference from a swarm.

```bash
node main.js
```

**Real tools that live here:** CrewAI (define roles, assign tasks, orchestrator coordinates). AutoGen multi-agent conversations. OpenHands / OpenDevin (planner + coder + reviewer loop). LangGraph multi-actor graphs. Mastra multi-agent workflows. Devin (multiple specialized agents under a central coordinator). The pattern: you see a "manager" agent handing off to "worker" agents. Someone is still in charge of the order.

➡ Final rung removes the boss: [05 : Swarm](../05-swarm/)
