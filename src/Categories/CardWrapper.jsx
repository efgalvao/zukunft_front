import React from 'react';
import styled from 'styled-components';
import EditCategory from './EditCategory';
import DeleteCategory from "./DeleteCategory";

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
  height: 150px;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

function Card({ data }) {
  const name = data.attributes.name;

  return (
    <CardWrapper>
      <Title>{name}</Title>
      <ButtonWrapper>
        <EditCategory data={data} />
        <DeleteCategory id={parseInt(data.id)} />
      </ButtonWrapper>
    </CardWrapper>
  );
}

export default Card;
