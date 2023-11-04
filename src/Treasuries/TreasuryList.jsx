import React from 'react';
import '../Accounts/AccountSummary.css';
import { Link } from 'react-router-dom';

const TreasuryList = ({ treasuries }) => {

  return (
    <>

      <div className="subtitle">Renda Fixa</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Valor investido:</th>
            <th>Valor atual</th>
          </tr>
        </thead>
        <tbody>
          {treasuries.map((treasury, index) => (
            <tr key={index}>
              <td>
                <Link to={`/treasury/${treasury.id}`}>
                  {treasury.attributes.name}
                </Link>
              </td>
              <td>{`$ ${(treasury.attributes.invested_value_cents / 100).toFixed(2)}`}</td>
              <td>{`$ ${(treasury.attributes.current_value_cents / 100).toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TreasuryList;
