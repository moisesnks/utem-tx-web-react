// Este archivo comienza con experimental.* porque es un archivo que no ha sido probado, está en espera que el Backend termine su contrato para 
// ver si funciona su implementación integrada con el Frontend.

import React, { useState, useEffect } from 'react';
import CriptosPopulares from './CriptosPopulares.jsx';
import ComprarVender from './ComprarVender.jsx';

const BuyPage = () => {
    const [criptosPopulares, setCriptosPopulares] = useState([]);
    const [conexionExitosa, setConexionExitosa] = useState(true); // Estado para controlar si la conexión es exitosa

    useEffect(() => {
        // Función para conectar con WebSocket y obtener criptomonedas populares
        const connectToWebSocket = () => {
            const socket = new WebSocket('ws://localhost:3001'); // Reemplaza con la URL de tu WebSocket
            socket.onopen = () => {
                console.log('Conectado al servidor WebSocket');
                setConexionExitosa(true); // Indicar que la conexión fue exitosa
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Datos recibidos:', data);
                setCriptosPopulares(data); // Actualiza los criptos populares con los datos del WebSocket
            };

            socket.onclose = () => {
                console.log('Conexión cerrada');
                setConexionExitosa(false); // Indicar que la conexión fue cerrada
            };

            socket.onerror = (error) => {
                console.error('Error en WebSocket:', error);
                setConexionExitosa(false); // Indicar que hubo un error en la conexión
            };
        };

        connectToWebSocket(); // Llama a la función para conectar con WebSocket al montar el componente
    }, []); // El segundo argumento [] asegura que se llama solo una vez, equivalente a componentDidMount()

    return (
        <div className="w-full flex flex-grow flex-row gap-20 justify-between mx-auto max-w-screen-xl">
            <div className="mt-10 flex flex-col flex-wrap gap-8 w-3/6 px-4 py-2">
                <h1 className="text-6xl font-bold">
                    Comprar cripto
                </h1>
                {conexionExitosa ? (
                    <CriptosPopulares criptos={criptosPopulares} />
                ) : (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error:</strong> No se pudo conectar al servidor WebSocket. Por favor, inténtalo de nuevo más tarde.
                    </div>
                )}
            </div>

            <div className="mt-10 w-3/6 px-4 py-2">
                <ComprarVender />
            </div>
        </div>
    );
};

export default BuyPage;
