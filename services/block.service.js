const {TronWeb} = require("tronweb");
const prisma = require("../db");

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  headers: { "TRON-PRO-API-KEY": process.env.TRON_API_KEY },
});

async function getBlockFromTron(number) {
  const block = await tronWeb.trx.getBlockByNumber(number);
  return block;
}

async function getAllBlocks() {
  const blocks = await prisma.block.findMany({
    orderBy: { number: "desc" },
    include: {
      transactions: true,
    },
  });
  return blocks;
}

async function saveBlockToDb(block) {
  const { blockID, block_header, transactions } = block;
  const raw = block_header.raw_data;

  return prisma.block.create({
    data: {
      id: blockID,
      number: raw.number,
      txTrieRoot: raw.txTrieRoot,
      witnessAddress: raw.witness_address,
      parentHash: raw.parentHash,
      timestamp: new Date(raw.timestamp),
      witnessSignature: block_header.witness_signature,
      transactions: {
        create: transactions.map((tx) => ({
          id: tx.txID,
          timestamp: tx.raw_data?.timestamp
            ? new Date(tx.raw_data.timestamp)
            : null,
          expiration: tx.raw_data?.expiration
            ? new Date(tx.raw_data.expiration)
            : null,
          contractType: tx.raw_data?.contract?.[0]?.type || null,
          rawData: tx.raw_data,
          signature: tx.signature || [],
        })),
      },
    },
  })
}

module.exports = {
  getAllBlocks,
  getBlockFromTron,
  saveBlockToDb,
};
