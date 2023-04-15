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
  const { id, name } = data;


  return (
    <CardWrapper>
      <Title>{name}</Title>
      {/* <FieldWrapper>
        <Label>ID:</Label>
        <Value>{id}</Value>
      </FieldWrapper> */}
      <Link to={`/category/${id}`} className="btn custom-button">
        Details
      </Link>
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