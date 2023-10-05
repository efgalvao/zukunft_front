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
    <StatementTableRow key={index} isNegative={transaction.attributes.kind === 'expense'}>
      <StatementTableCell>{transaction.attributes.title}</StatementTableCell>
      <StatementTableCell>{transaction.attributes.value_cents / 100}</StatementTableCell>
      <StatementTableCell>{transaction.attributes.kind}</StatementTableCell>
      <StatementTableCell>{new Date(transaction.attributes.date).toLocaleDateString('pt-BR')}</StatementTableCell>
      <StatementTableCell>
        <UpdateTransaction transaction={transaction.attributes} />
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
