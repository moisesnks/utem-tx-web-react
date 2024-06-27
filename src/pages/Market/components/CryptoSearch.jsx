import React, { useState, useEffect } from 'react';
import Autocomplete from '@components/Autocomplete';
import { useNavigate } from 'react-router-dom';

const CryptoSearch = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptoList = async () => {
            try {
                const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
                const data = await response.json();

                // Extraer el full name y el symbol de cada criptomoneda
                const cryptoNames = data.symbols.map((crypto) => ({
                    symbol: crypto.symbol,
                    fullName: crypto.baseAsset + '/' + crypto.quoteAsset, // Ejemplo: BTC/USDT
                }));

                setCryptoList(cryptoNames);
            } catch (error) {
                console.error('Error fetching crypto list:', error);
            }
        };

        fetchCryptoList();
    }, []);

    const handleSelect = (crypto) => {
        console.log('Selected cryptocurrency:', crypto);
        // Navegar a la página de la criptomoneda seleccionada
        navigate(`/market/${crypto}`);

    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <Autocomplete
                suggestions={cryptoList.map(crypto => crypto.symbol)}
                onSelect={handleSelect}
                placeholder="Busca una criptomoneda..."
            />
        </div>
    );
};

export default CryptoSearch;
