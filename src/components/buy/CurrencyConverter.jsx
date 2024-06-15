import React, { useState, useEffect } from 'react';
import DropdownSearch from '../DropdownSearch';
import criptosMockup from '../../mockups/criptos';

const CurrencyConverter = ({ mode }) => {
    const { criptos, divisas } = criptosMockup;

    // Filtramos las opciones de "De" y "A" según el modo
    const fromOptions = mode === 'buy' ? divisas : criptos;
    const toOptions = mode === 'buy' ? criptos : divisas;

    const [fromCurrency, setFromCurrency] = useState(fromOptions[0].symbol);
    const [toCurrency, setToCurrency] = useState(toOptions[0].symbol);
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');

    // Reiniciar monedas cuando cambia el modo
    useEffect(() => {
        setFromCurrency(fromOptions[0].symbol);
        setToCurrency(toOptions[0].symbol);
    }, [mode]);

    useEffect(() => {
        if (amount && fromCurrency && toCurrency) {
            convertCurrency();
        }
    }, [amount, fromCurrency, toCurrency]);

    const convertCurrency = () => {
        if (!amount) return;

        const fromRate = fromOptions.find(option => option.symbol === fromCurrency).exchangeRate;
        const toRate = toOptions.find(option => option.symbol === toCurrency).exchangeRate;
        const result = (amount * fromRate) / toRate;
        setConvertedAmount(result);
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">{mode === 'buy' ? 'Comprar Moneda' : 'Vender Moneda'}</h2>
            <div className="mb-4 relative z-20 flex flex-row items-center gap-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">De:</label>

                <input
                    type="number"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Cantidad"
                />
                <DropdownSearch
                    options={fromOptions}
                    selectedOption={fromCurrency}
                    onSelect={(option) => setFromCurrency(option)}
                />
            </div>
            <div className="mb-4 relative z-10 flex flex-row items-center gap-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">A:</label>

                <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                    value={convertedAmount}
                    readOnly
                    placeholder="Cantidad convertida"
                />
                <DropdownSearch
                    options={toOptions}
                    selectedOption={toCurrency}
                    onSelect={(option) => setToCurrency(option)}
                />
            </div>
        </div>
    );
};

export default CurrencyConverter;
