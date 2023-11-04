import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import treasuryServiceInstance from "../services/treasury.service";
import 'react-datepicker/dist/react-datepicker.css';
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


const NewTreasury = ({ accountId, accountName }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    account_id: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const body = {
      'treasury': {
        'name': formValues.name,
        'account_id': accountId
      }
    };

    treasuryServiceInstance.createTreasury(body).then((response) => {
      if (response.status === 201) {
        navigate(`/account/${accountId}`)
        handleTreasuryCreated()
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

  const handleTreasuryCreated = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Nova Renda Fixa
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-5">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-2">
              Registrar nova Renda Fixa.
            </h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="transactionTitle">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  id="treasuryName"
                  className="form-control"
                  required
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="transactionTitle">Conta</label>
                <input
                  type="text"
                  name="accountId"
                  value={accountName}
                  id="accountName"
                  className="form-control"
                  required
                  onChange={onChange}
                  disabled
                />
              </div>

              <FunctionButton type="submit" buttonText="Registrar Renda Fixa" color="green" onClick={handleCloseModal} />
              <FunctionButton linkTo={`/account/${accountId}}`} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewTreasury;
