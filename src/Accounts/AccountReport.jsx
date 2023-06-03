import React from 'react';
import './AccountSummary.css';

const AccountReport = ({ report }) => {
  const formattedDate = new Date(report.updated_at).toLocaleString();
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
            <td>{`$ ${(report.incomes_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.expenses_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.invested_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(report.final_balance_cents / 100).toFixed(2)} `}</td>
            <td>{formattedDate}</td>
          </tr>
        </tbody>
      </table >
    </>
  );
};

export default AccountReport;
