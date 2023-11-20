import React from "react";
import styled from "styled-components";

const InstallmentWrapper = styled.div`
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
  padding: 10px;
`;

const StatementTableCell = styled.td`
  text-align: left;
  padding: 10px;
`;

function InstallmentsWrapper({ installments }) {
  console.log("InstallmentsWrapper")
  console.log(installments)
  const formatCurrency = (valueInCents) => {
    const valueInBRL = valueInCents / 100;
    return valueInBRL.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }
  const calculateInstallmentValue = (installment) => {
    const installmentValueCents = installment.amortization_cents +
      installment.interest_cents +
      installment.fees_cents +
      installment.insurance_cents +
      installment.adjustment_cents
    return formatCurrency(installmentValueCents)
  }
  const formatedDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    const new_date = new Date(date);
    const formattedDateString = new_date.toLocaleDateString('pt-BR', options);

    return `${formattedDateString}`;
  };
  const statementRows = installments.map((installment, index) => (
    <StatementTableRow key={index} >
      <StatementTableCell>{installment.attributes.kind}</StatementTableCell>
      <StatementTableCell>{calculateInstallmentValue(installment.attributes)}</StatementTableCell>
      <StatementTableCell>{formatedDate(installment.attributes.payment_date)}</StatementTableCell>
      <StatementTableCell>{installment.attributes.parcel}</StatementTableCell>
      <StatementTableCell>{installment.attributes.paid_parcels}</StatementTableCell>
      <StatementTableCell>{formatCurrency(installment.attributes.amortization_cents)}</StatementTableCell>
      <StatementTableCell>{formatCurrency(installment.attributes.interest_cents)}</StatementTableCell>
      <StatementTableCell>{formatCurrency(installment.attributes.fees_cents)}</StatementTableCell>
      <StatementTableCell>{formatCurrency(installment.attributes.insurance_cents)}</StatementTableCell>
      <StatementTableCell>{formatCurrency(installment.attributes.adjustment_cents)}</StatementTableCell>
      <StatementTableCell>{formatCurrency(installment.attributes.monetary_correction_cents)}</StatementTableCell>
    </StatementTableRow >
  ));

  return (
    <InstallmentWrapper>
      <StatementTable>
        <thead>
          <StatementTableHeader>
            <StatementTableHeaderCell>Tipo de pagamento</StatementTableHeaderCell>
            <StatementTableHeaderCell>Valor do pagamento</StatementTableHeaderCell>
            <StatementTableHeaderCell>Data de pagamento</StatementTableHeaderCell>
            <StatementTableHeaderCell>Parcela</StatementTableHeaderCell>
            <StatementTableHeaderCell>Parcelas abatidas</StatementTableHeaderCell>
            <StatementTableHeaderCell>Amortização</StatementTableHeaderCell>
            <StatementTableHeaderCell>Juros</StatementTableHeaderCell>
            <StatementTableHeaderCell>Seguro</StatementTableHeaderCell>
            <StatementTableHeaderCell>Taxa</StatementTableHeaderCell>
            <StatementTableHeaderCell>Outros valores</StatementTableHeaderCell>
            <StatementTableHeaderCell>Correção monetáia(TR)</StatementTableHeaderCell>
          </StatementTableHeader>
        </thead>
        <tbody>
          {statementRows}
        </tbody>
      </StatementTable>
    </InstallmentWrapper>
  );
}

export default InstallmentsWrapper;
