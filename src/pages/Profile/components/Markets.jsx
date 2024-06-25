// Markets Component
import React, { useState } from "react";
import { stringToPrice } from "../../../utils/helpers.js";
import PorcentajeSpan from "../../../components/PorcentajeSpan.jsx";
import marketMockup from "../../../mockups/markets.js";

const Markets = () => {
    const [selectedMarketTab, setSelectedMarketTab] = useState('Mercados');
    const [selectedCoinTab, setSelectedCoinTab] = useState('Holding');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [marketData] = useState(marketMockup);




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
