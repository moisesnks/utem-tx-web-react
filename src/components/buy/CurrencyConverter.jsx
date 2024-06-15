import React, { useState, useEffect } from 'react';
import DropdownSearch from '../DropdownSearch';
import criptosMockup from '../../mockups/criptos';
import { Tooltip } from 'react-tooltip';
import { stringToPrice } from '../../utils/helpers';

const CurrencyConverter = ({ mode }) => {
    const { criptos, divisas } = criptosMockup;

    // Filtramos las opciones de "De" y "A" según el modo
    const fromOptions = mode === 'buy' ? divisas : criptos;
    const toOptions = mode === 'buy' ? criptos : divisas;

    const [fromCurrency, setFromCurrency] = useState(fromOptions[0].symbol);
    const [toCurrency, setToCurrency] = useState(toOptions[0].symbol);
    const [tasa, setTasa] = useState(0); // Tasa de cambio entre las monedas seleccionadas
    const [amount, setAmount] = useState('');
    const [neto, setNeto] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [comision, setComision] = useState(0);

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
        const taxes = 1;
        const comision_origen = (taxes / fromRate);
        const comision_destino = (taxes / toRate)
        console.log(comision_origen, comision_destino)
        const result = (amount * fromRate) / toRate;
        // Tasa es el valor de 1 unidad de la moneda de origen en la moneda de destino
        setTasa(fromRate / toRate);
        setComision(comision_origen);
        const real = (result)
        const convertedAmount = (real - comision_destino).toFixed(8).slice(0, 8);
        setConvertedAmount(convertedAmount);
        setNeto(real.toFixed(8).slice(0, 8));
    };

    // Contenido dinámico para el tooltip
    const tooltipContent = () => {
        /* 
        Contenido del tooltip:
        - Precio: 1 CLP ≈ 0.000001 BTC
        - Gastar: $1000 CLP ≈ 0.001 BTC
        - Comisión: $5000 CLP ≈ 0.000005 BTC // Comisión: 5 dolares, usar la razón de CLP a dolares para calcular la comisión en CLP y mostrarla:
        - Recibir: 0.001 BTC
        */
        if (convertedAmount === '') return;

        return (
            <div className='dark:text-gray-300 text-gray-700 text-lg'>
                <div className="flex flex-grow justify-between">
                    <span className="font-bold">Precio:</span>
                    <span className="ml-2">1 {fromCurrency} ≈ {tasa} {toCurrency}</span>
                </div>
                <div className="flex flex-grow justify-between gap-8">
                    <span className="font-bold">Gastar:</span>
                    <span className="ml-2">{amount} {fromCurrency} ≈ {neto} {toCurrency}</span>
                </div>
                <div className="flex flex-grow justify-between gap-8">
                    <span className="font-bold">Comisión:</span>
                    <span className="ml-2">{comision} {fromCurrency} ≈ {comision} {toCurrency}</span>
                </div>
                <div className="flex flex-grow justify-between gap-8">
                    <span className="font-bold">Recibir:</span>
                    <span className="ml-2">{convertedAmount} {toCurrency}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 flex flex-col gap-4 text-xl">
            <div className={`mb-4 relative flex flex-row items-center gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl z-10 ${inputFocused ? 'outline outline-orange-500 ' : ''} hover:outline hover:outline-orange-500`}>
                <label className={`absolute top-0 left-0 -mt-2 ml-2 bg-zinc-200 dark:bg-gray-800 px-2 text-xs  ${inputFocused ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                    Gastar
                </label>
                <input
                    type="number"
                    className="mt-2 w-full px-4 py-2 border-none rounded-lg text-2xl font-bold focus:outline-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ingresa un monto"
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
                <DropdownSearch
                    options={fromOptions}
                    selectedOption={fromCurrency}
                    onSelect={(option) => setFromCurrency(option)}
                />
            </div>
            <div className="mb-4 relative  flex flex-row items-center gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl">
                <label className="absolute top-0 left-0 -mt-2 ml-2 bg-zinc-200 dark:bg-gray-800 px-2 text-xs text-gray-700 dark:text-gray-300 ">
                    Recibir
                    <i className='fa fa-info-circle text-gray-400 dark:text-gray-500 ml-2 my-anchor-element '> </i>
                    <Tooltip
                        anchorSelect=".my-anchor-element"
                        place="top" clickable
                        style={{ zIndex: 999, backgroundColor: 'rgb(17 24 39)' }}
                    >
                        {tooltipContent()}
                    </Tooltip>
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
                    onSelect={(option) => setToCurrency(option)}
                />
            </div>
        </div>
    );
};

export default CurrencyConverter;
