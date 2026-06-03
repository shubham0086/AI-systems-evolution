// RUNG 02 — WORKFLOW. A fixed chain of LLM calls: outline -> draft -> polish.
// More reliable than one call, because each step is smaller. But a HUMAN wrote
// the path. The system always does these three steps, in this order, forever.

const { llm } = require('../shared/llm');
const { TASK } = require('../shared/task');

(async () => {
  const outline = await llm([{ role: 'user', content: `Write an OUTLINE for: ${TASK}` }]);
  const draft = await llm([{ role: 'user', content: `Write a DRAFT from this outline:\n${outline.content}` }]);
  const final = await llm([{ role: 'user', content: `POLISH this draft into a final brief:\n${draft.content}` }]);

  console.log('— step 1 (outline) —\n' + outline.content);
  console.log('\n— step 2 (draft) —\n' + draft.content);
  console.log('\n— step 3 (polished) —\n' + final.content);
  console.log('\n[rung 02] Three calls on rails. Predictable, but it cannot deviate from the script.');
})();
