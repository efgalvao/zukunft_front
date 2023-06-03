import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PastReportsChart = ({ data }) => {
  return (
    <>
      <div className="subtitle">Past Months Reports</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="Incomes" type="monotone" dataKey="Incomes" stroke="#0d4d0b" strokeWidth={2} />
          <Line name="Expenses" type="monotone" dataKey="Expenses" stroke="#141144" strokeWidth={2} />
          <Line name="Invested" type="monotone" dataKey="Invested" stroke="#3b3209" strokeWidth={2} />
          <Line name="Dividends" type="monotone" dataKey="Dividends" stroke="#3b2121" strokeWidth={2} />
          <Line name="Balance" type="monotone" dataKey="FinalBalance" stroke="#c41860" strokeWidth={2} />
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

export default PastReportsChart;
