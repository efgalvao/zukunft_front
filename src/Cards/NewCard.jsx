import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cardServiceInstance from "../services/card.service";
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

const NewCard = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    balance_cents: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const body = {
      'card': {
        'name': formValues.name,
        'balance': formValues.balance_cents,
        'kind': 'card'
      }
    };

    cardServiceInstance.createCard(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleCardCreated()
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

  const handleCardCreated = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Novo Cartão
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-3">
                Nova transação
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="cardName" className="text-left">Nome: </label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    id="cardName"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardBalance" className="text-left">Balanço: </label>
                  <input
                    type="text"
                    name="balance_cents"
                    value={formValues.balance_cents}
                    id="cardBalance"
                    className="form-control"
                    required
                    pattern="[0-9]+(\.[0-9]+)?"
                    onChange={onChange}
                  />
                </div>

                <CustomButton type="submit" buttonText="Criar cartão" color="green" />
                <FunctionButton linkTo={'/cards'} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewCard;
