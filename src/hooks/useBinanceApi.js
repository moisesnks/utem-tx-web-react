import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const useBinanceApi = (symbol, interval) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const initialLoadRef = useRef(true);
    const fetchIntervalRef = useRef(null);

    const fetchData = useCallback(async () => {
        if (initialLoadRef.current) {
            setLoading(true);
        }

        try {
            const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`);
            const klines = response.data;

            // Transformar los datos
            const transformedData = klines.map(kline => ({
                date: new Date(kline[0]),
                open: parseFloat(kline[1]),
                high: parseFloat(kline[2]),
                low: parseFloat(kline[3]),
                close: parseFloat(kline[4]),
                volume: parseFloat(kline[5])
            }));

            setData(transformedData);
        } catch (error) {
            console.error('Error fetching data from Binance API', error);
        }

        if (initialLoadRef.current) {
            setLoading(false);
            initialLoadRef.current = false;
        }
    }, [symbol, interval]);

    useEffect(() => {
        fetchData();

        const refreshInterval = getRefreshInterval(interval);
        if (refreshInterval) {
            fetchIntervalRef.current = setInterval(fetchData, refreshInterval);
        }

        return () => {
            if (fetchIntervalRef.current) {
                clearInterval(fetchIntervalRef.current);
                fetchIntervalRef.current = null;
            }
        };
    }, [fetchData, interval]);

    const getRefreshInterval = (interval) => {
        switch (interval) {
            case '1m':
                return 0;
            case '5m':
                return 300000; // 5 minutes in milliseconds
            case '15m':
                return 900000; // 15 minutes in milliseconds
            case '30m':
                return 1800000; // 30 minutes in milliseconds
            case '1h':
                return 3600000; // 1 hour in milliseconds
            default:
                return null; // No refresh for daily interval
        }
    };

    return { data, loading };
};

export default useBinanceApi;
