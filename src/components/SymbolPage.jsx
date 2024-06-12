// SymbolPage.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const SymbolPage = () => {
    const { symbol } = useParams();
    const [interval, setInterval] = useState('1h');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const tableRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws');

        socket.onopen = () => {
            const message = JSON.stringify({ symbol, interval });
            socket.send(message);
        };

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, [symbol, interval]);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollTop = tableRef.current.scrollHeight;
        }
    }, [messages]);

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
        if (ws) {
            const message = JSON.stringify({ symbol, interval: event.target.value });
            ws.send(message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Symbol: {symbol}</h1>
            <div className="flex items-center mb-4">
                <label htmlFor="interval" className="mr-2">Interval:</label>
                <select id="interval" value={interval} onChange={handleIntervalChange} className="border rounded px-2 py-1">
                    <option value="1m">1m</option>
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
                    <option value="1h">1h</option>
                    <option value="1d">1d</option>
                </select>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '400px' }} ref={tableRef}>
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Open Time</th>
                            <th className="border px-4 py-2">Close Time</th>
                            <th className="border px-4 py-2">Open</th>
                            <th className="border px-4 py-2">Close</th>
                            <th className="border px-4 py-2">High</th>
                            <th className="border px-4 py-2">Low</th>
                            <th className="border px-4 py-2">Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{new Date(msg.k.t).toLocaleString()}</td>
                                <td className="border px-4 py-2">{new Date(msg.k.T).toLocaleString()}</td>
                                <td className="border px-4 py-2">{parseFloat(msg.k.o).toFixed(3)}</td>
                                <td className="border px-4 py-2">{parseFloat(msg.k.c).toFixed(3)}</td>
                                <td className="border px-4 py-2">{parseFloat(msg.k.h).toFixed(3)}</td>
                                <td className="border px-4 py-2">{parseFloat(msg.k.l).toFixed(3)}</td>
                                <td className="border px-4 py-2">{parseFloat(msg.k.v).toFixed(3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SymbolPage;
