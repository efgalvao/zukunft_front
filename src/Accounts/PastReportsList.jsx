import React from 'react';
import './AccountSummary.css';

const PastReportsList = ({ reports }) => {
  const formattedDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const formattedDateString = date.toLocaleDateString('pt-BR', options);

    return `${formattedDateString}`;
  };

  return (
    <>
      <div className="subtitle">Resumo de meses anteriores:</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Receita</th>
            <th>Gasto</th>
            <th>Investido</th>
            <th>Balanço</th>
            <th>Última Atualização</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{`$ ${(report.attributes.incomes_cents / 100).toFixed(2)}`}</td>
              <td>{`$ ${(report.attributes.expenses_cents / 100).toFixed(2)}`}</td>
              <td>{`$ ${(report.attributes.invested_cents / 100).toFixed(2)}`}</td>
              <td>{`$ ${(report.attributes.final_balance_cents / 100).toFixed(2)}`}</td>
              <td>{formattedDate(new Date(report.attributes.date))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PastReportsList;
