// RUNG 01 — SINGLE LLM CALL. One prompt in, one completion out. Stateless.
// We added intelligence, but the system has no tools, no memory, and no ability
// to take a second step. It answers once and forgets everything.

const { llm } = require('../shared/llm');
const { TASK } = require('../shared/task');

(async () => {
  const reply = await llm([
    { role: 'system', content: 'You are a concise analyst.' },
    { role: 'user', content: TASK },
  ]);
  console.log(reply.content);
  console.log('\n[rung 01] One call. The model cannot look anything up or check its work.');
})();
