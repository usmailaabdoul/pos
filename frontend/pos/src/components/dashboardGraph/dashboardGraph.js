import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const dashboardGraph = ({data}) => {
  return (
    <LineChart
      width={500}
      height={350}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="qnty" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="sales" stroke="#82ca9d" activeDot={{ r: 5 }} />
    </LineChart>
  );
};

export default dashboardGraph