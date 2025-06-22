'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../../../styles/block_page/block_page.css'; // ← link your CSS

export default function BlockDetailsPage() {
  const { id } = useParams();
  const [block, setBlock] = useState(null);

  useEffect(() => {
    async function fetchBlock() {
      try {
        const res = await fetch(`http://localhost:3000/block/${id}`);
        const data = await res.json();
        console.log('Fetched block:', data);
        setBlock(data);
      } catch (error) {
        console.error('Error fetching block:', error);
      }
    }

    fetchBlock();
  }, [id]);

  if (!block) return <p className="block-details-container">Loading block details...</p>;

  const number = block.block_header.raw_data.number;
  const timestamp = new Date(block.block_header.raw_data.timestamp).toLocaleString();
  const blockHash = block.blockID;
  const txs = block.transactions ?? [];

  return (
    <main className="block-details-container">
      <h1 className="block-title">Block #{number}</h1>
      <p className="block-info"><strong>Hash:</strong> {blockHash}</p>
      <p className="block-info"><strong>Timestamp:</strong> {timestamp}</p>
      <p className="block-info"><strong>Transactions:</strong> {txs.length}</p>

      <h2 className="transactions-header">Transactions:</h2>
      {txs.length > 0 ? (
        <ul className="transaction-list">
          {txs.map((tx) => (
            <li className="transaction-item" key={tx.txID}>
              <strong>{tx.contractType ?? 'Unknown'}</strong> – {tx.txID ?? 'No ID'}
            </li>
          ))}
        </ul>
      ) : (
        <p className="block-info" style={{ color: '#777' }}>No transactions found for this block.</p>
      )}

      <button className="back-button" onClick={() => window.location.href = '/'}>
        Back
      </button>
    </main>
  );
}
