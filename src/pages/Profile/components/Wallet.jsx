import React, { useState } from 'react';
import Select from '@components/Select.jsx';
import AreaChart from './AreaChart.jsx';
import { stringToPrice } from '@utils/helpers.js';

const Wallet = ({ wallet }) => {
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');
    const [showBalance, setShowBalance] = useState(true);

    // Manejar el cambio de moneda seleccionada
    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };

    // Manejar el cambio para mostrar/ocultar el balance
    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    };

    // Opciones estáticas para el componente Select
    const staticOptions = ['BTC', 'ETH', 'USDT'];

    return (
        <div className="flex flex-row justify-between gap-4 p-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg relative z-10">
            <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-500 dark:text-gray-200">
                    Balance Estimado{' '}
                    <button
                        onClick={toggleShowBalance}
                        className="text-sm text-gray-500 dark:text-gray-400 focus:outline-none"
                    >
                        {showBalance ? (
                            <i className="fas fa-eye-slash text-amber-800 dark:text-amber-600"></i>
                        ) : (
                            <i className="fas fa-eye"></i>
                        )}
                    </button>
                </span>
                <div className="flex mt-4 text-gray-700 dark:text-white items-center gap-4">
                    <div className='w-56'>
                        <span className='pl-2 flex flex-grow text-2xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap'>
                            {showBalance ? (
                                `${stringToPrice(wallet[selectedCurrency], true) || 0}`
                            ) : (
                                '*********'
                            )}
                            <span className='text-xs font-normal pl-1'>{selectedCurrency}</span>
                        </span>
                    </div>
                    <div className="relative">
                        <Select
                            options={staticOptions}
                            selectedOption={selectedCurrency}
                            onSelect={handleCurrencyChange}
                            disabled={!showBalance}
                        />
                    </div>
                </div>
            </div>
            <div className="h-32 w-96 relative shadow rounded-2xl dark:bg-gray-700 bg-stone-200 flex flex-col">
                <div className="mt-2 flex justify-between px-8 gap-2  text-gray-200 ">
                    <a href="#" className="text-sm bg-orange-600 text-white font-semibold drop-md shadow-md p-1 rounded-md top-0 right-0 px-2 py-1 hover:bg-orange-700">
                        Depositar
                    </a>
                    <a href="#" className="text-sm bg-orange-600 text-white font-semibold drop-md shadow-md p-1 rounded-md top-0 right-12 px-2 py-1 hover:bg-orange-700">
                        Retirar
                    </a>
                    <a href="#" className="text-sm bg-orange-600 text-white font-semibold drop-md shadow-md p-1 rounded-md top-0 right-24 px-2 py-1 hover:bg-orange-700">
                        Ingresar
                    </a>
                </div>
                <div className="absolute h-1/2 w-full bottom-0 right-0 rounded-2xl  drop-shadow-lg">
                    <AreaChart data={wallet.history} />
                </div>
            </div>
        </div>
    );
};

export default Wallet;
