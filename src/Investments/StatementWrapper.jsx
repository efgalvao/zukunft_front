import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const kind = (kind) => {
  if (kind === 'Stock') {
    return 'Renda Variável';
  } else {
    return 'Renda Fixa';
  }
};

function Statement({ investments }) {
  const statementRows = investments.map((investment, index) => (
    <StatementTableRow key={index} isNegative={investment.kind === 'expense'}>
      <StatementTableCell>
        <Link to={`/${investment.attributes.kind.toLowerCase()}/${investment.attributes.id}`}>{investment.attributes.name}</Link>
      </StatementTableCell>
      <StatementTableCell>{kind(investment.attributes.kind)}</StatementTableCell>
      <Link to={`/account/${investment.attributes.account_id}`}>{investment.attributes.account_name}</Link>
      <StatementTableCell>
      </StatementTableCell>
    </StatementTableRow >
  ));

  return (
    <StatementWrapper>
      <StatementTable>
        <thead>
          <StatementTableHeader>
            <StatementTableHeaderCell>Nome</StatementTableHeaderCell>
            <StatementTableHeaderCell>Tipo</StatementTableHeaderCell>
            <StatementTableHeaderCell>Conta</StatementTableHeaderCell>
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
