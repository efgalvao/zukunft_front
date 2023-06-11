import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const DividendChart = ({ dividends = [] }) => {
  const formatedDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    const new_date = new Date(date);
    const formattedDateString = new_date.toLocaleDateString('pt-BR', options);

    return `${formattedDateString}`;
  };

  const formatedDividends = dividends.map((dividend) => ({
    date: formatedDate(dividend.date),
    value_cents: dividend.value_cents
  }));

  return (
    <>
      <div className="subtitle">Past Dividends</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formatedDividends} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="Dividends" type="monotone" dataKey="value_cents" stroke="#5120d8" strokeWidth={2} />
          <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default DividendChart;
