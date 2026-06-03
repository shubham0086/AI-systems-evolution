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

➡ Final rung removes the boss: [05 : Swarm](../05-swarm/)
