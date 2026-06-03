# Rung 02 : Workflow

**A fixed chain of LLM calls: outline → draft → polish.**

Breaking the job into smaller steps makes the result more reliable than one big
call. But notice who designed the steps: a **human** did. The system always runs
these three stages, in this order, no matter what. It can't decide to skip a step,
add one, or look something up.

- **Adds over rung 01:** reliability through decomposition; predictable cost.
- **Can't:** deviate from the human-written script.

```bash
node main.js
```

This is the line most people blur. A workflow is **LLM calls on rails**. The next
rung hands the steering wheel to the model itself.

**Real tools that live here:** Notion AI (summarize → rewrite → format, fixed steps). n8n or Zapier with AI nodes — a human designed the flow, the model fills the blanks. Most "AI-powered" SaaS features. LangChain chains without a loop. The model is doing real work, but every step was written by a human in advance.

➡ Next rung: [03 : Agent](../03-agent/)
