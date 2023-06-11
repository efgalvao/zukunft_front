import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PriceChart = ({ prices = [] }) => {
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

  const formatedprices = prices.map((price) => ({
    date: formatedDate(price.date),
    value_cents: price.value_cents
  }));

  return (
    <>
      <div className="subtitle">Past Prices</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formatedprices} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="prices" type="monotone" dataKey="value_cents" stroke="#5120d8" strokeWidth={2} />
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

export default PriceChart;
