// Provider-agnostic LLM call — the ONE place every rung talks to a model.
//
// Defaults to MOCK mode so this repo runs with zero setup (no keys, no install).
// Mock output is illustrative, not high-quality — it exists so the *flow* of each
// rung is visible instantly. To use a real model:
//
//   LLM_MOCK=0  LLM_BASE_URL=http://localhost:11434/v1  LLM_MODEL=llama3.2   (Ollama, free)
//   LLM_MOCK=0  LLM_BASE_URL=https://api.openai.com/v1  LLM_MODEL=gpt-4o-mini  LLM_API_KEY=sk-...
//
// Any OpenAI-compatible endpoint works.

const MOCK = process.env.LLM_MOCK !== '0';
const BASE_URL = process.env.LLM_BASE_URL || 'http://localhost:11434/v1';
const MODEL = process.env.LLM_MODEL || 'llama3.2';
const API_KEY = process.env.LLM_API_KEY || 'ollama';

async function llm(messages, { tools } = {}) {
  if (MOCK) return mockResponse(messages, tools);

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, messages, tools, temperature: 0.3 }),
  });
  if (!res.ok) throw new Error(`LLM error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message;
}

// ---- Mock engine: deterministic, offline, illustrative ---------------------

let cachedTopic = null; // remember the topic once seen, for multi-step rungs

function topicOf(messages) {
  if (cachedTopic) return cachedTopic; // lock onto the first clean topic we see
  const lines = messages.map((m) => m.content || '').join('\n');
  // Prefer an explicit "on: <topic>" (requires the colon, so "concise" won't match).
  let m = lines.match(/\bon:\s*(.+?)\s*$/im);
  // Otherwise a quoted topic, e.g. swarm bullets: ... on "the topic" ...
  if (!m) m = lines.match(/"([^"]{4,})"/);
  if (m) {
    // Stop at the first sentence/clause boundary so trailing instructions or
    // search-result fragments don't leak into the topic.
    cachedTopic = m[1].split(/[.:"`]/)[0].replace(/\s+/g, ' ').trim();
  }
  return cachedTopic || 'the topic';
}

function angleOf(messages) {
  const lines = messages.map((m) => m.content || '').join('\n');
  const m = lines.match(/angle:\s*([A-Za-z ]+)/i);
  return m ? m[1].trim() : null;
}

function mockResponse(messages, tools) {
  const hasToolResult = messages.some((m) => m.role === 'tool');

  // If the rung gave the model tools and it hasn't searched yet, "decide" to search.
  if (tools && tools.length && !hasToolResult) {
    return {
      role: 'assistant',
      content: null,
      tool_calls: [
        {
          id: 'call_mock_1',
          type: 'function',
          function: {
            name: 'web_search',
            arguments: JSON.stringify({ query: topicOf(messages) }),
          },
        },
      ],
    };
  }

  return { role: 'assistant', content: mockText(messages) };
}

const ANGLES = {
  origin: '• Origin: where it came from and the problem it first solved.',
  'turning point': '• Turning point: the change that made it matter at scale.',
  today: '• Today: why it still shapes how things work now.',
};

function mockText(messages) {
  const text = messages.map((m) => m.content || '').join('\n').toLowerCase();
  const topic = topicOf(messages);

  // Swarm: one bullet per angle, so peers differ. Second round is "refined".
  const angle = angleOf(messages);
  if (angle) {
    const bullet = ANGLES[angle.toLowerCase()] || `• ${angle}: a distinct take on ${topic}.`;
    const refined = /peers already wrote/i.test(text);
    return refined ? bullet.replace(/\.$/, ' (refined after seeing peers).') : bullet;
  }

  // Order matters: check the most specific markers first.
  if (text.includes('polish')) {
    return `Executive brief — ${topic}\n${ANGLES.origin}\n${ANGLES['turning point']}\n${ANGLES.today}`;
  }
  if (text.includes('review') || text.includes('reviewer') || text.includes('critique')) {
    return `[reviewer] Tightened wording and verified the three claims on "${topic}". Approved.`;
  }
  if (text.includes('draft')) {
    return `Draft on "${topic}": origin and context set the stage; a turning point changed everything; the impact is still felt today.`;
  }
  if (text.includes('outline') || text.includes('planner')) {
    return `Outline for "${topic}":\n  1. Origin and context\n  2. Key turning point\n  3. Impact today`;
  }
  // default: the 3-bullet brief
  return [
    `Executive brief — ${topic}`,
    ANGLES.origin,
    ANGLES['turning point'],
    ANGLES.today,
  ].join('\n');
}

module.exports = { llm, MOCK, MODEL };
