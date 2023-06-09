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

      <div className="subtitle">Past months reports</div>
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
          {reports.map((report, index) => (

            <tr key={index}>
              <td>{`$ ${report.Incomes.toFixed(2)}`}</td>
              <td>{`$ ${report.Expenses.toFixed(2)}`}</td>
              <td>{`$ ${report.Invested.toFixed(2)}`}</td>
              <td>{`$ ${report.FinalBalance.toFixed(2)}`}</td>
              <td>{formattedDate(new Date(report.Date))}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </>
  );
};

export default PastReportsList;
