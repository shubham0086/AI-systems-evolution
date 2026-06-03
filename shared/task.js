// The SAME task, used by all six rungs. The point of this repo is that the task
// never changes — only the amount of autonomy we hand to the system does.

const TOPIC = process.env.TOPIC || 'the history of the espresso machine';
const TASK = `Write a 3-bullet executive brief on: ${TOPIC}`;

// A fake knowledge source so the "agent" and "team" rungs have a tool to call
// without needing internet access in mock mode.
function webSearch({ query }) {
  return [
    `Result 1 for "${query}": background and origin.`,
    `Result 2 for "${query}": the pivotal moment everyone cites.`,
    `Result 3 for "${query}": current-day relevance and numbers.`,
  ].join('\n');
}

module.exports = { TOPIC, TASK, webSearch };
