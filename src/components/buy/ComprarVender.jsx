import React, { useState } from 'react';
import CurrencyConverter from './CurrencyConverter';

const ComprarVender = () => {
    const [mode, setMode] = useState('buy');

    const handleModeChange = (mode) => {
        setMode(mode);
    };

    return (
        <div className="border-gray-300 dark:border-gray-700 border flex flex-col gap-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg">
            <div className="flex flex-row mb-4 text-center">
                <div
                    onClick={() => handleModeChange('buy')}
                    className={`flex items-center justify-center flex-grow h-14 hover:cursor-pointer rounded-l-2xl flex-1 text-2xl ${mode === 'buy' ? 'dark:bg-gray-800 bg-primary' : ' dark:bg-gray-600'
                        }`}
                >
                    Comprar
                </div>
                <div
                    onClick={() => handleModeChange('sell')}
                    className={`flex items-center justify-center flex-grow h-14 hover:cursor-pointer rounded-r-2xl flex-1 text-2xl ${mode === 'sell' ? 'dark:bg-gray-800 bg-primary' : ' dark:bg-gray-600'
                        }`}
                >
                    Vender
                </div>
            </div>
            <div className="p-4">
                <CurrencyConverter mode={mode} />
            </div>
        </div>
    );
};

export default ComprarVender;
