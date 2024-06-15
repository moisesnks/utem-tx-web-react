
import React, { useState } from 'react';
import DropdownSearch from '../../DropdownSearch';

const CurrencyInput = ({ isEditable = true, label, value, onChange, selectedCurrency, onCurrencyChange, placeholder = '0.0', className = '', options }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div
      className={`${className} border rounded-lg p-2 mb-4 dark:border-gray-700 border-gray-300 ${isInputFocused ? 'outline outline-1 dark:outline-orange-500 outline-gray-400' : ''
        } hover:outline hover:outline-1 hover:outline-gray-400 dark:hover:outline-orange-500  bg-neutral-400 dark:bg-gray-900`}
    >
      <label className="block">{label}</label>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="flex-1 px-4 py-2 border rounded border-gray-700 bg-transparent appearance-none text-2xl font-bold w-full"
          readOnly={!isEditable}
          placeholder={placeholder}
        />
        <DropdownSearch selectedOption={selectedCurrency} onSelect={onCurrencyChange} options={options} />
      </div>
    </div>
  );
};

export default CurrencyInput;