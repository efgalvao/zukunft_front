import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PastReportsChart = ({ data }) => {
  const newData = data.map(item => ({
    Incomes: (item.attributes.incomes_cents / 100).toFixed(2),
    Expenses: (item.attributes.expenses_cents / 100).toFixed(2),
    Invested: (item.attributes.invested_cents / 100).toFixed(2),
    Dividends: (item.attributes.dividends_cents / 100).toFixed(2),
    FinalBalance: (item.attributes.final_balance_cents / 100).toFixed(2),
    Date: item.attributes.date
  }))

  return (
    <>
      <div className="subtitle">Gráfico de meses anteriores</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={newData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="Receita" type="monotone" dataKey="Incomes" stroke="#0d4d0b" strokeWidth={2} />
          <Line name="Gasto" type="monotone" dataKey="Expenses" stroke="#141144" strokeWidth={2} />
          <Line name="Investido" type="monotone" dataKey="Invested" stroke="#3b3209" strokeWidth={2} />
          <Line name="Dividendos" type="monotone" dataKey="Dividends" stroke="#3b2121" strokeWidth={2} />
          <Line name="Balanço" type="monotone" dataKey="FinalBalance" stroke="#c41860" strokeWidth={2} />
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
