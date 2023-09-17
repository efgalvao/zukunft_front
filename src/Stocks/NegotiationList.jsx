import React from 'react';
import '../Accounts/AccountSummary.css';

const NegotiationList = ({ negotiations }) => {
  const formattedDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    const formattedDateString = date.toLocaleDateString('pt-BR', options);

    return `${formattedDateString}`;
  };

  return (
    <>
      <div className="subtitle">Negociações</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Data: </th>
            <th>Tipo: </th>
            <th>Valor: </th>
            <th>Cotas: </th>
          </tr>
        </thead>
        <tbody>
          {negotiations.map((negotiation, index) => (
            <tr key={index}>
              <td>
                {formattedDate(new Date(negotiation.date))}
              </td>
              <td>{negotiation.kind}</td>
              <td>{`$ ${negotiation.invested_cents.toFixed(2)}`}</td>
              <td>{negotiation.shares}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NegotiationList;
