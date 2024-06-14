// Markets Component
import React, { useState } from "react";
import { stringToPrice } from "../utils/helpers.js";
import PorcentajeSpan from "./PorcentajeSpan.jsx";

const Markets = () => {
    const [selectedMarketTab, setSelectedMarketTab] = useState('Mercados');
    const [selectedCoinTab, setSelectedCoinTab] = useState('Holding');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const marketData = {
        Mercados: {
            Holding: [
                { symbol: 'BNB', name: 'BNB', price: '598.7', change: -8.5, photoURL: 'url_aqui' },
                { symbol: 'BTC', name: 'Bitcoin', price: '66763', change: 0.48, photoURL: 'url_aqui' },
            ],
            Popular: [
                { symbol: 'ETH', name: 'Ethereum', price: '3467.6', change: -2.3, photoURL: 'url_aqui' },
                { symbol: 'PEPE', name: 'Pepe', price: '0.00000120', change: 12.5, photoURL: 'url_aqui' }
            ],
            "Nuevas": [
                { symbol: 'SHIB', name: 'Shiba Inu', price: '0.000007', change: 5.6, photoURL: 'url_aqui' },
                { symbol: 'AVAX', name: 'Avalanche', price: '23.45', change: -1.1, photoURL: 'url_aqui' }
            ],
            Favoritas: [
                { symbol: 'MATIC', name: 'Polygon', price: '1.45', change: 2.5, photoURL: 'url_aqui' },
                { symbol: 'DOT', name: 'Polkadot', price: '24.75', change: -0.8, photoURL: 'url_aqui' }
            ],
            "Top Ganancias": [
                { symbol: 'AXS', name: 'Axie Infinity', price: '65.45', change: 15.3, photoURL: 'url_aqui' },
                { symbol: 'SUSHI', name: 'SushiSwap', price: '9.34', change: 10.2, photoURL: 'url_aqui' }
            ],
            "Volumen en 24h": [
                { symbol: 'UNI', name: 'Uniswap', price: '21.34', change: 6.7, photoURL: 'url_aqui' },
                { symbol: 'LUNA', name: 'Terra', price: '45.89', change: -3.4, photoURL: 'url_aqui' }
            ]
        },
        Descubrir: {
            Holding: [
                { symbol: 'DOGE', name: 'Dogecoin', price: '0.056', change: -0.5, photoURL: 'url_aqui' },
                { symbol: 'ADA', name: 'Cardano', price: '1.23', change: 1.2, photoURL: 'url_aqui' }
            ],
            Popular: [
                { symbol: 'SOL', name: 'Solana', price: '98.45', change: 3.6, photoURL: 'url_aqui' },
                { symbol: 'XRP', name: 'Ripple', price: '1.45', change: -2.4, photoURL: 'url_aqui' }
            ],
            "Nuevas": [
                { symbol: 'ALGO', name: 'Algorand', price: '0.89', change: 4.1, photoURL: 'url_aqui' },
                { symbol: 'ATOM', name: 'Cosmos', price: '13.56', change: -1.9, photoURL: 'url_aqui' }
            ],
            Favorite: [
                { symbol: 'LINK', name: 'Chainlink', price: '25.34', change: 2.3, photoURL: 'url_aqui' },
                { symbol: 'BCH', name: 'Bitcoin Cash', price: '320.45', change: -0.6, photoURL: 'url_aqui' }
            ],
            "Top Ganancias": [
                { symbol: 'FTT', name: 'FTX Token', price: '30.67', change: 12.1, photoURL: 'url_aqui' },
                { symbol: 'CRV', name: 'Curve DAO', price: '2.34', change: 8.9, photoURL: 'url_aqui' }
            ],
            "Volumen en 24h": [
                { symbol: 'AAVE', name: 'Aave', price: '350.34', change: 5.3, photoURL: 'url_aqui' },
                { symbol: 'KSM', name: 'Kusama', price: '415.78', change: -2.7, photoURL: 'url_aqui' }
            ]
        }
    };


    const handleMarketTabClick = (tab) => {
        setSelectedMarketTab(tab);
        setSelectedCoinTab('Holding');
        setSortConfig({ key: null, direction: 'asc' });
    };

    const handleCoinTabClick = (tab) => {
        setSelectedCoinTab(tab);
        setSortConfig({ key: null, direction: 'asc' });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedCoins = React.useMemo(() => {
        let sortableCoins = [...marketData[selectedMarketTab][selectedCoinTab]];
        if (sortConfig.key) {
            sortableCoins.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCoins;
    }, [marketData, selectedMarketTab, selectedCoinTab, sortConfig]);

    return (
        <div className="relative z-0">
            <div className="flex flex-col gap-4 p-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg z-auto">
                <div className="flex flex-row gap-4">
                    <h1 className={`cursor-pointer ${selectedMarketTab === 'Mercados' ? 'dark:text-primary text-orange-500 translate-y-[-.2em]' : ''}`} onClick={() => handleMarketTabClick('Mercados')}>Mercados</h1>
                    <h1 className={`cursor-pointer ${selectedMarketTab === 'Descubrir' ? 'dark:text-primary text-orange-500  translate-y-[-.2em]' : ''}`} onClick={() => handleMarketTabClick('Descubrir')}>Descubrir</h1>
                </div>
                <div className="flex flex-row gap-4">
                    {Object.keys(marketData[selectedMarketTab]).map(tab => (
                        <h2 key={tab} className={`cursor-pointer ${selectedCoinTab === tab ? 'dark:text-primary text-orange-500 border-b dark:border-primary border-orange-500 translate-y-[-.2em]' : ''}`} onClick={() => handleCoinTabClick(tab)}>{tab}</h2>
                    ))}
                </div>
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md drop-shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <span className="cursor-pointer" onClick={() => handleSort('symbol')}>
                                        Coin <i className={`fas fa-sort${sortConfig.key === 'symbol' ? (sortConfig.direction === 'asc' ? '-up text-orange-500 dark:text-primary' : '-down text-orange-500 dark:text-primary') : ''}`}></i>
                                    </span>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <span className="cursor-pointer" onClick={() => handleSort('price')}>
                                        Coin Price <i className={`fas fa-sort${sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '-up text-orange-500 dark:text-primary' : '-down text-orange-500 dark:text-primary') : ''}`}></i>
                                    </span>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <span className="cursor-pointer" onClick={() => handleSort('change')}>
                                        24H Change <i className={`fas fa-sort${sortConfig.key === 'change' ? (sortConfig.direction === 'asc' ? '-up text-orange-500 dark:text-primary' : '-down text-orange-500 dark:text-primary') : ''}`}></i>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {sortedCoins.map((coin) => (
                                <tr key={coin.symbol}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full drop-shadow-md shadow-md"
                                                    src={coin.photoURL}
                                                    onError={(e) => {
                                                        e.target.src = '/utemtrades.svg';
                                                    }}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{coin.symbol}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{coin.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{stringToPrice(coin.price, false)}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{stringToPrice(coin.price, true)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <PorcentajeSpan porcentaje={coin.change} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Markets;
