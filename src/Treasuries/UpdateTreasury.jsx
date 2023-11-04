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


const UpdateTreasury = ({ treasury }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: treasury.name,
    accountName: treasury.account_name
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
        'account_id': treasury.account_id
      }
    };

    treasuryServiceInstance.updateTreasury(body, treasury.id).then((response) => {
      if (response.status === 200) {
        navigate(`/treasury/${treasury.id}`)
        handleTreasuryUpdated()
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

  const handleTreasuryUpdated = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Atualizar Renda Fixa
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Atualizar Renda Fixa
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="treasuryName">Nome</label>
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
                  <label htmlFor="treasuryAccount">Account</label>
                  <input
                    type="text"
                    name="accountName"
                    value={formValues.accountName}
                    id="accountName"
                    className="form-control"
                    required
                    onChange={onChange}
                    disabled
                  />
                </div>

                <CustomButton type="submit" buttonText="Atualizar Renda Fixa" color="green" />
                <FunctionButton linkTo={`/account/${treasury.account_id}}`} buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateTreasury;
