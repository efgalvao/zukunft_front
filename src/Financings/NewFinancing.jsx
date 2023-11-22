import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import financingServiceInstance from "../services/financing.service";
import { CustomButton, FunctionButton } from "../Common/Buttons";

import Modal from './Modal';

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


const NewFinancing = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    installments: '',
    borrowedValue: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const data = {
      'financing': {
        'name': formValues.name,
        'installments': formValues.installments,
        'borrowed_value': formValues.borrowedValue
      }
    };

    financingServiceInstance.createFinancing(data).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleFinancingCreated()
      }
    },
      error => {
        console.log(error)
      }
    )
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFinancingCreated = () => {
    window.location.reload();
  }

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Novo Financiamento
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Novo Financiamento
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="transactionTitle">Nome: </label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    id="name"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Parcelas: </label>
                  <input
                    type="number"
                    name="installments"
                    value={formValues.installments}
                    id="installments"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="transactionTitle">Valor Financiado: </label>
                  <input
                    type="text"
                    name="borrowedValue"
                    value={formValues.borrowedValue}
                    id="borrowedValue"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <CustomButton type="submit" buttonText="Criar Financiamento" color="green" />
                <FunctionButton linkTo={`/financings}`} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewFinancing;
