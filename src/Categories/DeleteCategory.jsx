import React from "react";
import { useNavigate } from "react-router-dom";
import categoryServiceInstance from "../services/category.service";

import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px 10px 0 0;
`;

const DeleteCategory = ({ id }) => {
  const navigate = useNavigate();

  const onClick = (event) => {
    event.preventDefault();
    categoryServiceInstance.deleteCategory(id).then((response) => {
      if (response.status === 200) {
        handleCategoryDeleted();
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  const handleCategoryDeleted = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="red" onClick={onClick}>
        Remover
      </Button>
    </>
  );
};

export default DeleteCategory;
