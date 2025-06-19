'use client';
import { useEffect, useState } from 'react';

import '../styles/main_page.css';






export default function Page() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const res = await fetch("http://localhost:4000/blocks");
                const data = await res.json();
                setBlocks(data);
            } catch (err) {
                console.error("Error fetching mock blocks:", err);
            }
        };

        fetchBlocks();
        const interval = setInterval(fetchBlocks, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="p-6">

            <a href="/login" className="text-blue-500 underline">Login</a>
            <a href="/register" className="text-green-500 underline ml-4">Register</a>

            <h1 className="text-2xl font-bold mb-4">TRON Blocks</h1>
            <div className="table-container">
                <table className="w-full no-horizontal-lines">
                <thead>
                    <tr className="top-row">
                        <th className="border p-2">Block #</th>
                        <th className="border p-2">Hash</th>
                        <th className="border p-2">Timestamp</th>
                        <th className="border p-2">Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {blocks.map((block) => (
                        <tr className="block-rows" key={block.block_hash}>
                            <td className="p-2">{block.block_number}</td>
                            <td className="p-2">{block.block_hash}</td>
                            <td className="p-2">
                                {new Date(block.timestamp).toLocaleString()}
                            </td>
                            <td className="p-2">{block.tx_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </main>
    );
}
