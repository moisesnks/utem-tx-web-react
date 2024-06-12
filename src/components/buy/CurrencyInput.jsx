// src/components/CurrencyInput.js
import React from 'react';

// Componente para entrada de monto y selección de moneda
const CurrencyInput = ({ isEditable=true,label, value, onChange, currencies, selectedCurrency, onCurrencyChange, balance }) => {

  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
          readOnly={!isEditable}
        />
        <select
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <small className="block mt-1 text-gray-500">Saldo: {balance[selectedCurrency]} {selectedCurrency}</small>

    </div>
  );
};

export default CurrencyInput;
