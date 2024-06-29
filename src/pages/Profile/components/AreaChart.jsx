import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { stringToPrice } from '@utils/helpers';

const AreaChart = ({ data }) => {
    const svgRef = useRef();
    const resizeObserverRef = useRef(null);
    const tooltipRef = useRef();

    useEffect(() => {
        const drawChart = () => {
            if (!svgRef.current || !svgRef.current.parentElement || !data || data.length === 0) return;

            // Limpiar el gráfico anterior antes de redibujar
            d3.select(svgRef.current).selectAll('*').remove();

            const gradientColors = [
                { offset: '0%', color: 'rgba(255, 165, 0, 0)' },
                { offset: '50%', color: 'rgba(255, 165, 0, 0.3)' },
                { offset: '100%', color: 'rgba(255, 165, 0, 0.8)' }
            ];

            const parentWidth = svgRef.current.parentElement.clientWidth;
            const parentHeight = svgRef.current.parentElement.clientHeight;
            const width = parentWidth;
            const height = parentHeight;

            const svg = d3.select(svgRef.current)
                .attr('width', parentWidth)
                .attr('height', parentHeight)
                .append('g');

            const x = d3.scaleTime()
                .domain(d3.extent(data, d => new Date(d.date)))
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.balance)])
                .nice()
                .range([height, 0]);

            const line = d3.line()
                .x(d => x(new Date(d.date)))
                .y(d => y(+d.balance))
                .curve(d3.curveLinear);

            const area = d3.area()
                .x(d => x(new Date(d.date)))
                .y0(height)
                .y1(d => y(+d.balance))
                .curve(d3.curveLinear);

            svg.append('linearGradient')
                .attr('id', 'area-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0).attr('y1', y(0))
                .attr('x2', 0).attr('y2', y(d3.max(data, d => +d.balance)))
                .selectAll('stop')
                .data(gradientColors)
                .enter().append('stop')
                .attr('offset', d => d.offset)
                .attr('stop-color', d => d.color);

            svg.append('path')
                .datum(data)
                .attr('fill', 'url(#area-gradient)')
                .attr('d', area);

            svg.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', 'orange')
                .attr('stroke-width', 2)
                .attr('d', line);

            const tooltip = d3.select(tooltipRef.current)
                .style('display', 'none')
                .style('position', 'absolute')
                .style('background', 'rgba(0, 0, 0, 0.6)')
                .style('color', 'white')
                .style('padding', '0.5em')
                .style('border-radius', '0.5em');

            svg.append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('fill', 'none')
                .attr('pointer-events', 'all')
                .on('mouseover', () => tooltip.style('display', 'block'))
                .on('mouseout', () => tooltip.style('display', 'none'))
                .on('mousemove', (event) => {
                    const bisectDate = d3.bisector(d => new Date(d.date)).left;
                    const x0 = x.invert(d3.pointer(event)[0]);
                    const i = bisectDate(data, x0, 1);
                    const d0 = data[i - 1];
                    const d1 = data[i];
                    const d = x0 - new Date(d0.date) > new Date(d1.date) - x0 ? d1 : d0;
                    const container = svgRef.current.getBoundingClientRect();
                    tooltip
                        .html(`
                            <div class="text-white p-2 rounded-lg shadow-lg">
                                <div class="font-bold text-yellow-400">${new Date(d.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                                <div class="text-lg font-bold">${stringToPrice(d.balance, true)}</div>
                            </div>
                        `)
                        .style('width', '8rem')
                        .style('left', (event.clientX - container.left + 10) + 'px')
                        .style('top', (event.clientY - container.top - 20) + 'px');
                });
        };

        if (svgRef.current) {
            drawChart();

            const resizeObserver = new ResizeObserver(() => {
                drawChart();
            });

            resizeObserver.observe(svgRef.current.parentElement);
            resizeObserverRef.current = resizeObserver;
        }

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
        };
    }, [data]);

    return (
        <div className="w-full h-full relative">
            <svg ref={svgRef}></svg>
            <div ref={tooltipRef}></div>
        </div>
    );
};

export default AreaChart;
