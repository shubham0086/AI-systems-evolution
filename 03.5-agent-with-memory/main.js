// RUNG 03.5 — AGENT WITH MEMORY. The same agent as rung 03, plus one organ:
// memory that survives between runs. Run it once and it searches to learn the
// facts, then writes them to disk. Run it again and it remembers : it skips the
// search and answers straight from what it already knows. The diff between this
// rung and 03 is persistence. Delete the memory file and you are back at rung 03.

const fs = require('fs');
const path = require('path');
const { llm } = require('../shared/llm');
const { TASK, TOPIC, webSearch } = require('../shared/task');

// The memory organ : a plain JSON file that outlives the process.
const MEMORY_FILE = path.join(__dirname, '.agent-memory.json');

function loadMemory() {
  try {
    return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8'));
  } catch {
    return {}; // no file yet : a brand-new agent with nothing remembered
  }
}

function saveMemory(mem) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(mem, null, 2));
}

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
  const memory = loadMemory();
  const remembered = memory[TOPIC];

  const messages = [
    { role: 'system', content: 'You are an analyst. Use tools when you need facts, then write the brief. If facts are already provided, use them.' },
    { role: 'user', content: TASK },
  ];

  if (remembered) {
    // MEMORY HIT. Feed the remembered facts back in as if a tool had just
    // returned them. The agent now has what it needs and answers without
    // searching again : faster, cheaper, and no redundant tool call.
    console.log(`[memory] HIT for "${TOPIC}" : recalled from a previous run, skipping the search.`);
    messages.push({
      role: 'assistant',
      content: null,
      tool_calls: [{ id: 'call_mem', type: 'function', function: { name: 'web_search', arguments: JSON.stringify({ query: TOPIC }) } }],
    });
    messages.push({ role: 'tool', tool_call_id: 'call_mem', content: remembered });
  } else {
    console.log(`[memory] MISS for "${TOPIC}" : nothing remembered yet, the agent will search and learn.`);
  }

  for (let step = 1; step <= 5; step++) {
    const msg = await llm(messages, { tools });
    messages.push(msg);

    if (msg.tool_calls && msg.tool_calls.length) {
      for (const call of msg.tool_calls) {
        const args = JSON.parse(call.function.arguments);
        const result = TOOLBOX[call.function.name](args);
        console.log(`[step ${step}] agent chose tool: ${call.function.name}(${args.query})`);
        messages.push({ role: 'tool', tool_call_id: call.id, content: result });

        // REMEMBER what we learned, so the next run does not have to search.
        if (call.function.name === 'web_search') {
          memory[TOPIC] = result;
          saveMemory(memory);
          console.log(`[memory] stored facts for "${TOPIC}" -> ${path.basename(MEMORY_FILE)}`);
        }
      }
      continue; // loop again : the agent decides what to do with the results
    }

    console.log(`\n[step ${step}] agent produced the final answer:\n` + msg.content);
    break;
  }

  console.log('\n[rung 03.5] Same agent as rung 03, plus a memory file. Run it again : it remembers and skips the search.');
})();
