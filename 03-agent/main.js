// RUNG 03 — AGENT. LLM + tools + a loop. Now the MODEL decides what to do next.
// We hand it a tool (web_search) and let it choose when to use it and when it's
// done. Nobody wrote the path — the agent picks it. This is where autonomy begins.

const { llm } = require('../shared/llm');
const { TASK, webSearch } = require('../shared/task');

const tools = [
  {
    type: 'function',
    function: {
      name: 'web_search',
      description: 'Look up facts about a topic.',
      parameters: {
        type: 'object',
        properties: { query: { type: 'string' } },
        required: ['query'],
      },
    },
  },
];

const TOOLBOX = { web_search: webSearch };

(async () => {
  const messages = [
    { role: 'system', content: 'You are an analyst. Use tools when you need facts, then write the brief.' },
    { role: 'user', content: TASK },
  ];

  for (let step = 1; step <= 5; step++) {
    const msg = await llm(messages, { tools });
    messages.push(msg);

    if (msg.tool_calls && msg.tool_calls.length) {
      for (const call of msg.tool_calls) {
        const args = JSON.parse(call.function.arguments);
        const result = TOOLBOX[call.function.name](args);
        console.log(`[step ${step}] agent chose tool: ${call.function.name}(${args.query})`);
        messages.push({ role: 'tool', tool_call_id: call.id, content: result });
      }
      continue; // loop again — the agent decides what to do with the results
    }

    console.log(`\n[step ${step}] agent produced the final answer:\n` + msg.content);
    break;
  }
  console.log('\n[rung 03] The model chose the steps itself. Remove the loop and this is just rung 01.');
})();
