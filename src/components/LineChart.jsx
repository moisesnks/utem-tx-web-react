import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import 'tailwindcss/tailwind.css';

const CandlestickChart = ({ data, interval }) => {
    const svgRef = useRef();
    const tooltipRef = useRef();
    const initialCandleWidth = 1.618;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const tooltip = d3.select(tooltipRef.current);
        const { width, height } = svg.node().getBoundingClientRect();
        const margin = { top: 84, right: 30, bottom: 50, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        let newXScale, newYScale;


        // Set up scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
            .range([innerHeight, 0]);

        // Create axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Update axes
        svg.select('.x-axis')
            .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`)
            .transition().duration(750)
            .call(xAxis);

        svg.select('.y-axis')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .transition().duration(750)
            .call(yAxis);

        // Remove old candles and wicks
        svg.selectAll('.candlestick').remove();
        svg.selectAll('.wick').remove();

        // Draw candlesticks
        let candleGroup = svg.select('g.candle-group')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        if (candleGroup.empty()) {
            candleGroup = svg.append('g')
                .attr('class', 'candle-group')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
        }

        candleGroup.selectAll('.candlestick')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'candlestick')
            .attr('x', d => xScale(d.date) - initialCandleWidth / 2)
            .attr('y', d => yScale(Math.max(d.open, d.close)))
            .attr('width', initialCandleWidth)
            .attr('height', d => Math.abs(yScale(d.open) - yScale(d.close)))
            .attr('fill', d => d.open > d.close ? 'red' : 'green')
            .attr('stroke', 'black')
            .transition().duration(750);

        // Draw wicks
        candleGroup.selectAll('.wick')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'wick')
            .attr('x1', d => xScale(d.date))
            .attr('x2', d => xScale(d.date))
            .attr('y1', d => yScale(d.high))
            .attr('y2', d => yScale(d.low))
            .attr('stroke', 'black')
            .transition().duration(750);

        // Append crosshair lines
        let crosshairX = svg.select('.crosshair-x');
        let crosshairY = svg.select('.crosshair-y');
        let crosshairDate = svg.select('.crosshair-date');

        if (crosshairX.empty() || crosshairY.empty() || crosshairDate.empty()) {
            crosshairX = svg.append('line')
                .attr('class', 'crosshair crosshair-x')
                .attr('stroke', 'gray')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '3,3')
                .style('display', 'none');

            crosshairY = svg.append('line')
                .attr('class', 'crosshair crosshair-y')
                .attr('stroke', 'gray')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '3,3')
                .style('display', 'none');

            crosshairDate = svg.append('text')
                .attr('class', 'crosshair-date')
                .attr('text-anchor', 'middle')
                .attr('fill', 'black')
                .style('display', 'none');
        }

        // Zoom functionality
        const zoom = d3.zoom()
            .scaleExtent([1, 50])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on('zoom', (event) => {
                const transform = event.transform;
                newXScale = transform.rescaleX(xScale);
                newYScale = transform.rescaleY(yScale);

                const [x0, x1] = newXScale.domain();
                const newData = data.filter(d => d.date >= x0 && d.date <= x1);
                const minY = d3.min(newData, d => d.low);
                const maxY = d3.max(newData, d => d.high);
                newYScale.domain([minY, maxY]);

                svg.select('.x-axis').call(xAxis.scale(newXScale));
                svg.select('.y-axis').call(yAxis.scale(newYScale));

                const zoomLevel = transform.k;
                const newCandleWidth = initialCandleWidth * zoomLevel;

                svg.selectAll('.candlestick')
                    .attr('x', d => newXScale(d.date) - newCandleWidth / 2)
                    .attr('width', newCandleWidth)
                    .attr('y', d => newYScale(Math.max(d.open, d.close)))
                    .attr('height', d => Math.abs(newYScale(d.open) - newYScale(d.close)));

                svg.selectAll('.wick')
                    .attr('x1', d => newXScale(d.date))
                    .attr('x2', d => newXScale(d.date))
                    .attr('y1', d => newYScale(d.high))
                    .attr('y2', d => newYScale(d.low));

                crosshairX
                    .attr('y1', margin.top)
                    .attr('y2', height - margin.bottom);

                crosshairY
                    .attr('x1', margin.left)
                    .attr('x2', width - margin.right);
            });

        svg.call(zoom);

        const mousemove = (event) => {
            const [x, y] = d3.pointer(event);

            let date = newXScale ? newXScale.invert(x - margin.left) : xScale.invert(x - margin.left);

            // Verificar si el cursor está dentro del área de las velas
            const isInsideCandles = x >= margin.left && x <= (width - margin.right) && y >= margin.top && y <= (height - margin.bottom);

            if (isInsideCandles) {
                const closestData = data.reduce((a, b) => {
                    return Math.abs(b.date - date) < Math.abs(a.date - date) ? b : a;
                });

                // Update tooltip content without moving it
                tooltip
                    .style('display', 'block')
                    .html(`
                        <strong>Date:</strong> ${date.toLocaleString('es-ES', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}<br>
                        <strong>O:</strong> ${closestData.open}
                        <strong>H:</strong> ${closestData.high}
                        <strong>L:</strong> ${closestData.low}
                        <strong>C:</strong> ${closestData.close}
                        <strong>X:</strong> ${x}
                        <strong>Y:</strong> ${y}
                    `);

                // Update crosshair
                crosshairX.style('display', 'block')
                    .attr('x1', x).attr('x2', x)
                    .attr('y1', margin.top).attr('y2', height - margin.bottom);
                crosshairY.style('display', 'block')
                    .attr('x1', margin.left).attr('x2', width - margin.right)
                    .attr('y1', y).attr('y2', y);

                // Show date at the bottom of crosshair en formato "lue 1/1/2021 12:00:00 AM"
                crosshairDate.style('display', 'block')
                    .attr('x', x)
                    .attr('y', height - margin.bottom + 15)
                    .text(date.toLocaleString('es-ES', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }));
            }
        };

        const mouseout = () => {
            crosshairX.style('display', 'none');
            crosshairY.style('display', 'none');
            crosshairDate.style('display', 'none');
        };

        svg
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);

    }, [data, interval]);

    return (
        <>
            <div className="container border relative cursor-crosshair">
                <svg ref={svgRef} width="100%" height="400">
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
                <div ref={tooltipRef} className="absolute p-2 rounded shadow" style={{ display: 'none', left: '15px', top: '10px' }}></div>
            </div>
        </>
    );
};

export default CandlestickChart;
