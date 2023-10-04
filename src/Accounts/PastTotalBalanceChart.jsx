import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PastTotalBalanceChart = ({ data }) => {
  const newData = data.map(item => ({
    TotalBalance: (item.attributes.total_balance_cents / 100).toFixed(2),
    Date: item.attributes.date
  }))
  return (
    <>
      <div className="subtitle">Balaço de meses anteriores:</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={newData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="Balanço" type="monotone" dataKey="TotalBalance" stroke="#5120d8" strokeWidth={2} />
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
