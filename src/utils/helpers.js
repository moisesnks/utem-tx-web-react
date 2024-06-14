// utils/helpers.js

// Función para convertir un string de precio a un formato con comas y puntos
export function stringToPrice(priceString, includeCurrencySymbol) {
    if (typeof priceString !== 'string' || priceString.trim() === '') {
        return 'Precio no válido';
    }

    const number = parseFloat(priceString);
    if (isNaN(number)) {
        return 'Precio no válido';
    }

    const formattedPrice = number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });

    if (includeCurrencySymbol) {
        return `$${formattedPrice}`;
    } else {
        return formattedPrice;
    }
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
