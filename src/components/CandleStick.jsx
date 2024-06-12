import React, { useState, useRef, useEffect } from 'react';
import { CartesianGrid, XAxis, YAxis, Bar, ComposedChart, Line, Cell, Tooltip, Legend } from 'recharts';
import CustomErrorBar from './CustomErrorBar';
import CustomXAxis from './CustomXAxis';
import CustomYAxis from './CustomYAxis';

const CandleStick = ({ colorUp = '#00906F', colorDown = '#B23507', barWidth = 10, lineWidth = 3, data, width, height }) => {
    const transformedData = data.map(point => ({
        date: point.date,
        open: point.open,
        close: point.close,
        low: Math.min(point.close, point.open),
        high: Math.max(point.close, point.open),
        height: Math.abs(point.close - point.open),
        errorLineHigh: (point.high - Math.max(point.close, point.open)) / 2 + Math.max(point.close, point.open),
        errorLineLow: Math.min(point.close, point.open) - (Math.min(point.close, point.open) - point.low) / 2,
        errorLowUp: point.close > point.open ? (Math.min(point.close, point.open) - point.low) / 2 : null,
        errorHighUp: point.close > point.open ? (point.high - Math.max(point.close, point.open)) / 2 : null,
        errorLowDown: point.close <= point.open ? (Math.min(point.close, point.open) - point.low) / 2 : null,
        errorHighDown: point.close <= point.open ? (point.high - Math.max(point.close, point.open)) / 2 : null,
        up: point.close > point.open,
    }));

    const maxHeight = transformedData.reduce((max, point) =>
        Math.max(point.high +
            (point.errorHighUp ? point.errorHighUp : 0) +
            (point.errorHighDown ? point.errorHighDown : 0), max)
        , 0);
    const minHeight = transformedData.reduce((min, point) =>
        Math.min(point.low -
            (point.errorLowDown ? point.errorLowDown : 0) -
            (point.errorLowDown ? point.errorLowDown : 0), min)
        , 0);

    const [zoom, setZoom] = useState([0, transformedData.length - 1]);
    const [panStart, setPanStart] = useState(null);
    const chartRef = useRef();

    const handleWheel = (e) => {
        e.preventDefault();
        const zoomFactor = 0.2;
        const zoomCenter = (zoom[1] - zoom[0]) * (e.clientX / chartRef.current.offsetWidth) + zoom[0];
        const zoomDelta = (zoom[1] - zoom[0]) * zoomFactor * Math.sign(e.deltaY);

        const newZoom = [
            Math.max(0, zoomCenter - (zoomCenter - zoom[0]) * (1 + Math.sign(e.deltaY) * zoomFactor)),
            Math.min(transformedData.length - 1, zoomCenter + (zoom[1] - zoomCenter) * (1 + Math.sign(e.deltaY) * zoomFactor))
        ];

        if (newZoom[1] - newZoom[0] >= 1) {
            setZoom(newZoom);
        }
    };

    const handleMouseDown = (e) => {
        if (e.button === 0) {
            setPanStart(e.clientX);
        }
    };

    const handleMouseMove = (e) => {
        if (panStart !== null) {
            const panSpeed = 0.5;
            const panDelta = (e.clientX - panStart) * panSpeed;
            const newZoom = [
                Math.max(0, zoom[0] - panDelta),
                Math.min(transformedData.length - 1, zoom[1] - panDelta)
            ];
            setZoom(newZoom);
            setPanStart(e.clientX);
        }
    };

    const handleMouseUp = () => {
        setPanStart(null);
    };

    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {
            chart.addEventListener('wheel', handleWheel);
            chart.addEventListener('mousedown', handleMouseDown);
            chart.addEventListener('mousemove', handleMouseMove);
            chart.addEventListener('mouseup', handleMouseUp);
            chart.addEventListener('mouseleave', handleMouseUp);

            return () => {
                chart.removeEventListener('wheel', handleWheel);
                chart.removeEventListener('mousedown', handleMouseDown);
                chart.removeEventListener('mousemove', handleMouseMove);
                chart.removeEventListener('mouseup', handleMouseUp);
                chart.removeEventListener('mouseleave', handleMouseUp);
            };
        }
    }, [zoom, panStart]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Fecha : ${data.date}`}</p>
                    <p>{`Open: ${data.open}`}</p>
                    <p>{`High: ${data.high}`}</p>
                    <p>{`Low: ${data.low}`}</p>
                    <p>{`Close: ${data.close}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
            <ComposedChart width={width} height={height} data={transformedData.slice(...zoom)}>
                <CartesianGrid horizontal={false} strokeDasharray={"1 15"} />
                <CustomXAxis />
                <CustomYAxis domain={[minHeight - 2, maxHeight + 2]} />
                <Tooltip content={<CustomTooltip />} />

                {/*Floating bar*/}
                <Bar dataKey="low" fillOpacity={0} stackId={'stack'} />
                <Bar dataKey="height" stackId={'stack'} barSize={barWidth}>
                    {transformedData.slice(...zoom).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.up ? colorUp : colorDown} />
                    ))}
                </Bar>

                {/*Error down*/}
                <Line dataKey={'errorLineHigh'} stroke={'none'} isAnimationActive={false} dot={false}>
                    <CustomErrorBar dataKey={'errorHighDown'} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorDown} />
                </Line>

                <Line dataKey={'errorLineLow'} stroke={'none'} isAnimationActive={false} dot={false}>
                    <CustomErrorBar dataKey={'errorLowDown'} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorDown} />
                </Line>

                {/*Error up */}
                <Line dataKey={'errorLineHigh'} stroke={'none'} isAnimationActive={false} dot={false}>
                    <CustomErrorBar dataKey={'errorHighUp'} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorUp} />
                </Line>

                <Line dataKey={'errorLineLow'} stroke={'none'} isAnimationActive={false} dot={false}>
                    <CustomErrorBar dataKey={'errorLowUp'} width={lineWidth} strokeWidth={lineWidth - 1} stroke={colorUp} />
                </Line>
            </ComposedChart>
        </div>
    );
};

export default CandleStick;
