import React from 'react';
import './AccountSummary.css';

const AccountSummary = ({ account }) => {
  const formattedDate = new Date(account.updated_at).toLocaleString();
  return (
    <>
      <div className="subtitle">Account Summary</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Balance:</th>
            <th>Balance + investments:</th>
            <th>Investments</th>
            <th>Current Investments Value</th>
            <th>Last update:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`$ ${(account.balance_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(account.balance_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(account.balance_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(account.balance_cents / 100).toFixed(2)} `}</td>
            <td>{formattedDate}</td>
          </tr>
        </tbody>
      </table >
    </>
  );
};

export default AccountSummary;
