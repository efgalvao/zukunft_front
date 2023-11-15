import React from "react";
import styled from "styled-components";

const StatementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: #e75454;
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

function Statement({ financings }) {
  const statementRows = financings.map((financing, index) => (
    <StatementTableRow key={index} >
      <StatementTableCell>
        {financing.attributes.name}
      </StatementTableCell>
      <StatementTableCell>{financing.attributes.installments}</StatementTableCell>
      <StatementTableCell>
        R$ {financing.attributes.borrowed_value_cents / 100}
      </StatementTableCell>
    </StatementTableRow >
  ));

  return (
    <StatementWrapper>
      <StatementTable>
        <thead>
          <StatementTableHeader>
            <StatementTableHeaderCell>Nome</StatementTableHeaderCell>
            <StatementTableHeaderCell>Parcelas</StatementTableHeaderCell>
            <StatementTableHeaderCell>Valor Financiado</StatementTableHeaderCell>
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
