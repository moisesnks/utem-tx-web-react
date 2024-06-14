// components/PorcentajeSpan.js

import React from 'react';
import { getColorClass } from '../utils/helpers';

const PorcentajeSpan = ({ porcentaje }) => {
    const formattedPorcentaje = `${porcentaje.toFixed(2)}%`;
    const colorClass = getColorClass(porcentaje);

    return (
        <span className={`text-xl font-bold ${colorClass} drop-shadow-lg`}>
            {porcentaje > 0 ? '+' : ''}{formattedPorcentaje}
        </span>
    );
};

export default PorcentajeSpan;
