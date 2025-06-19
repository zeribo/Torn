import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let blocks = [];

// Helper to generate a random 64-character hex hash
function randomHash() {
  return crypto.randomBytes(32).toString('hex');
}

// Starting block number
let nextBlockNumber = 1000;

// Initialize with 5 starting blocks
for (let i = 0; i < 5; i++) {
  blocks.unshift({
    block_number: nextBlockNumber++,
    block_hash: randomHash(),
    timestamp: new Date(),
    tx_count: Math.floor(Math.random() * 5) + 1,
  });
}

// Every 3 seconds, simulate a new block
setInterval(() => {
  const newBlock = {
    block_number: nextBlockNumber++,
    block_hash: randomHash(),
    timestamp: new Date(),
    tx_count: Math.floor(Math.random() * 5) + 1,
  };
  blocks.unshift(newBlock);
  blocks = blocks.slice(0, 20); // Keep only latest 20 blocks
  console.log(`🆕 New block #${newBlock.block_number}`);
}, 3000);

// Endpoint to fetch blocks
app.get('/blocks', (_, res) => {
  res.json(blocks);
});

app.listen(PORT, () => {
  console.log(`🚀 Mock blockchain server running at http://localhost:${PORT}`);
});
