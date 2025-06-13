const blockService = require("../services/block.service");

async function fetchBlock(req, res) {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number))
    return res.status(400).json({ error: "Invalid block number" });

  try {
    const block = await blockService.getBlockFromTron(number);
    res.json(block);
  } catch (err) {
    console.error("Ошибка получения блока:", err);
    res.status(500).json({ error: "Failed to fetch block" });
  }
}

async function fetchAndSaveBlock(req, res) {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number))
    return res.status(400).json({ error: "Invalid block number" });

  try {
    const block = await blockService.getBlockFromTron(number);
    const saved = await blockService.saveBlockToDb(block);
    res.json({ success: true, saved });
  } catch (err) {
    console.error("Ошибка сохранения блока:", err);
    res.status(500).json({ error: "Failed to fetch/save block" });
  }
}

async function fetchAllBlocks(req, res) {
  try {
    const blocks = await blockService.getAllBlocks();
    res.json(blocks);
  } catch (err) {
    console.error("Ошибка получения всех блоков:", err);
    res.status(500).json({ error: "Failed to fetch all blocks" });
  }
}

module.exports = {
  fetchBlock,
  fetchAndSaveBlock,
  fetchAllBlocks,
};
