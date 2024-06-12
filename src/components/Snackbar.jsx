import React from 'react';

const Snackbar = ({ isOpen, message, isError, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${isError ? 'bg-red-500' : 'bg-green-500'} text-white`}>
            {message}
            <button onClick={onClose} className="ml-4 text-black">Cerrar</button>
        </div>
    );
}

export default Snackbar;
