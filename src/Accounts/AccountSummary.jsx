import React from 'react';
import './AccountSummary.css';

const AccountSummary = ({ account }) => {
  const formattedDate = new Date(account?.updated_at).toLocaleString('pt-Br');
  return (
    <>
      <div className="subtitle">Resumo:</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Saldo</th>
            <th>Saldo + Valor Investido Atualizado</th>
            <th>Valor Investido</th>
            <th>Valor Investido Atualizado</th>
            <th>Ultima Atualização:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`$ ${(account?.balance_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(account?.balance_plus_invested_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(account.invested_cents / 100).toFixed(2)} `}</td>
            <td>{`$ ${(account.current_invested_cents / 100).toFixed(2)} `}</td>
            <td>{formattedDate}</td>
          </tr>
        </tbody>
      </table >
    </>
  );
};

export default AccountSummary;
