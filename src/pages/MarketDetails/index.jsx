import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useBinanceApi from './hooks/useBinanceApi';
import CandlestickChart from './components/CandlestickChart';

const MarketPage = () => {
    const { symbol } = useParams();
    const [interval, setInterval] = useState('1d');
    const { data, loading } = useBinanceApi(symbol.toUpperCase(), interval);

    const handleIntervalChange = (e) => {
        setInterval(e.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Market Data for {symbol.toUpperCase()}</h1>
            <label className="block mb-2">
                Select Interval:
                <select value={interval} onChange={handleIntervalChange} className="ml-2 p-1 border rounded">
                    <option value="1m">1 Minute</option>
                    <option value="5m">5 Minutes</option>
                    <option value="15m">15 Minutes</option>
                    <option value="30m">30 Minutes</option>
                    <option value="1h">1 Hour</option>
                    <option value="1d">1 Day</option>
                </select>
            </label>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <CandlestickChart data={data} />
            )}
        </div>
    );
};

export default MarketPage;
