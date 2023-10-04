import React from 'react';
import './AccountSummary.css';

const AccountReport = ({ report }) => {
  const formattedDate = new Date(report.attributes?.date).toLocaleString('pt-BR');
  return (
    <>
      <div className="subtitle">Relatório do mês atual:</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Receita</th>
            <th>Gasto</th>
            <th>Investido</th>
            <th>Balanço</th>
            <th>Ultima Atualização</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`$ ${(report.attributes?.incomes_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.attributes?.expenses_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.attributes?.invested_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.attributes?.final_balance_cents / 100).toFixed(2)} `}</td>
            <td>{formattedDate}</td>
          </tr>
        </tbody>
      </table >
    </>
  );
};

export default AccountReport;
