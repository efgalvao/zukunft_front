import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  height: 200px;
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
  const { id, name, kind, balance_cents, updated_at } = data;
  const formattedDate = new Date(updated_at).toLocaleString();


  return (
    <CardWrapper>
      <Title>{name}</Title>
      {/* <FieldWrapper>
        <Label>ID:</Label>
        <Value>{id}</Value>
      </FieldWrapper> */}
      <FieldWrapper>
        <Label>Kind:</Label>
        <Value>{kind}</Value>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Balance:</Label>
        <Value>{`$${(balance_cents / 100).toFixed(2)}`}</Value>
      </FieldWrapper>
      <FieldWrapper>
        <Label>Last update:</Label>
        <Value>{formattedDate}</Value>
      </FieldWrapper>
      <Link to={`/cards/${id}`} className="btn custom-button">
        Details
      </Link>
    </CardWrapper>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(['savings', 'broker', 'card']).isRequired,
    balance_cents: PropTypes.number.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardWrapper;
