import React from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Bar, Area } from 'recharts';

const TradingView = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
                <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#413ea0" />
                <Line yAxisId="left" type="monotone" dataKey="close" stroke="#ff7300" />
                <Area yAxisId="left" type="monotone" dataKey="close" fill="#ff7300" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default TradingView;
