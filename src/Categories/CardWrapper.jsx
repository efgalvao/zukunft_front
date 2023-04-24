import React from 'react';
import PropTypes from 'prop-types';
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
  padding: 10px;
  width: 250px;
  height: 110px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

function Card({ data }) {
  const { id, name } = data;

  return (
    <CardWrapper>
      <Title>{name}</Title>
      <LinkButton linkTo={`/category/${id}`} color='blue' buttonText='Details' />
    </CardWrapper>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
