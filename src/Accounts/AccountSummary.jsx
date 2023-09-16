import React from 'react';
import './AccountSummary.css';

const AccountSummary = ({ account }) => {
  const formattedDate = new Date(account.attributes.updated_at).toLocaleString('pt-Br');
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
            <td>{`$ ${(account.attributes.balance_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${account.attributes.invested_cents ? (account.attributes.balance_cents / 100).toFixed(2) : '0'} `}</td>
            <td>{`$ ${account.attributes.invested_cents ? (account.attributes.balance_cents / 100).toFixed(2) : '0'} `}</td>
            <td>{`$ ${account.attributes.invested_cents ? (account.attributes.balance_cents / 100).toFixed(2) : '0'} `}</td>
            <td>{formattedDate}</td>
          </tr>
        </tbody>
      </table >
    </>
  );
};

export default AccountSummary;
