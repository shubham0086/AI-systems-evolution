# Rung 05 : Swarm

**Many peer agents, no central boss. Coordination is emergent.**

In a team (rung 04) an orchestrator assigns roles and ordering. In a swarm, every
agent is a peer. They each work independently, then **see each other's output and
adjust**. The final result emerges from agents reacting to agents : nobody directed
it.

- **Adds over rung 04:** no single point of control; scales by adding peers;
  robust to any one agent being wrong.
- **The trade:** harder to predict and debug. Emergence cuts both ways.

```bash
node main.js          # watch round 1 (blind) vs round 2 (peer-aware)
```

⬆ Back to the top: [the full ladder](../README.md)
