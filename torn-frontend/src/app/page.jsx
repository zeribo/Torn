'use client';
import { useEffect, useState } from 'react';

import '../styles/main-page/main_page.css';
import '../styles/main-page/header.css';

export default function Page() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        async function fetchBlocks() {
            try {
                const res = await fetch('http://localhost:3000/block');
                const data = await res.json();
                setBlocks(data.slice(0, 20));
            } catch (error) {
                console.error('Error fetching blocks:', error);
            }
        }

        fetchBlocks();
        const interval = setInterval(fetchBlocks, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="p-6">
            <header className="header">
                <div className="header-left">
                    <img
                        src="https://preview.redd.it/8-ball-remix-looks-as-a-capybara-and-i-cant-unsee-it-v0-5qqik2l9xuxd1.jpeg?width=1170&format=pjpg&auto=webp&s=7aba3a59118461c43ad62eb32ce37947ffec7a8e"
                        alt="Tron Logo"
                        className="logo"
                    />
                    <h1 className="title">TRON Blocks</h1>
                </div>

                <div className="header-right">
                    <a href="/login" className="btn login-btn">Login</a>
                    <a href="/register" className="btn register-btn">Register</a>
                </div>
            </header>


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
                            <tr className="block-rows"
                                key={block.id}
                                onClick={() => window.location.href = `/block/${block.number}`}
                            >
                                <td className="p-2">{block.number}</td>
                                <td className="p-2">{block.id}</td>
                                <td className="p-2">{new Date(block.timestamp).toLocaleString()}</td>
                                <td className="p-2">{block.transactions.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
