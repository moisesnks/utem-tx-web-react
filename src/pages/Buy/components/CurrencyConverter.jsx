import React, { useState, useEffect } from 'react';
import DropdownSearch from '@components/DropdownSearch';
import criptosMockup from '@mockups/criptos';
import { Tooltip } from 'react-tooltip';
import { stringToPrice } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';

const CurrencyConverter = ({ mode, isLogged = false }) => {
    const navigate = useNavigate();
    const { criptos, divisas } = criptosMockup;

    // Filtramos las opciones de "De" y "A" según el modo
    const fromOptions = mode === 'buy' ? divisas : criptos;
    const toOptions = mode === 'buy' ? criptos : divisas;

    const [fromCurrency, setFromCurrency] = useState(fromOptions[0].symbol);
    const [toCurrency, setToCurrency] = useState(toOptions[0].symbol);
    const [tasa, setTasa] = useState('0'); // Tasa de cambio entre las monedas seleccionadas
    const [amount, setAmount] = useState('');
    const [neto, setNeto] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [comision, setComision] = useState({
        origen: '0',
        destino: '0'
    });

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
        setTasa((fromRate / toRate).toFixed(8).slice(0, 16));
        setComision({
            origen: comision_origen.toFixed(8).slice(0, 16),
            destino: comision_destino.toFixed(8).slice(0, 16)
        });
        const real = (result)
        const convertedAmount = (real - comision_destino).toFixed(16).slice(0, 16);
        setConvertedAmount(convertedAmount);
        setNeto(real.toFixed(16).slice(0, 16));
    };

    // Contenido dinámico para el tooltip
    const tooltipContent = () => {
        if (convertedAmount === '' || amount === '' || tasa === '' || comision.origen === '' || comision.destino === '')
            return;

        return (
            <div className='dark:text-gray-300 text-gray-700 text-lg'>
                <div className="flex flex-grow justify-between">
                    <span className="font-bold">Precio:</span>
                    <span className="ml-2">1 {fromCurrency} ≈ {(tasa)} {toCurrency}</span>
                </div>
                <div className="flex flex-grow justify-between gap-8">
                    <span className="font-bold">Gastar:</span>
                    <span className="ml-2">{stringToPrice(amount, true)} {fromCurrency} ≈ {stringToPrice(neto, true)} {toCurrency}</span>
                </div>
                <div className="flex flex-grow justify-between gap-8">
                    <span className="font-bold">Comisión:</span>
                    <span className="ml-2">{stringToPrice(comision.origen, true)} {fromCurrency} ≈ {stringToPrice(comision.destino, true)} {toCurrency}</span>
                </div>
                <div className="flex flex-grow justify-between gap-8">
                    <span className="font-bold">Recibir:</span>
                    <span className="ml-2">{stringToPrice(convertedAmount, true)} {toCurrency}</span>
                </div>
            </div>
        )
    }

    // Función para manejar el cambio en el input de monto
    const handleAmountChange = (e) => {
        const inputVal = e.target.value;
        // Validar que solo contenga dígitos y un punto como separador decimal y hasta 8 decimales
        if (/^\d*\.?\d{0,8}$/.test(inputVal)) {
            setAmount(inputVal);
        }
    };

    const handleClick = () => {
        if (isLogged) {
            alert(`¡${mode === 'buy' ? 'Compra' : 'Venta'} exitosa!`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="p-4 flex flex-col gap-4 text-xl">
            <div className={`mb-4 relative flex flex-row items-center gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl z-10 ${inputFocused ? 'outline outline-primary-light dark:outline-primary ' : ''} dark:hover:outline-primary hover:outline hover:outline-primary-light`}>
                <label className={`absolute top-0 left-0 -mt-2 ml-2 bg-zinc-200 dark:bg-gray-800 px-2 text-xs  ${inputFocused ? 'text-primary-light dark:text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
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
                    value={amount.length === 0 ? '' : convertedAmount[0] === '-' ? '0.0' : stringToPrice(convertedAmount, true)}
                    readOnly
                    placeholder="0.0"
                />

                <DropdownSearch
                    options={toOptions}
                    selectedOption={toCurrency}
                    onSelect={(option) => setToCurrency(option)}
                />
            </div>
            <button
                className="bg-orange-500 dark:bg-primary dark:text-secondary rounded-xl px-4 py-2 font-semibold hover:bg-orange-600 dark:hover:bg-primary-dark"
                onClick={handleClick}
            >
                {
                    isLogged ?
                        mode === 'buy' ? 'Comprar' : 'Vender'
                        : 'Iniciar sesión/Registrarse '
                }
            </button>
        </div>
    );
};

export default CurrencyConverter;
