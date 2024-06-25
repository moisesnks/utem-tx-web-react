import React, { useEffect, useState } from 'react';

const Snackbar = ({ isOpen, message, isError, onClose }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, countdown * 1000); // Cerrar el Snackbar después del tiempo restante en segundos
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, countdown]);

    useEffect(() => {
        if (isOpen) {
            // Reiniciar el contador cuando se abre el Snackbar
            setCountdown(5);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSnackbarClose = () => {
        clearInterval(); // Limpiar el intervalo antes de cerrar
        onClose(); // Cerrar el Snackbar manualmente
    };

    return (
        <div className={`fixed bottom-4 right-4 px-4 py-6 rounded-lg shadow-lg ${isError ? 'bg-red-500' : 'bg-green-500'} text-white max-w-96 max-h-56 overflow-auto`}>
            <div className="my-2 mx-1">
                {message}
            </div>
            {/* Botón para cerrar el Snackbar */}
            <button className="absolute top-2 right-4 text-white" onClick={handleSnackbarClose}>
                <i className="fas fa-times"></i>
            </button>
            {/* Contador regresivo */}
            <div className="absolute top-2 left-5 text-white text-sm flex flex-row gap-1 h-[20px]">
                <span className='rounded-full bg-white text-black px-2 h-[20px] w-[20px] flex items-center justify-center overflow-hidden'>
                    {countdown}
                </span>
                <span> segundos</span>
            </div>
        </div>
    );
};

export default Snackbar;
