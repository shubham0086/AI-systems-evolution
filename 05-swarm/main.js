// RUNG 05 — SWARM. No central boss. Several peer agents each work independently,
// then SEE each other's output and adjust. Coordination is emergent, not directed.
// Compare to rung 04: there an orchestrator assigned roles; here, nobody is in charge.

const { llm } = require('../shared/llm');
const { TOPIC } = require('../shared/task');

const PEERS = ['Origin', 'Turning point', 'Today'];

async function propose(angle, peerNotes) {
  const ctx = peerNotes ? `\nYour peers already wrote:\n${peerNotes}\nAvoid overlap; sharpen your own angle.` : '';
  const r = await llm([
    { role: 'user', content: `You are one peer in a swarm. Write ONE bullet on "${TOPIC}" from the angle: ${angle}.${ctx}` },
  ]);
  return r.content.split('\n').pop().trim();
}

(async () => {
  // Round 1 — every peer works in parallel, blind to the others.
  let bullets = await Promise.all(PEERS.map((a) => propose(a)));
  console.log('— round 1 (independent) —\n' + bullets.join('\n'));

  // Round 2 — each peer now sees the others and self-corrects. No coordinator.
  bullets = await Promise.all(PEERS.map((a, i) => propose(a, bullets.filter((_, j) => j !== i).join('\n'))));
  console.log('\n— round 2 (peer-aware) —\n' + bullets.join('\n'));

  console.log('\n[rung 05] The brief emerged from peers reacting to peers. No orchestrator existed.');
})();
