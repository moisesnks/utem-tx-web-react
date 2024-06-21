// Este archivo comienza con experimental.* porque es un archivo que no ha sido probado, está en espera que el Backend termine su contrato para 
// ver si funciona su implementación integrada con el Frontend.

import React, { useState, useEffect } from 'react';
import DropdownSearch from '../DropdownSearch';
import { Tooltip } from 'react-tooltip';

const CurrencyConverter = ({ mode }) => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [commissionFrom, setCommissionFrom] = useState(0);
    const [commissionTo, setCommissionTo] = useState(0);
    const [totalReceived, setTotalReceived] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    // Lista de criptos y divisas reemplazadas por un arreglo vacío
    const fromOptions = [];
    const toOptions = [];

    useEffect(() => {
        // Setear las monedas iniciales basadas en el modo
        setFromCurrency(mode === 'buy' ? 'USD' : '');
        setToCurrency(mode === 'buy' ? '' : 'USD');
    }, [mode]);

    const handleAmountChange = (e) => {
        const inputVal = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(inputVal)) {
            setAmount(inputVal);
        }
    };

    const handleCurrencyChange = (selectedCurrency, type) => {
        if (type === 'from') {
            setFromCurrency(selectedCurrency);
        } else if (type === 'to') {
            setToCurrency(selectedCurrency);
        }
    };

    const convertCurrency = async () => {
        if (!amount || !fromCurrency || !toCurrency) return;

        try {
            const response = await fetch(`/api/conversion?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`);
            if (!response.ok) {
                throw new Error('Error al convertir moneda');
            }
            const data = await response.json();
            setExchangeRate(data.exchangeRate);
            setConvertedAmount(data.convertedAmount);
            setCommissionFrom(data.commissionFrom);
            setCommissionTo(data.commissionTo);
            setTotalReceived(data.totalReceived);
        } catch (error) {
            console.error('Error al obtener la conversión:', error);
        }
    };

    const handleTooltipToggle = () => {
        setTooltipOpen(!tooltipOpen);
    };

    return (
        <div className="p-4 flex flex-col gap-4 text-xl">
            <div className={`mb-4 relative flex flex-row items-center gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl z-10 ${inputFocused ? 'outline outline-orange-500 ' : ''} hover:outline hover:outline-orange-500`}>
                <label className={`absolute top-0 left-0 -mt-2 ml-2 bg-zinc-200 dark:bg-gray-800 px-2 text-xs  ${inputFocused ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                    Gastar
                </label>
                <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border-none rounded-lg text-2xl font-bold focus:outline-none"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Ingresa un monto"
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
                <DropdownSearch
                    options={fromOptions}
                    selectedOption={fromCurrency}
                    onSelect={(option) => handleCurrencyChange(option, 'from')}
                />
            </div>
            <div className="mb-4 relative  flex flex-row items-center gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl">
                <label className="absolute top-0 left-0 -mt-2 ml-2 bg-zinc-200 dark:bg-gray-800 px-2 text-xs text-gray-700 dark:text-gray-300 ">
                    Recibir
                    <i className='fa fa-info-circle text-gray-400 dark:text-gray-500 ml-2 my-anchor-element' onClick={handleTooltipToggle}> </i>
                    {tooltipOpen && (
                        <Tooltip
                            anchorSelect=".my-anchor-element"
                            place="top"
                            clickable
                            style={{ zIndex: 999, backgroundColor: 'rgb(17 24 39)' }}
                        >
                            <div className='dark:text-gray-300 text-gray-700 text-lg'>
                                <div className="flex flex-grow justify-between">
                                    <span className="font-bold">Precio:</span>
                                    <span className="ml-2">1 {fromCurrency} ≈ {exchangeRate} {toCurrency}</span>
                                </div>
                                <div className="flex flex-grow justify-between gap-8">
                                    <span className="font-bold">Gastar:</span>
                                    <span className="ml-2">{amount} {fromCurrency} ≈ {convertedAmount} {toCurrency}</span>
                                </div>
                                <div className="flex flex-grow justify-between gap-8">
                                    <span className="font-bold">Comisión:</span>
                                    <span className="ml-2">{commissionFrom} {fromCurrency} ≈ {commissionTo} {toCurrency}</span>
                                </div>
                                <div className="flex flex-grow justify-between gap-8">
                                    <span className="font-bold">Recibir:</span>
                                    <span className="ml-2">{totalReceived} {toCurrency}</span>
                                </div>
                            </div>
                        </Tooltip>
                    )}
                </label>
                <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border-none rounded-lg text-2xl font-bold"
                    value={convertedAmount}
                    readOnly
                    placeholder="0.0"
                />

                <DropdownSearch
                    options={toOptions}
                    selectedOption={toCurrency}
                    onSelect={(option) => handleCurrencyChange(option, 'to')}
                />
            </div>
        </div>
    );
};

export default CurrencyConverter;
