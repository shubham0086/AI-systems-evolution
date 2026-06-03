// RUNG 04 — AGENTIC TEAM. Several agents with different roles, coordinated by an
// orchestrator and a shared "blackboard" (shared state). Planner decides the work,
// a worker does it, a reviewer checks it. Division of labor, with handoffs.

const { llm } = require('../shared/llm');
const { TASK, webSearch } = require('../shared/task');

const blackboard = {}; // shared memory all agents read from and write to

async function planner() {
  const r = await llm([{ role: 'user', content: `As a PLANNER, list the steps to: ${TASK}. Return an OUTLINE.` }]);
  blackboard.plan = r.content;
}

async function worker() {
  const facts = webSearch({ query: TASK }); // the worker has hands (a tool)
  const r = await llm([
    { role: 'user', content: `As a WORKER, write a DRAFT brief using this plan:\n${blackboard.plan}\nand these facts:\n${facts}` },
  ]);
  blackboard.draft = r.content;
}

async function reviewer() {
  const r = await llm([{ role: 'user', content: `As a REVIEWER, critique and approve this draft:\n${blackboard.draft}` }]);
  blackboard.review = r.content;
}

(async () => {
  // The orchestrator decides the order and passes state between specialists.
  await planner();
  console.log('[planner] wrote the plan to the blackboard');
  await worker();
  console.log('[worker]  wrote the draft to the blackboard');
  await reviewer();
  console.log('[reviewer] signed off\n');

  console.log('— final blackboard —');
  console.log('PLAN:\n' + blackboard.plan);
  console.log('\nDRAFT:\n' + blackboard.draft);
  console.log('\nREVIEW:\n' + blackboard.review);
  console.log('\n[rung 04] Many roles, one shared state, an orchestrator deciding who acts when.');
})();
