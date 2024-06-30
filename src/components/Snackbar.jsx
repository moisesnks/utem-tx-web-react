import React, { useEffect, useState } from 'react';

const Snackbar = ({ isOpen, message, isError, onClose }) => {
    const [countdown, setCountdown] = useState(5);

    // Efecto para iniciar el contador cuando se abre el Snackbar
    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }

        // Limpiar el intervalo cuando el componente se desmonta o isOpen cambia a false
        return () => {
            clearInterval(timer);
        };
    }, [isOpen]);

    // Efecto para cerrar el Snackbar después del tiempo establecido
    useEffect(() => {
        if (isOpen && countdown === 0) {
            onClose(); // Cerrar el Snackbar automáticamente al finalizar el contador
        }
    }, [isOpen, countdown, onClose]);

    // Efecto para reiniciar el contador cuando se abre el Snackbar
    useEffect(() => {
        if (isOpen) {
            setCountdown(5); // Reiniciar el contador a 5 segundos
        }
    }, [isOpen]);

    // Función para manejar el cierre del Snackbar al hacer clic en la cruz
    const handleSnackbarClose = () => {
        onClose(); // Cerrar el Snackbar manualmente
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed bottom-4 right-4 px-4 py-6 rounded-lg shadow-lg ${isError ? 'bg-red-500' : 'bg-green-500'} text-white max-w-96 max-h-56 overflow-auto`}>
            <div className="my-2 mx-1">
                {message}
            </div>
            {/* Botón para cerrar el Snackbar */}
            <button
                className="absolute top-2 right-4 text-white"
                onClick={handleSnackbarClose}
                aria-label="Cerrar"
            >
                <i className="fas fa-times"></i>
            </button>
            {/* Contador regresivo */}
            <div className="absolute top-2 left-5 text-white text-sm flex flex-row gap-1 items-center">
                <span className="rounded-full bg-white text-black px-2 h-6 w-6 flex items-center justify-center overflow-hidden">
                    {countdown}
                </span>
                <span> segundos</span>
            </div>
        </div>
    );
};

export default Snackbar;
