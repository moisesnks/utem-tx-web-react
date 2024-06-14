import React, { useState } from 'react';
import CurrencyInput from './CurrencyInput.jsx';

const BuyPage = () => {
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [selectedCurrency1, setSelectedCurrency1] = useState('CLP');
    const [selectedCurrency2, setSelectedCurrency2] = useState('BTC');
    const [mode, setMode] = useState('buy'); // Estado para controlar el modo: 'buy' o 'sell'

    const handleAmountChange = (value) => {
        setAmount(value);
        setConvertedAmount(value * 2);
    };

    const handleCurrencyChange1 = (currency) => {
        setSelectedCurrency1(currency);
    };

    const handleCurrencyChange2 = (currency) => {
        setSelectedCurrency2(currency);
    };

    const handleConvertChange = (value) => {
        setConvertedAmount(value * 2);
    };

    const toggleMode = () => {
        setMode(mode === 'buy' ? 'sell' : 'buy');
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="absolute left-3 text-4xl font-bold mb-4">
            {mode === 'buy' ? 'Compra de Crypto' : 'Venta de Crypto'}
        </h1>
            <div className="absolute top-5 right-5 min-h-screen flex items-center justify-end">
                <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 relative">
                    <button
                        onClick={toggleMode}
                        className="absolute top-0 right-0 mt-2 mr-2 px-2 py-2 bg-gray-700 border border-gray-700 text-white rounded-lg focus:outline-none"
                    >
                        {mode === 'buy' ? 'Vender' : 'Comprar'}
                    </button>
                    <h2 className="text-xl font-bold text-white mb-4">{mode === 'buy' ? 'Compra' : 'Venta'}</h2>
                    <div className="flex flex-col gap-4">
                        {mode === 'buy' ? (
                            <>
                                <CurrencyInput
                                    label="Gastar"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    currencies={['CLP', 'USD']}
                                    selectedCurrency={selectedCurrency1}
                                    onCurrencyChange={handleCurrencyChange1}
                                    balance={{ BTC: 100, ETH: 200 }}
                                />
                                <CurrencyInput
                                    label="Recibir"
                                    value={convertedAmount}
                                    onChange={handleConvertChange}
                                    currencies={['BTC', 'ETH']}
                                    selectedCurrency={selectedCurrency2}
                                    onCurrencyChange={handleCurrencyChange2}
                                    balance={{ BTC: 100, ETH: 200 }}
                                    isEditable={false}
                                />
                            </>
                        ) : (
                            <>
                                <CurrencyInput
                                    label="Gastar"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    currencies={['BTC', 'ETH']}
                                    selectedCurrency={selectedCurrency2}
                                    onCurrencyChange={handleCurrencyChange2}
                                    balance={{ BTC: 100, ETH: 200 }}
                                />
                                <CurrencyInput
                                    label="Recibir"
                                    value={convertedAmount}
                                    onChange={handleConvertChange}
                                    currencies={['BTC', 'ETH','PEPE']}
                                    selectedCurrency={selectedCurrency1}
                                    onCurrencyChange={handleCurrencyChange1}
                                    balance={{ BTC: 100, ETH: 200 }}
                                    isEditable={false}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyPage;
