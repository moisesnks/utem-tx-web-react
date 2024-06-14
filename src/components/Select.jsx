import React, { useState } from 'react';

const Select = ({ options, selectedOption, onSelect, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="relative">
            <div
                className={`flex items-center justify-between w-32 border ${disabled ? 'border-gray-400 cursor-not-allowed' : 'border-gray-400'} p-2 bg-transparent rounded-lg ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
                onClick={toggleDropdown}
                aria-disabled={disabled}
            >
                <span className={`text-gray-700 dark:text-white ${disabled ? 'text-gray-400' : ''}`}>{selectedOption}</span>
                <i className={`fas fa-caret-${isOpen ? 'up' : 'down'} text-gray-700 dark:text-white`}></i>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
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
