import React, { useState } from 'react';
import CurrencyInput from './CurrencyInput.jsx';

const BuyPage = () => {
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');

    const handleAmountChange = (value) => {
        setAmount(value);
        setConvertedAmount(value*2);

    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };
    const handleConvertChange = (value) => {
        setConvertedAmount(value*2);
    }

    return (
        <div>
            <h1>Buy Page</h1>
            <CurrencyInput
                label="Gastar"
                value={amount}
                onChange={handleAmountChange}
                currencies={['BTC', 'ETH']}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={handleCurrencyChange}
                balance={{ BTC: 100, ETH: 200 }} // Example balance data
            />
            <CurrencyInput 
                label="Recibir"
                value={convertedAmount}
                onChange={handleConvertChange}
                currencies={['BTC', 'ETH']}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={handleCurrencyChange}
                balance={{ BTC: 100, ETH: 200 }} // Example balance data
                isEditable={false}
            />
        </div>
    );
};

export default BuyPage;
