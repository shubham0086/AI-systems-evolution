# Rung 03.5 : Agent with Memory

**The same agent as rung 03, plus one organ that survives between runs.**

Rung 03 is a brilliant amnesiac. It can search, reason, and answer, but the moment
the process exits it forgets everything. Ask it the same question tomorrow and it
does the same work from scratch. This half-rung adds the missing organ: **memory
that persists**. The agent writes what it learns to a file, and on the next run it
recalls it instead of searching again.

- **Adds over rung 03:** persistence. State now outlives a single run.
- **What stays the same:** the tools and the loop. This is still one agent. The
  only new thing is that it remembers.
- **Why it is a bridge to rung 04:** a team needs *shared* memory (a blackboard).
  Before agents can share memory, a single agent has to *have* memory. This rung
  is that step.

```bash
node main.js          # run 1 : MISS, the agent searches and stores what it learns
node main.js          # run 2 : HIT, it recalls from disk and skips the search
rm .agent-memory.json # forget everything : you are back at rung 03
```

The proof is in running it twice. The first run logs a `MISS` and calls the search
tool. The second run logs a `HIT`, never touches the tool, and answers straight
from `.agent-memory.json`. Same agent, same task, but the second run is faster and
makes zero tool calls. That difference is memory.

**Real tools that live here:** ChatGPT with memory turned on (it recalls facts about
you across separate chats). Claude Projects (persistent project knowledge across
sessions). Cursor with its codebase index and rules files (it remembers your project
between edits). MemGPT / Letta (agents with explicit long-term memory tiers).
mem0 and Zep (drop-in memory layers for agents). The pattern: close the app, reopen
it, and the agent still knows what you told it last time.

> Want to dissect memory as one of an agent's four organs (brain, hands, memory,
> loop)? See the companion repo **agent-anatomy**, which zooms into exactly this.

➡ Next rung gives memory to a whole team: [04 : Agentic Team](../04-agentic-team/)
