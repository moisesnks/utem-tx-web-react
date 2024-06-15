import React from 'react';
import { stringToPrice } from '../../utils/helpers';
import PorcentajeSpan from '../PorcentajeSpan';

const CriptosPopulares = ({ criptos }) => {
    return (
        <div className="border-gray-300 dark:border-gray-700 border flex flex-col gap-4 p-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg ">
            <span className="font-bold text-xl leading-6 p-3">Criptos populares</span>
            {criptos.map((cripto, index) => (
                <div
                    key={index}
                    className="flex items-center cursor-pointer py-3 px-4 gap-2 text-md leading-5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <div className="flex gap-2">
                        <img
                            className="w-12 h-12  rounded-full drop-shadow-lg shadow-lg"
                            src={cripto.image}
                            alt={`${cripto.name} logo`}
                            onError={
                                (e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/utemtrades.svg';
                                }
                            }
                        />
                        <div className="font-medium">{cripto.name}</div>
                    </div>
                    <div className="flex-1 text-right font-normal">{stringToPrice(cripto.price)}</div>
                    <PorcentajeSpan porcentaje={cripto.change} />
                </div>
            ))}
        </div>
    );
};

export default CriptosPopulares;