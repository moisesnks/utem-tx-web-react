// utils/helpers
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handler = (event) => setMatches(event.matches);

        mediaQuery.addListener(handler);
        setMatches(mediaQuery.matches);

        return () => mediaQuery.removeListener(handler);
    }, [query]);

    return matches;
}

// Función para obtener la clase de color basada en el cambio de precio
export const getChangeColor = (change) => {
    const changeValue = parseFloat(change.replace('+', '').replace('%', ''));
    return changeValue >= 0 ? 'text-green-500' : 'text-red-500';
};

// Función para convertir un string de precio a un formato con comas y puntos
export function stringToPrice(priceString, includeCurrencySymbol) {
    if (typeof priceString !== 'string' || priceString.trim() === '') {
        return 'Precio no válido';
    }

    const number = parseFloat(priceString);
    if (isNaN(number)) {
        return 'Precio no válido';
    }

    const formattedPrice = number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 16 });

    if (includeCurrencySymbol) {
        return `$${formattedPrice}`;
    } else {
        return formattedPrice;
    }
}

export function PriceToString(price) {
    // le quitará los puntos y comas
    return price.replace(/[,]/g, '');
}

// Función para determinar la clase de color basada en el valor del porcentaje
export function getColorClass(porcentaje) {
    if (porcentaje > 0) {
        return 'text-green-500'; // Verde para porcentajes positivos
    } else if (porcentaje < 0) {
        return 'text-red-500'; // Rojo para porcentajes negativos
    } else {
        return 'text-gray-500'; // Gris para porcentajes igual a cero (opcional)
    }
}
