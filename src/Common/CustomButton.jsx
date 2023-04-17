import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px 10px 0 0;
`;

function CustomButton({ linkTo, buttonText, color }) {
  return (
    <Link to={linkTo}>
      <Button color={color}>{buttonText}</Button>
    </Link>
  );
}

export default CustomButton;
