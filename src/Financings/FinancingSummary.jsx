import React from 'react';

const FinancingSummary = ({ financing }) => {
  const formatCurrency = (valueInCents) => {
    const valueInBRL = valueInCents / 100;
    return valueInBRL.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  return (
    <>
      <div className="subtitle">Resumo:</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Parcelas</th>
            <th>Valor Financiado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{financing.installments}</td>
            <td>{formatCurrency(financing.borrowed_value_cents)}</td>
          </tr>
        </tbody>
      </table >
    </>
  );
};

export default FinancingSummary;
