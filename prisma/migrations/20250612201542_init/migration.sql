-- CreateTable
CREATE TABLE "Block" (
    "blockID" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "txTrieRoot" TEXT NOT NULL,
    "witnessAddress" TEXT NOT NULL,
    "parentHash" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "witnessSignature" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("blockID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "txID" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3),
    "expiration" TIMESTAMP(3),
    "contractType" TEXT,
    "rawData" JSONB,
    "signature" JSONB,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("txID")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("blockID") ON DELETE RESTRICT ON UPDATE CASCADE;
