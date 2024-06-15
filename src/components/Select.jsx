import React, { useState, useEffect, useRef } from 'react';

const Select = ({ options, selectedOption, onSelect, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null); // Referencia al elemento del dropdown

    // Función para cerrar el dropdown cuando se hace clic fuera de él
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Agregar listener de eventos al documento cuando el dropdown está abierto
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false); // Cerrar el dropdown después de seleccionar una opción
    };

    return (
        <div className="relative z-50" ref={ref}>
            <div
                className={`flex items-center justify-between w-32 border ${disabled ? 'border-gray-400 cursor-not-allowed' : 'border-gray-300 bg-gray-300 dark:border-gray-700'} p-2 dark:bg-gray-700 rounded-lg ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
                onClick={toggleDropdown}
                aria-disabled={disabled}
            >
                <span className={`text-gray-700 dark:text-white ${disabled ? 'text-gray-400' : ''}`}>{selectedOption}</span>
                <i className={`fas fa-caret-${isOpen ? 'up' : 'down'} text-gray-700 dark:text-white`}></i>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedOption === option ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
