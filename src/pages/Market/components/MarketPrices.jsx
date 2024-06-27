import React, { useEffect } from 'react';
import { getChangeColor } from '@utils/helpers';

const MarketPrices = ({ cryptoData, currentCategory, handleClick, handleListClick }) => {
    useEffect(() => {
        // Aquí puedes realizar acciones cuando cryptoData o currentCategory cambien
        // Por ejemplo, puedes hacer algo específico cuando cryptoData se actualice
        console.log('Crypto data updated:', cryptoData);
    }, [cryptoData, currentCategory]);

    return (
        <div className=" text-base flex flex-col gap-4 px-4 py-2">
            <h1 className="text-2xl font-bold">Precios del mercado Cripto</h1>
            <div className="flex text-base gap-4">
                {Object.keys(cryptoData).map((category) => (
                    <div
                        key={category}
                        className={`rounded-lg px-4 py-2 w-1/3 cursor-pointer rounded-2xl shadow-lg dark:text-gray-200 drop-shadow hover:bg-zinc-300 dark:hover:bg-gray-700 ${currentCategory === category ? 'bg-zinc-300 dark:bg-gray-700' : 'bg-zinc-200 dark:bg-gray-800'
                            }`}
                        onClick={() => handleClick(category)}
                        data-category={category}
                    >
                        {category}
                    </div>
                ))}
            </div>
            {cryptoData[currentCategory] && cryptoData[currentCategory].length > 0 ? (
                <div className="rounded-lg overflow-hidden h-[34rem] bg-white dark:bg-gray-800">
                    <div className="flex bg-gray-100 dark:bg-gray-700">
                        <div className="w-1/12 p-2 text-center font-semibold">Nº</div>
                        <div className="w-4/12 p-2 text-center font-semibold">Nombre</div>
                        <div className="w-3/12 p-2 text-center font-semibold">Precio</div>
                        <div className="w-4/12 p-2 text-center font-semibold">24h Change</div>
                    </div>
                    <div className="h-full overflow-y-auto">
                        {cryptoData[currentCategory].map((item, index) => (
                            <div
                                key={index}
                                className={`font-bold flex bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-700 cursor-pointer`}
                                onClick={() => handleListClick(item.name)}
                            >
                                <div className="w-1/12 p-2 text-center">{index + 1}</div>
                                <div className="w-4/12 p-2 flex items-center gap-4">
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
                                <div className="w-3/12 p-2 text-center ">{item.price}</div>
                                <div className={`w-4/12 p-2 text-center ${getChangeColor(item.change_24h)}`}>
                                    {item.change_24h}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-lg text-base flex flex-col gap-4 w-full px-4 py-2">
                    <h1 className="text-xl font-bold">Precios del mercado Cripto</h1>
                    <div className="flex items-center justify-center h-24">
                        <p className="text-center text-red-500">
                            No se ha podido comunicar con el servidor. Si crees que este es un problema, comunícate con el equipo de soporte.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketPrices;
