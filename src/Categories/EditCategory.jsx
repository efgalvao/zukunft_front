import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryServiceInstance from "../services/category.service";
import { CustomButton, FunctionButton } from "../Common/Buttons";
import Modal from '../Common/Modal';

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

const EditCategory = (data) => {
  const navigate = useNavigate();
  const [name, setName] = useState(data.data.attributes.name);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.length === 0)
      return;
    const body = { 'category': { 'name': name } };

    categoryServiceInstance.updateCategory(body, parseInt(data.data.id)).then((response) => {
      if (response.status === 200) {
        setIsModalOpen(false);
        handleCategoryCreated();
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  const handleCategoryCreated = () => {
    window.location.reload();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Button color="blue" onClick={handleOpenModal}>
      Renomear
    </Button>
    
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
          Renomear
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Nome</label>
              <input
                type="text"
                name="name"
                id="categoryName"
                value={name}
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <CustomButton type="submit" buttonText="Renomear" color='green' />
            <FunctionButton linkTo="/categories" buttonText="Voltar" color='blue' onClick={handleCloseModal} />
          </form>
        </div>
      </div>
    </div>
    </Modal>
    </>
  );
};

export default EditCategory;
