import React from 'react';
import { stringToPrice } from '../../utils/helpers';
import PorcentajeSpan from '../PorcentajeSpan';
import { Link } from 'react-router-dom';

const CriptosPopulares = ({ criptos }) => {
    return (
        <div className="border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 p-4 flex flex-col gap-2">
            <h2 className="font-bold text-xl mb-4">Criptos populares</h2>
            {criptos.map((cripto, index) => (
                <Link to={`/market/${cripto.symbol}`} key={index} className="flex flex-row items-center justify-between gap-4 p-4 border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-zinc-300 dark:hover:bg-gray-700">
                    <img
                        className="w-12 h-12 rounded-full shadow-lg"
                        src={cripto.image}
                        alt={`${cripto.name} logo`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/utemtrades.svg';
                        }}
                    />
                    <div className="flex-1 flex justify-between items-center">
                        <div className="font-medium">
                            {cripto.name}
                        </div>
                        <div className="text-right flex ml-4 font-bold">{stringToPrice(cripto.price, true)}</div>
                        <PorcentajeSpan porcentaje={cripto.change} />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CriptosPopulares;
