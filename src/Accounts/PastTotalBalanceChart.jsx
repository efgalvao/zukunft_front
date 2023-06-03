import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PastTotalBalanceChart = ({ data }) => {
  return (
    <>
      <div className="subtitle">Past Total Balances</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="Total Balance" type="monotone" dataKey="TotalBalance" stroke="#5120d8" strokeWidth={2} />
          <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default PastTotalBalanceChart;
