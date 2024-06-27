import React, { useEffect } from 'react';
import { getChangeColor } from '@utils/helpers';

const MarketSummary = ({ cryptoData, handleListClick }) => {
    useEffect(() => {
        console.log('Crypto data updated:', cryptoData);
    }, [cryptoData]);

    const handleItemClick = (name) => {
        handleListClick(name);
    };

    const renderTable = (category, title) => {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-lg text-base flex flex-col gap-4 w-full px-4 py-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="flex flex-col gap-2">
                    {cryptoData[category].slice(0, 3).map((item, index) => (
                        <div
                            key={index}
                            className="font-bold flex bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg shadow-lg border-b border-gray-300 dark:border-gray-700 flex-row items-center justify-between"
                            onClick={() => handleItemClick(item.name)} // Agrega función onClick
                        >
                            <div className="w-4/12 p-2 flex items-center gap-4 mr-8">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-8 w-8 rounded-full shadow-lg"
                                    onError={(e) => {
                                        e.target.src = '/utemtrades.svg';
                                    }}
                                />
                                {item.name}
                            </div>
                            <span className="text-sm">{item.price}</span>
                            <div className={`w-4/12 p-2 text-center ${getChangeColor(item.change_24h)}`}>
                                {item.change_24h}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className=" text-base flex flex-col gap-4 px-4 py-2">
            {renderTable('Populares', 'Populares')}
            {renderTable('Ganadores', 'Ganadores')}
            {renderTable('Perdedores', 'Perdedores')}
        </div>
    );
};

export default MarketSummary;
