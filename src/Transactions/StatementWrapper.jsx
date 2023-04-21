import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const StatementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatementHeader = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 2rem 0;
`;

const StatementTable = styled.table`
  border-collapse: collapse;
  width: 80%;
`;

const StatementTableRow = styled.tr`
  background-color: ${props => props.isNegative ? '#FFB2B2' : '#32CD32'};
`;

const StatementTableHeader = styled.tr`
  background-color: '#ddd';
`;

const StatementTableHeaderCell = styled.th`
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
`;

const StatementTableCell = styled.td`
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
`;

function Statement({ transactions }) {
  const statementRows = transactions.map((transaction, index) => (
    <StatementTableRow key={index} isNegative={transaction.kind === 'expense'}>
      <StatementTableCell>{transaction.title}</StatementTableCell>
      <StatementTableCell>{transaction.value_cents / 100}</StatementTableCell>
      <StatementTableCell>{transaction.kind}</StatementTableCell>
      <StatementTableCell>{new Date(transaction.date).toLocaleString()}</StatementTableCell>
      <StatementTableCell>
        <Link to={`/update-transaction/${transaction.id}`} state={{ transaction }}>Update</Link>
      </StatementTableCell>
    </StatementTableRow >
  ));

  return (
    <StatementWrapper>
      <StatementHeader>Statement for Account </StatementHeader>
      <StatementTable>
        <thead>
          <StatementTableHeader>
            <StatementTableHeaderCell>Description</StatementTableHeaderCell>
            <StatementTableHeaderCell>Amount</StatementTableHeaderCell>
            <StatementTableHeaderCell>Kind</StatementTableHeaderCell>
            <StatementTableHeaderCell>Date</StatementTableHeaderCell>
          </StatementTableHeader>
        </thead>
        <tbody>
          {statementRows}
        </tbody>
      </StatementTable>
    </StatementWrapper>
  );
}

export default Statement;
