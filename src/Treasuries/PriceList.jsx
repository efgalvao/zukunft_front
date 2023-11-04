import React from 'react';
import '../Accounts/AccountSummary.css';

const PriceList = ({ prices }) => {
  const formattedDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    const formattedDateString = date.toLocaleDateString('pt-BR', options);

    return `${formattedDateString}`;
  };

  const formatedValue = (value_cents) => {
    const value = (value_cents / 100 || 0).toFixed(2);
    return `$ ${value}`;
  };
  return (
    <>
      <div className="subtitle">Posições:</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Data: </th>
            <th>Valor: </th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, index) => (
            <tr key={index}>
              <td>{formattedDate(new Date(price.date))}</td>
              <td>{formatedValue(price.value_cents)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PriceList;
