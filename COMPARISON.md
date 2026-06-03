# The Ladder at a Glance

Same task at every rung : *"write a 3-bullet brief on a topic."* Only the autonomy changes.

| Rung | What it is | Who decides the steps | Tools | Memory | LLM calls | Predictability | Best when… |
|------|-----------|----------------------|-------|--------|-----------|----------------|------------|
| **00** Plain code | Hard-coded script | Human (at write time) | none | none | 0 | Total | The task never varies |
| **01** Single call | One prompt | Human (the prompt) | none | none | 1 | High | A one-shot answer is enough |
| **02** Workflow | Fixed chain | Human (the pipeline) | optional | passed along | N (fixed) | High | Steps are known and stable |
| **03** Agent | LLM + tools + loop | **The model** | yes | within the run | N (variable) | Medium | The path can't be known upfront |
| **04** Agentic team | Roles + orchestrator | Orchestrator | yes | shared blackboard | many | Medium | Work splits into specialties |
| **05** Swarm | Peers, no boss | **Emergent** | yes | shared/peer | many | Low | Scale and robustness over control |

## The two lines people blur

1. **Workflow vs. Agent (rung 02 → 03).** A workflow runs LLM calls on a path a
   *human* wrote. An agent lets the *model* choose the path at runtime. The
   ingredients that flip it: **tools** + a **loop**.

2. **Team vs. Swarm (rung 04 → 05).** A team has someone in charge (an
   orchestrator). A swarm has no central control : coordination *emerges* from
   peers reacting to peers.

## The honest rule

**Climb only as high as you need.** Higher rungs add capability *and* cost,
latency, and unpredictability. Most production systems are a workflow (rung 02)
with one or two agentic steps (rung 03) inside : not a swarm.
