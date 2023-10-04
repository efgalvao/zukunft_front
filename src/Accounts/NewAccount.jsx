import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../services/account.service";
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

const NewAccount = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    balance: '',
    kind: 'savings'
  });

  const onChange = (event, setFunction) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();


    const body = {
      'account': {
        'name': formValues.name,
        'kind': formValues.kind,
        'balance': formValues.balance
      }
    };

    AccountService.createAccount(body).then((response) => {
      if (response.status === 201) {
        setIsModalOpen(false);
        handleAccountCreated();
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

  const handleAccountCreated = () => {
    window.location.reload();
  };

  return (
    <>
      <Button color="blue" onClick={handleOpenModal}>
        Nova Conta
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Criar nova conta
              </h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="accountName">Account name</label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    id="accountName"
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accountBalance">Account balance</label>
                  <input
                    type="number"
                    name="balance"
                    value={formValues.balance}
                    className="form-control"
                    required
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accountKind">Account kind</label>
                  <select
                    type="text"
                    name="kind"
                    value={formValues.kind}
                    className="form-control"
                    required
                    onChange={onChange}>
                    <option value="savings">Savings</option>
                    <option value="broker">Broker</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                <CustomButton buttonText="Criar conta" color="green" type='submit' />
                <FunctionButton linkTo='/accounts' buttonText="Voltar" color="blue" onClick={handleCloseModal} />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default NewAccount;
