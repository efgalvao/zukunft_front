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
  width: 350px;
  height: 250px;
  margin-bottom: 10px;
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

function Card({ data }) {
  const kind = data.attributes.kind;
  const balance_cents = data.attributes.balance_cents;
  const updated_at = data.attributes.updated_at;
  const name = data.attributes.name;
  const id = data.id;
  const formattedDate = new Date(updated_at).toLocaleString('pt-BR');
  const formatedBalance = `$ ${(balance_cents / 100).toFixed(2)} `;

  const label = kind === 'savings' ? 'Banco' : 'Corretora';

  return (
    <CardWrapper>
      <Title>{name}</Title>
      <FieldWrapper>
        <Label>Tipo:</Label>
        <Value>{label}</Value>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Saldo:</Label>
        <Value>{formatedBalance}</Value>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Ultima atualização:</Label>
        <Value>{formattedDate}</Value>
      </FieldWrapper>
      <LinkButton linkTo={`/account/${id}`} buttonText='Ver detalhes' color='blue' />

    </CardWrapper>
  );
}


export default Card;
