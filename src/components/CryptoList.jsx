import React, { useState, useEffect } from 'react';
import Loading from './Loading.jsx';

const CryptoList = () => {
    const [cryptos, setCryptos] = useState({ popular: [], new: [] });
    const [activeTab, setActiveTab] = useState('popular');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket('ws://localhost:8080/ws');

            const timeout = setTimeout(() => {
                if (loading) {
                    setError("No se ha podido conectar con el servidor");
                    ws.close();
                }
            }, 15000); // 15 segundos

            ws.onopen = () => {
                clearTimeout(timeout);
                setLoading(false);
                setError(null); // Clear any previous error
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setCryptos({
                    popular: Object.values(data.popular),
                    new: Object.values(data.new),
                });
                setLoading(false);
            };

            ws.onclose = () => {
                if (!loading) {
                    setError("No se ha podido conectar con el servidor");
                }
                // Reconnect after 3 seconds
                setTimeout(() => setRetry(prev => prev + 1), 3000);
            };

            ws.onerror = (error) => {
                setError("No se ha podido conectar con el servidor");
                setLoading(false);
                // Reconnect after 3 seconds
                setTimeout(() => setRetry(prev => prev + 1), 3000);
            };

            return () => {
                clearTimeout(timeout);
                ws.close();
            };
        };

        connectWebSocket();
    }, [retry]);


    const currentCryptos = activeTab === 'popular' ? cryptos.popular : cryptos.new;

    const Render = () => {
        return (
            <>
                <div className="flex justify-between mb-5">
                    <span
                        className={`cursor-pointer p-2 ${activeTab === 'popular' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('popular')}
                    >
                        Popular
                    </span>
                    <span
                        className={`cursor-pointer p-2 ${activeTab === 'new' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('new')}
                    >
                        Nueva inclusión
                    </span>
                </div>
                <ul>
                    {currentCryptos.map((crypto) => (
                        <li
                            onClick={() => { window.location.href = `/market/${crypto.symbol}`; }}
                            key={crypto.symbol}
                            className="flex justify-between items-center py-2 border-b border-gray-800 hover:bg-gray-800 px-2 cursor-pointer"
                        >
                            <div className="flex items-center">
                                <img src={crypto.icon} alt={crypto.name} className="w-6 h-6 mr-2 rounded-full" />
                                <span className="font-bold mr-2">{crypto.symbol.toUpperCase()}</span>
                            </div>
                            <div className="font-bold">${parseFloat(crypto.price).toFixed(2)}</div>
                            <div className={`font-bold ${crypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {crypto.change > 0 ? '+' : ''}{parseFloat(crypto.change).toFixed(2)}%
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="text-center mt-5">
                    <a href={activeTab === 'popular' ? '/market/popular' : '/market/new'} className="text-yellow-500">Ver más monedas</a>
                </div>
            </>
        )
    };

    const ErrorContent = () => {
        return (
            <div className="text-center w-full h-full flex flex-col items-center justify-start mt-16 gap-2">
                Ups! Algo salió mal.
                Aparentemente no se ha podido conectar con el servidor.
                <button
                    onClick={() => window.location.reload()}
                    className="font-semibold text-yellow-500">Reintentar</button>
            </div>
        )

    };

    return (
        <div className="w-96 max-h-96  bg-light dark:bg-secondary m-8 p-5 rounded-3xl shadow-lg drop-shadow-lg">
            {loading ? <Loading /> : error ? <ErrorContent /> : <Render />}
        </div>
    );
};

export default CryptoList;