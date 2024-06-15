import React, { useState, useRef, useEffect } from 'react';

const DropdownSearch = ({ options, selectedOption, onSelect, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleInput = (e) => {
        const value = e.target.value.toLowerCase();
        setInputValue(value);

        const filtered = options.filter(option =>
            option.name.toLowerCase().includes(value) ||
            option.symbol.toLowerCase().includes(value)
        );
        setFilteredOptions(filtered);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

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

    const handleOptionClick = (option) => {
        setIsOpen(false);
        setInputValue('');
        onSelect(option.symbol); // Enviamos el símbolo de la opción seleccionada
    };

    const selectedOptionData = options.find(option => option.symbol === selectedOption);

    return (
        <div className="relative z-50">
            <div className="relative">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600">
                        <img
                            src={selectedOptionData ? selectedOptionData.photoURL : '/utemtrades.svg'}
                            alt={selectedOptionData ? selectedOptionData.name : 'Selected Option'}
                            className="h-full w-full rounded-full object-cover"
                            onError={
                                (e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/utemtrades.svg';
                                }
                            }
                        />
                    </div>
                    <span className="text-gray-500">{selectedOption}</span>
                </button>
            </div>
            {isOpen && (
                <div
                    ref={ref}
                    className="absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                    role="listbox"
                >
                    <input
                        type="text"
                        className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-transparent text-sm font-bold"
                        value={inputValue}
                        onChange={handleInput}
                        placeholder="Buscar..."
                        aria-label="Buscar"
                    />
                    <ul className="w-40">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.symbol}
                                className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 gap-4 ${option.symbol === selectedOption ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                onClick={() => handleOptionClick(option)}
                                role="option"
                                aria-selected={option.symbol === selectedOption}
                            >
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600">
                                    <img
                                        src={option.photoURL}
                                        alt={option.name}
                                        className="h-full w-full rounded-full object-cover"
                                        onError={
                                            (e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/utemtrades.svg';
                                            }
                                        }
                                    />
                                </div>
                                <span>{option.symbol}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownSearch;
