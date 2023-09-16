import React from 'react';
import './AccountSummary.css';

const AccountReport = ({ report }) => {
  const formattedDate = new Date(report.attributes.date).toLocaleString('pt-BR');
  return (
    <>
      <div className="subtitle">Current month report</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Incomes:</th>
            <th>Expenses:</th>
            <th>Invested:</th>
            <th>Balance</th>
            <th>Last update:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`$ ${(report.attributes.incomes_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.attributes.expenses_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.attributes.invested_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.attributes.final_balance_cents / 100).toFixed(2)} `}</td>
            <td>{formattedDate}</td>
          </tr>
        </tbody>
      </table >
    </>
  );
};

export default AccountReport;
