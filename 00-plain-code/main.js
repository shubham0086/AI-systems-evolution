// RUNG 00 — PLAIN CODE. No LLM. No intelligence. Just deterministic instructions.
// This is the baseline every other rung is measured against.

const { TOPIC } = require('../shared/task');

function brief(topic) {
  // A human wrote every word of this logic. It cannot handle anything it wasn't
  // explicitly told how to handle. Change the topic and the "insight" stays generic.
  return [
    `Executive brief — ${topic}`,
    `• Origin: <a human must fill this in>`,
    `• Turning point: <a human must fill this in>`,
    `• Today: <a human must fill this in>`,
  ].join('\n');
}

console.log(brief(TOPIC));
console.log('\n[rung 00] No model was called. The program only knows what was hard-coded.');
