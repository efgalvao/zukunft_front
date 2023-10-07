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

function Statement({ transferences }) {
  const statementRows = transferences.map((transference, index) => (
    <StatementTableRow key={index}>
      <StatementTableCell>{transference.attributes.sender.name}</StatementTableCell>
      <StatementTableCell>{transference.attributes.receiver.name}</StatementTableCell>
      <StatementTableCell>{`$ ${(transference.attributes.value_cents / 100).toFixed(2)} `}</StatementTableCell>
      <StatementTableCell>{new Date(transference.attributes.date).toLocaleString()}</StatementTableCell>
    </StatementTableRow >
  ));

  return (
    <StatementWrapper>
      <StatementHeader>Transferences </StatementHeader>
      <StatementTable>
        <thead>
          <StatementTableHeader>
            <StatementTableHeaderCell>Sender</StatementTableHeaderCell>
            <StatementTableHeaderCell>Receiver</StatementTableHeaderCell>
            <StatementTableHeaderCell>Value</StatementTableHeaderCell>
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
