import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PastReportsChart = ({ data }) => {
  const newData = data.map(obj => {
    const formattedIncomes = (obj.attributes.incomes_cents / 100).toFixed(2);
    const formattedExpenses = (obj.attributes.expenses_cents / 100).toFixed(2);
    const formattedFinal = (obj.attributes.final_balance_cents / 100).toFixed(2);
    return {
      Incomes: formattedIncomes, Expenses: formattedExpenses,
      FinalBalance: formattedFinal, Date: obj.attributes.date
    };
  });

  return (
    <>
      <div className="subtitle">Relatorio de meses anteriores</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={newData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line name="Entradas" type="monotone" dataKey="Incomes" stroke="#0d4d0b" strokeWidth={2} />
          <Line name="Saidas" type="monotone" dataKey="Expenses" stroke="#141144" strokeWidth={2} />
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
