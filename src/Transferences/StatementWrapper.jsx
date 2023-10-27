import React from "react";
import styled from "styled-components";

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
  width: 95%;
`;

const StatementTableRow = styled.tr`
  background-color: #8ceb8c;
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

function Statement({ transferences }) {
  const statementRows = transferences.map((transference, index) => (
    <StatementTableRow key={index}>
      <StatementTableCell>{transference.sender_name}</StatementTableCell>
      <StatementTableCell>{transference.receiver_name}</StatementTableCell>
      <StatementTableCell>{`$ ${(transference.value_cents / 100).toFixed(2)} `}</StatementTableCell>
      <StatementTableCell>{new Date(transference.date).toLocaleString()}</StatementTableCell>
    </StatementTableRow >
  ));

  return (
    <StatementWrapper>
      <StatementHeader>Transferências </StatementHeader>
      <StatementTable>
        <thead>
          <StatementTableHeader>
            <StatementTableHeaderCell>Remetente</StatementTableHeaderCell>
            <StatementTableHeaderCell>Destinatário</StatementTableHeaderCell>
            <StatementTableHeaderCell>Valor</StatementTableHeaderCell>
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
