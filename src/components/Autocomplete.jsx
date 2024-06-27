import React, { useState, useEffect, useRef } from 'react';

const Autocomplete = ({ suggestions, onSelect, placeholder }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (suggestions.length > 0 && inputValue === '') {
            let options = suggestions.slice(0, 5); // Limitar a las primeras 5 sugerencias
            options.push("Escribe para buscar más..."); // Añadir mensaje
            setFilteredSuggestions(options);
        }
    }, [suggestions, inputValue]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filtered = suggestions.filter((suggestion) =>
                suggestion.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredSuggestions(filtered.length > 0 ? filtered : ["No se encontraron sugerencias"]);
        } else {
            const initialOptions = suggestions.slice(0, 5).concat("Escribe para buscar más...");
            setFilteredSuggestions(initialOptions);
        }
        setShowSuggestions(true);
    };

    const handleSelect = (suggestion) => {
        if (suggestion !== "Escribe para buscar más..." && suggestion !== "No se encontraron sugerencias") {
            setInputValue(suggestion);
            setShowSuggestions(false);
            onSelect(suggestion);
        }
    };

    const handleFocus = () => {
        if (inputValue.length === 0) {
            const initialOptions = suggestions.slice(0, 5).concat("Escribe para buscar más...");
            setFilteredSuggestions(initialOptions);
        }
        setShowSuggestions(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [containerRef]);

    useEffect(() => {
        // Scroll to top when suggestions change
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    }, [filteredSuggestions]);

    const highlightText = (text, query) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="dark:text-primary text-primary-light font-bold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div ref={containerRef} className="relative text-sm border border-gray-300 rounded dark:bg-gray-800 bg-white dark:border-gray-700 flex items-center">
            <i className="fa-solid fa-magnifying-glass mx-2 text-gray-500"></i>

            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={placeholder}
                className="w-full p-2 border-none "
                ref={inputRef}
            />
            {showSuggestions && (
                <ul
                    ref={listRef}
                    className=" absolute left-0 top-full mt-1 w-full border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => suggestion === "Escribe para buscar más..." ? inputRef.current.focus() : handleSelect(suggestion)}
                            className={`p-2 ${suggestion === "Escribe para buscar más..." || suggestion === "No se encontraron sugerencias" ? 'cursor-text text-gray-500' : 'cursor-pointer hover:bg-primary-light '}`}
                        >
                            {suggestion === "Escribe para buscar más..." || suggestion === "No se encontraron sugerencias" ? suggestion : highlightText(suggestion, inputValue)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
