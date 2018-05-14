import React from 'react';
import {
    Charts
} from 'components';

const {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    Legend,
    YAxis,
    XAxis,
    Brush,
    ReferenceLine
} = Charts.Recharts;

import { data } from './../../data';

const BarChartWithBrush = props => (
    <ResponsiveContainer height={ 300 }>
        <BarChart
            height={300}
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
            <XAxis dataKey="name"/>
            <YAxis />
            <CartesianGrid />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} />
            <Bar dataKey="pv" fill="#47B4F3" />
            <Bar dataKey="uv" fill="#3BBDA8" />
            <Brush />
        </BarChart>
    </ResponsiveContainer>
);

export default BarChartWithBrush;
