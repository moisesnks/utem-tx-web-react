import { useState, useEffect, useCallback, useRef } from 'react';

const useKlineWebSocket = (symbol, interval) => {
    const [klineData, setKlineData] = useState([]);
    const socketRef = useRef(null);
    const [attempt, setAttempt] = useState(0);

    const connectWebSocket = useCallback(() => {
        socketRef.current = new WebSocket('ws://localhost:8080/ws');

        socketRef.current.onopen = () => {
            console.log('WebSocket connected');
            socketRef.current.send(JSON.stringify({ symbol, interval }));
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const kline = data.k;
            setKlineData(prev => [...prev, {
                time: kline.t,
                open: parseFloat(kline.o),
                close: parseFloat(kline.c),
                high: parseFloat(kline.h),
                low: parseFloat(kline.l),
                volume: parseFloat(kline.v)
            }]);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket closed. Reconnecting...');
            setAttempt(prev => prev + 1);
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            socketRef.current.close();
        };
    }, [symbol, interval]);

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectWebSocket]);

    useEffect(() => {
        if (attempt > 0) {
            const timeout = setTimeout(() => {
                connectWebSocket();
            }, Math.min(1000 * attempt, 10000)); // Exponential backoff, max 10s

            return () => clearTimeout(timeout);
        }
    }, [attempt, connectWebSocket]);

    return [klineData, setKlineData];
};

export default useKlineWebSocket;
