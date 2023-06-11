import React from 'react';
import '../Accounts/AccountSummary.css';
import { Link } from 'react-router-dom';

const StockList = ({ stocks }) => {
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

  const valuePerShare = (stock) => {
    return stock.attributes.invested_value_cents / stock.attributes.shares_total || 0
  };

  return (
    <>

      <div className="subtitle">Renda Variavel</div>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Ticker:</th>
            <th>Valor investido:</th>
            <th>Valor investido por cota:</th>
            <th>Valor total atual</th>
            <th>Valor atual por cota:</th>
            <th>Ultima atualizacao:</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (

            <tr key={index}>
              <td>
                <Link to={`/stock/${stock.id}`}>
                  {stock.attributes.ticker}
                </Link>
              </td>
              <td>{`$ ${stock.attributes.invested_value_cents.toFixed(2)}`}</td>
              <td>$ {valuePerShare(stock)}</td>
              <td>{`$ ${stock.attributes.current_total_value_cents.toFixed(2)}`}</td>
              <td>{`$ ${stock.attributes.current_value_cents.toFixed(2)}`}</td>
              <td>{formattedDate(new Date(stock.attributes.updated_at))}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </>
  );
};

export default StockList;
