import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
  height: 250px;
  margin: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Value = styled.span`
  font-size: 16px;
`;

function Cards({ financings }) {
  const formatCurrency = (valueInCents) => {
    const valueInBRL = valueInCents / 100;
    return valueInBRL.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  return financings.map((financing) => {
    const { id, name, installments, borrowed_value_cents } = financing.attributes;

    return (
      <CardWrapper key={id}>
        <Title>{name}</Title>
        <FieldWrapper>
          <Label>Parcelas:</Label>
          <Value>{installments}</Value>
        </FieldWrapper>
        <FieldWrapper>
          <Label>Valor financiado:</Label>
          <Value>{formatCurrency(borrowed_value_cents)}</Value>
        </FieldWrapper>
        <LinkButton linkTo={`/financings/${id}`} buttonText='Ver detalhes' color='blue' />
      </CardWrapper>
    );
  });
}

export default Cards;
