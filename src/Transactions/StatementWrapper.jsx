import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UpdateTransaction from "./UpdateTransaction";


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
  font-family: 'Open Sans', sans-serif;
  background-color: #7293ec;
  border-collapse: collapse;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  width: 80%;
`;

const StatementTableRow = styled.tr`
  background-color: ${props => props.isNegative ? '#e75454' : '#32CD32'};
  &:hover {
    background-color: #ddd;
  }
  `;

const StatementTableHeader = styled.tr`
  background-color: '#2b2929';
`;

const StatementTableHeaderCell = styled.th`
  text-align: left;
  padding: 8px;
`;

const StatementTableCell = styled.td`
  text-align: left;
`;

function Statement({ transactions }) {
  const statementRows = transactions.map((transaction, index) => (
    <StatementTableRow key={index} isNegative={transaction.kind === 'expense'}>
      <StatementTableCell>{transaction.title}</StatementTableCell>
      <StatementTableCell>{transaction.value_cents / 100}</StatementTableCell>
      <StatementTableCell>{transaction.kind}</StatementTableCell>
      <StatementTableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</StatementTableCell>
      <StatementTableCell>
        <UpdateTransaction transaction={transaction} />
      </StatementTableCell>
    </StatementTableRow >
  ));

  return (
    <StatementWrapper>
      <StatementHeader>Transações</StatementHeader>
      <StatementTable>
        <thead>
          <StatementTableHeader>
            <StatementTableHeaderCell>Descrição</StatementTableHeaderCell>
            <StatementTableHeaderCell>Valor</StatementTableHeaderCell>
            <StatementTableHeaderCell>Tipo</StatementTableHeaderCell>
            <StatementTableHeaderCell>Data</StatementTableHeaderCell>
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
